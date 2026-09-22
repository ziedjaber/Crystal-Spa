import { NextRequest } from 'next/server';
import { getStripe, calculateServerBookingPrice } from '@/lib/stripe';
import { paymentIntentRequestSchema } from '@/lib/validations/schemas';
import { successResponse, errorResponse, rateLimitResponse } from '@/lib/api-response';
import { checkRateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { env } from '@/lib/env';

/**
 * POST /api/stripe/create-payment-intent
 * 
 * Secure PaymentIntent Creation:
 * 1. Validates schema using Zod.
 * 2. Enforces IP rate limiting.
 * 3. Authoritatively computes booking total on the server.
 * 4. Attaches sanitized booking metadata.
 * 5. Uses idempotency key for network resilience.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check (15 requests / 15 min per IP)
    const rateCheck = checkRateLimit(request, 'stripe-create-intent', {
      windowMs: 15 * 60 * 1000,
      maxRequests: 15,
    });
    if (rateCheck.isLimited) {
      logger.securityAudit('STRIPE_RATE_LIMIT_EXCEEDED', { ip: request.headers.get('x-forwarded-for') });
      return rateLimitResponse(Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
    }

    // 2. Parse & Validate JSON Body
    const body = await request.json();
    const validated = paymentIntentRequestSchema.parse(body);

    // 3. Authoritatively Compute Price Server-Side (Zero Trust on frontend amounts)
    const pricing = calculateServerBookingPrice({
      apartmentId: validated.apartmentId,
      checkInDate: validated.checkInDate,
      checkOutDate: validated.checkOutDate,
      selectedPacks: validated.selectedPacks,
    });

    // 4. Create or Retrieve Stripe PaymentIntent
    if (env.STRIPE_SECRET_KEY && !env.STRIPE_SECRET_KEY.includes('placeholder')) {
      const stripe = getStripe();
      
      const paymentIntent = await stripe.paymentIntents.create(
        {
          amount: pricing.totalAmountCents,
          currency: 'eur',
          payment_method_types: ['card'],
          description: `Séjour Crystal Spa - ${pricing.apartmentTitle} (${pricing.nightsCount} nuit(s))`,
          metadata: {
            apartmentId: pricing.apartmentId,
            apartmentTitle: pricing.apartmentTitle,
            checkInDate: validated.checkInDate,
            checkOutDate: validated.checkOutDate,
            nightsCount: String(pricing.nightsCount),
            guestsCount: String(validated.guestsCount),
            guestName: validated.guestName,
            guestEmail: validated.guestEmail,
            guestPhone: validated.guestPhone,
            addons: JSON.stringify(pricing.addons.map((a) => a.id)),
            specialRequests: validated.specialRequests || '',
          },
        },
        validated.idempotencyKey ? { idempotencyKey: validated.idempotencyKey } : undefined
      );

      logger.info('Stripe PaymentIntent created', {
        paymentIntentId: paymentIntent.id,
        amount: pricing.totalAmountEUR,
        apartmentId: pricing.apartmentId,
      });

      return successResponse({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amountEUR: pricing.totalAmountEUR,
        pricingBreakdown: pricing,
      });
    }

    // Safe Development Simulation fallback when no live Stripe secret is configured
    logger.info('[DEV SIMULATION] Mock PaymentIntent created for prototyping', {
      amountEUR: pricing.totalAmountEUR,
      apartmentId: pricing.apartmentId,
    });

    return successResponse({
      clientSecret: `mock_pi_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      paymentIntentId: `mock_pi_${Date.now()}`,
      amountEUR: pricing.totalAmountEUR,
      pricingBreakdown: pricing,
      isSimulation: true,
    });
  } catch (error) {
    logger.error('Failed to create Stripe PaymentIntent', error);
    return errorResponse(error, 400, 'Unable to initialize secure payment session. Please verify your booking details.');
  }
}
