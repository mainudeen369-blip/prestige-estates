import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Logo from '../Logo'

export default function Footer() {
  const { settings } = useApp()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-footer text-slate-800 border-t border-[#8aa8a0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <Logo variant="dark" showText={true} className="mb-4" />
            <p className="text-sm leading-relaxed mb-2 text-slate-700">{settings.tagline}</p>
            {settings.taglineTelugu && (
              <p className="text-sm leading-relaxed mb-4 text-slate-600">{settings.taglineTelugu}</p>
            )}
            {settings.serviceAreas.length > 0 && (
              <p className="text-xs text-slate-600 mb-6">
                Serving {settings.serviceAreas.join(' & ')}
              </p>
            )}
            <div className="flex gap-3">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#075E54]/10 flex items-center justify-center hover:bg-[#25D366]/15 hover:text-[#075E54] transition-colors" aria-label="Facebook">
                  <Share2 className="w-4 h-4" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#075E54]/10 flex items-center justify-center hover:bg-[#25D366]/15 hover:text-[#075E54] transition-colors" aria-label="Instagram">
                  <Share2 className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#075E54]/10 flex items-center justify-center hover:bg-[#25D366]/15 hover:text-[#075E54] transition-colors" aria-label="LinkedIn">
                  <Share2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><Link to="/buyers" className="hover:text-[#075E54] transition-colors">For Buyers</Link></li>
              <li><Link to="/sellers" className="hover:text-[#075E54] transition-colors">For Sellers</Link></li>
              <li><Link to="/about" className="hover:text-[#075E54] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#075E54] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#128C7E] mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#128C7E] shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-slate-700 hover:text-[#075E54] transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#128C7E] shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-slate-700 hover:text-[#075E54] transition-colors break-all">{settings.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#25D366]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {year} {settings.companyName}. All rights reserved.</p>
          <Link to="/admin" className="text-slate-600 hover:text-[#128C7E] transition-colors text-xs">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  )
}
