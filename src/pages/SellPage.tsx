import { Link } from 'react-router-dom'
import { Upload, TrendingUp, Users, FileCheck, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import HeroBackground from '../components/HeroBackground'
import { getWhatsAppLink } from '../utils/helpers'

export default function SellPage() {
  const { settings } = useApp()

  const steps = [
    { icon: Upload, title: 'Submit Details', desc: 'Share your property details, photos, and documents with our team.' },
    { icon: FileCheck, title: 'Verification', desc: 'We verify legal documents and conduct a professional property valuation.' },
    { icon: TrendingUp, title: 'Marketing', desc: 'Your property is listed on our platform with professional photography and promotion.' },
    { icon: Users, title: 'Close the Deal', desc: 'We connect you with qualified buyers and handle negotiations to closing.' },
  ]

  const whatsappLink = getWhatsAppLink(
    settings.whatsappNumber,
    `Hi ${settings.companyName}! I want to list my property for sale/rent. Please guide me through the process.`
  )

  return (
    <div className="bg-page-soft min-h-screen">
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <HeroBackground imageSrc={settings.heroImage} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-2xl">
            <div className="hero-content-panel-center">
              <p className="text-[#dcf8e8] text-sm font-semibold tracking-widest uppercase mb-3">For Sellers</p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4 hero-text-shadow">Sell or Rent Your Property</h1>
              <p className="text-white/95 text-lg">
                Reach thousands of verified buyers and tenants. We make selling effortless.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <p className="text-light-label text-sm font-semibold tracking-widest uppercase mb-2">How It Works</p>
          <h2 className="font-display text-3xl font-bold text-navy-900">Simple 4-Step Process</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#ecfdf5] border border-[#25D366]/20 mb-5">
                <step.icon className="w-7 h-7 text-[#128C7E]" />
              </div>
              <span className="absolute top-0 right-1/2 translate-x-8 -translate-y-2 w-7 h-7 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{step.title}</h3>
              <p className="text-light-body text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">Why List With Us?</h2>
            <ul className="space-y-4">
              {[
                'Professional HD photography and virtual tours',
                'Listed on our premium platform with SEO optimization',
                'Dedicated agent assigned to your property',
                'Legal document verification and support',
                'WhatsApp Business integration for instant buyer inquiries',
                'Wide network of qualified buyers and investors',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-light-body">
                  <span className="w-6 h-6 rounded-full bg-[#ecfdf5] text-[#128C7E] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">Ready to Get Started?</h3>
            <p className="text-slate-600 text-sm mb-6">
              Contact us via WhatsApp or visit our admin panel to add your property listing directly.
            </p>
            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors"
              >
                Start on WhatsApp
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 border border-slate-200 hover:bg-slate-50 text-navy-900 font-semibold rounded-xl transition-colors"
              >
                Contact Our Team
              </Link>
              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-colors"
              >
                Admin: Add Property <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
