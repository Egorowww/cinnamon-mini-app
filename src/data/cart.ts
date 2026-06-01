import { menuItems, type MenuItem } from './menu'

export type Cart = Record<string, number>

export type CartLine = {
  item: MenuItem
  quantity: number
  subtotal: number
}

export function getCartLines(cart: Cart): CartLine[] {
  return Object.entries(cart)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => {
      const item = menuItems.find((i) => i.id === id)!
      return {
        item,
        quantity,
        subtotal: item.price * quantity,
      }
    })
}

export function getCartTotal(cart: Cart): number {
  return getCartLines(cart).reduce((sum, line) => sum + line.subtotal, 0)
}

export function getCartCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
}

export function addToCart(cart: Cart, itemId: string): Cart {
  return { ...cart, [itemId]: (cart[itemId] ?? 0) + 1 }
}

export function removeFromCart(cart: Cart, itemId: string): Cart {
  const current = cart[itemId] ?? 0
  if (current <= 1) {
    const { [itemId]: _, ...rest } = cart
    return rest
  }
  return { ...cart, [itemId]: current - 1 }
}

export function clearCart(): Cart {
  return {}
}

export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU') + ' ₽'
}

export function pluralizeItems(count: number): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return 'товар'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'товара'
  return 'товаров'
}
