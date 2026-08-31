import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import ProductCan from './ProductCan'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const onAdd = () => {
    addItem(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="group relative flex h-full w-full flex-col bg-fog p-6 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_18px_40px_rgb(17_17_17_/_0.1)]">
      <div className="absolute right-4 top-4 font-heading text-xs uppercase tracking-[0.2em] text-soft">
        {product.type}
      </div>
      <div className="flex min-h-[200px] items-center justify-center py-4">
        <ProductCan
          color={product.color}
          accent={product.accent}
          label={product.type === 'slim' ? 'SLIM' : 'PRO'}
        />
      </div>
      <h3 className="min-h-[3.25rem] font-heading text-xl uppercase leading-snug tracking-wide text-ink">
        {product.name} {product.flavor}
      </h3>
      <dl className="mt-4 flex-1 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-soft">
          <dt>Weight</dt>
          <dd className="text-ink">{product.weight}</dd>
        </div>
        <div className="flex justify-between text-soft">
          <dt>Flavor</dt>
          <dd className="text-ink">{product.flavor}</dd>
        </div>
        <div className="flex justify-between text-soft">
          <dt>Price</dt>
          <dd className="font-heading text-lg text-ink">{product.price} ₽</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={onAdd}
        className={`group/order relative mt-5 inline-flex w-full items-center justify-center overflow-hidden px-4 py-3 font-heading text-sm uppercase tracking-[0.14em] text-white transition-all duration-300 active:scale-[0.97] ${
          added ? 'bg-ink' : 'bg-brand hover:bg-brand-dark hover:shadow-[0_8px_18px_rgb(104_183_56_/_0.35)]'
        }`}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {added ? 'Added to cart' : 'Add to cart'}
          {!added && (
            <span className="transition-transform duration-300 group-hover/order:translate-x-1" aria-hidden="true">
              +
            </span>
          )}
        </span>
        {!added && (
          <span className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover/order:translate-x-[130%]" />
        )}
      </button>
    </article>
  )
}
