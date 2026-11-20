import React, { useEffect, useRef, useState } from 'react';
import { Check, CheckCircle2, Lock, Mail, MessageCircle } from 'lucide-react';
import { DIVISIONS, VERIFIED_CONTACT } from '../data/seedData';
import { projectInquirySchema } from '../lib/validation';

interface ProjectInquiryFormProps {
  preselectedService?: string;
  onNavigate?: (path: string) => void;
  darkSurface?: boolean;
}

const INDUSTRIES = [
  'Quick Service Restaurants & Hospitality',
  'Retail & Convenience',
  'Fast-Moving Consumer Goods (FMCG)',
  'Banking & Financial Services',
  'Technology & Telecommunications',
  'Education & NGOs',
  'Manufacturing & Energy',
  'Healthcare & Wellness',
  'Other',
];

const BUDGET_RANGES = [
  'KES 150,000 – 400,000',
  'KES 400,000 – 1,000,000',
  'KES 1,000,000 – 2,500,000',
  'KES 2,500,000+',
  'To Be Scoped Together',
];

const TIMELINES = [
  'Immediate (Within 2 Weeks)',
  '1 – 2 Months',
  '3 – 6 Months',
  'Annual Retainer / Ongoing',
];
const INQUIRY_REFERENCE_PATTERN = /^EMA-\d{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{12}$/;

function createIdempotencyKey(): string {
  const browserCrypto = globalThis.crypto;
  if (typeof browserCrypto.randomUUID === 'function') return browserCrypto.randomUUID();

  const bytes = browserCrypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function ProjectInquiryForm({
  preselectedService,
  onNavigate,
  darkSurface = true,
}: ProjectInquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [requiredServices, setRequiredServices] = useState<string[]>(
    preselectedService ? [preselectedService] : []
  );
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [projectTimeline, setProjectTimeline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const idempotencyRef = useRef<{ fingerprint: string; key: string } | null>(null);

  useEffect(() => {
    if (preselectedService && !requiredServices.includes(preselectedService)) {
      setRequiredServices((prev) => [...prev, preselectedService]);
    }
  }, [preselectedService]);

  const toggleService = (service: string) => {
    setRequiredServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : prev.length < 20
        ? [...prev, service]
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg(null);

    const candidate = {
      fullName,
      businessEmail,
      companyName,
      phone,
      industry,
      requiredServices,
      estimatedBudget,
      projectTimeline,
      projectDescription,
      consentAccepted,
      websiteHoneypot,
    };

    const parsed = projectInquirySchema.safeParse(candidate);
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message || 'Please check all required fields.');
      return;
    }

    const fingerprint = JSON.stringify(candidate);
    setSubmitting(true);
    let timeoutId: number | undefined;
    try {
      if (!idempotencyRef.current || idempotencyRef.current.fingerprint !== fingerprint) {
        idempotencyRef.current = { fingerprint, key: createIdempotencyKey() };
      }
      const idempotencyKey = idempotencyRef.current.key;
      const controller = new AbortController();
      timeoutId = window.setTimeout(() => controller.abort(), 20_000);
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(candidate),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      const body = result && typeof result === 'object' ? result as Record<string, unknown> : null;
      if (
        !response.ok ||
        body?.success !== true ||
        typeof body.referenceCode !== 'string' ||
        !INQUIRY_REFERENCE_PATTERN.test(body.referenceCode)
      ) {
        setErrorMsg(
          typeof body?.error === 'string'
            ? body.error
            : `We could not confirm that your inquiry was recorded. Your entries remain here. Please contact ${VERIFIED_CONTACT.email} or ${VERIFIED_CONTACT.primaryPhone}.`
        );
        return;
      }
      setConfirmation(body.referenceCode);
    } catch {
      setErrorMsg(
        `We could not confirm that your inquiry was recorded. Your entries remain here. Retry this form or contact ${VERIFIED_CONTACT.email} or ${VERIFIED_CONTACT.primaryPhone}.`
      );
    } finally {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  const inputClass = darkSurface
    ? 'w-full px-3.5 py-2.5 text-sm bg-[#0B0B0D] border border-white/15 rounded-lg text-white placeholder:text-neutral-500 focus:border-[#ED2126] focus:outline-none'
    : 'w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:border-[#ED2126] focus:outline-none';

  const labelClass = darkSurface
    ? 'block text-xs font-medium text-neutral-300 mb-1.5'
    : 'block text-xs font-medium text-neutral-700 mb-1.5';

  if (confirmation) {
    return (
      <div role="status" className={`p-6 sm:p-8 border ${darkSurface ? 'border-emerald-500/30 bg-emerald-950/20 text-white' : 'border-emerald-200 bg-emerald-50 text-neutral-900'}`}>
        <CheckCircle2 className="w-9 h-9 text-emerald-500 mb-4" aria-hidden="true" />
        <h3 className="text-2xl font-display font-bold mb-2">Inquiry recorded</h3>
        <p className="text-sm leading-relaxed mb-5">Your project inquiry has been saved. Email notification is not configured through this form; for urgent follow-up, contact us directly.</p>
        <div className="font-mono text-lg font-bold text-[#ED2126] mb-5">{confirmation}</div>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${VERIFIED_CONTACT.email}`} className="inline-flex items-center gap-2 px-4 py-2.5 border border-current/20 text-sm font-semibold rounded-md"><Mail className="w-4 h-4" aria-hidden="true" />Email the team</a>
          <a href={VERIFIED_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 border border-current/20 text-sm font-semibold rounded-md"><MessageCircle className="w-4 h-4" aria-hidden="true" />WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={submitting}>
      <fieldset disabled={submitting} className="min-w-0 space-y-6 border-0 p-0">
      {/* Anti-spam honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={websiteHoneypot}
        onChange={(e) => setWebsiteHoneypot(e.target.value)}
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-fullname" className={labelClass}>
            Full Name *
          </label>
          <input
            id="inq-fullname"
            type="text"
            required
            maxLength={120}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="inq-email" className={labelClass}>
            Business Email *
          </label>
          <input
            id="inq-email"
            type="email"
            required
            maxLength={160}
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            placeholder="name@organisation.co.ke"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="inq-company" className={labelClass}>
            Company / Organisation *
          </label>
          <input
            id="inq-company"
            type="text"
            required
            maxLength={140}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Organisation Ltd."
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="inq-phone" className={labelClass}>
            Telephone Number *
          </label>
          <input
            id="inq-phone"
            type="tel"
            required
            maxLength={30}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+254 7XX XXX XXX"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="inq-industry" className={labelClass}>
            Industry *
          </label>
          <select
            id="inq-industry"
            required
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className={inputClass}
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="inq-budget" className={labelClass}>
            Estimated Budget *
          </label>
          <select
            id="inq-budget"
            required
            value={estimatedBudget}
            onChange={(e) => setEstimatedBudget(e.target.value)}
            className={inputClass}
          >
            <option value="">Select budget</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="inq-timeline" className={labelClass}>
            Project Timeline *
          </label>
          <select
            id="inq-timeline"
            required
            value={projectTimeline}
            onChange={(e) => setProjectTimeline(e.target.value)}
            className={inputClass}
          >
            <option value="">Select timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Multi-Select Required Services Across Practice Pillars */}
      <div>
        <div className={labelClass}>
          Required Services (Select all that apply) *
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {DIVISIONS.map((division) => (
            <div
              key={division.id}
              className={`p-4 rounded-xl border ${
                darkSurface
                  ? 'bg-[#0B0B0D]/80 border-white/10'
                  : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div className={`text-xs font-bold mb-2.5 ${darkSurface ? 'text-[#FF1A1F]' : 'text-[#E50000]'}`}>
                {division.name}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {division.services.map((srv) => {
                  const selected = requiredServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      aria-pressed={selected}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors text-left ${
                        selected
                          ? 'bg-[#ED2126] text-white'
                          : darkSurface
                          ? 'bg-white/5 text-neutral-300 hover:bg-white/10'
                          : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 shrink-0" aria-hidden="true" />}
                      <span>{srv}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="inq-description" className={labelClass}>
          Project Description &amp; Objectives *
        </label>
        <textarea
          id="inq-description"
          rows={4}
          required
          maxLength={3000}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Outline your goals, target audience, deliverables, or event dates..."
          className={inputClass}
        />
      </div>

      <label
        className={`flex items-start gap-2.5 text-xs cursor-pointer ${
          darkSurface ? 'text-neutral-400' : 'text-neutral-600'
        }`}
      >
        <input
          type="checkbox"
          checked={consentAccepted}
          onChange={(e) => setConsentAccepted(e.target.checked)}
          className="mt-0.5 rounded border-white/20 text-[#ED2126] focus:ring-[#ED2126] accent-[#ED2126]"
        />
        <span>
          I confirm that the details provided are accurate and consent to Exponential Media Africa processing this inquiry confidentially under the{' '}
          <a
            href="/privacy-policy"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/privacy-policy');
              }
            }}
            className={`${darkSurface ? 'text-[#FF1A1F] hover:text-white' : 'text-[#E50000] hover:text-neutral-900'} font-bold underline`}
          >
            Privacy Policy
          </a>{' '}
          (Kenya Data Protection Act, 2019).
        </span>
      </label>

      <div
        role="note"
        className={`p-3.5 rounded-lg border text-xs ${darkSurface ? 'bg-amber-950/40 border-amber-500/30 text-amber-100' : 'bg-amber-50 border-amber-200 text-amber-950'}`}
      >
        Your project details are submitted to our inquiry system. For urgent follow-up, email{' '}
        <a className="font-semibold underline" href={`mailto:${VERIFIED_CONTACT.email}`}>{VERIFIED_CONTACT.email}</a>
        {' '}or call {VERIFIED_CONTACT.primaryPhone}.
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200"
        >
          {errorMsg}
        </div>
      )}

      {submitting && (
        <p role="status" aria-live="polite" className={`text-sm ${darkSurface ? 'text-neutral-300' : 'text-neutral-700'}`}>
          Submitting your inquiry. Please keep this page open.
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className={`inline-flex items-center gap-1.5 text-xs ${darkSurface ? 'text-neutral-400' : 'text-neutral-500'}`}>
          <Lock className={`w-3.5 h-3.5 ${darkSurface ? 'text-[#FF1A1F]' : 'text-[#E50000]'}`} aria-hidden="true" />
          <span>Secure submission · Required fields are marked above.</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] disabled:opacity-60 text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {submitting ? 'Submitting…' : 'Submit Project Inquiry'}
        </button>
      </div>
      </fieldset>
    </form>
  );
}
