export default function FinalCTA() {
  return (
    <section className="cf-section">
      <div className="cf-shell">
        <div className="cf-bar">
          <span><span className="cf-dot" />Let's build together</span>
          <span className="hide-mobile">Reply within 24h</span>
        </div>

        <div className="cf-grid c2" style={{ borderTop: 'none', position: 'relative' }}>
          <div className="cf-gridbg" />

          {/* Left */}
          <div className="cf-cell" style={{ background: 'transparent', padding: '72px clamp(24px, 4vw, 64px)' }}>
            <h2 className="cf-h2" style={{ marginBottom: 20 }}>
              Have an idea worth <em>building?</em>
            </h2>
            <p className="cf-lede" style={{ marginBottom: 36, fontSize: 16 }}>
              Let's turn it into a scalable product. Tell us what you're building and we'll get back to you within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Strategy call in 48 hours', 'Fixed-price or retainer — your choice', 'No NDAs required to start the conversation'].map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span className="cf-tag green" style={{ padding: '2px 5px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--cf-muted)', fontFamily: 'Inter' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Calendly CTA */}
          <div className="cf-cell ticks" style={{ padding: '72px clamp(24px, 4vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cf-dim)', marginBottom: 16 }}>
              30 min / Free
            </div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 26, letterSpacing: '-0.03em', color: '#fff', marginBottom: 14 }}>Book your session</h3>
            <p style={{ fontSize: 14, color: 'var(--cf-muted)', fontFamily: 'Inter', marginBottom: 28, lineHeight: 1.65 }}>
              Choose a time that works for you. We'll discuss your idea, technical requirements, and how we can help you build it.
            </p>
            <a
              href="https://calendly.com/helpdesk-avatecinteractives/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="cf-btn block"
              style={{ padding: 16 }}
            >
              Schedule on Calendly →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
