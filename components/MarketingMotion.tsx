'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'

/** Motion stays optional: server-rendered content is visible without JavaScript. */
export function MarketingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')
    let frame = 0
    let observer: IntersectionObserver | undefined
    const animations = new Set<Animation>()

    const update = () => {
      frame = 0
      const hero = el.querySelector<HTMLElement>('.m-hero')
      if (hero) {
        const rect = hero.getBoundingClientRect()
        const travel = Math.max(-180, Math.min(180, -rect.top))
        hero.style.setProperty('--hero-y', `${travel * 0.13}px`)
        hero.style.setProperty('--glow-y', `${travel * 0.32}px`)
      }
      const portrait = el.querySelector<HTMLElement>('.m-ceo-portrait')
      if (portrait) {
        const rect = portrait.getBoundingClientRect()
        const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.055
        portrait.style.setProperty('--portrait-y', `${Math.max(-20, Math.min(20, offset))}px`)
      }
    }
    const scroll = () => { if (!frame && !paused && !reduced.matches) frame = requestAnimationFrame(update) }
    const pointer = (event: PointerEvent) => {
      if (paused || reduced.matches || !finePointer.matches) return
      const hero = el.querySelector<HTMLElement>('.m-hero')
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      if (event.clientY < rect.top || event.clientY > rect.bottom) return
      hero.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth - 0.5) * 14}px`)
      hero.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 12}px`)
    }
    const reset = () => {
      el.querySelectorAll<HTMLElement>('.m-hero, .m-ceo-portrait').forEach(node => {
        for (const key of ['--hero-y', '--glow-y', '--pointer-x', '--pointer-y', '--portrait-y']) node.style.removeProperty(key)
      })
    }
    const configure = () => {
      observer?.disconnect()
      animations.forEach(animation => animation.cancel())
      animations.clear()
      cancelAnimationFrame(frame)
      frame = 0
      const off = paused || reduced.matches
      el.dataset.motion = off ? 'off' : 'on'
      if (off) { reset(); return }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const index = Number((entry.target as HTMLElement).dataset.motionIndex || 0)
          const animation = entry.target.animate([
            { opacity: 0, transform: 'translateY(25px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 780, delay: (index % 4) * 80, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' })
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
          observer?.unobserve(entry.target)
        })
      }, { threshold: 0.08 })
      el.querySelectorAll<HTMLElement>('.m-hero-copy > *, .m-section-head, .m-offer, .m-steps article, .m-principles article, .m-founder, .m-closing, .m-intro').forEach((node, index) => {
        node.dataset.motionIndex = String(index)
        observer?.observe(node)
      })
      scroll()
    }
    configure()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', scroll, { passive: true })
    el.addEventListener('pointermove', pointer, { passive: true })
    reduced.addEventListener('change', configure)
    return () => {
      observer?.disconnect()
      animations.forEach(animation => animation.cancel())
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', scroll)
      el.removeEventListener('pointermove', pointer)
      reduced.removeEventListener('change', configure)
      reset()
    }
  }, [paused])

  return <div ref={root} className="marketing" data-motion={paused ? 'off' : 'on'}>
    {children}
    <button className="m-motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Relancer les animations' : 'Mettre les animations en pause'}>
      {paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'Animations en pause' : 'Animations actives'}</span>
    </button>
  </div>
}
