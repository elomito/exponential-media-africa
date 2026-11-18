import React, { useEffect, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Check, CheckCircle2, Lock, Mail, MessageCircle } from 'lucide-react';
import { DIVISIONS, VERIFIED_CONTACT } from '../data/seedData';
import { db } from '../lib/firebase';
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

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceCode: string;
    companyName: string;
    servicesCount: number;
    emailNotificationConfigured: boolean;
  } | null>(null);

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

    setSubmitting(true);
    try {
      const validateRes = await fetch('/api/inquiries/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidate),
      });

      const validateJson = await validateRes.json();
      if (!validateRes.ok || !validateJson.valid) {
        setErrorMsg(validateJson.error || 'Server validation rejected the submission.');
        return;
      }

      const payload = validateJson.sanitizedPayload;
      const inquiryId = payload.referenceCode;

      await setDoc(doc(db, 'inquiries', inquiryId), {
        ...payload,
        createdAt: serverTimestamp(),
      });

      setConfirmation({
        referenceCode: payload.referenceCode,
        companyName: payload.companyName,
        servicesCount: payload.requiredServices.length,
        emailNotificationConfigured: Boolean(validateJson.emailNotificationConfigured),
      });
    } catch (err) {
      console.error('Inquiry submission failed:', err);
      setErrorMsg(
        `We could not record your inquiry online right now. Please email ${VERIFIED_CONTACT.email} or call ${VERIFIED_CONTACT.primaryPhone}.`
      );
    } finally {
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
      <div
        role="status"
        className={`p-8 rounded-2xl border ${
          darkSurface
            ? 'bg-[#141418] border-emerald-500/30 text-white'
            : 'bg-emerald-50 border-emerald-200 text-neutral-900'
        }`}
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-4" aria-hidden="true" />
        <h3 className="text-2xl font-display font-semibold tracking-tight mb-2">
          Project Brief Recorded
        </h3>
        <p className={`text-sm leading-relaxed mb-4 ${darkSurface ? 'text-neutral-300' : 'text-neutral-700'}`}>
          Thank you. Your inquiry for <strong>{confirmation.companyName}</strong> covering{' '}
          {confirmation.servicesCount} selected service{confirmation.servicesCount === 1 ? '' : 's'} has been securely saved to our inquiry database.
        </p>
        {!confirmation.emailNotificationConfigured && (
          <p className={`text-xs leading-relaxed mb-6 ${darkSurface ? 'text-neutral-400' : 'text-neutral-600'}`}>
            For immediate follow-up alongside your stored brief, please quote your reference number on WhatsApp ({VERIFIED_CONTACT.primaryPhone}) or email{' '}
            <a href={`mailto:${VERIFIED_CONTACT.email}`} className="text-[#FF1A1F] underline font-semibold">
              {VERIFIED_CONTACT.email}
            </a>
            .
          </p>
        )}
        <div
          className={`p-4 rounded-xl border mb-6 ${
            darkSurface ? 'bg-[#0B0B0D] border-white/10' : 'bg-white border-emerald-200'
          }`}
        >
          <div className="text-xs text-neutral-400 mb-1">Unique Inquiry Reference</div>
          <div className={`font-mono text-lg font-bold tabular-nums ${darkSurface ? 'text-[#FF1A1F]' : 'text-[#E50000]'}`}>
            {confirmation.referenceCode}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setConfirmation(null);
              setFullName('');
              setBusinessEmail('');
              setCompanyName('');
              setPhone('');
              setIndustry('');
              setRequiredServices([]);
              setEstimatedBudget('');
              setProjectTimeline('');
              setProjectDescription('');
              setConsentAccepted(false);
            }}
            className="px-5 py-2.5 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors"
          >
            Submit Another Brief
          </button>
          <a
            href={`${VERIFIED_CONTACT.whatsappUrl}&text=${encodeURIComponent(
              `Hello Exponential Media Africa, I have submitted inquiry reference ${confirmation.referenceCode} for ${confirmation.companyName}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
            <span>Follow Up on WhatsApp</span>
          </a>
          <a
            href={`mailto:${VERIFIED_CONTACT.email}?subject=${encodeURIComponent(
              `Project Inquiry ${confirmation.referenceCode} — ${confirmation.companyName}`
            )}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
            <span>Email Directly</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200"
        >
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className={`inline-flex items-center gap-1.5 text-xs ${darkSurface ? 'text-neutral-400' : 'text-neutral-500'}`}>
          <Lock className={`w-3.5 h-3.5 ${darkSurface ? 'text-[#FF1A1F]' : 'text-[#E50000]'}`} aria-hidden="true" />
          <span>Server-validated submission · Confidential inquiry handling</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] disabled:opacity-60 text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {submitting ? 'Submitting Brief...' : 'Submit Project Inquiry'}
        </button>
      </div>
    </form>
  );
}
