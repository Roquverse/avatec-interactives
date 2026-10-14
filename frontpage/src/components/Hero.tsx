/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const brandLogos = [
    { src: '/clients/dreammedia.png', alt: 'Dream Media' },
    { src: '/clients/hos.png', alt: 'HOS' },
    { src: '/clients/ojuse.png', alt: 'Ojuse' },
    { src: '/clients/farmlife.png', alt: 'farmlife' },
  ]

  return (
    <section className="cf-hero" style={{ paddingTop: 58, position: 'relative' }}>
      <div className="cf-shell full">
        <div className="cf-bar">
          <span><span className="cf-dot" />Avatec Interactives</span>
          <span className="hide-mobile">Software studio / Est. 8+ years</span>
        </div>

        <div className="cf-grid cf-hero-grid" style={{ borderTop: 'none', position: 'relative' }}>
          <div className="cf-gridbg" />

          {/* LEFT: headline + CTA */}
          <div className="cf-cell cf-rise" style={{ background: 'transparent', padding: '72px clamp(24px, 4vw, 64px) 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="cf-h1" style={{ marginBottom: 28 }}>
              We build software to <em>scale.</em>
            </h1>

            <p className="cf-lede" style={{ marginBottom: 36, fontSize: 16, maxWidth: 480 }}>
              Avatec Interactives designs and engineers scalable web apps, mobile apps, AI-powered products, and custom business systems for startups and global companies.
            </p>

            <div>
              <button className="cf-btn">
                Visit Our Portfolio
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Trusted-by logos */}
            <div style={{ marginTop: 56 }}>
              <p style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, color: 'var(--cf-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Trusted by
              </p>
              <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
                {brandLogos.map(logo => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    style={{ height: 44, objectFit: 'contain', opacity: 0.5, transition: 'opacity 0.2s', cursor: 'default' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.5' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: hero image in a framed cell */}
          <div className="cf-cell ticks hide-mobile" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <img className="cf-hero-img"
              src="/hero.png"
              alt="Avatec platform illustration"
              style={{ width: '100%', maxWidth: 820, height: 'auto', display: 'block', objectFit: 'contain', filter: 'drop-shadow(0 30px 80px rgba(171,9,36,0.35))' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
