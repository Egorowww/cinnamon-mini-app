import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuScreen } from './screens/MenuScreen'
import { CartScreen } from './screens/CartScreen'
import { CheckoutScreen, type OrderForm } from './screens/CheckoutScreen'
import { PaymentScreen } from './screens/PaymentScreen'
import { QrPaymentScreen } from './screens/QrPaymentScreen'
import { SuccessScreen } from './screens/SuccessScreen'
import {
  addToCart,
  clearCart,
  formatPrice,
  getCartCount,
  getCartLines,
  getCartTotal,
  pluralizeItems,
  removeFromCart,
  type Cart,
} from './data/cart'
import { getPaymentLabel, type PaymentMethod } from './data/payment'

type Screen = 'home' | 'menu' | 'cart' | 'checkout' | 'payment' | 'qr' | 'success'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [cart, setCart] = useState<Cart>({})
  const [pendingForm, setPendingForm] = useState<OrderForm | null>(null)
  const [pendingPayment, setPendingPayment] = useState<PaymentMethod | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAdd = (itemId: string) => setCart((c) => addToCart(c, itemId))
  const handleRemove = (itemId: string) => setCart((c) => removeFromCart(c, itemId))

  function handleCheckoutSubmit(form: OrderForm) {
    setPendingForm(form)
    setScreen('payment')
  }

  function handlePaymentConfirm(paymentMethod: PaymentMethod) {
    setPendingPayment(paymentMethod)
    if (paymentMethod === 'sbp') {
      setScreen('qr')
    } else {
      submitOrder(paymentMethod)
    }
  }

  async function submitOrder(paymentMethod: PaymentMethod) {
    if (!pendingForm) return

    const lines = getCartLines(cart)
    const total = getCartTotal(cart)

    const orderPayload = {
      customer: pendingForm,
      items: lines.map((l) => ({
        id: l.item.id,
        name: l.item.name,
        quantity: l.quantity,
        price: l.item.price,
      })),
      total,
      paymentMethod,
      paymentLabel: getPaymentLabel(paymentMethod),
      createdAt: new Date().toISOString(),
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Order sent successfully:', data)
      } else {
        const errorText = await response.text()
        console.warn('Order API returned error:', response.status, errorText)
      }
    } catch (error) {
      console.warn(
        'Order API unavailable — likely running in local dev. Order:',
        orderPayload,
        error
      )
    }

    setIsSubmitting(false)
    setCart(clearCart())
    setPendingForm(null)
    setPendingPayment(null)
    setScreen('success')
  }

  function handleQrPaid() {
    if (pendingPayment) submitOrder(pendingPayment)
  }

  function goHome() {
    setScreen('home')
    setPendingForm(null)
    setPendingPayment(null)
  }

  const cartCount = getCartCount(cart)
  const cartTotal = getCartTotal(cart)

  function renderScreen(): ReactNode {
    switch (screen) {
      case 'menu':
        return (
          <MenuScreen
            cart={cart}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onBack={() => setScreen('home')}
            onOpenCart={() => setScreen('cart')}
          />
        )
      case 'cart':
        return (
          <CartScreen
            cart={cart}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onBack={() => setScreen('menu')}
            onCheckout={() => setScreen('checkout')}
          />
        )
      case 'checkout':
        return (
          <CheckoutScreen
            cart={cart}
            onBack={() => setScreen('cart')}
            onSubmit={handleCheckoutSubmit}
          />
        )
      case 'payment':
        return (
          <PaymentScreen
            cart={cart}
            onBack={() => setScreen('checkout')}
            onConfirm={handlePaymentConfirm}
            isSubmitting={isSubmitting}
          />
        )
      case 'qr':
        return (
          <QrPaymentScreen
            cart={cart}
            onBack={() => setScreen('payment')}
            onPaid={handleQrPaid}
            isSubmitting={isSubmitting}
          />
        )
      case 'success':
        return <SuccessScreen onBackHome={goHome} />
      case 'home':
      default:
        return (
          <HomeContent
            cartCount={cartCount}
            cartTotal={cartTotal}
            onOpenMenu={() => setScreen('menu')}
            onOpenCart={() => setScreen('cart')}
          />
        )
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {renderScreen()}
      </motion.div>
    </AnimatePresence>
  )
}

type HomeProps = {
  cartCount: number
  cartTotal: number
  onOpenMenu: () => void
  onOpenCart: () => void
}

function HomeContent({ cartCount, cartTotal, onOpenMenu, onOpenCart }: HomeProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-cinnamon-500) 1px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, var(--color-cinnamon-300), transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, var(--color-cinnamon-400), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="absolute top-8 left-8 text-cinnamon-400/40 dark:text-cinnamon-600/40 text-2xl select-none pointer-events-none" aria-hidden="true">
        ❦
      </div>
      <div className="absolute top-8 right-8 text-cinnamon-400/40 dark:text-cinnamon-600/40 text-2xl select-none pointer-events-none rotate-180" aria-hidden="true">
        ❦
      </div>
      <div className="absolute bottom-8 left-8 text-cinnamon-400/30 dark:text-cinnamon-600/30 text-xl select-none pointer-events-none" aria-hidden="true">
        ✦
      </div>
      <div className="absolute bottom-8 right-8 text-cinnamon-400/30 dark:text-cinnamon-600/30 text-xl select-none pointer-events-none" aria-hidden="true">
        ✦
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center justify-center gap-3 mb-8 text-cinnamon-400 dark:text-cinnamon-600"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-current" />
            <span className="text-sm tracking-widest">⊹</span>
            <span className="h-px w-12 bg-current" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative inline-flex items-center justify-center mb-8"
          >
            <div className="absolute inset-0 -m-6 rounded-full border border-cinnamon-300/40 dark:border-cinnamon-700/40" aria-hidden="true" />
            <div className="absolute inset-0 -m-12 rounded-full border border-cinnamon-300/20 dark:border-cinnamon-700/20" aria-hidden="true" />

            <span className="text-8xl leading-none" role="img" aria-label="Чашка кофе">
              ☕️
            </span>

            <span className="absolute -top-2 -right-6 text-2xl animate-pulse" aria-hidden="true">
              ✨
            </span>
            <span className="absolute -bottom-1 -left-7 text-xl opacity-70 -rotate-12" aria-hidden="true">
              🍂
            </span>
            <span className="absolute top-4 -left-10 text-base opacity-60" aria-hidden="true">
              ✧
            </span>
            <span className="absolute -top-4 left-2 text-sm opacity-70" aria-hidden="true">
              ✦
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-xs uppercase tracking-[0.35em] text-cinnamon-600 dark:text-cinnamon-300 mb-2"
          >
            Кофейня
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-serif italic text-5xl tracking-tight text-cinnamon-800 dark:text-cinnamon-50 mb-5"
          >
            «Корица»
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-sm text-cinnamon-600 dark:text-cinnamon-300 mb-8 leading-relaxed"
          >
            Авторский кофе, домашняя выпечка
            <br />
            и&nbsp;завтраки целый день
          </motion.p>

          <motion.button
            type="button"
            onClick={onOpenMenu}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 transition-colors text-white font-medium py-4 px-6 shadow-lg shadow-cinnamon-500/30"
          >
            Открыть меню
          </motion.button>

          {cartCount > 0 && (
            <motion.button
              type="button"
              onClick={onOpenCart}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3 w-full rounded-2xl bg-cinnamon-100 dark:bg-cinnamon-800 hover:bg-cinnamon-200 dark:hover:bg-cinnamon-700 transition-colors text-cinnamon-800 dark:text-cinnamon-100 font-medium py-4 px-6"
            >
              В&nbsp;корзине {cartCount} {pluralizeItems(cartCount)} · {formatPrice(cartTotal)}
            </motion.button>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-3 text-sm"
          >
            <div className="p-3 rounded-xl bg-white/60 dark:bg-cinnamon-800/40 border border-cinnamon-100 dark:border-cinnamon-800 backdrop-blur">
              <div className="text-cinnamon-500 dark:text-cinnamon-400 text-xs mb-1 uppercase tracking-wider">
                Открыто
              </div>
              <div className="font-medium text-cinnamon-800 dark:text-cinnamon-100">
                8:00 — 22:00
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-cinnamon-800/40 border border-cinnamon-100 dark:border-cinnamon-800 backdrop-blur">
              <div className="text-cinnamon-500 dark:text-cinnamon-400 text-xs mb-1 uppercase tracking-wider">
                Адрес
              </div>
              <div className="font-medium text-cinnamon-800 dark:text-cinnamon-100">
                Ломоносова, 15
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-10 text-cinnamon-400/60 dark:text-cinnamon-600/60 text-sm"
            aria-hidden="true"
          >
            <span>⊰</span>
            <span>❀</span>
            <span>⊱</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default App
