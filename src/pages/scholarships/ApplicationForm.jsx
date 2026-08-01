import React, { useMemo, useState } from 'react';
import { applicationApi } from '../../api/applicationApi';
import { extractErrorMessage } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FACULTIES } from '../../constants/roles';

const STEPS = ['Personal', 'Academic', 'Documents'];

const buildInitialForm = (user) => ({
  fullName: user.name || '',
  email: user.email,
  phone: user.phone || '',
  faculty: '',
  department: '',
  matricNumber: '',
});

export default function ApplicationForm({ onSubmitted, onCancel }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [form, setForm] = useState(() => buildInitialForm(user));
  const [doc1, setDoc1] = useState(null);
  const [doc2, setDoc2] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const departmentOptions = useMemo(() => FACULTIES.find((f) => f.name === form.faculty)?.departments || [], [form.faculty]);

  const isStepValid = () => {
    switch (step) {
      case 0: return form.fullName && form.email;
      case 1: return form.faculty && form.department && form.matricNumber;
      case 2: return true;
      default: return false;
    }
  };

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value, ...(field === 'faculty' ? { department: '' } : {}) }));
  };

  const goNext = () => {
    if (!isStepValid()) return;
    setCompletedSteps(Math.max(completedSteps, step + 1));
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid()) return;
    setSubmitting(true);
    setError('');
    try {
      await applicationApi.submit(form, doc1, doc2);
      showToast('Application submitted', 'You can track its status under My Applications.', 'success');
      onSubmitted();
    } catch (err) {
      setError(extractErrorMessage(err, 'Failed to submit your application.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="form-steps">
        {STEPS.map((label, i) => (
          <div key={label} className={`form-step${i < completedSteps ? ' done' : i === step ? ' current' : ''}`}>
            <div className="form-step-circle">{i + 1}</div>
            <div className="form-step-label">{label}</div>
          </div>
        ))}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <h3 style={{ marginTop: 0 }}>Personal information</h3>
            <div className="field"><label>Full name</label><input required value={form.fullName} onChange={update('fullName')} /></div>
            <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={update('email')} /></div>
            <div className="field"><label>Phone (optional)</label><input type="tel" value={form.phone} onChange={update('phone')} /></div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 style={{ marginTop: 0 }}>Academic details</h3>
            <div className="field">
              <label>Faculty</label>
              <select required value={form.faculty} onChange={update('faculty')}>
                <option value="">Select Faculty</option>
                {FACULTIES.map((f) => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Department</label>
              <select required value={form.department} onChange={update('department')} disabled={!form.faculty}>
                <option value="">Select Department</option>
                {departmentOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="field"><label>Matriculation number</label><input required value={form.matricNumber} onChange={update('matricNumber')} /></div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={{ marginTop: 0 }}>Supporting documents (optional)</h3>
            <div className="field"><label>Document 1</label><input type="file" onChange={(e) => setDoc1(e.target.files[0] || null)} /></div>
            <div className="field"><label>Document 2</label><input type="file" onChange={(e) => setDoc2(e.target.files[0] || null)} /></div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button type="button" className="btn btn-ghost" onClick={step === 0 ? onCancel : () => setStep((s) => s - 1)}>
            {step === 0 ? 'Cancel' : 'Previous'}
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn-primary" onClick={goNext} disabled={!isStepValid()}>Next</button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit application'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
