
import { ChevronDown, SlidersHorizontal, MoreHorizontal } from 'lucide-react';

const Overview = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <h1 className="page-title">CHECK BOX</h1>
        
        <div className="filters">
          <div className="filter-btn">
            Date: Now <ChevronDown size={14} />
          </div>
          <div className="filter-btn">
            Product: All <ChevronDown size={14} />
          </div>
          <div className="filter-btn">
            Profile: Bogdan <ChevronDown size={14} />
          </div>
          <div className="icon-btn" style={{ marginLeft: '0.5rem', width: '36px', height: '36px' }}>
            <SlidersHorizontal size={16} />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-col">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Customer Card */}
            <div className="card">
              <div className="card-header">
                Customer
                <MoreHorizontal size={16} />
              </div>
              <div className="metric-row">
                <div className="metric">
                  <span className="trend-up">▲</span>
                  <div className="metric-val">2,4%</div>
                  <div className="metric-label">Web Surfing</div>
                </div>
                <div className="metric">
                  <span className="trend-down">▼</span>
                  <div className="metric-val">1,1%</div>
                  <div className="metric-label">Radio Station</div>
                </div>
              </div>
              {/* Mock Line Chart */}
              <div style={{ height: '60px', marginTop: '1rem', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0 30 Q 15 10, 30 25 T 60 15 T 100 25" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
                  <path d="M0 20 Q 20 40, 40 20 T 70 30 T 100 10" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Product Dots Card */}
            <div className="card">
              <div className="card-header">
                Product
                <MoreHorizontal size={16} />
              </div>
              <div className="metric-row">
                <div className="metric">
                  <span className="trend-up">▲</span>
                  <div className="metric-val">2,8%</div>
                  <div className="metric-label">Partners</div>
                </div>
                <div className="metric">
                  <span className="trend-down">▼</span>
                  <div className="metric-val">3,2%</div>
                  <div className="metric-label">Owners</div>
                </div>
              </div>
              {/* Mock Dot Matrix */}
              <div className="dot-matrix">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className={"matrix-dot " + (i % 7 === 0 ? 'green' : i % 5 === 0 ? 'orange' : i % 11 === 0 ? 'white' : '')}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Pill Chart Card */}
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              Product
              <MoreHorizontal size={16} />
            </div>
            
            <div className="pill-chart">
              {/* Fake pills */}
              {[
                { val1: 52, val2: 81, color: 'white' },
                { val1: 96, val2: 25, color: 'green' },
                { val1: 48, val2: 51, color: 'green' },
                { val1: 80, val2: 49, color: 'green' },
                { val1: 34, val2: 67, color: 'orange' },
                { val1: 92, val2: 28, color: 'green' },
                { val1: 58, val2: 20, color: 'green' },
                { val1: 84, val2: 39, color: 'orange' },
                { val1: 36, val2: 72, color: 'white' },
              ].map((pill, i) => (
                <div className="pill-bar-container" key={i}>
                  <div className={"pill-bar " + (pill.color === 'white' ? 'pill-white' : pill.color === 'green' ? 'pill-green' : 'pill-orange')} style={{ height: Math.max(pill.val1, pill.val2) + 'px' }}>
                    {pill.val1}
                  </div>
                  <div className="pill-dot"></div>
                  <div className={"pill-bar " + (pill.color === 'white' ? 'pill-orange' : pill.color === 'green' ? 'pill-white' : 'pill-green')} style={{ height: Math.min(pill.val1, pill.val2) + 'px' }}>
                    {pill.val2}
                  </div>
                </div>
              ))}
            </div>

            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot pill-white"></div> Resources
              </div>
              <div className="legend-item">
                <div className="legend-dot pill-green"></div> Valid
              </div>
              <div className="legend-item">
                <div className="legend-dot pill-orange"></div> Invalid
              </div>
              <div style={{ marginLeft: 'auto' }}>Total: 1,012</div>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="card dashboard-col">
          <div className="card-header">
            Projects Timeline
            <MoreHorizontal size={16} />
          </div>

          <div className="timeline-container">
            <div className="timeline-grid">
              <div></div>
              <div className="timeline-col"><span className="timeline-col-label">0</span></div>
              <div className="timeline-col"><span className="timeline-col-label">5</span></div>
              <div className="timeline-col"><span className="timeline-col-label">10</span></div>
              <div className="timeline-col"><span className="timeline-col-label">15</span></div>
              <div className="timeline-col"><span className="timeline-col-label">20</span></div>
              <div className="timeline-col"><span className="timeline-col-label">25</span></div>
              <div className="timeline-col" style={{ borderRight: 'none' }}><span className="timeline-col-label">30</span></div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, paddingTop: '1rem' }}>
              <div className="timeline-row">
                <div className="timeline-date">30.09</div>
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar pill-green" style={{ left: '10%', width: '40%' }}>
                    <div className="timeline-bar-icon">G</div>
                    <span className="timeline-bar-val">16</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-date">29.09</div>
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar pill-orange" style={{ left: '60%', width: '35%' }}>
                    <div className="timeline-bar-icon">X</div>
                    <span className="timeline-bar-val">29</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-date">28.09</div>
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar pill-white" style={{ left: '15%', width: '35%' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div className="timeline-bar-icon" style={{ backgroundColor: '#ccc' }}></div>
                      <div className="timeline-bar-icon" style={{ backgroundColor: '#999' }}></div>
                    </div>
                    <span className="timeline-bar-val" style={{ color: '#000' }}>15</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-date">27.09</div>
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar pill-green" style={{ left: '25%', width: '40%' }}>
                    <div className="timeline-bar-icon" style={{ backgroundColor: '#ff69b4' }}></div>
                    <span className="timeline-bar-val">21</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-date">26.09</div>
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar pill-white" style={{ left: '0%', width: '25%' }}>
                    <div className="timeline-bar-icon" style={{ backgroundColor: '#7289da' }}></div>
                    <span className="timeline-bar-val" style={{ color: '#000' }}>10</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-date">25.09</div>
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar pill-orange" style={{ left: '25%', width: '25%' }}>
                    <div className="timeline-bar-icon" style={{ backgroundColor: '#1877f2' }}></div>
                    <span className="timeline-bar-val">15</span>
                  </div>
                  <div className="timeline-bar pill-green" style={{ left: '55%', width: '45%' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <div className="timeline-bar-icon"></div>
                      <div className="timeline-bar-icon"></div>
                    </div>
                    <span className="timeline-bar-val">19</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-date">24.09</div>
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar pill-white" style={{ left: '25%', width: '25%' }}>
                    <div className="timeline-bar-icon" style={{ backgroundColor: '#1da1f2' }}></div>
                    <span className="timeline-bar-val" style={{ color: '#000' }}>8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="legend" style={{ marginTop: 'auto' }}>
            <div className="legend-item">
              <div className="legend-dot pill-green"></div> Customer
            </div>
            <div className="legend-item">
              <div className="legend-dot pill-orange"></div> Product
            </div>
            <div className="legend-item">
              <div className="legend-dot pill-white"></div> Web
            </div>
            <div style={{ marginLeft: 'auto' }}>Total: 284</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
