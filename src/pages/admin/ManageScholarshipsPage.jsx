import React, { useEffect, useState } from 'react';
import { GraduationCap, X } from 'lucide-react';
import { scholarshipApi } from '../../api/scholarshipApi';
import { extractErrorMessage } from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';

const emptyForm = { donorName: '', email: '', numStudents: '', totalAmount: '', comments: '' };

export default function ManageScholarshipsPage() {
  const { showToast } = useToast();
  const confirm = useConfirm();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState(emptyForm);
  const [logo, setLogo] = useState(null);
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [savingEdit, setSavingEdit] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setScholarships(await scholarshipApi.list());
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not load scholarships.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await scholarshipApi.add({ ...form, numStudents: Number(form.numStudents), totalAmount: Number(form.totalAmount) }, logo);
      showToast('Scholarship added', '', 'success');
      setForm(emptyForm);
      setLogo(null);
      load();
    } catch (err) {
      showToast('Could not add scholarship', extractErrorMessage(err), 'error');
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (s) => {
    setEditing(s);
    setEditForm({ donorName: s.donorName, email: s.email, numStudents: s.numStudents, totalAmount: s.totalAmount, comments: s.comments || '' });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSavingEdit(true);
    try {
      await scholarshipApi.update(editing.id, { ...editForm, numStudents: Number(editForm.numStudents), totalAmount: Number(editForm.totalAmount) });
      showToast('Scholarship updated', '', 'success');
      setEditing(null);
      load();
    } catch (err) {
      showToast('Could not update scholarship', extractErrorMessage(err), 'error');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (s) => {
    const ok = await confirm({ title: 'Delete this scholarship?', message: `"${s.donorName}" will no longer be visible to students.`, confirmText: 'Delete' });
    if (!ok) return;
    try {
      await scholarshipApi.remove(s.id);
      setScholarships((prev) => prev.filter((x) => x.id !== s.id));
      showToast('Scholarship deleted', '', 'success');
    } catch (err) {
      showToast('Could not delete', extractErrorMessage(err), 'error');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Manage</p>
          <h1 className="page-title">Scholarships</h1>
          <p className="page-subtitle">Offer new scholarships, and manage existing ones.</p>
        </div>
      </div>

      <form className="card" onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Add a scholarship</h3>
        <div className="field-row">
          <div className="field"><label>Donor name</label><input required value={form.donorName} onChange={(e) => setForm((f) => ({ ...f, donorName: e.target.value }))} /></div>
          <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Number of students</label><input type="number" required value={form.numStudents} onChange={(e) => setForm((f) => ({ ...f, numStudents: e.target.value }))} /></div>
          <div className="field"><label>Total amount</label><input type="number" step="0.01" required value={form.totalAmount} onChange={(e) => setForm((f) => ({ ...f, totalAmount: e.target.value }))} /></div>
        </div>
        <div className="field"><label>Comments</label><textarea required value={form.comments} onChange={(e) => setForm((f) => ({ ...f, comments: e.target.value }))} /></div>
        <div className="field"><label>Logo (optional)</label><input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files?.[0] ?? null)} /></div>
        <button className="btn btn-primary" disabled={saving} type="submit">{saving ? 'Adding…' : 'Add scholarship'}</button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <Spinner fullPage />
      ) : scholarships.length === 0 ? (
        <EmptyState icon={<GraduationCap size={32} strokeWidth={1.5} />} title="No scholarships yet" />
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="table">
            <thead><tr><th>Donor</th><th>Email</th><th>Students</th><th>Total</th><th></th></tr></thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.id}>
                  <td>{s.donorName}</td>
                  <td>{s.email}</td>
                  <td>{s.numStudents}</td>
                  <td>₦{s.totalAmount}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(s)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ margin: 0, fontSize: 18 }}>Edit scholarship</h2>
              <button className="icon-btn" onClick={() => setEditing(null)} type="button"><X size={16} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="field"><label>Donor name</label><input required value={editForm.donorName} onChange={(e) => setEditForm((f) => ({ ...f, donorName: e.target.value }))} /></div>
              <div className="field"><label>Email</label><input type="email" required value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} /></div>
              <div className="field"><label>Number of students</label><input type="number" required value={editForm.numStudents} onChange={(e) => setEditForm((f) => ({ ...f, numStudents: e.target.value }))} /></div>
              <div className="field"><label>Total amount</label><input type="number" step="0.01" required value={editForm.totalAmount} onChange={(e) => setEditForm((f) => ({ ...f, totalAmount: e.target.value }))} /></div>
              <div className="field"><label>Comments</label><textarea required value={editForm.comments} onChange={(e) => setEditForm((f) => ({ ...f, comments: e.target.value }))} /></div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={savingEdit}>{savingEdit ? 'Saving…' : 'Save changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
