export const statuses = ['CONFIRME', 'HYPOTHESE', 'A_DECIDER', 'HORS_PERIMETRE'] as const
export type Answer = { value: string; status: typeof statuses[number]; owner: string; due: string }
export type Dossier = Record<string, Answer>
export const sections = [
  {id:'G1',title:'Votre organisation',description:'Qui porte le projet et prend les décisions ?',fields:[
    {id:'sponsor',label:'Sponsor et décideur',hint:'Nom, rôle et responsabilité dans le projet.'},
    {id:'owner',label:'Interlocuteur quotidien',hint:'Qui centralise les réponses et les validations ?'},
    {id:'organisation',label:'Activité et contexte',hint:'Ce que fait votre entreprise et pourquoi ce projet compte maintenant.'},
  ]},
  {id:'G2',title:'Vision et résultat',description:'Définir le problème avant de choisir la solution.',fields:[
    {id:'problem',label:'Le problème à résoudre',hint:'Décrivez la situation actuelle et ses conséquences.'},
    {id:'users',label:'Utilisateurs concernés',hint:'Qui rencontre le problème, à quelle fréquence ?'},
    {id:'success',label:'Résultat et métrique de réussite',hint:'Situation actuelle, cible et façon de mesurer.'},
  ]},
  {id:'G3',title:'Contexte et hypothèses',description:'Rendre visibles les faits et les questions ouvertes.',fields:[
    {id:'model',label:'Création de valeur',hint:'Qui utilise, qui paie, qui bénéficie ?'},
    {id:'alternatives',label:'Alternatives et expériences passées',hint:'Solutions existantes et enseignements.'},
    {id:'hypotheses',label:'Hypothèses à vérifier',hint:'Ce qui pourrait changer la direction du projet.'},
  ]},
  {id:'G4',title:'Périmètre et contraintes',description:'Convenir du parcours essentiel et de ses limites.',fields:[
    {id:'journey',label:'Parcours principal',hint:'Les étapes qui doivent fonctionner au lancement.'},
    {id:'excluded',label:'Hors périmètre',hint:'Ce qui peut attendre ou ne doit pas être construit.'},
    {id:'data',label:'Données et intégrations',hint:'Sources, outils et responsables des accès. Aucun secret ici.'},
    {id:'acceptance',label:'Critères d’acceptation',hint:'Comment saurez-vous que le résultat est acceptable ?'},
    {id:'human',label:'Contrôle humain et exceptions',hint:'Quelles décisions demandent une validation ? Quel repli en cas d’erreur ?',ai:true},
  ]},
  {id:'G5',title:'Préparer le kickoff',description:'Un calendrier et des responsabilités réalistes.',fields:[
    {id:'planning',label:'Échéance et dépendances',hint:'Date visée, indisponibilités et dépendances externes.'},
    {id:'validation',label:'Organisation des validations',hint:'Qui valide quoi, sous quel délai ?'},
    {id:'adoption',label:'Adoption et transfert',hint:'Formation, utilisateurs pilotes et maintenance après livraison.'},
  ]},
]
export function fieldsFor(offer:string) { return sections.flatMap(s=>s.fields.filter(f=>!('ai' in f)||offer==='ai')) }
export function completion(answers:Dossier,offer:string) { const fields=fieldsFor(offer);return {filled:fields.filter(f=>answers[f.id]?.value?.trim()).length,total:fields.length} }
export function validateDossier(value:unknown,offer:string):value is Dossier {
  if(!value||typeof value!=='object'||Array.isArray(value))return false
  const allowed=new Set(fieldsFor(offer).map(f=>f.id))
  return Object.entries(value).every(([id,a])=>allowed.has(id)&&a&&typeof a==='object'&&typeof a.value==='string'&&a.value.length<=5000&&statuses.includes(a.status)&&typeof a.owner==='string'&&a.owner.length<=120&&typeof a.due==='string'&&(!a.due||/^\d{4}-\d{2}-\d{2}$/.test(a.due)))
}
