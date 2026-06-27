import { Link } from 'react-router-dom'
import { Tag, MapPin, Phone, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import SellersMap from '../components/SellersMap'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { formatPrice, getWhatsAppLink } from '../utils/helpers'

export default function SellersPage() {
  const { properties, sellers, settings } = useApp()

  const forSale = properties.filter((p) => p.status === 'Active' && p.listingType === 'For Sale')
  const activeSellers = sellers.filter((s) => ['Active', 'Listed', 'Under Offer'].includes(s.status))

  const whatsappLink = getWhatsAppLink(
    settings.whatsappNumber,
    `Hi ${settings.companyName}! I want to list my property for sale.`
  )

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-clip w-full">
      <div className="bg-navy-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" /> For Sellers
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Properties for Sale</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            Explore all listings from our registered sellers. View locations on the map and connect directly.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5" /> List Your Property
          </a>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimateOnScroll>
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">Seller Locations on Map</h2>
          <p className="text-slate-500 text-sm mb-6">Click a property to view its location on Google Maps</p>
          <SellersMap properties={forSale} sellers={activeSellers} />
        </AnimateOnScroll>
      </div>

      {/* Seller listings grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AnimateOnScroll>
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">All Selling Listings</h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forSale.map((p, i) => (
            <AnimateOnScroll key={p.id} delay={i * 80}>
              <Link to={`/property/${p.slug}`} className="flex bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover group">
                <div className="w-40 sm:w-48 shrink-0">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover min-h-[140px] group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">{p.propertyType}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-gold-100 text-gold-700 rounded-full font-medium">For Sale</span>
                  </div>
                  <h3 className="font-semibold text-navy-900 line-clamp-2 group-hover:text-gold-600 transition-colors">{p.title}</h3>
                  <p className="text-gold-600 font-bold mt-1">{formatPrice(p.price, p.currency)}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3" /> {p.city}, {p.state}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Agent: {p.agentName}</p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {activeSellers.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">Registered Seller Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSellers.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={s.images[0]} alt={s.propertyTitle} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      s.status === 'Listed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{s.status}</span>
                    <h3 className="font-semibold text-navy-900 mt-2 line-clamp-1">{s.propertyTitle}</h3>
                    <p className="text-sm text-slate-500">Seller: {s.name}</p>
                    <p className="text-gold-600 font-bold mt-1">{formatPrice(s.askingPrice)}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-2">
                      <MapPin className="w-3 h-3" /> {s.propertyAddress}, {s.city}
                    </p>
                    <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1 text-xs text-navy-900 font-medium mt-3">
                      <Phone className="w-3 h-3" /> {s.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
