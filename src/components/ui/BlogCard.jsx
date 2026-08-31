import { Link } from 'react-router-dom'

export default function BlogCard({ post, featured = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group h-full w-full overflow-hidden bg-white text-inherit no-underline transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgb(17_17_17_/_0.1)] ${
        featured ? 'grid md:grid-cols-2 md:items-stretch' : 'flex flex-col'
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'min-h-[240px] md:h-auto md:min-h-full' : 'h-52'}`}>
        <img
          src={post.image}
          alt=""
          className="img-zoom h-full w-full object-cover duration-700"
        />
        <span className="pointer-events-none absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/15" />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.16em] text-soft">
          <span className="font-heading text-brand">{post.category}</span>
          <span className="h-px w-6 bg-line" />
          <span>{post.date}</span>
          <span>{post.read}</span>
        </div>
        <h3 className={`font-heading uppercase leading-snug tracking-wide text-ink ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-soft md:text-base">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm uppercase tracking-[0.14em] text-brand transition-all duration-300 group-hover:gap-3">
          Read story
          <span className="inline-block group-hover:animate-nudge" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}
