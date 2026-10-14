import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { 
  Plus, 
  ExternalLink, 
  Pencil, 
  Trash2, 
  Image as ImageIcon, 
  X, 
  Cloud
} from 'lucide-react';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE',
    imageUrl: '',
    websiteUrl: '',
    tags: '',
    projectType: '',
    industry: '',
    platform: '',
    projectInfo: '',
    challenges: '',
    outcome: '',
    scopeOfWork: '',
    gallery: '',
    clientId: ''
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const [projectsRes, clientsRes] = await Promise.all([
        api.get('/projects?portfolio=true'),
        api.get('/clients')
      ]);
      setProjects(projectsRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        gallery: formData.gallery ? formData.gallery.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        isPortfolio: true
      };

      let finalImageUrl = formData.imageUrl;
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadRes = await api.post('/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        finalImageUrl = uploadRes.data.imageUrl;
      }

      if (editingId) {
        await api.put(`/projects/${editingId}`, {
          ...payload,
          imageUrl: finalImageUrl,
          clientId: formData.clientId || null
        });
      } else {
        await api.post('/projects', {
          ...payload,
          imageUrl: finalImageUrl,
          clientId: formData.clientId || null
        });
      }
      
      setShowModal(false);
      setEditingId(null);
      setImageFile(null);
      setFormData({
        name: '', description: '', status: 'ACTIVE', imageUrl: '', websiteUrl: '', tags: '', projectType: '', industry: '', platform: '', projectInfo: '', challenges: '', outcome: '', scopeOfWork: '', gallery: '', clientId: ''
      });
      await fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project: any) => {
    setFormData({
      name: project.name || '',
      description: project.description || '',
      status: project.status || 'ACTIVE',
      imageUrl: project.imageUrl || '',
      websiteUrl: project.websiteUrl || '',
      tags: project.tags ? project.tags.join(', ') : '',
      projectType: project.projectType || '',
      industry: project.industry || '',
      platform: project.platform || '',
      projectInfo: project.projectInfo || '',
      challenges: project.challenges || '',
      outcome: project.outcome || '',
      scopeOfWork: project.scopeOfWork || '',
      gallery: project.gallery ? project.gallery.join(', ') : '',
      clientId: project.clientId || ''
    });
    setEditingId(project.id);
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project from the portfolio?')) {
      try {
        await api.delete(`/projects/${id}`);
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const isCompleted = status === 'COMPLETED' || status === 'ACTIVE';
    return (
      <span className={`status-badge ${isCompleted ? 'paid' : 'pending'}`}>
        <span style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: isCompleted ? '#10b981' : '#f59e0b'
        }} />
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div style={{ paddingBottom: '2rem', flex: 1, overflowY: 'auto', paddingRight: '0.5rem', minHeight: 0 }}>
      {/* Header with Hairline Breadcrumb */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#38bdf8',
            marginBottom: '4px'
          }}>
            [ 04 // PUBLIC SHOWCASE ]
          </div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            PORTFOLIO PROJECTS
          </h1>
        </div>

        <button 
          onClick={() => {
            setEditingId(null);
            setImageFile(null);
            setFormData({
              name: '', description: '', status: 'ACTIVE', imageUrl: '', websiteUrl: '', tags: '', projectType: '', industry: '', platform: '', projectInfo: '', challenges: '', outcome: '', scopeOfWork: '', gallery: '', clientId: ''
            });
            setShowModal(true);
          }}
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
          <Plus size={14} /> NEW PORTFOLIO ITEM
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
          [ QUERYING SUPABASE PORTFOLIO... ]
        </div>
      ) : projects.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9a9ba4' }}>
          <div style={{ marginBottom: '1rem', opacity: 0.4 }}>
            <ImageIcon size={44} style={{ margin: '0 auto', color: '#38bdf8' }} />
          </div>
          <h3 style={{ fontSize: '1.1rem', color: '#f5f5f7', marginBottom: '0.5rem', fontFamily: "'JetBrains Mono', monospace" }}>
            // NO PORTFOLIO PROJECTS RECORDED
          </h3>
          <p style={{ fontSize: '13px', color: '#5e606b', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            Click "NEW PORTFOLIO ITEM" to add featured client case studies and deliverables.
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '1.25rem' 
        }}>
          {projects.map((project: any) => (
            <div 
              key={project.id} 
              className="card" 
              style={{ 
                padding: 0, 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: '#0c0d12',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Image Banner */}
              <div style={{ 
                height: '190px', 
                backgroundColor: '#070709', 
                backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(12, 13, 18, 0.95) 100%)'
                }} />

                {!project.imageUrl && (
                  <div style={{ textAlign: 'center', color: '#5e606b' }}>
                    <ImageIcon size={32} style={{ margin: '0 auto 6px auto', opacity: 0.5 }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>NO ASSET ATTACHED</span>
                  </div>
                )}

                <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 1 }}>
                  {getStatusBadge(project.status)}
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#f5f5f7' }}>
                    {project.name}
                  </h3>
                </div>
                
                {project.client && (
                  <div style={{ color: '#38bdf8', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.5rem' }}>
                    CLIENT: {project.client.name.toUpperCase()}
                  </div>
                )}

                <p style={{ color: '#9a9ba4', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                  {project.description || 'No summary text provided.'}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1.25rem' }}>
                  {project.tags && project.tags.map((tag: string, i: number) => (
                    <span key={i} style={{ 
                      fontSize: '10px', 
                      padding: '2px 6px', 
                      backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                      borderRadius: '3px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#9a9ba4',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {project.websiteUrl && (
                  <a 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '5px',
                      color: '#38bdf8',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      marginBottom: '1rem'
                    }}
                  >
                    <span>VIEW LIVE DEPLOYMENT</span>
                    <ExternalLink size={11} />
                  </a>
                )}

                {/* Actions Footer */}
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <button 
                    onClick={() => handleEdit(project)}
                    style={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px', 
                      padding: '8px', 
                      backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                      border: '1px solid rgba(255, 255, 255, 0.08)', 
                      borderRadius: '4px', 
                      color: '#f5f5f7', 
                      cursor: 'pointer',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <Pencil size={12} /> EDIT
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    style={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px', 
                      padding: '8px', 
                      backgroundColor: 'rgba(239, 68, 68, 0.06)', 
                      border: '1px solid rgba(239, 68, 68, 0.2)', 
                      borderRadius: '4px', 
                      color: '#f87171', 
                      cursor: 'pointer',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <Trash2 size={12} /> DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full-Feature Project Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div style={{ 
            backgroundColor: '#0c0d12',
            width: '100%', 
            maxWidth: '780px', 
            maxHeight: '92vh', 
            overflowY: 'auto',
            padding: '2rem',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.8)',
            position: 'relative'
          }}>
            {/* Modal Crosshairs */}
            <span style={{ position: 'absolute', top: '-7px', left: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b' }}>+</span>
            <span style={{ position: 'absolute', top: '-7px', right: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b' }}>+</span>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#38bdf8', letterSpacing: '0.08em', marginBottom: '2px' }}>
                  // PORTFOLIO EDITOR
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#f5f5f7', fontWeight: 700 }}>
                  {editingId ? 'EDIT PORTFOLIO CASE STUDY' : 'NEW PORTFOLIO CASE STUDY'}
                </h3>
              </div>

              <button 
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setImageFile(null);
                }}
                style={{ 
                  background: 'none', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '4px',
                  color: '#9a9ba4', 
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Core Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                    PROJECT TITLE *
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                    CLIENT / PARTNER
                  </label>
                  <select 
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  >
                    <option value="">No Client (Internal Project)</option>
                    {clients.map((client: any) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                  SHORT SUMMARY (FOR HERO & CARDS)
                </label>
                <textarea 
                  name="description" 
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              {/* Taxonomy */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>PROJECT TYPE</label>
                  <input 
                    type="text" 
                    name="projectType" 
                    placeholder="e.g. B2B Platform"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>INDUSTRY</label>
                  <input 
                    type="text" 
                    name="industry" 
                    placeholder="e.g. Fintech / AI"
                    value={formData.industry}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>PLATFORM</label>
                  <input 
                    type="text" 
                    name="platform" 
                    placeholder="e.g. Web & API"
                    value={formData.platform}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Case Study Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>CHALLENGES OVERCOME</label>
                  <textarea 
                    name="challenges" 
                    rows={3}
                    placeholder="Architectural or domain constraints solved..."
                    value={formData.challenges}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>OUTCOME / MEASURED RESULTS</label>
                  <textarea 
                    name="outcome" 
                    rows={3}
                    placeholder="Metrics, adoption rate, or ROI achieved..."
                    value={formData.outcome}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>SCOPE OF WORK</label>
                <textarea 
                  name="scopeOfWork" 
                  rows={2}
                  placeholder="e.g. Full-stack development, UX design, Supabase database migration..."
                  value={formData.scopeOfWork}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              {/* Media Asset & Cloudflare R2 Upload */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
                  <Cloud size={14} color="#38bdf8" />
                  <span style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#38bdf8' }}>
                    MEDIA ASSET STORAGE // CLOUDFLARE R2
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      UPLOAD FILE (DIRECT TO R2)
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setImageFile(e.target.files[0]);
                        }
                      }}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '12px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      OR SPECIFY PUBLIC ASSET URL
                    </label>
                    <input 
                      type="url" 
                      name="imageUrl"
                      placeholder="https://pub-r2.dev/sample.png"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Links & Tags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>WEBSITE / DEMO URL</label>
                  <input 
                    type="url" 
                    name="websiteUrl"
                    placeholder="https://client-demo.com"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>TECH STACK TAGS (COMMA SEPARATED)</label>
                  <input 
                    type="text" 
                    name="tags" 
                    placeholder="React, Supabase, Cloudflare, Tailwind"
                    value={formData.tags}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setImageFile(null);
                  }}
                  style={{ 
                    padding: '8px 16px', 
                    background: 'none', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    color: '#9a9ba4', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.04em'
                  }}
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
                  {submitting ? 'COMMITTING TO R2...' : (editingId ? 'SAVE CASE STUDY' : 'PUBLISH PROJECT')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
