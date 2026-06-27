import { Link } from 'react-router-dom'

interface LogoProps {
  variant?: 'light' | 'dark' | 'admin'
  showText?: boolean
  className?: string
  linkTo?: string
}

export default function Logo({ variant = 'light', showText = true, className = '', linkTo = '/' }: LogoProps) {
  const isLight = variant === 'light'

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`shrink-0 rounded-xl overflow-hidden flex items-center justify-center ${
          isLight ? 'bg-white p-1 shadow-sm border border-white/20' : 'bg-white p-1.5 shadow-md'
        } ${variant === 'admin' ? 'p-1' : ''}`}
      >
        <img
          src="/logo.png"
          alt="Sri Anjaneya Realtor"
          className={`object-contain ${variant === 'admin' ? 'h-9 w-auto' : 'h-10 sm:h-11 w-auto'}`}
        />
      </div>
      {showText && (
        <div className="min-w-0">
          <span className={`font-display font-semibold tracking-tight block leading-tight ${
            isLight ? 'text-white text-base sm:text-lg' : 'text-navy-900 text-base'
          }`}>
            Sri Anjaneya
          </span>
          <span className={`text-[10px] sm:text-xs tracking-widest uppercase block ${
            isLight ? 'text-emerald-400/90' : 'text-emerald-600'
          }`}>
            Realtor
          </span>
        </div>
      )}
    </div>
  )

  if (linkTo) {
    return (
      <Link to={linkTo} className="group">
        {content}
      </Link>
    )
  }

  return content
}
