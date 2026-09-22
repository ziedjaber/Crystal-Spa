import { NextRequest } from 'next/server';
import { getSmoobuAvailability } from '@/lib/smoobu';
import { smoobuAvailabilitySchema } from '@/lib/validations/schemas';
import { successResponse, errorResponse, rateLimitResponse } from '@/lib/api-response';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * GET /api/smoobu/availability?apartmentId=a2&from=2026-10-01&to=2026-10-05
 * 
 * Proxies availability requests to Smoobu without exposing secret credentials to the client.
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Rate limiting (30 requests / 15 min per IP)
    const rateCheck = checkRateLimit(request, 'smoobu-availability', {
      windowMs: 15 * 60 * 1000,
      maxRequests: 30,
    });
    if (rateCheck.isLimited) {
      return rateLimitResponse(Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
    }

    // 2. Validate Query Parameters
    const { searchParams } = new URL(request.url);
    const validated = smoobuAvailabilitySchema.parse({
      apartmentId: searchParams.get('apartmentId'),
      from: searchParams.get('from'),
      to: searchParams.get('to'),
    });

    // 3. Fetch from Smoobu
    const availability = await getSmoobuAvailability(
      validated.apartmentId,
      validated.from,
      validated.to
    );

    return successResponse(availability);
  } catch (error) {
    return errorResponse(error, 400, 'Invalid availability request parameters');
  }
}
