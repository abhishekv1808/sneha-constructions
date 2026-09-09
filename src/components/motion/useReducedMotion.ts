'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// null = follow the OS. A boolean forces the answer, which is how the
// kitchen-sink toggle simulates the preference without touching system settings.
export const ReducedMotionOverride = createContext<boolean | null>(null)

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

// There is no media query on the server. Answering "reduced" would render the
// motion path's markup in its final position and then animate it backwards on
// hydration, so the server answers "not reduced" and the
// prefers-reduced-motion block in globals.css keeps that pre-hydration HTML
// visible for anyone who actually set the preference.
function getServerSnapshot() {
  return false
}

export function useReducedMotion(): boolean {
  const override = useContext(ReducedMotionOverride)
  const system = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return override ?? system
}
