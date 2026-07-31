import { useState } from 'react'

export default function FinalCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', idea: '' })

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
      <div style={{ position: 'relative', background: '#101010', border: '1px solid #232323', borderRadius: 32, padding: '80px', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ position: 'absolute', width: 600, height: 400, background: 'rgba(171, 9, 36,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div className="badge" style={{ marginBottom: 24 }}>Let's build together</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'white', marginBottom: 20 }}>
              Have an idea worth building?
            </h2>
            <p style={{ fontSize: 17, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', marginBottom: 40 }}>
              Let's turn it into a scalable product. Tell us what you're building and we'll get back to you within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['Strategy call in 48 hours', 'Fixed-price or retainer — your choice', 'No NDAs required to start the conversation'].map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={3}><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <span style={{ fontSize: 14, color: '#a3a3a3', fontFamily: 'Inter' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: '#161616', border: '1px solid #232323', borderRadius: 20, padding: 36 }}>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, color: 'white', marginBottom: 28 }}>Get in touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Your name',      key: 'name',  placeholder: 'Jane Doe',          type: 'text'  },
                { label: 'Email address',  key: 'email', placeholder: 'jane@company.com',   type: 'email' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 600, color: '#a3a3a3', display: 'block', marginBottom: 8 }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={formData[key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #232323', background: '#101010', color: 'white', fontFamily: 'Inter', fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(171, 9, 36,0.5)')}
                    onBlur={e => (e.target.style.borderColor = '#232323')}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 600, color: '#a3a3a3', display: 'block', marginBottom: 8 }}>Tell us about your idea</label>
                <textarea
                  placeholder="We're building a marketplace for..."
                  value={formData.idea}
                  onChange={e => setFormData(prev => ({ ...prev, idea: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #232323', background: '#101010', color: 'white', fontFamily: 'Inter', fontSize: 14, outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(171, 9, 36,0.5)')}
                  onBlur={e => (e.target.style.borderColor = '#232323')}
                />
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 15, marginTop: 4 }}>
                Book a strategy call →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
