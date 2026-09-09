import { z } from 'zod'

// §11: Phone is the required field, not email — this audience calls.
// Validates as an Indian mobile number, with or without the +91 prefix.
const indianMobileRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/

export const SERVICE_TYPES = [
  'Residential',
  'Commercial',
  'Turnkey',
  'Site visit request',
  'General enquiry',
] as const

export type ServiceType = (typeof SERVICE_TYPES)[number]

/**
 * §11 — the same zod schema validates on client (react-hook-form) and re-
 * validates on the server (/api/leads). Never trust the client copy.
 *
 * The honeypot field and loadedAt timestamp are anti-spam measures that replace
 * a CAPTCHA — CAPTCHAs cost conversions and this traffic volume does not
 * warrant one (§11).
 */
export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .or(z.literal(''))
    .optional()
    .default(''),
  serviceType: z.enum(SERVICE_TYPES).optional(),
  message: z.string().max(2000, 'Message is too long').optional().default(''),
  // Optional customer tool & calculator metadata
  plotDimensions: z.string().max(100).optional().default(''),
  builtUpArea: z.string().or(z.number()).optional().default(''),
  estimatedCost: z.string().max(100).optional().default(''),
  packageTier: z.string().max(100).optional().default(''),
  floors: z.string().max(100).optional().default(''),
  locality: z.string().max(100).optional().default(''),
  vastuFacing: z.string().max(50).optional().default(''),
  source: z.string().max(100).optional().default('Web Form'),
  // §11 anti-spam: a hidden field that bots fill and humans never see.
  honeypot: z.string().max(0).optional().default(''),
  // §11 anti-spam: submissions under 2 seconds are dropped.
  loadedAt: z.number(),
})

/** Output type — after zod applies defaults. Used by the server handler. */
export type LeadFormData = z.output<typeof leadFormSchema>

/**
 * Input type — before defaults are applied. Used by react-hook-form's
 * useForm<T> because the resolver sees the raw form values, not the
 * zod-transformed output.
 */
export type LeadFormInput = z.input<typeof leadFormSchema>

