const marqueeItems = [
  'LUXURY RESIDENTIAL HOMES',
  '3D ARCHITECTURAL DESIGN',
  'TURNKEY CIVIL CONSTRUCTION',
  'PREMIUM SOURCED MATERIALS',
  'TRANSPARENT PRICING',
  'EARTHQUAKE RESISTANT FRAMES',
  'ON-TIME DELIVERY',
  'IN-HOUSE ARCHITECTS & ENGINEERS',
]

export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-[#CE1C73] py-4 shadow-inner">
      <div className="flex w-max items-center animate-marquee whitespace-nowrap">
        {/* First repetition */}
        <div className="flex items-center gap-8 px-4">
          {marqueeItems.map((text, i) => (
            <div key={`m1-${i}`} className="flex items-center gap-8">
              <span className="font-display text-lg font-black tracking-wider text-white sm:text-xl">
                {text}
              </span>
              <span className="text-white/80 font-black text-xl select-none" aria-hidden="true">
                ★
              </span>
            </div>
          ))}
        </div>

        {/* Second repetition for seamless loop */}
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          {marqueeItems.map((text, i) => (
            <div key={`m2-${i}`} className="flex items-center gap-8">
              <span className="font-display text-lg font-black tracking-wider text-white sm:text-xl">
                {text}
              </span>
              <span className="text-white/80 font-black text-xl select-none">
                ★
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
