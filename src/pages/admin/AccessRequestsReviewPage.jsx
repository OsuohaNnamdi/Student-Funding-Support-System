import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { accessApi } from '../../api/accessApi';
import { extractErrorMessage } from '../../api/client';
import { useToast } from '../../context/ToastContext';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import Avatar from '../../components/Avatar';

export default function AccessRequestsReviewPage() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [decidingId, setDecidingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const page = await accessApi.listPending();
      setRequests(page.content ?? page);
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not load access requests.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const decide = async (request, decision) => {
    setDecidingId(request.id);
    try {
      await accessApi.decide(request.id, decision);
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
      showToast(decision === 'APPROVED' ? 'Request approved' : 'Request rejected', '', 'success');
    } catch (err) {
      showToast('Could not update request', extractErrorMessage(err), 'error');
    } finally {
      setDecidingId(null);
    }
  };

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Admin</p>
          <h1 className="page-title">Access requests</h1>
          <p className="page-subtitle">Approve or reject pending service access requests.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {requests.length === 0 ? (
        <EmptyState icon={<CheckCircle2 size={32} strokeWidth={1.5} />} title="No pending requests" message="You're all caught up." />
      ) : (
        <div className="scholarship-grid">
          {requests.map((r) => (
            <div className="card" key={r.id}>
              <div className="scholarship-donor">
                <Avatar name={r.userEmail} size={40} />
                <div>
                  <div className="scholarship-title">{r.userEmail}</div>
                  <div className="scholarship-meta">{r.service} · {r.requestedLevel}</div>
                </div>
              </div>
              {r.reason && <p style={{ color: 'var(--ink-500)', fontSize: 13.5 }}>{r.reason}</p>}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={decidingId === r.id}
                  onClick={() => decide(r, 'APPROVED')}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={decidingId === r.id}
                  onClick={() => decide(r, 'REJECTED')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
