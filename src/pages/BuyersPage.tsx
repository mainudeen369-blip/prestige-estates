import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Phone, MessageCircle, Leaf, Building, Landmark, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { getWhatsAppLink } from '../utils/helpers'

const categoryIcons = [Leaf, Building, Landmark, Sparkles]

export default function BuyersPage() {
  const { settings } = useApp()
  const whatsappLink = getWhatsAppLink(
    settings.whatsappNumber,
    `Hi ${settings.companyName}! I am looking to buy property in ${settings.serviceAreas.join(' or ')}.`
  )

  return (
    <div className="bg-page-soft min-h-screen overflow-x-clip w-full">
      <div className="bg-brand-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/25 text-dark-label rounded-full text-sm font-medium mb-4">
            <ShoppingBag className="w-4 h-4" /> For Buyers
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-dark-body mb-4">Looking to Buy?</h1>
          <p className="text-dark-muted max-w-2xl mx-auto mb-8">
            Vacant plots, agricultural land, houses, villas, and commercial properties across {settings.serviceAreas.join(' & ')} — tell us what you need and we will find the right match.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors">
              Send Inquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">What We Help You Buy</h2>
            <p className="text-light-muted max-w-xl mx-auto">Every property type from our brochure — verified and guided end to end.</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {settings.serviceCategories.map((cat, i) => {
            const Icon = categoryIcons[i] || Sparkles
            return (
              <AnimateOnScroll key={cat.title} delay={i * 80}>
                <div className="p-6 rounded-2xl bg-white border border-slate-100 card-hover h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#128C7E]" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-3">{cat.title}</h3>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-light-muted flex items-start gap-2">
                        <span className="text-[#25D366] mt-0.5">✦</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>

        <AnimateOnScroll>
          <div className="bg-brand-dark rounded-3xl p-10 text-center text-white">
            <h2 className="font-display text-2xl font-bold text-dark-body mb-3">{settings.ctaTitle}</h2>
            <p className="text-dark-muted mb-6 max-w-lg mx-auto">{settings.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${settings.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#075E54] font-semibold rounded-xl">
                <Phone className="w-4 h-4" /> {settings.phone}
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#25D366] font-semibold rounded-xl">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
