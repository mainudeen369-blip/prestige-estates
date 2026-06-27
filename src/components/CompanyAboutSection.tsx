import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, Mail, Sparkles, Leaf, Building, Landmark } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AnimateOnScroll from './AnimateOnScroll'

const categoryIcons = [Leaf, Building, Landmark, Sparkles]

export default function CompanyAboutSection() {
  const { settings } = useApp()

  return (
    <section className="py-28 bg-section-cream relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-[#128C7E]/6 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#b88496]/8 rounded-full blur-3xl animate-float-delay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="text-light-label text-sm font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-[#128C7E] to-[#b88496] animate-line-grow" />
              {settings.companyNameTelugu}
              <span className="w-8 h-px bg-gradient-to-r from-[#b88496] to-[#128C7E] animate-line-grow" />
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              {settings.aboutTitle}
            </h2>
            {settings.aboutIntro && (
              <p className="text-lg text-light-body max-w-3xl mx-auto leading-relaxed italic">
                "{settings.aboutIntro}"
              </p>
            )}
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <AnimateOnScroll direction="left">
            <div className="relative">
              <img src="/logo.png" alt="Sri Anjaneya Realtor" className="h-28 w-auto mb-6 rounded-2xl bg-white p-3 shadow-lg animate-bounce-subtle" />
              <p className="text-light-body leading-relaxed mb-4">{settings.aboutContent}</p>
              {settings.aboutStory && (
                <p className="text-light-muted leading-relaxed text-sm mb-6 border-l-4 border-[#25D366] pl-4">
                  {settings.aboutStory}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {settings.serviceAreas.map((area) => (
                  <span key={area} className="px-4 py-1.5 bg-[#075E54] text-white text-sm font-medium rounded-full shine-hover">
                    {area}
                  </span>
                ))}
              </div>

              {settings.trustPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 stagger-fade">
                  {settings.trustPoints.map((tp) => (
                    <div key={tp.title} className="p-4 rounded-xl bg-white border border-slate-100 card-hover shine-hover">
                      <p className="font-semibold text-navy-900 text-sm mb-1">{tp.title}</p>
                      <p className="text-xs text-light-muted leading-relaxed">{tp.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-all hover:shadow-lg group">
                Our Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={150}>
            <div className="space-y-5">
              <h3 className="font-display text-xl font-semibold text-navy-900">Properties We Deal In</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {settings.serviceCategories.map((cat, i) => {
                  const Icon = categoryIcons[i] || Sparkles
                  return (
                    <div key={cat.title} className="p-5 rounded-2xl bg-white border border-slate-100 card-hover shine-hover group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-[#128C7E]" />
                      </div>
                      <h4 className="font-semibold text-navy-900 text-sm mb-2">{cat.title}</h4>
                      <ul className="space-y-1">
                        {cat.items.map((item) => (
                          <li key={item} className="text-xs text-light-muted flex items-start gap-1.5">
                            <span className="text-[#25D366] mt-0.5">✦</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              <div className="p-6 rounded-2xl bg-brand-card text-white relative overflow-hidden shine-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-emerald-500/10 animate-gradient" />
                <div className="relative">
                  <h4 className="font-display text-lg font-semibold text-dark-accent mb-4">Affordable Starting Prices</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {settings.startingPrices.map((p) => (
                      <div key={p.category} className="p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors min-w-0">
                        <p className="text-xs text-dark-muted leading-snug">{p.category}</p>
                        <p className="font-bold text-dark-accent text-base sm:text-lg price-value">{p.price}</p>
                        <p className="text-[10px] sm:text-xs text-dark-label leading-snug">{p.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-[#ecfdf5] border border-[#25D366]/20">
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-slate-900 font-semibold hover:text-[#128C7E] transition-colors">
                  <Phone className="w-4 h-4 text-[#128C7E]" /> {settings.phone}
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-slate-800 font-medium hover:text-[#128C7E] break-all">
                  <Mail className="w-4 h-4 text-[#128C7E]" /> {settings.email}
                </a>
                <span className="flex items-center gap-2 text-sm text-light-body">
                  <MapPin className="w-4 h-4 text-[#128C7E]" /> Serving AP & Telangana
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
