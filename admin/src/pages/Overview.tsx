import { useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, MoreHorizontal, User, Briefcase } from 'lucide-react';
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

  // Timeline computation
  const projectsWithDates = projects.filter(p => p.startDate && p.endDate).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  let minDate = new Date();
  let maxDate = new Date();
  
  if (projectsWithDates.length > 0) {
    minDate = new Date(Math.min(...projectsWithDates.map(p => new Date(p.startDate).getTime())));
    maxDate = new Date(Math.max(...projectsWithDates.map(p => new Date(p.endDate).getTime())));
  }
  
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 2);
  
  const totalDays = Math.max(differenceInDays(maxDate, minDate), 1);

  // Generate 6 timeline markers (to fit exactly 6 columns in CSS repeat(6, 1fr))
  const timelineMarkers = [];
  for (let i = 1; i <= 6; i++) {
    const d = new Date(minDate);
    d.setDate(minDate.getDate() + Math.floor((totalDays / 6) * i));
    timelineMarkers.push(format(d, 'dd.MM'));
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <h1 className="page-title">Overview</h1>
        
        <div className="filters">
          <div className="filter-btn">
            Date: Now <ChevronDown size={14} />
          </div>
          <div className="filter-btn">
            Product: All <ChevronDown size={14} />
          </div>
          <div className="icon-btn" style={{ marginLeft: '0.5rem', width: '36px', height: '36px' }}>
            <SlidersHorizontal size={16} />
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          Loading Dashboard...
        </div>
      ) : (
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="dashboard-col">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Client Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-header">
                  Client
                  <MoreHorizontal size={16} />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '1rem 0' }}>
                  <User size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                  <div style={{ fontSize: '4rem', fontWeight: 700, fontFamily: 'Outfit', lineHeight: 1 }}>
                    {totalClients}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Total Active Clients</div>
                </div>
              </div>

              {/* Project Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-header">
                  Project
                  <MoreHorizontal size={16} />
                </div>
                <div className="metric-row" style={{ marginTop: 'auto', marginBottom: 'auto', justifyContent: 'space-around' }}>
                  <div className="metric" style={{ alignItems: 'center' }}>
                    <div className="metric-val" style={{ color: 'var(--accent-secondary)' }}>{pendingProjects}</div>
                    <div className="metric-label">Pending</div>
                  </div>
                  <div className="metric" style={{ alignItems: 'center' }}>
                    <div className="metric-val" style={{ color: 'var(--accent-primary)' }}>{completedProjects}</div>
                    <div className="metric-label">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoices Table Card */}
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div className="card-header">
                Invoices
                <MoreHorizontal size={16} />
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                          No invoices found
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv) => (
                        <tr key={inv.id}>
                          <td>{inv.client?.name || 'Unknown'}</td>
                          <td>${inv.amount.toLocaleString()}</td>
                          <td>
                            <span className={`status-badge ${inv.status.toLowerCase()}`}>
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

          {/* Right Column - Projects Timeline */}
          <div className="card dashboard-col" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              Projects Timeline
              <MoreHorizontal size={16} />
            </div>

            <div className="timeline-container" style={{ flex: 1 }}>
              <div className="timeline-grid">
                <div></div>
                {timelineMarkers.map((marker, i) => (
                  <div className="timeline-col" key={i} style={i === timelineMarkers.length - 1 ? { borderRight: 'none' } : {}}>
                    <span className="timeline-col-label">{marker}</span>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', zIndex: 1, paddingTop: '1rem', height: '100%', overflowY: 'auto', paddingBottom: '3rem' }}>
                {projectsWithDates.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No projects with start/end dates
                  </div>
                ) : (
                  projectsWithDates.map((project) => {
                    const s = new Date(project.startDate);
                    const e = new Date(project.endDate);
                    
                    const leftPercent = (differenceInDays(s, minDate) / totalDays) * 100;
                    let widthPercent = (differenceInDays(e, s) / totalDays) * 100;
                    
                    const left = Math.max(0, Math.min(leftPercent, 100));
                    const width = Math.max(2, Math.min(widthPercent, 100 - left));

                    const colorClass = project.status === 'COMPLETED' ? 'pill-green' : (project.status === 'IN_PROGRESS' ? 'pill-orange' : 'pill-white');
                    const textStyle = colorClass === 'pill-white' ? { color: '#000' } : { color: 'var(--bg-primary)' };

                    return (
                      <div className="timeline-row" key={project.id}>
                        <div className="timeline-date">{format(s, 'dd.MM')}</div>
                        <div className="timeline-bar-wrapper">
                          <div className={`timeline-bar ${colorClass}`} style={{ left: `${left}%`, width: `${width}%` }}>
                            <div className="timeline-bar-icon" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                              <Briefcase size={10} color={colorClass === 'pill-white' ? '#000' : '#fff'} />
                            </div>
                            <span className="timeline-bar-val" style={{...textStyle, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'calc(100% - 30px)'}}>
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

            <div className="legend" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              <div className="legend-item">
                <div className="legend-dot pill-white"></div> Planned
              </div>
              <div className="legend-item">
                <div className="legend-dot pill-orange"></div> In Progress
              </div>
              <div className="legend-item">
                <div className="legend-dot pill-green"></div> Completed
              </div>
              <div style={{ marginLeft: 'auto' }}>Total: {projectsWithDates.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
