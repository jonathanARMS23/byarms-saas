'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const STACK = [
  { lang: 'TypeScript', pct: 95 },
  { lang: 'NestJS',     pct: 92 },
  { lang: 'Next.js',    pct: 90 },
  { lang: 'PostgreSQL', pct: 88 },
  { lang: 'AI / LLM',  pct: 85 },
]

export function FounderSection() {
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        barsRef.current.forEach((bar) => bar?.classList.add('animated'))
        io.disconnect()
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section className="founder-section" id="founder" ref={sectionRef} aria-labelledby="founder-title">
      <div className="founder-inner">
        <div>
          <p className="founder-eyebrow r">Le fondateur · Senior Expert</p>
          <h2 className="founder-h2 r" id="founder-title">
            Jonathan ARMS —<br />l&apos;expert derrière<br />chaque livrable.
          </h2>
          <p className="founder-desc r">
            Senior Fullstack Developer &amp; expert Agentic AI. CEO de ByARMS — une structure agile où chaque projet est supervisé personnellement, avec la puissance d&apos;ADA pour multiplier la cadence sans sacrifier la qualité. 6+ ans d&apos;expérience, 9 startups accompagnées, basé à Madagascar en 100% remote.
          </p>
          <blockquote className="founder-quote r">
            &quot;Le code que vous recevez est le code que je validerais pour mon propre produit. ADA me donne la vélocité ; je reste responsable de chaque décision d&apos;architecture.&quot;
            <cite>— Jonathan ARMS, CEO ByARMS</cite>
          </blockquote>
          <div className="founder-creds r">
            <div className="cred-box">
              <div className="cred-num">6+</div>
              <div className="cred-label">ans d&apos;expérience fullstack professionnelle</div>
            </div>
            <div className="cred-box">
              <div className="cred-num">9</div>
              <div className="cred-label">startups accompagnées</div>
            </div>
            <div className="cred-box">
              <div className="cred-num">8+</div>
              <div className="cred-label">missions clients entreprises</div>
            </div>
            <div className="cred-box">
              <div className="cred-num">ADA</div>
              <div className="cred-label">Claude AI Partner — v5 multi-agents</div>
            </div>
          </div>
          <div className="founder-actions r">
            <button className="btn-white" onClick={scrollToContact}>
              Planifier un appel
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M1 6.5h11M6.5 1l5.5 5.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <a href="https://ada.byarms.dev" target="_blank" rel="noopener noreferrer" className="btn-outline-inv">
              Découvrir ADA →
            </a>
          </div>
        </div>

        <div className="r" style={{ alignSelf: 'center' }}>
          <div className="founder-card">
            <div className="founder-avatar-ring">
              <div className="founder-avatar" style={{ overflow: 'hidden', background: 'none' }}>
                <Image
                  src="/jonathan-arms.jpg"
                  alt="Jonathan ARMS"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 45%' }}
                  sizes="132px"
                  priority
                />
              </div>
              <div className="founder-avatar-badge" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div className="founder-name-block">
              <div className="founder-name">Jonathan ARMS</div>
              <div className="founder-title-tag">CEO · Senior Full-Stack &amp; AI Engineer</div>
            </div>
            <div className="ada-powered-chip">
              <div className="ada-dot-sm" />
              Propulsé par ADA v5
            </div>
            <div className="founder-stack" aria-label="Expertise technique">
              {STACK.map((s, i) => (
                <div className="stack-row" key={s.lang}>
                  <span className="stack-lang">{s.lang}</span>
                  <div className="stack-bar-track">
                    <div
                      className="stack-bar-fill"
                      ref={(el) => { barsRef.current[i] = el }}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                  <span className="stack-pct">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
