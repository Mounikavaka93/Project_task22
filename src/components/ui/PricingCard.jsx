import Button from './Button'

export default function PricingCard({ plan, yearly }) {
  const price = yearly ? plan.yearly : plan.monthly
  const period = yearly ? '/ year' : '/ month'

  return (
    <article
      className={`relative flex h-full w-full flex-col border p-8 pt-10 transition-all duration-500 ${
        plan.recommended
          ? 'z-10 animate-glow border-brand bg-ink text-white shadow-[0_24px_50px_rgb(17_17_17_/_0.22)] ring-2 ring-brand'
          : 'border-line bg-white hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgb(17_17_17_/_0.08)]'
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 animate-pulse-soft bg-brand px-4 py-1 font-heading text-xs uppercase tracking-[0.18em] text-white">
          Recommended
        </span>
      )}
      <p className={`font-heading text-xs uppercase tracking-[0.22em] ${plan.recommended ? 'text-brand' : 'text-brand'}`}>
        {plan.tagline}
      </p>
      <h3 className="mt-2 font-heading text-3xl uppercase tracking-wide">{plan.name}</h3>
      <p className="mt-6 flex items-end gap-1">
        <span className="font-heading text-5xl leading-none">${price}</span>
        <span className={`mb-1 text-sm ${plan.recommended ? 'text-white/60' : 'text-soft'}`}>{period}</span>
      </p>
      <ul className="mt-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-transform duration-300 hover:scale-125 ${plan.recommended ? 'bg-brand text-white' : 'bg-brand-light text-brand'}`}>
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                <path d="M2 6.2l2.6 2.6L10 3.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <Button
        to="/contact"
        variant={plan.recommended ? 'primary' : 'outline'}
        showArrow
        className="mt-8 w-full"
      >
        {plan.cta}
      </Button>
    </article>
  )
}
