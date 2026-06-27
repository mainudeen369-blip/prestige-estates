import { Phone, Mail, Building2, Award, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AnimateOnScroll from '../components/AnimateOnScroll'
import SafeImage from '../components/SafeImage'
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
    <div className="bg-page-soft min-h-screen overflow-x-clip w-full">
      <div className="bg-brand-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-dark-label text-sm font-semibold tracking-widest uppercase mb-2">Our Team</p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-dark-body mb-4">Agent Profiles</h1>
          <p className="text-dark-muted max-w-xl mx-auto">
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
                      <SafeImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        fallback={
                          <div className="w-full h-full bg-gradient-to-br from-[#e8f3ee] to-[#eef0f6] flex items-center justify-center min-h-[200px]">
                            <span className="text-5xl font-display font-bold text-[#128C7E]/35">{member.name[0]}</span>
                          </div>
                        }
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#075E54]/95 to-transparent p-5 pt-16">
                      <h2 className="font-display text-xl font-bold text-white">{member.name}</h2>
                      <p className="text-[#dcf8e8] text-sm">{member.role}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="text-center p-3 bg-[#ecfdf5] rounded-xl border border-[#25D366]/20">
                        <Building2 className="w-5 h-5 text-[#128C7E] mx-auto mb-1" />
                        <p className="text-2xl font-bold text-slate-900">{soldCount}</p>
                        <p className="text-[10px] text-light-muted uppercase tracking-wider">Properties Sold</p>
                      </div>
                      <div className="text-center p-3 bg-[#eff6ff] rounded-xl border border-sky-200">
                        <Award className="w-5 h-5 text-[#128C7E] mx-auto mb-1" />
                        <p className="text-2xl font-bold text-slate-900">{settings.yearsExperience}+</p>
                        <p className="text-[10px] text-light-muted uppercase tracking-wider">Yrs Experience</p>
                      </div>
                    </div>

                    <p className="text-sm text-light-body leading-relaxed mb-5">{member.bio}</p>

                    <div className="space-y-2">
                      {(member.phone || settings.phone) && (
                        <a href={`tel:${member.phone || settings.phone}`} className="flex items-center gap-2 text-sm text-slate-800 hover:text-[#128C7E]">
                          <Phone className="w-4 h-4 text-[#25D366]" /> {member.phone || settings.phone}
                        </a>
                      )}
                      <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-slate-800 hover:text-[#128C7E]">
                        <Mail className="w-4 h-4 text-[#25D366]" /> {settings.email}
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
          <div className="mt-16 bg-brand-dark rounded-2xl p-8 text-center text-white">
            <p className="text-4xl font-display font-bold text-dark-accent mb-2">{settings.propertiesSold}+</p>
            <p className="text-dark-muted">Total Properties Sold by {settings.companyName}</p>
            <p className="text-sm text-dark-label mt-2">{closedDeals} deals tracked in our system</p>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
