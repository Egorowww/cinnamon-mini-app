type Props = {
  onBackHome: () => void
}

export function SuccessScreen({ onBackHome }: Props) {
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
          <div className="flex items-center justify-center gap-3 mb-8 text-cinnamon-400 dark:text-cinnamon-600" aria-hidden="true">
            <span className="h-px w-12 bg-current" />
            <span className="text-sm tracking-widest">⊹</span>
            <span className="h-px w-12 bg-current" />
          </div>

          <div className="relative inline-flex items-center justify-center mb-8">
            <div
              className="absolute inset-0 -m-6 rounded-full border border-cinnamon-300/40 dark:border-cinnamon-700/40"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -m-12 rounded-full border border-cinnamon-300/20 dark:border-cinnamon-700/20"
              aria-hidden="true"
            />

            <div className="w-24 h-24 rounded-full bg-cinnamon-500 flex items-center justify-center shadow-2xl shadow-cinnamon-500/40">
              <svg
                className="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

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
          </div>

          <p className="text-xs uppercase tracking-[0.35em] text-cinnamon-600 dark:text-cinnamon-300 mb-2">
            Спасибо!
          </p>
          <h1 className="font-serif italic text-4xl tracking-tight text-cinnamon-800 dark:text-cinnamon-50 mb-5">
            «Заказ принят»
          </h1>

          <p className="text-sm text-cinnamon-700 dark:text-cinnamon-200 mb-8 leading-relaxed">
            Уже передали на кухню. Менеджер свяжется с вами
            <br />
            в течение нескольких минут для подтверждения.
          </p>

          <div className="mb-8 p-4 rounded-2xl bg-white/60 dark:bg-cinnamon-800/40 border border-cinnamon-100 dark:border-cinnamon-800 backdrop-blur">
            <div className="text-cinnamon-500 dark:text-cinnamon-400 text-xs uppercase tracking-wider mb-1">
              Ожидаемое время доставки
            </div>
            <div className="font-serif italic text-2xl text-cinnamon-800 dark:text-cinnamon-100">
              30 — 45 минут
            </div>
          </div>

          <button
            type="button"
            onClick={onBackHome}
            className="w-full rounded-2xl bg-cinnamon-500 hover:bg-cinnamon-600 active:bg-cinnamon-700 transition-colors text-white font-medium py-4 px-6 shadow-lg shadow-cinnamon-500/30"
          >
            На главную
          </button>

          <div className="flex items-center justify-center gap-3 mt-10 text-cinnamon-400/60 dark:text-cinnamon-600/60 text-sm" aria-hidden="true">
            <span>⊰</span>
            <span>❀</span>
            <span>⊱</span>
          </div>
        </div>
      </div>
    </div>
  )
}
