import { prisma } from '@/lib/prisma'
import { AdminSidebar } from './AdminSidebar'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let demandesBadge = 0
  let appelsBadge = 0

  try {
    ;[demandesBadge, appelsBadge] = await Promise.all([
      prisma.demande.count({ where: { status: 'NOUVEAU' } }),
      prisma.appel.count({ where: { status: 'EN_ATTENTE' } }),
    ])
  } catch {
    // DB not yet ready
  }

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: 'oklch(9% 0.012 250)',
      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    }}>
      <AdminSidebar demandesBadge={demandesBadge} appelsBadge={appelsBadge} />
      <main style={{ marginLeft: '240px', flex: 1, padding: '32px 36px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
