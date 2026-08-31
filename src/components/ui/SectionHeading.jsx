export default function SectionHeading({ eyebrow, title, text, light = false, align = 'left', className = '' }) {
  const alignment =
    align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left'

  return (
    <div className={`mb-10 flex w-full max-w-2xl flex-col ${alignment} md:mb-14 ${className}`}>
      {eyebrow && (
        <p className="mb-3 font-heading text-xs font-medium uppercase tracking-[0.28em] text-brand">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-3xl font-medium uppercase leading-tight tracking-wide md:text-5xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <span className="heading-line" aria-hidden="true" />
      {text && (
        <p className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${light ? 'text-white/75' : 'text-soft'}`}>
          {text}
        </p>
      )}
    </div>
  )
}
