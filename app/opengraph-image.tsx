import { ImageResponse } from 'next/og'

export const alt = 'ByARMS — Produits logiciels et systèmes IA, powered by ADA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #141827 100%)',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, letterSpacing: 4, color: '#9aa3b5' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#4f7cff' }} />
          STUDIO D’INGÉNIERIE · POWERED BY ADA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>ByARMS</div>
          <div style={{ fontSize: 44, lineHeight: 1.25, maxWidth: 1000, color: '#d5d9e3' }}>
            Produits logiciels et systèmes IA, livrés au forfait.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#9aa3b5' }}>
          <span>byarms.com</span>
          <span>Product Launch · AI Operations</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
