export interface UseCase {
  slug: string
  name: string
  title: string
  description: string
  brief: string
  manual: string[]
  automated: string[]
  human: string[]
  systems: string[]
  metrics: string[]
  conditions: string[]
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'traitement-factures-fournisseurs',
    name: 'Traitement des factures fournisseurs',
    title: 'Automatiser le traitement des factures fournisseurs avec l’IA',
    description: 'Lecture des factures, rapprochement avec les commandes, saisie dans l’ERP et validation humaine des exceptions : ce qu’un système IA automatise et comment mesurer le gain.',
    brief: 'Le traitement des factures fournisseurs consiste à recevoir une facture, en extraire les données, la rapprocher d’une commande ou d’un contrat, la saisir dans l’outil comptable et la faire valider. Un système IA peut prendre en charge l’extraction, le rapprochement et la saisie, et réserver la validation humaine aux cas ambigus.',
    manual: ['Réception des factures par email, portail ou courrier numérisé', 'Lecture et ressaisie manuelle des montants, dates, références et lignes', 'Recherche de la commande ou du contrat correspondant', 'Saisie dans l’ERP ou l’outil comptable, puis circuit de validation', 'Relances et corrections quand une information manque'],
    automated: ['Extraction des données de la facture, quel que soit le format du fournisseur', 'Rapprochement automatique avec les commandes, contrats ou bons de livraison', 'Pré-saisie dans l’ERP avec les comptes et les centres de coût habituels', 'Détection des écarts : montant, quantité, fournisseur inconnu, doublon', 'File de validation qui ne présente à l’humain que les cas à trancher'],
    human: ['Validation des factures hors tolérance ou sans commande associée', 'Décision sur les fournisseurs nouveaux ou les écarts de prix', 'Approbation finale selon les seuils de délégation en vigueur'],
    systems: ['ERP ou logiciel comptable', 'Messagerie ou portail de réception des factures', 'Référentiel fournisseurs et commandes', 'Espace de stockage des pièces'],
    metrics: ['Temps de traitement moyen par facture, avant et après', 'Part des factures traitées sans intervention humaine', 'Taux d’exceptions et leur motif', 'Délai entre réception et validation', 'Nombre d’erreurs de saisie détectées en aval'],
    conditions: ['Un responsable comptable impliqué pour définir les règles et les tolérances', 'Un échantillon représentatif de factures pour construire le jeu d’évaluation', 'Un accès à l’ERP ou à son API, en lecture puis en écriture contrôlée'],
  },
  {
    slug: 'tri-et-reponse-emails-clients',
    name: 'Tri et réponse aux emails clients',
    title: 'Trier et préparer les réponses aux emails clients avec l’IA',
    description: 'Classement des demandes entrantes, extraction des informations, brouillons de réponse et transfert aux bonnes personnes, avec validation humaine avant envoi.',
    brief: 'Le tri des emails clients consiste à lire chaque message entrant, identifier la demande, retrouver le contexte du client et répondre ou transférer. Un système IA peut classer les messages, extraire les informations utiles et préparer un brouillon de réponse, tandis qu’une personne valide avant envoi.',
    manual: ['Lecture de chaque email entrant dans une boîte partagée', 'Identification du type de demande : commande, réclamation, question, facture', 'Recherche du dossier client dans le CRM ou l’outil de gestion', 'Rédaction de la réponse ou transfert au bon service', 'Suivi des demandes restées sans réponse'],
    automated: ['Classement des emails par type de demande et par priorité', 'Extraction des références : client, commande, produit, échéance', 'Brouillon de réponse à partir des informations du dossier et des réponses types', 'Transfert au service concerné avec un résumé', 'Tableau de suivi des demandes et des délais'],
    human: ['Validation ou modification du brouillon avant envoi', 'Traitement des réclamations sensibles et des demandes inhabituelles', 'Décisions commerciales : geste, remboursement, exception'],
    systems: ['Messagerie partagée', 'CRM ou outil de gestion client', 'Base de connaissances ou réponses types', 'Outil de tickets si l’équipe en utilise un'],
    metrics: ['Délai de première réponse', 'Part des emails classés correctement', 'Part des brouillons envoyés sans modification', 'Temps passé par demande', 'Volume de demandes en attente'],
    conditions: ['Un historique d’emails pour construire le jeu d’évaluation, anonymisé si nécessaire', 'Des réponses types ou une base de connaissances à jour', 'Une règle claire sur ce qui peut partir sans relecture et ce qui ne le peut pas'],
  },
  {
    slug: 'reporting-operationnel-automatise',
    name: 'Reporting opérationnel automatisé',
    title: 'Automatiser le reporting opérationnel avec l’IA',
    description: 'Collecte des données dans plusieurs outils, consolidation, rédaction du commentaire et diffusion du rapport, avec contrôle humain des chiffres et des conclusions.',
    brief: 'Le reporting opérationnel consiste à rassembler des chiffres dispersés dans plusieurs outils, les consolider dans un tableau et rédiger un commentaire pour la direction ou les équipes. Un système IA peut collecter, consolider, détecter les écarts et proposer le commentaire ; une personne contrôle les chiffres et valide les conclusions.',
    manual: ['Exports manuels depuis l’ERP, le CRM, la billetterie ou le tableur', 'Copier-coller et consolidation dans un tableau', 'Vérification des écarts et des doublons', 'Rédaction du commentaire et des points d’attention', 'Envoi du rapport et réponses aux questions'],
    automated: ['Collecte planifiée des données dans chaque outil connecté', 'Consolidation et contrôles de cohérence automatiques', 'Détection des variations inhabituelles par rapport aux périodes précédentes', 'Proposition de commentaire structuré, avec les chiffres sources', 'Diffusion du rapport au format et au moment convenus'],
    human: ['Contrôle des chiffres signalés comme inhabituels', 'Validation du commentaire et des conclusions', 'Décision sur les actions à engager'],
    systems: ['ERP, CRM ou outils métier sources', 'Tableur ou outil de visualisation', 'Messagerie ou espace de partage pour la diffusion'],
    metrics: ['Temps de production du rapport, avant et après', 'Délai entre la fin de période et la diffusion', 'Nombre d’erreurs détectées avant diffusion', 'Part des commentaires validés sans modification'],
    conditions: ['Des sources de données accessibles par export ou API', 'Une définition stable des indicateurs et de leur calcul', 'Un destinataire du rapport impliqué pour valider le format et le commentaire'],
  },
]

export function findUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find(u => u.slug === slug)
}
