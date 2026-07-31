import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FinalCTA from '../components/FinalCTA';

type Project = {
  id: string;
  name: string;
  companyName: string;
  description: string;
  country: string;
  category: string;
  tags: string[];
  imageUrl: string;
  websiteUrl: string;
  projectInfo?: string;
  challenges?: string;
  outcome?: string;
  status?: string;
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      try {
        const configuredUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const apiUrl = configuredUrl.endsWith('/api') ? configuredUrl : `${configuredUrl.replace(/\/$/, '')}/api`;
        const response = await fetch(`${apiUrl}/projects/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        }
      } catch (error) {
        console.error('Failed to fetch project', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3a3a3' }}>
        Loading case study...
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <h2 style={{ color: 'white', fontSize: 32 }}>Project not found</h2>
        <Link to="/work" className="btn-primary" style={{ padding: '12px 24px', textDecoration: 'none' }}>
          Back to Work
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 400, display: 'flex', alignItems: 'flex-end', paddingBottom: 80 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img 
            src={project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'} 
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, transparent 100%)' }} />
        </div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 40px' }}>
          <Link to="/work" style={{ color: '#a3a3a3', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 14, fontFamily: 'Inter' }}>
            ← Back to Work
          </Link>
          {project.companyName && (
            <div className="section-label" style={{ marginBottom: 16 }}>{project.companyName}</div>
          )}
          <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', maxWidth: 800, marginBottom: 24 }}>
            {project.name}
          </h1>
          <p style={{ fontSize: 20, color: '#a3a3a3', maxWidth: 600, fontFamily: 'Inter', lineHeight: 1.6 }}>
            {project.description}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 80, alignItems: 'start' }}>
          
          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            
            {project.projectInfo && (
              <div>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 28, color: 'white', marginBottom: 24 }}>Overview</h3>
                <p style={{ fontSize: 17, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', whiteSpace: 'pre-wrap' }}>
                  {project.projectInfo}
                </p>
              </div>
            )}

            {project.challenges && (
              <div>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 28, color: 'white', marginBottom: 24 }}>The Challenge</h3>
                <p style={{ fontSize: 17, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', whiteSpace: 'pre-wrap' }}>
                  {project.challenges}
                </p>
              </div>
            )}

            {project.outcome && (
              <div>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 28, color: 'white', marginBottom: 24 }}>The Outcome</h3>
                <p style={{ fontSize: 17, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', whiteSpace: 'pre-wrap' }}>
                  {project.outcome}
                </p>
              </div>
            )}
            
            {(!project.projectInfo && !project.challenges && !project.outcome) && (
              <div>
                <p style={{ fontSize: 17, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter' }}>
                  More details about this case study are coming soon.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar / At a glance */}
          <div style={{ background: '#101010', border: '1px solid #232323', borderRadius: 24, padding: 32, position: 'sticky', top: 120 }}>
            <h4 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 24 }}>At a glance</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {project.category && (
                <div>
                  <span style={{ display: 'block', fontSize: 13, color: '#777', fontFamily: 'Inter', marginBottom: 6 }}>Category</span>
                  <span style={{ fontSize: 15, color: 'white', fontFamily: 'Inter' }}>{project.category}</span>
                </div>
              )}
              
              {project.country && (
                <div>
                  <span style={{ display: 'block', fontSize: 13, color: '#777', fontFamily: 'Inter', marginBottom: 6 }}>Location</span>
                  <span style={{ fontSize: 15, color: 'white', fontFamily: 'Inter' }}>{project.country}</span>
                </div>
              )}
              
              {project.status && (
                <div>
                  <span style={{ display: 'block', fontSize: 13, color: '#777', fontFamily: 'Inter', marginBottom: 6 }}>Status</span>
                  <span style={{ fontSize: 15, color: 'white', fontFamily: 'Inter' }}>{project.status}</span>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div>
                  <span style={{ display: 'block', fontSize: 13, color: '#777', fontFamily: 'Inter', marginBottom: 12 }}>Technologies</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ background: '#161616', border: '1px solid #232323', padding: '4px 12px', borderRadius: 6, fontSize: 13, color: '#a3a3a3', fontFamily: 'Outfit' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.websiteUrl && (
                <div style={{ marginTop: 16 }}>
                  <a 
                    href={project.websiteUrl.startsWith('http') ? project.websiteUrl : `https://${project.websiteUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 14, textDecoration: 'none', display: 'flex' }}
                  >
                    Visit Website ↗
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
