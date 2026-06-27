import { useEffect, useState } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export default function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <span
        className={`inline-block transition-all duration-1000 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {text}
      </span>
    </span>
  )
}
