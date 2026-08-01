import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { scholarshipApi } from '../../api/scholarshipApi';
import { extractErrorMessage } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import Avatar from '../../components/Avatar';
import ApplicationForm from './ApplicationForm';

export default function ScholarshipsPage() {
  const { isAuthenticated, isAdmin, hasGrant } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [needsAccess, setNeedsAccess] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    scholarshipApi
      .list()
      .then(setScholarships)
      .catch((err) => {
        if (err?.response?.status === 403) {
          setNeedsAccess(true);
        } else {
          setError(extractErrorMessage(err, 'Could not load scholarships.'));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner fullPage />;

  if (selected) {
    return (
      <div className="page page-narrow">
        <div className="page-header">
          <div>
            <p className="page-eyebrow">Applying to</p>
            <h1 className="page-title">{selected.donorName}</h1>
          </div>
        </div>
        <ApplicationForm
          onCancel={() => setSelected(null)}
          onSubmitted={() => setSelected(null)}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Funding</p>
          <h1 className="page-title">Scholarships</h1>
          <p className="page-subtitle">Browse active scholarships and apply directly.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {needsAccess && isAuthenticated ? (
        <div className="alert alert-info">
          You need read access to the Scholarship service before you can browse scholarships.{' '}
          <Link to="/access-requests">Request access</Link>.
        </div>
      ) : needsAccess ? (
        <div className="alert alert-info">
          <Link to="/login">Log in</Link> and request access to browse scholarships.
        </div>
      ) : scholarships.length === 0 ? (
        <EmptyState icon={<GraduationCap size={32} strokeWidth={1.5} />} title="No scholarships available yet" message="Check back soon — new offers are added regularly." />
      ) : (
        <div className="scholarship-grid">
          {scholarships.map((s) => (
            <div className="card card-hover scholarship-card" key={s.id}>
              <div className="scholarship-donor">
                <Avatar name={s.donorName} size={40} />
                <div>
                  <div className="scholarship-title">{s.donorName}</div>
                  <div className="scholarship-meta">{s.email}</div>
                </div>
              </div>
              <span className="badge badge-brand">Students funded: {s.numStudents}</span>
              {isAuthenticated && !isAdmin && (
                hasGrant('SCHOLARSHIP', 'WRITE') ? (
                  <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }} onClick={() => setSelected(s)}>
                    Enroll now
                  </button>
                ) : (
                  <Link to="/access-requests" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                    Request write access to apply
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
