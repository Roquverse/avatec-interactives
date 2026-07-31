import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function UiUxDesign() {
  return (
    <div>
      <section style={{ paddingTop: 160, paddingBottom: 120, maxWidth: 1280, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Services</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', marginBottom: 24, maxWidth: 900 }}>
          UI/UX Design.
        </h1>
        <p style={{ fontSize: 22, color: '#a3a3a3', lineHeight: 1.6, maxWidth: 720, fontFamily: 'Inter', marginBottom: 40 }}>
          Beautiful software is functional software. We create comprehensive design systems, conduct deep user research, and craft pixel-perfect interfaces that not only look stunning but convert visitors into fiercely loyal customers.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginTop: 80 }}>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>User Research</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Understanding your target audience through interviews, journey mapping, and competitive analysis.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Design Systems</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Building scalable component libraries in Figma that ensure brand consistency across your entire product suite.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Prototyping</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Creating high-fidelity, interactive prototypes to validate concepts with real users before writing a single line of code.</p>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
