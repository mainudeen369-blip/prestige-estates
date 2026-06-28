import { Link } from 'react-router-dom'
import { Tag, Phone, MessageCircle, Check, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { getWhatsAppLink } from '../utils/helpers'

const sellPoints = [
  'Wide network of genuine buyers across AP & Telangana',
  'Fair valuation and transparent negotiation',
  'Complete documentation and registration support',
  'Dedicated follow-up until the deal closes',
]

export default function SellersPage() {
  const { settings } = useApp()

  const whatsappLink = getWhatsAppLink(
    settings.whatsappNumber,
    `Hi ${settings.companyName}! I want to list my property for sale.`
  )

  return (
    <div className="bg-page-soft min-h-screen overflow-x-clip w-full">
      <div className="bg-brand-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/25 text-dark-label rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" /> For Sellers
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-dark-body mb-4">Sell With Confidence</h1>
          <p className="text-dark-muted max-w-2xl mx-auto mb-6">
            Have land, a home, or commercial property to sell? Reach out — we connect you with serious buyers and handle the process with care.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5" /> List Your Property
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll direction="left">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">Why Sell Through Us?</h2>
            <ul className="space-y-4">
              {sellPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ecfdf5] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#128C7E]" />
                  </div>
                  <span className="text-light-body">{point}</span>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <div className="bg-white rounded-2xl border border-slate-100 p-8">
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-4">Get Started Today</h3>
              <p className="text-light-muted text-sm mb-6">
                Call or WhatsApp us with your property details — location, type, and expected price. We will take it from there.
              </p>
              <div className="space-y-3">
                <a href={`tel:${settings.phone}`} className="flex items-center gap-3 p-4 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] transition-colors">
                  <Phone className="w-5 h-5 text-[#128C7E]" />
                  <span className="font-semibold text-slate-900">{settings.phone}</span>
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">WhatsApp Us</span>
                </a>
                <Link to="/contact" className="flex items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#128C7E] text-[#128C7E] font-medium transition-colors">
                  Send a Message <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}
