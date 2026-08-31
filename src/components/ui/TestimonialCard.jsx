export default function TestimonialCard({ item, delay = 0 }) {
  return (
    <figure
      className="flex h-full w-full flex-col border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_18px_40px_rgb(104_183_56_/_0.12)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex items-center gap-1 text-brand" aria-label={`${item.rating} out of 5`}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="h-4 w-4 animate-twinkle fill-current"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <path d="M10 1.5l2.4 5.3 5.8.6-4.4 3.8 1.3 5.7L10 13.8 4.9 16.9l1.3-5.7L1.8 7.4l5.8-.6z" />
          </svg>
        ))}
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed text-muted">“{item.quote}”</blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="font-heading text-lg uppercase tracking-wide text-ink">{item.name}</p>
        <p className="text-sm text-soft">
          {item.cat} · {item.result}
        </p>
      </figcaption>
    </figure>
  )
}
