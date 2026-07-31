export default function Contact() {
  return (
    <div style={{ paddingTop: 160, paddingBottom: 120, maxWidth: 800, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
      <div className="section-label" style={{ marginBottom: 16 }}>Contact Us</div>
      <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', marginBottom: 24 }}>
        Let's build together.
      </h1>
      <p style={{ fontSize: 18, color: '#a3a3a3', lineHeight: 1.6, marginBottom: 48, fontFamily: 'Inter' }}>
        Ready to start your next project? Drop us a message and our team will get back to you within 24 hours.
      </p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ color: 'white', fontSize: 14, fontFamily: 'Inter' }}>Name</label>
          <input 
            type="text" 
            placeholder="Jane Doe" 
            style={{ 
              background: '#101010', border: '1px solid #232323', borderRadius: 8, padding: '16px', color: 'white', fontSize: 16, outline: 'none', fontFamily: 'Inter'
            }} 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ color: 'white', fontSize: 14, fontFamily: 'Inter' }}>Email</label>
          <input 
            type="email" 
            placeholder="jane@company.com" 
            style={{ 
              background: '#101010', border: '1px solid #232323', borderRadius: 8, padding: '16px', color: 'white', fontSize: 16, outline: 'none', fontFamily: 'Inter'
            }} 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ color: 'white', fontSize: 14, fontFamily: 'Inter' }}>Project Details</label>
          <textarea 
            placeholder="Tell us about what you want to build..." 
            rows={5}
            style={{ 
              background: '#101010', border: '1px solid #232323', borderRadius: 8, padding: '16px', color: 'white', fontSize: 16, outline: 'none', fontFamily: 'Inter', resize: 'vertical'
            }} 
          />
        </div>
        <button className="btn-primary" style={{ marginTop: 16, alignSelf: 'flex-start' }}>
          Send Message
        </button>
      </form>
    </div>
  )
}
