import { useEffect, useState } from 'react';
import api from '../api/client';
import { Plus, X } from 'lucide-react';

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
    <div>
      <div className="page-header">
        <h1 className="page-title">CLIENTS</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={18} /> Add Client
        </button>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1px', overflow: 'hidden' }}>
        <table className="invoice-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading clients...</td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No clients found.</td>
              </tr>
            ) : (
              clients.map((client: any) => (
                <tr key={client.id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.company || '-'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{new Date(client.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-panel animate-fade-in" style={{ 
            width: '100%', 
            maxWidth: '500px', 
            padding: '2rem' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Outfit, sans-serif' }}>New Client</h3>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Company</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Phone</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.75rem 1.5rem', background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Creating...' : 'Create Client'}
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
