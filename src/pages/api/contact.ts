import type { APIRoute } from 'astro';
import emailjs from '@emailjs/browser';

// Rate limiting storage (in-memory, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3; // 3 emails per hour per IP

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim()
    .slice(0, 2000); // Limit length
}

// Check rate limit
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 minutes

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // CORS check - only allow requests from your domain
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://ditos-bartender.vercel.app',
      'http://localhost:4321',
      'http://localhost:3000',
    ];

    if (origin && !allowedOrigins.includes(origin)) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized origin' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Rate limiting by IP address
    const identifier = clientAddress || 'unknown';
    if (!checkRateLimit(identifier)) {
      console.warn(`Rate limit exceeded for IP: ${identifier}`);
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '3600',
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Honeypot check (bot detection)
    if (body.website || body.url || body.honeypot) {
      console.warn(`Bot detected from IP: ${identifier}`);
      // Return success to fool bots
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate required fields
    const { name, email, phone, subject, event_type, message } = body;

    if (!name || !email || !subject || !event_type || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      from_name: sanitizeInput(name),
      from_email: sanitizeInput(email),
      to_email: 'ditosbartender@gmail.com',
      phone: phone ? sanitizeInput(phone) : 'Not provided',
      subject: sanitizeInput(subject),
      event_type: sanitizeInput(event_type),
      message: sanitizeInput(message),
    };

    // Validate message length
    if (sanitizedData.message.length < 10) {
      return new Response(
        JSON.stringify({ error: 'Message too short' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check for environment variables
    const serviceId = import.meta.env.EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize EmailJS
    emailjs.init(publicKey);

    // Send email via EmailJS
    await emailjs.send(
      serviceId,
      templateId,
      sanitizedData,
      publicKey
    );

    // Log success (without sensitive data)
    console.log(`Email sent successfully from: ${sanitizedData.from_email} (IP: ${identifier})`);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Don't expose internal error details to client
    return new Response(
      JSON.stringify({
        error: 'Failed to send email. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
