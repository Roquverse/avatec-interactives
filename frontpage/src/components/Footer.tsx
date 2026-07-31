const footerLinks = [
  { title: 'Company', links: ['About', 'Work', 'Services', 'Insights', 'Contact'] },
  { title: 'Services', links: ['Web Apps', 'Mobile Apps', 'AI & Automation', 'SaaS Development', 'UI/UX Design'] },
  { title: 'Connect', links: ['Book a call', 'helpdesk@avatecinteractives.dev', 'Ibadan, Oyo, Nigeria', 'Remote-first', '+2348039669628'] },
]
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #232323', background: '#050505' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img src="/logo.png" alt="logo" style={{ width: 150 }} />
              </Link>
            </div>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, fontFamily: 'Inter', maxWidth: 280 }}>
              Premium software engineering studio building scalable products for ambitious businesses worldwide.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[
                {
                  name: 'TikTok',
                  url: '#',
                  icon: <path d="M22.5 7.1c-1.7-.1-3.2-.8-4.4-1.9V1.5h-4.3v13.6c0 1.9-1.5 3.4-3.4 3.4-1.9 0-3.4-1.5-3.4-3.4 0-1.9 1.5-3.4 3.4-3.4.5 0 1 .1 1.4.3v-4.5c-.5-.1-1-.1-1.4-.1-4.3 0-7.8 3.5-7.8 7.8s3.5 7.8 7.8 7.8 7.8-3.5 7.8-7.8V10.7c1.7 1.1 3.7 1.8 5.8 1.8V7.1z" />
                },
                {
                  name: 'Instagram',
                  url: '#',
                  icon: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </>
                  )
                },
                {
                  name: 'Facebook',
                  url: '#',
                  icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.53-4H14V7a1 1 0 0 1 1-1h3z"></path>
                },
                {
                  name: 'LinkedIn',
                  url: '#',
                  icon: (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </>
                  )
                }
              ].map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  title={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36, height: 36, border: '1px solid #232323', borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'border-color 0.2s',
                    color: '#555', textDecoration: 'none'
                  }}
                  onMouseEnter={e => {
                    ; (e.currentTarget as HTMLElement).style.borderColor = '#444'
                      ; (e.currentTarget as HTMLElement).style.color = '#a3a3a3'
                  }}
                  onMouseLeave={e => {
                    ; (e.currentTarget as HTMLElement).style.borderColor = '#232323'
                      ; (e.currentTarget as HTMLElement).style.color = '#555'
                  }}
                >
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <div className="section-label" style={{ marginBottom: 20 }}>{title}</div>
              {links.map(link => {
                const path = link === 'Home' ? '/' :
                  link === 'Book a call' ? '/contact' :
                    link.includes('@') ? `mailto:${link}` :
                      ['Lagos, Nigeria', 'London, UK', 'Remote-first', 'Ibadan, Oyo, Nigeria'].includes(link) ? '#' :
                        `/${link.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
                return (
                  <Link
                    key={link}
                    to={path}
                    style={{ display: 'block', fontFamily: 'Inter', fontSize: 14, color: '#555', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#a3a3a3')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                  >
                    {link}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid #232323', paddingTop: 32,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <span style={{ fontSize: 13, color: '#555', fontFamily: 'Inter' }}>
            © {new Date().getFullYear()} Avatec Interactives. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <span
                key={link}
                style={{ fontSize: 13, color: '#555', cursor: 'pointer', fontFamily: 'Inter', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a3a3a3')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555')}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
