'use client'
import { useRef, useState } from 'react'

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void }
  }
}

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSuccess(true)
    formRef.current?.reset()
  }

  const openCalendly = () => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/armsjonathan878/30min' })
    } else {
      window.open('https://calendly.com/armsjonathan878/30min', '_blank')
    }
  }

  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <script src="https://assets.calendly.com/assets/external/widget.js" async />

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <div className="section-inner">
          <div className="contact-grid">
            <div>
              <p className="eyebrow r">Démarrons</p>
              <h2 className="h2 r" id="contact-title">Parlez-nous<br />de votre projet.</h2>
              <p className="section-desc r">Décrivez votre idée, nous revenons sous 24h avec une première estimation et les prochaines étapes.</p>

              <div className="contact-info-list">
                <div className="ci-item r">
                  <div className="ci-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="var(--accent)" strokeWidth="1.4"/><line x1="9" y1="5" x2="9" y2="9" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/><line x1="9" y1="9" x2="12" y2="11.5" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <div className="ci-title">Réponse garantie sous 24h</div>
                    <div className="ci-text">Nous lisons chaque message et répondons personnellement, sans formulaire automatique.</div>
                  </div>
                </div>
                <div className="ci-item r">
                  <div className="ci-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="9" rx="1.5" stroke="var(--accent)" strokeWidth="1.4"/><path d="M5 6V4.5a4 4 0 018 0V6" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <div className="ci-title">NDA disponible sur demande</div>
                    <div className="ci-text">Votre brief reste confidentiel. NDA signable dès le premier appel.</div>
                  </div>
                </div>
                <div className="ci-item r">
                  <div className="ci-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C6.24 2 4 4.24 4 7c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="var(--accent)" strokeWidth="1.4"/><circle cx="9" cy="7" r="1.5" fill="var(--accent)"/></svg>
                  </div>
                  <div>
                    <div className="ci-title">Madagascar &amp; 100 % remote</div>
                    <div className="ci-text">Clients en France, Europe et monde entier. Appels en français et en anglais.</div>
                  </div>
                </div>
                <div className="ci-item r">
                  <div className="ci-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3h3.5l1.5 3.5-2 1.2a9 9 0 004.3 4.3l1.2-2L15 11.5V15a1 1 0 01-1 1C6.1 16 2 9.9 2 4a1 1 0 011-1z" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="ci-title">+261 34 27 899 79</div>
                    <div className="ci-text">WhatsApp · Appel Google Meet disponible via Calendly</div>
                  </div>
                </div>
              </div>

              <div className="cal-box r">
                <div className="cal-title">Préférez un appel ?</div>
                <div className="cal-sub">Réservez un appel découverte gratuit de 30 minutes directement dans notre agenda. Appel Google Meet inclus.</div>
                <button className="btn-cal" onClick={openCalendly}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><line x1="4" y1="1" x2="4" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="1" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.3"/></svg>
                  Réserver un appel gratuit
                </button>
              </div>
            </div>

            <div className="r">
              <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="f-row">
                  <div className="f-group">
                    <label className="f-label" htmlFor="f-first">Prénom</label>
                    <input className="f-input" id="f-first" type="text" placeholder="Sophie" autoComplete="given-name" required />
                  </div>
                  <div className="f-group">
                    <label className="f-label" htmlFor="f-last">Nom</label>
                    <input className="f-input" id="f-last" type="text" placeholder="Marchand" autoComplete="family-name" required />
                  </div>
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="f-email">Email professionnel</label>
                  <input className="f-input" id="f-email" type="email" placeholder="sophie@startup.com" autoComplete="email" required />
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="f-company">Startup / Entreprise</label>
                  <input className="f-input" id="f-company" type="text" placeholder="Kara SaaS" autoComplete="organization" />
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="f-service">Je suis intéressé(e) par</label>
                  <select className="f-select" id="f-service">
                    <option value="">Sélectionner…</option>
                    <option value="prototype">Prototype &amp; Spécification (490 € remboursables)</option>
                    <option value="web">Application Web SaaS</option>
                    <option value="mobile">Application Mobile</option>
                    <option value="ai">Intégration IA / LLM</option>
                    <option value="mvp">MVP Express — 4 semaines</option>
                    <option value="audit">Audit &amp; conseil technique</option>
                  </select>
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="f-brief">Décrivez votre projet</label>
                  <textarea className="f-textarea" id="f-brief" placeholder="Expliquez votre idée, votre cible, vos contraintes et votre budget estimé…" required />
                </div>
                <button type="submit" className="f-submit" disabled={submitting}>
                  {submitting ? 'Envoi en cours…' : 'Envoyer ma demande →'}
                </button>
                {success && (
                  <div className="f-success show" role="alert">
                    Message envoyé — nous revenons vers vous sous 24h.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
