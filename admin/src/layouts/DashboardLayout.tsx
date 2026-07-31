import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, Settings, Plus, BookOpen, Search, Menu, MessageSquare, Receipt, CalendarDays } from 'lucide-react';

const DashboardLayout = () => {

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">INI</div>

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
              Check Box
            </div>
            <div className="tab">
              <Menu size={16} />
              Monitoring
            </div>
            <div className="tab">
              <MessageSquare size={16} />
              Support
            </div>
          </div>
          
          <div className="topbar-actions">
            <div className="icon-btn">
              <Search size={20} />
            </div>
            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">Bogdan Nikitin</div>
                <div className="user-handle">@Nixtio</div>
              </div>
              <div className="user-avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/100)', backgroundSize: 'cover' }}></div>
            </div>
          </div>
        </header>
        
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
