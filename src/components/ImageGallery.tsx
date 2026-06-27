import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Expand, Home } from 'lucide-react'
import SafeImage from './SafeImage'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  if (!images.length) {
    return (
      <div className="aspect-[16/9] bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
        No images available
      </div>
    )
  }

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden bg-brand-card">
        <div className="aspect-[16/9] relative">
          <SafeImage
            src={images[current]}
            alt={`${title} - ${current + 1}`}
            className="w-full h-full object-cover"
            fallback={
              <div className="w-full h-full bg-gradient-to-br from-[#e8f3ee] to-[#eef0f6] flex items-center justify-center">
                <Home className="w-16 h-16 text-[#128C7E]/30" />
              </div>
            }
          />
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-4 right-4 p-2.5 bg-black/50 backdrop-blur rounded-lg text-white hover:bg-black/70 transition-colors"
            aria-label="Expand gallery"
          >
            <Expand className="w-5 h-5" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur rounded-full text-white hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur rounded-full text-white hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-white text-sm">
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-navy-900 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === current ? 'border-gold-500' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <SafeImage src={img} alt="" className="w-full h-full object-cover" fallback={<div className="w-full h-full bg-slate-200" />} />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gold-400 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <SafeImage
            src={images[current]}
            alt={title}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white hover:text-gold-400">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white hover:text-gold-400">
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
