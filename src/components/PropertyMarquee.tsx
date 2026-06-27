import { PROPERTY_TYPES } from '../types'

const items = [...PROPERTY_TYPES, ...PROPERTY_TYPES]

export default function PropertyMarquee() {
  return (
    <div className="bg-brand-marquee py-4 overflow-hidden border-y border-gold-500/10">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((type, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-slate-400 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}
