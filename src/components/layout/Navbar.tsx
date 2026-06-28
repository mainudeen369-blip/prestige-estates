import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Logo from '../Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/buyers', label: 'Buyers' },
  { to: '/sellers', label: 'Sellers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { settings } = useApp()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-header border-b border-[#8aa8a0]/25 shadow-md shadow-[#4a6278]/8 overflow-x-clip w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo variant="dark" />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-[#075E54] ${
                  location.pathname === link.to ? 'text-[#075E54] font-semibold' : 'text-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-slate-800 hover:text-[#075E54] transition-colors">
              <Phone className="w-4 h-4 text-[#128C7E]" />
              {settings.phone}
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-900"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-brand-hero border-t border-white/20">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.to
                    ? 'bg-white/30 text-white font-semibold'
                    : 'text-white/95 hover:bg-white/15'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-white text-[#128C7E] text-sm font-semibold rounded-lg text-center"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
