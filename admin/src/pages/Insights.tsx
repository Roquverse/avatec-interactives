import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function Insights() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  
  // Form states
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
    setAuthor('');
    setTags('');
    setPublished(false);
    setIsModalOpen(true);
  };

  const openEditModal = (post: any) => {
    setEditingPost(post);
    setTitle(post.title || '');
    setContent(post.content || '');
    setAuthor(post.author || '');
    setTags(post.tags?.join(', ') || '');
    setPublished(post.published || false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">INSIGHTS</h1>
        <button 
          onClick={openNewModal}
          style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1px', overflow: 'hidden' }}>
        <table className="invoice-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading posts...</td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No posts found.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{post.title}</td>
                  <td>{post.author || '-'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {post.tags?.map((tag: string) => (
                        <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {post.published ? (
                      <span className="status-badge paid" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                        <CheckCircle size={12} /> Published
                      </span>
                    ) : (
                      <span className="status-badge draft" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                        <XCircle size={12} /> Draft
                      </span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEditModal(post)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete">
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

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 40 }}>
          <div style={{ background: 'var(--bg-secondary)', width: '100%', maxWidth: '700px', maxHeight: '90vh', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: 'white', fontSize: '20px' }}>{editingPost ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: '#a3a3a3', cursor: 'pointer' }}>Close</button>
            </div>

            <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
              <form id="post-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Title *</label>
                  <input 
                    required
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Author</label>
                    <input 
                      type="text" 
                      value={author} 
                      onChange={e => setAuthor(e.target.value)} 
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={tags} 
                      onChange={e => setTags(e.target.value)} 
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Content</label>
                  <textarea 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    rows={8}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                  <input 
                    type="checkbox" 
                    id="published" 
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                  />
                  <label htmlFor="published" style={{ color: 'white', cursor: 'pointer' }}>Publish this post immediately</label>
                </div>
              </form>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button onClick={closeModal} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button form="post-form" type="submit" style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
