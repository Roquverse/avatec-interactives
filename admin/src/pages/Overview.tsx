import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Users, FolderKanban } from 'lucide-react';

const Overview = () => {
  const [stats, setStats] = useState({ clients: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, projectsRes] = await Promise.all([
          api.get('/clients'),
          api.get('/projects')
        ]);
        setStats({
          clients: clientsRes.data.length || 0,
          projects: projectsRes.data.length || 0
        });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Welcome Back</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--accent-primary)' }}>
            <Users size={32} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Clients</p>
            {loading ? (
              <h2 style={{ color: 'var(--text-muted)' }}>...</h2>
            ) : (
              <h2 style={{ fontSize: '2rem' }}>{stats.clients}</h2>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--accent-success)' }}>
            <FolderKanban size={32} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Projects</p>
            {loading ? (
              <h2 style={{ color: 'var(--text-muted)' }}>...</h2>
            ) : (
              <h2 style={{ fontSize: '2rem' }}>{stats.projects}</h2>
            )}
          </div>
        </div>

      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Recent Activity</h3>
        <p style={{ color: 'var(--text-muted)' }}>Your recent workspace updates will appear here.</p>
      </div>
    </div>
  );
};

export default Overview;
