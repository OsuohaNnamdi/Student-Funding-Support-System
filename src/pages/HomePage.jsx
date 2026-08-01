import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Handshake, BarChart3, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { icon: GraduationCap, title: 'Apply in minutes', desc: 'A guided, step-by-step application — personal, academic, and documents, all in one flow.' },
  { icon: Handshake, title: 'Real funders', desc: 'Connect directly with donors and organizations offering scholarships to students like you.' },
  { icon: BarChart3, title: 'Track every step', desc: "See exactly where your application stands, from submitted to accepted." },
  { icon: ShieldCheck, title: 'Secure by design', desc: 'Access to every service is admin-reviewed, and your documents are handled securely end to end.' },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-decor" aria-hidden="true" />
        <h1>Funding education, one application at a time.</h1>
        <p>Syntechtic Scholars connects students with real scholarship funders — apply, track your status, and get support without the financial stress.</p>
        {!isAuthenticated && (
          <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
            <Link to="/register" className="btn btn-primary" style={{ background: 'white', color: 'var(--brand-700)', boxShadow: 'none' }}>Get started</Link>
            <Link to="/scholarships" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}>Browse scholarships</Link>
          </div>
        )}
        <div className="hero-stats">
          <div><div className="hero-stat-value">3,000+</div><div className="hero-stat-label">Applications reviewed</div></div>
          <div><div className="hero-stat-value">320+</div><div className="hero-stat-label">Trusted funders</div></div>
          <div><div className="hero-stat-value">587+</div><div className="hero-stat-label">Scholarships offered</div></div>
        </div>
      </section>

      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div className="card card-hover feature-card" key={f.title}>
            <div className="feature-icon"><f.icon size={22} strokeWidth={1.75} /></div>
            <div style={{ fontWeight: 800, fontSize: 15.5 }}>{f.title}</div>
            <div style={{ color: 'var(--ink-500)', fontSize: 13.5, lineHeight: 1.55 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
