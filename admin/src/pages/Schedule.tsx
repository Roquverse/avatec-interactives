import { useState, useEffect } from 'react';
import api from '../api/client';
import { CalendarDays, FolderKanban } from 'lucide-react';

export default function Schedule() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate the next 6 months for the timeline
  const getMonthsList = () => {
    const list = [];
    const date = new Date();
    date.setDate(1); // Start from beginning of this month
    for (let i = 0; i < 6; i++) {
      list.push({
        label: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        year: date.getFullYear(),
        start: new Date(date.getFullYear(), date.getMonth(), 1),
        end: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      });
      date.setMonth(date.getMonth() + 1);
    }
    return list;
  };

  const months = getMonthsList();
  const timelineStart = months[0].start.getTime();
  const timelineEnd = months[5].end.getTime();
  const totalDuration = timelineEnd - timelineStart;

  useEffect(() => {
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
    fetchProjects();
  }, []);

  const calculatePosition = (startStr: string | null, endStr: string | null) => {
    if (!startStr) return { left: 0, width: 0, show: false };
    
    const pStart = new Date(startStr).getTime();
    // If no end date, assume it takes 1 month
    const pEnd = endStr ? new Date(endStr).getTime() : pStart + (30 * 24 * 60 * 60 * 1000);

    // If completely outside the timeline, hide
    if (pEnd < timelineStart || pStart > timelineEnd) return { left: 0, width: 0, show: false };

    // Clamp values to timeline bounds
    const clampedStart = Math.max(pStart, timelineStart);
    const clampedEnd = Math.min(pEnd, timelineEnd);

    const leftPercent = ((clampedStart - timelineStart) / totalDuration) * 100;
    const widthPercent = ((clampedEnd - clampedStart) / totalDuration) * 100;

    return {
      left: Math.max(0, leftPercent),
      width: Math.max(2, widthPercent),
      show: true
    };
  };

  const colors = [
    { bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)', text: '#38bdf8' },
    { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', text: '#34d399' },
    { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#fbbf24' },
    { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.4)', text: '#c084fc' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
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
            [ 07 // 6-MONTH ROADMAP ]
          </div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            PROJECT SCHEDULE
          </h1>
        </div>

        <div className="cf-tag" style={{ fontSize: '11px' }}>
          <CalendarDays size={12} color="#38bdf8" />
          <span>{months[0].label} {months[0].year} — {months[5].label} {months[5].year}</span>
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="card-header">
          <span>// GANTT PROJECTION</span>
          <span style={{ fontSize: '11px', color: '#9a9ba4', fontFamily: "'JetBrains Mono', monospace" }}>
            TOTAL IN ROADMAP: {projects.filter(p => calculatePosition(p.startDate, p.endDate).show).length}
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
            [ COMPUTING TIMELINE VECTORS... ]
          </div>
        ) : (
          <div className="timeline-container" style={{ marginTop: '0.5rem', flex: 1, position: 'relative' }}>
            
            {/* Grid Background */}
            <div className="timeline-grid" style={{ gridTemplateColumns: '160px repeat(6, 1fr)' }}>
              <div className="timeline-col" style={{ borderRight: 'none' }}></div> {/* Spacer for project names */}
              {months.map((m, i) => (
                <div key={i} className="timeline-col" style={i === months.length - 1 ? { borderRight: 'none' } : {}}>
                  <div className="timeline-col-label" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Project Rows */}
            <div style={{ paddingTop: '1.5rem', position: 'relative', zIndex: 1, height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: '3rem' }}>
              {projects.map((project, index) => {
                const pos = calculatePosition(project.startDate, project.endDate);
                if (!pos.show) return null;

                const colorScheme = colors[index % colors.length];

                return (
                  <div key={project.id} className="timeline-row" style={{ height: '36px', marginBottom: '14px' }}>
                    <div 
                      className="timeline-date" 
                      style={{ 
                        width: '160px', 
                        paddingRight: '14px', 
                        textAlign: 'right', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        color: '#f5f5f7',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                      title={project.name}
                    >
                      {project.name}
                    </div>
                    <div className="timeline-bar-wrapper">
                      <div 
                        className="timeline-bar" 
                        style={{ 
                          left: `${pos.left}%`, 
                          width: `${pos.width}%`,
                          backgroundColor: colorScheme.bg,
                          borderColor: colorScheme.border,
                          color: colorScheme.text,
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 8px',
                          borderRadius: '4px'
                        }}
                        title={`${project.name} (${project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'} - ${project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'})`}
                      >
                        <div className="timeline-bar-icon" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                          <FolderKanban size={10} color={colorScheme.text} />
                        </div>
                        <span style={{ 
                          fontFamily: "'JetBrains Mono', monospace", 
                          fontSize: '10px', 
                          fontWeight: 600, 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          marginLeft: '6px'
                        }}>
                          {project.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {projects.filter(p => !calculatePosition(p.startDate, p.endDate).show).length === projects.length && projects.length > 0 && (
                <div style={{ 
                  padding: '3rem 2rem', 
                  textAlign: 'center', 
                  color: '#5e606b',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  border: '1px dashed rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  margin: '2rem'
                }}>
                  // NO PROJECTS CONFIGURED WITHIN CURRENT 6-MONTH WINDOW
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
