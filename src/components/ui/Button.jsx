import { Link } from 'react-router-dom'

const variants = {
  primary:
    'border-2 border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgb(104_183_56_/_0.35)]',
  dark: 'border-2 border-ink bg-ink text-white hover:border-black hover:bg-black hover:-translate-y-0.5',
  outline:
    'border-2 border-brand bg-transparent text-brand hover:bg-brand hover:text-white',
  light: 'border-2 border-white bg-white text-ink hover:bg-fog hover:-translate-y-0.5',
}

export default function Button({
  to,
  href,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  showArrow = false,
  ...props
}) {
  const classes = `group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-4 font-heading text-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {showArrow && (
          <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5" aria-hidden="true">
            →
          </span>
        )}
      </span>
      <span className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-[130%]" />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {inner}
    </button>
  )
}
