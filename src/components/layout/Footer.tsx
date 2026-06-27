import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Logo from '../Logo'

export default function Footer() {
  const { settings } = useApp()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Logo variant="light" showText={true} className="mb-4" />
            <p className="text-sm leading-relaxed mb-6">{settings.tagline}</p>
            <div className="flex gap-3">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 transition-colors" aria-label="Facebook">
                  <Share2 className="w-4 h-4" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 transition-colors" aria-label="Instagram">
                  <Share2 className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-400 transition-colors" aria-label="LinkedIn">
                  <Share2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/buyers" className="hover:text-gold-400 transition-colors">For Buyers</Link></li>
              <li><Link to="/sellers" className="hover:text-gold-400 transition-colors">For Sellers</Link></li>
              <li><Link to="/listings" className="hover:text-gold-400 transition-colors">All Properties</Link></li>
              <li><Link to="/agents" className="hover:text-gold-400 transition-colors">Agent Profiles</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/listings?propertyType=Apartment" className="hover:text-gold-400 transition-colors">Apartments</Link></li>
              <li><Link to="/listings?propertyType=Villa" className="hover:text-gold-400 transition-colors">Villas</Link></li>
              <li><Link to="/listings?propertyType=Commercial" className="hover:text-gold-400 transition-colors">Commercial</Link></li>
              <li><Link to="/listings?propertyType=Land" className="hover:text-gold-400 transition-colors">Land</Link></li>
              <li><Link to="/listings?propertyType=Building" className="hover:text-gold-400 transition-colors">Buildings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-gold-400 transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-400 transition-colors break-all">{settings.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {year} {settings.companyName}. All rights reserved.</p>
          <Link to="/admin" className="text-slate-500 hover:text-gold-400 transition-colors text-xs">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  )
}
