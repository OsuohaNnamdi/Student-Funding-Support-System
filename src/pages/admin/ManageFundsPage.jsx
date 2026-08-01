import React, { useEffect, useState } from 'react';
import { Wallet, X } from 'lucide-react';
import { fundApi } from '../../api/fundApi';
import { extractErrorMessage } from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';

const emptyForm = { name: '', contact: '', amount: '', description: '' };

export default function ManageFundsPage() {
  const { showToast } = useToast();
  const confirm = useConfirm();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [savingEdit, setSavingEdit] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setFunds(await fundApi.list());
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not load funding plans.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fundApi.add({ ...form, amount: Number(form.amount) });
      showToast('Plan added', '', 'success');
      setForm(emptyForm);
      load();
    } catch (err) {
      showToast('Could not add plan', extractErrorMessage(err), 'error');
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (fund) => {
    setEditing(fund);
    setEditForm({ name: fund.name, contact: fund.contact, amount: fund.amount, description: fund.description });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSavingEdit(true);
    try {
      await fundApi.update(editing.id, { ...editForm, amount: Number(editForm.amount) });
      showToast('Plan updated', '', 'success');
      setEditing(null);
      load();
    } catch (err) {
      showToast('Could not update plan', extractErrorMessage(err), 'error');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (fund) => {
    const ok = await confirm({ title: 'Delete this plan?', message: `"${fund.name}" will no longer be shown on Pricing.`, confirmText: 'Delete' });
    if (!ok) return;
    try {
      await fundApi.remove(fund.id);
      setFunds((prev) => prev.filter((f) => f.id !== fund.id));
      showToast('Plan deleted', '', 'success');
    } catch (err) {
      showToast('Could not delete', extractErrorMessage(err), 'error');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Manage</p>
          <h1 className="page-title">Funding plans</h1>
          <p className="page-subtitle">These show up as tiers on the public Pricing page.</p>
        </div>
      </div>

      <form className="card" onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Add a plan</h3>
        <div className="field-row">
          <div className="field"><label>Name</label><input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
          <div className="field"><label>Contact</label><input required value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} /></div>
        </div>
        <div className="field"><label>Amount (₦)</label><input required value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} /></div>
        <div className="field"><label>Description</label><textarea required value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></div>
        <button className="btn btn-primary" disabled={saving} type="submit">{saving ? 'Adding…' : 'Add plan'}</button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <Spinner fullPage />
      ) : funds.length === 0 ? (
        <EmptyState icon={<Wallet size={32} strokeWidth={1.5} />} title="No funding plans yet" />
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="table">
            <thead><tr><th>Name</th><th>Contact</th><th>Amount</th><th>Description</th><th></th></tr></thead>
            <tbody>
              {funds.map((fund) => (
                <tr key={fund.id}>
                  <td>{fund.name}</td>
                  <td>{fund.contact}</td>
                  <td>₦{fund.amount}</td>
                  <td style={{ maxWidth: 220 }}>{fund.description}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(fund)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(fund)}>Delete</button>
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
              <h2 style={{ margin: 0, fontSize: 18 }}>Edit plan</h2>
              <button className="icon-btn" onClick={() => setEditing(null)} type="button"><X size={16} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="field"><label>Name</label><input required value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} /></div>
              <div className="field"><label>Contact</label><input required value={editForm.contact} onChange={(e) => setEditForm((f) => ({ ...f, contact: e.target.value }))} /></div>
              <div className="field"><label>Amount (₦)</label><input required value={editForm.amount} onChange={(e) => setEditForm((f) => ({ ...f, amount: e.target.value }))} /></div>
              <div className="field"><label>Description</label><textarea required value={editForm.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} /></div>
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
