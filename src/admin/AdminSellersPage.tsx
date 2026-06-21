import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, X, Save } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import ImageUpload from '../components/ImageUpload'
import { SELLER_STATUS, PROPERTY_TYPES, type Seller, type SellerStatus } from '../types/crm'

const emptySeller: Omit<Seller, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', email: '', phone: '', propertyTitle: '', propertyAddress: '', city: '',
  propertyType: 'Apartment', listingType: 'For Sale', askingPrice: 0, area: 0, areaUnit: 'sqft',
  bedrooms: 2, bathrooms: 2, description: '', images: [], documents: [], status: 'Active',
  notes: '', assignedAgent: '',
}

export default function AdminSellersPage() {
  const { sellers, addSeller, updateSeller, deleteSeller, settings } = useApp()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Seller | null>(null)
  const [form, setForm] = useState(emptySeller)
  const [showForm, setShowForm] = useState(false)

  const filtered = sellers.filter((s) =>
    `${s.name} ${s.propertyTitle} ${s.city} ${s.propertyType}`.toLowerCase().includes(search.toLowerCase())
  )

  const openNew = () => {
    setEditing(null)
    setForm({ ...emptySeller, assignedAgent: settings.team[0]?.name || '' })
    setShowForm(true)
  }

  const openEdit = (s: Seller) => {
    const { id: _i, createdAt: _c, updatedAt: _u, ...rest } = s
    setEditing(s)
    setForm(rest)
    setShowForm(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.propertyTitle || form.images.length === 0) return alert('Name, property title, and at least one image required')
    if (editing) updateSeller(editing.id, form)
    else addSeller(form)
    setShowForm(false)
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50'

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Sellers</h2>
          <p className="text-slate-500 text-sm">{sellers.length} sellers · {sellers.filter(s => ['Active','Listed','Under Offer'].includes(s.status)).length} active listings</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm">
          <Plus className="w-4 h-4" /> Add Seller
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display text-xl font-bold text-navy-900">{editing ? 'Edit Seller' : 'Add New Seller'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <h4 className="font-semibold text-navy-900 text-sm uppercase tracking-wider">Seller Info</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Seller Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Phone *</label><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></div>
              </div>

              <h4 className="font-semibold text-navy-900 text-sm uppercase tracking-wider pt-2">Property Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="text-sm font-medium mb-1 block">Property Title *</label><input required value={form.propertyTitle} onChange={(e) => setForm({ ...form, propertyTitle: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Property Type</label>
                  <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value as typeof form.propertyType })} className={inputClass}>
                    {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Listing Type</label>
                  <select value={form.listingType} onChange={(e) => setForm({ ...form, listingType: e.target.value as typeof form.listingType })} className={inputClass}>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>
                <div className="sm:col-span-2"><label className="text-sm font-medium mb-1 block">Address</label><input value={form.propertyAddress} onChange={(e) => setForm({ ...form, propertyAddress: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">City</label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Asking Price (₹)</label><input type="number" value={form.askingPrice || ''} onChange={(e) => setForm({ ...form, askingPrice: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Area</label><input type="number" value={form.area || ''} onChange={(e) => setForm({ ...form, area: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Bedrooms</label><input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Bathrooms</label><input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as SellerStatus })} className={inputClass}>
                    {SELLER_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Agent</label><input value={form.assignedAgent} onChange={(e) => setForm({ ...form, assignedAgent: e.target.value })} className={inputClass} /></div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} /></div>
              <div><label className="text-sm font-medium mb-1 block">Notes</label><textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputClass} resize-none`} /></div>
              <ImageUpload images={form.images} onChange={(imgs) => setForm({ ...form, images: imgs })} maxImages={8} label="Property Photos *" />
              <ImageUpload images={form.documents} onChange={(docs) => setForm({ ...form, documents: docs })} maxImages={5} label="Documents (Title Deed, NOC, etc.)" />
              <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> {editing ? 'Update Seller' : 'Save Seller'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sellers..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex">
              <div className="w-32 h-32 shrink-0">
                <img src={s.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-navy-900 line-clamp-1">{s.propertyTitle}</h3>
                    <p className="text-xs text-slate-500">{s.name} · {s.city}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(s)} className="p-1.5 hover:bg-slate-100 rounded-lg"><Pencil className="w-4 h-4 text-slate-400" /></button>
                    <button onClick={() => confirm(`Delete?`) && deleteSeller(s.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-slate-400" /></button>
                  </div>
                </div>
                <p className="text-gold-600 font-semibold text-sm mt-1">{formatPrice(s.askingPrice)}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full">{s.propertyType}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full">{s.listingType}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    s.status === 'Listed' ? 'bg-green-100 text-green-700' : s.status === 'Under Offer' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>{s.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
