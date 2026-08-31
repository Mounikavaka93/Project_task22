import { useMemo, useState } from 'react'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import PageHero from '../components/ui/PageHero'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import { products, services } from '../data/products'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'slim', label: 'Slim' },
  { id: 'pro', label: 'Pro' },
]

const serviceIcons = [
  <svg key="consult" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 19c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" strokeLinecap="round" />
  </svg>,
  <svg key="box" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 8l9-4 9 4-9 4-9-4z" strokeLinejoin="round" />
    <path d="M3 8v8l9 4 9-4V8M12 12v8" strokeLinecap="round" />
  </svg>,
  <svg key="chart" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 19V5M4 19h16" strokeLinecap="round" />
    <path d="M8 15l4-5 3 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
]

export default function Products() {
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((item) => item.type === filter)),
    [filter],
  )

  return (
    <>
      <PageHero
        title="Products & services"
        crumbs={['Products']}
        text="Slim for cats that need to lose weight. Pro for cats that need muscle. Same ritual: powder, boiling water, bowl."
      />

      <section className="container-site py-14 md:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="font-heading text-sm uppercase tracking-[0.18em] text-soft">
            {visible.length} formulas in view
          </p>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={`px-5 py-2 font-heading text-sm uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
                  filter === item.id ? 'bg-brand text-white shadow-[0_6px_14px_rgb(104_183_56_/_0.35)]' : 'bg-fog text-ink hover:bg-brand-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid w-full items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((product, i) => (
            <AnimateOnScroll key={product.id} delay={i * 60} animation="scale-in">
              <ProductCard product={product} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-fog py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Around the pouch"
            title="Services that keep a plan honest"
            text="Food is the core. These extras exist so owners do not guess portions in week three."
          />
          <div className="grid w-full items-stretch gap-6 md:grid-cols-3">
            {services.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 100} animation="bounce-in">
                <article className="group h-full bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgb(17_17_17_/_0.08)]">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="block h-1 w-8 origin-left bg-brand transition-all duration-500 group-hover:w-14" />
                    <span className="text-brand transition-transform duration-500 group-hover:animate-wiggle group-hover:scale-110">
                      {serviceIcons[i]}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl uppercase tracking-wide text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-soft">{item.text}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
