import { z } from 'zod';

/**
 * Server and Client Environment Variable Validation Schema
 * 
 * Enforces strict type checking and required environment variables in production.
 * Provides safe defaults in development mode for seamless local prototyping.
 */

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Server-only secrets (Never exposed to client)
  STRIPE_SECRET_KEY: z.string().min(1).optional().default('sk_test_placeholder_key'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional().default('whsec_placeholder_key'),
  SMOOBU_API_KEY: z.string().min(1).optional().default('smoobu_placeholder_key'),
  SMOOBU_USER_ID: z.string().optional().default(''),
  CLOUDFLARE_TURNSTILE_SECRET_KEY: z.string().optional().default(''),
  CSRF_SECRET: z.string().min(16).optional().default('crystal_spa_super_secure_csrf_secret_2026'),
  
  // Public client-side environment variables
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('http://localhost:3000'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional().default('pk_test_placeholder_key'),
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z.string().optional().default(''),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables configuration:', parsedEnv.error.format());
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment variables in production environment. Halting startup.');
  }
}

export const env = parsedEnv.success
  ? parsedEnv.data
  : envSchema.parse({
      NODE_ENV: process.env.NODE_ENV || 'development',
    });

/**
 * Helper to ensure a server secret is configured before executing critical transactions (e.g. Stripe checkout)
 */
export function assertServerSecret(key: keyof typeof env, name: string): string {
  const val = env[key];
  if (!val || val.includes('placeholder')) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`CRITICAL: Server secret "${name}" is not configured in production.`);
    }
  }
  return (val as string) || '';
}
