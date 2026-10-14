const points = [
  { num: '01', title: 'Product-first thinking',       desc: 'We obsess over outcomes, not outputs. Every technical decision is tied to your business goals.' },
  { num: '02', title: 'AI-accelerated development',   desc: 'Our AI-augmented workflows mean faster iterations, smarter code reviews, and more features in less time.' },
  { num: '03', title: 'Radical transparency',         desc: 'Weekly demos, public roadmaps, and direct access to the engineers building your product.' },
  { num: '04', title: 'Scalable architecture',        desc: 'Built to handle 100 users today and 100,000 tomorrow without expensive rewrites.' },
  { num: '05', title: 'Long-term partnership',        desc: "We don't disappear after launch. Most clients work with us for 2+ years as their product evolves." },
]

export default function WhyAvatec() {
  return (
    <section className="cf-section">
      <div className="cf-shell">
        <div className="cf-bar">
          <span><span className="cf-dot" />04 — Why Avatec</span>
          <span>{String(points.length).padStart(2, '0')} Reasons</span>
        </div>

        <div className="cf-grid c2" style={{ borderTop: 'none' }}>
          {/* Left */}
          <div className="cf-cell cf-cell-pad" style={{ padding: '64px clamp(24px, 4vw, 64px)', background: 'transparent' }}>
            <h2 className="cf-h2" style={{ marginBottom: 24, fontSize: 'clamp(36px, 4.2vw, 54px)' }}>
              Why founders <em>choose us.</em>
            </h2>
            <p className="cf-lede" style={{ marginBottom: 36 }}>
              We've shipped products for founders in the US, UK, and Nigeria. Here's what keeps them coming back.
            </p>
            <button className="cf-btn">Start a project →</button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {points.map((p, i) => (
              <div
                key={i}
                className="cf-cell hoverable"
                style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '28px 32px', flex: 1, cursor: 'default', boxShadow: i === points.length - 1 ? 'inset -1px 0 0 var(--cf-line)' : undefined }}
              >
                <span style={{ fontFamily: 'var(--cf-mono)', fontSize: 11, color: 'var(--cf-accent)', minWidth: 28, paddingTop: 4, letterSpacing: '0.08em' }}>
                  {p.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, fontFamily: 'Inter', margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
