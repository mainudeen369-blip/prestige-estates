import type { Property } from '../types'

export function formatPrice(price: number, currency = 'INR', label?: string): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })
  const formatted = formatter.format(price)
  return label ? `${formatted} ${label}` : formatted
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export function getWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export function getPropertyWhatsAppMessage(property: Property): string {
  return `Hi! I'm interested in "${property.title}" in ${property.city}. Could you share more details?`
}

export function getLocationString(property: Property): string {
  return `${property.address}, ${property.city}, ${property.state}`
}

export function formatArea(area: number, unit: string): string {
  return `${area.toLocaleString('en-IN')} ${unit}`
}

export function filterProperties(
  properties: Property[],
  filters: {
    search?: string
    propertyType?: string
    listingType?: string
    city?: string
    minPrice?: string
    maxPrice?: string
    bedrooms?: string
    status?: string
    featuredOnly?: boolean
    activeOnly?: boolean
  }
): Property[] {
  return properties.filter((p) => {
    if (filters.activeOnly && p.status !== 'Active') return false
    if (filters.featuredOnly && !p.featured) return false
    if (filters.propertyType && p.propertyType !== filters.propertyType) return false
    if (filters.listingType && p.listingType !== filters.listingType) return false
    if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false
    if (filters.status && p.status !== filters.status) return false
    if (filters.bedrooms) {
      const min = parseInt(filters.bedrooms, 10)
      if (!isNaN(min) && p.bedrooms < min) return false
    }
    if (filters.minPrice) {
      const min = parseInt(filters.minPrice, 10)
      if (!isNaN(min) && p.price < min) return false
    }
    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice, 10)
      if (!isNaN(max) && p.price > max) return false
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const haystack = `${p.title} ${p.description} ${p.city} ${p.address} ${p.propertyType}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function getUniqueCities(properties: Property[]): string[] {
  return [...new Set(properties.map((p) => p.city))].sort()
}
