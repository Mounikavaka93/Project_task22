import { Link } from 'react-router-dom'

export default function Logo({ className = '', compact = false }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 no-underline ${className}`}
      aria-label="Cat Energy home"
    >
      <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-[10px] bg-brand shadow-[inset_0_-3px_0_rgb(0_0_0_/_0.12)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
        <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
          <path
            fill="#111"
            d="M12.5 20c0-6.2 3.2-11 7.4-12.4 1.4 2.4 2.8 3.8 4.6 3.8s3.2-1.4 4.6-3.8c4.2 1.4 7.4 6.2 7.4 12.4 0 9.2-5 18-12 18s-12-8.8-12-18z"
          />
          <circle className="logo-eye" cx="20" cy="21" r="1.6" fill="#fff" />
          <circle className="logo-eye" cx="29.2" cy="21" r="1.6" fill="#fff" style={{ animationDelay: '180ms' }} />
          <path
            d="M24.6 25.2c1.7 0 3 1.3 3 1.3"
            stroke="#fff"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path className="logo-ear" d="M16 16.5l-4-4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
          <path className="logo-ear" d="M33.5 16.5l4-4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="font-heading text-[22px] font-medium uppercase leading-none tracking-[0.04em] text-ink transition-colors duration-300 group-hover:text-brand">
          Cat
          <span className="block text-[15px] tracking-[0.18em] text-soft transition-colors duration-300 group-hover:text-brand">
            Energy
          </span>
        </span>
      )}
    </Link>
  )
}
