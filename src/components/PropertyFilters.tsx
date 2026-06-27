import { PROPERTY_TYPES, LISTING_TYPES, type PropertyFilters } from '../types'
import { getUniqueCities } from '../utils/helpers'
import { useApp } from '../context/AppContext'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'

interface PropertyFiltersBarProps {
  filters: PropertyFilters
  onChange: (filters: PropertyFilters) => void
  resultCount: number
}

export default function PropertyFiltersBar({ filters, onChange, resultCount }: PropertyFiltersBarProps) {
  const { properties } = useApp()
  const cities = getUniqueCities(properties)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const update = (key: keyof PropertyFilters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onChange({
      search: '',
      propertyType: '',
      listingType: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      status: '',
    })
  }

  const hasFilters = Object.values(filters).some((v) => v !== '')

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row flex-wrap gap-3">
        <div className="flex-1 min-w-0 w-full basis-full lg:basis-0 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>
        <select
          value={filters.listingType}
          onChange={(e) => update('listingType', e.target.value)}
          className="w-full lg:w-auto lg:flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="">All Listings</option>
          {LISTING_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={filters.propertyType}
          onChange={(e) => update('propertyType', e.target.value)}
          className="w-full lg:w-auto lg:flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="">All Types</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={filters.city}
          onChange={(e) => update('city', e.target.value)}
          className="w-full lg:w-auto lg:flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-center gap-2 w-full lg:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-sm hover:bg-slate-50 transition-colors shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Min Price (₹)</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => update('minPrice', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Max Price (₹)</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => update('maxPrice', e.target.value)}
              placeholder="Any"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Min Bedrooms</label>
            <select
              value={filters.bedrooms}
              onChange={(e) => update('bedrooms', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}+</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-navy-900">{resultCount}</span> properties found
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-[#128C7E] hover:text-[#075E54]"
          >
            <X className="w-4 h-4" /> Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
