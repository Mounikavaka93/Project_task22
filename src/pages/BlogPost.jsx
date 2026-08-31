import { Link, useParams, Navigate } from 'react-router-dom'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import BlogCard from '../components/ui/BlogCard'
import Button from '../components/ui/Button'
import { getPostBySlug, getRelatedPosts } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const related = getRelatedPosts(post)

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-fog">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-blob rounded-full bg-brand/15 blur-2xl" />
        <div className="container-site relative py-10 md:py-14">
          <nav className="mb-5 animate-fade-in text-sm text-soft" aria-label="Breadcrumb">
            <Link to="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            <span className="mx-2 text-line">/</span>
            <Link to="/blog" className="transition-colors hover:text-brand">
              Blog
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-ink">{post.category}</span>
          </nav>
          <p className="animate-fade-up font-heading text-xs uppercase tracking-[0.22em] text-brand">
            {post.category} · {post.date} · {post.read}
          </p>
          <h1 className="mt-3 max-w-4xl animate-fade-up font-heading text-3xl font-medium uppercase leading-tight tracking-wide text-ink md:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="container-site py-12 md:py-16">
        <div className="overflow-hidden">
          <img src={post.image} alt="" className="h-64 w-full object-cover md:h-[420px]" />
        </div>
        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-4">
          <Button to="/blog" variant="outline">
            Back to journal
          </Button>
          <Button to="/contact" showArrow>
            Ask a nutritionist
          </Button>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-fog py-16 md:py-20">
          <div className="container-site">
            <h2 className="mb-8 font-heading text-2xl uppercase tracking-wide text-ink md:text-3xl">More stories</h2>
            <div className="grid w-full items-stretch gap-6 md:grid-cols-3">
              {related.map((item, i) => (
                <AnimateOnScroll key={item.id} delay={i * 80}>
                  <BlogCard post={item} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
