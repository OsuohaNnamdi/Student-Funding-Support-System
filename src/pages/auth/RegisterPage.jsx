import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { extractErrorMessage } from '../../api/client';

const initialForm = { name: '', email: '', password: '', phone: '' };

export default function RegisterPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email, password: form.password };
      if (form.phone) payload.phone = form.phone;
      await register(payload);
      showToast('Account created', 'You can now log in.', 'success');
      navigate('/login', { replace: true });
    } catch (err) {
      setError(extractErrorMessage(err, 'Registration failed. Please check your details and try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-mark">SS</span>
          <strong style={{ fontSize: 18 }}>Syntechtic Scholars</strong>
        </div>

        <h1 className="page-title" style={{ marginBottom: 4 }}>Create your account</h1>
        <p className="page-subtitle" style={{ marginBottom: 24 }}>
          Apply for scholarships and track your funding — after registering, request access to get started.
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full name</label>
            <input required value={form.name} onChange={update('name')} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={form.email} onChange={update('email')} />
          </div>
          <div className="field">
            <label>Phone (optional)</label>
            <input type="tel" value={form.phone} onChange={update('phone')} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required minLength={12} value={form.password} onChange={update('password')} />
            <p className="field-hint">At least 12 characters, with upper &amp; lower case letters, a number and a special character.</p>
          </div>

          <button className="btn btn-primary btn-block" disabled={loading} type="submit">
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}
