import PageHero from '../components/PageHero'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cf-muted)',
}

export default function Contact() {
  return (
    <div>
      <PageHero
        label="Contact — Get in touch"
        meta="Reply within 24h"
        title="Let's build together."
        lede="Ready to start your next project? Drop us a message and our team will get back to you within 24 hours."
      />

      <section className="cf-section">
        <div className="cf-shell">
          <form style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 64px)', maxWidth: 760 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={labelStyle}>Name</label>
              <input className="cf-input" type="text" placeholder="Jane Doe" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={labelStyle}>Email</label>
              <input className="cf-input" type="email" placeholder="jane@company.com" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={labelStyle}>Project Details</label>
              <textarea className="cf-input" placeholder="Tell us about what you want to build..." rows={5} style={{ resize: 'vertical' }} />
            </div>
            <div>
              <button className="cf-btn" type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
