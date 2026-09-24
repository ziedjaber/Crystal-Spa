import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { bookingRequestSchema } from '@/lib/validations/schemas';
import { calculateServerBookingPrice } from '@/lib/stripe';
import { successResponse, errorResponse, rateLimitResponse } from '@/lib/api-response';
import { checkRateLimit } from '@/lib/rate-limit';
import { isHoneypotTriggered } from '@/lib/captcha';
import { sanitizeText, sanitizeEmail, sanitizePhone, sanitizeObject } from '@/lib/sanitize';
import { logger } from '@/lib/logger';

const bookingsFilePath = path.join(process.cwd(), 'src/data/bookings.json');

function getBookings() {
  try {
    if (!fs.existsSync(bookingsFilePath)) {
      return [];
    }
    const content = fs.readFileSync(bookingsFilePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    logger.error('Error reading bookings from disk', err);
    return [];
  }
}

function saveBookings(bookings: any[]) {
  try {
    const dir = path.dirname(bookingsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf8');
  } catch (err) {
    logger.error('Error saving bookings to disk', err);
  }
}

export async function GET() {
  const rawBookings = getBookings();
  // Sanitize outputs to prevent stored XSS attacks
  const sanitized = sanitizeObject(rawBookings);
  return successResponse(sanitized);
}

export async function POST(request: NextRequest) {
  try {
    // 1. Sliding Window Rate Limiting (10 requests / 15 minutes per IP)
    const rateCheck = checkRateLimit(request, 'bookings-submit', {
      windowMs: 15 * 60 * 1000,
      maxRequests: 10,
    });
    if (rateCheck.isLimited) {
      logger.securityAudit('BOOKINGS_RATE_LIMIT_HIT', { ip: request.headers.get('x-forwarded-for') });
      return rateLimitResponse(Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
    }

    // 2. Parse & Validate Payload
    const rawBody = await request.json();

    // 3. Honeypot check for spam bots
    if (isHoneypotTriggered(rawBody.hp_company_field)) {
      logger.securityAudit('SPAM_BOT_BLOCKED_HONEYPOT', { endpoint: '/api/bookings' });
      // Return synthetic success to mislead and neutralize automated bots
      return successResponse({ id: 'BK-CONFIRMED' }, 'Reservation received.');
    }

    // Compatibility mapper if legacy payload format was sent
    const payloadToValidate = {
      apartmentId: rawBody.apartmentId || rawBody.serviceId || 'a2',
      checkInDate: rawBody.checkInDate || (rawBody.date ? rawBody.date.split(' → ')[0] : '2026-10-01'),
      checkOutDate: rawBody.checkOutDate || (rawBody.date && rawBody.date.includes(' → ') ? rawBody.date.split(' → ')[1].split(' ')[0] : '2026-10-02'),
      guestsCount: Number(rawBody.guestsCount || (rawBody.notes && rawBody.notes.includes('Voyageurs: ') ? rawBody.notes.split('Voyageurs: ')[1].split('.')[0] : 2)),
      guestName: rawBody.guestName || '',
      guestEmail: rawBody.guestEmail || '',
      guestPhone: rawBody.guestPhone || '',
      selectedPacks: Array.isArray(rawBody.selectedPacks)
        ? rawBody.selectedPacks
        : Array.isArray(rawBody.packs)
        ? rawBody.packs
        : [],
      specialRequests: rawBody.specialRequests || rawBody.notes || '',
    };

    const validated = bookingRequestSchema.parse(payloadToValidate);

    // 4. Server-Authoritative Price Calculation (Never trust frontend price)
    const pricing = calculateServerBookingPrice({
      apartmentId: validated.apartmentId,
      checkInDate: validated.checkInDate,
      checkOutDate: validated.checkOutDate,
      selectedPacks: validated.selectedPacks,
    });

    // 5. Build Sanitized Booking Entity
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      apartmentId: pricing.apartmentId,
      apartmentTitle: pricing.apartmentTitle,
      checkInDate: validated.checkInDate,
      checkOutDate: validated.checkOutDate,
      nightsCount: pricing.nightsCount,
      guestsCount: validated.guestsCount,
      guestName: sanitizeText(validated.guestName, 100),
      guestEmail: sanitizeEmail(validated.guestEmail),
      guestPhone: sanitizePhone(validated.guestPhone),
      specialRequests: sanitizeText(validated.specialRequests, 1000),
      selectedPacks: pricing.addons,
      totalAmountEUR: pricing.totalAmountEUR,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    const currentBookings = getBookings();
    currentBookings.unshift(newBooking);
    saveBookings(currentBookings);

    logger.info('New secure booking recorded', {
      bookingId: newBooking.id,
      apartmentId: newBooking.apartmentId,
      nights: newBooking.nightsCount,
      totalEUR: newBooking.totalAmountEUR,
    });

    return successResponse(
      newBooking,
      'Votre réservation au Domaine Crystal Spa est confirmée avec succès !',
      201
    );
  } catch (error) {
    logger.error('Failed to process booking request', error);
    return errorResponse(error, 400, 'Impossible de valider la réservation. Veuillez vérifier vos informations.');
  }
}
