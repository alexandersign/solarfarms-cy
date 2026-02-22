'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { RfiItem, RfiType, RfiStatus, RfiPriority, RfiDirection } from '@/lib/rfi-service';
import type { VendorContact } from '@/lib/vendor-contacts';

// ─────────────────────────── Helpers ─────────────────────────────

function daysBetween(a: string, b: string): number {
  return Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

function daysUntilDue(due?: string): number | null {
  if (!due) return null;
  return daysBetween(new Date().toISOString().split('T')[0], due);
}

const STATUS_CONFIG: Record<RfiStatus, { label: string; color: string; bg: string; dot: string }> = {
  draft:              { label: 'Draft',            color: 'text-gray-400',   bg: 'bg-gray-500/10 border-gray-500/20',   dot: 'bg-gray-500' },
  sent:               { label: 'Sent',             color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',   dot: 'bg-blue-500' },
  awaiting_response:  { label: 'Awaiting',         color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-500' },
  partial_response:   { label: 'Partial',          color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', dot: 'bg-orange-500' },
  complete:           { label: 'Complete',          color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-500' },
  overdue:            { label: 'Overdue',           color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',    dot: 'bg-red-500' },
  cancelled:          { label: 'Cancelled',         color: 'text-gray-500',   bg: 'bg-gray-500/10 border-gray-500/20',  dot: 'bg-gray-600' },
};

const PRIORITY_CONFIG: Record<RfiPriority, { label: string; color: string }> = {
  critical: { label: 'CRIT', color: 'bg-red-500/20 text-red-400' },
  high:     { label: 'HIGH', color: 'bg-amber-500/20 text-amber-400' },
  medium:   { label: 'MED',  color: 'bg-blue-500/20 text-blue-400' },
  low:      { label: 'LOW',  color: 'bg-gray-500/20 text-gray-400' },
};

const TYPE_LABELS: Record<RfiType, string> = {
  RFI: 'RFI', RFP: 'RFP', RFQ: 'RFQ', RFC: 'RFC', NDA: 'NDA', OTHER: 'Other',
};

// ─────────────────────────── Stats Card ─────────────────────────

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/30 p-4">
      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent || 'text-white'}`}>{value}</p>
      {sub && <p className="text-[10px] text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─────────────────────── Compose Modal ──────────────────────────

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (data: any) => Promise<void>;
  rfi?: RfiItem | null;
  mode: 'new_rfi' | 'send_email' | 'followup';
}

function ComposeModal({ open, onClose, onSend, rfi, mode }: ComposeModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    reference: rfi?.reference || '',
    type: (rfi?.type || 'RFI') as RfiType,
    subject: rfi ? (mode === 'followup' ? `Follow-up: ${rfi.subject}` : rfi.subject) : '',
    to_company: rfi?.to_company || '',
    to_contact: rfi?.to_contact || '',
    to_email: rfi?.to_email || '',
    category: rfi?.category || 'Technical',
    priority: (rfi?.priority || 'medium') as RfiPriority,
    date_due: rfi?.date_due || '',
    description: rfi?.description || '',
    items: '',
    send_email: mode === 'send_email' || mode === 'followup',
    template: mode === 'followup' ? 'followup' : 'rfi',
  });

  useEffect(() => {
    if (rfi) {
      setForm(prev => ({
        ...prev,
        reference: rfi.reference,
        type: rfi.type,
        subject: mode === 'followup' ? `Follow-up: ${rfi.subject}` : rfi.subject,
        to_company: rfi.to_company,
        to_contact: rfi.to_contact || '',
        to_email: rfi.to_email || '',
        category: rfi.category || 'Technical',
        priority: rfi.priority,
        date_due: rfi.date_due || '',
        description: rfi.description || '',
        template: mode === 'followup' ? 'followup' : 'rfi',
        send_email: mode === 'send_email' || mode === 'followup',
      }));
    }
  }, [rfi, mode]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSend(form);
      onClose();
    } catch {
      // error handled upstream
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'new_rfi' ? 'Create New RFI/RFP' :
                mode === 'send_email' ? 'Send Email' :
                'Send Follow-up';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700/50 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Row 1: Reference + Type + Priority */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Reference</label>
              <input value={form.reference} onChange={e => setForm({...form, reference: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="LCY-RFI-006" required />
            </div>
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value as RfiType})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Priority</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value as RfiPriority})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-[10px] uppercase text-gray-500 mb-1 block">Subject</label>
            <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="RFI subject line" required />
          </div>

          {/* Row 2: Recipient */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">To Company</label>
              <input value={form.to_company} onChange={e => setForm({...form, to_company: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="e.g. Linyang Energy" />
            </div>
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Contact Name</label>
              <input value={form.to_contact} onChange={e => setForm({...form, to_contact: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="e.g. Kamil" />
            </div>
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Email</label>
              <input value={form.to_email} onChange={e => setForm({...form, to_email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="recipient@company.com" type="email" />
            </div>
          </div>

          {/* Row 3: Category + Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                <option value="Technical">Technical</option>
                <option value="Commercial">Commercial</option>
                <option value="Legal">Legal</option>
                <option value="MV Equipment">MV Equipment</option>
                <option value="EMS/SCADA">EMS/SCADA</option>
                <option value="Spares & LTSA">Spares & LTSA</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Response Due</label>
              <input value={form.date_due} onChange={e => setForm({...form, date_due: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                type="date" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] uppercase text-gray-500 mb-1 block">Description / Body</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white h-24 resize-y"
              placeholder="Describe the information needed..." />
          </div>

          {/* Items (for templates) */}
          <div>
            <label className="text-[10px] uppercase text-gray-500 mb-1 block">Items (one per line)</label>
            <textarea value={form.items} onChange={e => setForm({...form, items: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white h-20 resize-y"
              placeholder="MV Transformer brand&#10;Switchgear type (SF6 vs air)&#10;Protection relay model" />
          </div>

          {/* Send email toggle */}
          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
            <input type="checkbox" checked={form.send_email}
              onChange={e => setForm({...form, send_email: e.target.checked})}
              className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700" />
            <div>
              <p className="text-sm text-white font-medium">Send email via Resend</p>
              <p className="text-[10px] text-gray-500">Will automatically send to the recipient and log the correspondence</p>
            </div>
          </div>

          {form.send_email && (
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Email Template</label>
              <select value={form.template} onChange={e => setForm({...form, template: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                <option value="rfi">Standard RFI</option>
                <option value="rfp">Request for Proposal</option>
                <option value="followup">Follow-up</option>
                <option value="reminder">Urgent Reminder</option>
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={loading}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                form.send_email
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}>
              {loading ? 'Processing...' : form.send_email ? 'Create & Send Email' : 'Create RFI'}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ──────────────────────── Detail Panel ───────────────────────────

function DetailPanel({ rfi, onClose, onUpdate, onSendFollowup }: {
  rfi: RfiItem;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<RfiItem>) => Promise<void>;
  onSendFollowup: (rfi: RfiItem) => void;
}) {
  const dueDays = daysUntilDue(rfi.date_due);
  const sc = STATUS_CONFIG[rfi.status];
  const progress = rfi.items_count ? Math.round(((rfi.items_resolved || 0) / rfi.items_count) * 100) : 0;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-gray-900 border-l border-gray-700 shadow-2xl z-[90] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-700/50 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-500 font-mono">{rfi.reference}</p>
          <h2 className="text-sm font-semibold text-white mt-0.5">{rfi.subject}</h2>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white text-lg">&times;</button>
      </div>

      <div className="p-6 space-y-5">
        {/* Status + Priority badges */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-semibold ${sc.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            {sc.label}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold ${PRIORITY_CONFIG[rfi.priority].color}`}>
            {PRIORITY_CONFIG[rfi.priority].label}
          </span>
          <span className="px-2 py-1 rounded text-[10px] font-medium bg-gray-700/50 text-gray-300">
            {TYPE_LABELS[rfi.type]}
          </span>
          {rfi.direction === 'outbound' ? (
            <span className="text-[10px] text-cyan-400">&#8593; OUT</span>
          ) : (
            <span className="text-[10px] text-emerald-400">&#8595; IN</span>
          )}
        </div>

        {/* Progress bar */}
        {rfi.items_count ? (
          <div>
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>Items resolved</span>
              <span>{rfi.items_resolved || 0}/{rfi.items_count} ({progress}%)</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : null}

        {/* Dates */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-[9px] text-gray-500 uppercase">Sent</p>
            <p className="text-xs text-gray-300 font-medium mt-0.5">
              {rfi.date_sent ? new Date(rfi.date_sent).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }) : '—'}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-[9px] text-gray-500 uppercase">Due</p>
            <p className={`text-xs font-medium mt-0.5 ${
              dueDays !== null && dueDays < 0 ? 'text-red-400' : dueDays !== null && dueDays <= 3 ? 'text-amber-400' : 'text-gray-300'
            }`}>
              {rfi.date_due ? new Date(rfi.date_due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }) : '—'}
              {dueDays !== null && <span className="text-gray-500 text-[9px] ml-1">({dueDays}d)</span>}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-[9px] text-gray-500 uppercase">Responded</p>
            <p className="text-xs text-gray-300 font-medium mt-0.5">
              {rfi.date_responded ? new Date(rfi.date_responded).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }) : '—'}
            </p>
          </div>
        </div>

        {/* Parties */}
        <div className="space-y-2">
          <h3 className="text-[10px] uppercase text-gray-500 font-semibold">Parties</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
              <p className="text-[9px] text-gray-500">FROM</p>
              <p className="text-xs text-white font-medium">{rfi.from_company}</p>
              {rfi.from_contact && <p className="text-[10px] text-gray-400">{rfi.from_contact}</p>}
              {rfi.from_email && <p className="text-[10px] text-cyan-400">{rfi.from_email}</p>}
            </div>
            <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
              <p className="text-[9px] text-gray-500">TO</p>
              <p className="text-xs text-white font-medium">{rfi.to_company}</p>
              {rfi.to_contact && <p className="text-[10px] text-gray-400">{rfi.to_contact}</p>}
              {rfi.to_email && <p className="text-[10px] text-cyan-400">{rfi.to_email}</p>}
            </div>
          </div>
        </div>

        {/* Description */}
        {rfi.description && (
          <div>
            <h3 className="text-[10px] uppercase text-gray-500 font-semibold mb-1">Description</h3>
            <p className="text-xs text-gray-300 leading-relaxed">{rfi.description}</p>
          </div>
        )}

        {/* Response Summary */}
        {rfi.response_summary && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
            <h3 className="text-[10px] uppercase text-emerald-400 font-semibold mb-1">Response Summary</h3>
            <p className="text-xs text-gray-300 leading-relaxed">{rfi.response_summary}</p>
          </div>
        )}

        {/* Tags */}
        {rfi.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {rfi.tags.map(tag => (
              <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* Quick status update */}
        <div>
          <h3 className="text-[10px] uppercase text-gray-500 font-semibold mb-2">Update Status</h3>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(STATUS_CONFIG) as RfiStatus[]).map(s => (
              <button key={s}
                onClick={() => onUpdate(rfi.id!, { status: s })}
                className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                  rfi.status === s
                    ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color} font-bold`
                    : 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                }`}>
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {rfi.direction === 'outbound' && rfi.to_email && (
            <button onClick={() => onSendFollowup(rfi)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition-colors">
              Send Follow-up
            </button>
          )}
          {rfi.direction === 'outbound' && !rfi.email_sent && rfi.to_email && (
            <button onClick={() => onSendFollowup(rfi)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors">
              Send Original Email
            </button>
          )}
        </div>

        {/* Email status */}
        <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-1">
          {rfi.email_sent ? (
            <><span className="w-2 h-2 rounded-full bg-emerald-500" /> Email sent</>
          ) : (
            <><span className="w-2 h-2 rounded-full bg-gray-600" /> Not emailed</>
          )}
          {rfi.file_ref && (
            <span className="ml-auto text-gray-600 truncate max-w-[200px]" title={rfi.file_ref}>
              File: {rfi.file_ref.split('/').pop()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────── Send Document Modal ────────────────────────

interface SendDocModalProps {
  open: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

interface DocEntry { path: string; label: string; type: string; vendor?: string }

function SendDocumentModal({ open, onClose, showToast }: SendDocModalProps) {
  const [vendors, setVendors] = useState<VendorContact[]>([]);
  const [documents, setDocuments] = useState<DocEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [toName, setToName] = useState('');
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState('');
  const [coverMsg, setCoverMsg] = useState('');
  const [confirmText, setConfirmText] = useState('');

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setConfirmText('');
    setLoading(true);
    fetch('/api/admin/vendor-email')
      .then(r => r.json())
      .then(data => {
        setVendors(data.vendors || []);
        setDocuments(data.documents || []);
      })
      .catch(() => showToast('Failed to load vendors'))
      .finally(() => setLoading(false));
  }, [open, showToast]);

  useEffect(() => {
    if (!selectedVendor) return;
    const v = vendors.find(x => x.id === selectedVendor);
    if (!v) return;
    const primary = v.contacts.find(c => c.primary) || v.contacts[0];
    if (primary) {
      setToEmail(primary.email || '');
      setToName(primary.name || '');
    }
    const vendorDocs = documents.filter(d => d.vendor === selectedVendor);
    if (vendorDocs.length === 1) setSelectedDoc(vendorDocs[0].path);
  }, [selectedVendor, vendors, documents]);

  useEffect(() => {
    if (!selectedDoc) return;
    const doc = documents.find(d => d.path === selectedDoc);
    if (doc) {
      const v = vendors.find(x => x.id === selectedVendor);
      setSubject(`${doc.type}: ${doc.label}${v ? ` — ${v.company}` : ''}`);
    }
  }, [selectedDoc, selectedVendor, vendors, documents]);

  if (!open) return null;

  const filteredDocs = selectedVendor
    ? documents.filter(d => !d.vendor || d.vendor === selectedVendor)
    : documents;

  const canSend = toEmail && subject && selectedDoc && confirmText === 'SEND';

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    try {
      const res = await fetch('/api/admin/vendor-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendor_id: selectedVendor || undefined,
          to_email: toEmail,
          to_name: toName,
          cc: cc || undefined,
          subject,
          document_path: selectedDoc,
          cover_message: coverMsg || undefined,
          send_as_attachment: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(`Error: ${data.error}`);
      } else {
        setSent(true);
        showToast(`Sent to ${toEmail}`);
      }
    } catch (err: any) {
      showToast(`Send failed: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>

        <div className="sticky top-0 bg-gray-900 border-b border-gray-700/50 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-base font-semibold text-white">Send Document to Vendor</h2>
            <p className="text-[10px] text-gray-500 mt-0.5">Document will be embedded in a professional email</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg">&times;</button>
        </div>

        {sent ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-3xl text-emerald-400">&#10003;</span>
            </div>
            <p className="text-lg text-white font-semibold mb-1">Email Sent Successfully</p>
            <p className="text-sm text-gray-400 mb-6">Sent to {toEmail}</p>
            <button onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 text-sm">
              Close
            </button>
          </div>
        ) : loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500 mt-3">Loading vendors...</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {/* Vendor selector */}
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Vendor</label>
              <select value={selectedVendor} onChange={e => setSelectedVendor(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                <option value="">— Select vendor or enter manually —</option>
                {vendors.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.company} ({v.category})
                    {v.contacts[0]?.email ? '' : ' ⚠ no email'}
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase text-gray-500 mb-1 block">Recipient Email *</label>
                <input value={toEmail} onChange={e => setToEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="vendor@company.com" type="email" required />
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-500 mb-1 block">Recipient Name</label>
                <input value={toName} onChange={e => setToName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="Contact name" />
              </div>
            </div>

            {/* CC */}
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">CC (optional)</label>
              <input value={cc} onChange={e => setCc(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="office@lighthief.com" type="email" />
            </div>

            {/* Document selector */}
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Document *</label>
              <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" required>
                <option value="">— Select document —</option>
                {filteredDocs.map(d => (
                  <option key={d.path} value={d.path}>
                    [{d.type}] {d.label}
                  </option>
                ))}
              </select>
              {selectedDoc && (
                <p className="text-[9px] text-gray-600 mt-1 font-mono truncate">{selectedDoc}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Email Subject *</label>
              <input value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="Subject line" required />
            </div>

            {/* Cover message */}
            <div>
              <label className="text-[10px] uppercase text-gray-500 mb-1 block">Cover Message (optional)</label>
              <textarea value={coverMsg} onChange={e => setCoverMsg(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white h-20 resize-y"
                placeholder="Additional context for the recipient..." />
            </div>

            {/* Security confirmation */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-sm mt-0.5">&#9888;</span>
                <div>
                  <p className="text-xs text-red-300 font-semibold">Confirm before sending</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    This will send an email from <strong className="text-white">noreply@solarfarms.cy</strong> with the selected
                    document embedded. The email cannot be recalled once sent.
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    To: <strong className="text-white">{toEmail || '(no email)'}</strong>
                    {toName && <> &middot; {toName}</>}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-red-300 mb-1 block">Type <strong>SEND</strong> to confirm</label>
                <input value={confirmText} onChange={e => setConfirmText(e.target.value.toUpperCase())}
                  className="w-full bg-gray-950 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-white font-mono tracking-widest text-center"
                  placeholder="Type SEND" maxLength={4} autoComplete="off" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button onClick={handleSend} disabled={!canSend || sending}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                {sending ? 'Sending...' : 'Send Document Email'}
              </button>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors">
                Cancel
              </button>
            </div>

            {/* Rate limit notice */}
            <p className="text-[9px] text-gray-600 text-center">
              Rate limited to 5 emails per minute &middot; All sends are logged &middot; Reply-to: office@lighthief.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────── Main Dashboard ──────────────────────────

export default function ProcurementDashboard() {
  const router = useRouter();
  const [items, setItems] = useState<RfiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRfi, setSelectedRfi] = useState<RfiItem | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeMode, setComposeMode] = useState<'new_rfi' | 'send_email' | 'followup'>('new_rfi');
  const [composeRfi, setComposeRfi] = useState<RfiItem | null>(null);
  const [filter, setFilter] = useState<'all' | RfiStatus | 'overdue_only'>('all');
  const [directionFilter, setDirectionFilter] = useState<'all' | RfiDirection>('all');
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [sendDocOpen, setSendDocOpen] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch items
  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/rfi');
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      } else {
        setItems([]);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load RFIs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  // Auto-detect overdue items
  useEffect(() => {
    const now = new Date().toISOString().split('T')[0];
    items.forEach(item => {
      if (item.date_due && item.status !== 'complete' && item.status !== 'cancelled' && item.status !== 'overdue') {
        if (item.date_due < now) {
          handleUpdate(item.id!, { status: 'overdue' });
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // Seed initial data
  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/rfi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _action: 'seed' }),
      });
      const data = await res.json();
      showToast(`Seeded ${data.seeded} items`);
      fetchItems();
    } catch {
      showToast('Failed to seed data');
    } finally {
      setSeeding(false);
    }
  };

  // Update an RFI
  const handleUpdate = async (id: string, updates: Partial<RfiItem>) => {
    try {
      await fetch(`/api/rfi/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
      if (selectedRfi?.id === id) {
        setSelectedRfi(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch {
      showToast('Update failed');
    }
  };

  // Create / Send
  const handleComposeSend = async (formData: any) => {
    try {
      // 1. Create the RFI record if new
      if (composeMode === 'new_rfi' || composeMode === 'send_email') {
        const createRes = await fetch('/api/rfi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference: formData.reference,
            type: formData.type,
            direction: 'outbound' as RfiDirection,
            subject: formData.subject,
            description: formData.description,
            to_company: formData.to_company,
            to_contact: formData.to_contact,
            to_email: formData.to_email,
            category: formData.category,
            priority: formData.priority,
            date_due: formData.date_due || undefined,
            status: formData.send_email ? 'sent' : 'draft',
            items_count: formData.items ? formData.items.split('\n').filter(Boolean).length : 0,
          }),
        });
        const created = await createRes.json();

        // 2. Send email if requested
        if (formData.send_email && formData.to_email) {
          await fetch('/api/rfi/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              rfiId: created.id,
              to_email: formData.to_email,
              to_name: formData.to_contact,
              subject: formData.subject,
              template: formData.template,
              rfi_data: {
                reference: formData.reference,
                category: formData.category,
                due_date: formData.date_due ? new Date(formData.date_due).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'ASAP',
                intro: formData.description,
                items: formData.items ? formData.items.split('\n').filter(Boolean) : [],
                urgent: formData.priority === 'critical',
              },
            }),
          });
          showToast(`RFI created & email sent to ${formData.to_email}`);
        } else {
          showToast('RFI created (draft)');
        }
      }

      // Follow-up mode
      if (composeMode === 'followup' && composeRfi) {
        if (formData.to_email) {
          const dueDays = daysUntilDue(composeRfi.date_due);
          await fetch('/api/rfi/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              rfiId: composeRfi.id,
              to_email: formData.to_email,
              to_name: formData.to_contact,
              subject: `Follow-up: ${composeRfi.subject}`,
              template: formData.template,
              rfi_data: {
                reference: composeRfi.reference,
                subject: composeRfi.subject,
                original_type: composeRfi.type,
                original_date: composeRfi.date_sent,
                due_date: composeRfi.date_due,
                days_overdue: dueDays !== null && dueDays < 0 ? Math.abs(dueDays) : 0,
                outstanding_items: formData.items ? formData.items.split('\n').filter(Boolean) : [],
              },
            }),
          });
          showToast(`Follow-up sent to ${formData.to_email}`);
        }
      }

      fetchItems();
    } catch (err: any) {
      showToast(`Error: ${err.message || 'Failed'}`);
      throw err;
    }
  };

  // Filtered items
  const filtered = items.filter(item => {
    if (directionFilter !== 'all' && item.direction !== directionFilter) return false;
    if (filter === 'all') return true;
    if (filter === 'overdue_only') {
      const d = daysUntilDue(item.date_due);
      return d !== null && d < 0 && item.status !== 'complete' && item.status !== 'cancelled';
    }
    return item.status === filter;
  });

  // Stats
  const stats = {
    total: items.length,
    outbound: items.filter(i => i.direction === 'outbound').length,
    inbound: items.filter(i => i.direction === 'inbound').length,
    awaiting: items.filter(i => ['sent', 'awaiting_response'].includes(i.status)).length,
    overdue: items.filter(i => {
      const d = daysUntilDue(i.date_due);
      return d !== null && d < 0 && i.status !== 'complete' && i.status !== 'cancelled';
    }).length,
    complete: items.filter(i => i.status === 'complete').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[200] bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg shadow-xl text-sm animate-pulse">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">L</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">RFI / RFP Procurement Tracker</h1>
              <p className="text-[10px] text-gray-500">Lighthief Cyprus — BESS Project</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/bess-project')}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700">
              Timeline
            </button>
            <button onClick={() => setSendDocOpen(true)}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-500 transition-colors font-semibold">
              Send Document
            </button>
            <button onClick={() => { setComposeMode('new_rfi'); setComposeRfi(null); setComposeOpen(true); }}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-semibold">
              + New RFI
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total RFIs" value={stats.total} sub={`${stats.outbound} out / ${stats.inbound} in`} />
          <StatCard label="Awaiting" value={stats.awaiting} accent="text-amber-400" sub="Sent, no response" />
          <StatCard label="Overdue" value={stats.overdue} accent="text-red-400" sub="Past due date" />
          <StatCard label="Complete" value={stats.complete} accent="text-emerald-400" sub={`${stats.total ? Math.round((stats.complete / stats.total) * 100) : 0}% resolved`} />
          <StatCard label="Outbound" value={stats.outbound} accent="text-cyan-400" sub="Sent by us" />
          <StatCard label="Inbound" value={stats.inbound} accent="text-purple-400" sub="Received" />
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-gray-500 uppercase mr-2">Filter:</span>
          {[
            { key: 'all', label: 'All' },
            { key: 'draft', label: 'Draft' },
            { key: 'sent', label: 'Sent' },
            { key: 'awaiting_response', label: 'Awaiting' },
            { key: 'partial_response', label: 'Partial' },
            { key: 'overdue', label: 'Overdue' },
            { key: 'complete', label: 'Complete' },
          ].map(f => (
            <button key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                filter === f.key
                  ? 'bg-blue-500/20 border-blue-500/30 text-blue-400 font-semibold'
                  : 'border-gray-700 text-gray-500 hover:text-gray-300'
              }`}>
              {f.label}
            </button>
          ))}
          <span className="text-gray-700 mx-1">|</span>
          {[
            { key: 'all', label: 'Both' },
            { key: 'outbound', label: 'Outbound' },
            { key: 'inbound', label: 'Inbound' },
          ].map(f => (
            <button key={f.key}
              onClick={() => setDirectionFilter(f.key as any)}
              className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                directionFilter === f.key
                  ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400 font-semibold'
                  : 'border-gray-700 text-gray-500 hover:text-gray-300'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading / Empty / Error */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500 mt-3">Loading tracker...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-sm text-red-400 mb-3">{error}</p>
            <p className="text-[10px] text-gray-500 mb-4">
              You may need to run the Supabase migration first.
            </p>
            <button onClick={handleSeed} disabled={seeding}
              className="text-[10px] px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 mr-2">
              {seeding ? 'Seeding...' : 'Seed Initial Data'}
            </button>
            <button onClick={fetchItems}
              className="text-[10px] px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="bg-gray-900 border border-gray-700/50 rounded-xl p-12 text-center">
            <p className="text-lg text-gray-400 mb-2">No RFIs tracked yet</p>
            <p className="text-xs text-gray-600 mb-6">Seed with existing data from the master tracker, or create a new one.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={handleSeed} disabled={seeding}
                className="text-xs px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 font-semibold disabled:opacity-50">
                {seeding ? 'Seeding...' : 'Import Existing RFIs (7 items)'}
              </button>
              <button onClick={() => { setComposeMode('new_rfi'); setComposeRfi(null); setComposeOpen(true); }}
                className="text-xs px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-semibold">
                + Create New
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && filtered.length > 0 && (
          <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700/50 bg-gray-800/30">
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-24">Ref</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold">Subject</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-20">Type</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-24">Company</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-20">Status</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-20">Priority</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-20">Due</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-16">Items</th>
                    <th className="px-4 py-3 text-[10px] text-gray-500 uppercase font-semibold w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(item => {
                    const sc = STATUS_CONFIG[item.status];
                    const dueDays = daysUntilDue(item.date_due);
                    const progress = item.items_count ? Math.round(((item.items_resolved || 0) / item.items_count) * 100) : null;

                    return (
                      <tr key={item.id}
                        onClick={() => setSelectedRfi(item)}
                        className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-mono text-gray-400">{item.reference}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-white font-medium truncate max-w-[300px]">{item.subject}</p>
                          <p className="text-[10px] text-gray-600 truncate max-w-[300px]">{item.category}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-gray-400">{TYPE_LABELS[item.type]}</span>
                            {item.direction === 'outbound' ? (
                              <span className="text-[9px] text-cyan-500">&#8593;</span>
                            ) : (
                              <span className="text-[9px] text-emerald-500">&#8595;</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] text-gray-300 truncate block max-w-[100px]">
                            {item.direction === 'outbound' ? item.to_company : item.from_company}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-semibold ${sc.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            <span className={sc.color}>{sc.label}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${PRIORITY_CONFIG[item.priority].color}`}>
                            {PRIORITY_CONFIG[item.priority].label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-medium ${
                            dueDays !== null && dueDays < 0 ? 'text-red-400' :
                            dueDays !== null && dueDays <= 3 ? 'text-amber-400' :
                            'text-gray-400'
                          }`}>
                            {item.date_due ? new Date(item.date_due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'}
                            {dueDays !== null && <span className="text-gray-600 ml-0.5">({dueDays}d)</span>}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {progress !== null ? (
                            <div className="flex items-center gap-1.5">
                              <div className="w-8 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                                  style={{ width: `${progress}%` }} />
                              </div>
                              <span className="text-[9px] text-gray-500">{item.items_resolved}/{item.items_count}</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-gray-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {item.email_sent && <span className="text-[9px] text-emerald-500" title="Email sent">&#9993;</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-8">
        <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-[10px] text-gray-600">Lighthief Cyprus Ltd — Confidential Procurement Dashboard</p>
          <p className="text-[10px] text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </footer>

      {/* Side panel */}
      {selectedRfi && (
        <DetailPanel
          rfi={selectedRfi}
          onClose={() => setSelectedRfi(null)}
          onUpdate={handleUpdate}
          onSendFollowup={(rfi) => {
            setComposeMode('followup');
            setComposeRfi(rfi);
            setComposeOpen(true);
            setSelectedRfi(null);
          }}
        />
      )}

      {/* Compose modal */}
      <ComposeModal
        open={composeOpen}
        onClose={() => { setComposeOpen(false); setComposeRfi(null); }}
        onSend={handleComposeSend}
        rfi={composeRfi}
        mode={composeMode}
      />

      {/* Send Document modal */}
      <SendDocumentModal
        open={sendDocOpen}
        onClose={() => setSendDocOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
