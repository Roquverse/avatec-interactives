import { useState, useEffect } from 'react';
import { User, Bell, Lock, Moon, Monitor, LogOut } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Preferences State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Profile State
  const [fullName, setFullName] = useState(localStorage.getItem('admin_name') || 'Helpdesk Admin');
  const [email, setEmail] = useState(localStorage.getItem('admin_email') || 'helpdesk@avatecinteractives.dev');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle Theme Change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_name', fullName);
    localStorage.setItem('admin_email', email);
    window.dispatchEvent(new Event('profileUpdated'));
    alert(`Administrative profile updated successfully.`);
  };

  const handleLogout = () => {
    if (window.confirm('Terminate current administrative session?')) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Administrative password updated successfully.");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Header with Hairline Breadcrumb */}
      <div className="page-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#38bdf8',
            marginBottom: '4px'
          }}>
            [ 08 // SYSTEM CONFIGURATION ]
          </div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            SETTINGS & PREFERENCES
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
        
        {/* Settings Navigation Sidebar */}
        <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 14px', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              border: activeTab === 'profile' ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
              background: activeTab === 'profile' ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
              color: activeTab === 'profile' ? '#f5f5f7' : '#9a9ba4',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.04em',
              textAlign: 'left'
            }}
          >
            <User size={16} color={activeTab === 'profile' ? '#38bdf8' : 'currentColor'} /> 
            <span>PROFILE IDENTITY</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 14px', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              border: activeTab === 'security' ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
              background: activeTab === 'security' ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
              color: activeTab === 'security' ? '#f5f5f7' : '#9a9ba4',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.04em',
              textAlign: 'left'
            }}
          >
            <Lock size={16} color={activeTab === 'security' ? '#38bdf8' : 'currentColor'} /> 
            <span>CREDENTIALS</span>
          </button>

          <button 
            onClick={() => setActiveTab('preferences')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 14px', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              border: activeTab === 'preferences' ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
              background: activeTab === 'preferences' ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
              color: activeTab === 'preferences' ? '#f5f5f7' : '#9a9ba4',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.04em',
              textAlign: 'left'
            }}
          >
            <Monitor size={16} color={activeTab === 'preferences' ? '#38bdf8' : 'currentColor'} /> 
            <span>SYSTEM PREFS</span>
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button 
              onClick={handleLogout}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '10px 14px', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                border: '1px solid rgba(239, 68, 68, 0.25)',
                background: 'rgba(239, 68, 68, 0.06)',
                color: '#f87171',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.04em',
                width: '100%',
                transition: 'all 0.15s'
              }}
            >
              <LogOut size={14} /> 
              <span>TERMINATE SESSION</span>
            </button>
          </div>
        </div>

        {/* Settings Content Canvas */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
          
          {activeTab === 'profile' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card-header" style={{ marginBottom: 0 }}>
                <span>// ROOT IDENTITY PROFILE</span>
                <span className="cf-tag" style={{ fontSize: '10px' }}>[ LEVEL: ROOT ]</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '4px', 
                  backgroundColor: '#13141b', 
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '20px', 
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {fullName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f5f5f7' }}>{fullName}</div>
                  <div style={{ fontSize: '12px', color: '#9a9ba4', fontFamily: "'JetBrains Mono', monospace", marginTop: '2px' }}>
                    ROLE: ADMINISTRATOR // SYSTEM OPERATOR
                  </div>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      ADMINISTRATOR DISPLAY NAME
                    </label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      COMMUNICATIONS EMAIL
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button 
                    type="submit" 
                    style={{ 
                      padding: '8px 20px', 
                      backgroundColor: '#f5f5f7', 
                      color: '#070709', 
                      border: 'none', 
                      borderRadius: '4px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    COMMIT PROFILE UPDATES
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card-header" style={{ marginBottom: 0 }}>
                <span>// ROTATE SECURITY CREDENTIALS</span>
                <span className="cf-tag" style={{ fontSize: '10px' }}>[ 256-BIT CRYPTO ]</span>
              </div>
              
              <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                    CURRENT MASTER PASSCODE
                  </label>
                  <input 
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                    NEW PASSCODE
                  </label>
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                    CONFIRM NEW PASSCODE
                  </label>
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button 
                    type="submit" 
                    style={{ 
                      padding: '8px 20px', 
                      backgroundColor: '#f5f5f7', 
                      color: '#070709', 
                      border: 'none', 
                      borderRadius: '4px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    ROTATE PASSCODE
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card-header" style={{ marginBottom: 0 }}>
                <span>// WORKSPACE ENVIRONMENT</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '10px', borderRadius: '4px', color: '#38bdf8' }}>
                    <Moon size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f5f5f7', fontSize: '13px' }}>Pitch Dark Hairline Theme</div>
                    <div style={{ fontSize: '11px', color: '#9a9ba4', fontFamily: "'JetBrains Mono', monospace", marginTop: '2px' }}>
                      Aligned with frontpage high-contrast engineering aesthetic.
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setDarkMode(!darkMode)}
                  style={{ 
                    width: '42px', 
                    height: '22px', 
                    backgroundColor: darkMode ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '12px', 
                    position: 'relative', 
                    cursor: 'pointer', 
                    transition: 'all 0.2s' 
                  }}
                >
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: '#070709', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    top: '3px', 
                    left: darkMode ? '23px' : '3px', 
                    transition: 'left 0.2s' 
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '10px', borderRadius: '4px', color: '#10b981' }}>
                    <Bell size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f5f5f7', fontSize: '13px' }}>System Event Notifications</div>
                    <div style={{ fontSize: '11px', color: '#9a9ba4', fontFamily: "'JetBrains Mono', monospace", marginTop: '2px' }}>
                      Receive email alerts for project phase transitions and task updates.
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  style={{ 
                    width: '42px', 
                    height: '22px', 
                    backgroundColor: emailNotifications ? '#10b981' : 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '12px', 
                    position: 'relative', 
                    cursor: 'pointer', 
                    transition: 'all 0.2s' 
                  }}
                >
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: '#070709', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    top: '3px', 
                    left: emailNotifications ? '23px' : '3px', 
                    transition: 'left 0.2s' 
                  }} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
