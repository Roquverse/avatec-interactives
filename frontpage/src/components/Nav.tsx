import { Link } from 'react-router-dom'

export default function Nav() {

  return (
    <nav
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
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
          padding: '0 40px',
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
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
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

        <Link
          to="/contact"
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
        </Link>
      </div>
    </nav>
  )
}
