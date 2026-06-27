import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyFiltersBar from '../components/PropertyFilters'
import { useApp } from '../context/AppContext'
import { filterProperties } from '../utils/helpers'
import type { PropertyFilters } from '../types'

export default function ListingsPage() {
  const { properties } = useApp()
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState<PropertyFilters>({
    search: searchParams.get('search') || '',
    propertyType: (searchParams.get('propertyType') as PropertyFilters['propertyType']) || '',
    listingType: (searchParams.get('listingType') as PropertyFilters['listingType']) || (searchParams.get('type') as PropertyFilters['listingType']) || '',
    city: searchParams.get('city') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    status: '',
  })

  const filtered = useMemo(
    () => filterProperties(properties, { ...filters, activeOnly: true }),
    [properties, filters]
  )

  return (
    <div className="bg-page-soft min-h-screen overflow-x-clip w-full">
      <div className="bg-brand-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">Explore</p>
          <h1 className="font-display text-4xl font-bold text-white">Our Properties</h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Browse our curated collection of premium residential, commercial, and land properties across India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <PropertyFiltersBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No properties match your criteria.</p>
            <button
              onClick={() => setFilters({ search: '', propertyType: '', listingType: '', city: '', minPrice: '', maxPrice: '', bedrooms: '', status: '' })}
              className="mt-4 text-gold-600 font-medium hover:text-gold-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
