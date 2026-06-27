import { useEffect, useRef, useState } from 'react'
import SafeImage from './SafeImage'

const HERO_VIDEO_CANDIDATES = [
  '/hero/video/Bg-hd.mp4',
  '/hero/video/bg-hd.mp4',
  '/hero/video/hero-hd.mp4',
  '/hero/video/Bg.mp4',
  '/hero/video/bg.mp4',
  '/hero/video/hero.mp4',
  '/hero/video/Hero.mp4',
  '/hero/video/video.mp4',
  '/hero/video/background.mp4',
]

function probeVideoUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const probe = document.createElement('video')
    probe.preload = 'metadata'
    probe.muted = true

    const cleanup = () => {
      probe.onloadedmetadata = null
      probe.onerror = null
      probe.removeAttribute('src')
      probe.load()
      probe.remove()
    }

    probe.onloadedmetadata = () => {
      cleanup()
      resolve(true)
    }
    probe.onerror = () => {
      cleanup()
      resolve(false)
    }
    probe.src = url
  })
}

async function findHeroVideo(): Promise<string | null> {
  for (const url of HERO_VIDEO_CANDIDATES) {
    if (await probeVideoUrl(url)) return url
  }
  return null
}

interface HeroBackgroundProps {
  imageSrc: string
  imageAlt?: string
}

export default function HeroBackground({ imageSrc }: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [videoReady, setVideoReady] = useState(false)
  const showVideo = Boolean(videoSrc && videoReady)

  useEffect(() => {
    let cancelled = false
    findHeroVideo().then((url) => {
      if (!cancelled && url) setVideoSrc(url)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!videoSrc || !video) return
    video.play().catch(() => {})
  }, [videoSrc])

  return (
    <>
      <SafeImage
        src={imageSrc}
        alt=""
        className={`hero-bg-image transition-opacity duration-700 ${
          showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        fetchPriority="high"
        decoding="async"
        fallback={<div className="hero-bg-image bg-brand-hero" aria-hidden />}
      />
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          className={`hero-bg-video transition-opacity duration-700 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
          onLoadedData={() => setVideoReady(true)}
          onCanPlayThrough={() => setVideoReady(true)}
          onError={() => {
            setVideoSrc(null)
            setVideoReady(false)
          }}
        />
      )}
      <div className="absolute inset-0 bg-hero-scrim pointer-events-none" />
    </>
  )
}
