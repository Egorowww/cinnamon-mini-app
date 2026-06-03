import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  src?: string
  alt: string
  fallbackEmoji: string
  emojiClassName?: string
  className?: string
}

export function DishImage({
  src,
  alt,
  fallbackEmoji,
  emojiClassName = 'text-3xl',
  className = '',
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  const showImage = !!src && !errored

  return (
    <>
      {showImage && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.05,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
        />
      )}

      {showImage && !loaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-cinnamon-100/70 via-cinnamon-200/60 to-cinnamon-100/70 dark:from-cinnamon-800/60 dark:via-cinnamon-700/50 dark:to-cinnamon-800/60 animate-pulse"
          aria-hidden="true"
        />
      )}

      {!showImage && (
        <span
          className={`absolute inset-0 flex items-center justify-center leading-none drop-shadow-sm ${emojiClassName}`}
          role="img"
          aria-label={alt}
        >
          {fallbackEmoji}
        </span>
      )}
    </>
  )
}
