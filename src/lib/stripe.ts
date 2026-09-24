import Stripe from 'stripe';
import { assertServerSecret } from './env';
import { getApartmentBySlug, FEATURED_APARTMENTS, ROMANTIC_ADDONS_DATA, calculateStayPricing } from '@/data/apartment';

/**
 * Server-Side Stripe SDK Instance
 * Initialized with API secret and latest API version.
 */
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = assertServerSecret('STRIPE_SECRET_KEY', 'STRIPE_SECRET_KEY');
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia' as any,
      typescript: true,
      appInfo: {
        name: 'Crystal Spa Luxury Platform',
        version: '1.0.0',
      },
    });
  }
  return stripeInstance;
}

export interface BookingPriceCalculation {
  apartmentId: string;
  apartmentTitle: string;
  pricePerNightEUR: number;
  nightsCount: number;
  baseAmountEUR: number;
  addons: Array<{ id: string; name: string; priceEUR: number }>;
  addonsAmountEUR: number;
  totalAmountEUR: number;
  totalAmountCents: number;
}

/**
 * AUTHORITATIVE SERVER-SIDE PRICING ENGINE
 * 
 * NEVER trusts prices sent from the client/browser.
 * Computes exact duration, apartment base rate per day of week (Lun-Jeu: 120€, Ven: 169€, Sam: 190€, Dim: 110€),
 * and validated addon pack prices.
 */
export function calculateServerBookingPrice(params: {
  apartmentId: string;
  checkInDate: string;
  checkOutDate: string;
  selectedPacks?: string[];
}): BookingPriceCalculation {
  const apartment = getApartmentBySlug(params.apartmentId) || FEATURED_APARTMENTS[0];
  if (!apartment) {
    throw new Error(`Unknown apartment identifier: ${params.apartmentId}`);
  }

  const stayPricing = calculateStayPricing(params.checkInDate, params.checkOutDate);
  const nightsCount = stayPricing.nightsCount;
  const baseAmountEUR = stayPricing.baseAmountEUR;
  const pricePerNightEUR = stayPricing.averageNightlyEUR;

  // Validate and sum selected romantic addons against server catalog
  const validatedAddons: Array<{ id: string; name: string; priceEUR: number }> = [];
  let addonsAmountEUR = 0;

  if (params.selectedPacks && Array.isArray(params.selectedPacks)) {
    for (const packId of params.selectedPacks) {
      const pack = ROMANTIC_ADDONS_DATA.find((p) => p.id === packId);
      if (pack) {
        validatedAddons.push({
          id: pack.id,
          name: pack.name,
          priceEUR: pack.price,
        });
        addonsAmountEUR += pack.price;
      }
    }
  }

  const totalAmountEUR = baseAmountEUR + addonsAmountEUR;
  const totalAmountCents = Math.round(totalAmountEUR * 100);

  return {
    apartmentId: apartment.id,
    apartmentTitle: apartment.title,
    pricePerNightEUR,
    nightsCount,
    baseAmountEUR,
    addons: validatedAddons,
    addonsAmountEUR,
    totalAmountEUR,
    totalAmountCents,
  };
}
