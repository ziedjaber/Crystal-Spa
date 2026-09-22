import { env } from './env';
import { logger } from './logger';

/**
 * Cloudflare Turnstile & Honeypot Server Verification Utility
 * 
 * Verifies submitted bot protection tokens server-side with timeout handling.
 */

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  // If no secret key is configured or in development mode without token, allow pass-through
  if (!env.CLOUDFLARE_TURNSTILE_SECRET_KEY || env.NODE_ENV === 'development') {
    if (!token) {
      return { success: true };
    }
  }

  if (!token) {
    return { success: false, error: 'Bot verification token is missing' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(5000), // 5s timeout
    });

    const data: TurnstileVerifyResponse = await res.json();

    if (!data.success) {
      logger.securityAudit('TURNSTILE_VERIFY_FAILED', {
        remoteIp,
        errorCodes: data['error-codes'],
      });
      return { success: false, error: 'Bot verification failed. Please refresh and try again.' };
    }

    return { success: true };
  } catch (error) {
    logger.error('Error verifying Cloudflare Turnstile token', error, { remoteIp });
    // In production fail-closed or fail-open based on strategy (fail-open in dev, fail-closed in prod if strictly enforced)
    if (env.NODE_ENV === 'production' && env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      return { success: false, error: 'Bot verification service temporarily unreachable.' };
    }
    return { success: true };
  }
}

/**
 * Validates honeypot fields. If filled by a bot script, returns true (is bot).
 */
export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}
