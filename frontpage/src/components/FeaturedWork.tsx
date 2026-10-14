import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured, normalizeProject, FALLBACK_PROJECTS } from '../lib/supabase';
import type { Project } from '../lib/supabase';

function ScrollReveal({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out, background 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <>
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', borderBottom: '1px solid var(--cf-line)' }}>
        <img
          src={project.imageUrl}
          alt={project.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(0.9)' }}
        />
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.category && <span className="cf-tag accent" style={{ background: 'rgba(17,17,19,0.85)' }}>{project.category}</span>}
          {project.country && <span className="cf-tag" style={{ background: 'rgba(17,17,19,0.85)' }}>{project.country}</span>}
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cf-dim)' }}>
          {String(index + 1).padStart(2, '0')}
          {project.client ? ` — Client: ${project.client.name}` : project.companyName ? ` — ${project.companyName}` : ''}
        </div>
        <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 24, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>
          {project.name}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.65, fontFamily: 'Inter', margin: 0 }}>
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.tags?.map(tech => (
            <span key={tech} className="cf-tag green">{tech}</span>
          ))}
        </div>
        <Link to={`/work/${project.id}`} className="cf-btn ghost sm" style={{ justifyContent: 'center' }}>
          View case study →
        </Link>
      </div>
    </>
  )
}

export default function FeaturedWork({ limit, hideHeader = false }: { limit?: number, hideHeader?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('projects')
            .select('*, client:clients(name)')
            .or('is_portfolio.eq.true,status.eq.COMPLETED')
            .order('created_at', { ascending: false });

          if (error) {
            console.warn('Supabase query error, using fallback projects:', error.message);
            setProjects(FALLBACK_PROJECTS);
          } else if (data && data.length > 0) {
            setProjects(data.map(normalizeProject));
          } else {
            setProjects(FALLBACK_PROJECTS);
          }
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      } catch (error) {
        console.error('Failed to fetch projects, using fallback data:', error);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  if (loading) {
    return (
      <section className="cf-section">
        <div className="cf-shell" style={{ padding: '120px 40px', textAlign: 'center', fontFamily: 'var(--cf-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cf-dim)' }}>
          Loading projects...
        </div>
      </section>
    );
  }

  return (
    <section className="cf-section">
      <div className="cf-shell">
        {!hideHeader && (
          <>
            <div className="cf-bar">
              <span><span className="cf-dot" />01 — Featured Work</span>
              <span>{String(displayedProjects.length).padStart(2, '0')} Projects</span>
            </div>

            <div className="cf-head" style={{ paddingBottom: 40 }}>
              <h2 className="cf-h2" style={{ maxWidth: 520 }}>
                Products we've <em>shipped.</em>
              </h2>
            </div>
          </>
        )}

        <div className="cf-grid c3" style={hideHeader ? { borderTop: 'none' } : undefined}>
          {displayedProjects.map((project, index) => (
            <ScrollReveal key={project.id || `p-${index}`} delay={(index % 3) * 100} className="cf-cell ticks hoverable">
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
