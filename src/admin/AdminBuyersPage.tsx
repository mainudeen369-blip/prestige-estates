import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, X, Save } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import ImageUpload from '../components/ImageUpload'
import { BUYER_STATUS, PROPERTY_TYPES, type Buyer, type BuyerStatus } from '../types/crm'

const emptyBuyer: Omit<Buyer, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', email: '', phone: '', budget: 0, preferredCities: [], preferredTypes: [],
  bedrooms: 2, requirements: '', status: 'Active', documents: [], notes: '', assignedAgent: '',
}

export default function AdminBuyersPage() {
  const { buyers, addBuyer, updateBuyer, deleteBuyer, settings } = useApp()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Buyer | null>(null)
  const [form, setForm] = useState(emptyBuyer)
  const [showForm, setShowForm] = useState(false)
  const [cityInput, setCityInput] = useState('')

  const filtered = buyers.filter((b) =>
    `${b.name} ${b.email} ${b.phone} ${b.preferredCities.join(' ')}`.toLowerCase().includes(search.toLowerCase())
  )

  const openNew = () => {
    setEditing(null)
    setForm({ ...emptyBuyer, assignedAgent: settings.team[0]?.name || '' })
    setShowForm(true)
  }

  const openEdit = (b: Buyer) => {
    const { id: _i, createdAt: _c, updatedAt: _u, ...rest } = b
    setEditing(b)
    setForm(rest)
    setShowForm(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return alert('Name and phone required')
    if (editing) updateBuyer(editing.id, form)
    else addBuyer(form)
    setShowForm(false)
    setEditing(null)
  }

  const addCity = () => {
    if (cityInput && !form.preferredCities.includes(cityInput)) {
      setForm({ ...form, preferredCities: [...form.preferredCities, cityInput] })
      setCityInput('')
    }
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50'

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Buyers</h2>
          <p className="text-slate-500 text-sm">{buyers.length} registered buyers · {buyers.filter(b => b.status === 'Active' || b.status === 'Negotiating').length} active</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl text-sm">
          <Plus className="w-4 h-4" /> Add Buyer
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display text-xl font-bold text-navy-900">{editing ? 'Edit Buyer' : 'Add New Buyer'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Full Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Phone *</label><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as BuyerStatus })} className={inputClass}>
                    {BUYER_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Budget (₹)</label><input type="number" value={form.budget || ''} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Max Budget (₹)</label><input type="number" value={form.budgetMax || ''} onChange={(e) => setForm({ ...form, budgetMax: e.target.value ? Number(e.target.value) : undefined })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Bedrooms Needed</label><input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Assigned Agent</label><input value={form.assignedAgent} onChange={(e) => setForm({ ...form, assignedAgent: e.target.value })} className={inputClass} /></div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Preferred Property Types</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((t) => (
                    <button key={t} type="button" onClick={() => {
                      const types = form.preferredTypes.includes(t) ? form.preferredTypes.filter((x) => x !== t) : [...form.preferredTypes, t]
                      setForm({ ...form, preferredTypes: types })
                    }} className={`px-3 py-1 rounded-full text-xs font-medium ${form.preferredTypes.includes(t) ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Preferred Cities</label>
                <div className="flex gap-2 mb-2">
                  <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCity())} className={`${inputClass} flex-1`} placeholder="Add city..." />
                  <button type="button" onClick={addCity} className="px-4 py-2 bg-slate-100 rounded-xl text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">{form.preferredCities.map((c) => (
                  <span key={c} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center gap-1">{c}<button type="button" onClick={() => setForm({ ...form, preferredCities: form.preferredCities.filter((x) => x !== c) })}><X className="w-3 h-3" /></button></span>
                ))}</div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Requirements</label><textarea rows={3} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className={`${inputClass} resize-none`} /></div>
              <div><label className="text-sm font-medium mb-1 block">Notes</label><textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputClass} resize-none`} /></div>
              <ImageUpload images={form.photo ? [form.photo] : []} onChange={(imgs) => setForm({ ...form, photo: imgs[0] })} maxImages={1} label="Profile Photo" />
              <ImageUpload images={form.documents} onChange={(docs) => setForm({ ...form, documents: docs })} maxImages={5} label="Documents (ID, Proof of Funds, etc.)" />
              <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> {editing ? 'Update Buyer' : 'Save Buyer'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search buyers..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden shrink-0">
                {b.photo ? <img src={b.photo} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">{b.name[0]}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy-900">{b.name}</h3>
                <p className="text-xs text-slate-500">{b.phone}</p>
                <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  b.status === 'Active' ? 'bg-green-100 text-green-700' : b.status === 'Negotiating' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>{b.status}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(b)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => confirm(`Delete ${b.name}?`) && deleteBuyer(b.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              <p><span className="text-slate-500">Budget:</span> <span className="font-medium text-navy-900">{formatPrice(b.budget)}{b.budgetMax ? ` – ${formatPrice(b.budgetMax)}` : ''}</span></p>
              <p><span className="text-slate-500">Looking for:</span> {b.preferredTypes.join(', ') || 'Any'}</p>
              <p><span className="text-slate-500">Cities:</span> {b.preferredCities.join(', ') || 'Any'}</p>
              <p className="text-xs text-slate-400 line-clamp-2">{b.requirements}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
