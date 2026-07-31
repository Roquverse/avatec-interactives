import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Plus, X, ExternalLink, Image as ImageIcon, Pencil, Trash2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE',
    imageUrl: '',
    websiteUrl: '',
    tags: '',
    projectInfo: '',
    challenges: '',
    outcome: ''
  });

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
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
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

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
          ...formData,
          imageUrl: finalImageUrl,
          tags: tagsArray,
        });
      } else {
        await api.post('/projects', {
          ...formData,
          imageUrl: finalImageUrl,
          tags: tagsArray,
          clientId: null
        });
      }
      
      setShowModal(false);
      setEditingId(null);
      setImageFile(null);
      setFormData({
        name: '', description: '', status: 'ACTIVE', imageUrl: '', websiteUrl: '', tags: '', projectInfo: '', challenges: '', outcome: ''
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
      projectInfo: project.projectInfo || '',
      challenges: project.challenges || '',
      outcome: project.outcome || ''
    });
    setEditingId(project.id);
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
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
    switch(status.toLowerCase()) {
      case 'active':
        return <span className="badge badge-success">Active</span>;
      case 'planned':
        return <span className="badge badge-warning">Planned</span>;
      case 'completed':
        return <span className="badge badge-neutral">Completed</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>Portfolio Projects</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingId(null);
            setImageFile(null);
            setFormData({
              name: '', description: '', status: 'ACTIVE', imageUrl: '', websiteUrl: '', tags: '', projectInfo: '', challenges: '', outcome: ''
            });
            setShowModal(true);
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading portfolio projects...</div>
      ) : projects.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '1rem', opacity: 0.5 }}>
            <ImageIcon size={48} style={{ margin: '0 auto' }} />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No projects found</h3>
          <p>Get started by adding your first portfolio project.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {projects.map((project: any) => (
            <div key={project.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                height: '180px', 
                backgroundColor: 'rgba(0,0,0,0.2)', 
                backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                {!project.imageUrl && <ImageIcon size={32} opacity={0.2} />}
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, fontFamily: 'Outfit, sans-serif' }}>{project.name}</h3>
                  {getStatusBadge(project.status)}
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                  {project.description || 'No description provided.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {project.tags && project.tags.map((tag: string, i: number) => (
                    <span key={i} style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.2rem 0.6rem', 
                      backgroundColor: 'rgba(255,255,255,0.05)', 
                      borderRadius: '4px',
                      color: 'var(--text-secondary)'
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
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: 'var(--accent-primary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      marginBottom: '1rem'
                    }}
                  >
                    View Live Site <ExternalLink size={14} />
                  </a>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <button 
                    onClick={() => handleEdit(project)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '4px', color: '#ef4444', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
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
            maxHeight: '90vh', 
            overflowY: 'auto',
            padding: '2rem' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Outfit, sans-serif' }}>{editingId ? 'Edit Project' : 'New Portfolio Project'}</h3>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setImageFile(null);
                }}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Project Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Description (Short)</label>
                <textarea 
                  name="description" 
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Project Info (Detailed)</label>
                <textarea 
                  name="projectInfo" 
                  rows={4}
                  value={formData.projectInfo}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Challenges</label>
                <textarea 
                  name="challenges" 
                  rows={3}
                  value={formData.challenges}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Outcome / Results</label>
                <textarea 
                  name="outcome" 
                  rows={3}
                  value={formData.outcome}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="PLANNED">Planned</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Project Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                  <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>OR</div>
                  <input 
                    type="url" 
                    name="imageUrl"
                    placeholder="Image URL (e.g., https://example.com/image.png)"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Website URL</label>
                <input 
                  type="url" 
                  name="websiteUrl"
                  placeholder="https://myproject.com"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
                <input 
                  type="text" 
                  name="tags"
                  placeholder="React, UI/UX, Node.js"
                  value={formData.tags}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setImageFile(null);
                  }}
                  style={{ padding: '0.75rem 1.5rem', background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? (editingId ? 'Saving...' : 'Creating...') : (editingId ? 'Save Changes' : 'Create Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
