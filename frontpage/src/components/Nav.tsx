import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = ['Work', 'Services', 'About', 'Insights']
const CALENDLY = 'https://calendly.com/helpdesk-avatecinteractives/30min'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="cf-nav">
      <div className="cf-nav-inner">
        {/* Logo */}
        <Link to="/" className="cf-logo" aria-label="Avatec Interactives">
          <img src="/logo.png" alt="Avatec Interactives" />
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 32, alignItems: 'center', marginLeft: 'auto', marginRight: 8 }}>
          {links.map(link => (
            <Link key={link} to={`/${link.toLowerCase()}`} className="cf-navlink">
              {link}
            </Link>
          ))}
        </div>

        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="cf-btn sm hide-mobile"
        >
          Book a call
        </a>

        {/* Hamburger */}
        <button
          className="show-mobile"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'none', border: '1px solid var(--cf-line-strong)', borderRadius: 2, padding: 6, cursor: 'pointer', color: '#fff', lineHeight: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d={isMobileMenuOpen ? 'M6 6l12 12M18 6L6 18' : 'M3 7h18M3 12h18M3 17h18'} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="show-mobile-flex"
          style={{
            position: 'absolute', top: 52, left: 0, right: 0,
            background: 'var(--cf-bg)', borderBottom: '1px solid var(--cf-line)',
            padding: '8px 20px 20px', flexDirection: 'column',
          }}
        >
          {links.map(link => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="cf-navlink"
              style={{ padding: '14px 0', borderBottom: '1px solid var(--cf-line)', fontSize: 12 }}
            >
              {link}
            </Link>
          ))}
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="cf-btn block" style={{ marginTop: 16 }}>
            Book a call
          </a>
        </div>
      )}
    </nav>
  )
}
