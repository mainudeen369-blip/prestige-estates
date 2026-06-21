import { Link } from 'react-router-dom'
import { Bed, Bath, Maximize, MapPin, ArrowUpRight } from 'lucide-react'
import type { Property } from '../types'
import { formatPrice, formatArea } from '../utils/helpers'

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'featured'
}

export default function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <Link
      to={`/property/${property.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 ${
        isFeatured ? 'lg:flex lg:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${isFeatured ? 'lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[320px]' : 'aspect-[4/3]'}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold rounded-full">
            {property.listingType}
          </span>
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-navy-900 text-xs font-medium rounded-full">
            {property.propertyType}
          </span>
        </div>
        {property.featured && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-navy-950/80 backdrop-blur text-gold-400 text-xs font-semibold rounded-full">
            Featured
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-display text-xl lg:text-2xl font-semibold drop-shadow-lg line-clamp-2">
            {formatPrice(property.price, property.currency, property.priceLabel)}
          </p>
        </div>
      </div>

      <div className={`p-5 lg:p-6 ${isFeatured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-center' : ''}`}>
        <h3 className="font-display text-lg font-semibold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-2 mb-2">
          {property.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
          <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
          {property.city}, {property.state}
        </p>

        {property.bedrooms > 0 && (
          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-gold-500" />
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-gold-500" />
              {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-gold-500" />
              {formatArea(property.area, property.areaUnit)}
            </span>
          </div>
        )}

        {property.bedrooms === 0 && (
          <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-4">
            <Maximize className="w-4 h-4 text-gold-500" />
            {formatArea(property.area, property.areaUnit)}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((a) => (
              <span key={a} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                {a}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-gold-600 group-hover:gap-2 transition-all">
            View <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
