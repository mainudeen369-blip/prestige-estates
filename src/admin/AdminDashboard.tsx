import { Link } from 'react-router-dom'
import { Building2, MessageSquare, Eye, Plus, TrendingUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

export default function AdminDashboard() {
  const { properties, inquiries, settings } = useApp()

  const active = properties.filter((p) => p.status === 'Active').length
  const featured = properties.filter((p) => p.featured).length
  const sold = properties.filter((p) => p.status === 'Sold').length

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: Building2, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Active Listings', value: active, icon: Eye, color: 'bg-green-500/10 text-green-600' },
    { label: 'Featured', value: featured, icon: TrendingUp, color: 'bg-gold-500/10 text-gold-600' },
    { label: 'Inquiries', value: inquiries.length, icon: MessageSquare, color: 'bg-purple-500/10 text-purple-600' },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Welcome back!</h2>
          <p className="text-slate-500 text-sm">Manage {settings.companyName} from here.</p>
        </div>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-navy-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900">Recent Properties</h3>
            <Link to="/admin/properties" className="text-sm text-gold-600 hover:text-gold-700">View all</Link>
          </div>
          <div className="space-y-3">
            {properties.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                to={`/admin/properties/${p.id}/edit`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-900 truncate">{p.title}</p>
                  <p className="text-xs text-slate-500">{p.city} · {p.propertyType}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900">Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-sm text-gold-600 hover:text-gold-700">View all</Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">No inquiries yet</p>
          ) : (
            <div className="space-y-3">
              {inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="p-3 rounded-xl bg-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-navy-900">{inq.name}</p>
                    <p className="text-xs text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{inq.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-navy-950 rounded-2xl p-6 text-white">
        <h3 className="font-display text-lg font-semibold mb-2">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gold-400">{sold}</p>
            <p className="text-xs text-slate-400">Sold/Rented</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gold-400">
              {formatPrice(properties.reduce((sum, p) => sum + p.price, 0) / Math.max(properties.length, 1))}
            </p>
            <p className="text-xs text-slate-400">Avg. Price</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gold-400">{new Set(properties.map((p) => p.city)).size}</p>
            <p className="text-xs text-slate-400">Cities</p>
          </div>
        </div>
      </div>
    </div>
  )
}
