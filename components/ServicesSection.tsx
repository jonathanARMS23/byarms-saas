export function ServicesSection() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="section-inner">
        <p className="eyebrow r">Ce que nous construisons</p>
        <h2 className="h2 r" id="services-title">Du MVP à la plateforme scale-up.</h2>
        <p className="section-desc r">Chaque livrable bénéficie du même niveau d&apos;exigence — architecture solide, code testé, déploiement automatisé. Pas de code jetable.</p>
        <div className="services-grid">
          <div className="svc-card r">
            <span className="svc-pill">Populaire</span>
            <div className="svc-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="2" fill="var(--accent)" opacity=".7"/>
                <rect x="11" y="2" width="7" height="7" rx="2" fill="var(--accent)"/>
                <rect x="2" y="11" width="7" height="7" rx="2" fill="var(--accent)"/>
                <rect x="11" y="11" width="7" height="7" rx="2" fill="var(--accent)" opacity=".4"/>
              </svg>
            </div>
            <h3 className="svc-title">Application Web SaaS</h3>
            <p className="svc-desc">Full-stack NestJS + Next.js avec authentification multi-tenant, facturation Stripe et dashboard admin. Prêt pour vos premiers 10 000 utilisateurs.</p>
            <div className="svc-items">
              <div className="svc-item">Architecture multi-tenant dès le départ</div>
              <div className="svc-item">Auth JWT + RLS Supabase</div>
              <div className="svc-item">Stripe Subscriptions inclus</div>
              <div className="svc-item">CI/CD GitHub Actions + Vercel</div>
            </div>
          </div>

          <div className="svc-card r">
            <div className="svc-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="5" y="1" width="10" height="18" rx="2.5" stroke="var(--accent)" strokeWidth="1.5"/>
                <line x1="8" y1="16.5" x2="12" y2="16.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="svc-title">Application Mobile</h3>
            <p className="svc-desc">React Native cross-platform (iOS + Android) avec design system natif, navigation fluide et synchronisation temps réel.</p>
            <div className="svc-items">
              <div className="svc-item">iOS &amp; Android depuis une seule base de code</div>
              <div className="svc-item">Expo managed workflow</div>
              <div className="svc-item">Notifications push intégrées</div>
              <div className="svc-item">Publication App Store + Play Store</div>
            </div>
          </div>

          <div className="svc-card r">
            <div className="svc-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="var(--accent)" strokeWidth="1.5"/>
                <path d="M7 10c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="10" cy="10" r="1.5" fill="var(--accent)"/>
              </svg>
            </div>
            <h3 className="svc-title">Intégration IA &amp; LLM</h3>
            <p className="svc-desc">Ajoutez des capacités IA à votre produit — chatbots, génération de contenu, RAG, agents autonomes — avec Anthropic Claude.</p>
            <div className="svc-items">
              <div className="svc-item">RAG vectoriel (Qdrant / pgvector)</div>
              <div className="svc-item">Streaming SSE / WebSocket</div>
              <div className="svc-item">Agents multi-steps avec tool use</div>
              <div className="svc-item">Prompt caching &amp; optimisation coûts</div>
            </div>
          </div>

          <div className="svc-card r">
            <div className="svc-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 10l4 4 10-8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="svc-title">MVP Express — 4 semaines</h3>
            <p className="svc-desc">De l&apos;idée au produit validable en 4 sprints. Conçu pour tester votre marché sans brûler votre runway. Évolutif dès le premier jour.</p>
            <div className="svc-items">
              <div className="svc-item">Kick-off sous 48h</div>
              <div className="svc-item">Démo intermédiaire à J+14</div>
              <div className="svc-item">Livraison en production à J+28</div>
              <div className="svc-item">1 mois de support post-launch inclus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
