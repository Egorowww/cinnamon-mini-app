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

      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-6">
        {lines.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🧺</div>
            <p className="text-cinnamon-700 dark:text-cinnamon-200 mb-6">
              В корзине пока пусто.
              <br />
              Выберите что-нибудь вкусное в меню.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 text-white font-medium transition-colors"
            >
              Вернуться в меню
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {lines.map((line) => (
              <article
                key={line.item.id}
                className="flex gap-4 items-center p-4 rounded-2xl bg-white dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cinnamon-50 dark:bg-cinnamon-900 overflow-hidden relative">
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
                  <h3 className="font-semibold text-cinnamon-900 dark:text-cinnamon-50 leading-snug truncate">
                    {line.item.name}
                  </h3>
                  <p className="text-sm text-cinnamon-600 dark:text-cinnamon-300">
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

            <div className="mt-6 p-5 rounded-2xl bg-white dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 space-y-2">
              <div className="flex justify-between text-sm text-cinnamon-600 dark:text-cinnamon-300">
                <span>Доставка</span>
                <span>бесплатно</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-cinnamon-900 dark:text-cinnamon-50">
                <span>Итого</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {lines.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cinnamon-50 dark:from-cinnamon-900 to-transparent pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              onClick={onCheckout}
              className="w-full px-5 py-4 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 text-white font-semibold shadow-xl shadow-cinnamon-500/30 transition-colors"
            >
              Оформить заказ · {formatPrice(total)}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
