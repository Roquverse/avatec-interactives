import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function MobileApps() {
  return (
    <div>
      <section style={{ paddingTop: 160, paddingBottom: 120, maxWidth: 1280, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Services</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', marginBottom: 24, maxWidth: 900 }}>
          Mobile Apps.
        </h1>
        <p style={{ fontSize: 22, color: '#a3a3a3', lineHeight: 1.6, maxWidth: 720, fontFamily: 'Inter', marginBottom: 40 }}>
          Deliver stunning native experiences on both iOS and Android from a single codebase. We specialize in cross-platform development using Flutter and React Native to drastically reduce time-to-market without sacrificing performance or design quality.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginTop: 80 }}>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Native Performance</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Fluid 60fps animations, deep hardware integration, and zero compromise on the native feel.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Cross-Platform</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Write once, deploy everywhere. Halve your development time by targeting iOS and Android simultaneously.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>App Store Success</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>We handle the entire submission process, ensuring your app meets all strict Apple and Google guidelines.</p>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
