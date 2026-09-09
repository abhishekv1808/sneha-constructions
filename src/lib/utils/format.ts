// Indian digit grouping (lakh/crore) — ₹18,75,000, never ₹1,875,000.
// Western grouping reads as foreign to this audience. CLAUDE.md §9.
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const integerFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
})

export function formatINR(value: number): string {
  return inrFormatter.format(value)
}

export function formatINRRange(low: number, high: number): string {
  return `${formatINR(low)} – ${formatINR(high)}`
}

export function formatSqft(value: number): string {
  return `${integerFormatter.format(value)} sq ft`
}

export function formatRatePerSqft(value: number): string {
  return `${formatINR(value)} / sq ft`
}
