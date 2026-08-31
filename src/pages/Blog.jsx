import { useMemo, useState } from 'react'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import BlogCard from '../components/ui/BlogCard'
import PageHero from '../components/ui/PageHero'
import { blogCategories, posts } from '../data/blog'

function matchesPost(post, q) {
  if (!q) return true
  const haystack = [
    post.title,
    post.excerpt,
    post.category,
    ...(post.body || []),
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

export default function Blog() {
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      return matchesCategory && matchesPost(post, q)
    })
  }, [query, category])

  const featured = filtered.find((post) => post.featured) || filtered[0]
  const rest = filtered.filter((post) => post.id !== featured?.id)

  const runSearch = (event) => {
    event.preventDefault()
    setQuery(draft)
  }

  return (
    <>
      <PageHero
        title="Journal"
        crumbs={['Blog']}
        text="Feeding notes, case studies, and formula news from the Cat Energy lab."
      />

      <section className="container-site py-14 md:py-20">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <form onSubmit={runSearch} className="flex w-full min-w-0 flex-1 gap-2 md:max-w-xl" role="search">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Search titles, topics…"
                className="w-full border border-line bg-white px-4 py-3 pr-4 text-sm outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_4px_rgb(104_183_56_/_0.15)]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 bg-brand px-5 py-3 font-heading text-sm uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-brand-dark active:scale-[0.97]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Search
            </button>
          </form>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {blogCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`px-4 py-2 font-heading text-xs uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
                  category === item ? 'bg-ink text-white' : 'bg-fog text-ink hover:bg-brand-light'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {query.trim() && (
          <p className="mb-6 text-sm text-soft">
            {filtered.length === 0 ? 'No results' : `${filtered.length} ${filtered.length === 1 ? 'story' : 'stories'}`} for “{query.trim()}”
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="border border-dashed border-line py-20 text-center">
            <p className="font-heading text-2xl uppercase text-ink">No stories match</p>
            <p className="mt-2 text-soft">Try another keyword or reset the category filter.</p>
            <button
              type="button"
              className="mt-6 font-heading text-sm uppercase tracking-[0.14em] text-brand"
              onClick={() => {
                setDraft('')
                setQuery('')
                setCategory('All')
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {featured && (
              <AnimateOnScroll className="mb-8" animation="scale-in">
                <BlogCard post={featured} featured />
              </AnimateOnScroll>
            )}
            <div className="grid w-full items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <AnimateOnScroll key={post.id} delay={i * 80} animation="bounce-in">
                  <BlogCard post={post} />
                </AnimateOnScroll>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}
