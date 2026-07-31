import { useState, useEffect } from 'react';
import { User, Bell, Lock, Moon, Monitor } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Preferences State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Profile State
  const [fullName, setFullName] = useState('Admin User');
  const [email, setEmail] = useState('admin@avatec.com');

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
    alert(`Profile updated successfully!\nName: ${fullName}\nEmail: ${email}`);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="page-header">
        <h1 className="page-title">SETTINGS</h1>
      </div>

      <div style={{ display: 'flex', gap: '32px', flex: 1, overflow: 'hidden' }}>
        
        {/* Settings Sidebar */}
        <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', border: 'none',
              background: activeTab === 'profile' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'profile' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'profile' ? 600 : 500,
              textAlign: 'left'
            }}
          >
            <User size={18} /> Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', border: 'none',
              background: activeTab === 'security' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'security' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'security' ? 600 : 500,
              textAlign: 'left'
            }}
          >
            <Lock size={18} /> Security
          </button>

          <button 
            onClick={() => setActiveTab('preferences')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', border: 'none',
              background: activeTab === 'preferences' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'preferences' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'preferences' ? 600 : 500,
              textAlign: 'left'
            }}
          >
            <Monitor size={18} /> Preferences
          </button>
        </div>

        {/* Settings Content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '16px' }}>
          
          {activeTab === 'profile' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card-header" style={{ marginBottom: 0 }}>
                <h2>Profile Information</h2>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                  {fullName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <button type="button" style={{ background: 'var(--glass-border)', color: 'var(--text-primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>
                    Change Avatar
                  </button>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button type="submit" style={{ background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card-header" style={{ marginBottom: 0 }}>
                <h2>Change Password</h2>
              </div>
              
              <form onSubmit={handlePasswordSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Password</label>
                    <input 
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>New Password</label>
                    <input 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Confirm New Password</label>
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <button type="submit" style={{ background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card-header" style={{ marginBottom: 0 }}>
                <h2>System Preferences</h2>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--glass-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'var(--glass-bg)', padding: '12px', borderRadius: '12px' }}>
                    <Moon size={20} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Dark Mode</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Use dark theme across the dashboard.</div>
                  </div>
                </div>
                <div 
                  onClick={() => setDarkMode(!darkMode)}
                  style={{ width: '48px', height: '24px', background: darkMode ? 'var(--accent-primary)' : 'var(--glass-border)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}
                >
                  <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: darkMode ? '26px' : '2px', transition: 'left 0.3s' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'var(--glass-bg)', padding: '12px', borderRadius: '12px' }}>
                    <Bell size={20} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Email Notifications</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Receive alerts for new messages and tasks.</div>
                  </div>
                </div>
                <div 
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  style={{ width: '48px', height: '24px', background: emailNotifications ? 'var(--accent-primary)' : 'var(--glass-border)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}
                >
                  <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: emailNotifications ? '26px' : '2px', transition: 'left 0.3s' }} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
