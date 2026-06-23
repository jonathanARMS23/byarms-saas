'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

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

const toPrisma: Record<Status, string> = {
  'Nouveau':  'NOUVEAU',
  'En cours': 'EN_COURS',
  'Répondu':  'REPONDU',
  'Archivé':  'ARCHIVE',
}

const ALL_STATUSES: Status[] = ['Nouveau', 'En cours', 'Répondu', 'Archivé']

export function DemandesClient({ demandes }: { demandes: DemandeRow[] }) {
  const router = useRouter()
  const [rows, setRows] = useState<DemandeRow[]>(demandes)
  const [selected, setSelected] = useState<DemandeRow | null>(null)
  const [filter, setFilter] = useState<Status | 'Tous'>('Tous')
  const [updating, setUpdating] = useState(false)

  const updateStatus = useCallback(async (id: number, newStatus: Status) => {
    setUpdating(true)
    setRows(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r))
    setSelected(prev => prev?.id === id ? { ...prev, status: newStatus } : prev)
    try {
      await fetch(`/api/admin/demandes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: toPrisma[newStatus] }),
      })
      router.refresh()
    } finally {
      setUpdating(false)
    }
  }, [router])

  const handleRowClick = useCallback((row: DemandeRow) => {
    if (selected?.id === row.id) { setSelected(null); return }
    setSelected(row)
    if (row.status === 'Nouveau') updateStatus(row.id, 'En cours')
  }, [selected, updateStatus])

  const filtered = filter === 'Tous' ? rows : rows.filter(d => d.status === filter)
  const nbNouveau = rows.filter(d => d.status === 'Nouveau').length

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Demandes</h1>
        <p style={{ fontSize: '13px', color: 'oklch(44% 0.008 250)', marginTop: '4px' }}>
          {rows.length} demandes au total · {nbNouveau} nouvelle{nbNouveau > 1 ? 's' : ''}
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

      {rows.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'oklch(44% 0.008 250)', background: 'oklch(13% 0.014 250)', borderRadius: '12px', border: '1px solid oklch(21% 0.012 250)' }}>
          Aucune demande pour l&apos;instant. Les soumissions du formulaire apparaîtront ici.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '20px' }}>
          {/* Table */}
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
                    onClick={() => handleRowClick(d)}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid oklch(17% 0.012 250)' : 'none',
                      cursor: 'pointer',
                      background: selected?.id === d.id ? 'oklch(16% 0.014 250)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {d.status === 'Nouveau' && (
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'oklch(58% 0.18 255)', flexShrink: 0, display: 'inline-block' }} />
                        )}
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: d.status === 'Nouveau' ? 600 : 500, color: 'white' }}>{d.name}</div>
                          <div style={{ fontSize: '11px', color: 'oklch(42% 0.008 250)', marginTop: '2px' }}>{d.email}</div>
                        </div>
                      </div>
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

          {/* Detail panel */}
          {selected && (
            <div style={{ background: 'oklch(13% 0.014 250)', border: '1px solid oklch(21% 0.012 250)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignSelf: 'start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'white' }}>{selected.name}</div>
                  <div style={{ fontSize: '11px', color: 'oklch(42% 0.008 250)', marginTop: '2px' }}>{selected.date}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'oklch(44% 0.008 250)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
              </div>

              {/* Status pills */}
              <div>
                <div style={{ fontSize: '11px', color: 'oklch(40% 0.008 250)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Statut</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {ALL_STATUSES.map(s => {
                    const active = selected.status === s
                    return (
                      <button
                        key={s}
                        disabled={updating || active}
                        onClick={() => updateStatus(selected.id, s)}
                        style={{
                          padding: '4px 11px', borderRadius: '100px',
                          fontSize: '11px', fontWeight: 600,
                          background: active ? `${statusColor[s]}25` : 'oklch(16% 0.012 250)',
                          color: active ? statusColor[s] : 'oklch(44% 0.008 250)',
                          border: `1px solid ${active ? `${statusColor[s]}50` : 'oklch(22% 0.012 250)'}`,
                          cursor: active || updating ? 'default' : 'pointer',
                          fontFamily: 'inherit',
                          opacity: updating && !active ? 0.5 : 1,
                          transition: 'all 0.15s',
                        }}
                      >{s}</button>
                    )
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Row label="Email"     value={selected.email} />
                {selected.phone && <Row label="Téléphone" value={selected.phone} />}
                <Row label="Sujet"     value={selected.sujet} />
                {selected.budget && <Row label="Budget" value={selected.budget} accent />}
              </div>

              <div style={{ padding: '14px', background: 'oklch(16% 0.012 250)', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: 'oklch(40% 0.008 250)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</div>
                <p style={{ fontSize: '13px', color: 'oklch(68% 0.008 250)', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>{selected.message}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={`mailto:${selected.email}`} style={{ flex: 1, padding: '9px', textAlign: 'center', background: 'oklch(58% 0.18 255)', color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                  Répondre
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} style={{ flex: 1, padding: '9px', textAlign: 'center', background: 'oklch(16% 0.012 250)', color: 'oklch(64% 0.008 250)', border: '1px solid oklch(24% 0.012 250)', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                    Appeler
                  </a>
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
