'use client'
import { useState } from 'react'

type AStatus = 'Confirmé' | 'En attente' | 'Terminé' | 'Annulé'

export type AppelRow = {
  id: number
  name: string
  email: string
  type: string
  date: string
  heure: string
  status: AStatus
  notes: string
  lien: string
}

const statusColor: Record<AStatus, string> = {
  'Confirmé':   'oklch(55% 0.16 145)',
  'En attente': 'oklch(58% 0.16 55)',
  'Terminé':    'oklch(44% 0.008 250)',
  'Annulé':     'oklch(55% 0.2 27)',
}

export function AppelsClient({ appels }: { appels: AppelRow[] }) {
  const [selected, setSelected] = useState<AppelRow | null>(null)
  const [filter, setFilter] = useState<AStatus | 'Tous'>('Tous')

  const filtered = filter === 'Tous' ? appels : appels.filter(a => a.status === filter)
  const aVenir = appels.filter(a => a.status === 'Confirmé' || a.status === 'En attente').length

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Appels</h1>
        <p style={{ fontSize: '13px', color: 'oklch(44% 0.008 250)', marginTop: '4px' }}>
          {appels.length} appels total · {aVenir} à venir
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {(['Tous', 'Confirmé', 'En attente', 'Terminé', 'Annulé'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: '100px',
            background: filter === f ? 'oklch(58% 0.18 255)' : 'oklch(16% 0.012 250)',
            color: filter === f ? 'white' : 'oklch(50% 0.008 250)',
            border: `1px solid ${filter === f ? 'oklch(58% 0.18 255)' : 'oklch(24% 0.012 250)'}`,
            fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}>{f}</button>
        ))}
      </div>

      {appels.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'oklch(44% 0.008 250)', background: 'oklch(13% 0.014 250)', borderRadius: '12px', border: '1px solid oklch(21% 0.012 250)' }}>
          Aucun appel pour l'instant. Les réservations Calendly apparaîtront ici.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px' }}>
          <div style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid oklch(19% 0.012 250)' }}>
                  {['Date', 'Client', 'Type', 'Heure', 'Statut'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', color: 'oklch(42% 0.008 250)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => {
                  const parts = a.date.split(' ')
                  return (
                    <tr
                      key={a.id}
                      onClick={() => setSelected(selected?.id === a.id ? null : a)}
                      style={{
                        borderBottom: i < filtered.length - 1 ? '1px solid oklch(17% 0.012 250)' : 'none',
                        cursor: 'pointer',
                        background: selected?.id === a.id ? 'oklch(16% 0.014 250)' : 'transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      <td style={{ padding: '13px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'oklch(58% 0.18 255 / 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <div style={{ fontSize: '8px', color: 'oklch(58% 0.18 255)', fontWeight: 700, letterSpacing: '0.04em' }}>{parts[2]?.slice(0, 3).toUpperCase()}</div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: 'oklch(58% 0.18 255)', lineHeight: 1 }}>{parts[0]}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: 'white' }}>{a.name}</div>
                        <div style={{ fontSize: '11px', color: 'oklch(42% 0.008 250)', marginTop: '2px' }}>{a.email}</div>
                      </td>
                      <td style={{ padding: '13px 16px', fontSize: '13px', color: 'oklch(60% 0.008 250)' }}>{a.type}</td>
                      <td style={{ padding: '13px 16px', fontSize: '13px', fontFamily: 'monospace', color: 'oklch(64% 0.008 250)' }}>{a.heure}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: '100px',
                          fontSize: '10px', fontWeight: 600,
                          background: `${statusColor[a.status]}20`,
                          color: statusColor[a.status],
                          border: `1px solid ${statusColor[a.status]}40`,
                        }}>{a.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {selected && (
            <div style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignSelf: 'start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'white' }}>{selected.name}</div>
                  <div style={{ fontSize: '11px', color: 'oklch(42% 0.008 250)', marginTop: '2px' }}>{selected.date} · {selected.heure}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'oklch(44% 0.008 250)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Email', value: selected.email },
                  { label: 'Type', value: selected.type },
                  { label: 'Heure', value: selected.heure },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: 'oklch(40% 0.008 250)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.label}</span>
                    <span style={{ fontSize: '13px', color: 'oklch(68% 0.008 250)' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              {selected.notes && (
                <div style={{ padding: '14px', background: 'oklch(16% 0.012 250)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'oklch(40% 0.008 250)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notes</div>
                  <p style={{ fontSize: '13px', color: 'oklch(66% 0.008 250)', lineHeight: 1.6 }}>{selected.notes}</p>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selected.lien && (
                  <a href={selected.lien} target="_blank" rel="noopener noreferrer" style={{ padding: '10px', textAlign: 'center', background: 'oklch(55% 0.16 145)', color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                    Rejoindre Google Meet
                  </a>
                )}
                <a href={`mailto:${selected.email}`} style={{ padding: '10px', textAlign: 'center', background: 'oklch(16% 0.012 250)', color: 'oklch(64% 0.008 250)', border: '1px solid oklch(24% 0.012 250)', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                  Envoyer un email
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
