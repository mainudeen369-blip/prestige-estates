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
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-header border-b border-amber-600/20 shadow-md shadow-amber-900/10 overflow-x-clip w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo variant="dark" />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-amber-800 ${
                  location.pathname === link.to ? 'text-amber-900 font-semibold' : 'text-stone-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-stone-800 hover:text-amber-900 transition-colors">
              <Phone className="w-4 h-4 text-amber-700" />
              {settings.phone}
            </a>
            <Link
              to="/listings"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-100 text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Browse Properties
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-stone-900"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-brand-hero border-t border-amber-600/15">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.to
                    ? 'bg-white/40 text-amber-950 font-semibold'
                    : 'text-stone-900 hover:bg-white/25'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/listings"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-stone-900 text-amber-100 text-sm font-semibold rounded-lg text-center"
            >
              Browse Properties
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
