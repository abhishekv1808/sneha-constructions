'use client'

import { useState } from 'react'

import {
  CountUp,
  MotionProvider,
  ReducedMotionOverride,
  RevealText,
  useReducedMotion,
} from '@/components/motion'
import { Button, Chip, Rule } from '@/components/ui'
import { formatSqft } from '@/lib/utils/format'

const AREAS = [1200, 2400, 3600, 4800]
const RATE = 1875

function Readout() {
  const reduced = useReducedMotion()
  return <Chip selected={reduced}>{reduced ? 'Reduced motion: on' : 'Reduced motion: off'}</Chip>
}

function Demos() {
  const reduced = useReducedMotion()
  const [replayKey, setReplayKey] = useState(0)
  const [area, setArea] = useState(2400)

  return (
    <div className="flex flex-col gap-12">
      <div>
        <p className="mb-3 text-meta text-slate-400">
          RevealText — clip-path mask, 60ms stagger, trigger on mount
        </p>
        <RevealText
          key={replayKey}
          as="p"
          trigger="mount"
          className="max-w-[22ch] text-display-2"
          lines={['Homes built to last,', 'in Tumkur since', 'day one.']}
        />
        <Button
          size="sm"
          variant="secondary"
          className="mt-6"
          onClick={() => setReplayKey((k) => k + 1)}
        >
          Replay
        </Button>
      </div>

      <Rule />

      <div>
        <p className="mb-3 text-meta text-slate-400">
          CountUp — spring 180/26, tabular numerals, formatted through formatINR
        </p>
        <p className="text-numeral">
          <CountUp value={area * RATE} />
        </p>
        <p className="mt-2 text-body-sm text-slate-600">
          {formatSqft(area)} at ₹{RATE}/sq ft
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {AREAS.map((value) => (
            <Button
              key={value}
              size="sm"
              variant={value === area ? 'primary' : 'secondary'}
              onClick={() => setArea(value)}
            >
              {formatSqft(value)}
            </Button>
          ))}
        </div>
      </div>

      <Rule />

      <div>
        <p className="mb-3 text-meta text-slate-400">
          RevealText — trigger on scroll, viewport {'{ once: true, amount: 0.3 }'}. Scroll it out of
          view and back: it must not replay.
        </p>
        <div className="h-64 overflow-y-auto border border-plaster-200 bg-plaster-50 p-6">
          <p className="text-body-sm text-slate-600">Scroll down inside this box.</p>
          <div className="h-72" aria-hidden="true" />
          <RevealText
            as="p"
            trigger="inView"
            className="max-w-[22ch] text-heading-3"
            lines={['Ask what goes into', 'the walls. We will', 'tell you.']}
          />
          <div className="h-72" aria-hidden="true" />
        </div>
      </div>

      <Rule />

      <div>
        <p className="mb-3 text-meta text-slate-400">Reduced path, rendered side by side</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-plaster-200 p-5">
            <p className="mb-3 text-meta text-slate-400">As resolved now</p>
            <RevealText
              key={`live-${replayKey}-${String(reduced)}`}
              trigger="mount"
              className="text-heading-3"
              lines={['Premium materials,', 'transparent pricing.']}
            />
          </div>
          <ReducedMotionOverride.Provider value={true}>
            <div className="border border-plaster-200 p-5">
              <p className="mb-3 text-meta text-slate-400">Forced reduced</p>
              <RevealText
                key={`forced-${replayKey}`}
                trigger="mount"
                className="text-heading-3"
                lines={['Premium materials,', 'transparent pricing.']}
              />
            </div>
          </ReducedMotionOverride.Provider>
        </div>
      </div>
    </div>
  )
}

// MotionProvider is mounted per animated subtree rather than in the root layout:
// Motion's core is ~47kB gzip and routes that do not animate should not pay it.
export function MotionDemo() {
  const [simulate, setSimulate] = useState(false)

  return (
    <MotionProvider>
      <div className="mb-10 flex flex-wrap items-center gap-4 border border-plaster-200 bg-plaster-50 p-5">
        <Button
          size="sm"
          variant={simulate ? 'primary' : 'secondary'}
          aria-pressed={simulate}
          onClick={() => setSimulate((value) => !value)}
        >
          {simulate ? 'Stop simulating reduced motion' : 'Simulate reduced motion'}
        </Button>
        <ReducedMotionOverride.Provider value={simulate ? true : null}>
          <Readout />
        </ReducedMotionOverride.Provider>
        <p className="text-body-sm text-slate-600">
          With the toggle off this follows your OS setting.
        </p>
      </div>

      <ReducedMotionOverride.Provider value={simulate ? true : null}>
        <Demos />
      </ReducedMotionOverride.Provider>
    </MotionProvider>
  )
}
