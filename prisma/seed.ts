import { PrismaClient, DemandeStatus, AppelStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.demande.deleteMany()
  await prisma.appel.deleteMany()

  await prisma.demande.createMany({
    data: [
      { name: 'Marie Dupont',   email: 'marie@saas-co.fr',       phone: '+33 6 12 34 56 78', sujet: 'Application SaaS B2B',  message: 'Bonjour, je cherche une agence pour développer une application SaaS RH complète avec un tableau de bord admin, une gestion des employés et une API REST.', budget: '15 000 – 25 000 €', status: DemandeStatus.NOUVEAU },
      { name: 'Thomas Klein',   email: 'thomas@fintech-x.com',   phone: '+49 151 234 567',   sujet: 'Intégration LLM',        message: "Notre plateforme fintech a besoin d'un module d'analyse de documents avec GPT-4 + RAG. Besoin d'une estimation rapide.", budget: '8 000 – 12 000 €', status: DemandeStatus.NOUVEAU },
      { name: 'Sofia Almeida',  email: 'sofia@startup-rh.io',    phone: '+351 912 345 678',  sujet: 'MVP React Native',       message: 'Application mobile RH pour iOS et Android. Fonctionnalités : pointage, congés, messagerie interne. MVP en 6 semaines.', budget: '10 000 – 18 000 €', status: DemandeStatus.EN_COURS },
      { name: 'Ahmed Nasser',   email: 'ahmed@consulting-ai.ma', phone: '+212 6 61 234 567', sujet: 'API NestJS + Supabase',  message: "Backend API pour notre plateforme de mise en relation consultants / entreprises. Authentification, profils, matching IA.", budget: '5 000 – 8 000 €', status: DemandeStatus.REPONDU },
      { name: 'Léa Fontaine',   email: 'lea@digital-agence.fr',  phone: '+33 7 98 76 54 32', sujet: 'Dashboard Analytics',    message: 'Dashboard temps réel pour notre agence. Visualisation des KPIs clients, intégration Google Analytics et Meta Ads.', budget: '6 000 – 10 000 €', status: DemandeStatus.REPONDU },
      { name: 'Youssef Benali', email: 'y.benali@ecom-ma.com',   phone: '+212 5 22 345 678', sujet: 'E-commerce B2C',         message: 'Site e-commerce pour vêtements de luxe. Catalogue produits, paiement en ligne (CMI + PayPal), gestion stocks.', budget: '20 000 – 35 000 €', status: DemandeStatus.ARCHIVE },
    ],
  })

  await prisma.appel.createMany({
    data: [
      { name: 'Marie Dupont',  email: 'marie@saas-co.fr',       type: 'Découverte 30 min', date: new Date('2026-06-24T09:00:00Z'), heure: '10h00', status: AppelStatus.CONFIRME,   lien: 'https://meet.google.com/abc-defg-hij', notes: "Application SaaS RH — budget autour de 20k€. Décideuse principale." },
      { name: 'Thomas Klein',  email: 'thomas@fintech-x.com',   type: 'Démo technique',    date: new Date('2026-06-25T13:30:00Z'), heure: '14h30', status: AppelStatus.CONFIRME,   lien: 'https://meet.google.com/xyz-uvw-rst', notes: "Veut voir ADA en action sur un cas d'usage fintech." },
      { name: 'Karim Mensah',  email: 'karim@agri-tech.org',    type: 'Découverte 30 min', date: new Date('2026-06-26T08:00:00Z'), heure: '09h00', status: AppelStatus.EN_ATTENTE, lien: '', notes: 'Startup agri-tech, plateforme de mise en relation agriculteurs / acheteurs.' },
      { name: 'Sofia Almeida', email: 'sofia@startup-rh.io',    type: 'Suivi projet',      date: new Date('2026-06-27T10:00:00Z'), heure: '11h00', status: AppelStatus.CONFIRME,   lien: 'https://meet.google.com/mno-pqr-stu', notes: 'Point sprint semaine 2. Vérification des specs React Native.' },
      { name: 'Ahmed Nasser',  email: 'ahmed@consulting-ai.ma', type: 'Découverte 30 min', date: new Date('2026-06-19T14:00:00Z'), heure: '15h00', status: AppelStatus.TERMINE,    lien: '', notes: 'Bon appel. Devis envoyé pour backend NestJS + Supabase. Signature prévue.' },
      { name: 'Léa Fontaine',  email: 'lea@digital-agence.fr',  type: 'Découverte 30 min', date: new Date('2026-06-16T09:30:00Z'), heure: '10h30', status: AppelStatus.ANNULE,     lien: '', notes: "Client a annulé 2h avant. Relance par email envoyée." },
    ],
  })

  console.log('✅ Seed terminé — 6 demandes + 6 appels insérés')
}

main().catch(console.error).finally(() => prisma.$disconnect())
