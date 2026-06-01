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
        −
      </button>
      <span className="min-w-6 text-center" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cinnamon-600 active:bg-cinnamon-700 transition-colors"
        aria-label="Добавить ещё одну штуку"
      >
        +
      </button>
    </div>
  )
}
