type Props = {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}

export function QuantityControl({ quantity, onIncrement, onDecrement }: Props) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-cinnamon-500 text-white text-sm font-medium">
      <button
        type="button"
        onClick={onDecrement}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cinnamon-600 active:bg-cinnamon-700 transition-colors"
        aria-label="Убрать одну штуку"
      >
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="min-w-6 text-center tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cinnamon-600 active:bg-cinnamon-700 transition-colors"
        aria-label="Добавить ещё одну штуку"
      >
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
      </button>
    </div>
  )
}
