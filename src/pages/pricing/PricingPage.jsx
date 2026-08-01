import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { fundApi } from '../../api/fundApi';
import { extractErrorMessage } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [needsAccess, setNeedsAccess] = useState(false);

  useEffect(() => {
    fundApi
      .list()
      .then(setFunds)
      .catch((err) => {
        if (err?.response?.status === 403) {
          setNeedsAccess(true);
        } else {
          setError(extractErrorMessage(err, 'Could not load funds.'));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Give back</p>
          <h1 className="page-title">Funds</h1>
          <p className="page-subtitle">Funds our sponsors have set up to support students.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {needsAccess ? (
        <div className="alert alert-info">
          {isAuthenticated ? (
            <>You need read access to the Scholarship service before you can view funds. <Link to="/access-requests">Request access</Link>.</>
          ) : (
            <><Link to="/login">Log in</Link> and request access to view funds.</>
          )}
        </div>
      ) : funds.length === 0 ? (
        <EmptyState icon={<Wallet size={32} strokeWidth={1.5} />} title="No funds yet" />
      ) : (
        <div className="price-grid">
          {funds.map((fund) => (
            <div className="card card-hover price-card" key={fund.id}>
              <div style={{ fontWeight: 700 }}>{fund.name}</div>
              <div className="price-amount">₦{fund.amount}</div>
              <p style={{ color: 'var(--ink-500)', fontSize: 13.5 }}>{fund.description}</p>
              {fund.contact && <span className="badge badge-neutral">Contact: {fund.contact}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
