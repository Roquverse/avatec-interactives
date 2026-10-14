import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { Plus, Trash2, Edit, CheckCircle, XCircle, X } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export default function Insights() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/blogs');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openNewModal = () => {
    setEditingPost(null);
    setTitle('');
    setContent('');
    setAuthor('Avatec Engineering');
    setTags('');
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content || '');
    setAuthor(post.author || '');
    setTags(post.tags ? post.tags.join(', ') : '');
    setPublished(post.published);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      title,
      content,
      author,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      published
    };

    try {
      if (editingPost) {
        await api.put(`/blogs/${editingPost.id}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      closeModal();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this editorial post permanently?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
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
            [ 05 // EDITORIAL INSIGHTS ]
          </div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            INSIGHTS & ARTICLES
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
          <Plus size={14} /> NEW PUBLICATION
        </button>
      </div>

      {/* Posts Table Card */}
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
            // EDITORIAL ARCHIVE ({posts.length})
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
                <th>ARTICLE TITLE</th>
                <th>AUTHOR</th>
                <th>TAGS</th>
                <th>VISIBILITY</th>
                <th>PUBLISHED DATE</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                    [ QUERYING EDITORIAL ARCHIVE... ]
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                    // NO ARTICLES PUBLISHED
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td style={{ fontWeight: 600, color: '#f5f5f7' }}>{post.title}</td>
                    <td style={{ color: '#9a9ba4', fontSize: '12px' }}>{post.author || 'Avatec'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {post.tags?.map((tag: string) => (
                          <span key={tag} style={{ 
                            background: 'rgba(255, 255, 255, 0.03)', 
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '2px 6px', 
                            borderRadius: '3px', 
                            fontSize: '10px', 
                            color: '#9a9ba4',
                            fontFamily: "'JetBrains Mono', monospace"
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {post.published ? (
                        <span className="status-badge paid">
                          <CheckCircle size={10} /> PUBLISHED
                        </span>
                      ) : (
                        <span className="status-badge draft">
                          <XCircle size={10} /> DRAFT
                        </span>
                      )}
                    </td>
                    <td style={{ color: '#5e606b', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>
                      {post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => openEditModal(post)} 
                          style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '4px', color: '#9a9ba4', cursor: 'pointer' }} 
                          title="Edit"
                        >
                          <Edit size={13} />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id)} 
                          style={{ background: 'none', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px', padding: '4px', color: '#f87171', cursor: 'pointer' }} 
                          title="Delete"
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

      {/* Editor Modal */}
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
            maxWidth: '680px', 
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
                  // ARTICLE DRAFT
                </div>
                <h2 style={{ margin: 0, color: '#f5f5f7', fontSize: '1.25rem', fontWeight: 700 }}>
                  {editingPost ? 'EDIT PUBLICATION' : 'CREATE ARTICLE'}
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
              <form id="post-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                    ARTICLE TITLE *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Architecting Scalable Web Applications"
                    style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      AUTHOR
                    </label>
                    <input 
                      type="text" 
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      placeholder="e.g. Engineering Lead"
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                      TOPIC TAGS (COMMA SEPARATED)
                    </label>
                    <input 
                      type="text" 
                      value={tags}
                      onChange={e => setTags(e.target.value)}
                      placeholder="Cloud, React, System Design"
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4' }}>
                    ARTICLE CONTENT (MARKDOWN SUPPORTED)
                  </label>
                  <textarea 
                    rows={8}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write insights narrative, case notes, or engineering perspective..."
                    style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '4px', backgroundColor: '#070709', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f5f5f7', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                    style={{ width: '14px', height: '14px', accentColor: '#38bdf8', cursor: 'pointer' }}
                  />
                  <label htmlFor="published" style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#f5f5f7', cursor: 'pointer', textTransform: 'uppercase' }}>
                    Publish to Public Insights Hub
                  </label>
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
                form="post-form" 
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
                SAVE PUBLICATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
