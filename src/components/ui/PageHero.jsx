import { Link } from 'react-router-dom'
import PawMarks from './PawMarks'

export default function PageHero({ title, text, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-fog">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-blob rounded-full bg-brand/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 animate-blob rounded-full bg-brand/10 blur-2xl" style={{ animationDelay: '1.4s' }} />
      <PawMarks />
      <div className="container-site relative w-full py-14 md:py-20">
        {crumbs.length > 0 && (
          <nav className="mb-5 animate-fade-in text-sm text-soft" aria-label="Breadcrumb">
            <Link to="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb}>
                <span className="mx-2 text-line">/</span>
                <span className="text-ink">{crumb}</span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="animate-fade-up font-heading text-4xl font-medium uppercase tracking-wide text-ink md:text-6xl">
          {title}
        </h1>
        {text && (
          <p className="mt-4 max-w-2xl animate-fade-up text-base leading-relaxed text-soft md:text-lg" style={{ animationDelay: '120ms' }}>
            {text}
          </p>
        )}
      </div>
    </section>
  )
}
