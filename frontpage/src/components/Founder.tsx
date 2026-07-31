export default function Founder() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
      <div
        style={{
          background: '#101010',
          border: '1px solid #232323',
          borderRadius: 32,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          minHeight: 520,
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&auto=format"
            alt="Founder of Avatec Interactives"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) brightness(0.85)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 60%, #101010 100%)' }} />
          <div style={{ position: 'absolute', bottom: 32, left: 32 }}>
            <span className="badge">Founder & CEO</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '56px 56px 56px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>The Founder</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'white', marginBottom: 28, lineHeight: 1.1 }}>
            From DJ to software engineer to building products used by businesses worldwide.
          </h2>
          <p style={{ fontSize: 15, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', marginBottom: 16 }}>
            Before writing a single line of code, I was behind the decks — reading crowds, feeling rhythm, understanding
            what people respond to. That instinct never left me. It just found a new medium: software.
          </p>
          <p style={{ fontSize: 15, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', marginBottom: 36 }}>
            I founded Avatec to prove that you don't need a $500K budget or a Silicon Valley zip code to build
            world-class software. Since 2020, we've helped founders across three continents launch products that
            actually get used.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: 'white', fontStyle: 'italic', letterSpacing: '-0.02em' }}>
                Founder, Avatec Interactives
              </div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>Lagos · London · Remote-first</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
