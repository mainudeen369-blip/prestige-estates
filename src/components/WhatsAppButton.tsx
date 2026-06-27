import { MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getWhatsAppLink } from '../utils/helpers'

interface WhatsAppButtonProps {
  message?: string
}

export default function WhatsAppButton({ message }: WhatsAppButtonProps) {
  const { settings } = useApp()
  const defaultMessage = `Hi ${settings.companyName}! I'm interested in your properties. Can you help me?`
  const link = getWhatsAppLink(settings.whatsappNumber, message || defaultMessage)

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all hover:scale-105 group max-w-[calc(100vw-2rem)]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp Us</span>
    </a>
  )
}
