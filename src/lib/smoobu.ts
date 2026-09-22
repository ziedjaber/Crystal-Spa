import { env } from './env';
import { logger } from './logger';

/**
 * Smoobu Channel Manager Server API Client
 * 
 * Secure proxy wrapper with:
 * - Server-only API key isolation
 * - 8-second request timeout guards
 * - Exponential backoff retry for transient network faults
 * - Error logging and response normalization
 */

const SMOOBU_BASE_URL = 'https://login.smoobu.com/api';

interface SmoobuAvailabilityResponse {
  apartmentId: string;
  available: boolean;
  blockedDates: string[];
}

export async function fetchSmoobuWithRetry<T>(
  endpoint: string,
  options: RequestInit = {},
  maxRetries = 2
): Promise<T> {
  const apiKey = env.SMOOBU_API_KEY;

  if (!apiKey || apiKey.includes('placeholder')) {
    logger.warn('[DEV] Smoobu API Key not configured, returning simulated response');
    return { simulated: true } as unknown as T;
  }

  const url = `${SMOOBU_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'Api-Key': apiKey,
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        signal: AbortSignal.timeout(8000), // 8s timeout
      });

      if (!res.ok) {
        // Transient 5xx server errors - eligible for retry
        if ([502, 503, 504].includes(res.status) && attempt < maxRetries) {
          const backoffDelay = Math.pow(2, attempt) * 500;
          logger.warn(`Smoobu transient error ${res.status}. Retrying in ${backoffDelay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          continue;
        }
        throw new Error(`Smoobu API error: HTTP ${res.status} ${res.statusText}`);
      }

      return (await res.json()) as T;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries) {
        const backoffDelay = Math.pow(2, attempt) * 500;
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      }
    }
  }

  logger.error('Smoobu API request failed after retries', lastError, { endpoint });
  throw lastError || new Error('Smoobu request failed');
}

/**
 * Checks dates availability for a given apartment
 */
export async function getSmoobuAvailability(
  apartmentId: string,
  from: string,
  to: string
): Promise<SmoobuAvailabilityResponse> {
  try {
    const data = await fetchSmoobuWithRetry<any>(
      `/apartments/${apartmentId}/rates?start_date=${from}&end_date=${to}`
    );

    if (data && data.simulated) {
      return {
        apartmentId,
        available: true,
        blockedDates: [],
      };
    }

    return {
      apartmentId,
      available: true,
      blockedDates: data?.blockedDates || [],
    };
  } catch (error) {
    logger.error('Failed to fetch Smoobu availability', error, { apartmentId, from, to });
    // Graceful fallback
    return {
      apartmentId,
      available: true,
      blockedDates: [],
    };
  }
}
