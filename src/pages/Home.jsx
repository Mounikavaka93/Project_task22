import { Link } from 'react-router-dom'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import BeforeAfter from '../components/ui/BeforeAfter'
import Button from '../components/ui/Button'
import CountUp from '../components/ui/CountUp'
import Marquee from '../components/ui/Marquee'
import PawMarks from '../components/ui/PawMarks'
import SectionHeading from '../components/ui/SectionHeading'
import TestimonialCard from '../components/ui/TestimonialCard'
import { benefits, features, steps, testimonials } from '../data/content'
import { images } from '../data/site'

function SlimCatIcon() {
  return (
    <svg viewBox="0 0 72 64" className="h-16 w-20 transition-transform duration-500 group-hover:scale-110 group-hover:animate-wiggle" aria-hidden="true">
      <ellipse cx="36" cy="46" rx="22" ry="14" fill="#111" />
      <circle cx="50" cy="28" r="12" fill="#111" />
      <path d="M42 20l-2-10 8 8M58 20l2-10-8 8" fill="#111" />
      <circle className="logo-eye" cx="46" cy="26" r="1.5" fill="#fff" />
      <circle className="logo-eye" cx="54" cy="26" r="1.5" fill="#fff" />
      <path d="M8 50c8-6 14-4 18 0" fill="none" stroke="#68b738" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function ProCatIcon() {
  return (
    <svg viewBox="0 0 72 64" className="h-16 w-20 transition-transform duration-500 group-hover:scale-110 group-hover:animate-wiggle" aria-hidden="true">
      <ellipse cx="34" cy="44" rx="20" ry="16" fill="#111" />
      <rect x="18" y="28" width="14" height="18" rx="4" fill="#111" />
      <circle cx="50" cy="26" r="12" fill="#111" />
      <path d="M42 18l-2-10 8 8M58 18l2-10-8 8" fill="#111" />
      <circle className="logo-eye" cx="46" cy="24" r="1.5" fill="#fff" />
      <circle className="logo-eye" cx="54" cy="24" r="1.5" fill="#fff" />
    </svg>
  )
}

const benefitIcons = [
  <svg key="lab" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M9 3h6M10 3v6l-5 9a3 3 0 002.6 4.4h8.8A3 3 0 0019 18l-5-9V3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="vet" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 3l7 3v6c0 5-3.2 8.4-7 9-3.8-.6-7-4-7-9V6l7-3z" strokeLinejoin="round" />
    <path d="M12 8v6M9 11h6" strokeLinecap="round" />
  </svg>,
  <svg key="cal" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
  </svg>,
  <svg key="leaf" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M5 19c8-1 13-8 14-15-7 1-14 6-14 15z" strokeLinejoin="round" />
    <path d="M9 15c2-3 5-5 8-6" strokeLinecap="round" />
  </svg>,
  <svg key="home" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 11.5L12 4l8 7.5V20H4z" strokeLinejoin="round" />
    <path d="M10 20v-6h4v6" />
  </svg>,
  <svg key="ship" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="2" y="8" width="13" height="8" rx="1" />
    <path d="M15 11h4l3 4v1h-7M6 16v2M17 16v2" strokeLinecap="round" />
  </svg>,
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img src={images.heroCat} alt="" className="h-full w-full animate-ken-burns object-cover object-[center_20%] opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-brand/25 to-transparent lg:block" />
          <div className="pointer-events-none absolute -right-10 top-16 h-40 w-40 animate-blob rounded-full bg-brand/20 blur-3xl" />
          <PawMarks className="text-white" />
        </div>
        <div className="container-site relative grid min-h-[78vh] w-full items-center py-16 md:min-h-[86vh] md:py-24">
          <div className="max-w-xl">
            <p className="animate-fade-up font-heading text-xs uppercase tracking-[0.32em] text-brand">
              Functional nutrition
            </p>
            <h1
              className="mt-4 animate-fade-up font-heading text-4xl font-medium uppercase leading-[1.05] tracking-wide md:text-6xl lg:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              Fuel for cats who still have trees to climb
            </h1>
            <p
              className="mt-5 max-w-md animate-fade-up text-base leading-relaxed text-white/75 md:text-lg"
              style={{ animationDelay: '160ms' }}
            >
              Cat Energy Slim and Pro — powder formulas you mix with boiling water. Replace a meal, keep the nap schedule, watch the body change.
            </p>
            <div className="mt-8 flex w-full max-w-md animate-fade-up flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4" style={{ animationDelay: '240ms' }}>
              <Button to="/products" showArrow className="animate-glow w-full sm:w-auto sm:min-w-[200px]">
                Choose a program
              </Button>
              <Button to="/pricing" variant="light" className="w-full sm:w-auto sm:min-w-[200px]">
                See plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="container-site py-16 md:py-24">
        <SectionHeading
          eyebrow="Features"
          title="Two programs, one ritual"
          text="Slim for extra weight. Pro for muscle. Powder, boiling water, bowl."
        />
        <div className="grid w-full items-stretch gap-6 md:grid-cols-2">
          {features.map((item, i) => (
            <AnimateOnScroll key={item.id} delay={i * 120} animation="bounce-in" className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden bg-fog p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgb(17_17_17_/_0.08)] md:p-12">
                <div className="mb-6 flex items-center gap-5">
                  <span className="inline-flex shrink-0 animate-bob">
                    {item.id === 'slim' ? <SlimCatIcon /> : <ProCatIcon />}
                  </span>
                  <h2 className="font-heading text-2xl uppercase tracking-wide text-ink md:text-3xl">{item.title}</h2>
                </div>
                <p className="flex-1 leading-relaxed text-muted">{item.text}</p>
                <Link
                  to={item.to}
                  className="mt-6 inline-flex items-center gap-3 font-heading text-sm uppercase tracking-[0.16em] text-ink transition-all duration-300 group-hover:gap-4 group-hover:text-brand"
                >
                  Catalog
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-110">
                    →
                  </span>
                </Link>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-fog py-16 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Process" title="How it works" text="Four steps. No extra gym for the cat — the formula does the heavy lifting." />
          <div className="grid w-full items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <AnimateOnScroll key={step.n} delay={i * 90} animation="rotate-in">
                <article className="group relative flex h-full min-h-[220px] flex-col border border-transparent bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_32px_rgb(17_17_17_/_0.06)]">
                  <span className="inline-block font-heading text-6xl text-brand/25 transition-all duration-500 group-hover:scale-110 group-hover:text-brand">{step.n}</span>
                  <h3 className="mt-2 font-heading text-xl uppercase tracking-wide text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{step.text}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <SectionHeading
          eyebrow="Why Cat Energy"
          title="Benefits you can measure"
          text="We care about the bowl, the lab, and the photo you take in thirty days."
        />
        <div className="grid w-full items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, i) => (
            <AnimateOnScroll key={item.title} delay={i * 70}>
              <article className="group h-full border-t-2 border-brand bg-fog p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_32px_rgb(17_17_17_/_0.08)]">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-1 w-10 origin-left bg-brand transition-all duration-500 group-hover:w-16" />
                  <span className="text-brand transition-transform duration-500 group-hover:animate-wiggle group-hover:scale-110">
                    {benefitIcons[i]}
                  </span>
                </div>
                <h3 className="font-heading text-xl uppercase tracking-wide text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.text}</p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-fog py-16 md:py-24">
        <div className="container-site grid w-full items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <AnimateOnScroll animation="slide-right">
            <SectionHeading
              eyebrow="Live example"
              title="Boris, two months later"
              text="Boris dropped 5 kg in 60 days by replacing his usual food with Cat Energy Slim. He did not change his habits and still sleeps 16 hours a day. Food cost: 15 000 ₽."
              className="!mb-8 md:!mb-8"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="group bg-white p-5 transition-transform duration-300 hover:-translate-y-1">
                <p className="font-heading text-4xl text-brand transition-transform duration-300 group-hover:scale-110">
                  <CountUp end={5} suffix=" kg" />
                </p>
                <p className="mt-1 text-sm uppercase tracking-wide text-soft">weight down</p>
              </div>
              <div className="group bg-white p-5 transition-transform duration-300 hover:-translate-y-1">
                <p className="font-heading text-4xl text-brand transition-transform duration-300 group-hover:scale-110">
                  <CountUp end={60} />
                </p>
                <p className="mt-1 text-sm uppercase tracking-wide text-soft">days taken</p>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-left">
            <BeforeAfter />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="Owners"
          title="Customer stories"
          text="Real cats. Real bowls. No extra treadmills."
        />
        <div className="grid w-full items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <AnimateOnScroll key={item.id} delay={i * 100} animation="bounce-in">
              <TestimonialCard item={item} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-16 text-white md:py-20">
        <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 animate-blob rounded-full bg-brand/20 blur-3xl" />
        <div className="container-site relative flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <AnimateOnScroll className="w-full max-w-xl">
            <h2 className="max-w-xl font-heading text-3xl uppercase leading-tight tracking-wide md:text-5xl">
              Ready to pick a nutrition plan?
            </h2>
            <p className="mt-3 max-w-lg text-white/70">
              Tell us the cat’s weight and we will point you to Slim, Pro, or a mixed month.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={120} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button to="/contact" showArrow className="animate-glow w-full sm:w-auto">Get a plan</Button>
            <Button to="/products" variant="light" className="w-full sm:w-auto">
              Browse products
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
