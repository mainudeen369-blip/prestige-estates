import { useState } from 'react'
import { MapPin } from 'lucide-react'
import type { Property } from '../types'
import type { Seller } from '../types/crm'
import { formatPrice, getLocationString } from '../utils/helpers'

interface MapItem {
  id: string
  title: string
  location: string
  price: string
  lat: number
  lng: number
  image?: string
}

interface SellersMapProps {
  properties: Property[]
  sellers: Seller[]
}

function toMapItems(properties: Property[], sellers: Seller[]): MapItem[] {
  const items: MapItem[] = []

  properties.filter((p) => p.status === 'Active' && p.latitude && p.longitude).forEach((p) => {
    items.push({
      id: p.id,
      title: p.title,
      location: getLocationString(p),
      price: formatPrice(p.price, p.currency, p.priceLabel),
      lat: p.latitude!,
      lng: p.longitude!,
      image: p.images[0],
    })
  })

  const cityCoords: Record<string, [number, number]> = {
    Hyderabad: [17.385, 78.4867],
    Vijayawada: [16.5062, 80.648],
    Visakhapatnam: [17.6868, 83.2185],
    Warangal: [17.9689, 79.5941],
    Guntur: [16.3067, 80.4365],
    Mumbai: [19.076, 72.8777],
    Bangalore: [12.9716, 77.5946],
    Gurgaon: [28.4595, 77.0266],
    Goa: [15.2993, 74.124],
    Pune: [18.5204, 73.8567],
    Jaipur: [26.9124, 75.7873],
    'New Delhi': [28.6139, 77.209],
  }

  sellers.filter((s) => ['Active', 'Listed', 'Under Offer'].includes(s.status)).forEach((s) => {
    const coords = cityCoords[s.city] || [17.385, 78.4867]
    const offset = (parseInt(s.id.replace(/\D/g, '') || '0', 10) % 5) * 0.008
    items.push({
      id: `seller-${s.id}`,
      title: s.propertyTitle,
      location: `${s.propertyAddress}, ${s.city}`,
      price: formatPrice(s.askingPrice),
      lat: coords[0] + offset,
      lng: coords[1] + offset,
      image: s.images[0],
    })
  })

  return items
}

export default function SellersMap({ properties, sellers }: SellersMapProps) {
  const items = toMapItems(properties, sellers)
  const [active, setActive] = useState<MapItem | null>(items[0] || null)

  if (!items.length) {
    return (
      <div className="h-[400px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
        No seller locations to display
      </div>
    )
  }

  const mapSrc = active
    ? `https://maps.google.com/maps?q=${active.lat},${active.lng}&z=14&output=embed`
    : `https://maps.google.com/maps?q=${items.map((i) => `${i.lat},${i.lng}`).join('%7C')}&z=10&output=embed`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 h-[450px]">
        <iframe title="Seller property locations" src={mapSrc} className="w-full h-full border-0" loading="lazy" />
      </div>
      <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
        <p className="text-sm font-semibold text-navy-900 mb-2">{items.length} Properties on Map</p>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              active?.id === item.id ? 'border-gold-500 bg-gold-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex gap-3">
              {item.image && (
                <img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-medium text-navy-900 text-sm line-clamp-1">{item.title}</p>
                <p className="text-[#128C7E] font-semibold text-xs mt-0.5">{item.price}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="line-clamp-1">{item.location}</span>
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
