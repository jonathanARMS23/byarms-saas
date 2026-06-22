'use client'
import { useEffect, useRef } from 'react'

export function Hero() {
  const dotsRef = useRef<HTMLDivElement>(null)
  const glaRef  = useRef<HTMLDivElement>(null)
  const glbRef  = useRef<HTMLDivElement>(null)
  const visRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = false
    const onScroll = () => {
      if (!raf) {
        requestAnimationFrame(() => {
          const y = window.scrollY
          if (dotsRef.current) dotsRef.current.style.transform = `translateY(${y * 0.22}px)`
          if (glaRef.current)  glaRef.current.style.transform  = `translateY(${y * 0.38}px)`
          if (glbRef.current)  glbRef.current.style.transform  = `translateY(${y * 0.30}px)`
          if (visRef.current)  visRef.current.style.transform  = `translateY(${y * 0.10}px)`
          raf = false
        })
        raf = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-parallax" aria-hidden="true">
        <div className="hero-dots"   ref={dotsRef} />
        <div className="hero-glow-a" ref={glaRef} />
        <div className="hero-glow-b" ref={glbRef} />
      </div>

      <div className="hero-inner">
        <div>
          <div className="hero-kicker" aria-hidden="true">
            <span className="kicker-pulse" />
            Agence IA · Madagascar · Remote
          </div>
          <h1 className="hero-h1" id="hero-title">
            Votre équipe dev,<br />
            <em>dopée à l&apos;IA.</em>
          </h1>
          <p className="hero-sub">
            ByARMS livre vos applications web et mobile 3× plus vite grâce à <strong>ADA</strong> — un système d&apos;agents IA spécialisés piloté par un développeur expert. MVP en 4 semaines, qualité production dès le premier sprint.
          </p>
          <div className="hero-actions">
            <button className="btn-fill" onClick={() => scrollTo('contact')}>
              Démarrer un projet
              <ArrowRight />
            </button>
            <button className="btn-outline" onClick={() => scrollTo('services')}>
              Voir les services
              <ArrowDown />
            </button>
          </div>
          <div className="hero-social" aria-label="Clients de référence">
            <div className="avatar-stack" aria-hidden="true">
              <div className="avatar" style={{ background: 'oklch(55% 0.14 250)' }}>S</div>
              <div className="avatar" style={{ background: 'oklch(52% 0.14 170)' }}>M</div>
              <div className="avatar" style={{ background: 'oklch(55% 0.16 300)' }}>A</div>
              <div className="avatar" style={{ background: 'oklch(54% 0.14 38)' }}>T</div>
            </div>
            <p className="social-text"><strong>9 startups</strong> font confiance à ByARMS</p>
          </div>
        </div>

        <div className="hero-diagram-wrap" ref={visRef} aria-hidden="true">
          <div className="ada-diagram">
            <svg className="ada-svg" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
              <g stroke="oklch(58% 0.18 255 / 0.22)" strokeWidth="1" fill="none">
                <line className="conn-line" x1="220" y1="220" x2="220" y2="50" />
                <line className="conn-line" x1="220" y1="220" x2="390" y2="90"  style={{ animationDelay: '0.3s' }} />
                <line className="conn-line" x1="220" y1="220" x2="440" y2="220" style={{ animationDelay: '0.6s' }} />
                <line className="conn-line" x1="220" y1="220" x2="390" y2="350" style={{ animationDelay: '0.9s' }} />
                <line className="conn-line" x1="220" y1="220" x2="220" y2="390" style={{ animationDelay: '1.2s' }} />
                <line className="conn-line" x1="220" y1="220" x2="50"  y2="350" style={{ animationDelay: '1.5s' }} />
                <line className="conn-line" x1="220" y1="220" x2="0"   y2="220" style={{ animationDelay: '1.8s' }} />
                <line className="conn-line" x1="220" y1="220" x2="50"  y2="90"  style={{ animationDelay: '2.1s' }} />
              </g>
            </svg>
            <div className="ada-center">
              <span className="center-sub">orchestrateur</span>
              <span className="center-name">ADA</span>
            </div>
            <div className="ada-node n-top">
              <div className="node-badge" style={{ background: 'oklch(58% 0.18 255 / 0.12)', color: 'var(--accent)' }}>NJ</div>
              <div className="node-label">NestJS</div>
            </div>
            <div className="ada-node n-tr">
              <div className="node-badge" style={{ background: 'oklch(55% 0.14 250 / 0.1)', color: 'oklch(42% 0.18 250)' }}>NX</div>
              <div className="node-label">Next.js</div>
            </div>
            <div className="ada-node n-right">
              <div className="node-badge" style={{ background: 'oklch(52% 0.14 300 / 0.1)', color: 'oklch(42% 0.18 300)' }}>DB</div>
              <div className="node-label">Database</div>
            </div>
            <div className="ada-node n-br">
              <div className="node-badge" style={{ background: 'oklch(52% 0.14 155 / 0.1)', color: 'oklch(38% 0.14 155)' }}>QA</div>
              <div className="node-label">Tester</div>
            </div>
            <div className="ada-node n-bot">
              <div className="node-badge" style={{ background: 'oklch(52% 0.16 20 / 0.1)', color: 'oklch(42% 0.18 20)' }}>SEC</div>
              <div className="node-label">Security</div>
            </div>
            <div className="ada-node n-bl">
              <div className="node-badge" style={{ background: 'oklch(54% 0.14 55 / 0.12)', color: 'oklch(44% 0.16 55)' }}>OPS</div>
              <div className="node-label">DevOps</div>
            </div>
            <div className="ada-node n-left">
              <div className="node-badge" style={{ background: 'oklch(52% 0.14 200 / 0.1)', color: 'oklch(40% 0.16 200)' }}>MOB</div>
              <div className="node-label">Mobile</div>
            </div>
            <div className="ada-node n-tl">
              <div className="node-badge" style={{ background: 'oklch(55% 0.18 280 / 0.1)', color: 'oklch(44% 0.2 280)' }}>AI</div>
              <div className="node-label">AI/LLM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1 6.5h11M6.5 1l5.5 5.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ArrowDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 1v11M1 6.5l5.5 5.5L12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
