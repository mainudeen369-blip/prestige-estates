import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultSiteSettings, seedProperties } from '../data/seed'
import { seedBuyers, seedSellers, seedDeals } from '../data/crm-seed'
import { generateId, slugify } from '../utils/helpers'
import type { Inquiry, Property, SiteSettings } from '../types'
import type { Buyer, Seller, Deal } from '../types/crm'

const STORAGE_KEY = 'prestige-estates-data-v2'
const AUTH_KEY = 'prestige-estates-auth'

interface AppData {
  properties: Property[]
  settings: SiteSettings
  inquiries: Inquiry[]
  buyers: Buyer[]
  sellers: Seller[]
  deals: Deal[]
}

export interface DealStats {
  totalBuyers: number
  totalSellers: number
  activeBuyers: number
  activeSellers: number
  totalDeals: number
  closedDeals: number
  inProgressDeals: number
  totalDealValue: number
  totalCommission: number
  closedDealValue: number
}

interface AppContextType {
  properties: Property[]
  settings: SiteSettings
  inquiries: Inquiry[]
  buyers: Buyer[]
  sellers: Seller[]
  deals: Deal[]
  dealStats: DealStats
  isAdmin: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  addProperty: (property: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void
  addBuyer: (buyer: Omit<Buyer, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBuyer: (id: string, updates: Partial<Buyer>) => void
  deleteBuyer: (id: string) => void
  addSeller: (seller: Omit<Seller, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateSeller: (id: string, updates: Partial<Seller>) => void
  deleteSeller: (id: string) => void
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateDeal: (id: string, updates: Partial<Deal>) => void
  deleteDeal: (id: string) => void
  updateSettings: (updates: Partial<SiteSettings>) => void
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void
  resetToSeed: () => void
}

const AppContext = createContext<AppContextType | null>(null)

function defaultData(): AppData {
  return {
    properties: seedProperties,
    settings: defaultSiteSettings,
    inquiries: [],
    buyers: seedBuyers,
    sellers: seedSellers,
    deals: seedDeals,
  }
}

function loadData(): AppData {
  const defaults = defaultData()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const settings = { ...defaults.settings, ...parsed.settings }
      if (
        settings.heroImage?.includes('photo-1560518883-ce09059eeffa') ||
        settings.heroImage?.includes('photo-1500382017468-9049fed747aa')
      ) {
        settings.heroImage = defaults.settings.heroImage
      }
      return {
        ...defaults,
        ...parsed,
        settings,
      }
    }
    const legacy = localStorage.getItem('prestige-estates-data')
    if (legacy) {
      const parsed = JSON.parse(legacy)
      return { ...defaults, ...parsed, settings: { ...defaults.settings, ...parsed.settings } }
    }
  } catch {
    /* use defaults */
  }
  return defaults
}

function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function computeDealStats(buyers: Buyer[], sellers: Seller[], deals: Deal[]): DealStats {
  const closed = deals.filter((d) => d.status === 'Closed')
  const inProgress = deals.filter((d) => !['Closed', 'Cancelled'].includes(d.status))
  return {
    totalBuyers: buyers.length,
    totalSellers: sellers.length,
    activeBuyers: buyers.filter((b) => ['Active', 'Negotiating'].includes(b.status)).length,
    activeSellers: sellers.filter((s) => ['Active', 'Listed', 'Under Offer'].includes(s.status)).length,
    totalDeals: deals.length,
    closedDeals: closed.length,
    inProgressDeals: inProgress.length,
    totalDealValue: deals.reduce((s, d) => s + d.dealValue, 0),
    totalCommission: deals.reduce((s, d) => s + d.commission, 0),
    closedDealValue: closed.reduce((s, d) => s + d.dealValue, 0),
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData)
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true')

  useEffect(() => {
    saveData(data)
  }, [data])

  const dealStats = computeDealStats(data.buyers, data.sellers, data.deals)

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAdmin(false)
  }

  const addProperty = (property: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    setData((prev) => ({
      ...prev,
      properties: [{ ...property, id: generateId(), slug: slugify(property.title), createdAt: now, updatedAt: now }, ...prev.properties],
    }))
  }

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setData((prev) => ({
      ...prev,
      properties: prev.properties.map((p) =>
        p.id === id ? { ...p, ...updates, slug: updates.title ? slugify(updates.title) : p.slug, updatedAt: new Date().toISOString() } : p
      ),
    }))
  }

  const deleteProperty = (id: string) => {
    setData((prev) => ({ ...prev, properties: prev.properties.filter((p) => p.id !== id) }))
  }

  const addBuyer = (buyer: Omit<Buyer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    setData((prev) => ({ ...prev, buyers: [{ ...buyer, id: generateId(), createdAt: now, updatedAt: now }, ...prev.buyers] }))
  }
  const updateBuyer = (id: string, updates: Partial<Buyer>) => {
    setData((prev) => ({
      ...prev,
      buyers: prev.buyers.map((b) => (b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b)),
    }))
  }
  const deleteBuyer = (id: string) => {
    setData((prev) => ({ ...prev, buyers: prev.buyers.filter((b) => b.id !== id) }))
  }

  const addSeller = (seller: Omit<Seller, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    setData((prev) => ({ ...prev, sellers: [{ ...seller, id: generateId(), createdAt: now, updatedAt: now }, ...prev.sellers] }))
  }
  const updateSeller = (id: string, updates: Partial<Seller>) => {
    setData((prev) => ({
      ...prev,
      sellers: prev.sellers.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s)),
    }))
  }
  const deleteSeller = (id: string) => {
    setData((prev) => ({ ...prev, sellers: prev.sellers.filter((s) => s.id !== id) }))
  }

  const addDeal = (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    setData((prev) => ({ ...prev, deals: [{ ...deal, id: generateId(), createdAt: now, updatedAt: now }, ...prev.deals] }))
  }
  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setData((prev) => ({
      ...prev,
      deals: prev.deals.map((d) => (d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d)),
    }))
  }
  const deleteDeal = (id: string) => {
    setData((prev) => ({ ...prev, deals: prev.deals.filter((d) => d.id !== id) }))
  }

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...updates } }))
  }

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
    setData((prev) => ({
      ...prev,
      inquiries: [{ ...inquiry, id: generateId(), createdAt: new Date().toISOString() }, ...prev.inquiries],
    }))
  }

  const resetToSeed = () => setData(defaultData())

  return (
    <AppContext.Provider
      value={{
        properties: data.properties,
        settings: data.settings,
        inquiries: data.inquiries,
        buyers: data.buyers,
        sellers: data.sellers,
        deals: data.deals,
        dealStats,
        isAdmin,
        login,
        logout,
        addProperty,
        updateProperty,
        deleteProperty,
        addBuyer,
        updateBuyer,
        deleteBuyer,
        addSeller,
        updateSeller,
        deleteSeller,
        addDeal,
        updateDeal,
        deleteDeal,
        updateSettings,
        addInquiry,
        resetToSeed,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
