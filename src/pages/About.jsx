import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import Button from '../components/ui/Button'
import CountUp from '../components/ui/CountUp'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { images } from '../data/site'

const stats = [
  { end: 12, suffix: 'k+', label: 'Cats on a plan' },
  { end: 48, suffix: '', label: 'Lab-checked batches / year' },
  { end: 30, suffix: '', label: 'Days to first visible change' },
  { end: 6, suffix: '', label: 'Countries we ship to' },
]

const values = [
  {
    title: 'Precision over hype',
    text: 'Macros on the pouch match macros in the lab. If a batch misses spec, it does not ship.',
  },
  {
    title: 'Respect the cat',
    text: 'No crash diets. Slim cuts calories without leaving an animal frantic at the bowl.',
  },
  {
    title: 'Simple ritual',
    text: 'Powder, kettle, stir. Functional food should not need a blender and a weekend.',
  },
]

const team = [
  { name: 'Irina Sokolova', role: 'Feline nutritionist', image: images.team1 },
  { name: 'Pavel Morozov', role: 'Formula lead', image: images.team2 },
  { name: 'Sofia Berg', role: 'Veterinary advisor', image: images.team3 },
]

export default function About() {
  return (
    <>
      <PageHero
        title="About Cat Energy"
        crumbs={['About']}
        text="We make functional nutrition for cats that need to lose weight or put on muscle — without rewriting the rest of their day."
      />

      <section className="container-site grid w-full items-stretch gap-8 py-16 md:py-24 lg:grid-cols-2 lg:gap-12">
        <AnimateOnScroll animation="slide-right" className="h-full min-h-[320px]">
          <div className="group h-full w-full overflow-hidden">
            <img
              src={images.aboutCat}
              alt="Orange tabby cat"
              className="img-zoom h-full min-h-[320px] w-full object-cover lg:min-h-[420px]"
            />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll animation="slide-left" className="flex h-full flex-col justify-center">
          <SectionHeading
            eyebrow="Since 2018"
            title="A lab, a kettle, a better bowl"
            text="Cat Energy started as a collaboration between a veterinary clinic and a small nutrition lab in Saint Petersburg. Owners kept asking for food that actually moved the needle — not another bag of 'light' kibble with the same calories."
            className="!mb-5 md:!mb-6"
          />
          <p className="text-muted leading-relaxed">
            We still mix in small batches. Slim is built for indoor cats carrying extra weight. Pro is built for animals that need mass and presence. Both are powders you finish with boiling water, so the meal is warm, aromatic, and portion-true.
          </p>
        </AnimateOnScroll>
      </section>

      <section className="bg-ink py-14 text-white md:py-16">
        <div className="container-site grid w-full grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((item, i) => (
            <AnimateOnScroll key={item.label} delay={i * 80} animation="drop-in" className="text-center lg:text-left">
              <p className="font-heading text-4xl text-brand transition-transform duration-300 hover:scale-110 md:text-5xl">
                <CountUp end={item.end} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm leading-snug uppercase tracking-[0.14em] text-white/60">{item.label}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <SectionHeading eyebrow="Principles" title="What we will not compromise" />
        <div className="grid w-full items-stretch gap-6 md:grid-cols-3">
          {values.map((item, i) => (
            <AnimateOnScroll key={item.title} delay={i * 100} animation="bounce-in">
              <article className="group h-full bg-fog p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-brand hover:text-white">
                <span className="font-heading text-4xl text-brand/40 transition-colors duration-300 group-hover:text-white/40">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-heading text-2xl uppercase tracking-wide">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{item.text}</p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-fog py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="People"
            title="The small team behind the pouch"
            text="Nutrition, formulation, and veterinary review sit in the same room — not in three agencies."
          />
          <div className="grid w-full items-stretch gap-6 sm:grid-cols-3">
            {team.map((person, i) => (
              <AnimateOnScroll key={person.name} delay={i * 100} animation="rotate-in">
                <article className="group flex h-full flex-col overflow-hidden bg-white transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="img-zoom h-64 w-full object-cover sm:h-72"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl uppercase tracking-wide text-ink">{person.name}</h3>
                    <p className="text-sm text-soft">{person.role}</p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site flex flex-col items-center py-16 text-center md:py-20">
        <AnimateOnScroll className="flex w-full max-w-2xl flex-col items-center">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-ink md:text-4xl">
            Dealers and clinics are welcome
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-soft">
            If you stock feline nutrition or run a practice, we still pack partnership kits from Saint Petersburg.
          </p>
          <Button to="/contact" showArrow className="mt-8">
            Talk to us
          </Button>
        </AnimateOnScroll>
      </section>
    </>
  )
}
