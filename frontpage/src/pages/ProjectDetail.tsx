import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FinalCTA from '../components/FinalCTA';
import PageHero from '../components/PageHero';
import { supabase, isSupabaseConfigured, normalizeProject, FALLBACK_PROJECTS } from '../lib/supabase';
import type { Project } from '../lib/supabase';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      try {
        if (isSupabaseConfigured && id) {
          const { data, error } = await supabase
            .from('projects')
            .select('*, client:clients(name)')
            .eq('id', id)
            .maybeSingle();

          if (error) {
            console.warn('Supabase fetch error, checking fallback projects:', error.message);
            const found = FALLBACK_PROJECTS.find(p => p.id === id);
            setProject(found || null);
          } else if (data) {
            setProject(normalizeProject(data));
          } else {
            const found = FALLBACK_PROJECTS.find(p => p.id === id);
            setProject(found || null);
          }
        } else if (id) {
          const found = FALLBACK_PROJECTS.find(p => p.id === id);
          setProject(found || null);
        }
      } catch (error) {
        console.error('Failed to fetch project, using fallback:', error);
        const found = id ? FALLBACK_PROJECTS.find(p => p.id === id) : null;
        setProject(found || null);
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
    <div style={{ background: 'var(--cf-bg)' }}>
      
      {/* Hero Section */}
      <PageHero
        label={project.client ? `Case Study — Client: ${project.client.name}` : project.companyName ? `Case Study — ${project.companyName}` : 'Case Study'}
        meta="Selected work"
        title={project.name}
        lede={project.description}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/work" className="cf-btn ghost sm">← Back to Work</Link>
          {project.websiteUrl && (
            <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="cf-btn primary sm">
              Visit Live Site ↗
            </a>
          )}
          {project.optionalLinks && project.optionalLinks.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="cf-btn ghost sm">
              {link.label} ↗
            </a>
          ))}
        </div>
      </PageHero>

      {/* Main Cover Image */}
      <section style={{ width: '100%', minHeight: '60vh', overflow: 'hidden' }}>
        <img 
          src={project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'} 
          alt={project.name}
          style={{ width: '100%', height: '100%', minHeight: '60vh', objectFit: 'cover' }}
        />
      </section>

      {/* About Section */}
      {project.projectInfo && (
        <section className="mobile-padded" style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 40px' }}>
          <div className="editorial-grid">
            <div className="editorial-sticky">
              <h2 className="display-heading" style={{ fontSize: 40, color: 'white' }}>About</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <p style={{ fontSize: 20, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', whiteSpace: 'pre-wrap' }}>
                {project.projectInfo}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                {project.industry && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 24 }}>
                    <h4 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, letterSpacing: 2, color: '#a3a3a3', textTransform: 'uppercase', marginBottom: 8 }}>Industry</h4>
                    <div style={{ fontSize: 18, color: 'white', fontFamily: 'Inter', fontWeight: 500 }}>{project.industry}</div>
                  </div>
                )}
                {project.platform && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 24 }}>
                    <h4 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, letterSpacing: 2, color: '#a3a3a3', textTransform: 'uppercase', marginBottom: 8 }}>Platform</h4>
                    <div style={{ fontSize: 18, color: 'white', fontFamily: 'Inter', fontWeight: 500 }}>{project.platform}</div>
                  </div>
                )}
                {project.projectType && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 24 }}>
                    <h4 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, letterSpacing: 2, color: '#a3a3a3', textTransform: 'uppercase', marginBottom: 8 }}>Type</h4>
                    <div style={{ fontSize: 18, color: 'white', fontFamily: 'Inter', fontWeight: 500 }}>{project.projectType}</div>
                  </div>
                )}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32 }}>
                <h4 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, letterSpacing: 2, color: 'white', textTransform: 'uppercase', marginBottom: 24 }}>Services</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {project.tags && project.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 16, color: '#a3a3a3', fontFamily: 'Inter' }}>
                      {tag} {project.tags.indexOf(tag) !== project.tags.length - 1 && <span style={{ color: '#444', margin: '0 8px' }}>•</span>}
                    </span>
                  ))}
                  {project.category && (
                    <span style={{ fontSize: 16, color: '#a3a3a3', fontFamily: 'Inter' }}>
                      {project.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Image 1 (if available) */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="mobile-padded" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 120px' }}>
          <div style={{ borderRadius: 32, overflow: 'hidden', height: '70vh' }}>
            <img 
              src={project.gallery[0]} 
              alt={`${project.name} gallery 1`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>
      )}

      {/* Challenge Section */}
      {project.challenges && (
        <section className="mobile-padded" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 120px' }}>
          <div className="editorial-grid">
            <div className="editorial-sticky">
              <h2 className="display-heading" style={{ fontSize: 40, color: 'white' }}>Challenge</h2>
            </div>
            <div>
              <p style={{ fontSize: 20, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', whiteSpace: 'pre-wrap' }}>
                {project.challenges}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Image 2 & 3 (Asymmetric Grid) */}
      {project.gallery && project.gallery.length > 2 && (
        <section className="mobile-padded" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 120px' }}>
          <div className="editorial-gallery-grid">
            <div style={{ borderRadius: 32, overflow: 'hidden', height: '100%' }}>
              <img 
                src={project.gallery[1]} 
                alt={`${project.name} gallery 2`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ borderRadius: 32, overflow: 'hidden', height: '100%' }}>
              <img 
                src={project.gallery[2]} 
                alt={`${project.name} gallery 3`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Scope of Work Section */}
      {project.scopeOfWork && (
        <section className="mobile-padded" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 120px' }}>
          <div className="editorial-grid">
            <div className="editorial-sticky">
              <h2 className="display-heading" style={{ fontSize: 40, color: 'white' }}>Scope of work</h2>
            </div>
            <div>
              <p style={{ fontSize: 20, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', whiteSpace: 'pre-wrap' }}>
                {project.scopeOfWork}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Outcome Section */}
      {project.outcome && (
        <section className="mobile-padded" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 120px' }}>
          <div className="editorial-grid">
            <div className="editorial-sticky">
              <h2 className="display-heading" style={{ fontSize: 40, color: 'white' }}>Solution</h2>
            </div>
            <div>
              <p style={{ fontSize: 20, color: '#a3a3a3', lineHeight: 1.8, fontFamily: 'Inter', whiteSpace: 'pre-wrap' }}>
                {project.outcome}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <FinalCTA />
      </section>

    </div>
  );
}
