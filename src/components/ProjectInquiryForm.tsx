import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronDown, Lock, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DIVISIONS, VERIFIED_CONTACT } from '../data/seedData';
import {
  findDivisionIdsForServices,
  getSelectedServicesForDivision,
  resolveCanonicalServiceName,
  toggleDivisionSelection,
  toggleSubServiceSelection,
  type DivisionId,
} from '../lib/inquiryServices';
import { INQUIRY_REFERENCE_PATTERN, projectInquirySchema, sanitizeMailtoHref } from '../lib/validation';

interface ProjectInquiryFormProps {
  preselectedService?: string;
  onNavigate?: (path: string) => void;
  darkSurface?: boolean;
}

const INDUSTRIES = [
  { en: 'Quick Service Restaurants & Hospitality', sw: 'Migahawa na Ukarimu' },
  { en: 'Retail & Convenience', sw: 'Maduka ya Rejareja' },
  { en: 'Fast-Moving Consumer Goods (FMCG)', sw: 'Bidhaa za Matumizi ya Kila Siku (FMCG)' },
  { en: 'Banking & Financial Services', sw: 'Benki na Huduma za Kifedha' },
  { en: 'Technology & Telecommunications', sw: 'Teknolojia na Mawasiliano' },
  { en: 'Education & NGOs', sw: 'Elimu na Mashirika Yasiyo ya Kiserikali' },
  { en: 'Manufacturing & Energy', sw: 'Viwanda na Nishati' },
  { en: 'Healthcare & Wellness', sw: 'Afya na Ustawi' },
  { en: 'Other', sw: 'Sekta Nyingine' },
];

const BUDGET_RANGES = [
  { en: 'KES 150,000 – 400,000', sw: 'KES 150,000 – 400,000' },
  { en: 'KES 400,000 – 1,000,000', sw: 'KES 400,000 – 1,000,000' },
  { en: 'KES 1,000,000 – 2,500,000', sw: 'KES 1,000,000 – 2,500,000' },
  { en: 'KES 2,500,000+', sw: 'KES 2,500,000+' },
  { en: 'To Be Scoped Together', sw: 'Tutakadiria Pamoja' },
];

const TIMELINES = [
  { en: 'Immediate (Within 2 Weeks)', sw: 'Haraka (Ndani ya Wiki 2)' },
  { en: '1 – 2 Months', sw: 'Miezi 1 – 2' },
  { en: '3 – 6 Months', sw: 'Miezi 3 – 6' },
  { en: 'Annual Retainer / Ongoing', sw: 'Mkataba wa Mwaka / Endelevu' },
];

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
  const { language, t, localizeDivision } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const initialService = preselectedService ? resolveCanonicalServiceName(preselectedService) : '';
  const [requiredServices, setRequiredServices] = useState<string[]>(
    initialService ? [initialService] : []
  );
  const [selectedDivisions, setSelectedDivisions] = useState<DivisionId[]>(() =>
    initialService ? findDivisionIdsForServices([initialService]) : []
  );
  const [pillarMenuOpen, setPillarMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Partial<Record<DivisionId, boolean>>>({});
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);

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
    if (!preselectedService) return;
    const resolved = resolveCanonicalServiceName(preselectedService);
    if (!resolved) return;

    setRequiredServices((prev) => (prev.includes(resolved) ? prev : [...prev, resolved]));
    const parentIds = findDivisionIdsForServices([resolved]);
    if (parentIds.length > 0) {
      setSelectedDivisions((prev) => {
        const nextSet = new Set<DivisionId>([...prev, ...parentIds]);
        return DIVISIONS.map((d) => d.id).filter((id) => nextSet.has(id));
      });
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setPillarMenuOpen(false);
        setOpenSubMenus({});
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPillarMenuOpen(false);
        setOpenSubMenus({});
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleToggleDivision = (divisionId: DivisionId) => {
    const next = toggleDivisionSelection(selectedDivisions, requiredServices, divisionId);
    setSelectedDivisions(next.activeDivisionIds);
    setRequiredServices(next.selectedServices);
    if (!next.activeDivisionIds.includes(divisionId)) {
      setOpenSubMenus((prev) => {
        const copy = { ...prev };
        delete copy[divisionId];
        return copy;
      });
    }
  };

  const toggleSubMenu = (divisionId: DivisionId) => {
    setPillarMenuOpen(false);
    setOpenSubMenus((prev) => ({
      ...prev,
      [divisionId]: !prev[divisionId],
    }));
  };

  const toggleService = (service: string) => {
    setRequiredServices((prev) => toggleSubServiceSelection(prev, service, 20));
  };

  const handleClearAllServices = () => {
    setSelectedDivisions([]);
    setRequiredServices([]);
    setOpenSubMenus({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg(null);

    if (requiredServices.length === 0) {
      if (selectedDivisions.length === 0) {
        setPillarMenuOpen(true);
        setErrorMsg(t.form.serviceValidationEmpty);
      } else {
        setOpenSubMenus({ [selectedDivisions[0]]: true });
        setErrorMsg(t.form.serviceValidationPickOption);
      }
      return;
    }

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
      const body = result && typeof result === 'object' ? (result as Record<string, unknown>) : null;
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
    ? 'w-full px-3.5 py-2.5 text-sm bg-white border border-white/25 rounded-lg text-[#1A0809] placeholder:text-[#5C3A3C]/70 focus:border-[#ED1B24] focus:outline-none'
    : 'w-full px-3.5 py-2.5 text-sm bg-white border border-[#ED1B24]/25 rounded-lg text-[#1A0809] placeholder:text-[#5C3A3C]/70 focus:border-[#ED1B24] focus:outline-none';

  const labelClass = darkSurface
    ? 'block text-xs font-semibold text-white mb-1.5'
    : 'block text-xs font-semibold text-[#2A1214] mb-1.5';

  if (confirmation) {
    return (
      <div
        role="status"
        className={`p-6 sm:p-8 border ${
          darkSurface
            ? 'border-emerald-500/30 bg-emerald-950/20 text-white'
            : 'border-emerald-200 bg-emerald-50 text-neutral-900'
        }`}
      >
        <CheckCircle2 className="w-9 h-9 text-emerald-500 mb-4" aria-hidden="true" />
        <h3 className="text-2xl font-display font-bold mb-2">{t.form.recordedTitle}</h3>
        <p className="text-base sm:text-lg leading-relaxed mb-5">{t.form.recordedBody}</p>
        <div
          className={`font-display text-lg font-bold tabular-nums mb-5 ${
            darkSurface ? 'text-white' : 'text-[#B81118]'
          }`}
        >
          {confirmation}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={sanitizeMailtoHref(VERIFIED_CONTACT.email)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-current/20 text-sm font-semibold rounded-md"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            {t.form.emailTeam}
          </a>
          <a
            href={VERIFIED_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-current/20 text-sm font-semibold rounded-md"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={submitting}>
      <fieldset disabled={submitting} className="min-w-0 space-y-6 border-0 p-0">
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
              {t.form.fullName}
            </label>
            <input
              id="inq-fullname"
              type="text"
              required
              maxLength={120}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.form.fullNamePlaceholder}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="inq-email" className={labelClass}>
              {t.form.businessEmail}
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
              {t.form.companyName}
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
              {t.form.phone}
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
              {t.form.industry}
            </label>
            <select
              id="inq-industry"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={inputClass}
            >
              <option value="">{t.form.selectIndustry}</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.en} value={ind.en}>
                  {language === 'sw' ? ind.sw : ind.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inq-budget" className={labelClass}>
              {t.form.budget}
            </label>
            <select
              id="inq-budget"
              required
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
              className={inputClass}
            >
              <option value="">{t.form.selectBudget}</option>
              {BUDGET_RANGES.map((b) => (
                <option key={b.en} value={b.en}>
                  {language === 'sw' ? b.sw : b.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inq-timeline" className={labelClass}>
              {t.form.timeline}
            </label>
            <select
              id="inq-timeline"
              required
              value={projectTimeline}
              onChange={(e) => setProjectTimeline(e.target.value)}
              className={inputClass}
            >
              <option value="">{t.form.selectTimeline}</option>
              {TIMELINES.map((tl) => (
                <option key={tl.en} value={tl.en}>
                  {language === 'sw' ? tl.sw : tl.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div ref={servicesDropdownRef} className="relative">
          <label htmlFor="inq-services-trigger" className={labelClass}>
            {t.form.requiredServices}
          </label>

          <button
            id="inq-services-trigger"
            type="button"
            data-testid="services-pillar-dropdown"
            aria-expanded={pillarMenuOpen}
            aria-controls="inq-services-pillar-menu"
            onClick={() => {
              setOpenSubMenus({});
              setPillarMenuOpen((prev) => !prev);
            }}
            className={`${inputClass} flex items-center justify-between gap-3 text-left`}
          >
            <span
              className={`truncate ${
                selectedDivisions.length === 0
                  ? 'text-[#5C3A3C]/70'
                  : 'text-[#1A0809] font-medium'
              }`}
            >
              {selectedDivisions.length === 0
                ? t.form.selectServiceAreasPlaceholder
                : `${selectedDivisions.length} ${
                    selectedDivisions.length === 1
                      ? t.form.areaSelectedSuffix
                      : t.form.areasSelectedSuffix
                  }${
                    requiredServices.length > 0
                      ? ` · ${requiredServices.length} ${
                          requiredServices.length === 1
                            ? t.form.serviceSelectedSuffix
                            : t.form.servicesSelectedSuffix
                        }`
                      : ''
                  }`}
            </span>
            <ChevronDown
              className={`w-4 h-4 shrink-0 text-[#5C3A3C] transition-transform duration-200 ${
                pillarMenuOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {pillarMenuOpen && (
            <div
              id="inq-services-pillar-menu"
              role="group"
              aria-label={t.form.requiredServices}
              className="mt-1.5 w-full rounded-lg border border-[#ED1B24]/25 bg-white text-[#1A0809] shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-[#ED1B24]/10">
                {DIVISIONS.map((rawDivision) => {
                  const division = localizeDivision(rawDivision);
                  const checked = selectedDivisions.includes(division.id);
                  const countForDiv = getSelectedServicesForDivision(
                    requiredServices,
                    division.id
                  ).length;
                  return (
                    <label
                      key={division.id}
                      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm cursor-pointer transition-colors ${
                        checked ? 'bg-[#FAF5F5]' : 'hover:bg-[#FAF5F5]/60'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleToggleDivision(division.id)}
                          className="h-4 w-4 rounded border-[#ED1B24]/40 accent-[#ED1B24] shrink-0"
                        />
                        <span className="font-medium text-[#1A0809] truncate">
                          {division.name}
                        </span>
                      </span>
                      <span className="text-xs text-[#5C3A3C] shrink-0">
                        {countForDiv > 0
                          ? `${countForDiv}/${rawDivision.services.length}`
                          : `${rawDivision.services.length} ${t.form.optionsCountSuffix}`}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 px-3.5 py-2 bg-[#FAF5F5] border-t border-[#ED1B24]/15">
                {selectedDivisions.length > 0 ? (
                  <button
                    type="button"
                    onClick={handleClearAllServices}
                    className="text-xs font-semibold text-[#5C3A3C] hover:text-[#B81118] transition-colors"
                  >
                    {t.form.clearAllButton}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => setPillarMenuOpen(false)}
                  className="px-3 py-1 text-xs font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors"
                >
                  {t.form.doneButton}
                </button>
              </div>
            </div>
          )}

          {selectedDivisions.length > 0 && (
            <div
              className={`grid gap-3 mt-3 ${
                selectedDivisions.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {DIVISIONS.filter((d) => selectedDivisions.includes(d.id)).map((rawDivision) => {
                const division = localizeDivision(rawDivision);
                const pickedCanonical = getSelectedServicesForDivision(
                  requiredServices,
                  division.id
                );
                const pickedLocalized = rawDivision.services
                  .map((rawVal, idx) =>
                    pickedCanonical.includes(rawVal)
                      ? division.services[idx] || rawVal
                      : null
                  )
                  .filter((item): item is string => Boolean(item));
                const isSubOpen = Boolean(openSubMenus[division.id]);

                return (
                  <div key={division.id} className="relative">
                    <button
                      type="button"
                      data-testid={`division-dropdown-${division.id}`}
                      aria-expanded={isSubOpen}
                      aria-controls={`inq-sub-${division.id}`}
                      onClick={() => toggleSubMenu(division.id)}
                      className="w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 text-sm bg-white border border-[#ED1B24]/25 hover:border-[#ED1B24]/50 rounded-lg text-left transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#B81118] truncate">
                          {division.name}
                          {pickedLocalized.length > 0 ? ` (${pickedLocalized.length})` : ''}
                        </div>
                        <div
                          className={`text-xs truncate mt-0.5 ${
                            pickedLocalized.length > 0
                              ? 'text-[#1A0809] font-medium'
                              : 'text-[#5C3A3C]/70'
                          }`}
                        >
                          {pickedLocalized.length > 0
                            ? pickedLocalized.join(', ')
                            : t.form.selectOptionsPlaceholder}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[#5C3A3C] transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isSubOpen && (
                      <div
                        id={`inq-sub-${division.id}`}
                        role="group"
                        aria-label={division.name}
                        className="mt-1.5 w-full rounded-lg border border-[#ED1B24]/25 bg-white text-[#1A0809] shadow-lg p-1.5 space-y-0.5"
                      >
                        {division.services.map((localizedSrv, sIdx) => {
                          const rawValue = rawDivision.services[sIdx] || localizedSrv;
                          const checked = requiredServices.includes(rawValue);
                          return (
                            <label
                              key={rawValue}
                              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs cursor-pointer transition-colors ${
                                checked
                                  ? 'bg-[#FAF5F5] text-[#B81118] font-semibold'
                                  : 'text-[#1A0809] hover:bg-[#FAF5F5]/70'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleService(rawValue)}
                                className="h-3.5 w-3.5 rounded border-[#ED1B24]/40 accent-[#ED1B24] shrink-0"
                              />
                              <span>{localizedSrv}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="inq-description" className={labelClass}>
            {t.form.descriptionLabel}
          </label>
          <textarea
            id="inq-description"
            rows={4}
            required
            maxLength={3000}
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder={t.form.descriptionPlaceholder}
            className={inputClass}
          />
        </div>

        <label
          className={`flex items-start gap-2.5 text-xs cursor-pointer ${
            darkSurface ? 'text-white/90' : 'text-[#5C3A3C]'
          }`}
        >
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => setConsentAccepted(e.target.checked)}
            className="mt-0.5 rounded border-white/40 text-[#ED1B24] focus:ring-[#ED1B24] accent-[#ED1B24]"
          />
          <span>
            {t.form.consentPrefix}{' '}
            <a
              href="/privacy-policy"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/privacy-policy');
                }
              }}
              className={`${darkSurface ? 'text-white' : 'text-[#B81118]'} font-bold hover:opacity-80`}
            >
              {t.form.privacyPolicy}
            </a>{' '}
            {t.form.consentSuffix}
          </span>
        </label>

        <div
          role="note"
          className={`pt-1 text-xs ${darkSurface ? 'text-white/90' : 'text-[#2A1214]'}`}
        >
          {t.form.urgentPrefix}{' '}
          <a className="font-semibold hover:opacity-80" href={sanitizeMailtoHref(VERIFIED_CONTACT.email)}>
            {VERIFIED_CONTACT.email}
          </a>{' '}
          {t.form.orCall} {VERIFIED_CONTACT.primaryPhone}.
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-white text-[#9E0E15] border border-white text-xs font-semibold"
          >
            {errorMsg}
          </div>
        )}

        {submitting && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm ${darkSurface ? 'text-white' : 'text-[#1A0809]'}`}
          >
            {t.form.submitting}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div
            className={`inline-flex items-center gap-1.5 text-xs ${
              darkSurface ? 'text-white/85' : 'text-[#5C3A3C]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.form.secureSubmission}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-3 text-sm font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 disabled:opacity-60 ${
              darkSurface
                ? 'bg-white text-[#B81118] hover:bg-white/90'
                : 'bg-[#ED1B24] hover:bg-[#B81118] text-white'
            }`}
          >
            {submitting ? t.form.submitting : t.form.submitButton}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
