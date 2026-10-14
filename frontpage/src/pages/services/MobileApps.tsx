import PageHero from '../../components/PageHero'
import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function MobileApps() {
  return (
    <div>
      <PageHero
        label="Services — Mobile Apps"
        meta="Avatec Interactives"
        title="Mobile Apps."
        lede="Deliver stunning native experiences on both iOS and Android from a single codebase. We specialize in cross-platform development using Flutter and React Native to drastically reduce time-to-market without sacrificing performance or design quality."
      />

      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-grid c3" style={{ borderTop: 'none' }}>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>01</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Native Performance</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Fluid 60fps animations, deep hardware integration, and zero compromise on the native feel.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>02</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Cross-Platform</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Write once, deploy everywhere. Halve your development time by targeting iOS and Android simultaneously.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>03</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>App Store Success</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>We handle the entire submission process, ensuring your app meets all strict Apple and Google guidelines.</p>
          </div>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
