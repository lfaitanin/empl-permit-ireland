import { useState } from 'react';
import { Radar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

// Form backend that accepts a JSON POST (e.g. a Formspree form URL).
// Set WAITLIST_ENDPOINT on Vercel; the block stays hidden until it is set.
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function RadarWaitlist({ source, className = '' }: { source: string; className?: string }) {
  const { t, lang } = useLang();
  const w = t.waitlist;
  const [status, setStatus] = useState<Status>('idle');

  if (!ENDPOINT) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: form.get('email'),
          occupation: form.get('occupation'),
          willingToPay: form.get('willingToPay'),
          language: lang,
          source,
          _subject: `Radar waitlist: ${form.get('occupation')}`,
        }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={`bg-white rounded-xl border border-indigo-200 shadow-sm p-4 sm:p-5 ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 shrink-0"><Radar className="w-5 h-5" /></div>
        <div>
          <h2 className="font-semibold text-gray-900">{w.title}</h2>
          <p className="text-sm text-gray-600 mt-0.5">{w.desc}</p>
        </div>
      </div>

      {status === 'done' ? (
        <p className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg p-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {w.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="text-gray-700 font-medium">{w.email}</span>
              <input name="email" type="email" required autoComplete="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="block text-sm">
              <span className="text-gray-700 font-medium">{w.occupation}</span>
              <input name="occupation" type="text" required placeholder={w.occupationPlaceholder}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-gray-700 font-medium">{w.payQuestion}</span>
            <select name="willingToPay" required defaultValue=""
              className="mt-1 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="" disabled>{w.payChoose}</option>
              <option value="yes">{w.payYes}</option>
              <option value="maybe">{w.payMaybe}</option>
              <option value="free-only">{w.payNo}</option>
            </select>
          </label>
          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input name="consent" type="checkbox" required className="mt-0.5" />
            <span>
              {w.consent}{' '}
              <Link to="/privacy" className="text-indigo-600 underline">{w.privacy}</Link>
            </span>
          </label>
          <div className="flex items-center gap-3">
            <button type="submit" disabled={status === 'sending'}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 transition-colors">
              {status === 'sending' ? w.sending : w.submit}
            </button>
            {status === 'error' && <span className="text-sm text-red-600">{w.error}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
