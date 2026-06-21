import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { PROPERTY_TYPES, LISTING_TYPES } from '../types'
import { getUniqueCities } from '../utils/helpers'
import { useApp } from '../context/AppContext'

export default function HeroSearch() {
  const navigate = useNavigate()
  const { properties } = useApp()
  const cities = getUniqueCities(properties)
  const [search, setSearch] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [listingType, setListingType] = useState('')
  const [city, setCity] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (propertyType) params.set('propertyType', propertyType)
    if (listingType) params.set('listingType', listingType)
    if (city) params.set('city', city)
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search location, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
          />
        </div>
        <select
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
        >
          <option value="">Buy or Rent</option>
          {LISTING_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
        >
          <option value="">Property Type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white appearance-none"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full sm:w-auto px-8 py-3 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-colors text-sm"
      >
        Search Properties
      </button>
    </form>
  )
}
