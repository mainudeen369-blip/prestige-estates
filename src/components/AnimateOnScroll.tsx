import { useEffect, useRef, useState, type ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const dirClass = {
    up: 'aos-up',
    down: 'aos-down',
    left: 'aos-left',
    right: 'aos-right',
    scale: 'aos-scale',
  }[direction]

  return (
    <div
      ref={ref}
      className={`aos ${dirClass} ${visible ? 'aos-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
