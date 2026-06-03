import {
  formatPrice,
  getCartLines,
  getCartTotal,
  type Cart,
} from '../data/cart'
import { QuantityControl } from '../components/QuantityControl'

type Props = {
  cart: Cart
  onAdd: (itemId: string) => void
  onRemove: (itemId: string) => void
  onBack: () => void
  onCheckout: () => void
}

export function CartScreen({ cart, onAdd, onRemove, onBack, onCheckout }: Props) {
  const lines = getCartLines(cart)
  const total = getCartTotal(cart)
  const isEmpty = lines.length === 0

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
            Корзина
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-8">
        {isEmpty ? (
          <EmptyCart onBack={onBack} />
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-cinnamon-500 dark:text-cinnamon-400 mb-1">
                Ваш выбор
              </p>
              <h2 className="font-serif italic text-3xl text-cinnamon-900 dark:text-cinnamon-50">
                «Корзина»
              </h2>
            </div>

            <div className="space-y-3">
              {lines.map((line) => (
                <article
                  key={line.item.id}
                  className="flex gap-4 items-center p-3 rounded-2xl bg-white dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 shadow-sm"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 overflow-hidden relative">
                    {line.item.image ? (
                      <img
                        src={line.item.image}
                        alt={line.item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="absolute inset-0 flex items-center justify-center text-3xl"
                        aria-label={line.item.name}
                      >
                        {line.item.emoji}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-cinnamon-900 dark:text-cinnamon-50 leading-snug truncate">
                      {line.item.name}
                    </h3>
                    <p className="text-sm text-cinnamon-600 dark:text-cinnamon-300 tabular-nums mt-0.5">
                      {formatPrice(line.item.price)} × {line.quantity} ={' '}
                      <span className="font-medium text-cinnamon-800 dark:text-cinnamon-100">
                        {formatPrice(line.subtotal)}
                      </span>
                    </p>
                  </div>
                  <QuantityControl
                    quantity={line.quantity}
                    onIncrement={() => onAdd(line.item.id)}
                    onDecrement={() => onRemove(line.item.id)}
                  />
                </article>
              ))}
            </div>

            <div className="mt-8">
              <div
                className="flex items-center justify-center gap-3 mb-6 text-cinnamon-400 dark:text-cinnamon-500"
                aria-hidden="true"
              >
                <span className="h-px w-12 bg-current opacity-50" />
                <span className="text-sm">❖</span>
                <span className="h-px w-12 bg-current opacity-50" />
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-white to-cinnamon-50 dark:from-cinnamon-800/80 dark:to-cinnamon-900/80 border border-cinnamon-100 dark:border-cinnamon-800 shadow-sm overflow-hidden">
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-sm text-cinnamon-600 dark:text-cinnamon-300">
                    <span>Сумма заказа</span>
                    <span className="tabular-nums">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-cinnamon-600 dark:text-cinnamon-300">
                    <span className="flex items-center gap-2">
                      <span>Доставка</span>
                      <span className="text-[10px] uppercase tracking-wider bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                        бесплатно
                      </span>
                    </span>
                    <span className="tabular-nums">0&nbsp;₽</span>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-cinnamon-100 dark:border-cinnamon-700 bg-white/50 dark:bg-cinnamon-900/40 flex justify-between items-baseline">
                  <span className="font-serif italic text-lg text-cinnamon-900 dark:text-cinnamon-50">
                    Итого
                  </span>
                  <span className="font-serif italic text-2xl text-cinnamon-900 dark:text-cinnamon-50 tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <p className="text-center text-xs text-cinnamon-500 dark:text-cinnamon-400 mt-4">
                Готовим заказ за{' '}
                <span className="font-medium text-cinnamon-700 dark:text-cinnamon-200">
                  30 — 45 минут
                </span>
              </p>
            </div>
          </>
        )}
      </main>

      {!isEmpty && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cinnamon-50 dark:from-cinnamon-900 to-transparent pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              onClick={onCheckout}
              className="w-full px-5 py-4 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 text-white font-semibold shadow-xl shadow-cinnamon-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <span>Оформить заказ · {formatPrice(total)}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyCart({ onBack }: { onBack: () => void }) {
  return (
    <div className="text-center py-12 max-w-sm mx-auto">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cinnamon-100 to-cinnamon-200 dark:from-cinnamon-800 dark:to-cinnamon-900" />
        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full p-4 text-cinnamon-500 dark:text-cinnamon-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 40 L22 70 Q22 80 32 80 L58 80 Q68 80 68 70 L68 40 Z" />
          <path d="M68 48 Q80 48 80 58 Q80 68 68 68" />
          <ellipse cx="45" cy="86" rx="32" ry="3" opacity="0.4" />
          <path d="M35 32 Q40 26 35 20" opacity="0.5" />
          <path d="M45 32 Q50 26 45 20" opacity="0.5" />
          <path d="M55 32 Q60 26 55 20" opacity="0.5" />
        </svg>
      </div>
      <p className="font-serif italic text-2xl text-cinnamon-900 dark:text-cinnamon-50 mb-2">
        Пока пусто
      </p>
      <p className="text-sm text-cinnamon-600 dark:text-cinnamon-300 mb-8">
        Выберите что-нибудь вкусное
        <br />
        из нашего меню
      </p>
      <button
        onClick={onBack}
        className="px-6 py-3 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 text-white font-medium transition-colors shadow-lg shadow-cinnamon-500/20"
      >
        Открыть меню
      </button>
    </div>
  )
}
