import { useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  label?: string
  allowUrl?: boolean
}

export default function ImageUpload({
  images,
  onChange,
  maxImages = 10,
  label = 'Upload Images',
  allowUrl = true,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const remaining = maxImages - images.length
    Array.from(files).slice(0, remaining).forEach((file) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) onChange([...images, result])
      }
      reader.readAsDataURL(file)
    })
  }

  const addUrl = () => {
    const url = urlRef.current?.value.trim()
    if (url && images.length < maxImages) {
      onChange([...images, url])
      if (urlRef.current) urlRef.current.value = ''
    }
  }

  const remove = (i: number) => onChange(images.filter((_, idx) => idx !== i))

  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-2 block">{label}</label>

      <div
        onClick={() => images.length < maxImages && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          images.length < maxImages
            ? 'border-slate-200 hover:border-gold-400 hover:bg-gold-50/30 cursor-pointer'
            : 'border-slate-100 opacity-50 cursor-not-allowed'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600 font-medium">Drag & drop or click to upload</p>
        <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP — {images.length}/{maxImages}</p>
      </div>

      {allowUrl && (
        <div className="flex gap-2 mt-3">
          <input
            ref={urlRef}
            placeholder="Or paste image URL..."
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
          />
          <button type="button" onClick={addUrl} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">
            Add URL
          </button>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-gold-500 text-navy-950 text-[10px] font-bold rounded">COVER</span>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <ImageIcon className="w-4 h-4" /> No images yet
        </div>
      )}
    </div>
  )
}
