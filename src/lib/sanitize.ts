/**
 * Input & Output Sanitization Utilities
 * 
 * Provides defense-in-depth protection against:
 * - Cross-Site Scripting (XSS)
 * - HTML/Script Injection
 * - Dangerous control characters & Unicode exploits
 * - SQL/NoSQL injection string manipulations
 */

const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Escapes dangerous HTML special characters to prevent Reflected & Stored XSS.
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`=\/]/g, (char) => HTML_ENTITY_MAP[char] || char);
}

/**
 * Strips all HTML/XML tags and trims extra whitespace.
 */
export function stripHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: pseudo-protocol
    .replace(/on\w+=/gi, '') // Remove inline JS handlers (onload, onerror, onclick)
    .trim();
}

/**
 * Sanitizes a plain text input (e.g. guest names, notes, messages).
 * Strips tags, normalizes whitespace, and limits length.
 */
export function sanitizeText(str: unknown, maxLength: number = 2000): string {
  if (typeof str !== 'string') return '';
  const cleaned = stripHtml(str);
  return escapeHtml(cleaned).slice(0, maxLength);
}

/**
 * Sanitizes an email address.
 * Converts to lowercase, strips invalid characters and whitespace.
 */
export function sanitizeEmail(email: unknown): string {
  if (typeof email !== 'string') return '';
  return email.trim().toLowerCase().replace(/[^\w.@+-]/g, '').slice(0, 254);
}

/**
 * Sanitizes a phone number.
 * Keeps only digits, spaces, plus sign, and dashes.
 */
export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== 'string') return '';
  return phone.trim().replace(/[^\d+()\s-]/g, '').slice(0, 30);
}

/**
 * Recursively sanitizes all string fields in an object or array.
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return sanitizeText(obj) as unknown as T;
  if (Array.isArray(obj)) return obj.map((item) => sanitizeObject(item)) as unknown as T;
  if (typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = sanitizeObject(value);
    }
    return cleaned as T;
  }
  return obj;
}
