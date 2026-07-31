const points = [
  { num: '01', title: 'Product-first thinking',       desc: 'We obsess over outcomes, not outputs. Every technical decision is tied to your business goals.' },
  { num: '02', title: 'AI-accelerated development',   desc: 'Our AI-augmented workflows mean faster iterations, smarter code reviews, and more features in less time.' },
  { num: '03', title: 'Radical transparency',         desc: 'Weekly demos, public roadmaps, and direct access to the engineers building your product.' },
  { num: '04', title: 'Scalable architecture',        desc: 'Built to handle 100 users today and 100,000 tomorrow without expensive rewrites.' },
  { num: '05', title: 'Long-term partnership',        desc: "We don't disappear after launch. Most clients work with us for 2+ years as their product evolves." },
]

export default function WhyAvatec() {
  return (
    <section className="mobile-padded" style={{ background: '#080808', borderTop: '1px solid #232323' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
        <div className="responsive-grid-2" style={{ alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Why Avatec</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(40px, 5vw, 56px)', color: 'white', marginBottom: 24 }}>
              Why founders choose us.
            </h2>
            <p style={{ fontSize: 16, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', marginBottom: 40 }}>
              We've shipped products for founders in the US, UK, and Nigeria. Here's what keeps them coming back.
            </p>
            <button className="btn-primary">Start a project →</button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {points.map((p, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  padding: '28px 0',
                  borderBottom: i < points.length - 1 ? '1px solid #232323' : 'none',
                  display: 'flex', gap: 24, alignItems: 'flex-start',
                  cursor: 'default', borderRadius: 0,
                }}
              >
                <span className="display-heading" style={{ fontSize: 14, color: '#333', minWidth: 28, paddingTop: 2 }}>
                  {p.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 6 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#a3a3a3', lineHeight: 1.7, fontFamily: 'Inter' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
