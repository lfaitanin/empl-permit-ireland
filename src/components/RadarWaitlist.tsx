import { useEffect, useRef, useState } from 'react';
import { Radar, CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

// Form backend that accepts a JSON POST (Formspree). The block stays hidden if unset.
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

// localStorage flag: set once the visitor joins or dismisses the corner nudge
const NUDGE_KEY = 'radarNudgeDone';
const NUDGE_DELAY_MS = 20_000;

type Status = 'idle' | 'sending' | 'done' | 'error';

function nudgeDone() {
  try { return localStorage.getItem(NUDGE_KEY) === '1'; } catch { return true; }
}
function markNudgeDone() {
  try { localStorage.setItem(NUDGE_KEY, '1'); } catch { /* ignore */ }
}

export default function RadarWaitlist({ source, className = '' }: { source: string; className?: string }) {
  const { t, lang } = useLang();
  const w = t.waitlist;
  const [status, setStatus] = useState<Status>('idle');
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Small corner nudge, once: after a delay or when the visitor has scrolled halfway.
  useEffect(() => {
    if (!ENDPOINT || nudgeDone()) return;
    const onScroll = () => {
      const scrolled = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.5) show();
    };
    const stop = () => { window.clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
    // Show at most once per page view, and never again once joined or dismissed
    const show = () => { stop(); if (!nudgeDone()) setNudge(true); };
    const timer = window.setTimeout(show, NUDGE_DELAY_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    return stop;
  }, []);

  if (!ENDPOINT) return null;

  function dismissNudge() {
    setNudge(false);
    markNudgeDone();
  }

  function openFromNudge() {
    dismissNudge();
    setOpen(true);
    boxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

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
      if (res.ok) markNudgeDone();
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <div ref={boxRef} className={`bg-white rounded-xl border border-indigo-200 shadow-sm p-4 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 shrink-0"><Radar className="w-4 h-4" /></div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{w.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{w.short}</p>
            </div>
          </div>
          {!open && status !== 'done' && (
            <button onClick={() => setOpen(true)}
              className="shrink-0 ml-11 sm:ml-0 self-start sm:self-auto px-3 py-1.5 rounded-lg border border-indigo-300 text-indigo-700 text-xs font-medium hover:bg-indigo-50 transition-colors">
              {w.submit}
            </button>
          )}
        </div>

        {status === 'done' ? (
          <p className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg p-3 mt-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> {w.success}
          </p>
        ) : open && (
          <form onSubmit={onSubmit} className="space-y-3 mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-600">{w.desc}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block text-sm">
                <span className="text-gray-700 font-medium">{w.email}</span>
                <input name="email" type="email" required autoComplete="email" autoFocus
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
                className="mt-1 ml-0 sm:ml-2 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
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

      {nudge && status !== 'done' && (
        <div role="dialog" aria-label={w.title}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-80 z-40 bg-white rounded-xl border border-indigo-200 shadow-lg p-3"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <button onClick={dismissNudge} aria-label="Close"
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
          <div className="flex items-start gap-2 pr-6">
            <Radar className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{w.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{w.short}</p>
              <button onClick={openFromNudge}
                className="mt-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors">
                {w.submit}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
