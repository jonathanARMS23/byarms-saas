'use client'
import { useState } from 'react'

type Status = 'Nouveau' | 'En cours' | 'Répondu' | 'Archivé'

export type DemandeRow = {
  id: number
  name: string
  email: string
  phone: string
  sujet: string
  message: string
  budget: string
  status: Status
  date: string
}

const statusColor: Record<Status, string> = {
  'Nouveau':  'oklch(58% 0.18 255)',
  'En cours': 'oklch(58% 0.16 55)',
  'Répondu':  'oklch(55% 0.16 145)',
  'Archivé':  'oklch(44% 0.008 250)',
}

export function DemandesClient({ demandes }: { demandes: DemandeRow[] }) {
  const [selected, setSelected] = useState<DemandeRow | null>(null)
  const [filter, setFilter] = useState<Status | 'Tous'>('Tous')

  const filtered = filter === 'Tous' ? demandes : demandes.filter(d => d.status === filter)
  const nbNouveau = demandes.filter(d => d.status === 'Nouveau').length

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Demandes</h1>
        <p style={{ fontSize: '13px', color: 'oklch(44% 0.008 250)', marginTop: '4px' }}>
          {demandes.length} demandes au total · {nbNouveau} nouvelle{nbNouveau > 1 ? 's' : ''}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {(['Tous', 'Nouveau', 'En cours', 'Répondu', 'Archivé'] as const).map(f => (
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

      {demandes.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'oklch(44% 0.008 250)', background: 'oklch(13% 0.014 250)', borderRadius: '12px', border: '1px solid oklch(21% 0.012 250)' }}>
          Aucune demande pour l'instant. Les soumissions du formulaire apparaîtront ici.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '20px' }}>
          <div style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid oklch(19% 0.012 250)' }}>
                  {['Client', 'Sujet', 'Budget', 'Date', 'Statut'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', color: 'oklch(42% 0.008 250)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelected(selected?.id === d.id ? null : d)}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid oklch(17% 0.012 250)' : 'none',
                      cursor: 'pointer',
                      background: selected?.id === d.id ? 'oklch(16% 0.014 250)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'white' }}>{d.name}</div>
                      <div style={{ fontSize: '11px', color: 'oklch(42% 0.008 250)', marginTop: '2px' }}>{d.email}</div>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: '13px', color: 'oklch(64% 0.008 250)' }}>{d.sujet}</td>
                    <td style={{ padding: '13px 16px', fontSize: '12px', color: 'oklch(58% 0.18 255)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{d.budget || '—'}</td>
                    <td style={{ padding: '13px 16px', fontSize: '12px', color: 'oklch(42% 0.008 250)', whiteSpace: 'nowrap' }}>{d.date}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '100px',
                        fontSize: '10px', fontWeight: 600,
                        background: `${statusColor[d.status]}20`,
                        color: statusColor[d.status],
                        border: `1px solid ${statusColor[d.status]}40`,
                      }}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected && (
            <div style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignSelf: 'start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'white' }}>{selected.name}</div>
                  <div style={{ fontSize: '11px', color: 'oklch(42% 0.008 250)', marginTop: '2px' }}>{selected.date}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'oklch(44% 0.008 250)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Row label="Email"     value={selected.email} />
                {selected.phone && <Row label="Téléphone" value={selected.phone} />}
                <Row label="Sujet"     value={selected.sujet} />
                {selected.budget && <Row label="Budget" value={selected.budget} accent />}
              </div>
              <div style={{ padding: '14px', background: 'oklch(16% 0.012 250)', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: 'oklch(40% 0.008 250)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</div>
                <p style={{ fontSize: '13px', color: 'oklch(68% 0.008 250)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={`mailto:${selected.email}`} style={{ flex: 1, padding: '9px', textAlign: 'center', background: 'oklch(58% 0.18 255)', color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Répondre</a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} style={{ flex: 1, padding: '9px', textAlign: 'center', background: 'oklch(16% 0.012 250)', color: 'oklch(64% 0.008 250)', border: '1px solid oklch(24% 0.012 250)', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>Appeler</a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <span style={{ fontSize: '11px', color: 'oklch(40% 0.008 250)', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', color: accent ? 'oklch(58% 0.18 255)' : 'oklch(70% 0.008 250)', textAlign: 'right', fontFamily: accent ? 'monospace' : 'inherit' }}>{value}</span>
    </div>
  )
}
