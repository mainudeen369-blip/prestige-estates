import { useState } from 'react'
import { Save, RotateCcw } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { defaultSiteSettings } from '../data/seed'

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetToSeed } = useApp()
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  const update = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings(form)
    setSaved(true)
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50'
  const labelClass = 'text-sm font-medium text-slate-700 mb-1 block'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Site Settings</h2>
          <p className="text-slate-500 text-sm">Changes reflect immediately on the website</p>
        </div>
        {saved && <span className="text-sm text-green-600 font-medium">Saved!</span>}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Company Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Company Name</label>
              <input value={form.companyName} onChange={(e) => update('companyName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input value={form.tagline} onChange={(e) => update('tagline', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number (with country code, no +)</label>
              <input value={form.whatsappNumber} onChange={(e) => update('whatsappNumber', e.target.value)} className={inputClass} placeholder="919876543210" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Office Address</label>
              <input value={form.address} onChange={(e) => update('address', e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Homepage Hero</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Hero Title</label>
              <input value={form.heroTitle} onChange={(e) => update('heroTitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Hero Subtitle</label>
              <input value={form.heroSubtitle} onChange={(e) => update('heroSubtitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Hero Image URL</label>
              <input value={form.heroImage} onChange={(e) => update('heroImage', e.target.value)} className={inputClass} />
              {form.heroImage && (
                <img src={form.heroImage} alt="Hero preview" className="mt-2 h-32 rounded-xl object-cover" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">About Page</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>About Title</label>
              <input value={form.aboutTitle} onChange={(e) => update('aboutTitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>About Content</label>
              <textarea rows={4} value={form.aboutContent} onChange={(e) => update('aboutContent', e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Mission</label>
              <textarea rows={2} value={form.mission} onChange={(e) => update('mission', e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Vision</label>
              <textarea rows={2} value={form.vision} onChange={(e) => update('vision', e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Years Experience</label>
                <input type="number" value={form.yearsExperience} onChange={(e) => update('yearsExperience', Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Properties Sold</label>
                <input type="number" value={form.propertiesSold} onChange={(e) => update('propertiesSold', Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Happy Clients</label>
                <input type="number" value={form.happyClients} onChange={(e) => update('happyClients', Number(e.target.value))} className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-navy-900 mb-4">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Facebook URL</label>
              <input value={form.facebook || ''} onChange={(e) => update('facebook', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input value={form.instagram || ''} onChange={(e) => update('instagram', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input value={form.linkedin || ''} onChange={(e) => update('linkedin', e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold rounded-xl transition-colors">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all data to demo defaults? This will erase custom properties and settings.')) {
                resetToSeed()
                setForm(defaultSiteSettings)
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Demo Data
          </button>
        </div>
      </form>
    </div>
  )
}