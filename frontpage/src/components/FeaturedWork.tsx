import { useEffect, useState } from 'react';

type Project = {
  id: string;
  name: string;
  companyName: string;
  description: string;
  country: string;
  category: string;
  tags: string[];
  imageUrl: string;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div style={{ background: '#101010', border: '1px solid #232323', borderRadius: 32, overflow: 'hidden' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
        <img
          src={project.imageUrl}
          alt={project.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #101010 100%)' }} />
        <div style={{ position: 'absolute', top: 28, left: 32, display: 'flex', gap: 10 }}>
          {project.category && <span className="badge">{project.category}</span>}
          {project.country && (
            <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#a3a3a3' }}>
              {project.country}
            </span>
          )}
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <h3 className="display-heading" style={{ fontSize: 32, color: 'white' }}>{project.name}</h3>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '32px 32px 24px', display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid #232323' }}>
        {project.companyName && <div className="section-label" style={{ color: '#ab0924' }}>{project.companyName}</div>}
        <p style={{ fontSize: 15, color: '#a3a3a3', lineHeight: 1.6, fontFamily: 'Inter', margin: 0 }}>
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '24px 32px', borderTop: '1px solid #232323',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.tags?.map(tech => (
            <span
              key={tech}
              style={{
                fontFamily: 'Outfit', fontSize: 12, fontWeight: 600, color: '#555',
                background: '#161616', border: '1px solid #232323', padding: '4px 12px', borderRadius: 6,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <button className="btn-ghost" style={{ fontSize: 14, padding: '10px 22px', width: '100%', justifyContent: 'center', marginTop: 8 }}>
          View case study →
        </button>
      </div>
    </div>
  )
}

export default function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const configuredUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const apiUrl = configuredUrl.endsWith('/api') ? configuredUrl : `${configuredUrl.replace(/\/$/, '')}/api`;
        const response = await fetch(`${apiUrl}/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const leftColumnProjects = projects.filter((_, i) => i % 2 === 0);
  const rightColumnProjects = projects.filter((_, i) => i % 2 !== 0);

  if (loading) {
    return (
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px', textAlign: 'center', color: '#a3a3a3' }}>
        Loading projects...
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
      <div style={{ marginBottom: 64 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Featured Work</div>
        <h2 className="display-heading" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'white', maxWidth: 520 }}>
          Products we've shipped.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {leftColumnProjects.map((project, index) => (
            <ProjectCard key={project.id || `left-${index}`} project={project} />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 180 }}>
          {rightColumnProjects.map((project, index) => (
            <ProjectCard key={project.id || `right-${index}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
