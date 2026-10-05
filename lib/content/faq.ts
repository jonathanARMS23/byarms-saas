export interface FaqItem {
  q: string
  a: string
  link?: { href: string; label: string }
}

/**
 * Questions fréquentes des pages d'offre. Source unique : rendue dans
 * components/OfferPage.tsx et sérialisée en FAQPage dans lib/schema.ts,
 * pour que le balisage reste identique au texte visible.
 */
export function offerFaq(ai: boolean): FaqItem[] {
  const after = ai ? 'AI Continuous Improvement à partir de 3 900 € HT par mois' : 'Product Evolution Partner à partir de 5 900 € HT par mois'
  const items: FaqItem[] = [
    {
      q: 'Que se passe-t-il si le périmètre évolue ?',
      a: 'Nous documentons la demande, son impact sur le budget et le calendrier, puis la soumettons à votre validation avant réalisation.',
    },
    {
      q: 'Quel engagement sur le délai ?',
      a: 'Le cadre proposé prévoit 10 % du prix non dus en cas de retard exclusivement imputable à ByARMS. Les critères et exclusions sont précisés au contrat, notamment les retards d’accès et de validation côté client.',
    },
    {
      q: 'Et après la mise en production ?',
      a: `${after}, avec engagement minimum de trois mois : suivi, optimisation et évolutions selon le périmètre convenu.`,
    },
    {
      q: 'Quelle place pour ADA ?',
      a: 'ADA est notre AI Engineering OS multi-engine, appuyé sur Claude Code et Codex. Il réunit mémoire projet, agents spécialisés et contrôles d’exécution. Notre équipe supervise les interventions et valide les livrables. ADA est notre outil d’ingénierie, pas nécessairement le système installé chez vous.',
      link: { href: '/ada', label: 'Comprendre ADA, notre AI Engineering OS' },
    },
    {
      q: 'Qui détient le code et la documentation ?',
      a: 'Vous. Le code source, la documentation, les dépendances et les accès font partie de la livraison. Les droits et conditions sont précisés au contrat.',
      link: { href: '/confiance', label: 'Nos engagements sur le code, les données et la responsabilité' },
    },
    {
      q: 'Que couvre le prix du forfait ?',
      a: ai
        ? '29 900 € HT couvrent les 8 semaines de réalisation : cadrage du processus, conception du système, connexion à vos outils, évaluation sur un jeu de cas, mise en production, documentation et formation. Les services tiers, comme les modèles ou l’hébergement, et les changements de périmètre sont exclus.'
        : '34 900 € HT couvrent les 10 semaines de réalisation : cadrage du parcours prioritaire, UX/UI, développement, tests, déploiement, documentation et transfert. Les services tiers, comme l’hébergement ou les licences, et les changements de périmètre sont exclus.',
    },
    {
      q: 'Quelle différence entre le Blueprint et la réalisation ?',
      a: 'Le Blueprint est une phase de cadrage de 10 jours à 4 900 € HT. Il produit un périmètre prioritaire, les risques et les éléments de budget pour décider de poursuivre, réorienter ou arrêter. La réalisation engage ensuite le forfait complet sur ce périmètre.',
    },
    {
      q: 'Comment l’humain garde-t-il le contrôle sur l’IA ?',
      a: 'ADA encadre les moteurs d’IA avec des permissions, des contrats d’exécution et un suivi des sessions. Notre équipe examine les propositions, exécute les tests et valide chaque livrable. Aucun code n’est livré sans revue humaine.',
    },
    {
      q: 'Travaillez-vous à distance ?',
      a: 'Oui. ByARMS est une équipe distribuée francophone qui travaille entièrement à distance. Vous avez un interlocuteur francophone, une démonstration hebdomadaire et une validation à chaque jalon.',
    },
  ]
  if (ai) {
    items.push(
      {
        q: 'Quels processus se prêtent à l’automatisation par IA ?',
        a: 'Les processus répétitifs, à volume régulier, avec des règles explicites et des exceptions identifiables : traitement de factures ou de documents, tri et réponse aux emails, saisie entre deux systèmes, production de rapports. Le Blueprint confirme la pertinence sur votre cas.',
        link: { href: '/cas-usage', label: 'Voir les cas d’usage AI Operations' },
      },
      {
        q: 'Comment mesure-t-on le gain ?',
        a: 'Avant la réalisation, nous mesurons la baseline, c’est-à-dire la situation de départ : volumes, temps de traitement, taux d’erreurs. Après la mise en production, les mêmes indicateurs sont comparés sur un jeu de cas représentatifs, avec un suivi des exceptions.',
      },
    )
  } else {
    items.push({
      q: 'Et si mon produit nécessite une application mobile ou des intégrations complexes ?',
      a: 'Web et mobile, marketplace ou intégrations complexes relèvent de la formule Advanced, de 49 900 à 79 900 € HT sur 12 à 16 semaines. Le Blueprint permet de choisir la bonne formule avant d’engager le budget.',
    })
  }
  return items
}
