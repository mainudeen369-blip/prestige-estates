import { useApp } from '../context/AppContext'
import { Target, Eye, Quote, Check, Phone, Mail, Sparkles } from 'lucide-react'
import AnimateOnScroll from '../components/AnimateOnScroll'
import HeroBackground from '../components/HeroBackground'
import SafeImage from '../components/SafeImage'
import { getWhatsAppLink } from '../utils/helpers'

export default function AboutPage() {
  const { settings } = useApp()
  const whatsappLink = getWhatsAppLink(settings.whatsappNumber, `Hi ${settings.companyName}! I'd like to know more about your services.`)

  return (
    <div className="bg-page-soft min-h-screen overflow-x-clip w-full">
      {/* Hero */}
      <div className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackground imageSrc={settings.heroImage} imageAlt="" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center py-20">
          <div className="hero-content-panel-center">
            <SafeImage
              src="/logo.png"
              alt="Sri Anjaneya Realtor"
              className="h-32 w-auto mx-auto mb-6 rounded-2xl bg-white p-3 shadow-xl animate-bounce-subtle"
            />
            {settings.companyNameTelugu && (
              <p className="text-[#dcf8e8] text-xl mb-2 animate-fade-up">{settings.companyNameTelugu}</p>
            )}
            <p className="hero-accent text-sm font-semibold tracking-[0.2em] uppercase mb-3">About Us</p>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-up hero-text-shadow">
              {settings.companyName}
            </h1>
            <p className="text-white/95 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up">{settings.tagline}</p>
            {settings.taglineTelugu && (
              <p className="text-[#dcf8e8] italic mt-3 animate-fade-up">{settings.taglineTelugu}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <AnimateOnScroll direction="left">
            <div>
              <p className="text-light-label text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{settings.aboutTitle}</h2>
              {settings.aboutIntro && (
                <p className="text-lg text-light-body leading-relaxed mb-4 font-medium border-l-4 border-[#25D366] pl-4">
                  {settings.aboutIntro}
                </p>
              )}
              <p className="text-light-body leading-relaxed mb-4">{settings.aboutContent}</p>
              {settings.aboutStory && (
                <p className="text-light-muted leading-relaxed text-sm mb-6">{settings.aboutStory}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {settings.serviceAreas.map((a) => (
                  <span key={a} className="px-4 py-1.5 bg-[#075E54] text-white text-sm rounded-full shine-hover">{a}</span>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { val: `${settings.yearsExperience}+`, label: 'Years Trust' },
                  { val: `${settings.propertiesSold}+`, label: 'Properties Sold' },
                  { val: `${settings.happyClients}+`, label: 'Happy Families' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 bg-white rounded-2xl border border-slate-100 card-hover shine-hover">
                    <p className="font-display text-xl sm:text-2xl font-bold text-[#128C7E] price-value">{s.val}</p>
                    <p className="text-xs text-light-muted mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e8f3ee] via-[#eef0f6] to-[#f3ebf0] min-h-[320px] flex items-center justify-center p-8 shadow-lg border border-slate-100">
              <div className="text-center max-w-sm">
                <Quote className="w-10 h-10 text-[#128C7E] mx-auto mb-4 opacity-80" />
                <p className="text-slate-800 font-semibold leading-relaxed text-lg">
                  "Safe investment with lifetime trust — achieve your dreams with Sri Anjaneya Realtor."
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-[#128C7E] text-white p-3 sm:p-4 rounded-2xl shadow-lg animate-bounce-subtle">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Trust points */}
        {settings.trustPoints && (
          <div className="mb-24">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-slate-900">Our Promise to You</h2>
                <p className="text-light-muted mt-2">Every property. Every client. Every time.</p>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {settings.trustPoints.map((tp, i) => (
                <AnimateOnScroll key={tp.title} delay={i * 100}>
                  <div className="p-6 rounded-2xl bg-white border border-slate-100 card-hover shine-hover h-full text-center">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-[#128C7E]" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{tp.title}</h3>
                    <p className="text-sm text-light-muted leading-relaxed">{tp.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        <div className="mb-24">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-slate-900">What We Deal In</h2>
              <p className="text-light-muted mt-2">From farmland to commercial complexes — everything under one roof.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.serviceCategories.map((cat, i) => (
              <AnimateOnScroll key={cat.title} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full card-hover shine-hover group">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-[#128C7E] font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-3">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-light-body flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Starting prices */}
        <AnimateOnScroll>
          <div className="bg-brand-dark rounded-3xl p-6 sm:p-10 mb-24 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#dcf8e8]/45 to-[#128C7E]/30 animate-gradient" />
            <div className="relative min-w-0">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-center">Affordable Starting Prices</h2>
              <p className="text-dark-muted text-center mb-6 sm:mb-8 text-sm">Quality properties that respect your budget</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {settings.startingPrices.map((p) => (
                  <div key={p.category} className="text-center p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors min-w-0">
                    <p className="text-xs sm:text-sm text-dark-muted mb-1 leading-snug">{p.category}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-dark-accent price-value">{p.price}</p>
                    <p className="text-[11px] sm:text-xs text-dark-label mt-1 leading-snug">{p.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Highlights */}
        <div className="mb-24">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">Why Families Choose Us</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settings.highlights.map((h, i) => (
              <AnimateOnScroll key={h} delay={i * 60}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 card-hover shine-hover">
                  <span className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#128C7E]" />
                  </span>
                  <p className="text-light-body leading-relaxed">{h}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <AnimateOnScroll direction="left">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 card-hover shine-hover h-full">
              <Target className="w-8 h-8 text-[#128C7E] mb-4" />
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-light-body leading-relaxed">{settings.mission}</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 card-hover shine-hover h-full">
              <Eye className="w-8 h-8 text-[#25D366] mb-4" />
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-light-body leading-relaxed">{settings.vision}</p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Contact CTA */}
        <AnimateOnScroll>
          <div className="bg-brand-dark rounded-3xl p-10 text-center text-white mb-24 relative overflow-hidden">
            <div className="relative">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-body mb-3">{settings.ctaTitle}</h2>
              <p className="text-dark-muted mb-6 max-w-lg mx-auto">{settings.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${settings.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#075E54] font-semibold rounded-xl hover:scale-105 transition-transform shine-hover">
                  <Phone className="w-4 h-4" /> {settings.phone}
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#25D366] font-semibold rounded-xl hover:scale-105 transition-transform">
                  WhatsApp Us
                </a>
                <a href={`mailto:${settings.email}`} className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/30 font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

      </div>
    </div>
  )
}
