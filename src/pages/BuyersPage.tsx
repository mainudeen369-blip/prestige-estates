import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Search, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import PropertyCard from '../components/PropertyCard'
import PropertyFiltersBar from '../components/PropertyFilters'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { filterProperties } from '../utils/helpers'
import type { PropertyFilters } from '../types'

export default function BuyersPage() {
  const { properties, settings } = useApp()
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '', propertyType: '', listingType: 'For Sale', city: '',
    minPrice: '', maxPrice: '', bedrooms: '', status: '',
  })

  const buyerProperties = useMemo(
    () => filterProperties(properties, { ...filters, activeOnly: true }),
    [properties, filters]
  )

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-clip w-full">
      <div className="bg-navy-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
            <ShoppingBag className="w-4 h-4" /> For Buyers
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Properties for Buyers</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Browse vacant plots, agricultural land, houses, villas, and commercial properties across {settings.serviceAreas.join(' & ')}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <PropertyFiltersBar filters={filters} onChange={setFilters} resultCount={buyerProperties.length} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {buyerProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No properties match your search.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-4 text-gold-600 font-medium">
              Tell us your requirements <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {buyerProperties.map((p, i) => (
              <AnimateOnScroll key={p.id} delay={i * 60} direction="scale">
                <PropertyCard property={p} />
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
