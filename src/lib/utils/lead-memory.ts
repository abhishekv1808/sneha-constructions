// Remembers, per browser, that a visitor has already become a lead — so the
// exit-intent popup never asks someone who has just sent us their number.
// Storage can throw (private mode, blocked site data); every access is guarded
// and a failure simply means "not remembered".

const LEAD_CAPTURED_KEY = 'sneha:lead-captured'

export function markLeadCaptured(): void {
  try {
    window.localStorage.setItem(LEAD_CAPTURED_KEY, String(Date.now()))
  } catch {
    // Storage unavailable — nothing to remember with.
  }
}

export function hasCapturedLead(): boolean {
  try {
    return window.localStorage.getItem(LEAD_CAPTURED_KEY) !== null
  } catch {
    return false
  }
}
