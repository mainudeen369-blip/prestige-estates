import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Target, Eye, Quote, Check, Building2 } from 'lucide-react'
import AnimateOnScroll from '../components/AnimateOnScroll'

export default function AboutPage() {
  const { settings } = useApp()

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative h-[50vh] min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=90" alt="About us" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy-950/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            {settings.companyNameTelugu && (
              <p className="text-gold-400 text-xl mb-2">{settings.companyNameTelugu}</p>
            )}
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">{settings.companyName}</h1>
            <p className="text-slate-300 mt-3 max-w-lg mx-auto">{settings.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <AnimateOnScroll direction="left">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">{settings.aboutTitle}</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">{settings.aboutContent}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {settings.serviceAreas.map((a) => (
                  <span key={a} className="px-3 py-1 bg-navy-900 text-white text-sm rounded-full">{a}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="font-display text-2xl font-bold text-gold-600">{settings.yearsExperience}+</p>
                  <p className="text-xs text-slate-500 mt-1">Years</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="font-display text-2xl font-bold text-gold-600">{settings.propertiesSold}+</p>
                  <p className="text-xs text-slate-500 mt-1">Sold</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="font-display text-2xl font-bold text-gold-600">{settings.happyClients}+</p>
                  <p className="text-xs text-slate-500 mt-1">Clients</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=800&q=90" alt="Land" className="rounded-2xl shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-gold-500 text-navy-950 p-6 rounded-2xl shadow-lg max-w-[220px]">
                <Quote className="w-6 h-6 mb-2 opacity-60" />
                <p className="text-sm font-medium">Safe investment with lifetime trust — achieve your dreams with us.</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Service categories from PDF */}
        <div className="mb-20">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.serviceCategories.map((cat, i) => (
              <AnimateOnScroll key={cat.title} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full card-hover">
                  <h3 className="font-semibold text-navy-900 mb-3">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-slate-600 flex items-start gap-2">
                        <Check className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Starting prices from PDF */}
        <div className="bg-navy-950 rounded-2xl p-8 mb-20 text-white">
          <h2 className="font-display text-2xl font-bold mb-6 text-center">Starting Prices</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.startingPrices.map((p) => (
              <div key={p.category} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-slate-400 mb-1">{p.category}</p>
                <p className="text-2xl font-bold text-gold-400">{p.price}</p>
                <p className="text-xs text-slate-500">{p.unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights from PDF */}
        <div className="mb-20">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {settings.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100">
                <Check className="w-5 h-5 text-gold-500 shrink-0" />
                <p className="text-sm text-slate-600">{h}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <Target className="w-6 h-6 text-gold-600 mb-4" />
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">{settings.mission}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <Eye className="w-6 h-6 text-gold-600 mb-4" />
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">{settings.vision}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Our Team</p>
              <h2 className="font-display text-3xl font-bold text-navy-900">Agent Profiles</h2>
            </div>
            <Link to="/agents" className="text-gold-600 font-medium hover:text-gold-700">View all profiles →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {settings.team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-navy-950/80 backdrop-blur rounded-full text-white text-xs">
                    <Building2 className="w-3 h-3 text-gold-400" />
                    {member.propertiesSold} sold
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-navy-900">{member.name}</h3>
                  <p className="text-gold-600 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-slate-500 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
