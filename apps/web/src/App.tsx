import { Link, Navigate, Route, Routes } from 'react-router-dom';

const organizationMeta = {
  name: 'North Region Network',
  inviteCode: 'ORG-AB12CD',
  regions: ['North', 'Central', 'Coastal', 'Western'],
  branches: ['Aster Branch', 'Harbor Branch', 'Summit Branch', 'Ridge Branch'],
};

const calendarDays = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  null, null, null, 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, null,
];

const recentPrograms = [
  { name: 'Workshop 1: Planning Session', region: 'North', status: 'Completed' },
  { name: 'Community Outreach', region: 'Central', status: 'Pending' },
  { name: 'Leadership Briefing', region: 'Coastal', status: 'Completed' },
  { name: 'Volunteer Check-in', region: 'Western', status: 'Scheduled' },
];

const upcomingPrograms = [
  { name: 'Regional Review Meeting', date: 'Wed, 27 Aug', region: 'North' },
  { name: 'Member Onboarding Session', date: 'Fri, 29 Aug', region: 'Central' },
  { name: 'Quarterly Briefing', date: 'Mon, 1 Sep', region: 'All regions' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-title">Organization Event Tracker</span>
        </div>
        <nav className="topnav" aria-label="Main navigation">
          <Link to="/">Dashboard</Link>
          <Link to="/organization">Organization</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/auth">Account</Link>
        </nav>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/organization" element={<OrganizationDetailsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/regions/:id" element={<RegionPage />} />
          <Route path="/branches/:id" element={<BranchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-links">
          <Link to="/">Dashboard</Link>
          <Link to="/organization">Organization</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/auth">Account</Link>
          <Link to="/regions/north">Regions</Link>
          <Link to="/branches/aster">Branches</Link>
        </div>
      </footer>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <p className="eyebrow">Active Organization</p>
            <h1>{organizationMeta.name}</h1>
            <p className="hero-subtitle">Program visibility and branch activity across all regions.</p>
            <div className="hero-cta">
              <button className="primary-button" type="button">+ Add Program</button>
            </div>
          </div>
          <div className="hero-badge-wrap" aria-label="Organization emblem">
            <div className="hero-badge">NRN</div>
          </div>
        </div>
      </section>

      <div className="dashboard-content">
        <section className="content-section">
          <div className="section-head">
            <h2>Overview</h2>
            <Link to="/calendar" className="section-link">View Calendar →</Link>
          </div>
          <div className="dashboard-grid">
            <div className="stat-card">
              <span className="stat-label">Active Programs</span>
              <strong className="stat-value">4</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Regions</span>
              <strong className="stat-value">4</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Upcoming Events</span>
              <strong className="stat-value">7</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Teams Involved</span>
              <strong className="stat-value">18</strong>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-head">
            <h2>Recent Programs</h2>
            <Link to="/programs" className="section-link">View All →</Link>
          </div>
          <div className="programs-grid">
            {recentPrograms.map((program) => (
              <article key={program.name} className="program-card">
                <div className="program-header">
                  <span className="program-tag">{program.region}</span>
                  <span className={`program-status ${program.status.toLowerCase().replace(' ', '-')}`}>
                    {program.status}
                  </span>
                </div>
                <h3>{program.name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-head">
            <h2>Upcoming Events</h2>
          </div>
          <div className="events-list">
            {upcomingPrograms.map((program) => (
              <article key={program.name} className="event-row">
                <div className="event-info">
                  <h3>{program.name}</h3>
                  <span className="event-date">{program.date}</span>
                </div>
                <span className="region-tag">{program.region}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CalendarPage() {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Calendar</p>
          <h1>Program calendar</h1>
        </div>
        <button className="primary-button" type="button">+ Add Program</button>
      </div>

      <div className="calendar-full card-panel">
        <div className="calendar-month-header">
          <span>August 2026</span>
          <div className="month-controls">
            <button type="button">◀</button>
            <button type="button">▶</button>
          </div>
        </div>
        <div className="calendar-grid large" aria-label="Full month calendar">
          {calendarDays.map((day, index) => (
            <div key={`full-day-${index}`} className={`calendar-cell ${day === 14 || day === 20 || day === 28 ? 'is-event' : ''} ${day === 20 ? 'selected' : ''}`}>
              {day ?? ''}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramsPage() {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Programs</p>
          <h1>Recent programs</h1>
        </div>
        <button className="primary-button" type="button">+ Add Program</button>
      </div>

      <div className="program-list">
        {recentPrograms.map((program) => (
          <article key={program.name} className="program-item">
            <div className="program-meta">
              <span className="list-tag navy">{program.region}</span>
              <span className={`status-badge ${program.status === 'Completed' ? 'done' : program.status === 'Pending' ? 'pending' : 'scheduled'}`}>
                {program.status}
              </span>
            </div>
            <h2>{program.name}</h2>
            <p>Event details and branch progress across the organization.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OrganizationDetailsPage() {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Organization</p>
          <h1>Organization details</h1>
        </div>
      </div>

      <div className="organization-grid">
        <div className="detail-card detail-card-primary">
          <span className="card-label">Organization name</span>
          <h2>{organizationMeta.name}</h2>
        </div>
        <div className="detail-card detail-card-blue">
          <span className="card-label">Invite code</span>
          <h2>{organizationMeta.inviteCode}</h2>
        </div>
        <div className="detail-card detail-card-teal">
          <span className="card-label">Members</span>
          <h2>24 active</h2>
        </div>
        <div className="detail-card detail-card-gold">
          <span className="card-label">Regions</span>
          <h2>{organizationMeta.regions.length} tracked</h2>
        </div>
      </div>

      <div className="info-grid">
        <div className="mini-panel">
          <div className="mini-head">
            <h2>Regions</h2>
            <button className="secondary-button small-button" type="button">+ Add</button>
          </div>
          <ul>
            {organizationMeta.regions.map((region) => (
              <li key={region}>{region}</li>
            ))}
          </ul>
        </div>

        <div className="mini-panel">
          <div className="mini-head">
            <h2>Branches</h2>
            <button className="secondary-button small-button" type="button">+ Add</button>
          </div>
          <ul>
            {organizationMeta.branches.map((branch) => (
              <li key={branch}>{branch}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="create-org-card">
        <div>
          <p className="eyebrow">Setup</p>
          <h2>Create organization</h2>
        </div>
        <button className="primary-button" type="button">Create new organization</button>
      </div>
    </section>
  );
}

function AuthPage() {
  return (
    <section className="panel form-panel auth-card">
      <div className="auth-layout">
        <div className="auth-form-block">
          <p className="eyebrow">Account</p>
          <h1>Sign up</h1>
          <form className="stack-form">
            <label>
              Full name
              <input type="text" placeholder="Ada Johnson" />
            </label>
            <label>
              Email address
              <input type="email" placeholder="ada@org.example" />
            </label>
            <label>
              Password
              <input type="password" placeholder="••••••••" />
            </label>
            <button className="primary-button" type="submit">Create account</button>
          </form>
        </div>

        <div className="auth-side-panel">
          <p className="eyebrow">Welcome back</p>
          <h2>Already have an account?</h2>
          <p>Sign in to continue managing your organization events and visibility.</p>
          <form className="stack-form compact-form">
            <label>
              Email
              <input type="email" placeholder="you@example.org" />
            </label>
            <label>
              Password
              <input type="password" placeholder="••••••••" />
            </label>
            <button className="secondary-button" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function RegionPage() {
  return (
    <section className="panel">
      <h1>North Region</h1>
      <div className="list-grid">
        <div className="mini-panel">
          <h2>Branches</h2>
          <ul>
            <li>Aster Branch</li>
            <li>Harbor Branch</li>
          </ul>
        </div>
        <div className="mini-panel">
          <h2>Recent events</h2>
          <ul>
            <li>Planning Meeting · Jul 10</li>
            <li>Workshop · Jul 12</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function BranchPage() {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Branch</p>
          <h1>Aster Branch</h1>
        </div>
        <button className="primary-button" type="button">+ Log Event</button>
      </div>

      <div className="program-tabs">
        <button className="tab active" type="button">Workshop</button>
        <button className="tab" type="button">Community Gathering</button>
        <button className="tab" type="button">Planning Meeting</button>
      </div>

      <div className="event-list">
        <article className="event-item">
          <span className="event-badge">Workshop</span>
          <div>
            <strong>Workshop 1: Planning Session</strong>
            <p>18 attendees · 2026-08-12</p>
          </div>
        </article>
        <article className="event-item">
          <span className="event-badge alt">Planning Meeting</span>
          <div>
            <strong>Monthly planning check-in</strong>
            <p>9 attendees · 2026-08-05</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default App;
