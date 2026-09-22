import { NextRequest } from 'next/server';
import { contactRequestSchema } from '@/lib/validations/schemas';
import { successResponse, errorResponse, rateLimitResponse } from '@/lib/api-response';
import { checkRateLimit } from '@/lib/rate-limit';
import { isHoneypotTriggered } from '@/lib/captcha';
import { sanitizeText, sanitizeEmail, sanitizePhone } from '@/lib/sanitize';
import { logger } from '@/lib/logger';

/**
 * POST /api/contact
 * 
 * Secure Contact & VIP Concierge Request Handler
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check (5 requests / 15 minutes per IP)
    const rateCheck = checkRateLimit(request, 'contact-submit', {
      windowMs: 15 * 60 * 1000,
      maxRequests: 5,
    });
    if (rateCheck.isLimited) {
      logger.securityAudit('CONTACT_RATE_LIMIT_HIT', { ip: request.headers.get('x-forwarded-for') });
      return rateLimitResponse(Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
    }

    // 2. Parse payload
    const rawBody = await request.json();

    // 3. Honeypot check
    if (isHoneypotTriggered(rawBody.hp_website_url)) {
      logger.securityAudit('SPAM_BOT_BLOCKED_HONEYPOT', { endpoint: '/api/contact' });
      return successResponse(null, 'Votre message a été transmis à la conciergerie.');
    }

    // 4. Validate with Zod
    const validated = contactRequestSchema.parse(rawBody);

    const sanitizedData = {
      name: sanitizeText(validated.name, 100),
      email: sanitizeEmail(validated.email),
      phone: validated.phone ? sanitizePhone(validated.phone) : undefined,
      subject: sanitizeText(validated.subject || 'Demande Conciergerie', 150),
      message: sanitizeText(validated.message, 2000),
      createdAt: new Date().toISOString(),
    };

    logger.info('Concierge contact inquiry received', {
      name: sanitizedData.name,
      subject: sanitizedData.subject,
    });

    return successResponse(
      null,
      `Merci ${sanitizedData.name}. Votre demande a bien été transmise à notre service Conciergerie Crystal Spa. Nous vous répondrons sous 1 heure à l’adresse ${sanitizedData.email}.`
    );
  } catch (error) {
    logger.error('Failed to process contact inquiry', error);
    return errorResponse(error, 400, 'Impossible d’envoyer le message. Veuillez vérifier vos coordonnées.');
  }
}
