import React, { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { applicationApi } from '../../api/applicationApi';
import { extractErrorMessage } from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { statusBadgeClass, statusLabel } from '../../utils/status';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import Avatar from '../../components/Avatar';

export default function ApplicationsReviewPage() {
  const { showToast } = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    applicationApi
      .listAll()
      .then(setApplications)
      .catch((err) => setError(extractErrorMessage(err, 'Could not load applications.')))
      .finally(() => setLoading(false));
  }, []);

  const decide = async (app, action) => {
    setBusyId(app.id);
    try {
      action === 'approve' ? await applicationApi.approve(app.id) : await applicationApi.reject(app.id);
      setApplications((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: action === 'approve' ? 'APPROVED' : 'REJECTED', approved: action === 'approve' } : a))
      );
      showToast(action === 'approve' ? 'Application accepted' : 'Application rejected', '', 'success');
    } catch (err) {
      showToast('That failed', extractErrorMessage(err), 'error');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Review</p>
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">Accept or reject student scholarship applications.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {applications.length === 0 ? (
        <EmptyState icon={<ClipboardList size={32} strokeWidth={1.5} />} title="No applications yet" />
      ) : (
        applications.map((app) => {
          const isPending = (app.status || 'PENDING').toUpperCase() === 'PENDING';
          return (
            <div className="card" key={app.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <Avatar name={app.fullName} size={44} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15.5 }}>{app.fullName}</div>
                    <div className="scholarship-meta">{app.email}{app.phone ? ` · ${app.phone}` : ''}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      <span className="badge badge-neutral">{app.matricNumber}</span>
                      <span className="badge badge-neutral">{app.faculty}</span>
                      <span className="badge badge-neutral">{app.department}</span>
                      <span className={`badge ${statusBadgeClass(app.status)}`}>{statusLabel(app.status)}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button className="btn btn-primary btn-sm" disabled={busyId === app.id || !isPending} onClick={() => decide(app, 'approve')}>
                    {busyId === app.id ? '…' : 'Accept'}
                  </button>
                  <button className="btn btn-danger btn-sm" disabled={busyId === app.id || !isPending} onClick={() => decide(app, 'reject')}>
                    {busyId === app.id ? '…' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
