import { prisma } from '@/lib/prisma'
import { DemandeStatus } from '@prisma/client'
import { DemandesClient } from './DemandesClient'

export const dynamic = 'force-dynamic'

const statusLabel: Record<DemandeStatus, 'Nouveau' | 'En cours' | 'Répondu' | 'Archivé'> = {
  NOUVEAU:  'Nouveau',
  EN_COURS: 'En cours',
  REPONDU:  'Répondu',
  ARCHIVE:  'Archivé',
}

function formatDate(d: Date) {
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function DemandesPage() {
  const rows = await prisma.demande.findMany({ orderBy: { createdAt: 'desc' } })

  const demandes = rows.map(d => ({
    id:      d.id,
    name:    d.name,
    email:   d.email,
    phone:   d.phone,
    sujet:   d.sujet,
    message: d.message,
    budget:  d.budget,
    status:  statusLabel[d.status],
    date:    formatDate(d.createdAt),
  }))

  return <DemandesClient demandes={demandes} />
}
