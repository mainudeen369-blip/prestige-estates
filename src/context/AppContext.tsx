import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultSiteSettings, seedProperties } from '../data/seed'
import { generateId, slugify } from '../utils/helpers'
import type { Inquiry, Property, SiteSettings } from '../types'

const STORAGE_KEY = 'prestige-estates-data'
const AUTH_KEY = 'prestige-estates-auth'

interface AppData {
  properties: Property[]
  settings: SiteSettings
  inquiries: Inquiry[]
}

interface AppContextType {
  properties: Property[]
  settings: SiteSettings
  inquiries: Inquiry[]
  isAdmin: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  addProperty: (property: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void
  updateSettings: (updates: Partial<SiteSettings>) => void
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void
  resetToSeed: () => void
}

const AppContext = createContext<AppContextType | null>(null)

function loadData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    /* use defaults */
  }
  return { properties: seedProperties, settings: defaultSiteSettings, inquiries: [] }
}

function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData)
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true')

  useEffect(() => {
    saveData(data)
  }, [data])

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
    const newProperty: Property = {
      ...property,
      id: generateId(),
      slug: slugify(property.title),
      createdAt: now,
      updatedAt: now,
    }
    setData((prev) => ({ ...prev, properties: [newProperty, ...prev.properties] }))
  }

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setData((prev) => ({
      ...prev,
      properties: prev.properties.map((p) =>
        p.id === id
          ? { ...p, ...updates, slug: updates.title ? slugify(updates.title) : p.slug, updatedAt: new Date().toISOString() }
          : p
      ),
    }))
  }

  const deleteProperty = (id: string) => {
    setData((prev) => ({
      ...prev,
      properties: prev.properties.filter((p) => p.id !== id),
    }))
  }

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }))
  }

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
    setData((prev) => ({
      ...prev,
      inquiries: [{ ...inquiry, id: generateId(), createdAt: new Date().toISOString() }, ...prev.inquiries],
    }))
  }

  const resetToSeed = () => {
    setData({ properties: seedProperties, settings: defaultSiteSettings, inquiries: [] })
  }

  return (
    <AppContext.Provider
      value={{
        properties: data.properties,
        settings: data.settings,
        inquiries: data.inquiries,
        isAdmin,
        login,
        logout,
        addProperty,
        updateProperty,
        deleteProperty,
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
