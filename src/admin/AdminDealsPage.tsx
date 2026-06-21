import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import { DEAL_STATUS, type Deal, type DealStatus } from '../types/crm'

const emptyDeal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'> = {
  buyerId: '', sellerId: '', propertyId: '', title: '', type: 'Sale',
  dealValue: 0, commission: 0, status: 'Inquiry', notes: '',
}

export default function AdminDealsPage() {
  const { deals, buyers, sellers, properties, addDeal, updateDeal, deleteDeal } = useApp()
  const [editing, setEditing] = useState<Deal | null>(null)
  const [form, setForm] = useState(emptyDeal)
  const [showForm, setShowForm] = useState(false)

  const openNew = () => { setEditing(null); setForm(emptyDeal); setShowForm(true) }
  const openEdit = (d: Deal) => {
    const { id: _i, createdAt: _c, updatedAt: _u, ...rest } = d
    setEditing(d); setForm(rest); setShowForm(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.buyerId || !form.title) return alert('Buyer and deal title required')
    const payload = { ...form, closedAt: form.status === 'Closed' && !form.closedAt ? new Date().toISOString() : form.closedAt }
    if (editing) updateDeal(editing.id, payload)
    else addDeal(payload)
    setShowForm(false)
  }

  const getBuyerName = (id: string) => buyers.find((b) => b.id === id)?.name || 'Unknown'
  const getSellerName = (id?: string) => id ? sellers.find((s) => s.id === id)?.name || 'Unknown' : '—'

  const statusColors: Record<DealStatus, string> = {
    Inquiry: 'bg-slate-100 text-slate-700',
    'Site Visit': 'bg-blue-100 text-blue-700',
    Negotiation: 'bg-amber-100 text-amber-700',
    Agreement: 'bg-orange-100 text-orange-700',
    Closed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50'

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Deals & Transactions</h2>
          <p className="text-slate-500 text-sm">{deals.length} deals · {deals.filter(d => d.status === 'Closed').length} closed</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl text-sm">
          <Plus className="w-4 h-4" /> New Deal
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-display text-xl font-bold">{editing ? 'Edit Deal' : 'New Deal'}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="text-sm font-medium mb-1 block">Deal Title *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
              <div><label className="text-sm font-medium mb-1 block">Buyer *</label>
                <select required value={form.buyerId} onChange={(e) => setForm({ ...form, buyerId: e.target.value })} className={inputClass}>
                  <option value="">Select buyer</option>
                  {buyers.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Seller</label>
                <select value={form.sellerId || ''} onChange={(e) => setForm({ ...form, sellerId: e.target.value || undefined })} className={inputClass}>
                  <option value="">Select seller (optional)</option>
                  {sellers.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.propertyTitle}</option>)}
                </select>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Property</label>
                <select value={form.propertyId || ''} onChange={(e) => setForm({ ...form, propertyId: e.target.value || undefined })} className={inputClass}>
                  <option value="">Link property (optional)</option>
                  {properties.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1 block">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'Sale' | 'Rent' })} className={inputClass}>
                    <option value="Sale">Sale</option><option value="Rent">Rent</option>
                  </select>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as DealStatus })} className={inputClass}>
                    {DEAL_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Deal Value (₹)</label><input type="number" value={form.dealValue || ''} onChange={(e) => setForm({ ...form, dealValue: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className="text-sm font-medium mb-1 block">Commission (₹)</label><input type="number" value={form.commission || ''} onChange={(e) => setForm({ ...form, commission: Number(e.target.value) })} className={inputClass} /></div>
              </div>
              <div><label className="text-sm font-medium mb-1 block">Notes</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputClass} resize-none`} /></div>
              <button type="submit" className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Deal
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="text-left px-4 py-3 font-medium text-slate-600">Deal</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Buyer → Seller</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Value</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => (
              <tr key={d.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-navy-900">{d.title}</p>
                  <p className="text-xs text-slate-400">{d.type}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-600">
                  {getBuyerName(d.buyerId)} → {getSellerName(d.sellerId)}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <p className="font-medium">{formatPrice(d.dealValue)}</p>
                  <p className="text-xs text-green-600">Comm: {formatPrice(d.commission)}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[d.status]}`}>{d.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(d)} className="p-1.5 hover:bg-slate-100 rounded-lg inline-block"><Pencil className="w-4 h-4 text-slate-400" /></button>
                  <button onClick={() => confirm('Delete deal?') && deleteDeal(d.id)} className="p-1.5 hover:bg-red-50 rounded-lg inline-block"><Trash2 className="w-4 h-4 text-slate-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
