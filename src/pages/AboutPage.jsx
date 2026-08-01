import React from 'react';
import Avatar from '../components/Avatar';

const TEAM = [
  { name: 'John Doe', role: 'Project Manager' },
  { name: 'Jane Smith', role: 'Lead Developer' },
  { name: 'Alice Johnson', role: 'UX Designer' },
];

export default function AboutPage() {
  return (
    <div className="page page-narrow">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">About</p>
          <h1 className="page-title">Bridging students and funders</h1>
          <p className="page-subtitle">A centralized platform for scholarship applications, from submission to funding.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <h3 style={{ marginTop: 0 }}>Our mission</h3>
        <p style={{ color: 'var(--ink-700)', lineHeight: 1.7 }}>
          We believe every student deserves access to quality education. Syntechtic Scholars
          removes friction from the scholarship process — connecting students who need
          support with funders who want to make a real difference.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <h3 style={{ marginTop: 0 }}>How it works</h3>
        <ul style={{ color: 'var(--ink-700)', lineHeight: 1.9, paddingLeft: 20 }}>
          <li>Students submit a guided, multi-step application with supporting documents.</li>
          <li>Funders offer scholarships and review applicants directly on the platform.</li>
          <li>Our team verifies applications and keeps everyone updated on status.</li>
          <li>Approved students receive funding, tracked transparently from start to finish.</li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Meet the team</h3>
        <div className="team-grid">
          {TEAM.map((member) => (
            <div className="team-card" key={member.name}>
              <Avatar name={member.name} size={56} />
              <div style={{ fontWeight: 700 }}>{member.name}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
