import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Headphones, BadgeCheck, Search, FileCheck, Handshake, Key, Sparkles, Phone } from 'lucide-react'
import { useApp } from '../context/AppContext'
import HeroBackground from '../components/HeroBackground'
import StatsBar from '../components/StatsBar'
import CompanyAboutSection from '../components/CompanyAboutSection'
import AnimateOnScroll from '../components/AnimateOnScroll'
import SafeImage from '../components/SafeImage'
import { getWhatsAppLink } from '../utils/helpers'

export default function HomePage() {
  const { settings } = useApp()

  const services = settings.trustPoints?.length
    ? settings.trustPoints.map((tp, i) => ({
        icon: [Shield, BadgeCheck, Sparkles, Headphones][i] || Shield,
        title: tp.title,
        desc: tp.desc,
      }))
    : [
        { icon: Shield, title: 'Clear Title Properties', desc: 'Every listing legally verified for your peace of mind.' },
        { icon: Headphones, title: '24/7 WhatsApp Support', desc: 'Reach us anytime — we are always here to help.' },
        { icon: BadgeCheck, title: 'Expert Local Guidance', desc: 'Deep knowledge of AP & Telangana property markets.' },
      ]

  const process = [
    { icon: Search, step: '01', title: 'Explore', desc: 'Browse plots, farmland, homes & commercial spaces across AP & Telangana.' },
    { icon: FileCheck, step: '02', title: 'Verify', desc: 'We check every document — clear title, legal clarity, site visit arranged.' },
    { icon: Handshake, step: '03', title: 'Deal', desc: 'Fair negotiation between buyer and seller. Transparent pricing always.' },
    { icon: Key, step: '04', title: 'Own It', desc: 'Registration, handover & after-sale support. Your dream, fulfilled.' },
  ]

  const testimonials = [
    { name: 'Ramesh & Lakshmi', role: 'Bought Agricultural Land, Vijayawada', text: 'Sri Anjaneya Realtor helped us find 2 acres of fertile land at a fair price. Clear documents, honest guidance — we felt safe every step.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=90' },
    { name: 'Sneha Reddy', role: 'Sold Villa, Hyderabad', text: 'Listed my property and got genuine buyers within weeks. The team tracked every inquiry and closed the deal smoothly.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=90' },
    { name: 'Venkatesh Rao', role: 'Investor, Warangal', text: 'Best realtor for vacant plots in developing areas. Affordable prices and lifetime trust — exactly as they promise.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=90' },
  ]

  const whatsappLink = getWhatsAppLink(settings.whatsappNumber, `Hi ${settings.companyName}! I want to know about your properties.`)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackground
            imageSrc={settings.heroImage}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full min-w-0">
          <div className="hero-content-panel max-w-3xl mb-10 min-w-0">
            {settings.heroBadge && (
              <p className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/30 text-white text-xs font-semibold tracking-widest uppercase rounded-full mb-6 animate-scale-in">
                <Sparkles className="w-3.5 h-3.5" /> {settings.heroBadge}
              </p>
            )}
            {settings.companyNameTelugu && (
              <p className="text-[#e8f4ef] text-base font-medium mb-3 animate-fade-up">{settings.companyNameTelugu}</p>
            )}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 animate-fade-up break-words hero-text-shadow">
              {settings.heroTitle.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="hero-accent">{settings.heroTitle.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/95 leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {settings.heroSubtitle}
            </p>
            {settings.heroSubtitleTelugu && (
              <p className="text-base sm:text-lg text-[#e8f4ef]/90 leading-relaxed max-w-2xl mt-3 animate-fade-up" style={{ animationDelay: '0.25s' }}>
                {settings.heroSubtitleTelugu}
              </p>
            )}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-8 stagger-fade">
              {settings.highlights.slice(0, 3).map((h) => (
                <span
                  key={h}
                  className="inline-flex items-start gap-1.5 px-3 py-2 bg-white/10 border border-white/20 text-white text-xs sm:text-sm rounded-2xl leading-relaxed whitespace-normal max-w-full"
                >
                  <span className="shrink-0 mt-0.5">✦</span>
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 animate-fade-up">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 max-w-full text-center">
              <Phone className="w-4 h-4 shrink-0" /> Call / WhatsApp: {settings.phone}
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-[#1a5f72]/90 hover:bg-[#1a5f72] border border-white/20 text-white text-sm sm:text-base font-semibold rounded-xl transition-all hover:scale-105 shadow-lg">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <StatsBar />
      <CompanyAboutSection />

      {/* Starting prices banner */}
      <section className="py-12 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8f3ee]/50 via-[#eef0f6]/40 to-[#f3ebf0]/45 animate-gradient" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <AnimateOnScroll>
            <p className="text-center text-dark-label text-sm font-semibold tracking-widest uppercase mb-6">Affordable Properties — Starting From</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {settings.startingPrices.map((p) => (
                <div key={p.category} className="text-center p-4 sm:p-5 rounded-2xl glass card-hover min-w-0 overflow-visible">
                  <p className="text-xs text-dark-muted mb-1 leading-snug">{p.category}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-dark-accent price-value">{p.price}</p>
                  <p className="text-[11px] sm:text-xs text-dark-label mt-1 leading-snug">{p.unit}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#6b5b7a]/12 rounded-full blur-3xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-dark-label text-sm font-semibold tracking-widest uppercase mb-2">Simple & Transparent</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-dark-body">
                Your Path to <span className="text-dark-accent">Owning Property</span>
              </h2>
              <p className="text-dark-muted mt-3 max-w-xl mx-auto">From first inquiry to final registration — we walk with you at every step.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <AnimateOnScroll key={step.title} delay={i * 120} direction="up">
                <div className="relative p-6 rounded-2xl glass group hover:bg-white/10 transition-all duration-500 card-hover shine-hover h-full">
                  <span className="text-5xl font-display font-bold text-emerald-500/20 absolute top-4 right-4">{step.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-green-200" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-dark-body mb-2">{step.title}</h3>
                  <p className="text-sm text-dark-muted leading-relaxed">{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24 bg-section-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-light-label text-sm font-semibold tracking-widest uppercase mb-2">Why Sri Anjaneya Realtor</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-slate-900">
                Safe Investment. <span className="text-[#128C7E]">Lifetime Trust.</span>
              </h2>
              <p className="text-light-muted mt-3 max-w-2xl mx-auto">{settings.tagline} — serving families across Andhra Pradesh & Telangana.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 100}>
                <div className="text-center p-8 rounded-2xl border border-slate-100 card-hover group shine-hover h-full bg-gradient-to-b from-white to-slate-50/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-gold-500/10 group-hover:from-emerald-500/30 group-hover:to-gold-500/20 transition-all mb-5 group-hover:scale-110 group-hover:-rotate-3 duration-300">
                    <s.icon className="w-7 h-7 text-[#128C7E]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-light-body text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="py-16 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 animate-gradient bg-gradient-to-r from-[#075E54] via-[#2a7088] to-[#5a5588]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {settings.highlights.map((h, i) => (
              <AnimateOnScroll key={h} delay={i * 80}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#075E54]/50 border border-white/20 backdrop-blur-sm">
                  <span className="text-dark-accent text-lg shrink-0">✦</span>
                  <p className="text-sm text-dark-body leading-relaxed">{h}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-light-label text-sm font-semibold tracking-widest uppercase mb-2">Happy Clients</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-slate-900">Stories of Trust & Success</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 120} direction="up">
                <div className="p-8 rounded-2xl bg-section-light border border-emerald-100/80 card-hover relative shine-hover h-full">
                  <div className="text-6xl text-emerald-500/20 font-display absolute top-4 right-6">"</div>
                  <p className="text-light-body text-sm leading-relaxed mb-6 relative">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <SafeImage
                      src={t.image}
                      alt=""
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-[#25D366]/40"
                      fallback={
                        <div className="w-11 h-11 rounded-full bg-[#ecfdf5] flex items-center justify-center ring-2 ring-[#25D366]/40 text-sm font-bold text-[#128C7E]">
                          {t.name[0]}
                        </div>
                      }
                    />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-xs text-[#128C7E]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackground imageSrc={settings.heroImage} />
        </div>
        <AnimateOnScroll>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="hero-content-panel-center">
              {settings.contactHeadingTelugu && (
                <p className="text-[#e8f4ef] text-base font-medium mb-2">{settings.contactHeadingTelugu}</p>
              )}
              <p className="text-[#e8f4ef] text-sm font-semibold tracking-widest uppercase mb-4">Don't Delay — Contact Us Today</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4 hero-text-shadow">
                {settings.ctaTitle || 'Achieve Your Dreams With Us'}
              </h2>
              <p className="text-white/95 mb-10 leading-relaxed text-lg">
                {settings.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-lg sm:max-w-none mx-auto">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-10 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg shine-hover text-sm sm:text-base text-center">
                  WhatsApp: {settings.phone}
                </a>
                <Link to="/sellers" className="px-6 sm:px-10 py-4 bg-white text-[#075E54] font-semibold rounded-xl transition-all hover:scale-105 shine-hover text-sm sm:text-base text-center">
                  List Your Property
                </Link>
                <a href={`mailto:${settings.email}`} className="px-6 sm:px-10 py-4 border border-white/40 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all hover:scale-105 text-sm sm:text-base text-center">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  )
}