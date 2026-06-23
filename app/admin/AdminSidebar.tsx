'use client'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Props = { demandesBadge: number; appelsBadge: number }

export function AdminSidebar({ demandesBadge, appelsBadge }: Props) {
  const pathname = usePathname()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const NAV = [
    { href: '/admin',          icon: '⬛', label: "Vue d'ensemble", badge: 0 },
    { href: '/admin/demandes', icon: '📨', label: 'Demandes',       badge: demandesBadge },
    { href: '/admin/appels',   icon: '📞', label: 'Appels',         badge: appelsBadge },
  ]

  return (
    <aside style={{
      width: '240px', flexShrink: 0,
      background: 'oklch(12% 0.014 250)',
      borderRight: '1px solid oklch(20% 0.012 250)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0,
    }}>
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid oklch(18% 0.012 250)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <Image src="/byarms-logo.png" alt="ByARMS" fill style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>ByARMS</div>
            <div style={{ fontSize: '10px', color: 'oklch(38% 0.008 250)', fontFamily: 'monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 12px', borderRadius: '8px',
              fontSize: '13px', fontWeight: active ? 600 : 400,
              color: active ? 'white' : 'oklch(48% 0.008 250)',
              background: active ? 'oklch(20% 0.014 250)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '15px' }}>{item.icon}</span>
              {item.label}
              {item.badge > 0 && (
                <span style={{
                  marginLeft: 'auto', background: 'oklch(58% 0.18 255)',
                  color: 'white', borderRadius: '100px',
                  fontSize: '10px', fontWeight: 700,
                  padding: '1px 7px',
                }}>{item.badge}</span>
              )}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid oklch(18% 0.012 250)' }}>
        <div style={{ fontSize: '11px', color: 'oklch(36% 0.008 250)', marginBottom: '10px', paddingLeft: '4px' }}>
          Jonathan ARMS
        </div>
        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 12px', width: '100%', borderRadius: '7px',
          background: 'transparent', border: 'none',
          color: 'oklch(46% 0.008 250)', fontSize: '12px',
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'color 0.15s',
        }}>
          <span>↩</span> Déconnexion
        </button>
      </div>
    </aside>
  )
}
