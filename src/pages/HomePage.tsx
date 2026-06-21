import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Headphones, BadgeCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import HeroSearch from '../components/HeroSearch'
import PropertyCard from '../components/PropertyCard'
import StatsBar from '../components/StatsBar'
import { filterProperties } from '../utils/helpers'

export default function HomePage() {
  const { properties, settings } = useApp()
  const featured = filterProperties(properties, { featuredOnly: true, activeOnly: true }).slice(0, 3)
  const recent = filterProperties(properties, { activeOnly: true }).slice(0, 6)

  const services = [
    { icon: Shield, title: 'Verified Listings', desc: 'Every property is verified for legal clarity and authenticity.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Our team is available round the clock via WhatsApp and phone.' },
    { icon: BadgeCheck, title: 'Expert Guidance', desc: 'Dedicated agents with deep local market knowledge.' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={settings.heroImage}
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl mb-10 animate-fade-up">
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
              {settings.tagline}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {settings.heroTitle}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {settings.heroSubtitle}
            </p>
          </div>
          <HeroSearch />
        </div>
      </section>

      <StatsBar />

      {/* Featured */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Handpicked</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900">Featured Properties</h2>
            </div>
            <Link to="/listings" className="hidden sm:flex items-center gap-2 text-gold-600 font-medium hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured[0] && <PropertyCard property={featured[0]} variant="featured" />}
            <div className="grid gap-8">
              {featured.slice(1).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Why Choose Us</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900">The Prestige Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="text-center p-8 rounded-2xl border border-slate-100 hover:border-gold-500/30 hover:shadow-lg transition-all group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 group-hover:bg-gold-500/20 transition-colors mb-5">
                  <s.icon className="w-7 h-7 text-gold-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Latest</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900">Recent Listings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recent.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-colors"
            >
              Explore All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/85" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Sell Your Property?
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            List with us and reach thousands of qualified buyers. Our expert team handles everything from valuation to closing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sell" className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-colors">
              List Your Property
            </Link>
            <Link to="/contact" className="px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
