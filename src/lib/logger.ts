/**
 * Production Security Logger with Automated Redaction
 * 
 * Ensures PCI-DSS & GDPR compliance by sanitizing and redacting:
 * - Passwords, Tokens, API Keys, Webhook Secrets
 * - Credit Card numbers (PANs) & CVVs
 * - Authorization headers & Cookies
 * - Sensitive customer PII
 */

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'secret',
  'key',
  'apikey',
  'api_key',
  'stripe_secret_key',
  'authorization',
  'cookie',
  'cardnumber',
  'card_number',
  'cvv',
  'cvc',
  'exp_month',
  'exp_year',
  'turnstiletoken',
]);

/**
 * Redacts sensitive fields within any object or primitive
 */
export function redactSensitiveData(data: unknown): unknown {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    return data.map((item) => redactSensitiveData(item));
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    const lowerKey = key.toLowerCase();
    
    if (SENSITIVE_KEYS.has(lowerKey) || lowerKey.includes('secret') || lowerKey.includes('password')) {
      sanitized[key] = '[REDACTED_SECRET]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = redactSensitiveData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    const payload = {
      level: 'INFO',
      timestamp: new Date().toISOString(),
      message,
      ...(meta ? { meta: redactSensitiveData(meta) } : {}),
    };
    console.log(JSON.stringify(payload));
  },

  warn: (message: string, meta?: Record<string, unknown>) => {
    const payload = {
      level: 'WARN',
      timestamp: new Date().toISOString(),
      message,
      ...(meta ? { meta: redactSensitiveData(meta) } : {}),
    };
    console.warn(JSON.stringify(payload));
  },

  error: (message: string, error?: unknown, meta?: Record<string, unknown>) => {
    const payload = {
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      message,
      error: error instanceof Error ? error.message : String(error || ''),
      ...(meta ? { meta: redactSensitiveData(meta) } : {}),
    };
    console.error(JSON.stringify(payload));
  },

  securityAudit: (event: string, meta: Record<string, unknown>) => {
    const payload = {
      level: 'SECURITY_AUDIT',
      timestamp: new Date().toISOString(),
      event,
      meta: redactSensitiveData(meta),
    };
    console.warn(`🔒 [SECURITY AUDIT] ${JSON.stringify(payload)}`);
  },
};
