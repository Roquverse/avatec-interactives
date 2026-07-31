import { useEffect, useState } from 'react';
import api from '../api/client';
import { CalendarDays, FolderKanban } from 'lucide-react';

export default function Schedule() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate an array of 6 months starting from current month
  const getMonthsList = () => {
    const list = [];
    const date = new Date();
    date.setDate(1); // Set to 1st to avoid end-of-month shifting bugs
    for (let i = 0; i < 6; i++) {
      list.push({
        label: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        month: date.getMonth(),
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
      width: Math.max(2, widthPercent), // At least 2% wide to be visible
      show: true 
    };
  };

  const colors = ['#ab0924', '#fb923c', '#60a5fa', '#a3e635'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="page-header">
        <h1 className="page-title">PROJECT SCHEDULE</h1>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="card-header">
          <span>6-Month Timeline</span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              <CalendarDays size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
              {months[0].label} {months[0].year} - {months[5].label} {months[5].year}
            </span>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading timeline...</div>
        ) : (
          <div className="timeline-container" style={{ marginTop: '1rem', flex: 1 }}>
            
            {/* Grid Background */}
            <div className="timeline-grid">
              <div className="timeline-col" style={{ borderRight: 'none' }}></div> {/* Spacer for project names */}
              {months.map((m, i) => (
                <div key={i} className="timeline-col">
                  <div className="timeline-col-label">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Project Rows */}
            <div style={{ paddingTop: '2rem', position: 'relative', zIndex: 1, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
              {projects.map((project, index) => {
                const pos = calculatePosition(project.startDate, project.endDate);
                if (!pos.show) return null;

                const color = colors[index % colors.length];

                return (
                  <div key={project.id} className="timeline-row">
                    <div className="timeline-date" style={{ width: '120px', paddingRight: '12px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {project.name}
                    </div>
                    <div className="timeline-bar-wrapper">
                      <div 
                        className="timeline-bar" 
                        style={{ 
                          left: `${pos.left}%`, 
                          width: `${pos.width}%`,
                          backgroundColor: color,
                          opacity: 0.85
                        }}
                        title={`${project.name} (${project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'} - ${project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'})`}
                      >
                        <div className="timeline-bar-icon">
                          <FolderKanban size={10} color={color} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {projects.filter(p => !calculatePosition(p.startDate, p.endDate).show).length === projects.length && projects.length > 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No active projects scheduled within this 6-month window.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
