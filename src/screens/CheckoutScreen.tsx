import { useState, type FormEvent } from 'react'
import {
  formatPrice,
  getCartLines,
  getCartTotal,
  type Cart,
} from '../data/cart'

type Props = {
  cart: Cart
  onBack: () => void
  onSubmit: (form: OrderForm) => void
}

export type OrderForm = {
  name: string
  phone: string
  address: string
  comment: string
}

export function CheckoutScreen({ cart, onBack, onSubmit }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')

  const lines = getCartLines(cart)
  const total = getCartTotal(cart)

  const isValid =
    name.trim().length >= 2 &&
    phone.trim().length >= 5 &&
    address.trim().length >= 5

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isValid) return
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      comment: comment.trim(),
    })
  }

  return (
    <div className="min-h-screen flex flex-col pb-28">
      <header className="sticky top-0 z-10 backdrop-blur bg-cinnamon-50/80 dark:bg-cinnamon-900/80 border-b border-cinnamon-100 dark:border-cinnamon-800">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-cinnamon-700 dark:text-cinnamon-200 hover:text-cinnamon-900 dark:hover:text-cinnamon-50 transition-colors"
            aria-label="Назад"
          >
            ← Назад
          </button>
          <h1 className="text-lg font-semibold text-cinnamon-800 dark:text-cinnamon-100">
            Оформление
          </h1>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex-1 max-w-2xl w-full mx-auto px-5 py-8 space-y-6"
      >
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-cinnamon-500 dark:text-cinnamon-400 mb-1">
            Почти готово
          </p>
          <h2 className="font-serif italic text-3xl text-cinnamon-900 dark:text-cinnamon-50">
            «Расскажите о себе»
          </h2>
        </div>

        <section className="rounded-3xl bg-white/80 dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 backdrop-blur overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-baseline justify-between">
            <h3 className="font-serif italic text-xl text-cinnamon-900 dark:text-cinnamon-50">
              Ваш заказ
            </h3>
            <span className="text-xs text-cinnamon-500 dark:text-cinnamon-400 uppercase tracking-wider">
              {lines.length} {pluralizePositions(lines.length)}
            </span>
          </div>
          <ul className="px-5 pb-3 space-y-2.5">
            {lines.map((line) => (
              <li key={line.item.id} className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cinnamon-50 dark:bg-cinnamon-900 overflow-hidden relative">
                  {line.item.image ? (
                    <img
                      src={line.item.image}
                      alt={line.item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="absolute inset-0 flex items-center justify-center text-xl"
                      aria-label={line.item.name}
                    >
                      {line.item.emoji}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex justify-between gap-2">
                  <span className="truncate text-cinnamon-700 dark:text-cinnamon-200">
                    {line.item.name} × {line.quantity}
                  </span>
                  <span className="text-cinnamon-800 dark:text-cinnamon-100 font-medium tabular-nums">
                    {formatPrice(line.subtotal)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-5 py-4 border-t border-cinnamon-100 dark:border-cinnamon-700 bg-cinnamon-50/50 dark:bg-cinnamon-900/40 flex justify-between items-baseline">
            <span className="font-serif italic text-lg text-cinnamon-900 dark:text-cinnamon-50">
              Итого
            </span>
            <span className="font-serif italic text-xl text-cinnamon-900 dark:text-cinnamon-50 tabular-nums">
              {formatPrice(total)}
            </span>
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 backdrop-blur p-5 space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-full bg-cinnamon-100 dark:bg-cinnamon-900 flex items-center justify-center text-cinnamon-700 dark:text-cinnamon-200">
              <UserIcon />
            </div>
            <h3 className="font-serif italic text-xl text-cinnamon-900 dark:text-cinnamon-50">
              Контакты
            </h3>
          </div>

          <FieldInput
            label="Имя"
            value={name}
            onChange={setName}
            placeholder="Как к вам обращаться"
            required
          />

          <FieldInput
            label="Телефон"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="+7 999 123-45-67"
            required
          />
        </section>

        <section className="rounded-3xl bg-white/80 dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 backdrop-blur p-5 space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-full bg-cinnamon-100 dark:bg-cinnamon-900 flex items-center justify-center text-cinnamon-700 dark:text-cinnamon-200">
              <PinIcon />
            </div>
            <h3 className="font-serif italic text-xl text-cinnamon-900 dark:text-cinnamon-50">
              Доставка
            </h3>
          </div>

          <FieldInput
            label="Адрес"
            value={address}
            onChange={setAddress}
            placeholder="Улица, дом, квартира"
            required
          />

          <label className="block">
            <span className="text-sm text-cinnamon-700 dark:text-cinnamon-200 mb-1.5 block">
              Комментарий курьеру{' '}
              <span className="text-cinnamon-400">— необязательно</span>
            </span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Код подъезда, этаж, пожелания..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 border border-cinnamon-200 dark:border-cinnamon-700 text-cinnamon-900 dark:text-cinnamon-50 placeholder-cinnamon-400 focus:outline-none focus:border-cinnamon-500 transition-colors resize-none"
            />
          </label>
        </section>

        <p className="text-xs text-cinnamon-500 dark:text-cinnamon-400 text-center px-4 leading-relaxed">
          Нажимая «К выбору оплаты», вы соглашаетесь
          <br />с обработкой персональных данных
        </p>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cinnamon-50 dark:from-cinnamon-900 to-transparent pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full px-5 py-4 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 text-white font-semibold shadow-xl shadow-cinnamon-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>К выбору оплаты · {formatPrice(total)}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-sm text-cinnamon-700 dark:text-cinnamon-200 mb-1.5 block">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 border border-cinnamon-200 dark:border-cinnamon-700 text-cinnamon-900 dark:text-cinnamon-50 placeholder-cinnamon-400 focus:outline-none focus:border-cinnamon-500 transition-colors"
        required={required}
      />
    </label>
  )
}

function pluralizePositions(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'позиций'
  if (mod10 === 1) return 'позиция'
  if (mod10 >= 2 && mod10 <= 4) return 'позиции'
  return 'позиций'
}

function UserIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
