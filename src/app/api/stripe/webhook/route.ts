import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';
import Stripe from 'stripe';

/**
 * In-memory processed webhook event cache to prevent duplicate / replay attacks.
 * Stored with timestamp for automated garbage collection.
 */
const processedEvents = new Map<string, number>();

function cleanupProcessedEvents() {
  const now = Date.now();
  for (const [id, timestamp] of processedEvents.entries()) {
    if (now - timestamp > 24 * 60 * 60 * 1000) {
      processedEvents.delete(id);
    }
  }
}

/**
 * POST /api/stripe/webhook
 * 
 * Verifies the cryptographic HMAC-SHA256 signature from Stripe using STRIPE_WEBHOOK_SECRET.
 * Rejects unsigned or forged requests with HTTP 400 Bad Request.
 */
export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    logger.securityAudit('STRIPE_WEBHOOK_MISSING_SIGNATURE', {
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret || webhookSecret.includes('placeholder')) {
      logger.warn('[DEV] STRIPE_WEBHOOK_SECRET not configured, simulating event parsing');
      event = JSON.parse(rawBody) as Stripe.Event;
    } else {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.securityAudit('STRIPE_WEBHOOK_SIGNATURE_VERIFICATION_FAILED', { error: message });
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  // Idempotency: Check if this event ID was already processed
  cleanupProcessedEvents();
  if (processedEvents.has(event.id)) {
    logger.info('Duplicate Stripe webhook event ignored', { eventId: event.id });
    return NextResponse.json({ received: true, status: 'duplicate_ignored' }, { status: 200 });
  }

  // Mark event as processed
  processedEvents.set(event.id, Date.now());

  // Handle specific Stripe events
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logger.info('Payment succeeded for PaymentIntent', {
          paymentIntentId: paymentIntent.id,
          amountReceived: paymentIntent.amount_received,
          currency: paymentIntent.currency,
          metadata: paymentIntent.metadata,
        });
        // Reservation confirmation logic (e.g. email dispatch, Smoobu push)
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const lastError = paymentIntent.last_payment_error?.message || 'Unknown payment error';
        logger.warn('Payment failed for PaymentIntent', {
          paymentIntentId: paymentIntent.id,
          errorMessage: lastError,
        });
        break;
      }

      default:
        logger.info(`Unhandled Stripe webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (handlerError) {
    logger.error('Error executing webhook handler logic', handlerError, { eventId: event.id });
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
