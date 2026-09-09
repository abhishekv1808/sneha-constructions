import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

import { controlBase, controlTone, Field, fieldIds, type FieldProps } from './Field'

type InputProps = FieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'required'> & { className?: string }

export function Input({
  id,
  label,
  hint,
  error,
  required,
  tone = 'light',
  className,
  ...rest
}: InputProps) {
  const { describedBy } = fieldIds(id, hint, error)

  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} tone={tone}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlBase, controlTone(tone, Boolean(error)), 'h-12', className)}
        {...rest}
      />
    </Field>
  )
}
