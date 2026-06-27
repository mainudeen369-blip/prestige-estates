import { useApp } from '../context/AppContext'
import { Building2, Users, Award, TrendingUp } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import AnimatedCounter from './AnimatedCounter'

export default function StatsBar() {
  const { settings, dealStats } = useApp()

  const stats = [
    { icon: Award, value: settings.yearsExperience, suffix: '+', label: 'Years Experience' },
    { icon: Building2, value: settings.propertiesSold, suffix: '', label: 'Properties Sold' },
    { icon: Users, value: dealStats.totalBuyers + dealStats.totalSellers, suffix: '+', label: 'Buyers & Sellers' },
    { icon: TrendingUp, value: dealStats.closedDeals, suffix: '', label: 'Deals Closed' },
  ]

  return (
    <section className="bg-brand-dark py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delay" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={stat.label} delay={i * 100} direction="up">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-500/30 mb-4 group-hover:scale-110 group-hover:bg-gold-500/30 transition-all duration-500">
                  <stat.icon className="w-6 h-6 text-dark-accent" />
                </div>
                <p className="font-display text-3xl lg:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-dark-muted">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
