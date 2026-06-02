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

      <form onSubmit={handleSubmit} className="flex-1 max-w-2xl w-full mx-auto px-5 py-6 space-y-5">
        <section className="p-5 rounded-2xl bg-white dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800">
          <h2 className="font-semibold text-cinnamon-900 dark:text-cinnamon-50 mb-3">
            Ваш заказ
          </h2>
          <ul className="space-y-1.5 text-sm">
            {lines.map((line) => (
              <li key={line.item.id} className="flex justify-between text-cinnamon-700 dark:text-cinnamon-200">
                <span>
                  {line.item.emoji} {line.item.name} × {line.quantity}
                </span>
                <span className="text-cinnamon-800 dark:text-cinnamon-100 font-medium">
                  {formatPrice(line.subtotal)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 pt-4 border-t border-cinnamon-100 dark:border-cinnamon-700 font-semibold text-cinnamon-900 dark:text-cinnamon-50">
            <span>Итого</span>
            <span>{formatPrice(total)}</span>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-white dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 space-y-4">
          <h2 className="font-semibold text-cinnamon-900 dark:text-cinnamon-50">
            Контакты
          </h2>

          <label className="block">
            <span className="text-sm text-cinnamon-700 dark:text-cinnamon-200 mb-1.5 block">
              Имя
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              className="w-full px-4 py-3 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 border border-cinnamon-200 dark:border-cinnamon-700 text-cinnamon-900 dark:text-cinnamon-50 placeholder-cinnamon-400 focus:outline-none focus:border-cinnamon-500 transition-colors"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-cinnamon-700 dark:text-cinnamon-200 mb-1.5 block">
              Телефон
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 999 123-45-67"
              className="w-full px-4 py-3 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 border border-cinnamon-200 dark:border-cinnamon-700 text-cinnamon-900 dark:text-cinnamon-50 placeholder-cinnamon-400 focus:outline-none focus:border-cinnamon-500 transition-colors"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-cinnamon-700 dark:text-cinnamon-200 mb-1.5 block">
              Адрес доставки
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Улица, дом, квартира"
              className="w-full px-4 py-3 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 border border-cinnamon-200 dark:border-cinnamon-700 text-cinnamon-900 dark:text-cinnamon-50 placeholder-cinnamon-400 focus:outline-none focus:border-cinnamon-500 transition-colors"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-cinnamon-700 dark:text-cinnamon-200 mb-1.5 block">
              Комментарий <span className="text-cinnamon-400">— необязательно</span>
            </span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Пожелания, время доставки и так далее"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 border border-cinnamon-200 dark:border-cinnamon-700 text-cinnamon-900 dark:text-cinnamon-50 placeholder-cinnamon-400 focus:outline-none focus:border-cinnamon-500 transition-colors resize-none"
            />
          </label>
        </section>

        <p className="text-xs text-cinnamon-600 dark:text-cinnamon-300 text-center px-2">
          Нажимая «Подтвердить заказ», вы соглашаетесь
          с обработкой персональных данных.
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
