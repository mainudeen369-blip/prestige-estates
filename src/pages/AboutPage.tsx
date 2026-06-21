import { useApp } from '../context/AppContext'
import { Target, Eye, Quote } from 'lucide-react'

export default function AboutPage() {
  const { settings } = useApp()

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=90"
          alt="About us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">{settings.aboutTitle}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">{settings.aboutContent}</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-2xl border border-slate-100">
                <p className="font-display text-2xl font-bold text-gold-600">{settings.yearsExperience}+</p>
                <p className="text-xs text-slate-500 mt-1">Years</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl border border-slate-100">
                <p className="font-display text-2xl font-bold text-gold-600">{settings.propertiesSold}</p>
                <p className="text-xs text-slate-500 mt-1">Sold</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl border border-slate-100">
                <p className="font-display text-2xl font-bold text-gold-600">{settings.happyClients}</p>
                <p className="text-xs text-slate-500 mt-1">Clients</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=90"
              alt="Luxury home"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-gold-500 text-navy-950 p-6 rounded-2xl shadow-lg max-w-[200px]">
              <Quote className="w-6 h-6 mb-2 opacity-60" />
              <p className="text-sm font-medium">Trusted by India's finest families since 2003</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">{settings.mission}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">{settings.vision}</p>
          </div>
        </div>

        <div>
          <div className="text-center mb-12">
            <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Our Team</p>
            <h2 className="font-display text-3xl font-bold text-navy-900">Meet the Experts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {settings.team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-navy-900">{member.name}</h3>
                  <p className="text-gold-600 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-slate-500 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
