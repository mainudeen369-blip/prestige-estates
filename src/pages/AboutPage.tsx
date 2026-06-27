import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Target, Eye, Quote, Check, Building2, Phone, Mail, Sparkles } from 'lucide-react'
import AnimateOnScroll from '../components/AnimateOnScroll'
import FloatingParticles from '../components/FloatingParticles'
import { getWhatsAppLink } from '../utils/helpers'

export default function AboutPage() {
  const { settings } = useApp()
  const whatsappLink = getWhatsAppLink(settings.whatsappNumber, `Hi ${settings.companyName}! I'd like to know more about your services.`)

  return (
    <div className="bg-page-soft min-h-screen overflow-x-clip w-full">
      {/* Hero */}
      <div className="relative min-h-[55vh] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=1920&q=90" alt="About" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-brand-overlay" />
        <FloatingParticles />
        <div className="relative max-w-4xl mx-auto px-4 text-center py-20">
          <img src="/logo.png" alt="Sri Anjaneya Realtor" className="h-32 w-auto mx-auto mb-6 rounded-2xl bg-white p-3 shadow-xl animate-bounce-subtle" />
          {settings.companyNameTelugu && (
            <p className="text-emerald-400 text-xl mb-2 animate-fade-up">{settings.companyNameTelugu}</p>
          )}
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">About Us</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-up">
            {settings.companyName}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up">{settings.tagline}</p>
          {settings.taglineTelugu && (
            <p className="text-slate-400 italic mt-3 animate-fade-up">{settings.taglineTelugu}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <AnimateOnScroll direction="left">
            <div>
              <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-4">{settings.aboutTitle}</h2>
              {settings.aboutIntro && (
                <p className="text-lg text-slate-700 leading-relaxed mb-4 font-medium border-l-4 border-emerald-500 pl-4">
                  {settings.aboutIntro}
                </p>
              )}
              <p className="text-slate-600 leading-relaxed mb-4">{settings.aboutContent}</p>
              {settings.aboutStory && (
                <p className="text-slate-500 leading-relaxed text-sm mb-6">{settings.aboutStory}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {settings.serviceAreas.map((a) => (
                  <span key={a} className="px-4 py-1.5 bg-navy-900 text-white text-sm rounded-full shine-hover">{a}</span>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { val: `${settings.yearsExperience}+`, label: 'Years Trust' },
                  { val: `${settings.propertiesSold}+`, label: 'Properties Sold' },
                  { val: `${settings.happyClients}+`, label: 'Happy Families' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 bg-white rounded-2xl border border-slate-100 card-hover shine-hover">
                    <p className="font-display text-xl sm:text-2xl font-bold text-gradient-gold price-value">{s.val}</p>
                    <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="relative overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=800&q=90" alt="Land" className="w-full rounded-2xl shadow-2xl" />
              <div className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-gradient-to-br from-gold-500 to-gold-600 text-navy-950 p-4 sm:p-6 rounded-2xl shadow-xl max-w-[calc(100%-2rem)] sm:max-w-[240px] shine-hover">
                <Quote className="w-6 h-6 mb-2 opacity-70" />
                <p className="text-sm font-semibold leading-relaxed">
                  "Safe investment with lifetime trust — achieve your dreams with Sri Anjaneya Realtor."
                </p>
              </div>
              <div className="absolute top-4 right-4 sm:-top-4 sm:-right-4 bg-emerald-500 text-white p-3 sm:p-4 rounded-2xl shadow-lg animate-bounce-subtle">
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
                <h2 className="font-display text-3xl font-bold text-navy-900">Our Promise to You</h2>
                <p className="text-slate-500 mt-2">Every property. Every client. Every time.</p>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {settings.trustPoints.map((tp, i) => (
                <AnimateOnScroll key={tp.title} delay={i * 100}>
                  <div className="p-6 rounded-2xl bg-white border border-slate-100 card-hover shine-hover h-full text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-navy-900 mb-2">{tp.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{tp.desc}</p>
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
              <h2 className="font-display text-3xl font-bold text-navy-900">What We Deal In</h2>
              <p className="text-slate-500 mt-2">From farmland to commercial complexes — everything under one roof.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.serviceCategories.map((cat, i) => (
              <AnimateOnScroll key={cat.title} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full card-hover shine-hover group">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-gold-600 font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-3">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-slate-600 flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{item}
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
              <p className="text-slate-400 text-center mb-6 sm:mb-8 text-sm">Quality properties that respect your budget</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {settings.startingPrices.map((p) => (
                  <div key={p.category} className="text-center p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors min-w-0">
                    <p className="text-xs sm:text-sm text-slate-400 mb-1 leading-snug">{p.category}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-shimmer price-value">{p.price}</p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">{p.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Highlights */}
        <div className="mb-24">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-8 text-center">Why Families Choose Us</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settings.highlights.map((h, i) => (
              <AnimateOnScroll key={h} delay={i * 60}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 card-hover shine-hover">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </span>
                  <p className="text-slate-600 leading-relaxed">{h}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <AnimateOnScroll direction="left">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 card-hover shine-hover h-full">
              <Target className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">{settings.mission}</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 card-hover shine-hover h-full">
              <Eye className="w-8 h-8 text-gold-600 mb-4" />
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">{settings.vision}</p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Contact CTA */}
        <AnimateOnScroll>
          <div className="bg-brand-dark rounded-3xl p-10 text-center text-white mb-24 relative overflow-hidden">
            <FloatingParticles />
            <div className="relative">
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">Ready to Find Your Property?</h2>
              <p className="text-slate-300 mb-6 max-w-lg mx-auto">Call us today — why wait? Your dream property is just one conversation away.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${settings.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-navy-900 font-semibold rounded-xl hover:scale-105 transition-transform shine-hover">
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

        {/* Team */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-2">Our Team</p>
              <h2 className="font-display text-3xl font-bold text-navy-900">Expert Agents</h2>
            </div>
            <Link to="/agents" className="text-emerald-600 font-medium hover:text-emerald-700">View all profiles →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {settings.team.map((member, i) => (
              <AnimateOnScroll key={member.id} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden group card-hover shine-hover">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-navy-950/85 backdrop-blur rounded-full text-white text-xs">
                      <Building2 className="w-3 h-3 text-gold-400" />
                      {member.propertiesSold} properties sold
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-navy-900">{member.name}</h3>
                    <p className="text-emerald-600 text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
