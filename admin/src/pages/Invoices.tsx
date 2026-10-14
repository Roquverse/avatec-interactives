import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  Clock, 
  FileText, 
  X
} from 'lucide-react';

interface LineItem {
  description: string;
  amount: number;
}

interface Invoice {
  id: string;
  clientId: string;
  client?: { name: string; email: string };
  amount: number;
  status: string;
  dueDate: string | null;
  lineItems: LineItem[];
  createdAt: string;
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // Form State
  const [clientId, setClientId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [dueDate, setDueDate] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: 'Interactive Web Platform Milestone 1', amount: 0 }
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [invRes, clientRes] = await Promise.all([
        api.get('/invoices'),
        api.get('/clients')
      ]);
      setInvoices(invRes.data);
      setClients(clientRes.data);
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

  const openEditModal = (inv: Invoice) => {
    setEditingInvoice(inv);
    setClientId(inv.clientId);
    setAmount(inv.amount.toString());
    setStatus(inv.status);
    setDueDate(inv.dueDate ? inv.dueDate.split('T')[0] : '');
    setLineItems(inv.lineItems && inv.lineItems.length > 0 ? inv.lineItems : [{ description: '', amount: 0 }]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInvoice(null);
  };

  const handleLineItemChange = (index: number, field: 'description' | 'amount', value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);

    // Auto calculate amount sum
    const total = updated.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    setAmount(total.toString());
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', amount: 0 }]);
  };

  const removeLineItem = (index: number) => {
    const updated = lineItems.filter((_, i) => i !== index);
    setLineItems(updated);
    const total = updated.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    setAmount(total.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (!window.confirm('Delete this invoice permanently?')) return;
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

  const getStatusBadge = (statusVal: string) => {
    switch (statusVal) {
      case 'PAID':
        return (
          <span className="status-badge paid">
            <CheckCircle size={10} /> PAID
          </span>
        );
      case 'SENT':
      case 'PENDING':
        return (
          <span className="status-badge pending">
            <Clock size={10} /> PENDING
          </span>
        );
      default:
        return (
          <span className="status-badge draft">
            <FileText size={10} /> DRAFT
          </span>
        );
    }
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
            [ 06 // FINANCIAL LEDGER ]
          </div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            INVOICE MANAGEMENT
          </h1>
        </div>

        <button 
          onClick={openNewModal}
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
          <Plus size={14} /> NEW INVOICE
        </button>
      </div>

      {/* Invoices Table Card */}
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
            // BILLED TRANSACTIONS ({invoices.length})
          </span>
          <span className="cf-tag" style={{ fontSize: '10px' }}>
            <span className="cf-dot-live" />
            LIVE LEDGER
          </span>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table className="invoice-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>INVOICE REF</th>
                <th>CLIENT</th>
                <th>AMOUNT (USD)</th>
                <th>PAYMENT DUE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                    [ QUERYING FINANCIAL LEDGER... ]
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                    // NO INVOICES RECORDED
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={{ color: '#38bdf8', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600 }}>
                      #INV-{invoice.id.substring(0, 8).toUpperCase()}
                    </td>
                    <td style={{ fontWeight: 600, color: '#f5f5f7' }}>
                      {invoice.client?.name || 'Private Client'}
                    </td>
                    <td style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                      ${invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ color: '#9a9ba4', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
                      {invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '—'}
                    </td>
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <select 
                          value={invoice.status} 
                          onChange={(e) => updateStatus(invoice.id, e.target.value)}
                          style={{ 
                            background: '#070709', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '3px',
                            cursor: 'pointer', 
                            color: '#9a9ba4', 
                            fontFamily: "'JetBrains Mono', monospace", 
                            fontSize: '10px',
                            padding: '2px 4px',
                            outline: 'none' 
                          }}
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="PENDING">PENDING</option>
                          <option value="PAID">PAID</option>
                        </select>
                        {getStatusBadge(invoice.status)}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => openEditModal(invoice)} 
                          style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '4px', color: '#9a9ba4', cursor: 'pointer' }} 
                          title="Edit Invoice"
                        >
                          <Edit size={13} />
                        </button>
                        <button 
                          onClick={() => handleDelete(invoice.id)} 
                          style={{ background: 'none', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px', padding: '4px', color: '#f87171', cursor: 'pointer' }} 
                          title="Delete Invoice"
                        >
                          <Trash2 size={13} />
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

      {/* Invoice Modal */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 1000, 
          padding: 24 
        }}>
          <div style={{ 
            backgroundColor: '#0c0d12', 
            width: '100%', 
            maxWidth: '740px', 
            maxHeight: '90vh', 
            borderRadius: '6px', 
            border: '1px solid rgba(255, 255, 255, 0.16)', 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            {/* Modal Crosshairs */}
            <span style={{ position: 'absolute', top: '-7px', left: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b' }}>+</span>
            <span style={{ position: 'absolute', top: '-7px', right: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b' }}>+</span>

            <div style={{ 
              padding: '18px 24px', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.015)'
            }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#38bdf8', letterSpacing: '0.08em', marginBottom: '2px' }}>
                  // BILLING TRANSACTION
                </div>
                <h2 style={{ margin: 0, color: '#f5f5f7', fontSize: '1.25rem', fontWeight: 700 }}>
                  {editingInvoice ? 'EDIT INVOICE RECORD' : 'CREATE NEW INVOICE'}
                </h2>
              </div>

              <button 
                onClick={closeModal} 
                style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '6px', color: '#9a9ba4', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              <form id="invoice-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      CLIENT RECIPIENT *
                    </label>
                    <select 
                      required
                      value={clientId} 
                      onChange={e => setClientId(e.target.value)} 
                      style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                    >
                      <option value="" disabled>Select client...</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      PAYMENT STATUS
                    </label>
                    <select 
                      value={status} 
                      onChange={e => setStatus(e.target.value)} 
                      style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      PAYMENT DUE DATE
                    </label>
                    <input 
                      type="date" 
                      value={dueDate} 
                      onChange={e => setDueDate(e.target.value)} 
                      style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px', colorScheme: 'dark' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      TOTAL AMOUNT (USD) *
                    </label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      value={amount} 
                      onChange={e => setAmount(e.target.value)} 
                      style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Line Items Section */}
                <div style={{ marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#f5f5f7', textTransform: 'uppercase' }}>
                      // ITEMIZED DELIVERABLES
                    </span>
                    <button 
                      type="button" 
                      onClick={addLineItem} 
                      style={{ 
                        background: 'none', 
                        color: '#38bdf8', 
                        border: '1px solid rgba(56, 189, 248, 0.25)', 
                        borderRadius: '3px',
                        padding: '3px 8px',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px', 
                        cursor: 'pointer', 
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px'
                      }}
                    >
                      <Plus size={12} /> ADD ROW
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {lineItems.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input 
                          type="text"
                          value={item.description}
                          onChange={e => handleLineItemChange(index, 'description', e.target.value)}
                          placeholder="Milestone or service description"
                          style={{ flex: 2, backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '8px 12px', borderRadius: '4px', color: '#f5f5f7', fontSize: '13px' }}
                        />
                        <input 
                          type="number"
                          step="0.01"
                          value={item.amount || ''}
                          onChange={e => handleLineItemChange(index, 'amount', parseFloat(e.target.value))}
                          placeholder="0.00"
                          style={{ flex: 1, backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '8px 12px', borderRadius: '4px', color: '#f5f5f7', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}
                        />
                        <button 
                          type="button" 
                          onClick={() => removeLineItem(index)} 
                          style={{ background: 'none', border: 'none', color: '#5e606b', cursor: 'pointer', padding: '4px' }} 
                          title="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: 'rgba(255, 255, 255, 0.015)' }}>
              <button 
                onClick={closeModal} 
                style={{ padding: '8px 16px', background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#9a9ba4', borderRadius: '4px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}
              >
                CANCEL
              </button>
              <button 
                form="invoice-form" 
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
                  textTransform: 'uppercase',
                  boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)'
                }}
              >
                SAVE INVOICE RECORD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
