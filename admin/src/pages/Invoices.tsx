import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Plus, Edit, Trash2, CheckCircle, Clock, FileText, X } from 'lucide-react';

export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  
  // Form states
  const [clientId, setClientId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [dueDate, setDueDate] = useState('');
  const [lineItems, setLineItems] = useState<{ description: string; amount: number }[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [invRes, cliRes] = await Promise.all([
        api.get('/invoices'),
        api.get('/clients')
      ]);
      setInvoices(invRes.data);
      setClients(cliRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNewModal = () => {
    setEditingInvoice(null);
    setClientId(clients[0]?.id || '');
    setAmount('');
    setStatus('DRAFT');
    setDueDate('');
    setLineItems([{ description: '', amount: 0 }]);
    setIsModalOpen(true);
  };

  const openEditModal = (invoice: any) => {
    setEditingInvoice(invoice);
    setClientId(invoice.clientId);
    setAmount(invoice.amount.toString());
    setStatus(invoice.status);
    setDueDate(invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '');
    setLineItems(invoice.lineItems || [{ description: '', amount: 0 }]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const calculateTotal = (items: { amount: number }[]) => {
    return items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const handleLineItemChange = (index: number, field: string, value: any) => {
    const newItems = [...lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setLineItems(newItems);
    
    // Auto-update total amount when line items change
    if (field === 'amount') {
      setAmount(calculateTotal(newItems).toString());
    }
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', amount: 0 }]);
  };

  const removeLineItem = (index: number) => {
    const newItems = lineItems.filter((_, i) => i !== index);
    setLineItems(newItems);
    setAmount(calculateTotal(newItems).toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return alert('Please select a client');

    const payload = {
      clientId,
      amount: Number(amount),
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      lineItems
    };

    try {
      if (editingInvoice) {
        await api.put(`/invoices/${editingInvoice.id}`, payload);
      } else {
        await api.post('/invoices', payload);
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;
    try {
      await api.delete(`/invoices/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/invoices/${id}`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <span className="status-badge paid"><CheckCircle size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> PAID</span>;
      case 'SENT':
      case 'PENDING':
        return <span className="status-badge pending"><Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> PENDING</span>;
      default:
        return <span className="status-badge draft"><FileText size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> DRAFT</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="page-header">
        <h1 className="page-title">INVOICES</h1>
        <button 
          onClick={openNewModal}
          style={{ background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={18} /> New Invoice
        </button>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table className="invoice-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading invoices...</td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No invoices found.</td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>#{invoice.id.substring(0, 8).toUpperCase()}</td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{invoice.client?.name || 'Unknown Client'}</td>
                    <td style={{ fontWeight: 600 }}>${invoice.amount.toFixed(2)}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      <select 
                        value={invoice.status} 
                        onChange={(e) => updateStatus(invoice.id, e.target.value)}
                        style={{ background: 'transparent', border: 'none', appearance: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', outline: 'none' }}
                      >
                        <option value="DRAFT" style={{ color: 'black' }}>Draft</option>
                        <option value="PENDING" style={{ color: 'black' }}>Pending</option>
                        <option value="PAID" style={{ color: 'black' }}>Paid</option>
                      </select>
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <button onClick={() => openEditModal(invoice)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(invoice.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--overlay-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 40 }}>
          <div style={{ background: 'var(--bg-secondary)', width: '100%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '24px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--glass-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '20px' }}>{editingInvoice ? 'Edit Invoice' : 'New Invoice'}</h2>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Close</button>
            </div>

            <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
              <form id="invoice-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Client *</label>
                    <select 
                      required
                      value={clientId} 
                      onChange={e => setClientId(e.target.value)} 
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
                    >
                      <option value="" disabled style={{ color: 'black' }}>Select a client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id} style={{ color: 'black' }}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</label>
                    <select 
                      value={status} 
                      onChange={e => setStatus(e.target.value)} 
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
                    >
                      <option value="DRAFT" style={{ color: 'black' }}>Draft</option>
                      <option value="PENDING" style={{ color: 'black' }}>Pending</option>
                      <option value="PAID" style={{ color: 'black' }}>Paid</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Due Date</label>
                    <input 
                      type="date" 
                      value={dueDate} 
                      onChange={e => setDueDate(e.target.value)} 
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', colorScheme: 'dark' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Amount *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--text-muted)' }}>$</span>
                      <input 
                        required
                        type="number" 
                        step="0.01"
                        value={amount} 
                        onChange={e => setAmount(e.target.value)} 
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px 12px 12px 32px', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Line Items Section */}
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>Line Items</h3>
                    <button type="button" onClick={addLineItem} style={{ background: 'transparent', color: 'var(--accent-primary)', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 500 }}>
                      <Plus size={16} /> Add Item
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {lineItems.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--glass-very-subtle)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-bg)' }}>
                        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Description</label>
                          <input 
                            type="text"
                            value={item.description}
                            onChange={e => handleLineItemChange(index, 'description', e.target.value)}
                            placeholder="Service or item description"
                            style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '8px 12px', borderRadius: '6px', color: 'var(--text-primary)', outline: 'none' }}
                          />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount ($)</label>
                          <input 
                            type="number"
                            step="0.01"
                            value={item.amount || ''}
                            onChange={e => handleLineItemChange(index, 'amount', parseFloat(e.target.value))}
                            placeholder="0.00"
                            style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '8px 12px', borderRadius: '6px', color: 'var(--text-primary)', outline: 'none' }}
                          />
                        </div>
                        <button type="button" onClick={() => removeLineItem(index)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '18px' }} title="Remove item">
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--glass-bg)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button onClick={closeModal} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button form="invoice-form" type="submit" style={{ background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
