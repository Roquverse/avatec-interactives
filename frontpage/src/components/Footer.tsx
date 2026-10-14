const footerLinks = [
  {
    title: 'Company',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Work', to: '/work' },
      { label: 'Services', to: '/services' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Web Applications', to: '/services/web-applications' },
      { label: 'Mobile Apps', to: '/services/mobile-apps' },
      { label: 'AI & Automation', to: '/services/ai-automation' },
      { label: 'Product Engineering', to: '/services/product-engineering' },
      { label: 'SaaS Development', to: '/services/saas-development' },
      { label: 'UI/UX Design', to: '/services/ui-ux-design' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { label: 'Book a call', href: 'https://calendly.com/helpdesk-avatecinteractives/30min', external: true },
      { label: 'helpdesk@avatecinteractives.dev', href: 'mailto:helpdesk@avatecinteractives.dev' },
      { label: '+234 803 966 9628', href: 'tel:+2348039669628' },
      { label: 'Ibadan, Oyo, Nigeria', static: true },
      { label: 'Remote-first', static: true },
    ],
  },
]
import { Link } from 'react-router-dom'

const socials = [
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
]

export default function Footer() {
  return (
    <footer className="cf-section" style={{ background: 'var(--cf-bg)' }}>
      <div className="cf-shell full mobile-padded" style={{ padding: '56px clamp(24px, 4vw, 64px) 0' }}>
        <div className="editorial-grid" style={{ marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Link to="/" className="cf-logo" aria-label="Avatec Interactives">
                <img src="/logo.png" alt="logo" />
              </Link>
            </div>
            <p style={{ fontSize: 13, color: 'var(--cf-muted)', lineHeight: 1.7, fontFamily: 'Inter', maxWidth: 280 }}>
              Premium software engineering studio building scalable products for ambitious businesses worldwide.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              {socials.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  title={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36, height: 36, border: '1px solid var(--cf-line-strong)', borderRadius: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.2s',
                    color: 'var(--cf-muted)', textDecoration: 'none'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#fff'
                    ;(e.currentTarget as HTMLElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'
                    ;(e.currentTarget as HTMLElement).style.color = '#9a9aa2'
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
          {footerLinks.map(({ title, items }) => (
            <div key={title}>
              <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cf-dim)', marginBottom: 20 }}>{title}</div>
              {items.map(item => {
                if ('to' in item && item.to) {
                  return (
                    <Link key={item.label} to={item.to} className="cf-footlink">
                      {item.label}
                    </Link>
                  )
                }
                if ('href' in item && item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="cf-footlink"
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                  )
                }
                return (
                  <span key={item.label} className="cf-footlink" style={{ cursor: 'default', color: 'var(--cf-dim)' }}>
                    {item.label}
                  </span>
                )
              })}
            </div>
          ))}
        </div>

        <div
          className="stack-mobile"
          style={{
            borderTop: '1px solid var(--cf-line)', padding: '20px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
            fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--cf-dim)' }}>
            © {new Date().getFullYear()} Avatec Interactives. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <span
                key={link}
                style={{ color: 'var(--cf-dim)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--cf-dim)')}
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
