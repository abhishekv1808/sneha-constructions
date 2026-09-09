import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

import type { SurfaceTone } from './Rule'

export type FieldProps = {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  tone?: SurfaceTone
}

export function fieldIds(id: string, hint?: string, error?: string) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter((value): value is string => value !== undefined)

  return {
    hintId,
    errorId,
    describedBy: describedBy.length > 0 ? describedBy.join(' ') : undefined,
  }
}

// §13: real <label>, never placeholder-only. Errors are aria-live and referenced
// by aria-describedby on the control.
export function Field({
  id,
  label,
  hint,
  error,
  required,
  tone = 'light',
  children,
}: FieldProps & { children: ReactNode }) {
  const { hintId, errorId } = fieldIds(id, hint, error)

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn('text-meta', tone === 'dark' ? 'text-slate-400' : 'text-slate-600')}
      >
        {label}
        {required ? (
          <span
            aria-hidden="true"
            className={tone === 'dark' ? 'text-oxide-300' : 'text-oxide-600'}
          >
            {' *'}
          </span>
        ) : null}
      </label>

      {children}

      {hint ? (
        <p
          id={hintId}
          className={cn('text-body-sm', tone === 'dark' ? 'text-slate-400' : 'text-slate-600')}
        >
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          aria-live="polite"
          className={cn('text-body-sm', tone === 'dark' ? 'text-danger-300' : 'text-danger')}
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const controlBase = [
  'w-full rounded-input border px-4 text-body',
  'transition-[background-color,border-color] duration-150 ease-out',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')

export function controlTone(tone: SurfaceTone, hasError: boolean): string {
  if (tone === 'dark') {
    return cn(
      'on-ink bg-ink-800 text-white placeholder:text-slate-400 hover:border-slate-400',
      hasError ? 'border-danger-300' : 'border-ink-600 focus:border-oxide-300',
    )
  }

  return cn(
    'bg-plaster-50 text-slate-900 placeholder:text-slate-400 hover:border-slate-400',
    hasError ? 'border-danger' : 'border-plaster-300 focus:border-oxide-600',
  )
}
