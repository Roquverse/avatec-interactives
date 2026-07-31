import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function WebApplications() {
  return (
    <div>
      <section style={{ paddingTop: 160, paddingBottom: 120, maxWidth: 1280, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Services</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', marginBottom: 24, maxWidth: 900 }}>
          Web Applications.
        </h1>
        <p style={{ fontSize: 22, color: '#a3a3a3', lineHeight: 1.6, maxWidth: 720, fontFamily: 'Inter', marginBottom: 40 }}>
          We architect and build full-stack web applications capable of scaling to millions of users. Whether you're launching a minimal viable product (MVP) or an enterprise-grade platform, we use modern technologies like React, Next.js, and highly resilient backend services to ensure flawless performance.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginTop: 80 }}>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Frontend Excellence</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Lighting-fast interfaces built with React and Next.js, optimized for Core Web Vitals and accessibility.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Robust Backends</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Scalable APIs and microservices using Node.js, Python, or Go, paired with PostgreSQL or Redis.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Cloud Native</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Deployed effortlessly on AWS or Vercel using modern DevOps practices for zero-downtime updates.</p>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
