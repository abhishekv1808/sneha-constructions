'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader2, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Input, Select, Textarea } from '@/components/ui'
import { contact, whatsappUrl } from '@/content'
import { leadFormSchema, SERVICE_TYPES, type LeadFormInput } from '@/lib/validation'

/**
 * §11 — the contact form. This is one of the few client components in the
 * project: it has form state and handlers (§9, §15).
 *
 * - react-hook-form + zod for client-side validation; the same schema re-
 *   validates on the server in /api/leads.
 * - Hidden honeypot field + loadedAt timestamp for anti-spam without a CAPTCHA.
 * - Success copy repeats the phone number — §11: "We'll call you within one
 *   working day. In a hurry? Call +91 80014 80064."
 * - Error copy states what happened and what to do — §11: no apologies, no
 *   vagueness.
 */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      serviceType: undefined,
      message: '',
      honeypot: '',
      loadedAt: Date.now(),
    },
  })

  async function onSubmit(data: LeadFormInput) {
    setStatus('submitting')
    setServerError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setServerError(
          result.error ||
            "Couldn't send that — check your phone number, or call us on +91 80014 80064.",
        )
        setStatus('error')
        return
      }

      setStatus('success')
      reset()
    } catch {
      setServerError(
        "Couldn't send that — check your phone number, or call us on +91 80014 80064.",
      )
      setStatus('error')
    }
  }

  // §11: inline success state that repeats the phone number.
  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-6 rounded-card border border-plaster-200 bg-plaster-50 p-8">
        <div className="flex items-center gap-3 text-success">
          <CheckCircle size={24} strokeWidth={1.5} aria-hidden="true" />
          <p className="text-heading-4">Message sent</p>
        </div>
        <p className="text-body text-slate-600">
          We&rsquo;ll call you within one working day. In a hurry? Call{' '}
          <a
            href={contact.phoneHref}
            className="text-oxide-600 transition-[color] duration-150 ease-out hover:text-oxide-500"
          >
            {contact.phoneDisplay}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            setStatus('idle')
            reset({
              fullName: '',
              phone: '',
              email: '',
              serviceType: undefined,
              message: '',
              honeypot: '',
              loadedAt: Date.now(),
            })
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {/* §11 anti-spam: honeypot. aria-hidden and tabIndex -1 keep it invisible
          to humans and screen readers; bots that parse the HTML fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
        <label htmlFor="contact-hp">Do not fill this in</label>
        <input id="contact-hp" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      {/* Hidden timestamp for the §11 timing check. */}
      <input type="hidden" {...register('loadedAt', { valueAsNumber: true })} />

      <Input
        id="contact-name"
        label="Full name"
        required
        placeholder="Your full name"
        autoComplete="name"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <Input
        id="contact-phone"
        label="Phone"
        required
        type="tel"
        placeholder="+91 98765 43210"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Input
        id="contact-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Select
        id="contact-service"
        label="What are you looking for?"
        error={errors.serviceType?.message}
        {...register('serviceType')}
      >
        <option value="">Select a service type</option>
        {SERVICE_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>

      <Textarea
        id="contact-message"
        label="Message"
        placeholder="Tell us about your project — plot size, location, timeline, anything that helps."
        error={errors.message?.message}
        {...register('message')}
      />

      {/* §11: error copy states what happened and what to do. */}
      {status === 'error' && serverError ? (
        <p className="text-body-sm text-danger" role="alert">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 size={20} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </Button>

        <a
          href={whatsappUrl("Hi, I'd like to discuss a construction project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-secondary text-body-sm text-oxide-600 transition-[color] duration-150 ease-out hover:text-oxide-500"
        >
          <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
          Or message us on WhatsApp
        </a>
      </div>
    </form>
  )
}
