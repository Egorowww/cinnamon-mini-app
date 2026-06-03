import { formatPrice, getCartTotal, type Cart } from '../data/cart'

type Props = {
  cart: Cart
  onBack: () => void
  onPaid: () => void
  isSubmitting?: boolean
}

const RECIPIENT = {
  name: 'ИП Кофейня «Корица»',
  bank: 'Тинькофф Банк',
  account: '40817 •••• •••• 4312',
  phone: '+7 999 ••• 15-15',
}

export function QrPaymentScreen({ cart, onBack, onPaid, isSubmitting = false }: Props) {
  const total = getCartTotal(cart)

  const qrPayload = [
    'ST00012',
    `Name=${RECIPIENT.name}`,
    `PersonalAcc=40817810099910004312`,
    `BankName=${RECIPIENT.bank}`,
    `BIC=044525974`,
    `Sum=${total * 100}`,
    `Purpose=Оплата заказа в кафе Корица`,
  ].join('|')

  const qrImageUrl =
    'https://api.qrserver.com/v1/create-qr-code/?' +
    new URLSearchParams({
      size: '440x440',
      data: qrPayload,
      color: '2e170c',
      bgcolor: 'ffffff',
      margin: '0',
      qzone: '0',
      format: 'svg',
    }).toString()

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
            Оплата по&nbsp;СБП
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-6">
        <div className="rounded-3xl bg-white dark:bg-cinnamon-800/60 border border-cinnamon-100 dark:border-cinnamon-800 shadow-lg overflow-hidden">
          <div className="p-5 text-center border-b border-cinnamon-100 dark:border-cinnamon-800">
            <p className="text-xs uppercase tracking-[0.25em] text-cinnamon-500 dark:text-cinnamon-400 mb-1">
              Сумма к&nbsp;оплате
            </p>
            <p className="font-serif italic text-4xl text-cinnamon-800 dark:text-cinnamon-50 tabular-nums">
              {formatPrice(total)}
            </p>
          </div>

          <div className="p-6 flex flex-col items-center bg-cinnamon-50/50 dark:bg-cinnamon-900/40">
            <div className="p-4 rounded-2xl bg-white shadow-inner border border-cinnamon-100">
              <img
                src={qrImageUrl}
                alt="QR-код для оплаты"
                width={220}
                height={220}
                className="block w-[220px] h-[220px]"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-sm text-cinnamon-700 dark:text-cinnamon-200 text-center max-w-xs">
              Откройте приложение банка и&nbsp;отсканируйте QR-код. Деньги придут моментально.
            </p>
          </div>

          <div className="p-5 space-y-2.5 text-sm">
            <Row label="Получатель" value={RECIPIENT.name} />
            <Row label="Банк" value={RECIPIENT.bank} />
            <Row label="Счёт" value={RECIPIENT.account} mono />
            <Row label="Телефон СБП" value={RECIPIENT.phone} mono />
          </div>
        </div>

        <p className="text-xs text-cinnamon-600 dark:text-cinnamon-300 text-center px-2 mt-4">
          После оплаты нажмите кнопку ниже — мы проверим поступление
          и&nbsp;начнём готовить заказ.
        </p>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cinnamon-50 dark:from-cinnamon-900 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto space-y-2">
          <button
            type="button"
            onClick={onPaid}
            disabled={isSubmitting}
            className="w-full px-5 py-4 rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 text-white font-semibold shadow-xl shadow-cinnamon-500/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span>Проверяем оплату…</span>
              </>
            ) : (
              <span>Я оплатил</span>
            )}
          </button>
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full py-2 text-sm text-cinnamon-600 dark:text-cinnamon-300 hover:text-cinnamon-800 dark:hover:text-cinnamon-100 transition-colors disabled:opacity-60"
          >
            Сменить способ оплаты
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-cinnamon-500 dark:text-cinnamon-400 flex-shrink-0">{label}</span>
      <span
        className={
          'text-cinnamon-800 dark:text-cinnamon-100 text-right ' +
          (mono ? 'font-mono text-xs' : 'font-medium')
        }
      >
        {value}
      </span>
    </div>
  )
}
