import { useState } from 'react'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import { contactInfo } from '../data/site'

const initial = {
  name: '',
  email: '',
  phone: '',
  program: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  }
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (values.phone.trim() && !/^[\d\s+\-()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Use a valid phone number or leave this blank.'
  }
  if (!values.program) {
    errors.program = 'Choose the program you are interested in.'
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Tell us a little more (at least 10 characters).'
  }
  return errors
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">{label}</span>
      {children}
      <span className={`mt-1 block min-h-5 text-xs text-danger transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
        {error || 'placeholder'}
      </span>
    </label>
  )
}

const inputClass = (error) =>
  `box-border min-h-[52px] w-full border bg-white px-4 py-3 font-heading text-sm uppercase tracking-wide outline-none transition-all duration-300 focus:border-ink focus:shadow-[0_0_0_4px_rgb(104_183_56_/_0.12)] ${
    error ? 'border-danger' : 'border-line hover:border-[#999]'
  }`

const infoIcons = {
  address: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3c0 1-1 2-2 2C9.5 19.5 4.5 14.5 4.5 5.5c0-1 1-2 2-2z" strokeLinejoin="round" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  hours: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" strokeLinecap="round" />
    </svg>
  ),
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
    }
  }

  return (
    <>
      <PageHero
        title="Contact"
        crumbs={['Contact']}
        text="Dealers, clinics, and cat owners — write to us. We answer on working days before 20:00."
      />

      <section className="container-site grid w-full items-stretch gap-8 py-14 md:grid-cols-2 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <AnimateOnScroll animation="slide-right">
          {submitted ? (
            <div className="flex min-h-[420px] animate-scale-in flex-col justify-center border border-brand bg-brand-light p-10">
              <p className="font-heading text-xs uppercase tracking-[0.22em] text-brand">Message sent</p>
              <h2 className="mt-3 font-heading text-3xl uppercase tracking-wide text-ink">Thank you, {values.name.split(' ')[0]}</h2>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                We received your note about {values.program}. A nutrition specialist will reply to {values.email} shortly.
              </p>
              <Button
                className="mt-8 w-fit"
                onClick={() => {
                  setSubmitted(false)
                  setValues(initial)
                }}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-1">
              <h2 className="mb-6 font-heading text-2xl uppercase tracking-wide text-ink">Write to us</h2>
              <Field label="Name" error={errors.name}>
                <input
                  name="name"
                  value={values.name}
                  onChange={onChange}
                  className={inputClass(errors.name)}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  className={inputClass(errors.email)}
                  placeholder="you@email.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>
              <Field label="Phone (optional)" error={errors.phone}>
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={onChange}
                  className={inputClass(errors.phone)}
                  placeholder="+1 800 000 0000"
                  autoComplete="tel"
                />
              </Field>
              <Field label="Program" error={errors.program}>
                <select
                  name="program"
                  value={values.program}
                  onChange={onChange}
                  className={`${inputClass(errors.program)} bg-white`}
                  aria-invalid={Boolean(errors.program)}
                >
                  <option value="">Select interest</option>
                  <option value="Slim">Cat Energy Slim</option>
                  <option value="Pro">Cat Energy Pro</option>
                  <option value="Athlete plan">Athlete subscription</option>
                  <option value="Dealer">Dealer / clinic partnership</option>
                </select>
              </Field>
              <Field label="Message" error={errors.message}>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={onChange}
                  rows={5}
                  className={`${inputClass(errors.message)} min-h-32 resize-y normal-case tracking-normal`}
                  placeholder="Weight, age, and what you want to change…"
                  aria-invalid={Boolean(errors.message)}
                />
              </Field>
              <Button type="submit" showArrow className="mt-2 w-full sm:w-auto">
                Send request
              </Button>
            </form>
          )}
        </AnimateOnScroll>

        <AnimateOnScroll animation="slide-left">
          <aside className="h-full w-full bg-fog p-8 md:p-10">
            <h2 className="font-heading text-2xl uppercase tracking-wide text-ink">Visit & call</h2>
            <ul className="mt-6 space-y-5 text-sm leading-relaxed">
              <li className="group flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-brand transition-transform duration-300 group-hover:animate-wiggle group-hover:scale-110">
                  {infoIcons.address}
                </span>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-brand">Address</p>
                  <p className="mt-1 text-muted">{contactInfo.address}</p>
                </div>
              </li>
              <li className="group flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-brand transition-transform duration-300 group-hover:animate-wiggle group-hover:scale-110">
                  {infoIcons.phone}
                </span>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-brand">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="mt-1 block text-muted transition-colors hover:text-brand">
                    {contactInfo.phone}
                  </a>
                </div>
              </li>
              <li className="group flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-brand transition-transform duration-300 group-hover:animate-wiggle group-hover:scale-110">
                  {infoIcons.email}
                </span>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-brand">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="mt-1 block text-muted transition-colors hover:text-brand">
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="group flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-brand transition-transform duration-300 group-hover:animate-wiggle group-hover:scale-110">
                  {infoIcons.hours}
                </span>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.18em] text-brand">Hours</p>
                  <p className="mt-1 text-muted">{contactInfo.hours}</p>
                </div>
              </li>
            </ul>
            <div className="mt-8 overflow-hidden border border-line">
              <iframe
                title="Cat Energy office on the map"
                className="h-56 w-full grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=30.310%2C59.932%2C30.336%2C59.945&layer=mapnik&marker=59.9386%2C30.3231"
              />
            </div>
          </aside>
        </AnimateOnScroll>
      </section>
    </>
  )
}
