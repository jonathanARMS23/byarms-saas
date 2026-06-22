'use client'

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PrototypeSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section className="gen-section" id="prototype" aria-labelledby="gen-title">
      <div className="gen-inner">
        <div className="r">
          <p className="gen-eyebrow">Offre exclusive</p>
          <h2 className="gen-h2" id="gen-title">
            Votre prototype<br />&amp; spec complète<br />en 48 heures.
          </h2>
          <p className="gen-desc">
            Avant d&apos;engager un budget de développement, validez votre idée avec un prototype interactif et un cahier des charges professionnel. Livré en 48h.{' '}
            <strong style={{ color: 'var(--surface)' }}>Intégralement remboursé si vous signez chez ByARMS.</strong>
          </p>
          <div className="gen-features">
            {FEATURES.map((f) => (
              <div className="gen-feat" key={f}>
                <div className="gen-check" aria-hidden="true"><CheckIcon /></div>
                <span className="gen-feat-text">{f}</span>
              </div>
            ))}
          </div>
          <div className="gen-cta">
            <button className="btn-white" onClick={scrollToContact}>
              Commander mon prototype
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 6.5h11M6.5 1l5.5 5.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="gen-card r">
          <div className="gen-card-head">
            <span className="gen-card-title">Prototype &amp; Spécification</span>
            <span className="gen-badge">Livraison 48h</span>
          </div>
          <div className="gen-card-body">
            <div className="gen-price">
              <div className="gen-amount">490 €</div>
              <div className="gen-price-note">Remboursé intégralement si contrat de développement signé chez ByARMS</div>
            </div>
            <div className="gen-deliverables">
              {DELIVERABLES.map((d) => (
                <div className="gen-dlv" key={d.text}>
                  <div className="dlv-ico">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1.5" stroke="var(--accent)" strokeWidth="1.2"/><line x1="3" y1="4" x2="9" y2="4" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/><line x1="3" y1="6.5" x2="7" y2="6.5" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </div>
                  <span className="gen-dlv-text">{d.text}</span>
                </div>
              ))}
            </div>
            <div className="gen-refund">
              <strong>Offre sans risque</strong> — Les 490 € sont déduits intégralement de votre première facture si vous engagez ByARMS pour le développement.
            </div>
            <button className="gen-submit" onClick={scrollToContact}>Commander mon prototype →</button>
          </div>
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  'Prototype interactif haute fidélité (HTML/CSS cliquable)',
  'Spécification technique complète — user stories, flows, architecture cible',
  'Stack technologique recommandée avec justification',
  'Devis de développement détaillé + planning sprint',
  'Session de présentation 1h avec Jonathan ARMS incluse',
]

const DELIVERABLES = [
  { text: 'Prototype interactif haute fidélité' },
  { text: 'Cahier des charges complet (30–50 pages)' },
  { text: 'Architecture technique recommandée' },
  { text: 'Devis + planning sprint détaillé' },
  { text: 'Session présentation 1h avec Jonathan ARMS' },
]
