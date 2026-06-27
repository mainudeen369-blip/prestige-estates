import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AnimateOnScroll from './AnimateOnScroll'

export default function CompanyAboutSection() {
  const { settings } = useApp()

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll direction="left">
            <div>
              <img src="/logo.png" alt="Sri Anjaneya Realtor" className="h-24 w-auto mb-6 rounded-xl bg-white p-2 shadow-sm" />
              {settings.companyNameTelugu && (
                <p className="text-gold-600 text-lg font-medium mb-2">{settings.companyNameTelugu}</p>
              )}
              <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">About Our Company</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-4">{settings.aboutTitle}</h2>
              {settings.taglineTelugu && (
                <p className="text-slate-500 italic mb-4">{settings.taglineTelugu}</p>
              )}
              <p className="text-slate-600 leading-relaxed mb-6">{settings.aboutContent}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {settings.serviceAreas.map((area) => (
                  <span key={area} className="px-3 py-1 bg-navy-900 text-white text-xs font-medium rounded-full">{area}</span>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-gold-600 font-semibold hover:gap-3 transition-all">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={150}>
            <div className="space-y-4">
              <h3 className="font-semibold text-navy-900 mb-3">What We Offer</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {settings.serviceCategories.map((cat) => (
                  <div key={cat.title} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-gold-500/30 transition-colors">
                    <h4 className="font-semibold text-navy-900 text-sm mb-2">{cat.title}</h4>
                    <ul className="space-y-1">
                      {cat.items.slice(0, 3).map((item) => (
                        <li key={item} className="text-xs text-slate-500 flex items-start gap-1.5">
                          <span className="text-gold-500 mt-0.5">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-navy-950 text-white mt-4">
                <h4 className="font-semibold text-gold-400 mb-3">Starting Prices</h4>
                <div className="grid grid-cols-2 gap-3">
                  {settings.startingPrices.map((p) => (
                    <div key={p.category}>
                      <p className="text-xs text-slate-400">{p.category}</p>
                      <p className="font-bold text-white">{p.price}</p>
                      <p className="text-[10px] text-slate-500">{p.unit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-navy-900 font-medium">
                  <Phone className="w-4 h-4 text-gold-500" /> {settings.phone}
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-navy-900 font-medium">
                  <Mail className="w-4 h-4 text-gold-500" /> {settings.email}
                </a>
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4 text-gold-500" /> AP & Telangana
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
