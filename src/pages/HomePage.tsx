import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Headphones, BadgeCheck, Search, FileCheck, Handshake, Key } from 'lucide-react'
import { useApp } from '../context/AppContext'
import HeroSearch from '../components/HeroSearch'
import PropertyCard from '../components/PropertyCard'
import StatsBar from '../components/StatsBar'
import PropertyMarquee from '../components/PropertyMarquee'
import AnimateOnScroll from '../components/AnimateOnScroll'
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

  const process = [
    { icon: Search, step: '01', title: 'Discover', desc: 'Browse curated properties or tell us your requirements.' },
    { icon: FileCheck, step: '02', title: 'Verify', desc: 'We verify legal documents and arrange site visits.' },
    { icon: Handshake, step: '03', title: 'Negotiate', desc: 'Expert agents handle negotiations for the best deal.' },
    { icon: Key, step: '04', title: 'Own It', desc: 'Seamless registration and handover. Welcome home.' },
  ]

  const testimonials = [
    { name: 'Amit & Priya Verma', role: 'Bought Penthouse, Mumbai', text: 'Prestige Estates made our dream home a reality. The team was transparent, professional, and always available on WhatsApp.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=90' },
    { name: 'Sneha Reddy', role: 'Sold Villa, Bangalore', text: 'Listed my property and got 3 serious buyers within 2 weeks. The admin team tracked every deal meticulously.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=90' },
    { name: 'Karan Malhotra', role: 'Investor, Gurgaon', text: 'Best real estate experience in India. Their buyer-seller matching is incredibly efficient.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=90' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={settings.heroImage} alt="Luxury property" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/30" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float hidden lg:block" />
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-float-delay hidden lg:block" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="max-w-2xl mb-10 animate-fade-up">
            <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-400" />
              {settings.tagline}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Find Your <span className="text-gradient-gold">Dream</span> Property
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">{settings.heroSubtitle}</p>
          </div>
          <AnimateOnScroll direction="up" delay={300}>
            <HeroSearch />
          </AnimateOnScroll>
        </div>
      </section>

      <PropertyMarquee />
      <StatsBar />

      {/* Featured */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Handpicked</p>
                <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">Featured Properties</h2>
              </div>
              <Link to="/listings" className="hidden sm:flex items-center gap-2 text-gold-600 font-medium hover:gap-3 transition-all group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
      <section className="py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">How It Works</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-white">Your Journey to <span className="text-gradient-gold">Home</span></h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <AnimateOnScroll key={step.title} delay={i * 120} direction="up">
                <div className="relative p-6 rounded-2xl glass group hover:bg-white/10 transition-all duration-500">
                  <span className="text-5xl font-display font-bold text-gold-500/20 absolute top-4 right-4">{step.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Why Choose Us</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">The Prestige Difference</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 100}>
                <div className="text-center p-8 rounded-2xl border border-slate-100 card-hover group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-500/5 group-hover:from-gold-500/30 group-hover:to-gold-500/10 transition-all mb-5 animate-pulse-glow">
                    <s.icon className="w-7 h-7 text-gold-600" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Latest</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">Recent Listings</h2>
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
              <Link to="/listings" className="inline-flex items-center gap-2 px-10 py-4 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-navy-900/20 group">
                Explore All Properties <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Testimonials</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy-900">What Our Clients Say</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 120} direction="up">
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 card-hover relative">
                  <div className="text-6xl text-gold-500/20 font-display absolute top-4 right-6">"</div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 relative">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-gold-500/30" />
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gold-600">{t.role}</p>
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
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90" alt="" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-navy-950/88" />
        <AnimateOnScroll>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
              Ready to Sell Your Property?
            </h2>
            <p className="text-slate-300 mb-10 leading-relaxed text-lg">
              List with us and reach thousands of qualified buyers. Our expert team handles everything from valuation to closing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sell" className="px-10 py-4 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-gold-500/30 hover:scale-105">
                List Your Property
              </Link>
              <Link to="/contact" className="px-10 py-4 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-all hover:scale-105">
                Contact Us
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  )
}
