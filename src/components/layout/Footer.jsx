import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { contactInfo, navLinks } from '../../data/site'

const social = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <path d="M16 3.2h-8A4.8 4.8 0 003.2 8v8A4.8 4.8 0 008 20.8h8a4.8 4.8 0 004.8-4.8V8A4.8 4.8 0 0016 3.2zm3.2 12.8a3.2 3.2 0 01-3.2 3.2H8a3.2 3.2 0 01-3.2-3.2V8A3.2 3.2 0 018 4.8h8A3.2 3.2 0 0119.2 8v8zM12 7.4A4.6 4.6 0 107.4 12 4.6 4.6 0 0012 7.4zm0 7.6A3 3 0 1115 12a3 3 0 01-3 3zm4.85-8.55a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z" />
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <path d="M14.2 8.4h2.2V5.2h-2.2c-2.7 0-4.4 1.6-4.4 4.4v1.8H8v3.2h1.8V22h3.6v-7.4h2.4l.6-3.2h-3V9.8c0-1 .4-1.4 1.4-1.4z" />
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <path d="M21.6 7.6a2.8 2.8 0 00-2-2C17.8 5.2 12 5.2 12 5.2s-5.8 0-7.6.4a2.8 2.8 0 00-2 2A29 29 0 002 12a29 29 0 00.4 4.4 2.8 2.8 0 002 2c1.8.4 7.6.4 7.6.4s5.8 0 7.6-.4a2.8 2.8 0 002-2A29 29 0 0022 12a29 29 0 00-.4-4.4zM10 15.2V8.8l5.6 3.2z" />
    ),
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-fog">
      <div className="container-site grid w-full items-start gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-soft">
            Functional nutrition for cats that need to lose weight, build muscle, or simply eat cleaner.
          </p>
          <div className="mt-5 flex gap-3">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="group grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:bg-brand hover:text-white hover:shadow-[0_8px_16px_rgb(104_183_56_/_0.35)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-125">
                  {item.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm uppercase tracking-[0.2em] text-ink">Quick links</h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="inline-block text-sm text-soft transition-all duration-300 hover:translate-x-1 hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm uppercase tracking-[0.2em] text-ink">Programs</h3>
          <ul className="mt-4 space-y-2 text-sm text-soft">
            <li>
              <Link to="/products" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand">
                Cat Energy Slim
              </Link>
            </li>
            <li>
              <Link to="/products" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand">
                Cat Energy Pro
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand">
                Subscription plans
              </Link>
            </li>
            <li>
              <Link to="/cart" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand">
                Dealer partnership
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm uppercase tracking-[0.2em] text-ink">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-soft">
            <li>{contactInfo.address}</li>
            <li>
              <a href={`tel:${contactInfo.phone}`} className="transition-colors hover:text-brand">
                {contactInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-brand">
                {contactInfo.email}
              </a>
            </li>
            <li>{contactInfo.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex w-full flex-col items-center justify-between gap-2 py-5 text-center text-xs uppercase tracking-[0.12em] text-soft sm:flex-row sm:items-center sm:text-left">
          <p>© {new Date().getFullYear()} Cat Energy. All rights reserved.</p>
          <p>Functional nutrition for cats</p>
        </div>
      </div>
    </footer>
  )
}
