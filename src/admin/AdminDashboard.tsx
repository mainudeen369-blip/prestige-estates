import { Link } from 'react-router-dom'
import {
  Building2, MessageSquare, Eye, Plus, TrendingUp,
  Users, UserCheck, Handshake, IndianRupee, ArrowUpRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import AnimatedCounter from '../components/AnimatedCounter'

export default function AdminDashboard() {
  const { properties, inquiries, settings, buyers, sellers, deals, dealStats } = useApp()

  const active = properties.filter((p) => p.status === 'Active').length
  const sold = properties.filter((p) => p.status === 'Sold' || p.status === 'Rented').length

  const stats = [
    { label: 'Total Buyers', value: dealStats.totalBuyers, sub: `${dealStats.activeBuyers} active`, icon: Users, color: 'from-blue-500 to-blue-600', link: '/admin/buyers' },
    { label: 'Total Sellers', value: dealStats.totalSellers, sub: `${dealStats.activeSellers} active`, icon: UserCheck, color: 'from-emerald-500 to-emerald-600', link: '/admin/sellers' },
    { label: 'Deals in Progress', value: dealStats.inProgressDeals, sub: `${dealStats.closedDeals} closed`, icon: Handshake, color: 'from-purple-500 to-purple-600', link: '/admin/deals' },
    { label: 'Properties', value: properties.length, sub: `${active} active`, icon: Building2, color: 'from-gold-500 to-gold-600', link: '/admin/properties' },
  ]

  const dealPipeline = [
    { status: 'Inquiry', count: deals.filter((d) => d.status === 'Inquiry').length, color: 'bg-slate-400' },
    { status: 'Site Visit', count: deals.filter((d) => d.status === 'Site Visit').length, color: 'bg-blue-400' },
    { status: 'Negotiation', count: deals.filter((d) => d.status === 'Negotiation').length, color: 'bg-amber-400' },
    { status: 'Agreement', count: deals.filter((d) => d.status === 'Agreement').length, color: 'bg-orange-400' },
    { status: 'Closed', count: deals.filter((d) => d.status === 'Closed').length, color: 'bg-green-500' },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Business Overview</h2>
          <p className="text-slate-500 text-sm">Track buyers, sellers, deals & properties — {settings.companyName}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/buyers" className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Buyer
          </Link>
          <Link to="/admin/sellers" className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Seller
          </Link>
          <Link to="/admin/properties/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Property
          </Link>
        </div>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Link key={s.label} to={s.link} className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-gold-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-gold-500 transition-colors" />
            </div>
            <p className="text-3xl font-bold text-navy-900">{s.value}</p>
            <p className="text-sm font-medium text-navy-700">{s.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
          </Link>
        ))}
      </div>

      {/* Revenue row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="w-5 h-5 text-gold-400" />
            <p className="text-sm text-slate-400">Total Deal Value</p>
          </div>
          <p className="text-2xl font-bold text-gold-400">
            <AnimatedCounter end={Math.round(dealStats.totalDealValue / 10000000)} suffix=" Cr+" prefix="₹" />
          </p>
          <p className="text-xs text-slate-500 mt-1">Across {dealStats.totalDeals} deals</p>
        </div>
        <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-6 text-navy-950">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <p className="text-sm opacity-80">Commission Earned</p>
          </div>
          <p className="text-2xl font-bold">{formatPrice(dealStats.totalCommission)}</p>
          <p className="text-xs opacity-70 mt-1">Closed: {formatPrice(deals.filter(d => d.status === 'Closed').reduce((s, d) => s + d.commission, 0))}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-green-500" />
            <p className="text-sm text-slate-500">Closed Deal Value</p>
          </div>
          <p className="text-2xl font-bold text-navy-900">{formatPrice(dealStats.closedDealValue)}</p>
          <p className="text-xs text-slate-400 mt-1">{dealStats.closedDeals} deals completed · {sold} properties sold/rented</p>
        </div>
      </div>

      {/* Deal pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-navy-900">Deal Pipeline</h3>
          <Link to="/admin/deals" className="text-sm text-gold-600 hover:text-gold-700">Manage deals →</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dealPipeline.map((stage, i) => (
            <div key={stage.status} className="flex-1 min-w-[100px]">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <span className="text-xs font-medium text-slate-600">{stage.status}</span>
              </div>
              <p className="text-2xl font-bold text-navy-900">{stage.count}</p>
              {i < dealPipeline.length - 1 && (
                <div className="hidden sm:block absolute" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent buyers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900">Recent Buyers</h3>
            <Link to="/admin/buyers" className="text-sm text-gold-600">View all</Link>
          </div>
          <div className="space-y-3">
            {buyers.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden shrink-0">
                  {b.photo ? <img src={b.photo} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-blue-600 text-sm font-bold">{b.name[0]}</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-900 truncate">{b.name}</p>
                  <p className="text-xs text-slate-500">Budget: {formatPrice(b.budget)}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  b.status === 'Active' ? 'bg-green-100 text-green-700' :
                  b.status === 'Negotiating' ? 'bg-amber-100 text-amber-700' :
                  b.status === 'Closed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent sellers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900">Recent Sellers</h3>
            <Link to="/admin/sellers" className="text-sm text-gold-600">View all</Link>
          </div>
          <div className="space-y-3">
            {sellers.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <img src={s.images[0] || ''} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-900 truncate">{s.propertyTitle}</p>
                  <p className="text-xs text-slate-500">{s.name} · {s.city}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  s.status === 'Listed' ? 'bg-green-100 text-green-700' :
                  s.status === 'Under Offer' ? 'bg-amber-100 text-amber-700' :
                  s.status === 'Sold' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900">Inquiries</h3>
            <Link to="/admin/inquiries" className="text-sm text-gold-600">View all</Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">No inquiries yet</p>
          ) : (
            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inq) => (
                <div key={inq.id} className="p-3 rounded-xl bg-slate-50">
                  <p className="text-sm font-medium text-navy-900">{inq.name}</p>
                  <p className="text-xs text-slate-500 truncate">{inq.message}</p>
                </div>
              ))}
            </div>
          )}
          {inquiries.length === 0 && (
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
              <MessageSquare className="w-4 h-4" /> From contact form
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
