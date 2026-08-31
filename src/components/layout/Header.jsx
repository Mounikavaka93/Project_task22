import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../ui/Logo'
import { navLinks } from '../../data/site'
import { useCart } from '../../context/CartContext'

function CartLink() {
  const { count } = useCart()
  const prev = useRef(count)
  const [bump, setBump] = useState(false)

  useEffect(() => {
    if (count > prev.current) {
      setBump(true)
      const timer = window.setTimeout(() => setBump(false), 450)
      prev.current = count
      return () => window.clearTimeout(timer)
    }
    prev.current = count
    return undefined
  }, [count])

  return (
    <NavLink
      to="/cart"
      aria-label={`Cart, ${count} items`}
      className={({ isActive }) =>
        `relative grid h-11 w-11 shrink-0 place-items-center transition-colors duration-300 ${
          isActive ? 'text-brand' : 'text-ink hover:text-brand'
        }`
      }
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M6 8h15l-1.4 8.2A2 2 0 0117.6 18H8.4a2 2 0 01-2-1.6L5 6H3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="17" cy="20" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      {count > 0 && (
        <span
          className={`absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 font-heading text-[10px] leading-none text-white ${
            bump ? 'animate-cart-bump' : ''
          }`}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </NavLink>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? 'border-line bg-white/95 shadow-[0_8px_24px_rgb(17_17_17_/_0.06)] backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <div className="container-site flex h-[72px] w-full items-center justify-between gap-4 md:h-20 lg:h-[86px]">
        <Logo className="shrink-0" />

        <nav className="hidden min-w-0 flex-1 items-center justify-end lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `group relative shrink-0 px-2.5 py-2 font-heading text-[13px] uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 xl:px-3 xl:text-sm xl:tracking-[0.16em] ${
                  isActive ? 'text-brand' : 'text-ink hover:text-brand'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300 xl:inset-x-3 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CartLink />
          <button
            type="button"
            className="relative z-50 grid h-11 w-11 shrink-0 place-items-center transition-transform duration-300 hover:scale-110 active:scale-95 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
          <span className="sr-only">Menu</span>
          <span className="flex w-7 flex-col gap-1.5">
            <span className={`h-0.5 w-full bg-ink transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-full bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-full bg-ink transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white transition-all duration-300 md:top-20 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
      >
        <nav className="container-site flex flex-col py-6" aria-label="Mobile">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `border-b border-line py-4 font-heading text-xl uppercase tracking-[0.14em] transition-all duration-300 ${
                  isActive ? 'text-brand' : 'text-ink'
                } ${open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`
              }
              style={{ transitionDelay: open ? `${index * 50}ms` : '0ms' }}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `border-b border-line py-4 font-heading text-xl uppercase tracking-[0.14em] transition-all duration-300 ${
                isActive ? 'text-brand' : 'text-ink'
              } ${open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`
            }
            style={{ transitionDelay: open ? `${navLinks.length * 50}ms` : '0ms' }}
          >
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
