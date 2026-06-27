export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'House',
  'Penthouse',
  'Building',
  'Commercial',
  'Land',
  'Farmhouse',
  'Studio',
] as const

export type PropertyType = (typeof PROPERTY_TYPES)[number]

export const LISTING_TYPES = ['For Sale', 'For Rent'] as const
export type ListingType = (typeof LISTING_TYPES)[number]

export const PROPERTY_STATUS = ['Active', 'Sold', 'Rented', 'Draft'] as const
export type PropertyStatus = (typeof PROPERTY_STATUS)[number]

export const FURNISHING_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished', 'N/A'] as const
export type Furnishing = (typeof FURNISHING_OPTIONS)[number]

export const FACING_OPTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West', 'N/A'] as const
export type Facing = (typeof FACING_OPTIONS)[number]

export const AREA_UNITS = ['sqft', 'sqm', 'acres', 'hectares'] as const
export type AreaUnit = (typeof AREA_UNITS)[number]

export interface Property {
  id: string
  title: string
  slug: string
  description: string
  propertyType: PropertyType
  listingType: ListingType
  status: PropertyStatus
  price: number
  currency: string
  priceLabel?: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  latitude?: number
  longitude?: number
  bedrooms: number
  bathrooms: number
  area: number
  areaUnit: AreaUnit
  plotArea?: number
  yearBuilt?: number
  floors?: number
  parking: number
  furnishing: Furnishing
  facing: Facing
  amenities: string[]
  images: string[]
  featured: boolean
  agentName: string
  agentPhone: string
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  phone?: string
  propertiesSold: number
}

export interface ServiceCategory {
  title: string
  items: string[]
}

export interface StartingPrice {
  category: string
  price: string
  unit: string
}

export interface SiteSettings {
  companyName: string
  companyNameTelugu?: string
  tagline: string
  taglineTelugu?: string
  phone: string
  email: string
  whatsappNumber: string
  address: string
  serviceAreas: string[]
  aboutTitle: string
  aboutContent: string
  mission: string
  vision: string
  yearsExperience: number
  propertiesSold: number
  happyClients: number
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  serviceCategories: ServiceCategory[]
  startingPrices: StartingPrice[]
  highlights: string[]
  facebook?: string
  instagram?: string
  linkedin?: string
  team: TeamMember[]
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
  createdAt: string
}

export interface PropertyFilters {
  search: string
  propertyType: PropertyType | ''
  listingType: ListingType | ''
  city: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  status: PropertyStatus | ''
}
