import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  SlidersHorizontal, 
  Briefcase,
  Activity,
  Layers
} from 'lucide-react';
import api from '../api/client';
import { format, differenceInDays } from 'date-fns';

const Overview = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, projectsRes, invoicesRes] = await Promise.all([
          api.get('/clients'),
          api.get('/projects'),
          api.get('/invoices')
        ]);
        setClients(clientsRes.data);
        setProjects(projectsRes.data);
        setInvoices(invoicesRes.data);
      } catch (error) {
        console.error('Failed to fetch overview data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalClients = clients.length;
  const pendingProjects = projects.filter(p => p.status !== 'COMPLETED').length;
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
  const totalRevenue = invoices
    .filter(inv => inv.status === 'PAID')
    .reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);

  // Timeline computation
  const projectsWithDates = projects
    .filter(p => p.startDate && p.endDate)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  let minDate = new Date();
  let maxDate = new Date();
  
  if (projectsWithDates.length > 0) {
    minDate = new Date(Math.min(...projectsWithDates.map(p => new Date(p.startDate).getTime())));
    maxDate = new Date(Math.max(...projectsWithDates.map(p => new Date(p.endDate).getTime())));
  }
  
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 2);
  
  const totalDays = Math.max(differenceInDays(maxDate, minDate), 1);

  // Generate 6 timeline markers
  const timelineMarkers = [];
  for (let i = 1; i <= 6; i++) {
    const d = new Date(minDate);
    d.setDate(minDate.getDate() + Math.floor((totalDays / 6) * i));
    timelineMarkers.push(format(d, 'dd.MM'));
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Header with Technical Monospace Breadcrumb */}
      <div className="page-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#38bdf8',
            marginBottom: '4px'
          }}>
            [ 01 // METRICS & PIPELINE ]
          </div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            SYSTEM OVERVIEW
          </h1>
        </div>
        
        <div className="filters">
          <div className="filter-btn">
            TIMEFRAME: Q4 // 2026 <ChevronDown size={12} />
          </div>
          <div className="filter-btn">
            SCOPE: GLOBAL <ChevronDown size={12} />
          </div>
          <button className="icon-btn" style={{ width: '32px', height: '32px' }} title="Configure Metrics">
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
          [ QUERYING SUPABASE CLOUD... ]
        </div>
      ) : (
        <div className="dashboard-grid">
          {/* Left Column: Metric Cards & Invoices */}
          <div className="dashboard-col">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Clients Metric Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-header">
                  <span>// ACTIVE CLIENTS</span>
                  <Activity size={14} color="#38bdf8" />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', padding: '0.5rem 0' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1, color: '#f5f5f7' }}>
                    {totalClients < 10 ? `0${totalClients}` : totalClients}
                  </div>
                  <div style={{ color: '#9a9ba4', fontSize: '0.8125rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    Enterprise & SME partners
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#5e606b' }}>
                  <span>STATUS: SYNCED</span>
                  <span style={{ color: '#38bdf8' }}>100% HEALTHY</span>
                </div>
              </div>

              {/* Projects Metric Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-header">
                  <span>// WORK PIPELINE</span>
                  <Layers size={14} color="#f59e0b" />
                </div>
                <div className="metric-row" style={{ marginTop: 'auto', marginBottom: 'auto', justifyContent: 'space-between' }}>
                  <div className="metric">
                    <div className="metric-val" style={{ color: '#f59e0b', fontSize: '2.5rem' }}>
                      {pendingProjects < 10 ? `0${pendingProjects}` : pendingProjects}
                    </div>
                    <div className="metric-label">IN PROGRESS</div>
                  </div>
                  <div className="metric">
                    <div className="metric-val" style={{ color: '#10b981', fontSize: '2.5rem' }}>
                      {completedProjects < 10 ? `0${completedProjects}` : completedProjects}
                    </div>
                    <div className="metric-label">COMPLETED</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#5e606b' }}>
                  <span>TOTAL PROJECTS</span>
                  <span style={{ color: '#f5f5f7' }}>{projects.length} UNITS</span>
                </div>
              </div>
            </div>

            {/* Invoices Table Card */}
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '260px' }}>
              <div className="card-header">
                <span>// BILLING & INVOICES</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#10b981' }}>
                  REV: ${totalRevenue.toLocaleString()}
                </span>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>CLIENT</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace" }}>
                          // NO RECORDED INVOICES
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv) => (
                        <tr key={inv.id}>
                          <td style={{ fontWeight: 500, color: '#f5f5f7' }}>
                            {inv.client?.name || 'Private Client'}
                          </td>
                          <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            ${Number(inv.amount).toLocaleString()}
                          </td>
                          <td>
                            <span className={`status-badge ${inv.status.toLowerCase()}`}>
                              <span style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: inv.status === 'PAID' ? '#10b981' : '#f59e0b'
                              }} />
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Project Delivery Timeline */}
          <div className="card dashboard-col" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              <span>// DELIVERY TIMELINE</span>
              <span className="cf-tag" style={{ fontSize: '10px' }}>
                <span className="cf-dot-live" />
                ACTIVE SPRINTS
              </span>
            </div>

            <div className="timeline-container" style={{ flex: 1, position: 'relative' }}>
              <div className="timeline-grid">
                <div></div>
                {timelineMarkers.map((marker, i) => (
                  <div className="timeline-col" key={i} style={i === timelineMarkers.length - 1 ? { borderRight: 'none' } : {}}>
                    <span className="timeline-col-label">{marker}</span>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', zIndex: 1, paddingTop: '0.75rem', height: '100%', overflowY: 'auto', paddingBottom: '3rem' }}>
                {projectsWithDates.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#5e606b', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
                    // NO ACTIVE TIMELINE ENTRIES (SET START & END DATES ON PROJECTS)
                  </div>
                ) : (
                  projectsWithDates.map((project) => {
                    const s = new Date(project.startDate);
                    const e = new Date(project.endDate);
                    
                    const leftPercent = (differenceInDays(s, minDate) / totalDays) * 100;
                    const widthPercent = (differenceInDays(e, s) / totalDays) * 100;
                    
                    const left = Math.max(0, Math.min(leftPercent, 100));
                    const width = Math.max(4, Math.min(widthPercent, 100 - left));

                    const isDone = project.status === 'COMPLETED';
                    const isDev = project.status === 'IN_DEVELOPMENT';

                    return (
                      <div className="timeline-row" key={project.id}>
                        <div className="timeline-date">{format(s, 'dd.MM')}</div>
                        <div className="timeline-bar-wrapper">
                          <div 
                            className="timeline-bar" 
                            style={{ 
                              left: `${left}%`, 
                              width: `${width}%`,
                              backgroundColor: isDone ? 'rgba(16, 185, 129, 0.15)' : (isDev ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)'),
                              borderColor: isDone ? 'rgba(16, 185, 129, 0.4)' : (isDev ? 'rgba(56, 189, 248, 0.4)' : 'rgba(245, 158, 11, 0.4)'),
                              color: isDone ? '#34d399' : (isDev ? '#38bdf8' : '#fbbf24')
                            }}
                          >
                            <div className="timeline-bar-icon">
                              <Briefcase size={10} color="currentColor" />
                            </div>
                            <span className="timeline-bar-val" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'calc(100% - 24px)' }}>
                              {project.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Timeline Legend */}
            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: '#38bdf8' }}></div> IN DEVELOPMENT
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></div> TESTING / STAGING
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: '#10b981' }}></div> COMPLETED
              </div>
              <div style={{ marginLeft: 'auto', color: '#5e606b' }}>TRACKED: {projectsWithDates.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
