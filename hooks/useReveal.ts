'use client'
import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.r') ?? [])
          const idx = siblings.indexOf(entry.target as Element)
          ;(entry.target as HTMLElement).style.transitionDelay = `${Math.min(idx * 0.06, 0.36)}s`
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )
    document.querySelectorAll('.r').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
