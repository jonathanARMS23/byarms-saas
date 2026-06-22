'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const update = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 24)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const closeMenu = () => {
    setOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const scrollTo = (id: string) => {
    closeMenu()
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <>
      <nav ref={navRef} className={`nav${open ? ' open' : ''}`} id="main-nav">
        <div className="nav-inner">
          <a href="#" className="logo" aria-label="ByARMS">
            <div className="logo-img">
              <Image src="/byarms-logo.png" alt="ByARMS" fill style={{ objectFit: 'contain', objectPosition: 'center' }} priority />
            </div>
            ByARMS
          </a>
          <ul className="nav-links">
            <li><button onClick={() => scrollTo('ada')} style={{ background: 'none', border: 'none', padding: 0, fontSize: 14, color: 'var(--muted)', cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>ADA</button></li>
            <li><button onClick={() => scrollTo('services')} style={{ background: 'none', border: 'none', padding: 0, fontSize: 14, color: 'var(--muted)', cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Services</button></li>
            <li><button onClick={() => scrollTo('founder')} style={{ background: 'none', border: 'none', padding: 0, fontSize: 14, color: 'var(--muted)', cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Fondateur</button></li>
          </ul>
          <button className="nav-cta" onClick={() => scrollTo('contact')}>Prendre un RDV</button>
          <button className="nav-hamburger" onClick={toggleMenu} aria-label="Ouvrir le menu" aria-expanded={open}>
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>

      <nav className={`nav-mobile${open ? ' open' : ''}`} aria-label="Menu mobile">
        <button className="nav-mobile-link" onClick={() => scrollTo('ada')}>ADA</button>
        <button className="nav-mobile-link" onClick={() => scrollTo('services')}>Services</button>
        <button className="nav-mobile-link" onClick={() => scrollTo('founder')}>Fondateur</button>
        <button className="nav-mobile-cta" onClick={() => scrollTo('contact')}>Prendre un RDV</button>
      </nav>
    </>
  )
}
