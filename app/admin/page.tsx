import { prisma } from '@/lib/prisma'
import { DemandeStatus, AppelStatus } from '@prisma/client'

const statusLabel: Record<string, string> = {
  NOUVEAU: 'Nouveau', EN_COURS: 'En cours', REPONDU: 'Répondu', ARCHIVE: 'Archivé',
  CONFIRME: 'Confirmé', EN_ATTENTE: 'En attente', TERMINE: 'Terminé', ANNULE: 'Annulé',
}
const statusColor: Record<string, string> = {
  NOUVEAU: 'oklch(58% 0.18 255)', EN_COURS: 'oklch(58% 0.16 55)',
  REPONDU: 'oklch(55% 0.16 145)', ARCHIVE: 'oklch(44% 0.008 250)',
  CONFIRME: 'oklch(55% 0.16 145)', EN_ATTENTE: 'oklch(58% 0.16 55)',
  TERMINE: 'oklch(44% 0.008 250)', ANNULE: 'oklch(55% 0.2 27)',
}

export default async function AdminDashboard() {
  const [demandes, appels] = await Promise.all([
    prisma.demande.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.appel.findMany({ orderBy: { date: 'asc' } }),
  ])

  const nouvellesDemandes = demandes.filter(d => d.status === DemandeStatus.NOUVEAU).length
  const enCours          = demandes.filter(d => d.status === DemandeStatus.EN_COURS).length
  const appelsAVenir     = appels.filter(a => a.status === AppelStatus.CONFIRME || a.status === AppelStatus.EN_ATTENTE)

  const STATS = [
    { label: 'Demandes reçues',  value: String(demandes.length), delta: `+${nouvellesDemandes} nouvelle${nouvellesDemandes > 1 ? 's' : ''}`, color: 'oklch(58% 0.18 255)' },
    { label: 'Appels planifiés', value: String(appelsAVenir.length), delta: 'à venir', color: 'oklch(55% 0.16 145)' },
    { label: 'En cours',         value: String(enCours), delta: 'en traitement', color: 'oklch(58% 0.16 55)' },
    { label: 'Projets terminés', value: '9', delta: '9 startups total', color: 'oklch(55% 0.18 300)' },
  ]

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Vue d&apos;ensemble</h1>
        <p style={{ fontSize: '13px', color: 'oklch(44% 0.008 250)', marginTop: '4px' }}>
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '11px', color: 'oklch(44% 0.008 250)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'oklch(40% 0.008 250)', marginTop: '6px' }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Dernières demandes */}
        <div style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Dernières demandes</div>
            <a href="/admin/demandes" style={{ fontSize: '12px', color: 'oklch(58% 0.18 255)', textDecoration: 'none' }}>Voir tout →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {demandes.slice(0, 4).map(d => (
              <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'oklch(16% 0.012 250)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'white' }}>{d.name}</div>
                  <div style={{ fontSize: '11px', color: 'oklch(44% 0.008 250)', marginTop: '2px' }}>{d.sujet}</div>
                </div>
                <span style={{ padding: '3px 9px', borderRadius: '100px', fontSize: '10px', fontWeight: 600, background: `${statusColor[d.status]}22`, color: statusColor[d.status], border: `1px solid ${statusColor[d.status]}44` }}>
                  {statusLabel[d.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Prochains appels */}
        <div style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Prochains appels</div>
            <a href="/admin/appels" style={{ fontSize: '12px', color: 'oklch(58% 0.18 255)', textDecoration: 'none' }}>Voir tout →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {appelsAVenir.slice(0, 4).map(a => {
              const d = new Date(a.date)
              return (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'oklch(16% 0.012 250)', borderRadius: '8px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'oklch(58% 0.18 255 / 0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: '8px', color: 'oklch(58% 0.18 255)', fontWeight: 700 }}>{d.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'oklch(58% 0.18 255)', lineHeight: 1 }}>{d.getDate()}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                    <div style={{ fontSize: '11px', color: 'oklch(44% 0.008 250)', marginTop: '2px' }}>{a.type} · {a.heure}</div>
                  </div>
                  <span style={{ padding: '3px 9px', borderRadius: '100px', flexShrink: 0, fontSize: '10px', fontWeight: 600, background: `${statusColor[a.status]}22`, color: statusColor[a.status], border: `1px solid ${statusColor[a.status]}44` }}>
                    {statusLabel[a.status]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
