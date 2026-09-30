import { loadStripe, Stripe } from '@stripe/stripe-js';

/**
 * Client-Side Stripe Loader
 * Caches the Stripe Promise to avoid duplicate script injections,
 * catches network / ad-blocker rejections safely to prevent unhandledRejection errors.
 */
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripeClient = (publishableKey?: string): Promise<Stripe | null> => {
  const key = publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!key || key.includes('placeholder')) {
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(key).catch((err) => {
      console.warn('[Stripe Client] Stripe.js failed to load (check ad-blocker or network):', err);
      // Reset so a subsequent attempt or retry can try again
      stripePromise = null;
      return null;
    });
  }

  return stripePromise;
};

export const resetStripeClient = () => {
  stripePromise = null;
};
