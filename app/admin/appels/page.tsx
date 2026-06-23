import { prisma } from '@/lib/prisma'
import { AppelStatus } from '@prisma/client'
import { AppelsClient } from './AppelsClient'

export const dynamic = 'force-dynamic'

const statusLabel: Record<AppelStatus, 'Confirmé' | 'En attente' | 'Terminé' | 'Annulé'> = {
  CONFIRME:   'Confirmé',
  EN_ATTENTE: 'En attente',
  TERMINE:    'Terminé',
  ANNULE:     'Annulé',
}

function formatDate(d: Date) {
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function AppelsPage() {
  const rows = await prisma.appel.findMany({ orderBy: { date: 'asc' } })

  const appels = rows.map(a => ({
    id:     a.id,
    name:   a.name,
    email:  a.email,
    type:   a.type,
    date:   formatDate(a.date),
    heure:  a.heure,
    status: statusLabel[a.status],
    notes:  a.notes,
    lien:   a.lien,
  }))

  return <AppelsClient appels={appels} />
}
