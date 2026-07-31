import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '90%' : '60%',
        zIndex: 100,
        background: 'rgb(255, 255, 255)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 0, 0, 0.07)',
        borderRadius: 16,
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 40px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.png" alt="Avatec Interactives" style={{ width: '150px' }} />
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {['Work', 'Services', 'About', 'Insights'].map(link => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              style={{
                fontFamily: 'Outfit',
                fontSize: 14,
                fontWeight: 500,
                color: '#111111',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6b0f1a')}
              onMouseLeave={e => (e.currentTarget.style.color = '#111111')}
            >
              {link}
            </Link>
          ))}
        </div>

        <a
          href="https://calendly.com/helpdesk-avatecinteractives/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hide-mobile"
          style={{
            fontFamily: 'Outfit',
            fontWeight: 600,
            fontSize: 14,
            color: '#ffffff',
            background: '#ab0924',
            border: 'none',
            borderRadius: 10,
            padding: '10px 22px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background = '#850d20'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px #e184a6'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background = '#6b0f1a'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          Book a call
        </a>

        {/* Hamburger Icon */}
        <div className="show-mobile" style={{ cursor: 'pointer', padding: '10px 0' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="show-mobile" style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: 16,
          padding: 20,
          boxShadow: '0 10px 32px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          {['Work', 'Services', 'About', 'Insights'].map(link => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontFamily: 'Outfit',
                fontSize: 16,
                fontWeight: 500,
                color: '#111111',
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              {link}
            </Link>
          ))}
          <a
            href="https://calendly.com/helpdesk-avatecinteractives/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Outfit',
              fontWeight: 600,
              fontSize: 15,
              color: '#ffffff',
              background: '#ab0924',
              borderRadius: 10,
              padding: '12px 22px',
              textAlign: 'center',
              textDecoration: 'none',
              marginTop: 10
            }}
          >
            Book a call
          </a>
        </div>
      )}
    </nav>
  )
}
