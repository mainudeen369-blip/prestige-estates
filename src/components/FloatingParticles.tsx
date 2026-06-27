export default function FloatingParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 5) % 100}%`,
    delay: `${(i * 0.7) % 5}s`,
    duration: `${6 + (i % 4) * 2}s`,
    size: 4 + (i % 3) * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold-400/30 animate-particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/40 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gold-400/30 rounded-full animate-float-delay" />
      <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </div>
  )
}
