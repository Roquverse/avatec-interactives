import PageHero from '../../components/PageHero'
import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function ProductEngineering() {
  return (
    <div>
      <PageHero
        label="Services — Product Engineering"
        meta="Avatec Interactives"
        title="Product Engineering."
        lede="We don't just write code; we take end-to-end ownership of your product. From the initial system architecture to development, QA, and deployment, we act as your dedicated engineering team."
      />

      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-grid c3" style={{ borderTop: 'none' }}>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>01</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Architecture</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Designing robust, secure, and scalable systems that won't require a complete rewrite in 12 months.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>02</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Agile Delivery</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Iterative sprints, continuous integration, and transparent reporting so you always know what's happening.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>03</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Quality Assurance</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Automated testing suites and rigorous manual QA to ensure your users never encounter a critical bug.</p>
          </div>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
