import type { TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

import { controlBase, controlTone, Field, fieldIds, type FieldProps } from './Field'

type TextareaProps = FieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'required'> & { className?: string }

export function Textarea({
  id,
  label,
  hint,
  error,
  required,
  tone = 'light',
  rows = 5,
  className,
  ...rest
}: TextareaProps) {
  const { describedBy } = fieldIds(id, hint, error)

  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} tone={tone}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlBase, controlTone(tone, Boolean(error)), 'py-3', className)}
        {...rest}
      />
    </Field>
  )
}
