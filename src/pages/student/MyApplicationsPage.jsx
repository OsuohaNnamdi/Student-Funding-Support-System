import React, { useEffect, useState } from 'react';
import { FileText, X } from 'lucide-react';
import { applicationApi } from '../../api/applicationApi';
import { extractErrorMessage } from '../../api/client';
import { statusBadgeClass, statusLabel } from '../../utils/status';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    applicationApi
      .listMine()
      .then(setApplications)
      .catch((err) => setError(extractErrorMessage(err, 'Could not load your applications.')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Tracker</p>
          <h1 className="page-title">My applications</h1>
          <p className="page-subtitle">Everything you've applied for, and where it stands.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {applications.length === 0 ? (
        <EmptyState icon={<FileText size={32} strokeWidth={1.5} />} title="No applications yet" message="Browse scholarships and apply to get started." />
      ) : (
        <div className="scholarship-grid">
          {applications.map((app) => (
            <button
              key={app.id}
              className="card card-hover scholarship-card"
              style={{ textAlign: 'left', cursor: 'pointer', border: 'none' }}
              onClick={() => setSelected(app)}
            >
              <div className="scholarship-title">{app.fullName}</div>
              <div className="scholarship-meta">{app.faculty} · {app.department}</div>
              <span className={`badge ${statusBadgeClass(app.status)}`}>{statusLabel(app.status)}</span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ margin: 0, fontSize: 18 }}>{selected.fullName}</h2>
              <button className="icon-btn" onClick={() => setSelected(null)} type="button"><X size={16} /></button>
            </div>
            <p><strong>Status:</strong> <span className={`badge ${statusBadgeClass(selected.status)}`}>{statusLabel(selected.status)}</span></p>
            <p><strong>Matric number:</strong> {selected.matricNumber}</p>
            <p><strong>Faculty:</strong> {selected.faculty}</p>
            <p><strong>Department:</strong> {selected.department}</p>
            {selected.applicationDate && <p><strong>Applied on:</strong> {selected.applicationDate}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
