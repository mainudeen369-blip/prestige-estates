import { useState, type ImgHTMLAttributes, type ReactNode } from 'react'

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode
}

/** Renders nothing (or optional fallback) when the image fails to load — no broken icon. */
export default function SafeImage({ fallback = null, onError, src, alt = '', ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) return <>{fallback}</>

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      onError={(e) => {
        setFailed(true)
        onError?.(e)
      }}
    />
  )
}
