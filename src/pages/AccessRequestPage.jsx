import React, { useEffect, useState } from 'react';
import { KeyRound } from 'lucide-react';
import { accessApi } from '../api/accessApi';
import { extractErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';

const SERVICE = 'SCHOLARSHIP';

const STATUS_BADGE = {
  PENDING: 'badge-warning',
  APPROVED: 'badge-success',
  REJECTED: 'badge-danger',
};

export default function AccessRequestPage() {
  const { refreshGrants } = useAuth();
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [level, setLevel] = useState('READ');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [reqs, grantList] = await Promise.all([accessApi.listMyRequests(), accessApi.listMyGrants()]);
      setRequests(reqs);
      setGrants(grantList);
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not load your access requests.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const hasGrant = (lvl) => grants.some((g) => g.service === SERVICE && g.level === lvl);
  const hasPending = (lvl) => requests.some((r) => r.service === SERVICE && r.requestedLevel === lvl && r.status === 'PENDING');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await accessApi.requestAccess({ service: SERVICE, requestedLevel: level, reason: reason || undefined });
      showToast('Request submitted', 'An admin will review it shortly.', 'success');
      setReason('');
      await load();
      await refreshGrants();
    } catch (err) {
      showToast('Could not submit request', extractErrorMessage(err), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page page-narrow">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Access</p>
          <h1 className="page-title">Scholarship service access</h1>
          <p className="page-subtitle">Browsing scholarships needs read access; applying needs write access. An admin approves each request.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Your access</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className={`badge ${hasGrant('READ') ? 'badge-success' : 'badge-neutral'}`}>
            Browse (read) {hasGrant('READ') ? '— granted' : '— not granted'}
          </span>
          <span className={`badge ${hasGrant('WRITE') ? 'badge-success' : 'badge-neutral'}`}>
            Apply (write) {hasGrant('WRITE') ? '— granted' : '— not granted'}
          </span>
        </div>
      </div>

      <form className="card" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Request access</h3>
        <div className="field">
          <label>Access level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="READ">Browse scholarships (read)</option>
            <option value="WRITE">Submit applications (write)</option>
          </select>
        </div>
        <div className="field">
          <label>Reason (optional)</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Tell the admin why you need access" />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitting || hasGrant(level) || hasPending(level)}
        >
          {submitting ? 'Submitting…' : hasGrant(level) ? 'Already granted' : hasPending(level) ? 'Request pending' : 'Request access'}
        </button>
      </form>

      <h3>Request history</h3>
      {requests.length === 0 ? (
        <EmptyState icon={<KeyRound size={32} strokeWidth={1.5} />} title="No requests yet" message="Submit a request above to get started." />
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="table">
            <thead><tr><th>Level</th><th>Status</th><th>Reason</th><th>Requested</th></tr></thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.requestedLevel}</td>
                  <td><span className={`badge ${STATUS_BADGE[r.status] || 'badge-neutral'}`}>{r.status}</span></td>
                  <td style={{ maxWidth: 220 }}>{r.reason || '—'}</td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
