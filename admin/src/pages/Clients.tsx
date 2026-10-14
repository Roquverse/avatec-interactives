import { useEffect, useState } from 'react';
import api from '../api/client';
import { Plus, X, Mail, Building, Phone } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/clients', formData);
      setShowModal(false);
      setFormData({ name: '', email: '', company: '', phone: '' });
      await fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Failed to save client. Email might already exist.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
            [ 03 // CLIENT ROSTER ]
          </div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            CLIENT DIRECTORY
          </h1>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          style={{ 
            background: '#f5f5f7', 
            color: '#070709', 
            border: '1px solid rgba(255, 255, 255, 0.4)', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)'
          }}
        >
          <Plus size={14} /> REGISTER CLIENT
        </button>
      </div>

      {/* Clients Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ 
          padding: '12px 18px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.015)' 
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#9a9ba4', textTransform: 'uppercase' }}>
            // VERIFIED PARTNERS ({clients.length})
          </span>
          <span className="cf-tag" style={{ fontSize: '10px' }}>
            <span className="cf-dot-live" />
            SYNCHRONIZED
          </span>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table className="invoice-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>CLIENT IDENTITY</th>
                <th>CONTACT EMAIL</th>
                <th>ORGANIZATION</th>
                <th>PHONE NUMBER</th>
                <th style={{ textAlign: 'right' }}>ONBOARDED DATE</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                    [ QUERYING CLIENT ROSTER... ]
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                    // NO CLIENTS REGISTERED YET
                  </td>
                </tr>
              ) : (
                clients.map((client: any) => (
                  <tr key={client.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '4px',
                          backgroundColor: '#13141b',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          color: '#38bdf8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {client.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600, color: '#f5f5f7' }}>{client.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9a9ba4', fontSize: '12px' }}>
                        <Mail size={12} color="#5e606b" />
                        <span>{client.email}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f5f5f7', fontSize: '12px' }}>
                        <Building size={12} color="#5e606b" />
                        <span>{client.company || '—'}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9a9ba4', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>
                        <Phone size={12} color="#5e606b" />
                        <span>{client.phone || '—'}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
                      {client.createdAt ? new Date(client.createdAt).toISOString().split('T')[0] : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Client Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div style={{ 
            backgroundColor: '#0c0d12',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '6px',
            width: '100%', 
            maxWidth: '480px', 
            padding: '1.75rem',
            position: 'relative',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8)'
          }}>
            <span style={{ position: 'absolute', top: '-7px', left: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b' }}>+</span>
            <span style={{ position: 'absolute', top: '-7px', right: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b' }}>+</span>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#38bdf8', letterSpacing: '0.08em', marginBottom: '2px' }}>
                  // CLIENT ONBOARDING
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#f5f5f7', fontWeight: 700 }}>
                  REGISTER NEW CLIENT
                </h3>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: '#9a9ba4', cursor: 'pointer', padding: '6px' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                  // CLIENT NAME *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Acme Corporation"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                  // WORK EMAIL *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="contact@acme.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                  // COMPANY / ENTITY NAME
                </label>
                <input 
                  type="text" 
                  placeholder="Acme Holdings Inc."
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                  // TELEPHONE NUMBER
                </label>
                <input 
                  type="text" 
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                />
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 16px', background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#9a9ba4', borderRadius: '4px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{ 
                    padding: '8px 20px', 
                    backgroundColor: '#f5f5f7', 
                    color: '#070709', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontWeight: 600, 
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {submitting ? 'COMMITTING...' : 'REGISTER CLIENT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
