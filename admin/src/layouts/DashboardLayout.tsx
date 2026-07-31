import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, Settings, Plus, BookOpen, Search, Receipt, CalendarDays } from 'lucide-react';

const DashboardLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo" style={{ overflow: 'hidden' }}>
          <img src="/favicon.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <nav className="nav-menu">
          <NavLink to="/" end className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Overview">
            <LayoutDashboard size={20} />
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Projects">
            <FolderKanban size={20} />
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Portfolio">
            <Users size={20} />
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Insights">
            <BookOpen size={20} />
          </NavLink>
          <NavLink to="/invoices" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Invoices">
            <Receipt size={20} />
          </NavLink>
          <NavLink to="/schedule" className={({ isActive }) => "nav-icon " + (isActive ? 'active' : '')} title="Schedule">
            <CalendarDays size={20} />
          </NavLink>
          <div className="nav-icon" title="Settings" style={{ marginTop: 'auto' }}>
            <Settings size={20} />
          </div>
        </nav>
        
        <button className="add-btn">
          <Plus size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-tabs">
            <div className="tab active">
              <LayoutDashboard size={16} />
              Dashboard
            </div>
          </div>
          
          <div className="topbar-actions">
            {isSearchActive ? (
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-pill)', padding: '0.25rem 0.5rem 0.25rem 1rem' }}>
                <Search size={16} color="var(--text-muted)" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setIsSearchActive(false)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', marginLeft: '0.5rem', width: '150px' }}
                />
              </div>
            ) : (
              <div className="icon-btn" onClick={() => setIsSearchActive(true)}>
                <Search size={20} />
              </div>
            )}
            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">Admin User</div>
                <div className="user-handle">@admin</div>
              </div>
              <div className="user-avatar" style={{ backgroundImage: 'url(https://ui-avatars.com/api/?name=Admin+User&background=a3e635&color=121318)', backgroundSize: 'cover' }}></div>
            </div>
          </div>
        </header>
        
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
