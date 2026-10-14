import React, { useState, useEffect, useMemo, useRef } from 'react';
import api from '../api/client';
import { 
  Plus, 
  Users, 
  CheckSquare, 
  Globe, 
  Trash2, 
  CheckCircle,
  X,
  Calendar,
  ExternalLink,
  Search,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Image as ImageIcon,
  Upload,
  Link2,
  GitBranch,
  Palette,
  Table,
  Kanban
} from 'lucide-react';

interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'TODO' | 'DONE';
}

interface OptionalLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'IN_DEVELOPMENT' | 'TESTING' | 'DEPLOYED' | 'IN_PRODUCTION' | 'COMPLETED';
  imageUrl?: string;
  websiteUrl?: string;
  tags?: string[];
  optionalLinks?: OptionalLink[];
  clientId?: string;
  client?: { id: string; name: string; email?: string };
  companyName?: string;
  country?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  progress?: number;
  isPortfolio?: boolean;
  projectInfo?: string;
  challenges?: string;
  outcome?: string;
  scopeOfWork?: string;
  gallery?: string[];
  tasks?: Task[];
  createdAt?: string;
}

interface ColumnDef {
  id: Project['status'];
  title: string;
  tag: string;
  color: string;
  desc: string;
  isLive?: boolean;
}

const COLUMNS: ColumnDef[] = [
  { 
    id: 'IN_DEVELOPMENT', 
    title: 'In Development', 
    tag: 'DEV', 
    color: '#38bdf8', 
    desc: 'Active sprint execution & build' 
  },
  { 
    id: 'TESTING', 
    title: 'Testing & QA', 
    tag: 'QA', 
    color: '#a78bfa', 
    desc: 'Automated suites & verification' 
  },
  { 
    id: 'DEPLOYED', 
    title: 'Deployed', 
    tag: 'STAGING', 
    color: '#60a5fa', 
    desc: 'Preview staging & cloud builds' 
  },
  { 
    id: 'IN_PRODUCTION', 
    title: 'In Production', 
    tag: 'PROD', 
    color: '#fb923c', 
    desc: 'Live infrastructure runtime' 
  },
  { 
    id: 'COMPLETED', 
    title: 'Completed', 
    tag: 'DONE', 
    color: '#34d399', 
    desc: 'Shipped to Frontpage Works',
    isLive: true
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('ALL');
  const [showcaseOnly, setShowcaseOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');

  // Inspector & Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Drag and Drop state
  const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // Inline Quick Add state per column
  const [quickAddCol, setQuickAddCol] = useState<string | null>(null);
  const [quickAddName, setQuickAddName] = useState('');

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' } | null>(null);

  // Create Project Form State
  const [formName, setFormName] = useState('');
  const [formStatus, setFormStatus] = useState<Project['status']>('IN_DEVELOPMENT');
  const [formClientId, setFormClientId] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formWebsiteUrl, setFormWebsiteUrl] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formFigmaUrl, setFormFigmaUrl] = useState('');
  const [formCustomLinks, setFormCustomLinks] = useState<{ label: string; url: string }[]>([]);
  const [formGallery, setFormGallery] = useState<string[]>([]);
  const [formNewGalleryUrl, setFormNewGalleryUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // File upload input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inspectorFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const inspectorGalleryFileInputRef = useRef<HTMLInputElement>(null);
  const [inspectorNewGalleryUrl, setInspectorNewGalleryUrl] = useState('');

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Reset Create Form
  const resetCreateForm = (initialStatus: Project['status'] = 'IN_DEVELOPMENT') => {
    setFormName('');
    setFormStatus(initialStatus);
    setFormClientId('');
    setFormCategory('');
    setFormDescription('');
    setFormImageUrl('');
    setFormWebsiteUrl('');
    setFormGithubUrl('');
    setFormFigmaUrl('');
    setFormCustomLinks([]);
    setFormGallery([]);
    setFormNewGalleryUrl('');
  };

  // Fetch all projects and clients
  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, clientRes] = await Promise.all([
        api.get('/projects'),
        api.get('/clients')
      ]);
      setProjects(projRes.data || []);
      setClients(clientRes.data || []);
    } catch (error) {
      console.error('Error fetching project board data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update Project Status with Automatic Frontpage Showcase sync
  const handleUpdateStatus = async (id: string, newStatus: Project['status']) => {
    const isCompleted = newStatus === 'COMPLETED';
    
    // Optimistic UI update
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: newStatus,
          isPortfolio: isCompleted ? true : p.isPortfolio
        };
      }
      return p;
    }));

    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(prev => prev ? {
        ...prev,
        status: newStatus,
        isPortfolio: isCompleted ? true : prev.isPortfolio
      } : null);
    }

    try {
      const updates: any = { status: newStatus };
      if (isCompleted) {
        updates.isPortfolio = true;
      }
      await api.put(`/projects/${id}`, updates);

      if (isCompleted) {
        showToast('Project moved to COMPLETED — Automatically published to Frontpage Works!', 'success');
      } else {
        const colDef = COLUMNS.find(c => c.id === newStatus);
        showToast(`Project moved to ${colDef?.title || newStatus}`, 'info');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      fetchData();
    }
  };

  // Quick move between adjacent columns (← and →)
  const handleMoveAdjacent = (e: React.MouseEvent, project: Project, direction: 'prev' | 'next') => {
    e.stopPropagation();
    const currentIndex = COLUMNS.findIndex(c => c.id === project.status);
    if (currentIndex === -1) return;
    
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex >= 0 && targetIndex < COLUMNS.length) {
      handleUpdateStatus(project.id, COLUMNS[targetIndex].id);
    }
  };

  // Toggle isPortfolio manually
  const handleTogglePortfolio = async (id: string, currentVal: boolean) => {
    const newVal = !currentVal;
    try {
      await api.put(`/projects/${id}`, { isPortfolio: newVal });
      setProjects(prev => prev.map(p => p.id === id ? { ...p, isPortfolio: newVal } : p));
      if (selectedProject && selectedProject.id === id) {
        setSelectedProject(prev => prev ? { ...prev, isPortfolio: newVal } : null);
      }
      showToast(newVal ? 'Project is now LIVE on Frontpage Works!' : 'Removed from public Frontpage showcase.', 'info');
    } catch (error) {
      console.error('Error updating portfolio state:', error);
    }
  };

  // Drag and Drop Event Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedProjectId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedProjectId(null);
    setDragOverCol(null);
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDragLeave = (_e: React.DragEvent, colId: string) => {
    if (dragOverCol === colId) {
      setDragOverCol(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetColId: Project['status']) => {
    e.preventDefault();
    setDragOverCol(null);
    const projectId = draggedProjectId || e.dataTransfer.getData('text/plain');
    if (!projectId) return;

    const project = projects.find(p => p.id === projectId);
    if (project && project.status !== targetColId) {
      handleUpdateStatus(projectId, targetColId);
    }
    setDraggedProjectId(null);
  };

  // Inline Quick Add Submit
  const handleQuickAdd = async (colId: Project['status']) => {
    if (!quickAddName.trim()) {
      setQuickAddCol(null);
      return;
    }
    try {
      const isCompleted = colId === 'COMPLETED';
      const res = await api.post('/projects', {
        name: quickAddName.trim(),
        status: colId,
        isPortfolio: isCompleted
      });
      setQuickAddName('');
      setQuickAddCol(null);
      setProjects(prev => [res.data, ...prev]);
      showToast(`Created project "${res.data.name}" in ${COLUMNS.find(c => c.id === colId)?.title}`, 'success');
    } catch (error) {
      console.error('Error creating inline project:', error);
    }
  };

  // Upload image handler
  const handleFileUpload = async (file: File, isForInspector = false) => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/upload', formData);
      const url = res.data.imageUrl;
      if (isForInspector && selectedProject) {
        updateProjectMeta({ imageUrl: url });
      } else {
        setFormImageUrl(url);
      }
      showToast('Image uploaded successfully', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      try {
        const reader = new FileReader();
        reader.onload = () => {
          const fallbackUrl = reader.result as string;
          if (isForInspector && selectedProject) {
            updateProjectMeta({ imageUrl: fallbackUrl });
          } else {
            setFormImageUrl(fallbackUrl);
          }
        };
        reader.readAsDataURL(file);
        showToast('Image saved locally as embedded data', 'info');
      } catch (fallbackErr) {
        console.error('Data URL fallback failed:', fallbackErr);
        showToast('Image upload failed', 'info');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload gallery image handler
  const handleGalleryUpload = async (file: File, isForInspector = false) => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/upload', formData);
      const url = res.data.imageUrl;
      if (isForInspector && selectedProject) {
        const currentGallery = selectedProject.gallery || [];
        const nextGallery = [...currentGallery, url];
        updateProjectMeta({ gallery: nextGallery });
      } else {
        setFormGallery(prev => [...prev, url]);
      }
      showToast('Gallery image uploaded successfully', 'success');
    } catch (err) {
      console.error('Gallery upload failed:', err);
      const reader = new FileReader();
      reader.onload = () => {
        const fallbackUrl = reader.result as string;
        if (isForInspector && selectedProject) {
          const currentGallery = selectedProject.gallery || [];
          const nextGallery = [...currentGallery, fallbackUrl];
          updateProjectMeta({ gallery: nextGallery });
        } else {
          setFormGallery(prev => [...prev, fallbackUrl]);
        }
      };
      reader.readAsDataURL(file);
      showToast('Gallery image saved locally as embedded data', 'info');
    } finally {
      setUploadingImage(false);
    }
  };

  // Update selected project meta fields
  const updateProjectMeta = async (updates: Partial<Project>) => {
    if (!selectedProject) return;
    try {
      const res = await api.put(`/projects/${selectedProject.id}`, updates);
      setSelectedProject(prev => prev ? { ...prev, ...res.data } : null);
      setProjects(prev => prev.map(p => p.id === selectedProject.id ? { ...p, ...res.data } : p));
      showToast('Project updated', 'info');
    } catch (error) {
      console.error('Error updating project metadata:', error);
    }
  };

  // Delete project
  const handleDeleteProject = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return;
    }
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProject?.id === id) {
        setIsInspectorOpen(false);
        setSelectedProject(null);
      }
      showToast(`Deleted "${name}"`, 'info');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Task Management
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedProject) return;
    try {
      const res = await api.post('/tasks', {
        projectId: selectedProject.id,
        title: newTaskTitle.trim()
      });
      setNewTaskTitle('');
      const createdTask: Task = res.data;
      
      const updatedTasks = [...(selectedProject.tasks || []), createdTask];
      setSelectedProject({ ...selectedProject, tasks: updatedTasks });
      setProjects(prev => prev.map(p => p.id === selectedProject.id ? { ...p, tasks: updatedTasks } : p));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      if (selectedProject) {
        const updatedTasks = (selectedProject.tasks || []).map(t => 
          t.id === taskId ? { ...t, status: newStatus as 'TODO' | 'DONE' } : t
        );
        setSelectedProject({ ...selectedProject, tasks: updatedTasks });
        setProjects(prev => prev.map(p => p.id === selectedProject.id ? { ...p, tasks: updatedTasks } : p));
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      if (selectedProject) {
        const updatedTasks = (selectedProject.tasks || []).filter(t => t.id !== taskId);
        setSelectedProject({ ...selectedProject, tasks: updatedTasks });
        setProjects(prev => prev.map(p => p.id === selectedProject.id ? { ...p, tasks: updatedTasks } : p));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Submit Create New Project
  const handleCreateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const isCompleted = formStatus === 'COMPLETED';

    // Compile optional links
    const optionalLinks: OptionalLink[] = [];
    if (formGithubUrl.trim()) {
      optionalLinks.push({ label: 'GitHub', url: formGithubUrl.trim() });
    }
    if (formFigmaUrl.trim()) {
      optionalLinks.push({ label: 'Figma', url: formFigmaUrl.trim() });
    }
    formCustomLinks.forEach(cl => {
      if (cl.url.trim()) {
        optionalLinks.push({ label: cl.label.trim() || 'Link', url: cl.url.trim() });
      }
    });

    try {
      const res = await api.post('/projects', {
        name: formName.trim(),
        clientId: formClientId || undefined,
        status: formStatus,
        category: formCategory.trim() || 'General',
        description: formDescription.trim(),
        imageUrl: formImageUrl.trim(),
        websiteUrl: formWebsiteUrl.trim(),
        gallery: formGallery,
        optionalLinks: optionalLinks,
        isPortfolio: isCompleted
      });

      setProjects(prev => [res.data, ...prev]);
      setIsNewModalOpen(false);
      resetCreateForm();
      showToast(`Project "${res.data.name}" initialized with visuals & links!`, 'success');
    } catch (err) {
      console.error('Failed to create project:', err);
      showToast('Failed to create project. Please check input.', 'info');
    }
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesClient = p.client?.name?.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        const matchesTags = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesClient && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // Client filter
      if (clientFilter !== 'ALL' && p.clientId !== clientFilter) {
        return false;
      }

      // Showcase filter
      if (showcaseOnly && !(p.status === 'COMPLETED' || p.isPortfolio)) {
        return false;
      }

      return true;
    });
  }, [projects, searchQuery, clientFilter, showcaseOnly]);

  // Project statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'COMPLETED' || p.isPortfolio).length;
    const inDev = projects.filter(p => p.status === 'IN_DEVELOPMENT').length;
    return { total, completed, inDev };
  }, [projects]);

  if (loading) {
    return (
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#5e606b', 
        fontFamily: "'JetBrains Mono', monospace", 
        fontSize: '12px',
        letterSpacing: '0.08em'
      }}>
        [ INITIALIZING PROJECT KANBAN BOARD... ]
      </div>
    );
  }

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: 0, 
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          zIndex: 2000,
          backgroundColor: '#0c0d12',
          border: '1px solid rgba(52, 211, 153, 0.4)',
          borderRadius: '4px',
          padding: '10px 16px',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 15px rgba(52, 211, 153, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#f5f5f7',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 8px #34d399' }} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Hidden file inputs for uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0], false);
          }
        }}
      />
      <input 
        type="file" 
        ref={inspectorFileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0], true);
          }
        }}
      />
      <input 
        type="file" 
        ref={galleryFileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleGalleryUpload(e.target.files[0], false);
          }
        }}
      />
      <input 
        type="file" 
        ref={inspectorGalleryFileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleGalleryUpload(e.target.files[0], true);
          }
        }}
      />

      {/* Page Header */}
      <div style={{ 
        marginBottom: '1rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        paddingBottom: '1rem'
      }}>
        {/* Top Row: Title + Stats + New Button */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#38bdf8',
              marginBottom: '3px'
            }}>
              [ 02 // PIPELINE MANAGEMENT ]
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.02em' }}>
                PROJECT BOARD
              </h1>
              
              {/* Live Showcase Indicator Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 9px',
                borderRadius: '3px',
                backgroundColor: 'rgba(52, 211, 153, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                color: '#34d399',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.04em'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                <span>{stats.completed} LIVE ON FRONTPAGE</span>
              </div>
            </div>
          </div>

          {/* Action Header Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => {
                resetCreateForm('IN_DEVELOPMENT');
                setIsNewModalOpen(true);
              }}
              style={{ 
                background: '#f5f5f7', 
                color: '#070709', 
                border: '1px solid rgba(255, 255, 255, 0.35)', 
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
                boxShadow: '0 0 16px rgba(255, 255, 255, 0.08)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f7';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 255, 255, 0.08)';
              }}
            >
              <Plus size={14} /> NEW PROJECT
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {/* Search Box */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            backgroundColor: '#0c0d12',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '6px 12px',
            borderRadius: '4px',
            flex: '1 1 240px',
            maxWidth: '340px'
          }}>
            <Search size={14} color="#5e606b" />
            <input 
              type="text"
              placeholder="Search projects, client, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f5f5f7',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                width: '100%'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#5e606b', cursor: 'pointer', padding: 0 }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Client Filter & Quick Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#5e606b' }}>
                CLIENT:
              </span>
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                style={{
                  backgroundColor: '#0c0d12',
                  color: '#9a9ba4',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  outline: 'none',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px'
                }}
              >
                <option value="ALL">ALL CLIENTS</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Showcase Toggle */}
            <button
              onClick={() => setShowcaseOnly(!showcaseOnly)}
              style={{
                backgroundColor: showcaseOnly ? 'rgba(52, 211, 153, 0.15)' : '#0c0d12',
                color: showcaseOnly ? '#34d399' : '#9a9ba4',
                border: `1px solid ${showcaseOnly ? 'rgba(52, 211, 153, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Globe size={12} />
              {showcaseOnly ? 'FRONTPAGE WORKS ONLY' : 'SHOW FRONTPAGE WORKS'}
            </button>

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0c0d12',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '4px',
              padding: '2px'
            }}>
              <button
                type="button"
                onClick={() => setViewMode('board')}
                style={{
                  background: viewMode === 'board' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: viewMode === 'board' ? '#38bdf8' : '#9a9ba4',
                  border: viewMode === 'board' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  borderRadius: '3px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                title="Kanban Board View"
              >
                <Kanban size={11} />
                <span>BOARD</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('table')}
                style={{
                  background: viewMode === 'table' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: viewMode === 'table' ? '#38bdf8' : '#9a9ba4',
                  border: viewMode === 'table' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  borderRadius: '3px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                title="Table View"
              >
                <Table size={11} />
                <span>TABLE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Board or Table Container */}
      {viewMode === 'board' ? (
        /* Kanban Board Horizontal Scroll Container */
        <div style={{ 
          display: 'flex', 
          gap: '14px', 
          flex: 1, 
          overflowX: 'auto', 
          paddingBottom: '14px', 
          minHeight: 0 
        }}>
        {COLUMNS.map(col => {
          const colProjects = filteredProjects.filter(p => p.status === col.id);
          const isDragOver = dragOverCol === col.id;

          return (
            <div 
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={(e) => handleDragLeave(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              style={{ 
                minWidth: '320px', 
                flex: 1, 
                backgroundColor: isDragOver ? 'rgba(56, 189, 248, 0.03)' : '#0c0d12', 
                border: isDragOver 
                  ? '1px dashed #38bdf8' 
                  : col.isLive 
                    ? '1px solid rgba(52, 211, 153, 0.25)' 
                    : '1px solid rgba(255, 255, 255, 0.08)', 
                borderRadius: '6px', 
                padding: '14px', 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: 0,
                position: 'relative',
                transition: 'border-color 0.15s ease, background-color 0.15s ease'
              }}
            >
              {/* Column Top Accent Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '12px',
                right: '12px',
                height: '2px',
                backgroundColor: col.color,
                opacity: 0.7,
                borderRadius: '2px'
              }} />

              {/* Column Header */}
              <div style={{ 
                margin: '4px 0 12px 0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    width: 7, 
                    height: 7, 
                    borderRadius: '50%', 
                    backgroundColor: col.color,
                    boxShadow: col.isLive ? `0 0 8px ${col.color}` : 'none'
                  }} />
                  <span style={{ 
                    fontFamily: "'JetBrains Mono', monospace", 
                    fontSize: '11px', 
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                    color: '#f5f5f7',
                    textTransform: 'uppercase'
                  }}>
                    {col.title}
                  </span>
                  <span style={{
                    fontSize: '9px',
                    fontFamily: "'JetBrains Mono', monospace",
                    padding: '1px 5px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    color: col.color,
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    {col.tag}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '2px 7px', 
                    borderRadius: '3px', 
                    fontSize: '11px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#9a9ba4',
                    fontWeight: 600
                  }}>
                    {colProjects.length}
                  </span>

                  {/* Inline quick add trigger */}
                  <button
                    onClick={() => {
                      setQuickAddCol(quickAddCol === col.id ? null : col.id);
                      setQuickAddName('');
                    }}
                    title={`Quick add to ${col.title}`}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '3px',
                      color: '#9a9ba4',
                      cursor: 'pointer',
                      padding: '2px 5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Frontpage Live Note for Completed Column */}
              {col.isLive && (
                <div style={{
                  backgroundColor: 'rgba(52, 211, 153, 0.05)',
                  border: '1px solid rgba(52, 211, 153, 0.18)',
                  borderRadius: '3px',
                  padding: '6px 8px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '10px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#34d399'
                }}>
                  <Globe size={11} />
                  <span>Items here display on Frontpage Works</span>
                </div>
              )}

              {/* Inline Quick Add Form */}
              {quickAddCol === col.id && (
                <div style={{
                  marginBottom: '12px',
                  backgroundColor: '#070709',
                  border: '1px solid #38bdf8',
                  borderRadius: '4px',
                  padding: '8px'
                }}>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Enter project name + press Enter..."
                    value={quickAddName}
                    onChange={(e) => setQuickAddName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleQuickAdd(col.id);
                      if (e.key === 'Escape') setQuickAddCol(null);
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#f5f5f7',
                      fontSize: '12px',
                      fontFamily: "'Inter', sans-serif",
                      marginBottom: '6px'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button
                      onClick={() => setQuickAddCol(null)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#5e606b',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer'
                      }}
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={() => handleQuickAdd(col.id)}
                      style={{
                        background: '#38bdf8',
                        color: '#070709',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '2px 8px',
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer'
                      }}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              )}

              {/* Cards List in this Column */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px', 
                flex: 1, 
                overflowY: 'auto', 
                paddingRight: '2px' 
              }}>
                {colProjects.length === 0 ? (
                  <div style={{
                    padding: '2.5rem 1rem',
                    textAlign: 'center',
                    color: '#474955',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    border: '1px dashed rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px',
                    letterSpacing: '0.04em'
                  }}>
                    // NO CARDS IN STAGE
                  </div>
                ) : (
                  colProjects.map(project => {
                    const isCompleted = project.status === 'COMPLETED' || project.isPortfolio;
                    const tasks = project.tasks || [];
                    const doneTasks = tasks.filter(t => t.status === 'DONE').length;
                    const taskPct = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;
                    const isDragging = draggedProjectId === project.id;

                    const colIndex = COLUMNS.findIndex(c => c.id === project.status);
                    const canMovePrev = colIndex > 0;
                    const canMoveNext = colIndex < COLUMNS.length - 1;

                    return (
                      <div 
                        key={project.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, project.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => { setSelectedProject(project); setIsInspectorOpen(true); }}
                        style={{ 
                          backgroundColor: '#070709', 
                          border: isCompleted 
                            ? '1px solid rgba(52, 211, 153, 0.3)' 
                            : '1px solid rgba(255, 255, 255, 0.08)', 
                          borderRadius: '4px', 
                          padding: '12px 14px', 
                          cursor: 'pointer', 
                          position: 'relative',
                          transition: 'all 0.15s ease',
                          opacity: isDragging ? 0.4 : 1,
                          boxShadow: isCompleted ? '0 0 14px rgba(52, 211, 153, 0.05)' : 'none',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = isCompleted 
                            ? 'rgba(52, 211, 153, 0.6)' 
                            : 'rgba(56, 189, 248, 0.4)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isCompleted 
                            ? 'rgba(52, 211, 153, 0.3)' 
                            : 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = isCompleted ? '0 0 14px rgba(52, 211, 153, 0.05)' : 'none';
                        }}
                      >
                        {/* Cover Image Thumbnail (if present) */}
                        {project.imageUrl && (
                          <div style={{
                            width: 'calc(100% + 28px)',
                            height: '100px',
                            margin: '-12px -14px 10px -14px',
                            overflow: 'hidden',
                            position: 'relative',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            backgroundColor: '#000'
                          }}>
                            <img 
                              src={project.imageUrl} 
                              alt={project.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                            />
                          </div>
                        )}

                        {/* Top Badges Row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ 
                              cursor: 'grab', 
                              color: '#5e606b', 
                              display: 'flex', 
                              alignItems: 'center' 
                            }} title="Drag to reorder stage">
                              <GripVertical size={13} />
                            </span>
                            
                            {project.category ? (
                              <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '9px',
                                textTransform: 'uppercase',
                                color: '#38bdf8',
                                letterSpacing: '0.04em'
                              }}>
                                [{project.category}]
                              </span>
                            ) : (
                              <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '9px',
                                color: '#5e606b',
                                letterSpacing: '0.04em'
                              }}>
                                [PRJ-{project.id.slice(0, 4).toUpperCase()}]
                              </span>
                            )}
                          </div>

                          {/* Frontpage Live Badge */}
                          {isCompleted ? (
                            <span style={{ 
                              color: '#34d399', 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px',
                              backgroundColor: 'rgba(52, 211, 153, 0.1)',
                              padding: '2px 6px',
                              borderRadius: '2px',
                              border: '1px solid rgba(52, 211, 153, 0.3)',
                              fontSize: '9px',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontWeight: 600,
                              letterSpacing: '0.04em'
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                              FRONTPAGE
                            </span>
                          ) : (
                            <span style={{
                              color: '#5e606b',
                              fontSize: '9px',
                              fontFamily: "'JetBrains Mono', monospace"
                            }}>
                              {col.tag}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 style={{ 
                          margin: '0 0 6px 0', 
                          color: '#f5f5f7', 
                          fontSize: '13px',
                          fontWeight: 600,
                          lineHeight: 1.4
                        }}>
                          {project.name}
                        </h4>

                        {/* Description Preview (if any) */}
                        {project.description && (
                          <p style={{
                            margin: '0 0 8px 0',
                            fontSize: '11px',
                            color: '#9a9ba4',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {project.description}
                          </p>
                        )}

                        {/* Client Chip & Live Link */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                          {project.client ? (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '5px', 
                              color: '#9a9ba4', 
                              fontSize: '11px' 
                            }}>
                              <Users size={11} color="#38bdf8" />
                              <span>{project.client.name}</span>
                            </div>
                          ) : (
                            <div style={{ color: '#5e606b', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace" }}>
                              INTERNAL
                            </div>
                          )}

                          {project.websiteUrl && (
                            <a
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title={`Open live URL: ${project.websiteUrl}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                color: '#38bdf8',
                                fontSize: '10px',
                                fontFamily: "'JetBrains Mono', monospace",
                                textDecoration: 'none',
                                background: 'rgba(56, 189, 248, 0.08)',
                                border: '1px solid rgba(56, 189, 248, 0.2)',
                                padding: '1px 5px',
                                borderRadius: '2px'
                              }}
                            >
                              <Globe size={10} />
                              <span>LIVE</span>
                              <ExternalLink size={9} />
                            </a>
                          )}
                        </div>

                        {/* Optional Links Badges on Card */}
                        {project.optionalLinks && project.optionalLinks.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                            {project.optionalLinks.map((l, i) => (
                              <a
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  fontSize: '9px',
                                  fontFamily: "'JetBrains Mono', monospace",
                                  color: '#cbd5e1',
                                  background: 'rgba(255, 255, 255, 0.04)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  padding: '1px 5px',
                                  borderRadius: '2px',
                                  textDecoration: 'none'
                                }}
                              >
                                <Link2 size={9} color="#9a9ba4" />
                                <span>{l.label}</span>
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Tasks Progress Bar (if tasks exist) */}
                        {tasks.length > 0 && (
                          <div style={{ marginBottom: '8px' }}>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              fontSize: '10px',
                              fontFamily: "'JetBrains Mono', monospace",
                              color: '#9a9ba4',
                              marginBottom: '4px'
                            }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckSquare size={11} color={taskPct === 100 ? '#34d399' : '#38bdf8'} />
                                <span>{doneTasks}/{tasks.length} tasks</span>
                              </span>
                              <span>{taskPct}%</span>
                            </div>

                            <div style={{
                              width: '100%',
                              height: '3px',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              borderRadius: '2px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                width: `${taskPct}%`,
                                height: '100%',
                                backgroundColor: taskPct === 100 ? '#34d399' : '#38bdf8',
                                transition: 'width 0.2s ease'
                              }} />
                            </div>
                          </div>
                        )}

                        {/* Card Footer: Quick Move Controls + Date */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          color: '#5e606b', 
                          fontSize: '10px', 
                          fontFamily: "'JetBrains Mono', monospace",
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
                          paddingTop: '8px',
                          marginTop: '4px'
                        }}>
                          {/* Left: Quick Date / ID */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {project.endDate ? (
                              <>
                                <Calendar size={11} />
                                <span>{project.endDate.split('T')[0]}</span>
                              </>
                            ) : (
                              <span>ID: {project.id.slice(0, 6)}</span>
                            )}
                          </div>

                          {/* Right: Tactile Quick Move Arrows */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {canMovePrev && (
                              <button
                                onClick={(e) => handleMoveAdjacent(e, project, 'prev')}
                                title="Move to previous column"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.03)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  borderRadius: '2px',
                                  color: '#9a9ba4',
                                  cursor: 'pointer',
                                  padding: '2px 4px',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <ChevronLeft size={11} />
                              </button>
                            )}

                            {canMoveNext && (
                              <button
                                onClick={(e) => handleMoveAdjacent(e, project, 'next')}
                                title="Move to next column"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.03)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  borderRadius: '2px',
                                  color: '#9a9ba4',
                                  cursor: 'pointer',
                                  padding: '2px 4px',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <ChevronRight size={11} />
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Column Bottom Quick Trigger */}
              <button
                onClick={() => {
                  resetCreateForm(col.id);
                  setIsNewModalOpen(true);
                }}
                style={{
                  marginTop: '10px',
                  background: 'none',
                  border: '1px dashed rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#9a9ba4',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#f5f5f7';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#9a9ba4';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Plus size={12} /> ADD CARD
              </button>
            </div>
          );
        })}
        </div>
      ) : (
        /* Project Table View */
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          backgroundColor: '#0c0d12', 
          border: '1px solid rgba(255, 255, 255, 0.08)', 
          borderRadius: '6px',
          minHeight: 0
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: '#070709',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#9a9ba4',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <th style={{ padding: '12px 14px', width: '70px' }}>IMAGE</th>
                <th style={{ padding: '12px 14px' }}>PROJECT</th>
                <th style={{ padding: '12px 14px' }}>CLIENT</th>
                <th style={{ padding: '12px 14px' }}>STAGE</th>
                <th style={{ padding: '12px 14px' }}>PRIMARY URL</th>
                <th style={{ padding: '12px 14px' }}>OPTIONAL LINKS</th>
                <th style={{ padding: '12px 14px' }}>TASKS</th>
                <th style={{ padding: '12px 14px' }}>SHOWCASE</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '3rem 1rem', textAlign: 'center', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
                    // NO PROJECTS FOUND MATCHING QUERY
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const isCompleted = project.status === 'COMPLETED' || project.isPortfolio;
                  const tasks = project.tasks || [];
                  const doneTasks = tasks.filter(t => t.status === 'DONE').length;
                  const taskPct = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;
                  const colDef = COLUMNS.find(c => c.id === project.status);

                  return (
                    <tr 
                      key={project.id}
                      onClick={() => { setSelectedProject(project); setIsInspectorOpen(true); }}
                      style={{ 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      {/* Image Thumbnail */}
                      <td style={{ padding: '10px 14px' }}>
                        {project.imageUrl ? (
                          <div style={{
                            width: '54px',
                            height: '34px',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: '#000'
                          }}>
                            <img src={project.imageUrl} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <div style={{
                            width: '54px',
                            height: '34px',
                            borderRadius: '3px',
                            border: '1px dashed rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#5e606b'
                          }}>
                            <ImageIcon size={14} />
                          </div>
                        )}
                      </td>

                      {/* Project Name & Category */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#f5f5f7', fontWeight: 600, fontSize: '13px' }}>
                            {project.name}
                          </span>
                          {project.category && (
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '9px',
                              color: '#38bdf8',
                              backgroundColor: 'rgba(56, 189, 248, 0.08)',
                              padding: '1px 5px',
                              borderRadius: '2px',
                              border: '1px solid rgba(56, 189, 248, 0.2)'
                            }}>
                              {project.category}
                            </span>
                          )}
                        </div>
                        {project.description && (
                          <div style={{
                            color: '#9a9ba4',
                            fontSize: '11px',
                            maxWidth: '280px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: '2px'
                          }}>
                            {project.description}
                          </div>
                        )}
                      </td>

                      {/* Client */}
                      <td style={{ padding: '10px 14px' }}>
                        {project.client ? (
                          <span style={{ color: '#9a9ba4', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={12} color="#38bdf8" />
                            {project.client.name}
                          </span>
                        ) : (
                          <span style={{ color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
                            INTERNAL
                          </span>
                        )}
                      </td>

                      {/* Stage Dropdown */}
                      <td style={{ padding: '10px 14px' }} onClick={(e) => e.stopPropagation()}>
                        <select
                          value={project.status}
                          onChange={(e) => handleUpdateStatus(project.id, e.target.value as Project['status'])}
                          style={{
                            backgroundColor: '#070709',
                            color: colDef?.color || '#f5f5f7',
                            border: `1px solid ${colDef?.color ? colDef.color + '40' : 'rgba(255, 255, 255, 0.1)'}`,
                            padding: '4px 8px',
                            borderRadius: '3px',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '10px',
                            fontWeight: 600,
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {COLUMNS.map(c => (
                            <option key={c.id} value={c.id}>{c.title.toUpperCase()}</option>
                          ))}
                        </select>
                      </td>

                      {/* Live Project URL */}
                      <td style={{ padding: '10px 14px' }}>
                        {project.websiteUrl ? (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#38bdf8',
                              fontSize: '11px',
                              fontFamily: "'JetBrains Mono', monospace",
                              textDecoration: 'none',
                              backgroundColor: 'rgba(56, 189, 248, 0.08)',
                              border: '1px solid rgba(56, 189, 248, 0.25)',
                              padding: '2px 7px',
                              borderRadius: '3px'
                            }}
                          >
                            <Globe size={11} />
                            <span>LIVE SITE</span>
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span style={{ color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>—</span>
                        )}
                      </td>

                      {/* Optional Links */}
                      <td style={{ padding: '10px 14px' }}>
                        {project.optionalLinks && project.optionalLinks.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {project.optionalLinks.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  color: '#cbd5e1',
                                  fontSize: '10px',
                                  fontFamily: "'JetBrains Mono', monospace",
                                  textDecoration: 'none',
                                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  padding: '2px 6px',
                                  borderRadius: '2px'
                                }}
                              >
                                {link.label.toLowerCase().includes('git') ? (
                                  <GitBranch size={10} color="#a78bfa" />
                                ) : link.label.toLowerCase().includes('figma') ? (
                                  <Palette size={10} color="#fb923c" />
                                ) : (
                                  <Link2 size={10} color="#9a9ba4" />
                                )}
                                <span>{link.label}</span>
                                <ExternalLink size={9} />
                              </a>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>—</span>
                        )}
                      </td>

                      {/* Deliverables / Tasks */}
                      <td style={{ padding: '10px 14px' }}>
                        {tasks.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '90px' }}>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#9a9ba4' }}>
                              {doneTasks}/{tasks.length} ({taskPct}%)
                            </span>
                            <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: `${taskPct}%`, height: '100%', backgroundColor: taskPct === 100 ? '#34d399' : '#38bdf8' }} />
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>0 tasks</span>
                        )}
                      </td>

                      {/* Frontpage Showcase Badge */}
                      <td style={{ padding: '10px 14px' }}>
                        {isCompleted ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#34d399',
                            backgroundColor: 'rgba(52, 211, 153, 0.1)',
                            border: '1px solid rgba(52, 211, 153, 0.3)',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '9px',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 600
                          }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                            LIVE
                          </span>
                        ) : (
                          <span style={{ color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
                            INTERNAL
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '10px 14px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => { setSelectedProject(project); setIsInspectorOpen(true); }}
                            style={{
                              background: 'none',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              color: '#9a9ba4',
                              borderRadius: '3px',
                              padding: '3px 8px',
                              fontSize: '10px',
                              fontFamily: "'JetBrains Mono', monospace",
                              cursor: 'pointer'
                            }}
                          >
                            INSPECT
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id, project.name)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#5e606b',
                              cursor: 'pointer',
                              padding: '3px'
                            }}
                            title="Delete project"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. PROJECT INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {isInspectorOpen && selectedProject && (
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
            maxWidth: '920px', 
            maxHeight: '92vh', 
            borderRadius: '6px', 
            border: '1px solid rgba(255, 255, 255, 0.16)', 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.04)',
            position: 'relative'
          }}>
            {/* Modal Crosshairs */}
            <span style={{ position: 'absolute', top: '-7px', left: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b', pointerEvents: 'none' }}>+</span>
            <span style={{ position: 'absolute', top: '-7px', right: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b', pointerEvents: 'none' }}>+</span>

            {/* Modal Header */}
            <div style={{ 
              padding: '16px 24px', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.015)'
            }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#38bdf8', letterSpacing: '0.08em', marginBottom: '2px' }}>
                  // PROJECT INSPECTOR & TIMELINE
                </div>
                <h2 style={{ margin: 0, color: '#f5f5f7', fontSize: '1.25rem', fontWeight: 700 }}>
                  {selectedProject.name}
                </h2>
              </div>

              {/* Status Selector in Modal */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select 
                  value={selectedProject.status} 
                  onChange={(e) => handleUpdateStatus(selectedProject.id, e.target.value as Project['status'])}
                  style={{ 
                    backgroundColor: '#070709', 
                    color: selectedProject.status === 'COMPLETED' ? '#34d399' : '#f5f5f7', 
                    border: `1px solid ${selectedProject.status === 'COMPLETED' ? 'rgba(52, 211, 153, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`, 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    outline: 'none',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  {COLUMNS.map(c => (
                    <option key={c.id} value={c.id}>{c.title.toUpperCase()}</option>
                  ))}
                </select>

                <button 
                  onClick={() => setIsInspectorOpen(false)} 
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
                  title="Close Inspector"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1.1fr', gap: '24px' }}>
              
              {/* Left Column: Tasks, Synopsis & Images */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Cover Image Preview & Edit */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ 
                      fontSize: '10px', 
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#9a9ba4', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <ImageIcon size={12} color="#38bdf8" /> COVER IMAGE & VISUALS
                    </label>
                    <button
                      type="button"
                      onClick={() => inspectorFileInputRef.current?.click()}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#38bdf8',
                        padding: '2px 8px',
                        borderRadius: '3px',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Upload size={10} /> {uploadingImage ? 'UPLOADING...' : 'UPLOAD NEW'}
                    </button>
                  </div>

                  {selectedProject.imageUrl && (
                    <div style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                      backgroundColor: '#000'
                    }}>
                      <img 
                        src={selectedProject.imageUrl} 
                        alt="Project Cover" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        onClick={() => updateProjectMeta({ imageUrl: '' })}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          background: 'rgba(0, 0, 0, 0.75)',
                          border: 'none',
                          color: '#f5f5f7',
                          borderRadius: '3px',
                          padding: '3px',
                          cursor: 'pointer'
                        }}
                        title="Remove cover image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  <input
                    type="text"
                    value={selectedProject.imageUrl || ''}
                    onChange={(e) => setSelectedProject({ ...selectedProject, imageUrl: e.target.value })}
                    onBlur={() => updateProjectMeta({ imageUrl: selectedProject.imageUrl })}
                    placeholder="https://... cover image URL"
                    style={{
                      width: '100%',
                      backgroundColor: '#070709',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '8px 10px',
                      borderRadius: '4px',
                      color: '#f5f5f7',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}
                  />
                </div>

                {/* Gallery / Showcase Screenshots */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{
                      fontSize: '10px',
                      color: '#9a9ba4',
                      fontFamily: "'JetBrains Mono', monospace",
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      PROJECT GALLERY & SCREENSHOTS
                    </label>
                    <button
                      type="button"
                      onClick={() => inspectorGalleryFileInputRef.current?.click()}
                      disabled={uploadingImage}
                      style={{
                        background: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        color: '#38bdf8',
                        padding: '3px 8px',
                        borderRadius: '3px',
                        fontSize: '9px',
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Upload size={10} /> {uploadingImage ? 'UPLOADING...' : 'UPLOAD IMAGE'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={inspectorNewGalleryUrl}
                      onChange={(e) => setInspectorNewGalleryUrl(e.target.value)}
                      placeholder="Or paste screenshot URL and press Add..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (inspectorNewGalleryUrl.trim()) {
                            const updated = [...(selectedProject.gallery || []), inspectorNewGalleryUrl.trim()];
                            updateProjectMeta({ gallery: updated });
                            setInspectorNewGalleryUrl('');
                          }
                        }
                      }}
                      style={{
                        flex: 1,
                        backgroundColor: '#070709',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        color: '#f5f5f7',
                        fontSize: '11px',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (inspectorNewGalleryUrl.trim()) {
                          const updated = [...(selectedProject.gallery || []), inspectorNewGalleryUrl.trim()];
                          updateProjectMeta({ gallery: updated });
                          setInspectorNewGalleryUrl('');
                        }
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#f5f5f7',
                        padding: '0 10px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer'
                      }}
                    >
                      ADD
                    </button>
                  </div>

                  {/* Gallery Thumbnails in Inspector */}
                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      {selectedProject.gallery.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          style={{
                            position: 'relative',
                            width: '72px',
                            height: '48px',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            backgroundColor: '#000'
                          }}
                        >
                          <img src={imgUrl} alt={`Screenshot ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = selectedProject.gallery?.filter((_, i) => i !== idx) || [];
                              updateProjectMeta({ gallery: updated });
                            }}
                            style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              background: 'rgba(0, 0, 0, 0.75)',
                              border: 'none',
                              color: '#f5f5f7',
                              borderRadius: '2px',
                              padding: '2px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="Remove image"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tasks / Deliverables Checklist */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      color: '#f5f5f7', 
                      fontSize: '11px', 
                      margin: 0,
                      fontFamily: "'JetBrains Mono', monospace",
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      <CheckSquare size={14} color="#38bdf8" /> DELIVERABLES & TASKS
                    </h3>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#9a9ba4' }}>
                      {selectedProject.tasks?.filter(t => t.status === 'DONE').length || 0} of {selectedProject.tasks?.length || 0} complete
                    </span>
                  </div>
                  
                  {/* Task Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    {(!selectedProject.tasks || selectedProject.tasks.length === 0) ? (
                      <div style={{ 
                        padding: '1.5rem 1rem', 
                        textAlign: 'center', 
                        color: '#5e606b', 
                        fontFamily: "'JetBrains Mono', monospace", 
                        fontSize: '11px',
                        border: '1px dashed rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px'
                      }}>
                        // NO DELIVERABLES LOGGED FOR THIS CARD
                      </div>
                    ) : (
                      selectedProject.tasks.map((task) => (
                        <div 
                          key={task.id} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            backgroundColor: '#070709', 
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            padding: '8px 12px', 
                            borderRadius: '4px' 
                          }}
                        >
                          <div 
                            onClick={() => toggleTask(task.id, task.status)}
                            style={{ cursor: 'pointer', color: task.status === 'DONE' ? '#34d399' : '#5e606b' }}
                          >
                            {task.status === 'DONE' ? (
                              <CheckCircle size={16} />
                            ) : (
                              <div style={{ width: 14, height: 14, border: '1px solid rgba(255, 255, 255, 0.25)', borderRadius: '3px' }} />
                            )}
                          </div>
                          <span style={{ 
                            flex: 1, 
                            color: task.status === 'DONE' ? '#5e606b' : '#f5f5f7', 
                            textDecoration: task.status === 'DONE' ? 'line-through' : 'none', 
                            fontSize: '12px' 
                          }}>
                            {task.title}
                          </span>
                          <button 
                            onClick={() => deleteTask(task.id)} 
                            style={{ background: 'transparent', border: 'none', color: '#5e606b', cursor: 'pointer', padding: '2px' }}
                            title="Delete task"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* New Task Input */}
                  <form onSubmit={addTask} style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Add milestone or deliverable..." 
                      style={{ 
                        flex: 1, 
                        backgroundColor: '#070709', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        padding: '8px 10px', 
                        borderRadius: '4px', 
                        color: '#f5f5f7', 
                        fontSize: '12px' 
                      }}
                    />
                    <button 
                      type="submit" 
                      style={{ 
                        background: '#f5f5f7', 
                        color: '#070709', 
                        border: 'none', 
                        padding: '0 14px', 
                        borderRadius: '4px', 
                        fontWeight: 600, 
                        cursor: 'pointer',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        letterSpacing: '0.06em'
                      }}
                    >
                      ADD
                    </button>
                  </form>
                </div>

                {/* Project Description & Case Study Details */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '10px', 
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#9a9ba4', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.06em', 
                    marginBottom: '6px' 
                  }}>
                    // CASE STUDY SYNOPSIS
                  </label>
                  <textarea
                    rows={3}
                    value={selectedProject.description || ''}
                    onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                    onBlur={() => updateProjectMeta({ description: selectedProject.description })}
                    placeholder="Brief description of the work and engineering scope..."
                    style={{
                      width: '100%',
                      backgroundColor: '#070709',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      padding: '10px',
                      color: '#f5f5f7',
                      fontSize: '12px',
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.5,
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              {/* Right Column: URLs, Optional Links, Metadata, Frontpage Sync */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Frontpage Works Sync Card */}
                <div style={{ 
                  backgroundColor: selectedProject.status === 'COMPLETED' || selectedProject.isPortfolio
                    ? 'rgba(52, 211, 153, 0.06)' 
                    : 'rgba(255, 255, 255, 0.02)', 
                  border: `1px solid ${selectedProject.status === 'COMPLETED' || selectedProject.isPortfolio ? 'rgba(52, 211, 153, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`, 
                  borderRadius: '4px', 
                  padding: '14px', 
                  textAlign: 'left' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Globe size={15} color={selectedProject.status === 'COMPLETED' || selectedProject.isPortfolio ? '#34d399' : '#9a9ba4'} />
                      <span style={{ 
                        fontFamily: "'JetBrains Mono', monospace", 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: '#f5f5f7' 
                      }}>
                        FRONTPAGE WORKS
                      </span>
                    </div>

                    <button
                      onClick={() => handleTogglePortfolio(selectedProject.id, Boolean(selectedProject.isPortfolio))}
                      style={{
                        background: selectedProject.isPortfolio ? '#34d399' : '#070709',
                        color: selectedProject.isPortfolio ? '#070709' : '#9a9ba4',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '3px',
                        padding: '2px 7px',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {selectedProject.isPortfolio ? 'SHOWING LIVE' : 'HIDDEN'}
                    </button>
                  </div>

                  <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#9a9ba4', lineHeight: 1.4 }}>
                    {selectedProject.status === 'COMPLETED' 
                      ? '✓ This project is COMPLETED and actively visible on the public Frontpage Works showcase.'
                      : 'Projects in COMPLETED automatically display on the public Frontpage works section.'}
                  </p>

                  <a 
                    href={`/work/${selectedProject.id}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#38bdf8',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace",
                      textDecoration: 'none'
                    }}
                  >
                    <span>PREVIEW ON FRONTPAGE</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Live Website / Project URL */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ 
                      fontSize: '10px', 
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#9a9ba4', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Globe size={11} color="#38bdf8" /> LIVE PROJECT URL
                    </label>
                    {selectedProject.websiteUrl && (
                      <a
                        href={selectedProject.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '10px',
                          color: '#38bdf8',
                          fontFamily: "'JetBrains Mono', monospace",
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          textDecoration: 'none'
                        }}
                      >
                        OPEN <ExternalLink size={9} />
                      </a>
                    )}
                  </div>
                  <input 
                    type="text"
                    value={selectedProject.websiteUrl || ''}
                    onChange={(e) => setSelectedProject({ ...selectedProject, websiteUrl: e.target.value })}
                    onBlur={() => updateProjectMeta({ websiteUrl: selectedProject.websiteUrl })}
                    placeholder="https://app.client.com or demo link"
                    style={{ 
                      width: '100%', 
                      backgroundColor: '#070709', 
                      border: '1px solid rgba(255, 255, 255, 0.1)', 
                      padding: '8px 10px', 
                      borderRadius: '4px', 
                      color: '#f5f5f7', 
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}
                  />
                </div>

                {/* Optional Links in Inspector */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '4px',
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ 
                      fontSize: '10px', 
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#9a9ba4', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Link2 size={12} color="#38bdf8" /> OPTIONAL PROJECT LINKS
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const current = selectedProject.optionalLinks || [];
                        setSelectedProject({
                          ...selectedProject,
                          optionalLinks: [...current, { label: 'Link', url: '' }]
                        });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#38bdf8',
                        cursor: 'pointer',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Plus size={11} /> ADD LINK
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(!selectedProject.optionalLinks || selectedProject.optionalLinks.length === 0) ? (
                      <span style={{ fontSize: '10px', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                        No optional repository or design links added.
                      </span>
                    ) : (
                      selectedProject.optionalLinks.map((link, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const updated = [...(selectedProject.optionalLinks || [])];
                              updated[idx].label = e.target.value;
                              setSelectedProject({ ...selectedProject, optionalLinks: updated });
                            }}
                            onBlur={() => updateProjectMeta({ optionalLinks: selectedProject.optionalLinks })}
                            placeholder="Label (e.g. GitHub)"
                            style={{
                              width: '90px',
                              backgroundColor: '#070709',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              padding: '5px 8px',
                              borderRadius: '3px',
                              color: '#f5f5f7',
                              fontSize: '11px',
                              fontFamily: "'JetBrains Mono', monospace"
                            }}
                          />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => {
                              const updated = [...(selectedProject.optionalLinks || [])];
                              updated[idx].url = e.target.value;
                              setSelectedProject({ ...selectedProject, optionalLinks: updated });
                            }}
                            onBlur={() => updateProjectMeta({ optionalLinks: selectedProject.optionalLinks })}
                            placeholder="https://..."
                            style={{
                              flex: 1,
                              backgroundColor: '#070709',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              padding: '5px 8px',
                              borderRadius: '3px',
                              color: '#f5f5f7',
                              fontSize: '11px',
                              fontFamily: "'JetBrains Mono', monospace"
                            }}
                          />
                          {link.url && (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', padding: '2px' }}
                              title="Open link"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (selectedProject.optionalLinks || []).filter((_, i) => i !== idx);
                              setSelectedProject({ ...selectedProject, optionalLinks: updated });
                              updateProjectMeta({ optionalLinks: updated });
                            }}
                            style={{ background: 'none', border: 'none', color: '#5e606b', cursor: 'pointer', padding: '2px' }}
                            title="Remove link"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Assigned Client */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '10px', 
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#9a9ba4', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.06em', 
                    marginBottom: '6px' 
                  }}>
                    // ASSIGNED CLIENT
                  </label>
                  <select 
                    value={selectedProject.clientId || ''}
                    onChange={(e) => updateProjectMeta({ clientId: e.target.value || undefined })}
                    style={{ 
                      width: '100%', 
                      backgroundColor: '#070709', 
                      border: '1px solid rgba(255, 255, 255, 0.1)', 
                      padding: '8px 10px', 
                      borderRadius: '4px', 
                      color: '#f5f5f7', 
                      fontSize: '12px' 
                    }}
                  >
                    <option value="">No Client Assigned (Internal)</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                {/* Category & Schedule */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '10px', 
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#9a9ba4', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em', 
                      marginBottom: '6px' 
                    }}>
                      // CATEGORY
                    </label>
                    <input 
                      type="text"
                      value={selectedProject.category || ''}
                      onChange={(e) => setSelectedProject({ ...selectedProject, category: e.target.value })}
                      onBlur={() => updateProjectMeta({ category: selectedProject.category })}
                      placeholder="e.g. Fintech, SaaS"
                      style={{ 
                        width: '100%', 
                        backgroundColor: '#070709', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        padding: '8px', 
                        borderRadius: '4px', 
                        color: '#f5f5f7', 
                        fontSize: '12px' 
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '10px', 
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#9a9ba4', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em', 
                      marginBottom: '6px' 
                    }}>
                      // TARGET DATE
                    </label>
                    <input 
                      type="date" 
                      value={selectedProject.endDate ? selectedProject.endDate.split('T')[0] : ''}
                      onChange={(e) => updateProjectMeta({ endDate: e.target.value })}
                      style={{ 
                        width: '100%', 
                        backgroundColor: '#070709', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        padding: '7px 8px', 
                        borderRadius: '4px', 
                        color: '#f5f5f7', 
                        colorScheme: 'dark',
                        fontSize: '11px'
                      }}
                    />
                  </div>
                </div>

                {/* Danger Zone: Delete */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleDeleteProject(selectedProject.id, selectedProject.name)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '4px',
                      color: '#ef4444',
                      padding: '8px 12px',
                      width: '100%',
                      cursor: 'pointer',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Trash2 size={13} />
                    DELETE PROJECT
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CREATE NEW PROJECT MODAL */}
      {/* ========================================================================= */}
      {isNewModalOpen && (
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
            maxHeight: '92vh',
            borderRadius: '6px', 
            border: '1px solid rgba(255, 255, 255, 0.16)', 
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.85)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ 
              padding: '16px 20px', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.015)'
            }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#38bdf8', letterSpacing: '0.08em' }}>
                  // PIPELINE CREATION
                </div>
                <h3 style={{ margin: '2px 0 0 0', color: '#f5f5f7', fontSize: '1.2rem', fontWeight: 700 }}>
                  CREATE NEW PROJECT
                </h3>
              </div>
              <button 
                onClick={() => setIsNewModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9a9ba4', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleCreateProjectSubmit} style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* 1. Project Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4', marginBottom: '6px', letterSpacing: '0.04em' }}>
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. Next-Gen Mobile Core Architecture"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#070709',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '10px 12px',
                      borderRadius: '4px',
                      color: '#f5f5f7',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* 2. Stage & Client */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4', marginBottom: '6px' }}>
                      STARTING STAGE
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as Project['status'])}
                      style={{
                        width: '100%',
                        backgroundColor: '#070709',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '9px 12px',
                        borderRadius: '4px',
                        color: formStatus === 'COMPLETED' ? '#34d399' : '#f5f5f7',
                        fontSize: '12px',
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: 'none',
                        fontWeight: 600
                      }}
                    >
                      {COLUMNS.map(c => (
                        <option key={c.id} value={c.id}>{c.title.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4', marginBottom: '6px' }}>
                      CLIENT
                    </label>
                    <select
                      value={formClientId}
                      onChange={(e) => setFormClientId(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#070709',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '9px 12px',
                        borderRadius: '4px',
                        color: '#f5f5f7',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    >
                      <option value="">No Client (Internal Project)</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Category & Description */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4', marginBottom: '6px' }}>
                      CATEGORY
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fintech, SaaS, Mobile"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#070709',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '9px 12px',
                        borderRadius: '4px',
                        color: '#f5f5f7',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4', marginBottom: '6px' }}>
                      SCOPE SUMMARY
                    </label>
                    <input
                      type="text"
                      placeholder="Short one-line delivery scope..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#070709',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '9px 12px',
                        borderRadius: '4px',
                        color: '#f5f5f7',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* 4. Project Images Section */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ 
                      fontFamily: "'JetBrains Mono', monospace", 
                      fontSize: '10px', 
                      color: '#38bdf8', 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <ImageIcon size={12} /> PROJECT IMAGES
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '3px',
                        color: '#38bdf8',
                        padding: '3px 8px',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Upload size={10} /> {uploadingImage ? 'UPLOADING...' : 'UPLOAD IMAGE FILE'}
                    </button>
                  </div>

                  {/* Primary Cover Image Input */}
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", color: '#5e606b', marginBottom: '4px' }}>
                      PRIMARY / COVER IMAGE URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or R2 storage link"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#070709',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '8px 10px',
                        borderRadius: '4px',
                        color: '#f5f5f7',
                        fontSize: '12px',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    />
                  </div>

                  {/* Live Cover Preview Thumbnail */}
                  {formImageUrl && (
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '110px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      backgroundColor: '#000'
                    }}>
                      <img 
                        src={formImageUrl} 
                        alt="Cover Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormImageUrl('')}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          background: 'rgba(0, 0, 0, 0.75)',
                          border: 'none',
                          color: '#f5f5f7',
                          borderRadius: '3px',
                          padding: '4px',
                          cursor: 'pointer'
                        }}
                        title="Remove image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  {/* Additional Gallery Images */}
                  <div>
                    <label style={{ display: 'block', fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", color: '#5e606b', marginBottom: '4px' }}>
                      GALLERY / SCREENSHOTS (OPTIONAL)
                    </label>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: formGallery.length > 0 ? '8px' : '0' }}>
                      <input
                        type="text"
                        placeholder="Paste additional showcase image URL..."
                        value={formNewGalleryUrl}
                        onChange={(e) => setFormNewGalleryUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (formNewGalleryUrl.trim()) {
                              setFormGallery([...formGallery, formNewGalleryUrl.trim()]);
                              setFormNewGalleryUrl('');
                            }
                          }
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#070709',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          color: '#f5f5f7',
                          fontSize: '11px',
                          fontFamily: "'JetBrains Mono', monospace"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formNewGalleryUrl.trim()) {
                            setFormGallery([...formGallery, formNewGalleryUrl.trim()]);
                            setFormNewGalleryUrl('');
                          }
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#f5f5f7',
                          padding: '0 12px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontFamily: "'JetBrains Mono', monospace",
                          cursor: 'pointer'
                        }}
                      >
                        ADD
                      </button>
                      <button
                        type="button"
                        onClick={() => galleryFileInputRef.current?.click()}
                        disabled={uploadingImage}
                        style={{
                          background: 'rgba(56, 189, 248, 0.1)',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          color: '#38bdf8',
                          padding: '0 10px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontFamily: "'JetBrains Mono', monospace",
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Upload size={10} /> {uploadingImage ? '...' : 'UPLOAD'}
                      </button>
                    </div>

                    {/* Gallery Thumbnails List */}
                    {formGallery.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {formGallery.map((url, i) => (
                          <div 
                            key={i} 
                            style={{ 
                              position: 'relative', 
                              width: '64px', 
                              height: '42px', 
                              borderRadius: '3px', 
                              overflow: 'hidden',
                              border: '1px solid rgba(255, 255, 255, 0.15)'
                            }}
                          >
                            <img src={url} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button
                              type="button"
                              onClick={() => setFormGallery(formGallery.filter((_, idx) => idx !== i))}
                              style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                background: 'rgba(0, 0, 0, 0.7)',
                                border: 'none',
                                color: '#f5f5f7',
                                borderRadius: '2px',
                                padding: '1px',
                                cursor: 'pointer'
                              }}
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Project URL & Optional Links Section */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ 
                      fontFamily: "'JetBrains Mono', monospace", 
                      fontSize: '10px', 
                      color: '#38bdf8', 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Globe size={12} /> PROJECT URL & OPTIONAL LINKS
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => setFormCustomLinks([...formCustomLinks, { label: 'Link', url: '' }])}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#38bdf8',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Plus size={11} /> ADD CUSTOM LINK
                    </button>
                  </div>

                  {/* Primary Live URL */}
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", color: '#9a9ba4', marginBottom: '4px' }}>
                      PRIMARY LIVE WEBSITE / DEMO URL
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Globe size={13} color="#9a9ba4" />
                      <input
                        type="text"
                        placeholder="https://payflow.africa or client app link"
                        value={formWebsiteUrl}
                        onChange={(e) => setFormWebsiteUrl(e.target.value)}
                        style={{
                          flex: 1,
                          backgroundColor: '#070709',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          padding: '7px 10px',
                          borderRadius: '4px',
                          color: '#f5f5f7',
                          fontSize: '11px',
                          fontFamily: "'JetBrains Mono', monospace"
                        }}
                      />
                    </div>
                  </div>

                  {/* Standard Agency Optional Links: GitHub & Figma */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: formCustomLinks.length > 0 ? '10px' : '0' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", color: '#5e606b', marginBottom: '4px' }}>
                        GITHUB / REPOSITORY (OPTIONAL)
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <GitBranch size={13} color="#9a9ba4" />
                        <input
                          type="text"
                          placeholder="https://github.com/..."
                          value={formGithubUrl}
                          onChange={(e) => setFormGithubUrl(e.target.value)}
                          style={{
                            flex: 1,
                            backgroundColor: '#070709',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            color: '#f5f5f7',
                            fontSize: '11px',
                            fontFamily: "'JetBrains Mono', monospace"
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", color: '#5e606b', marginBottom: '4px' }}>
                        FIGMA / DESIGN SPEC (OPTIONAL)
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Palette size={13} color="#9a9ba4" />
                        <input
                          type="text"
                          placeholder="https://figma.com/file/..."
                          value={formFigmaUrl}
                          onChange={(e) => setFormFigmaUrl(e.target.value)}
                          style={{
                            flex: 1,
                            backgroundColor: '#070709',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            color: '#f5f5f7',
                            fontSize: '11px',
                            fontFamily: "'JetBrains Mono', monospace"
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Links List */}
                  {formCustomLinks.map((cl, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '6px' }}>
                      <input
                        type="text"
                        placeholder="Label (Docs, App Store...)"
                        value={cl.label}
                        onChange={(e) => {
                          const updated = [...formCustomLinks];
                          updated[idx].label = e.target.value;
                          setFormCustomLinks(updated);
                        }}
                        style={{
                          width: '110px',
                          backgroundColor: '#070709',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          padding: '6px 8px',
                          borderRadius: '3px',
                          color: '#f5f5f7',
                          fontSize: '11px',
                          fontFamily: "'JetBrains Mono', monospace"
                        }}
                      />
                      <input
                        type="text"
                        placeholder="https://..."
                        value={cl.url}
                        onChange={(e) => {
                          const updated = [...formCustomLinks];
                          updated[idx].url = e.target.value;
                          setFormCustomLinks(updated);
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#070709',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          padding: '6px 8px',
                          borderRadius: '3px',
                          color: '#f5f5f7',
                          fontSize: '11px',
                          fontFamily: "'JetBrains Mono', monospace"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormCustomLinks(formCustomLinks.filter((_, i) => i !== idx))}
                        style={{ background: 'none', border: 'none', color: '#5e606b', cursor: 'pointer', padding: '2px' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Modal Actions */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '10px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '16px',
                  marginTop: '6px'
                }}>
                  <button
                    type="button"
                    onClick={() => setIsNewModalOpen(false)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#9a9ba4',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: 'pointer'
                    }}
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    style={{
                      background: '#f5f5f7',
                      color: '#070709',
                      border: 'none',
                      padding: '8px 18px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: 'pointer',
                      letterSpacing: '0.04em'
                    }}
                  >
                    CREATE PROJECT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
