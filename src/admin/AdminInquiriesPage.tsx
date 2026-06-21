import { Mail, Phone, MessageSquare } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function AdminInquiriesPage() {
  const { inquiries } = useApp()

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">Inquiries</h2>
        <p className="text-slate-500 text-sm">{inquiries.length} total messages from contact form</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No inquiries yet. They'll appear here when visitors submit the contact form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="font-semibold text-navy-900">{inq.name}</h3>
                <span className="text-xs text-slate-400">
                  {new Date(inq.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mb-3 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${inq.email}`} className="hover:text-gold-600">{inq.email}</a>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${inq.phone}`} className="hover:text-gold-600">{inq.phone}</a>
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 rounded-xl p-4">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
