import { ChevronDown } from 'lucide-react'
import type { ReactNode, SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

import { controlBase, controlTone, Field, fieldIds, type FieldProps } from './Field'

type SelectProps = FieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'required'> & {
    className?: string
    children: ReactNode
  }

export function Select({
  id,
  label,
  hint,
  error,
  required,
  tone = 'light',
  className,
  children,
  ...rest
}: SelectProps) {
  const { describedBy } = fieldIds(id, hint, error)

  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} tone={tone}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            controlBase,
            controlTone(tone, Boolean(error)),
            'h-12 appearance-none pr-11',
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            'pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2',
            tone === 'dark' ? 'text-slate-400' : 'text-slate-600',
          )}
        />
      </div>
    </Field>
  )
}
