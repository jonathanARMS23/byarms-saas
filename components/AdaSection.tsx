export function AdaSection() {
  return (
    <section className="section ada-section" id="ada" aria-labelledby="ada-title">
      <div className="section-inner">
        <div className="ada-grid">
          <div>
            <p className="eyebrow r">Le moteur ByARMS</p>
            <h2 className="h2 r" id="ada-title">ADA — l&apos;orchestrateur<br />qui ne dort jamais.</h2>
            <p className="section-desc r">ADA v5 est un système multi-agents basé sur Claude. Il orchestre des dizaines d&apos;agents spécialisés — chacun expert dans son domaine — pour livrer votre produit avec la rigueur d&apos;une grande équipe et la vélocité d&apos;un dev augmenté.</p>
            <div className="flow-list">
              {FLOW_STEPS.map((s) => (
                <div className="flow-step r" key={s.num}>
                  <div className="flow-num">{s.num}</div>
                  <div>
                    <div className="flow-title">{s.title}</div>
                    <div className="flow-text">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="agents-heading r">Agents disponibles dans ADA</p>
            <div className="agents-chips">
              {AGENTS.map((a) => (
                <div className="chip r" key={a.code}>
                  <div className="chip-badge" style={{ background: a.bg, color: a.color }}>{a.code}</div>
                  <div>
                    <div className="chip-name">{a.name}</div>
                    <div className="chip-role">{a.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tech-tags r" aria-label="Technologies maîtrisées">
              {TAGS.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="r" style={{ marginTop: 32 }}>
              <a href="https://ada.byarms.com" target="_blank" rel="noopener noreferrer" className="btn-fill" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Documentation ADA complète
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M1 6.5h11M6.5 1l5.5 5.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FLOW_STEPS = [
  { num: '01', title: 'Analyse du brief & routing', text: 'ADA décompose votre besoin et assemble l\'équipe d\'agents adaptée — NestJS+Next.js pour une app web, React Native pour mobile, AI Engineer pour de l\'IA générative.' },
  { num: '02', title: 'Agents spécialisés en parallèle', text: '3 agents actifs simultanément — backend, frontend, QA — avec revue de sécurité OWASP automatique et TDD appliqué dès le premier commit.' },
  { num: '03', title: 'Code production dès le sprint 1', text: 'Git flow strict (feature→dev→staging→main), Conventional Commits, CI/CD opérationnel. Vous recevez du code que vous pouvez relire, forker et déployer.' },
  { num: '04', title: 'Supervision experte unique', text: 'Jonathan ARMS reste votre seul interlocuteur. Il valide chaque décision d\'architecture, arbitre les choix techniques et garantit la cohérence du produit final.' },
]

const AGENTS = [
  { code: 'NJ',  name: 'NestJS',      role: 'Backend API',    bg: 'oklch(58% 0.18 255/0.12)', color: 'var(--accent)' },
  { code: 'NX',  name: 'Next.js',     role: 'Frontend',       bg: 'oklch(46% 0.16 250/0.1)',  color: 'oklch(42% 0.18 250)' },
  { code: 'DB',  name: 'DB Expert',   role: 'PostgreSQL',     bg: 'oklch(48% 0.16 300/0.1)',  color: 'oklch(42% 0.18 300)' },
  { code: 'QA',  name: 'Tester',      role: 'TDD / QA',       bg: 'oklch(46% 0.14 155/0.1)',  color: 'oklch(38% 0.14 155)' },
  { code: 'SEC', name: 'Security',    role: 'OWASP audit',    bg: 'oklch(50% 0.18 20/0.1)',   color: 'oklch(42% 0.2 20)' },
  { code: 'OPS', name: 'DevOps',      role: 'Docker/CI',      bg: 'oklch(52% 0.14 55/0.12)',  color: 'oklch(44% 0.18 55)' },
  { code: 'MOB', name: 'React Native',role: 'Mobile',         bg: 'oklch(50% 0.14 200/0.1)',  color: 'oklch(40% 0.16 200)' },
  { code: 'AI',  name: 'AI Engineer', role: 'LLM/Agents',     bg: 'oklch(54% 0.2 280/0.1)',   color: 'oklch(44% 0.22 280)' },
  { code: 'ARC', name: 'Architect',   role: 'System design',  bg: 'oklch(52% 0.14 240/0.1)',  color: 'oklch(42% 0.16 240)' },
]

const TAGS = ['TypeScript', 'PostgreSQL', 'Supabase / RLS', 'Prisma', 'Docker', 'Vercel', 'Railway', 'Anthropic Claude', 'GitHub Actions', 'Stripe']
