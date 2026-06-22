'use client'
import { useEffect, useRef } from 'react'

const STATS = [
  { target: 9,   suffix: '',  label: 'Startups accompagnées' },
  { target: 3,   suffix: '×', label: 'Plus rapide qu\'une équipe classique' },
  { target: 100, suffix: '%', label: 'Satisfaction client garantie' },
]

export function StatsBar() {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.target ?? '0', 10)
          const steps = 70
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + target / steps, target)
            el.textContent = String(Math.round(current))
            if (current >= target) clearInterval(timer)
          }, 16)
          io.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="stats" role="region" aria-label="Chiffres clés">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div className="stat r" key={i}>
            <div className="stat-val">
              <span ref={(el) => { refs.current[i] = el }} data-target={s.target}>0</span>
              <em>{s.suffix}</em>
            </div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
