import { useApp } from '../context/AppContext'
import { Building2, Users, Award, TrendingUp } from 'lucide-react'

export default function StatsBar() {
  const { settings } = useApp()

  const stats = [
    { icon: Award, value: `${settings.yearsExperience}+`, label: 'Years Experience' },
    { icon: Building2, value: settings.propertiesSold.toLocaleString(), label: 'Properties Sold' },
    { icon: Users, value: settings.happyClients.toLocaleString(), label: 'Happy Clients' },
    { icon: TrendingUp, value: '98%', label: 'Client Satisfaction' },
  ]

  return (
    <section className="bg-navy-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/30 mb-4">
                <stat.icon className="w-6 h-6 text-gold-400" />
              </div>
              <p className="font-display text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
