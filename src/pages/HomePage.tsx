import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Headphones, BadgeCheck, Search, FileCheck, Handshake, Key, Sparkles, Phone } from 'lucide-react'
import { useApp } from '../context/AppContext'
import HeroSearch from '../components/HeroSearch'
import PropertyCard from '../components/PropertyCard'
import StatsBar from '../components/StatsBar'
import PropertyMarquee from '../components/PropertyMarquee'
import CompanyAboutSection from '../components/CompanyAboutSection'
import AnimateOnScroll from '../components/AnimateOnScroll'
import FloatingParticles from '../components/FloatingParticles'
import { filterProperties, getWhatsAppLink } from '../utils/helpers'

export default function HomePage() {
  const { properties, settings } = useApp()
  const featured = filterProperties(properties, { featuredOnly: true, activeOnly: true }).slice(0, 3)
  const recent = filterProperties(properties, { activeOnly: true }).slice(0, 6)

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
          <img src={settings.heroImage} alt="Property" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-brand-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-indigo-950/30" />
        </div>
        <FloatingParticles />
        <div className="absolute top-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float hidden lg:block" />
        <div className="absolute bottom-32 left-10 w-56 h-56 bg-gold-500/10 rounded-full blur-3xl animate-float-delay hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full min-w-0">
          <div className="max-w-3xl mb-10 min-w-0">
            {settings.heroBadge && (
              <p className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-widest uppercase rounded-full mb-6 animate-scale-in">
                <Sparkles className="w-3.5 h-3.5" /> {settings.heroBadge}
              </p>
            )}
            {settings.companyNameTelugu && (
              <p className="text-gold-400/90 text-base font-medium mb-3 animate-fade-up">{settings.companyNameTelugu}</p>
            )}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 animate-fade-up break-words">
              {settings.heroTitle.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="text-shimmer">{settings.heroTitle.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-8 stagger-fade">
              {settings.highlights.slice(0, 3).map((h) => (
                <span
                  key={h}
                  className="inline-flex items-start gap-1.5 px-3 py-2 bg-white/10 backdrop-blur border border-white/15 text-slate-200 text-xs sm:text-sm rounded-2xl leading-relaxed whitespace-normal max-w-full"
                >
                  <span className="shrink-0 mt-0.5">✦</span>
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>
          <AnimateOnScroll direction="up" delay={300}>
            <HeroSearch />
          </AnimateOnScroll>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 animate-fade-up">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 max-w-full text-center">
              <Phone className="w-4 h-4 shrink-0" /> Call / WhatsApp: {settings.phone}
            </a>
            <Link to="/buyers" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-white/30 hover:bg-white/10 text-white text-sm sm:text-base font-semibold rounded-xl transition-all hover:scale-105">
              Browse Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <PropertyMarquee />
      <StatsBar />
      <CompanyAboutSection />

      {/* Starting prices banner */}
      <section className="py-12 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-navy-950 to-gold-900/20 animate-gradient" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <AnimateOnScroll>
            <p className="text-center text-gold-400 text-sm font-semibold tracking-widest uppercase mb-6">Affordable Properties — Starting From</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {settings.startingPrices.map((p) => (
                <div key={p.category} className="text-center p-4 sm:p-5 rounded-2xl glass card-hover min-w-0 overflow-visible">
                  <p className="text-xs text-slate-400 mb-1 leading-snug">{p.category}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gradient-gold price-value">{p.price}</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">{p.unit}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 bg-section-light overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-2">Handpicked For You</p>
                <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">Featured Properties</h2>
                <p className="text-slate-500 mt-2 max-w-lg">Premium plots, homes & commercial spaces — verified and ready.</p>
              </div>
              <Link to="/listings" className="hidden sm:flex items-center gap-2 text-gold-600 font-medium hover:gap-3 transition-all group shine-hover px-4 py-2 rounded-lg">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
            {featured[0] && (
              <AnimateOnScroll direction="left">
                <PropertyCard property={featured[0]} variant="featured" />
              </AnimateOnScroll>
            )}
            <div className="grid gap-8">
              {featured.slice(1).map((p, i) => (
                <AnimateOnScroll key={p.id} delay={i * 150} direction="right">
                  <PropertyCard property={p} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <FloatingParticles />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/15 rounded-full blur-3xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-2">Simple & Transparent</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-white">
                Your Path to <span className="text-shimmer">Owning Property</span>
              </h2>
              <p className="text-slate-400 mt-3 max-w-xl mx-auto">From first inquiry to final registration — we walk with you at every step.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <AnimateOnScroll key={step.title} delay={i * 120} direction="up">
                <div className="relative p-6 rounded-2xl glass group hover:bg-white/10 transition-all duration-500 card-hover shine-hover h-full">
                  <span className="text-5xl font-display font-bold text-emerald-500/20 absolute top-4 right-4">{step.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
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
              <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-2">Why Sri Anjaneya Realtor</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">
                Safe Investment. <span className="text-gradient-gold">Lifetime Trust.</span>
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto">{settings.tagline} — serving families across Andhra Pradesh & Telangana.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 100}>
                <div className="text-center p-8 rounded-2xl border border-slate-100 card-hover group shine-hover h-full bg-gradient-to-b from-white to-slate-50/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-gold-500/10 group-hover:from-emerald-500/30 group-hover:to-gold-500/20 transition-all mb-5 group-hover:scale-110 group-hover:-rotate-3 duration-300">
                    <s.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="py-16 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 animate-gradient bg-gradient-to-r from-emerald-900 via-navy-900 to-emerald-900" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {settings.highlights.map((h, i) => (
              <AnimateOnScroll key={h} delay={i * 80}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 shine-hover">
                  <span className="text-gold-400 text-lg shrink-0">✦</span>
                  <p className="text-sm text-slate-200 leading-relaxed">{h}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-24 bg-section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Fresh Listings</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">Latest Properties</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recent.map((p, i) => (
              <AnimateOnScroll key={p.id} delay={i * 80} direction="scale">
                <PropertyCard property={p} />
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll>
            <div className="text-center mt-14">
              <Link to="/listings" className="inline-flex items-center gap-2 px-10 py-4 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:scale-105 group shine-hover">
                Explore All Properties <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-2">Happy Clients</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">Stories of Trust & Success</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 120} direction="up">
                <div className="p-8 rounded-2xl bg-section-light border border-emerald-100/80 card-hover relative shine-hover h-full">
                  <div className="text-6xl text-emerald-500/20 font-display absolute top-4 right-6">"</div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 relative">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/30" />
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                      <p className="text-xs text-emerald-600">{t.role}</p>
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
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=1920&q=90" alt="" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-brand-overlay" />
        <FloatingParticles />
        <AnimateOnScroll>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4">Don't Delay — Contact Us Today</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
              {settings.ctaTitle || 'Achieve Your Dreams With Us'}
            </h2>
            <p className="text-slate-300 mb-10 leading-relaxed text-lg">
              {settings.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-lg sm:max-w-none mx-auto">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-10 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg shine-hover text-sm sm:text-base text-center">
                WhatsApp: {settings.phone}
              </a>
              <Link to="/sellers" className="px-6 sm:px-10 py-4 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-all hover:scale-105 shine-hover text-sm sm:text-base text-center">
                List Your Property
              </Link>
              <Link to="/contact" className="px-6 sm:px-10 py-4 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-all hover:scale-105 text-sm sm:text-base text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  )
}
