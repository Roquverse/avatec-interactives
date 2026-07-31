import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Plus, Users, CheckSquare, Trash2, CheckCircle, Globe } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, clientRes] = await Promise.all([
        api.get('/projects'),
        api.get('/clients')
      ]);
      setProjects(projRes.data);
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

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/projects/${id}`, { status });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePublishPortfolio = async (id: string) => {
    try {
      await api.put(`/projects/${id}`, { isPortfolio: true });
      fetchData();
    } catch (error) {
      console.error('Error publishing to portfolio:', error);
    }
  };

  const createProject = async () => {
    const name = prompt('Enter new project name:');
    if (!name) return;
    try {
      await api.post('/projects', { name, status: 'PLANNED' });
      fetchData();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const updateProjectMeta = async (updates: any) => {
    if (!selectedProject) return;
    try {
      const res = await api.put(`/projects/${selectedProject.id}`, updates);
      setSelectedProject({ ...selectedProject, ...res.data });
      fetchData();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  // Task Management
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !selectedProject) return;
    try {
      await api.post(`/tasks`, { projectId: selectedProject.id, title: newTaskTitle });
      setNewTaskTitle('');
      // refresh project
      const res = await api.get('/projects');
      setProjects(res.data);
      const updated = res.data.find((p: any) => p.id === selectedProject.id);
      setSelectedProject(updated);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      // refresh project
      const res = await api.get('/projects');
      setProjects(res.data);
      const updated = res.data.find((p: any) => p.id === selectedProject.id);
      setSelectedProject(updated);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      // refresh project
      const res = await api.get('/projects');
      setProjects(res.data);
      const updated = res.data.find((p: any) => p.id === selectedProject.id);
      setSelectedProject(updated);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getColumns = () => {
    return [
      { id: 'PLANNED', title: 'Planned' },
      { id: 'ACTIVE', title: 'Active' },
      { id: 'COMPLETED', title: 'Completed' }
    ];
  };

  if (loading) return <div style={{ padding: 40, color: 'white' }}>Loading board...</div>;

  return (
    <div style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'white', margin: 0 }}>Project Board</h1>
        <button 
          onClick={createProject}
          style={{ background: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 500 }}
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, overflowX: 'auto', paddingBottom: '16px' }}>
        {getColumns().map(col => (
          <div key={col.id} style={{ minWidth: '320px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#a3a3a3', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {col.title}
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
                {projects.filter(p => p.status === col.id).length}
              </span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
              {projects.filter(p => p.status === col.id).map(project => (
                <div 
                  key={project.id} 
                  onClick={() => { setSelectedProject(project); setIsModalOpen(true); }}
                  style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', cursor: 'pointer', position: 'relative' }}
                >
                  <h4 style={{ margin: '0 0 12px 0', color: 'white', fontSize: '16px' }}>{project.name}</h4>
                  
                  {project.client && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a3a3a3', fontSize: '13px', marginBottom: '12px' }}>
                      <Users size={14} />
                      {project.client.name}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#888', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckSquare size={14} />
                      {project.tasks?.filter((t:any) => t.status === 'DONE').length || 0} / {project.tasks?.length || 0}
                    </div>
                    {project.isPortfolio && (
                      <span style={{ color: '#a3e635', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Globe size={12} /> Published
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 40 }}>
          <div style={{ background: 'var(--bg-secondary)', width: '100%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: 'white', fontSize: '24px' }}>{selectedProject.name}</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <select 
                  value={selectedProject.status} 
                  onChange={(e) => {
                    handleUpdateStatus(selectedProject.id, e.target.value);
                    setSelectedProject({...selectedProject, status: e.target.value});
                  }}
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', outline: 'none' }}
                >
                  <option value="PLANNED">Planned</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#a3a3a3', cursor: 'pointer' }}>Close</button>
              </div>
            </div>

            <div style={{ padding: '32px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
              
              {/* Left Column: Tasks */}
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '18px', marginTop: 0, marginBottom: '24px' }}>
                  <CheckSquare size={20} color="#a3e635" /> Tasks
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {selectedProject.tasks?.map((task: any) => (
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '8px' }}>
                      <div 
                        onClick={() => toggleTask(task.id, task.status)}
                        style={{ cursor: 'pointer', color: task.status === 'DONE' ? '#a3e635' : '#555' }}
                      >
                        {task.status === 'DONE' ? <CheckCircle size={20} /> : <div style={{ width: 18, height: 18, border: '2px solid #555', borderRadius: '4px' }} />}
                      </div>
                      <span style={{ flex: 1, color: task.status === 'DONE' ? '#888' : 'white', textDecoration: task.status === 'DONE' ? 'line-through' : 'none', fontSize: '15px' }}>
                        {task.title}
                      </span>
                      <button onClick={() => deleteTask(task.id)} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={addTask} style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a new task..." 
                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}
                  />
                  <button type="submit" style={{ background: 'white', color: 'black', border: 'none', padding: '0 20px', borderRadius: '8px', fontWeight: 500, cursor: 'pointer' }}>Add</button>
                </form>
              </div>

              {/* Right Column: Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Publish to Portfolio */}
                {selectedProject.status === 'COMPLETED' && !selectedProject.isPortfolio && (
                  <div style={{ background: 'rgba(163, 230, 53, 0.1)', border: '1px solid rgba(163, 230, 53, 0.2)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                    <Globe size={32} color="#a3e635" style={{ marginBottom: 12 }} />
                    <h4 style={{ margin: '0 0 8px 0', color: 'white' }}>Publish Case Study</h4>
                    <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#a3a3a3' }}>Make this project visible on the public portfolio.</p>
                    <button 
                      onClick={() => handlePublishPortfolio(selectedProject.id)}
                      style={{ background: '#a3e635', color: 'black', border: 'none', padding: '10px 16px', borderRadius: '8px', width: '100%', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Publish Now
                    </button>
                  </div>
                )}
                {selectedProject.isPortfolio && (
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', textAlign: 'center', color: '#a3e635', fontSize: '14px', fontWeight: 500 }}>
                    <Globe size={16} style={{ verticalAlign: 'text-bottom', marginRight: 8 }} />
                    Published to Portfolio
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Client</label>
                  <select 
                    value={selectedProject.clientId || ''}
                    onChange={(e) => updateProjectMeta({ clientId: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }}
                  >
                    <option value="">No Client Assigned</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Timeline</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input 
                      type="date" 
                      value={selectedProject.startDate ? selectedProject.startDate.split('T')[0] : ''}
                      onChange={(e) => updateProjectMeta({ startDate: e.target.value })}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', colorScheme: 'dark' }}
                    />
                    <input 
                      type="date" 
                      value={selectedProject.endDate ? selectedProject.endDate.split('T')[0] : ''}
                      onChange={(e) => updateProjectMeta({ endDate: e.target.value })}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', colorScheme: 'dark' }}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
