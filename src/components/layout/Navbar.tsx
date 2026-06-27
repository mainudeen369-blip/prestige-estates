import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Logo from '../Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/buyers', label: 'Buyers' },
  { to: '/sellers', label: 'Sellers' },
  { to: '/listings', label: 'Properties' },
  { to: '/agents', label: 'Agents' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { settings } = useApp()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-white/10 overflow-x-clip w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo variant="light" />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                  location.pathname === link.to ? 'text-gold-400' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-gold-400" />
              {settings.phone}
            </a>
            <Link
              to="/listings"
              className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-navy-950 text-sm font-semibold rounded-lg transition-colors"
            >
              Browse Properties
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-900 border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.to
                    ? 'bg-gold-500/20 text-gold-400'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/listings"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-gold-500 text-navy-950 text-sm font-semibold rounded-lg text-center"
            >
              Browse Properties
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
