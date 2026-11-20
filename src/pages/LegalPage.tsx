import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';

interface LegalPageProps {
  mode: 'privacy' | 'terms';
}

export function LegalPage({ mode }: LegalPageProps) {
  const { settings } = useCms();
  const isPrivacy = mode === 'privacy';

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title={`${isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'} — Exponential Media Africa`}
        description={
          isPrivacy
            ? 'Data handling, consent, retention, and privacy rights aligned with the Kenya Data Protection Act, 2019.'
            : 'Terms and conditions governing use of the Exponential Media Africa website and services.'
        }
        path={isPrivacy ? '/privacy-policy' : '/terms'}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 space-y-8">
        <div>
          <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-3">
            <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
            <span>Governance &amp; Legal</span>
          </p>
          <h1 className="text-4xl font-display font-bold tracking-tight mb-4">
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h1>
          <p className="text-sm text-neutral-400">
            Organisation: {settings.companyName} · {settings.headquartersAddress}
          </p>
        </div>

        {isPrivacy ? (
          <div className="space-y-8 text-sm sm:text-base text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                1. Purpose &amp; Data Protection Principles
              </h2>
              <p>
                {settings.companyName} handles personal data submitted through this website with the Kenya Data Protection Act, 2019 in mind. We collect only the minimum information required to evaluate project inquiries or deliver requested dispatches.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                <li>
                  <strong>Project Inquiries:</strong> Full name, business email, company name, telephone number, industry, selected services, estimated budget, project timeline, and project brief.
                </li>
                <li>
                  <strong>Newsletter:</strong> Sign-up is currently disabled; this website is not accepting new mailing-list subscriptions.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                3. Restricted Access &amp; Security
              </h2>
              <p>
                Inquiry records are restricted to authorised administrators and are not available to public visitors. Inquiry submissions are validated by the server before storage. Newsletter enrollment is disabled.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                4. Retention, Unsubscribe &amp; Deletion Rights
              </h2>
              <p>
                Project inquiry data is retained only as long as reasonably necessary to respond to commercial proposals or maintain active client records (maximum default review cycle of 24 months for unactioned inquiries). For mailing-list removal requests, contact{' '}
                <a href={`mailto:${settings.email}`} className="text-[#FF1A1F] hover:text-white underline">
                  {settings.email}
                </a>{' '}
                (or calling {settings.primaryPhone}) to request access, correction, or erasure.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-8 text-sm sm:text-base text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                1. Website Scope
              </h2>
              <p>
                This website presents information regarding {settings.companyName} and its core marketing and creative services: Social Media Management, Content Creation &amp; Marketing, Influencer Marketing, Media Buy, Brand Activation &amp; Events, and Visual Design.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                2. Project Inquiries &amp; Proposals
              </h2>
              <p>
                Submitting a Smart Project Inquiry generates a reference code for tracking discussions with our Nairobi team. Submission does not constitute a binding commercial contract until a formal Statement of Work is executed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                3. Intellectual Property
              </h2>
              <p>
                All original copy, brand marks, visual assets, and case-study materials displayed on this site belong to {settings.companyName} or its respective authorised partners and may not be reproduced without written permission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                4. Google Maps Platform Integration
              </h2>
              <p>
                Our Contact page integrates interactive office location maps powered by Google Maps Platform. By using those map features, you agree to be bound by the{' '}
                <a
                  href="https://maps.google.com/help/terms_maps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF1A1F] underline hover:text-white"
                >
                  Google Maps / Google Earth Additional Terms of Service
                </a>{' '}
                and Google&apos;s Privacy Policy.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
