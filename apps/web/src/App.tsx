import { Link, Navigate, Route, Routes } from 'react-router-dom';

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
          <Link to="/signup">Signup</Link>
          <Link to="/join">Join Organization</Link>
          <Link to="/login">Login</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/organization" element={<OrganizationDetailsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/join" element={<JoinOrgPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminSettingsPage />} />
          <Route path="/regions/:id" element={<RegionPage />} />
          <Route path="/branches/:id" element={<BranchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function DashboardPage() {
  return (
    <section className="panel dashboard-panel">
      <div className="hero-bar">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Organization dashboard</h1>
        </div>
        <div className="hero-actions">
          <button className="secondary-button" type="button">View calendar</button>
          <button className="primary-button" type="button">+ Log Event</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-tile accent-navy">
          <span>Upcoming</span>
          <strong>18</strong>
          <small>Sessions this month</small>
        </div>
        <div className="stat-tile accent-blue">
          <span>Regions</span>
          <strong>5</strong>
          <small>Across the network</small>
        </div>
        <div className="stat-tile accent-teal">
          <span>Programs</span>
          <strong>9</strong>
          <small>Recurring initiatives</small>
        </div>
        <div className="stat-tile accent-gold">
          <span>Completion</span>
          <strong>76%</strong>
          <small>Program coverage</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="calendar-card">
          <div className="card-heading-row">
            <h2>Recent calendar</h2>
            <span className="pill pill-blue">Updated today</span>
          </div>
          <div className="calendar-placeholder">Calendar view placeholder</div>
        </div>

        <div className="mini-panel focus-panel">
          <div className="card-heading-row">
            <h2>Priority programs</h2>
            <span className="pill pill-gold">Live</span>
          </div>
          <ul className="priority-list">
            <li>
              <span className="list-tag navy">North</span>
              <div>
                <strong>Workshop 1: Planning Session</strong>
                <small>3 regions complete</small>
              </div>
            </li>
            <li>
              <span className="list-tag blue">Central</span>
              <div>
                <strong>Community Outreach</strong>
                <small>2 regions still pending</small>
              </div>
            </li>
            <li>
              <span className="list-tag teal">Coastal</span>
              <div>
                <strong>Leadership Briefing</strong>
                <small>All regions logged</small>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="program-section">
        <div className="card-heading-row">
          <h2>Program coverage</h2>
          <span className="pill pill-red">Leadership view</span>
        </div>
        <div className="program-tabs">
          <button className="tab active" type="button">Workshop 1: Planning Session</button>
          <button className="tab" type="button">Community Outreach</button>
          <button className="tab" type="button">Leadership Briefing</button>
          <button className="tab" type="button">Volunteer Check-in</button>
        </div>
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
          <h2>North Region Network</h2>
        </div>
        <div className="detail-card detail-card-blue">
          <span className="card-label">Invite code</span>
          <h2>ORG-AB12CD</h2>
        </div>
        <div className="detail-card detail-card-teal">
          <span className="card-label">Members</span>
          <h2>24 active</h2>
        </div>
        <div className="detail-card detail-card-gold">
          <span className="card-label">Regions</span>
          <h2>5 tracked</h2>
        </div>
      </div>

      <div className="info-grid">
        <div className="mini-panel">
          <h2>Leadership summary</h2>
          <ul>
            <li>4 active regional teams</li>
            <li>9 recurring programs</li>
            <li>Leadership can verify completion status by region</li>
          </ul>
        </div>
        <div className="mini-panel">
          <h2>Operational notes</h2>
          <ul>
            <li>Last update: 2 hours ago</li>
            <li>Next reporting cycle: Friday</li>
            <li>Admin actions available for configuration</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function SignupPage() {
  return (
    <section className="panel form-panel">
      <h1>Create organization</h1>
      <form className="stack-form">
        <label>
          Your name
          <input type="text" placeholder="Ada Johnson" />
        </label>
        <label>
          Email
          <input type="email" placeholder="ada@org.example" />
        </label>
        <label>
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <label>
          Organization name
          <input type="text" placeholder="North Region Network" />
        </label>
        <button className="primary-button" type="submit">Create organization</button>
      </form>
    </section>
  );
}

function JoinOrgPage() {
  return (
    <section className="panel form-panel">
      <h1>Join organization</h1>
      <form className="stack-form">
        <label>
          Invite code
          <input type="text" placeholder="ORG-ABC123" />
        </label>
        <label>
          Your name
          <input type="text" placeholder="Sam Patel" />
        </label>
        <label>
          Email
          <input type="email" placeholder="sam@org.example" />
        </label>
        <label>
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="primary-button" type="submit">Join organization</button>
      </form>
    </section>
  );
}

function LoginPage() {
  return (
    <section className="panel form-panel">
      <h1>Login</h1>
      <form className="stack-form">
        <label>
          Email
          <input type="email" placeholder="you@example.org" />
        </label>
        <label>
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="primary-button" type="submit">Sign in</button>
      </form>
    </section>
  );
}

function AdminSettingsPage() {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Admin settings</h1>
        </div>
        <button className="secondary-button" type="button">Regenerate invite</button>
      </div>

      <div className="settings-grid">
        <div className="mini-panel">
          <h2>Regions</h2>
          <ul>
            <li>North</li>
            <li>Central</li>
            <li>Coastal</li>
          </ul>
        </div>
        <div className="mini-panel">
          <h2>Branches</h2>
          <ul>
            <li>Aster Branch</li>
            <li>Harbor Branch</li>
            <li>Summit Branch</li>
          </ul>
        </div>
        <div className="mini-panel">
          <h2>Event types</h2>
          <ul>
            <li>Workshop</li>
            <li>Community Gathering</li>
            <li>Planning Meeting</li>
          </ul>
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
