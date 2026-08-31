import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import ProductCan from '../components/ui/ProductCan'
import { useCart } from '../context/CartContext'

const DELIVERY_FEE = 350
const FREE_DELIVERY_FROM = 3000

function formatPrice(value) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

function onlyDigits(value) {
  return value.replace(/\D/g, '')
}

function formatCardNumber(value) {
  return onlyDigits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const digits = onlyDigits(value).slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function luhnCheck(number) {
  const digits = onlyDigits(number)
  if (digits.length !== 16) return false
  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i])
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

function detectBrand(number) {
  const digits = onlyDigits(number)
  if (/^4/.test(digits)) return 'Visa'
  if (/^220[0-4]/.test(digits)) return 'Mir'
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(digits)) return 'Mastercard'
  if (/^3[47]/.test(digits)) return 'Amex'
  return ''
}

function expiryValid(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  const now = new Date()
  const exp = new Date(year, month, 1)
  return exp > now
}

const initialOrder = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postal: '',
  method: 'card',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

function validateOrder(values, method) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.phone.trim() || !/^[\d\s+\-()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!values.address.trim() || values.address.trim().length < 8) errors.address = 'Enter a street address.'
  if (!values.city.trim()) errors.city = 'Enter a city.'
  if (!/^\d{5,6}$/.test(onlyDigits(values.postal))) errors.postal = 'Enter a 5–6 digit postal code.'

  if (method === 'card') {
    if (!values.cardName.trim() || values.cardName.trim().length < 3) {
      errors.cardName = 'Enter the name on the card.'
    }
    if (!luhnCheck(values.cardNumber)) {
      errors.cardNumber = 'Enter a valid 16-digit card number.'
    }
    if (!expiryValid(values.expiry)) errors.expiry = 'Enter a valid expiry (MM/YY).'
    if (!/^\d{3,4}$/.test(values.cvc)) errors.cvc = 'Enter a 3-digit CVC.'
  }

  if (method === 'sbp' && (!values.phone.trim() || !/^[\d\s+\-()]{7,20}$/.test(values.phone.trim()))) {
    errors.phone = 'SBP needs a valid phone number.'
  }

  return errors
}

const methods = [
  { id: 'card', label: 'Bank card', hint: 'Visa, Mastercard, Mir' },
  { id: 'sbp', label: 'SBP', hint: 'Instant from your bank app' },
  { id: 'cod', label: 'Cash on delivery', hint: 'Pay the courier in cash' },
]

const fieldClass = (error) =>
  `w-full border bg-white px-4 py-3 font-heading text-sm uppercase tracking-wide outline-none transition-colors focus:border-ink ${
    error ? 'border-danger' : 'border-line'
  }`

export default function Cart() {
  const { items, setQty, removeItem, clear, count, total } = useCart()
  const [values, setValues] = useState(initialOrder)
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(null)

  const delivery = total >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE
  const grandTotal = total + delivery
  const brand = detectBrand(values.cardNumber)

  const onChange = (event) => {
    const { name, value } = event.target
    let next = value
    if (name === 'cardNumber') next = formatCardNumber(value)
    if (name === 'expiry') next = formatExpiry(value)
    if (name === 'cvc') next = onlyDigits(value).slice(0, 4)
    if (name === 'postal') next = onlyDigits(value).slice(0, 6)
    setValues((prev) => ({ ...prev, [name]: next }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const placeOrder = (event) => {
    event.preventDefault()
    const next = validateOrder(values, values.method)
    setErrors(next)
    if (Object.keys(next).length > 0 || items.length === 0) return

    const paidWith =
      values.method === 'card'
        ? `${brand || 'Card'} •••• ${onlyDigits(values.cardNumber).slice(-4)}`
        : values.method === 'sbp'
          ? `SBP · ${values.phone.trim()}`
          : 'Cash on delivery'

    setPlaced({
      number: `CE-${Date.now().toString().slice(-6)}`,
      name: values.name.trim(),
      email: values.email.trim(),
      address: `${values.address.trim()}, ${values.city.trim()}, ${values.postal}`,
      total: grandTotal,
      count,
      paidWith,
      method: values.method,
    })
    clear()
    setValues(initialOrder)
  }

  if (placed) {
    return (
      <>
        <PageHero title="Payment received" crumbs={['Cart']} text="Your pouches are packed the next working day." />
        <section className="container-site py-14 md:py-20">
          <div className="mx-auto max-w-xl border border-brand bg-brand-light p-8 md:p-10">
            <p className="font-heading text-xs uppercase tracking-[0.22em] text-brand">Confirmation</p>
            <h2 className="mt-3 font-heading text-3xl uppercase tracking-wide text-ink">
              Thank you, {placed.name.split(' ')[0]}
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex justify-between gap-4 border-b border-brand/20 pb-3">
                <span>Order</span>
                <span className="font-heading text-ink">{placed.number}</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-brand/20 pb-3">
                <span>Paid</span>
                <span className="text-right font-heading text-ink">{formatPrice(placed.total)}</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-brand/20 pb-3">
                <span>Payment</span>
                <span className="text-right text-ink">{placed.paidWith}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Deliver to</span>
                <span className="max-w-[16rem] text-right text-ink">{placed.address}</span>
              </li>
            </ul>
            <p className="mt-5 leading-relaxed text-muted">
              A receipt for {placed.count} {placed.count === 1 ? 'item' : 'items'} will go to {placed.email}.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/products" showArrow>
                Continue shopping
              </Button>
              <Button variant="outline" onClick={() => setPlaced(null)}>
                New order
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        title="Your cart"
        crumbs={['Cart']}
        text="Review the pouches, enter delivery and payment, then place the order."
      />

      <section className="container-site py-14 md:py-20">
        {items.length === 0 ? (
          <div className="border border-dashed border-line py-20 text-center">
            <p className="font-heading text-2xl uppercase text-ink">Cart is empty</p>
            <p className="mt-2 text-soft">Add Slim or Pro pouches, then come back to pay.</p>
            <Button to="/products" showArrow className="mt-8">
              Browse products
            </Button>
          </div>
        ) : (
          <div className="grid w-full items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="space-y-4">
              {items.map((item) => (
                <AnimateOnScroll key={item.id}>
                  <article className="flex flex-col gap-4 border border-line bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
                    <div className="flex justify-center sm:w-24">
                      <ProductCan
                        compact
                        color={item.color}
                        accent={item.accent}
                        label={item.type === 'slim' ? 'SLIM' : 'PRO'}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-heading text-xl uppercase tracking-wide text-ink">
                        {item.name} {item.flavor}
                      </h2>
                      <p className="mt-1 text-sm text-soft">
                        {item.weight} · {item.type}
                      </p>
                      <p className="mt-2 font-heading text-lg text-ink">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          className="grid h-10 w-10 place-items-center font-heading text-lg text-ink transition-colors hover:bg-fog"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-heading text-ink">{item.qty}</span>
                        <button
                          type="button"
                          className="grid h-10 w-10 place-items-center font-heading text-lg text-ink transition-colors hover:bg-fog"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-heading text-ink">{formatPrice(item.price * item.qty)}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-heading text-xs uppercase tracking-[0.14em] text-soft transition-colors hover:text-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>

            <aside className="border border-line bg-fog p-6 md:p-8 lg:sticky lg:top-28">
              <h2 className="font-heading text-2xl uppercase tracking-wide text-ink">Checkout</h2>
              <dl className="mt-5 space-y-2 border-b border-line pb-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-soft">Items</dt>
                  <dd className="text-ink">{count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-soft">Subtotal</dt>
                  <dd className="text-ink">{formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-soft">Delivery</dt>
                  <dd className="text-ink">{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="font-heading uppercase text-ink">Total</dt>
                  <dd className="font-heading text-xl text-ink">{formatPrice(grandTotal)}</dd>
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-soft">Free delivery from {formatPrice(FREE_DELIVERY_FROM)}.</p>
                )}
              </dl>

              <form onSubmit={placeOrder} noValidate className="mt-6 space-y-4">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-brand">Delivery</p>
                <label className="block">
                  <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Full name</span>
                  <input name="name" value={values.name} onChange={onChange} className={fieldClass(errors.name)} placeholder="Ivan Petrov" autoComplete="name" />
                  {errors.name && <span className="mt-1 block text-xs text-danger">{errors.name}</span>}
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Email</span>
                    <input type="email" name="email" value={values.email} onChange={onChange} className={fieldClass(errors.email)} placeholder="you@email.com" autoComplete="email" />
                    {errors.email && <span className="mt-1 block text-xs text-danger">{errors.email}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Phone</span>
                    <input type="tel" name="phone" value={values.phone} onChange={onChange} className={fieldClass(errors.phone)} placeholder="+7 900 000 0000" autoComplete="tel" />
                    {errors.phone && <span className="mt-1 block text-xs text-danger">{errors.phone}</span>}
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Street address</span>
                  <input name="address" value={values.address} onChange={onChange} className={fieldClass(errors.address)} placeholder="Bolshaya Konyushennaya 19/8, apt 12" autoComplete="street-address" />
                  {errors.address && <span className="mt-1 block text-xs text-danger">{errors.address}</span>}
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">City</span>
                    <input name="city" value={values.city} onChange={onChange} className={fieldClass(errors.city)} placeholder="Saint Petersburg" autoComplete="address-level2" />
                    {errors.city && <span className="mt-1 block text-xs text-danger">{errors.city}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Postal code</span>
                    <input name="postal" inputMode="numeric" value={values.postal} onChange={onChange} className={fieldClass(errors.postal)} placeholder="191186" autoComplete="postal-code" />
                    {errors.postal && <span className="mt-1 block text-xs text-danger">{errors.postal}</span>}
                  </label>
                </div>

                <p className="pt-2 font-heading text-xs uppercase tracking-[0.18em] text-brand">Payment</p>
                <div className="grid gap-2">
                  {methods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-start gap-3 border bg-white px-4 py-3 transition-colors ${
                        values.method === method.id ? 'border-brand' : 'border-line hover:border-[#999]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={method.id}
                        checked={values.method === method.id}
                        onChange={onChange}
                        className="mt-1 accent-brand"
                      />
                      <span>
                        <span className="block font-heading text-sm uppercase tracking-wide text-ink">{method.label}</span>
                        <span className="text-xs normal-case tracking-normal text-soft">{method.hint}</span>
                      </span>
                    </label>
                  ))}
                </div>

                {values.method === 'card' && (
                  <div className="space-y-4 border border-line bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-heading text-xs uppercase tracking-[0.16em] text-ink">Card details</p>
                      <span className="font-heading text-[11px] uppercase tracking-wider text-brand">
                        {brand || 'Visa · MC · Mir'}
                      </span>
                    </div>
                    <div className="rounded-sm bg-ink p-4 text-white">
                      <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/50">Cat Energy Pay</p>
                      <p className="mt-6 font-heading text-lg tracking-[0.18em]">
                        {values.cardNumber || '•••• •••• •••• ••••'}
                      </p>
                      <div className="mt-4 flex justify-between text-[11px] uppercase tracking-wider text-white/70">
                        <span>{values.cardName || 'Name on card'}</span>
                        <span>{values.expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                    <label className="block">
                      <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Name on card</span>
                      <input
                        name="cardName"
                        value={values.cardName}
                        onChange={onChange}
                        className={fieldClass(errors.cardName)}
                        placeholder="IVAN PETROV"
                        autoComplete="cc-name"
                      />
                      {errors.cardName && <span className="mt-1 block text-xs text-danger">{errors.cardName}</span>}
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Card number</span>
                      <input
                        name="cardNumber"
                        inputMode="numeric"
                        value={values.cardNumber}
                        onChange={onChange}
                        className={fieldClass(errors.cardNumber)}
                        placeholder="ACCT-000015"
                        autoComplete="cc-number"
                      />
                      {errors.cardNumber && <span className="mt-1 block text-xs text-danger">{errors.cardNumber}</span>}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">Expiry</span>
                        <input
                          name="expiry"
                          inputMode="numeric"
                          value={values.expiry}
                          onChange={onChange}
                          className={fieldClass(errors.expiry)}
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                        />
                        {errors.expiry && <span className="mt-1 block text-xs text-danger">{errors.expiry}</span>}
                      </label>
                      <label className="block">
                        <span className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-ink">CVC</span>
                        <input
                          name="cvc"
                          inputMode="numeric"
                          value={values.cvc}
                          onChange={onChange}
                          className={fieldClass(errors.cvc)}
                          placeholder="123"
                          autoComplete="cc-csc"
                        />
                        {errors.cvc && <span className="mt-1 block text-xs text-danger">{errors.cvc}</span>}
                      </label>
                    </div>
                    <p className="text-xs leading-relaxed text-soft">
                      Card is checked with a Luhn checksum. Use a valid test number such as 4242 4242 4242 4242. Nothing is charged.
                    </p>
                  </div>
                )}

                {values.method === 'sbp' && (
                  <p className="border border-line bg-white px-4 py-3 text-sm leading-relaxed text-soft">
                    An SBP request will be sent to {values.phone || 'your phone'} for {formatPrice(grandTotal)}. Confirm it in your banking app.
                  </p>
                )}

                {values.method === 'cod' && (
                  <p className="border border-line bg-white px-4 py-3 text-sm leading-relaxed text-soft">
                    Pay {formatPrice(grandTotal)} in cash when the courier arrives. Please have exact change if you can.
                  </p>
                )}

                <Button type="submit" showArrow className="w-full">
                  {values.method === 'cod' ? `Place order · ${formatPrice(grandTotal)}` : `Pay ${formatPrice(grandTotal)}`}
                </Button>
                <p className="flex items-center justify-center gap-2 text-center text-xs text-soft">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 018 0v3" />
                  </svg>
                  TLS checkout · we never store the full card number
                </p>
              </form>
              <p className="mt-4 text-center text-xs text-soft">
                <Link to="/products" className="text-brand transition-colors hover:text-brand-dark">
                  Keep shopping
                </Link>
              </p>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
