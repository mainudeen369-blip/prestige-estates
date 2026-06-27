import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Save, ArrowLeft, Plus, X, Image as ImageIcon } from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  PROPERTY_TYPES, LISTING_TYPES, PROPERTY_STATUS, FURNISHING_OPTIONS,
  FACING_OPTIONS, AREA_UNITS, type Property,
} from '../types'

const AMENITY_SUGGESTIONS = [
  'Swimming Pool', 'Gym', 'Garden', 'Parking', 'Security', 'Power Backup',
  'Lift', 'Club House', 'Concierge', 'Smart Home', 'Balcony', 'Sea View',
  'Mountain View', 'Near Metro', 'EV Charging', 'CCTV', 'Fire Safety',
]

const emptyProperty: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  propertyType: 'Apartment',
  listingType: 'For Sale',
  status: 'Active',
  price: 0,
  currency: 'INR',
  address: '',
  city: '',
  state: '',
  country: 'India',
  zipCode: '',
  bedrooms: 2,
  bathrooms: 2,
  area: 1000,
  areaUnit: 'sqft',
  parking: 1,
  furnishing: 'Unfurnished',
  facing: 'North',
  amenities: [],
  images: [],
  featured: false,
  agentName: '',
  agentPhone: '',
}

export default function AdminPropertyFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties, addProperty, updateProperty, settings } = useApp()
  const isEdit = Boolean(id)

  const existing = isEdit ? properties.find((p) => p.id === id) : null

  const [form, setForm] = useState(emptyProperty)
  const [imageUrl, setImageUrl] = useState('')
  const [amenityInput, setAmenityInput] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (existing) {
      const { id: _id, slug: _slug, createdAt: _c, updatedAt: _u, ...rest } = existing
      setForm(rest)
    } else {
      setForm({ ...emptyProperty, agentName: settings.team[0]?.name || '', agentPhone: settings.phone })
    }
  }, [existing, settings])

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const addImage = () => {
    if (imageUrl.trim()) {
      update('images', [...form.images, imageUrl.trim()])
      setImageUrl('')
    }
  }

  const removeImage = (index: number) => {
    update('images', form.images.filter((_, i) => i !== index))
  }

  const addAmenity = (amenity: string) => {
    if (amenity && !form.amenities.includes(amenity)) {
      update('amenities', [...form.amenities, amenity])
    }
    setAmenityInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.city || form.images.length === 0) {
      alert('Please fill in title, city, and add at least one image.')
      return
    }
    if (isEdit && id) {
      updateProperty(id, form)
    } else {
      addProperty(form)
    }
    setSaved(true)
    setTimeout(() => navigate('/admin/properties'), 800)
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50'
  const labelClass = 'text-sm font-medium text-slate-700 mb-1 block'

  return (
    <div>
      <button
        onClick={() => navigate('/admin/properties')}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gold-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to properties
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">
          {isEdit ? 'Edit Property' : 'Add New Property'}
        </h2>
        {saved && <span className="text-sm text-green-600 font-medium">Saved!</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Property Title *</label>
              <input required value={form.title} onChange={(e) => update('title', e.target.value)} className={inputClass} placeholder="Luxury 3BHK Apartment in Bandra" />
            </div>
            <div>
              <label className={labelClass}>Property Type *</label>
              <select value={form.propertyType} onChange={(e) => update('propertyType', e.target.value as typeof form.propertyType)} className={inputClass}>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Listing Type *</label>
              <select value={form.listingType} onChange={(e) => update('listingType', e.target.value as typeof form.listingType)} className={inputClass}>
                {LISTING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => update('status', e.target.value as typeof form.status)} className={inputClass}>
                {PROPERTY_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-gold-500 focus:ring-gold-500" />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured Property</label>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea required rows={5} value={form.description} onChange={(e) => update('description', e.target.value)} className={`${inputClass} resize-none`} placeholder="Detailed property description..." />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Price *</label>
              <input required type="number" value={form.price || ''} onChange={(e) => update('price', Number(e.target.value))} className={inputClass} placeholder="5000000" />
            </div>
            <div>
              <label className={labelClass}>Currency</label>
              <select value={form.currency} onChange={(e) => update('currency', e.target.value)} className={inputClass}>
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="AED">AED</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Price Label</label>
              <input value={form.priceLabel || ''} onChange={(e) => update('priceLabel', e.target.value)} className={inputClass} placeholder="per month (for rent)" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Address *</label>
              <input required value={form.address} onChange={(e) => update('address', e.target.value)} className={inputClass} placeholder="Building name, street" />
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input required value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} placeholder="Mumbai" />
            </div>
            <div>
              <label className={labelClass}>State</label>
              <input value={form.state} onChange={(e) => update('state', e.target.value)} className={inputClass} placeholder="Maharashtra" />
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input value={form.country} onChange={(e) => update('country', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>ZIP Code</label>
              <input value={form.zipCode} onChange={(e) => update('zipCode', e.target.value)} className={inputClass} placeholder="400001" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Property Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input type="number" value={form.bedrooms} onChange={(e) => update('bedrooms', Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input type="number" value={form.bathrooms} onChange={(e) => update('bathrooms', Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Area</label>
              <input type="number" value={form.area} onChange={(e) => update('area', Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Area Unit</label>
              <select value={form.areaUnit} onChange={(e) => update('areaUnit', e.target.value as typeof form.areaUnit)} className={inputClass}>
                {AREA_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Plot Area (sqft)</label>
              <input type="number" value={form.plotArea || ''} onChange={(e) => update('plotArea', e.target.value ? Number(e.target.value) : undefined)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Year Built</label>
              <input type="number" value={form.yearBuilt || ''} onChange={(e) => update('yearBuilt', e.target.value ? Number(e.target.value) : undefined)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Floors</label>
              <input type="number" value={form.floors || ''} onChange={(e) => update('floors', e.target.value ? Number(e.target.value) : undefined)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Parking</label>
              <input type="number" value={form.parking} onChange={(e) => update('parking', Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Furnishing</label>
              <select value={form.furnishing} onChange={(e) => update('furnishing', e.target.value as typeof form.furnishing)} className={inputClass}>
                {FURNISHING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Facing</label>
              <select value={form.facing} onChange={(e) => update('facing', e.target.value as typeof form.facing)} className={inputClass}>
                {FACING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Images *</h3>
          <p className="text-xs text-slate-500 mb-4">Paste image URLs (use Unsplash for HD demo images). File upload will be added with backend.</p>
          <div className="flex gap-2 mb-4">
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`${inputClass} flex-1`}
              placeholder="https://images.unsplash.com/photo-..."
            />
            <button type="button" onClick={addImage} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {form.images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-gold-500 text-navy-950 text-[10px] font-bold rounded">COVER</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Add at least one image URL</p>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Amenities</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {AMENITY_SUGGESTIONS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => addAmenity(a)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  form.amenities.includes(a)
                    ? 'bg-gold-500 text-navy-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAmenity(amenityInput) } }}
              className={`${inputClass} flex-1`}
              placeholder="Custom amenity..."
            />
            <button type="button" onClick={() => addAmenity(amenityInput)} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm">Add</button>
          </div>
          {form.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.amenities.map((a) => (
                <span key={a} className="inline-flex items-center gap-1 px-3 py-1 bg-gold-500/10 text-gold-700 rounded-full text-xs">
                  {a}
                  <button type="button" onClick={() => update('amenities', form.amenities.filter((x) => x !== a))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Agent */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Agent Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Agent Name</label>
              <input value={form.agentName} onChange={(e) => update('agentName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Agent Phone</label>
              <input value={form.agentPhone} onChange={(e) => update('agentPhone', e.target.value)} className={inputClass} placeholder="+91 93903 91534" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-colors">
            <Save className="w-4 h-4" />
            {isEdit ? 'Update Property' : 'Publish Property'}
          </button>
          <button type="button" onClick={() => navigate('/admin/properties')} className="px-8 py-3 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
