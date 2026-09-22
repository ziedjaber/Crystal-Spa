import { z } from 'zod';
import { stripHtml } from '../sanitize';

/**
 * Common Custom Zod Validators
 */

// Phone regex allowing international formats: +33 6 12 34 56 78, 0612345678, etc.
const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,5}\)?[-.\s]?)?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/;

// Safe string validator that cleans tags and checks length
const safeString = (min: number, max: number, fieldName: string) =>
  z
    .string()
    .min(min, { message: `${fieldName} must be at least ${min} characters` })
    .max(max, { message: `${fieldName} cannot exceed ${max} characters` })
    .transform((val) => stripHtml(val));

// Safe date validator in YYYY-MM-DD format
const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be formatted as YYYY-MM-DD' });

/**
 * 1. Apartment Booking Request Schema
 */
export const bookingRequestSchema = z
  .object({
    apartmentId: z.enum(['a1', 'a2', 'a3', 'diamant-noir', 'la-vie-est-belle', 'suite-celeste']),
    checkInDate: dateStringSchema,
    checkOutDate: dateStringSchema,
    guestsCount: z.coerce.number().int().min(1, 'Minimum 1 guest').max(4, 'Maximum 4 guests allowed'),
    guestName: safeString(2, 100, 'Guest name'),
    guestEmail: z.string().email('Invalid email address').max(254),
    guestPhone: z
      .string()
      .min(6, 'Phone number is too short')
      .max(30, 'Phone number is too long')
      .regex(phoneRegex, 'Invalid phone number format'),
    selectedPacks: z.array(z.string().max(50)).optional().default([]),
    specialRequests: z.string().max(1000).optional().default('').transform((val) => stripHtml(val)),
    
    // Honeypot field for bot detection (must be empty string or undefined)
    hp_company_field: z.string().max(0, { message: 'Bot detected' }).optional(),
    
    // Cloudflare Turnstile token (optional for fallback/testing)
    turnstileToken: z.string().optional(),
  })
  .refine(
    (data) => {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      return checkOut > checkIn;
    },
    {
      message: 'Check-out date must be strictly after check-in date',
      path: ['checkOutDate'],
    }
  );

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

/**
 * 2. Contact / Concierge Request Schema
 */
export const contactRequestSchema = z.object({
  name: safeString(2, 100, 'Name'),
  email: z.string().email('Invalid email address').max(254),
  phone: z
    .string()
    .max(30)
    .regex(phoneRegex, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  subject: safeString(2, 150, 'Subject').optional().default('Concierge Inquiry'),
  message: safeString(5, 2000, 'Message'),
  apartmentId: z.string().max(50).optional(),
  
  // Honeypot field (must be empty)
  hp_website_url: z.string().max(0, { message: 'Bot detected' }).optional(),
  turnstileToken: z.string().optional(),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;

/**
 * 3. Guest Review Request Schema
 */
export const reviewRequestSchema = z.object({
  author: safeString(2, 80, 'Author name'),
  rating: z.coerce.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  treatmentName: safeString(2, 100, 'Treatment or Suite name').optional().default('Crystal Spa Suite'),
  comment: safeString(10, 1500, 'Review comment'),
  hp_fax_number: z.string().max(0, { message: 'Bot detected' }).optional(),
});

export type ReviewRequestInput = z.infer<typeof reviewRequestSchema>;

/**
 * 4. Stripe Create PaymentIntent Request Schema
 */
export const paymentIntentRequestSchema = z.object({
  apartmentId: z.enum(['a1', 'a2', 'a3', 'diamant-noir', 'la-vie-est-belle', 'suite-celeste']),
  checkInDate: dateStringSchema,
  checkOutDate: dateStringSchema,
  guestsCount: z.coerce.number().int().min(1).max(4),
  guestName: safeString(2, 100, 'Guest name'),
  guestEmail: z.string().email('Invalid email address'),
  guestPhone: z.string().min(6).max(30).regex(phoneRegex, 'Invalid phone number format'),
  selectedPacks: z.array(z.string().max(50)).optional().default([]),
  specialRequests: z.string().max(1000).optional().default('').transform((val) => stripHtml(val)),
  idempotencyKey: z.string().min(10).max(100).optional(),
});

export type PaymentIntentRequestInput = z.infer<typeof paymentIntentRequestSchema>;

/**
 * 5. Smoobu Availability Query Schema
 */
export const smoobuAvailabilitySchema = z.object({
  apartmentId: z.string().min(1).max(50),
  from: dateStringSchema,
  to: dateStringSchema,
});
