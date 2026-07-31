/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const brandLogos = [
    { src: '/clients/dreammedia.png', alt: 'Dream Media' },
    { src: '/clients/hos.png', alt: 'HOS' },
    { src: '/clients/ojuse.png', alt: 'Ojuse' },
    { src: '/clients/farmlife.png', alt: 'farmlife' },
  ]

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'visible',
      paddingTop: 72,
      /* Deep navy matching the screenshot */
      background: 'linear-gradient(160deg, #08071a 0%, #0d0b22 40%, #0b0918 75%, #06050f 100%)',
    }}>

      {/* ── Background glow blobs — wine + deep purple to match theme ── */}
      <div style={{
        position: 'absolute', top: '-5%', left: '-8%',
        width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(107,15,26,0.28) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '5%',
        width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(80,10,80,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '0%', right: '10%',
        width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(107,15,26,0.15) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        pointerEvents: 'none',
      }} />

      {/* ── Main content grid ── */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '60px 48px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.6fr',
        gap: 0,
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── LEFT: headline + CTA ── */}
        <div style={{ animation: 'fade-up 0.9s ease-out forwards' }}>
          <h1 style={{
            fontFamily: 'Outfit',
            fontWeight: 900,
            fontSize: 'clamp(58px, 7vw, 96px)',
            color: '#ffffff',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: 32,
          }}>
            We build{' '}
            <span style={{ color: '#ab0924' }}>software</span>
            <br />
            to{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              scale
              <span style={{
                position: 'absolute', bottom: -6, left: 0, right: 0,
                height: 8, borderRadius: 4,
                background: 'linear-gradient(90deg, #ab0924, #e184a6)',
                opacity: 0.85,
              }} />
            </span>
          </h1>

          <p style={{
            fontFamily: 'Inter',
            fontSize: 17,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            marginBottom: 44,
            maxWidth: 480,
          }}>
            Avatec Interactives designs and engineers scalable web apps, mobile apps, AI-powered products, and custom business systems for startups and global companies.
          </p>

          <button
            style={{
              fontFamily: 'Outfit', fontWeight: 700, fontSize: 16,
              color: '#111', background: '#ffffff', border: 'none',
              borderRadius: 100, padding: '16px 36px', cursor: 'pointer',
              transition: 'all 0.25s ease', display: 'inline-flex',
              alignItems: 'center', gap: 8,
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => {
              ; (e.currentTarget as HTMLButtonElement).style.background = '#f0eaff'
                ; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                ; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(255, 107, 107, 0.35)'
            }}
            onMouseLeave={e => {
              ; (e.currentTarget as HTMLButtonElement).style.background = '#ffffff'
                ; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                ; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
            }}
          >
            Visit Our Portfolio
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Trusted-by logos */}
          <div style={{ marginTop: 56 }}>
            <p style={{
              fontFamily: 'Inter', fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: 18,
            }}>
              Trusted by
            </p>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              {brandLogos.map(logo => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    height: 52,
                    objectFit: 'contain',
                    opacity: 0.5,
                    transition: 'opacity 0.2s, transform 0.2s',
                    cursor: 'default',
                    // Turns logos solid white. Remove filter if original colors are desired.
                  }}
                  onMouseEnter={e => {
                    ; (e.currentTarget as HTMLImageElement).style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    ; (e.currentTarget as HTMLImageElement).style.opacity = '0.5'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: hero image ── */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: -48,
          overflow: 'visible',
        }}>
          <img
            src="/hero.png"
            alt="Avatec platform illustration"
            style={{
              width: '160%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              filter: 'drop-shadow(0 40px 100px rgba(107,15,26,0.35))',
            }}
          />
        </div>

      </div>
    </section>
  )
}
