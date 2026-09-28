import { loadStripe, Stripe } from '@stripe/stripe-js';

/**
 * Client-Side Stripe Loader
 * Caches the Stripe Promise to avoid duplicate script injections.
 */
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripeClient = (publishableKey?: string): Promise<Stripe | null> => {
  const key = publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!key || key.includes('placeholder')) {
    // If no key is set yet, return null or fallback
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(key);
  }

  return stripePromise;
};
