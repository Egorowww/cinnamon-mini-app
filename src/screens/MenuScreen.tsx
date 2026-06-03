import { useState } from 'react'
import { categories, menuItems, type CategoryId } from '../data/menu'
import {
  formatPrice,
  getCartCount,
  getCartTotal,
  pluralizeItems,
  type Cart,
} from '../data/cart'
import { QuantityControl } from '../components/QuantityControl'

type Props = {
  cart: Cart
  onAdd: (itemId: string) => void
  onRemove: (itemId: string) => void
  onBack: () => void
  onOpenCart: () => void
}

export function MenuScreen({ cart, onAdd, onRemove, onBack, onOpenCart }: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('breakfast')

  const visibleItems = menuItems.filter((item) => item.category === activeCategory)
  const cartCount = getCartCount(cart)
  const cartTotal = getCartTotal(cart)

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
            Меню
          </h1>
        </div>

        <div className="max-w-2xl mx-auto px-5 pb-4 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map((category) => {
            const isActive = category.id === activeCategory
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={
                  'flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ' +
                  (isActive
                    ? 'bg-cinnamon-500 text-white shadow-md shadow-cinnamon-500/30'
                    : 'bg-cinnamon-100 text-cinnamon-800 dark:bg-cinnamon-800 dark:text-cinnamon-200 hover:bg-cinnamon-200 dark:hover:bg-cinnamon-700')
                }
              >
                <span>{category.emoji}</span>
                <span>{category.title}</span>
              </button>
            )
          })}
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-6 space-y-3">
        {visibleItems.map((item) => {
          const quantity = cart[item.id] ?? 0
          return (
            <article
              key={item.id}
              className="flex gap-4 items-start p-4 rounded-2xl bg-white dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 shadow-sm"
            >
              <div
                className="relative flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-cinnamon-50 to-cinnamon-100 dark:from-cinnamon-900 dark:to-cinnamon-800 border border-cinnamon-200/60 dark:border-cinnamon-700/60 shadow-inner overflow-hidden"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-5xl leading-none drop-shadow-sm"
                    role="img"
                    aria-label={item.name}
                  >
                    {item.emoji}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg text-cinnamon-900 dark:text-cinnamon-50 mb-1 leading-tight">
                  {item.name}
                </h3>
                <p className="text-sm text-cinnamon-600 dark:text-cinnamon-300 leading-snug mb-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-end gap-3">
                  {quantity === 0 ? (
                    <button
                      onClick={() => onAdd(item.id)}
                      className="inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 text-white text-sm font-medium transition-colors"
                      aria-label={`Добавить в корзину: ${item.name}`}
                    >
                      <span className="tabular-nums">{formatPrice(item.price)}</span>
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/15">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </button>
                  ) : (
                    <QuantityControl
                      quantity={quantity}
                      onIncrement={() => onAdd(item.id)}
                      onDecrement={() => onRemove(item.id)}
                    />
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </main>

      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cinnamon-50 dark:from-cinnamon-900 to-transparent pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              onClick={onOpenCart}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 text-white shadow-xl shadow-cinnamon-500/30 transition-colors"
            >
              <span className="font-medium">
                Корзина · {cartCount} {pluralizeItems(cartCount)}
              </span>
              <span className="flex items-center gap-2 font-semibold">
                {formatPrice(cartTotal)}
                <span aria-hidden="true">→</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
