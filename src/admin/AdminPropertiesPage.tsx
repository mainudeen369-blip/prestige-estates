import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

export default function AdminPropertiesPage() {
  const { properties, deleteProperty, updateProperty } = useApp()

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteProperty(id)
    }
  }

  const toggleFeatured = (id: string, featured: boolean) => {
    updateProperty(id, { featured: !featured })
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Properties</h2>
          <p className="text-slate-500 text-sm">{properties.length} total listings</p>
        </div>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Property</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Price</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="font-medium text-navy-900 truncate max-w-[200px]">{p.title}</p>
                        <p className="text-xs text-slate-500">{p.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-slate-600">{p.propertyType}</span>
                    <p className="text-xs text-slate-400">{p.listingType}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600">
                    {formatPrice(p.price, p.currency, p.priceLabel)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      p.status === 'Active' ? 'bg-green-100 text-green-700' :
                      p.status === 'Sold' ? 'bg-red-100 text-red-700' :
                      p.status === 'Rented' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleFeatured(p.id, p.featured)}
                        className={`p-2 rounded-lg transition-colors ${p.featured ? 'text-gold-500 bg-gold-50' : 'text-slate-400 hover:bg-slate-100'}`}
                        title="Toggle featured"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <Link to={`/property/${p.slug}`} target="_blank" className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={`/admin/properties/${p.id}/edit`} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
