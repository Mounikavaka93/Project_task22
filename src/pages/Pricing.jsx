import { useState } from 'react'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import PageHero from '../components/ui/PageHero'
import PricingCard from '../components/ui/PricingCard'
import SectionHeading from '../components/ui/SectionHeading'
import { pricingFaqs, pricingPlans } from '../data/pricing'

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <PageHero
        title="Pricing plans"
        crumbs={['Pricing']}
        text="Subscribe, skip a month when you travel, swap Slim and Pro when the cat’s body score changes."
      />

      <section className="container-site py-14 md:py-20">
        <div className="mb-12 flex flex-col items-center gap-4">
          <p className="font-heading text-xs uppercase tracking-[0.22em] text-soft">Billing</p>
          <div className="flex items-center gap-3 rounded-full bg-fog p-1.5">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 font-heading text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105 ${
                !yearly ? 'bg-white text-ink shadow-sm' : 'text-soft'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2 font-heading text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105 ${
                yearly ? 'bg-white text-ink shadow-sm' : 'text-soft'
              }`}
            >
              Yearly
              <span className="ml-2 text-brand">−16%</span>
            </button>
          </div>
        </div>

        <div className="grid w-full items-stretch gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <AnimateOnScroll key={plan.id} delay={i * 100} animation={plan.recommended ? 'bounce-in' : 'fade-up'}>
              <PricingCard plan={plan} yearly={yearly} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-fog py-16 md:py-24">
        <div className="container-site grid w-full items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <SectionHeading
            eyebrow="Questions"
            title="Before you subscribe"
            text="Plans are prepaid pouches plus access to the nutrition desk. Cancel after the second delivery."
            className="lg:!mb-0"
          />
          <div className="divide-y divide-line border border-line bg-white">
            {pricingFaqs.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-fog/70"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    <span className="font-heading text-base uppercase tracking-wide text-ink md:text-lg">{item.q}</span>
                    <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center bg-fog text-ink transition-all duration-300 ${open ? 'rotate-45 bg-brand text-white' : ''}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <p className="overflow-hidden px-6 pb-5 text-sm leading-relaxed text-soft">{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
