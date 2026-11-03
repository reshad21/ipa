import React, { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';

interface RequestDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  investigationName: string;
  beatNumber: string;
  tagline: string;
}

export const RequestDatasetModal: React.FC<RequestDatasetModalProps> = ({
  isOpen,
  onClose,
  investigationName,
  beatNumber,
  tagline,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  if (!isOpen) return null;

  const close = () => {
    setSubmitted(false);
    setMessage('');
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.replace(/<[^>]*>/g, '').trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted">{beatNumber}</p>
            <h2 className="mt-1 text-2xl font-extrabold text-brand-dark">Request Full Dataset</h2>
            <p className="mt-2 text-sm text-muted">{investigationName} — {tagline}</p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="text-2xl text-muted">×</button>
        </div>
        {submitted ? (
          <div className="rounded-xl bg-surface p-5 text-sm text-brand-dark">Your dataset request has been received.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" name="fullName" placeholder="Full name" autoComplete="name" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-dark" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required type="email" name="email" placeholder="Email address" autoComplete="email" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-dark" />
              <input required type="tel" name="phone" placeholder="Phone number" autoComplete="tel" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-dark" />
            </div>
            <input required type="text" name="subject" placeholder="Subject" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-dark" />
            <RichTextEditor
              id="dataset-request-message"
              value={message}
              onChange={setMessage}
              placeholder="Please describe your intended use of the dataset..."
              minHeight="140px"
            />
            <button type="submit" className="w-full rounded-full bg-brand-dark px-5 py-3 text-xs font-bold uppercase tracking-wider text-accent">Submit Request</button>
          </form>
        )}
      </div>
    </div>
  );
};
