const items = [
  'Cat Energy Slim',
  'Cat Energy Pro',
  'Chicken',
  'Fish',
  'Buckwheat',
  'Rice',
  'Just add water',
  '30-day results',
  'Vet reviewed',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-3 text-white">
      <div className="marquee-track flex w-max animate-marquee gap-10 pr-10">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 font-heading text-sm uppercase tracking-[0.22em] text-white/80">
            {item}
            <span className="text-brand" aria-hidden="true">
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
