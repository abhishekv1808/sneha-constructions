'use client'

/**
 * Axonometric massing model in 1px linework — the commercial page's answer to
 * the residential hero's photograph. Floor plates stack as the visitor changes
 * the storey count, so the diagram is the output of the configurator rather
 * than decoration beside it.
 *
 * Standard 30° isometric: the right axis runs (cos30, sin30) and the left axis
 * (-cos30, sin30), so a plate's four corners are one plot's width along each.
 */

const COS30 = 0.866
const SIN30 = 0.5

const WIDTH = 100 // plot run along the right axis
const DEPTH = 80 // plot run along the left axis
const FLOOR_H = 26

/**
 * Origin is chosen so the tallest case (5 levels) fits the 260² viewBox with an
 * even 20px margin: the drawing runs 220 tall (130 of stack + 90 of ground
 * plate) and 156 wide. Shorter buildings simply sit lower on the same ground
 * plane, which is what a growing massing model should do.
 */
const ORIGIN_X = 121
const ORIGIN_Y = 150

interface Point {
  x: number
  y: number
}

function plateCorners(originX: number, originY: number, elevation: number): Point[] {
  const top: Point = { x: originX, y: originY - elevation }
  return [
    top,
    { x: top.x + WIDTH * COS30, y: top.y + WIDTH * SIN30 },
    { x: top.x + WIDTH * COS30 - DEPTH * COS30, y: top.y + WIDTH * SIN30 + DEPTH * SIN30 },
    { x: top.x - DEPTH * COS30, y: top.y + DEPTH * SIN30 },
  ]
}

const toPath = (pts: Point[]) =>
  `${pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')} Z`

export function MassingDiagram({ levels }: { levels: number }) {
  const ground = plateCorners(ORIGIN_X, ORIGIN_Y, 0)
  const plates = Array.from({ length: levels }, (_, i) =>
    plateCorners(ORIGIN_X, ORIGIN_Y, (i + 1) * FLOOR_H),
  )
  const top = plates[plates.length - 1] ?? ground

  return (
    <svg
      viewBox="0 0 260 260"
      className="h-full w-full"
      role="img"
      aria-label={`Massing diagram showing a ${levels === 1 ? 'ground floor' : `ground plus ${levels - 1}`} building on the plot`}
    >
      {/* Plot outline on the ground plane */}
      <path
        d={toPath(ground)}
        fill="var(--color-brand-500)"
        fillOpacity="0.06"
        stroke="var(--color-plaster-300)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      {/* Corner columns, drawn once to the current roof height */}
      {ground.map((corner, i) => (
        <line
          key={`col-${i}`}
          x1={corner.x}
          y1={corner.y}
          x2={(top[i] as Point).x}
          y2={(top[i] as Point).y}
          stroke="var(--color-plaster-300)"
          strokeWidth="1"
        />
      ))}

      {/* Floor plates, lightest at the bottom so the stack reads upward */}
      {plates.map((plate, i) => {
        const isRoof = i === plates.length - 1
        return (
          <path
            key={`plate-${i}`}
            d={toPath(plate)}
            fill={isRoof ? 'var(--color-brand-500)' : '#ffffff'}
            fillOpacity={isRoof ? 0.12 : 0.75}
            stroke={isRoof ? 'var(--color-brand-500)' : 'var(--color-plaster-300)'}
            strokeWidth="1"
            strokeLinejoin="round"
            style={{
              // Each newly added plate rises into place; existing ones sit still.
              animation: 'commercial-plate-rise 260ms cubic-bezier(0.22,1,0.36,1) both',
            }}
            data-motion
          />
        )
      })}
    </svg>
  )
}
