/**
 * Production In-Memory Sliding Window Rate Limiter
 * 
 * Provides DDoS, brute-force, and automated bot scraping mitigation.
 * Optimized for high throughput with automatic periodic garbage collection.
 */

interface RateLimitRecord {
  timestamps: number[];
}

export interface RateLimitOptions {
  windowMs: number; // Duration of the rate limit window in milliseconds
  maxRequests: number; // Max number of allowed requests per window
  identifier?: string; // Optional custom key identifier (defaults to client IP)
}

// In-memory token store mapping `${route}:${ip}` -> RateLimitRecord
const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale records every 5 minutes to ensure minimal memory footprint
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleRecords(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitStore.entries()) {
    // Keep only timestamps within the last 1 hour
    const recentTimestamps = record.timestamps.filter((ts) => now - ts < 60 * 60 * 1000);
    if (recentTimestamps.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = recentTimestamps;
    }
  }
}

/**
 * Extracts client IP address from request headers
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(',')[0];
    if (firstIp) return firstIp.trim();
  }

  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  return '127.0.0.1';
}

/**
 * Evaluates rate limit for a request against given constraints
 */
export function checkRateLimit(
  request: Request,
  routeKey: string,
  options: RateLimitOptions = { windowMs: 15 * 60 * 1000, maxRequests: 20 }
): { isLimited: boolean; remaining: number; resetTime: number; limit: number } {
  const now = Date.now();
  cleanupStaleRecords(now);

  const ip = options.identifier || getClientIp(request);
  const cacheKey = `${routeKey}:${ip}`;

  const record = rateLimitStore.get(cacheKey) || { timestamps: [] };
  
  // Filter out timestamps outside the sliding window
  const validTimestamps = record.timestamps.filter((ts) => now - ts < options.windowMs);

  if (validTimestamps.length >= options.maxRequests) {
    const oldestTimestamp = validTimestamps[0] || now;
    const resetTime = oldestTimestamp + options.windowMs;
    return {
      isLimited: true,
      remaining: 0,
      resetTime,
      limit: options.maxRequests,
    };
  }

  // Record this request
  validTimestamps.push(now);
  rateLimitStore.set(cacheKey, { timestamps: validTimestamps });

  const remaining = options.maxRequests - validTimestamps.length;
  const resetTime = now + options.windowMs;

  return {
    isLimited: false,
    remaining,
    resetTime,
    limit: options.maxRequests,
  };
}
