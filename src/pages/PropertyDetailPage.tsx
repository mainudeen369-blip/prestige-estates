import { useParams, Link } from 'react-router-dom'
import {
  Bed, Bath, Maximize, MapPin, Calendar, Car, Compass, Layers,
  MessageCircle, Phone, ArrowLeft, Check, User,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import ImageGallery from '../components/ImageGallery'
import { formatPrice, formatArea, getLocationString, getWhatsAppLink, getPropertyWhatsAppMessage } from '../utils/helpers'

export default function PropertyDetailPage() {
  const { slug } = useParams()
  const { properties, settings } = useApp()
  const property = properties.find((p) => p.slug === slug)

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-2xl text-navy-900 mb-4">Property Not Found</h1>
        <Link to="/listings" className="text-gold-600 hover:text-gold-700 font-medium">
          ← Back to listings
        </Link>
      </div>
    )
  }

  const whatsappLink = getWhatsAppLink(settings.whatsappNumber, getPropertyWhatsAppMessage(property))
  const related = properties
    .filter((p) => p.id !== property.id && p.city === property.city && p.status === 'Active')
    .slice(0, 3)

  const details = [
    { icon: Layers, label: 'Type', value: property.propertyType },
    { icon: Compass, label: 'Facing', value: property.facing },
    { icon: Calendar, label: 'Year Built', value: property.yearBuilt?.toString() || 'N/A' },
    { icon: Car, label: 'Parking', value: property.parking > 0 ? `${property.parking} spaces` : 'N/A' },
    { icon: Maximize, label: 'Furnishing', value: property.furnishing },
    ...(property.floors ? [{ icon: Layers, label: 'Floor', value: `${property.floors}${property.floors > 1 ? ' floors' : ''}` }] : []),
    ...(property.plotArea ? [{ icon: Maximize, label: 'Plot Area', value: formatArea(property.plotArea, 'sqft') }] : []),
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gold-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </Link>

        <ImageGallery images={property.images} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold rounded-full">
                {property.listingType}
              </span>
              <span className="px-3 py-1 bg-navy-900 text-white text-xs font-medium rounded-full">
                {property.propertyType}
              </span>
              {property.featured && (
                <span className="px-3 py-1 bg-gold-500/20 text-gold-700 text-xs font-semibold rounded-full border border-gold-500/30">
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">
              {property.title}
            </h1>
            <p className="flex items-center gap-2 text-slate-500 mb-6">
              <MapPin className="w-4 h-4 text-gold-500" />
              {getLocationString(property)}
            </p>

            {property.bedrooms > 0 && (
              <div className="flex flex-wrap gap-6 mb-8 p-5 bg-white rounded-2xl border border-slate-100">
                <span className="flex items-center gap-2 text-navy-900">
                  <Bed className="w-5 h-5 text-gold-500" />
                  <span className="font-semibold">{property.bedrooms}</span> Bedrooms
                </span>
                <span className="flex items-center gap-2 text-navy-900">
                  <Bath className="w-5 h-5 text-gold-500" />
                  <span className="font-semibold">{property.bathrooms}</span> Bathrooms
                </span>
                <span className="flex items-center gap-2 text-navy-900">
                  <Maximize className="w-5 h-5 text-gold-500" />
                  <span className="font-semibold">{formatArea(property.area, property.areaUnit)}</span>
                </span>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8">
              <h2 className="font-display text-xl font-semibold text-navy-900 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8">
              <h2 className="font-display text-xl font-semibold text-navy-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {details.map((d) => (
                  <div key={d.label} className="p-4 bg-slate-50 rounded-xl">
                    <d.icon className="w-4 h-4 text-gold-500 mb-2" />
                    <p className="text-xs text-slate-500">{d.label}</p>
                    <p className="font-medium text-navy-900 text-sm">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="font-display text-xl font-semibold text-navy-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-gold-500 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Price</p>
                <p className="font-display text-3xl font-bold text-navy-900 mb-6">
                  {formatPrice(property.price, property.currency, property.priceLabel)}
                </p>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors mb-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire on WhatsApp
                </a>
                <a
                  href={`tel:${property.agentPhone}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-slate-200 hover:bg-slate-50 text-navy-900 font-semibold rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Agent
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{property.agentName}</p>
                    <p className="text-sm text-slate-500">Property Agent</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{property.agentPhone}</p>
              </div>

              <div className="bg-navy-950 rounded-2xl p-6 text-white">
                <h3 className="font-display text-lg font-semibold mb-2">Location</h3>
                <p className="text-sm text-slate-300 mb-4">{getLocationString(property)}</p>
                <div className="aspect-video rounded-xl overflow-hidden bg-navy-800">
                  <iframe
                    title="Property location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(getLocationString(property))}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">Similar Properties in {property.city}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/property/${p.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="font-semibold text-navy-900 line-clamp-1">{p.title}</p>
                    <p className="text-gold-600 font-medium text-sm mt-1">
                      {formatPrice(p.price, p.currency, p.priceLabel)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
