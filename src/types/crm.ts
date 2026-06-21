import { PROPERTY_TYPES, type PropertyType } from './index'
export { PROPERTY_TYPES, type PropertyType }

export const BUYER_STATUS = ['Active', 'Negotiating', 'Closed', 'Inactive'] as const
export type BuyerStatus = (typeof BUYER_STATUS)[number]

export const SELLER_STATUS = ['Active', 'Listed', 'Under Offer', 'Sold', 'Inactive'] as const
export type SellerStatus = (typeof SELLER_STATUS)[number]

export const DEAL_STATUS = ['Inquiry', 'Site Visit', 'Negotiation', 'Agreement', 'Closed', 'Cancelled'] as const
export type DealStatus = (typeof DEAL_STATUS)[number]

export interface Buyer {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
  budget: number
  budgetMax?: number
  preferredCities: string[]
  preferredTypes: PropertyType[]
  bedrooms: number
  requirements: string
  status: BuyerStatus
  documents: string[]
  notes: string
  assignedAgent: string
  createdAt: string
  updatedAt: string
}

export interface Seller {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
  propertyTitle: string
  propertyAddress: string
  city: string
  propertyType: PropertyType
  listingType: 'For Sale' | 'For Rent'
  askingPrice: number
  area: number
  areaUnit: 'sqft' | 'sqm' | 'acres' | 'hectares'
  bedrooms: number
  bathrooms: number
  description: string
  images: string[]
  documents: string[]
  status: SellerStatus
  notes: string
  assignedAgent: string
  propertyId?: string
  createdAt: string
  updatedAt: string
}

export interface Deal {
  id: string
  buyerId: string
  sellerId?: string
  propertyId?: string
  title: string
  type: 'Sale' | 'Rent'
  dealValue: number
  commission: number
  status: DealStatus
  notes: string
  closedAt?: string
  createdAt: string
  updatedAt: string
}
