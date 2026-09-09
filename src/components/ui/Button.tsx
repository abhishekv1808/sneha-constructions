'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'glass' | 'white' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ArrowType = 'right' | 'diagonal' | boolean

const baseClasses = [
  'group relative inline-flex items-center justify-between whitespace-nowrap rounded-full',
  'font-secondary tracking-wide select-none',
  'transition-all duration-200 ease-out',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CE1C73]',
  'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
].join(' ')

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'border border-[#CE1C73] bg-[#CE1C73] text-white',
    'shadow-md shadow-[#CE1C73]/25',
    'hover:border-[#B81564] hover:bg-[#B81564] hover:shadow-xl hover:shadow-[#CE1C73]/35 hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'border border-slate-300/90 bg-white text-slate-800',
    'shadow-sm',
    'hover:border-[#CE1C73] hover:text-[#CE1C73] hover:shadow-md hover:shadow-[#CE1C73]/15 hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),
  dark: [
    'border border-[#0C4678]/80 bg-[#06233D] text-white',
    'shadow-md shadow-black/20',
    'hover:border-[#CE1C73] hover:bg-[#CE1C73] hover:shadow-xl hover:shadow-[#CE1C73]/30 hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),
  glass: [
    'border border-white/25 bg-white/10 backdrop-blur-md text-white',
    'shadow-lg shadow-black/10',
    'hover:border-[#CE1C73] hover:bg-[#CE1C73] hover:text-white hover:shadow-xl hover:shadow-[#CE1C73]/30 hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),
  white: [
    'border border-white bg-white text-slate-900',
    'shadow-lg shadow-black/10',
    'hover:bg-slate-50 hover:shadow-xl hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'border border-transparent bg-transparent text-slate-700',
    'hover:text-[#CE1C73] hover:bg-slate-100/70',
    'active:scale-[0.98]',
  ].join(' '),
}

const badgeVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-white text-[#CE1C73] shadow-sm',
  secondary: 'bg-slate-100 text-slate-700 group-hover:bg-[#CE1C73] group-hover:text-white',
  dark: 'bg-white/15 text-white group-hover:bg-white group-hover:text-[#CE1C73]',
  glass: 'bg-white/20 text-white group-hover:bg-white group-hover:text-[#CE1C73]',
  white: 'bg-[#CE1C73] text-white shadow-sm',
  ghost: 'bg-slate-100 text-slate-700 group-hover:bg-[#CE1C73] group-hover:text-white',
}

interface SharedProps {
  variant?: ButtonVariant
  size?: ButtonSize
  arrow?: ArrowType
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  pulse?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & { href?: never }

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  icon,
  iconPosition = 'right',
  pulse = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const hasIcon = Boolean(arrow || icon)
  const isDiagonal = arrow === 'diagonal'

  // Dimensions & padding
  const sizeClasses = {
    sm: hasIcon
      ? iconPosition === 'right'
        ? 'h-10 pl-4 pr-1.5 text-xs font-bold gap-2.5'
        : 'h-10 pr-4 pl-1.5 text-xs font-bold gap-2.5'
      : 'h-10 px-5 text-xs font-bold gap-2',
    md: hasIcon
      ? iconPosition === 'right'
        ? 'h-12 pl-5 pr-2 text-sm font-bold gap-3'
        : 'h-12 pr-5 pl-2 text-sm font-bold gap-3'
      : 'h-12 px-6 text-sm font-bold gap-2',
    lg: hasIcon
      ? iconPosition === 'right'
        ? 'h-14 pl-7 pr-2.5 text-[0.9375rem] sm:text-base font-bold gap-3.5'
        : 'h-14 pr-7 pl-2.5 text-[0.9375rem] sm:text-base font-bold gap-3.5'
      : 'h-14 px-8 text-[0.9375rem] sm:text-base font-bold gap-2.5',
  }[size]

  // Icon capsule sizing
  const badgeSizeClasses = {
    sm: 'h-7 w-7 rounded-full',
    md: 'h-8 w-8 rounded-full',
    lg: 'h-9 w-9 rounded-full',
  }[size]

  const iconSizes = {
    sm: 14,
    md: 15,
    lg: 17,
  }[size]

  const renderIconBadge = () => {
    if (!hasIcon) return null

    let iconContent: ReactNode = icon

    if (arrow) {
      if (isDiagonal) {
        iconContent = (
          <ArrowUpRight
            size={iconSizes}
            strokeWidth={2.5}
            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )
      } else {
        iconContent = (
          <ArrowRight
            size={iconSizes}
            strokeWidth={2.5}
            className="transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        )
      }
    }

    return (
      <span
        className={cn(
          'flex shrink-0 items-center justify-center transition-all duration-200 ease-out',
          badgeSizeClasses,
          badgeVariantClasses[variant],
        )}
      >
        {iconContent}
      </span>
    )
  }

  const content = (
    <>
      {hasIcon && iconPosition === 'left' && renderIconBadge()}
      <span className="truncate">{children}</span>
      {hasIcon && iconPosition === 'right' && renderIconBadge()}
      {pulse && (
        <span
          className="absolute inset-0 -z-10 rounded-full bg-[#CE1C73] opacity-40 animate-ping pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  )

  const combinedClass = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses,
    pulse && 'ring-2 ring-[#CE1C73]/40',
    className,
  )

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink
    return (
      <Link href={href} className={combinedClass} {...rest}>
        {content}
      </Link>
    )
  }

  const { type = 'button', ...rest } = props as ButtonAsButton
  return (
    <button type={type} className={combinedClass} {...rest}>
      {content}
    </button>
  )
}
