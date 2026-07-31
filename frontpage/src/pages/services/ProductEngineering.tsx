import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function ProductEngineering() {
  return (
    <div>
      <section style={{ paddingTop: 160, paddingBottom: 120, maxWidth: 1280, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Services</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', marginBottom: 24, maxWidth: 900 }}>
          Product Engineering.
        </h1>
        <p style={{ fontSize: 22, color: '#a3a3a3', lineHeight: 1.6, maxWidth: 720, fontFamily: 'Inter', marginBottom: 40 }}>
          We don't just write code; we take end-to-end ownership of your product. From the initial system architecture to development, QA, and deployment, we act as your dedicated engineering team.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginTop: 80 }}>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Architecture</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Designing robust, secure, and scalable systems that won't require a complete rewrite in 12 months.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Agile Delivery</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Iterative sprints, continuous integration, and transparent reporting so you always know what's happening.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Quality Assurance</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Automated testing suites and rigorous manual QA to ensure your users never encounter a critical bug.</p>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
