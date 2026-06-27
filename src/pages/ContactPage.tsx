import { useState } from 'react'
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getWhatsAppLink } from '../utils/helpers'

export default function ContactPage() {
  const { settings, addInquiry } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addInquiry(form)
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const whatsappLink = getWhatsAppLink(
    settings.whatsappNumber,
    `Hi ${settings.companyName}! I'd like to get in touch regarding your properties.`
  )

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-clip w-full">
      <div className="bg-navy-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">Get in Touch</p>
          <h1 className="font-display text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Have a question or want to schedule a viewing? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <Phone className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="font-semibold text-navy-900 mb-1">Phone</h3>
              <a href={`tel:${settings.phone}`} className="text-slate-600 hover:text-gold-600 transition-colors">
                {settings.phone}
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <Mail className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="font-semibold text-navy-900 mb-1">Email</h3>
              <a href={`mailto:${settings.email}`} className="text-slate-600 hover:text-gold-600 transition-colors">
                {settings.email}
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <MapPin className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="font-semibold text-navy-900 mb-1">Office</h3>
              <p className="text-slate-600 text-sm">{settings.address}</p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-2xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">Message Sent!</h2>
                <p className="text-slate-600 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-gold-600 font-medium hover:text-gold-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">Send us a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 rounded-2xl overflow-hidden h-[400px]">
          <iframe
            title="Office location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
