import { z } from 'zod';

export function sanitizePlainText(input: string): string {
  return input
    .replace(/<[^>]*>?/gm, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim();
}

export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export function isSafeHttpOrLocalUrl(url: string): boolean {
  if (!url) return true;
  if (url.startsWith('/')) return !url.startsWith('//');
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export const projectInquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Full name must be under 120 characters.'),
  businessEmail: z
    .string()
    .trim()
    .email('Please enter a valid business email address.')
    .max(160),
  companyName: z
    .string()
    .trim()
    .min(2, 'Please enter your company or organisation name.')
    .max(140),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid telephone number.')
    .max(30)
    .regex(/^[+0-9()\s-]+$/, 'Telephone number contains invalid characters.'),
  industry: z
    .string()
    .trim()
    .min(2, 'Please select or enter an industry.')
    .max(100),
  requiredServices: z
    .array(z.string().trim().min(2).max(120))
    .min(1, 'Please select at least one required service.')
    .max(20),
  estimatedBudget: z
    .string()
    .trim()
    .min(2, 'Please select an estimated budget range.')
    .max(80),
  projectTimeline: z
    .string()
    .trim()
    .min(2, 'Please select a project timeline.')
    .max(80),
  projectDescription: z
    .string()
    .trim()
    .min(10, 'Please share at least 10 characters describing your brief.')
    .max(3000),
  consentAccepted: z.literal(true, {
    message: 'You must consent to our Privacy Policy before submitting.',
  }),
  websiteHoneypot: z.string().max(0).optional(),
});

export type ProjectInquiryInput = z.infer<typeof projectInquirySchema>;

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(160),
  consentAccepted: z.literal(true, {
    message: 'Explicit consent is required under the Kenya Data Protection Act, 2019.',
  }),
  websiteHoneypot: z.string().max(0).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateInquiryReference(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join('');
  return `EMA-${year}-${suffix}`;
}
