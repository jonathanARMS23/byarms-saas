const ROWS: Array<[string, string, string, string, string]> = [
  ['Product Blueprint', '10 jours', '4 900 € HT', 'Cadrer un produit avant d’engager la réalisation', 'Ateliers, parcours utilisateurs, prototype, architecture, roadmap, budget'],
  ['Product Launch', '10 semaines', '34 900 € HT', 'Lancer une première version utilisable d’un produit ou d’un outil métier', 'Parcours principal, UX/UI, frontend, backend, espace administrateur, tests, déploiement, transfert du code'],
  ['Advanced', '12 à 16 semaines', '49 900 à 79 900 € HT', 'Web et mobile, marketplace, intégrations complexes', 'Périmètre étendu défini au Blueprint'],
  ['AI Opportunity Blueprint', '10 jours', '4 900 € HT', 'Vérifier qu’un processus se prête à l’IA', 'Cartographie, baseline, potentiel de valeur, prototype, risques, décision go/no-go'],
  ['AI Operations', '8 semaines', '29 900 € HT', 'Automatiser un processus coûteux avec validation humaine', 'Un processus, jusqu’à trois systèmes connectés, agent principal, évaluation, monitoring, formation'],
  ['Transformation', '12 à 20 semaines', '49 900 à 89 900 € HT', 'Plusieurs workflows, plusieurs équipes ou architecture privée', 'Périmètre étendu défini au Blueprint'],
]

export function OffersTable() {
  return (
    <div className="m-table-wrap">
      <table className="m-table">
        <caption>Formules ByARMS : durée, prix hors taxes, cas d’usage et livrables clés. Prix et calendrier confirmés après cadrage.</caption>
        <thead>
          <tr><th scope="col">Formule</th><th scope="col">Durée</th><th scope="col">Prix</th><th scope="col">Pour qui</th><th scope="col">Livrables clés</th></tr>
        </thead>
        <tbody>
          {ROWS.map(([name, duration, price, who, deliverables]) => (
            <tr key={name}><th scope="row">{name}</th><td>{duration}</td><td>{price}</td><td>{who}</td><td>{deliverables}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
