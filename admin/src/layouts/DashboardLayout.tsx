import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Globe, 
  Settings, 
  BookOpen, 
  Search, 
  Receipt, 
  CalendarDays,
  ExternalLink,
  LogOut,
  Terminal,
  Database
} from 'lucide-react';

const DashboardLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: localStorage.getItem('admin_name') || 'Helpdesk Admin',
    email: localStorage.getItem('admin_email') || 'helpdesk@avatecinteractives.dev'
  });

  useEffect(() => {
    const handleUpdate = () => {
      setProfile({
        name: localStorage.getItem('admin_name') || 'Helpdesk Admin',
        email: localStorage.getItem('admin_email') || 'helpdesk@avatecinteractives.dev'
      });
    };
    window.addEventListener('profileUpdated', handleUpdate);
    return () => window.removeEventListener('profileUpdated', handleUpdate);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Terminate current administrative session?')) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      navigate('/login');
    }
  };

  const getPageSection = () => {
    const path = location.pathname;
    if (path.includes('/projects')) return 'PROJECTS // BOARD';
    if (path.includes('/clients')) return 'CLIENTS // DIRECTORY';
    if (path.includes('/portfolio')) return 'PORTFOLIO // SHOWCASE';
    if (path.includes('/insights')) return 'INSIGHTS // EDITORIAL';
    if (path.includes('/invoices')) return 'INVOICES // BILLING';
    if (path.includes('/schedule')) return 'SCHEDULE // TIMELINE';
    if (path.includes('/settings')) return 'SETTINGS // CONFIG';
    return 'OVERVIEW // METRICS';
  };

  return (
    <div className="app-container" style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#070709',
      color: '#f5f5f7'
    }}>
      {/* Hairline Sidebar */}
      <aside className="sidebar" style={{
        width: '72px',
        backgroundColor: '#0c0d12',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 0',
        zIndex: 20
      }}>
        {/* Logo Monogram */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: '#070709',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 800,
          fontSize: '13px',
          color: '#f5f5f7',
          marginBottom: '2rem',
          position: 'relative'
        }} title="Avatec OS">
          <span>AV</span>
          <span style={{
            position: 'absolute',
            top: '3px',
            right: '3px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#38bdf8'
          }} />
        </div>

        {/* Navigation Rail */}
        <nav className="nav-menu" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          flex: 1,
          width: '100%',
          alignItems: 'center'
        }}>
          <NavLink to="/" end className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Overview [01]">
            <LayoutDashboard size={18} />
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Projects [02]">
            <FolderKanban size={18} />
          </NavLink>
          <NavLink to="/clients" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Clients [03]">
            <Users size={18} />
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Portfolio [04]">
            <Globe size={18} />
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Insights [05]">
            <BookOpen size={18} />
          </NavLink>
          <NavLink to="/invoices" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Invoices [06]">
            <Receipt size={18} />
          </NavLink>
          <NavLink to="/schedule" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Schedule [07]">
            <CalendarDays size={18} />
          </NavLink>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center', width: '100%' }}>
            <NavLink to="/settings" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Settings [08]">
              <Settings size={18} />
            </NavLink>

            <button 
              onClick={handleLogout}
              className="nav-icon" 
              title="Terminate Session"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ef4444'
              }}
            >
              <LogOut size={17} />
            </button>
          </div>
        </nav>

        {/* System Pulse Live Indicator */}
        <div style={{
          marginTop: '1.25rem',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          boxShadow: '0 0 8px #10b981'
        }} title="System Online // Live" />
      </aside>

      {/* Main Administrative Content Canvas */}
      <main className="main-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#070709'
      }}>
        {/* Technical Top Header */}
        <header className="topbar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(12, 13, 18, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 10
        }}>
          {/* Left: Active Section & System Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#f5f5f7',
              textTransform: 'uppercase'
            }}>
              <Terminal size={13} color="#38bdf8" />
              <span style={{ color: '#5e606b' }}>AVATEC OS //</span>
              <span style={{ fontWeight: 600 }}>{getPageSection()}</span>
            </div>

            {/* Cloudflare R2 & Supabase Status Pills */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.06em',
                padding: '2px 6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Database size={9} />
                SUPABASE DB
              </span>

              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.06em',
                padding: '2px 6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                R2 STORAGE
              </span>
            </div>
          </div>
          
          {/* Right: Search, Live Site Link, Profile */}
          <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search Box */}
            {isSearchActive ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#070709', 
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '4px', 
                padding: '0.3rem 0.6rem',
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.15)'
              }}>
                <Search size={14} color="#38bdf8" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Query records..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setIsSearchActive(false)}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#f5f5f7', 
                    outline: 'none', 
                    marginLeft: '0.5rem', 
                    width: '180px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px'
                  }}
                />
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchActive(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: '#9a9ba4',
                  cursor: 'pointer',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px'
                }}
              >
                <Search size={12} />
                <span>SEARCH</span>
                <span style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.06)', 
                  padding: '1px 4px', 
                  borderRadius: '2px', 
                  fontSize: '9px',
                  color: '#5e606b' 
                }}>⌘K</span>
              </button>
            )}

            {/* Link to Frontpage Site */}
            <a 
              href="http://localhost:5173" 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: '#9a9ba4',
                textDecoration: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f5f5f7';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9a9ba4';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
              title="Open public frontpage in new tab"
            >
              <span>FRONTPAGE</span>
              <ExternalLink size={11} />
            </a>

            {/* User Profile Pill */}
            <div className="user-profile" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              paddingLeft: '0.75rem',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div className="user-info" style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f5f5f7' }}>{profile.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#5e606b' }}>ROOT // ADMIN</div>
              </div>
              <div 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '4px', 
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  backgroundColor: '#13141b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#38bdf8'
                }}
              >
                {profile.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        
        {/* Active Page View */}
        <div style={{ 
          flex: 1, 
          padding: '1.75rem', 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: 0 
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
