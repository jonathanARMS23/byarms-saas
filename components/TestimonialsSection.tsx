const TESTIMONIALS = [
  {
    quote: '"ByARMS a livré notre MVP en 3 semaines là où une agence classique aurait mis 3 mois. Le code est propre, testé, et on a pu lever seed dès le mois suivant. Je recommande sans hésitation."',
    name: 'Sophie Marchand',
    role: 'CEO, Kara — SaaS RH',
    initial: 'S',
    color: 'oklch(55% 0.14 250)',
  },
  {
    quote: '"Le prototype en 48h nous a permis de présenter notre idée aux investisseurs avec un vrai produit cliquable. Le cahier des charges était d\'une précision remarquable — vraiment bluffant."',
    name: 'Malik Osei',
    role: 'Fondateur, Trackify — EdTech',
    initial: 'M',
    color: 'oklch(50% 0.14 155)',
  },
  {
    quote: '"L\'intégration de Claude dans notre app a transformé l\'expérience utilisateur. Jonathan a géré l\'architecture agents de bout en bout avec une rigueur et une transparence impressionnantes."',
    name: 'Alicia Chen',
    role: 'CTO, Lumio — HealthTech',
    initial: 'A',
    color: 'oklch(54% 0.16 300)',
  },
]

export function TestimonialsSection() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testi-title">
      <div className="section-inner">
        <p className="eyebrow r">Ils nous font confiance</p>
        <h2 className="h2 r" id="testi-title">Ce que disent nos clients.</h2>
        <div className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testi-card r" key={t.name}>
              <div className="stars" aria-label="5 étoiles">★★★★★</div>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-author">
                <div className="testi-av" style={{ background: t.color }} aria-hidden="true">{t.initial}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
