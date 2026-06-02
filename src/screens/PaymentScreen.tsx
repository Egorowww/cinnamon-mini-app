import { useState } from 'react'
import { formatPrice, getCartTotal, type Cart } from '../data/cart'
import { paymentOptions, type PaymentMethod } from '../data/payment'

type Props = {
  cart: Cart
  onBack: () => void
  onConfirm: (method: PaymentMethod) => void
  isSubmitting?: boolean
}

export function PaymentScreen({ cart, onBack, onConfirm, isSubmitting = false }: Props) {
  const [selected, setSelected] = useState<PaymentMethod>('cash')
  const total = getCartTotal(cart)

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
            Способ оплаты
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-6 space-y-3">
        <p className="text-sm text-cinnamon-600 dark:text-cinnamon-300 mb-2 px-1">
          Выберите, как удобнее оплатить заказ
        </p>

        {paymentOptions.map((option) => {
          const isActive = option.id === selected
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={
                'w-full text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ' +
                (isActive
                  ? 'bg-white dark:bg-cinnamon-800/80 border-cinnamon-500 shadow-md shadow-cinnamon-500/10'
                  : 'bg-white/50 dark:bg-cinnamon-800/40 border-cinnamon-100 dark:border-cinnamon-800 hover:border-cinnamon-300 dark:hover:border-cinnamon-700')
              }
            >
              <div className="text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900">
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-base font-semibold text-cinnamon-900 dark:text-cinnamon-50 leading-tight">
                    {option.title}
                  </h3>
                  {option.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-cinnamon-100 dark:bg-cinnamon-700 text-cinnamon-700 dark:text-cinnamon-200 font-medium">
                      {option.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-cinnamon-600 dark:text-cinnamon-300 leading-snug">
                  {option.description}
                </p>
              </div>
              <div
                className={
                  'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ' +
                  (isActive
                    ? 'border-cinnamon-500 bg-cinnamon-500'
                    : 'border-cinnamon-300 dark:border-cinnamon-600')
                }
                aria-hidden="true"
              >
                {isActive && (
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}

        <p className="text-xs text-cinnamon-600 dark:text-cinnamon-300 text-center px-2 pt-4">
          Оплата производится при получении заказа.
          <br />
          СБП и Telegram Stars обрабатываются мгновенно.
        </p>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cinnamon-50 dark:from-cinnamon-900 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button
            type="button"
            onClick={() => onConfirm(selected)}
            disabled={isSubmitting}
            className="w-full px-5 py-4 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 text-white font-semibold shadow-xl shadow-cinnamon-500/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span>Отправляем заказ…</span>
              </>
            ) : (
              <span>Подтвердить заказ · {formatPrice(total)}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
