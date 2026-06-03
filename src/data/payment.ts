export type PaymentMethod = 'cash' | 'card' | 'sbp' | 'stars'

export type PaymentOption = {
  id: PaymentMethod
  title: string
  description: string
  icon: string
  badge?: string
}

export const paymentOptions: PaymentOption[] = [
  {
    id: 'cash',
    title: 'Наличными',
    description: 'Передаёте при получении заказа',
    icon: '💵',
  },
  {
    id: 'card',
    title: 'Картой',
    description: 'У\u00A0всех курьеров есть терминал',
    icon: '💳',
  },
  {
    id: 'sbp',
    title: 'Перевод по\u00A0СБП',
    description: 'QR-код появится после подтверждения',
    icon: '📱',
    badge: 'без комиссии',
  },
  {
    id: 'stars',
    title: 'Telegram Stars',
    description: 'Оплата через Telegram, моментально',
    icon: '⭐️',
  },
]

export function getPaymentLabel(method: PaymentMethod): string {
  return paymentOptions.find((p) => p.id === method)?.title ?? method
}
