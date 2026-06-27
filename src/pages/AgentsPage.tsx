import { Phone, Mail, Building2, Award, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { getWhatsAppLink } from '../utils/helpers'

export default function AgentsPage() {
  const { settings, properties, deals } = useApp()

  const getSoldCount = (agentName: string) => {
    const fromProperties = properties.filter(
      (p) => p.agentName === agentName && (p.status === 'Sold' || p.status === 'Rented')
    ).length
    return fromProperties
  }

  const closedDeals = deals.filter((d) => d.status === 'Closed').length

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-navy-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">Our Team</p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Agent Profiles</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Meet our expert agents. See how many properties each has successfully sold.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.team.map((member, i) => {
            const soldCount = member.propertiesSold + getSoldCount(member.name)
            const whatsapp = getWhatsAppLink(
              settings.whatsappNumber,
              `Hi ${member.name}! I found your profile on ${settings.companyName} and would like to discuss a property.`
            )

            return (
              <AnimateOnScroll key={member.id} delay={i * 120} direction="up">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/90 to-transparent p-5 pt-16">
                      <h2 className="font-display text-xl font-bold text-white">{member.name}</h2>
                      <p className="text-gold-400 text-sm">{member.role}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="text-center p-3 bg-gold-50 rounded-xl border border-gold-100">
                        <Building2 className="w-5 h-5 text-gold-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-navy-900">{soldCount}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Properties Sold</p>
                      </div>
                      <div className="text-center p-3 bg-navy-50 rounded-xl border border-navy-100">
                        <Award className="w-5 h-5 text-navy-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-navy-900">{settings.yearsExperience}+</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Yrs Experience</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{member.bio}</p>

                    <div className="space-y-2">
                      {(member.phone || settings.phone) && (
                        <a href={`tel:${member.phone || settings.phone}`} className="flex items-center gap-2 text-sm text-navy-900 hover:text-gold-600">
                          <Phone className="w-4 h-4 text-gold-500" /> {member.phone || settings.phone}
                        </a>
                      )}
                      <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-navy-900 hover:text-gold-600">
                        <Mail className="w-4 h-4 text-gold-500" /> {settings.email}
                      </a>
                    </div>

                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl text-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Contact on WhatsApp
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>

        <AnimateOnScroll>
          <div className="mt-16 bg-navy-950 rounded-2xl p-8 text-center text-white">
            <p className="text-4xl font-display font-bold text-gold-400 mb-2">{settings.propertiesSold}+</p>
            <p className="text-slate-400">Total Properties Sold by {settings.companyName}</p>
            <p className="text-sm text-slate-500 mt-2">{closedDeals} deals tracked in our system</p>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
