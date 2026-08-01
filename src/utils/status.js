const STATUS_BADGE = {
  PENDING: 'badge-warning',
  APPROVED: 'badge-success',
  REJECTED: 'badge-danger',
};

export function statusBadgeClass(status) {
  return STATUS_BADGE[status?.toUpperCase()] || 'badge-neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  return status.charAt(0) + status.slice(1).toLowerCase();
}
