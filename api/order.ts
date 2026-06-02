import type { VercelRequest, VercelResponse } from '@vercel/node'

type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
}

type OrderPayload = {
  customer: {
    name: string
    phone: string
    address: string
    comment?: string
  }
  items: OrderItem[]
  total: number
  paymentMethod: string
  paymentLabel: string
  createdAt: string
}

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU') + ' ₽'
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildMessage(order: OrderPayload, orderNumber: number): string {
  const { customer, items, total, paymentLabel } = order

  const itemsText = items
    .map(
      (item) =>
        `• ${escapeHtml(item.name)} × ${item.quantity} — <b>${formatPrice(
          item.price * item.quantity
        )}</b>`
    )
    .join('\n')

  const commentBlock = customer.comment
    ? `\n💬 <i>${escapeHtml(customer.comment)}</i>`
    : ''

  return [
    `🛎 <b>НОВЫЙ ЗАКАЗ #${orderNumber}</b>`,
    '',
    `👤 <b>${escapeHtml(customer.name)}</b>`,
    `📞 ${escapeHtml(customer.phone)}`,
    `📍 ${escapeHtml(customer.address)}`,
    commentBlock,
    '',
    itemsText,
    '',
    `💳 ${escapeHtml(paymentLabel)}`,
    `<b>Итого: ${formatPrice(total)}</b>`,
  ]
    .filter(Boolean)
    .join('\n')
}

function isValidOrder(order: unknown): order is OrderPayload {
  if (!order || typeof order !== 'object') return false
  const o = order as Partial<OrderPayload>
  return (
    typeof o.customer?.name === 'string' &&
    typeof o.customer?.phone === 'string' &&
    typeof o.customer?.address === 'string' &&
    Array.isArray(o.items) &&
    o.items.length > 0 &&
    typeof o.total === 'number' &&
    typeof o.paymentMethod === 'string'
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const botToken = process.env.BOT_TOKEN
  const ownerChatId = process.env.OWNER_CHAT_ID

  if (!botToken || !ownerChatId) {
    console.error('Missing BOT_TOKEN or OWNER_CHAT_ID env vars')
    return res
      .status(500)
      .json({ error: 'Server is not configured', success: false })
  }

  if (!isValidOrder(req.body)) {
    return res
      .status(400)
      .json({ error: 'Invalid order payload', success: false })
  }

  const order = req.body as OrderPayload
  const orderNumber = Math.floor(Date.now() / 1000) % 100000
  const text = buildMessage(order, orderNumber)

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: ownerChatId,
          text,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Telegram API error:', errorText)
      return res
        .status(502)
        .json({ error: 'Failed to notify owner', success: false })
    }

    return res.status(200).json({ success: true, orderNumber })
  } catch (error) {
    console.error('Unexpected error:', error)
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false })
  }
}
