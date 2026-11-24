import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { sanitizeMailtoHref, sanitizeTelHref } from '../lib/validation';

interface LegalPageProps {
  mode: 'privacy' | 'terms';
  onNavigate?: (path: string) => void;
}

export function LegalPage({ mode, onNavigate }: LegalPageProps) {
  const { settings } = useCms();
  const { t, language } = useLanguage();
  const isPrivacy = mode === 'privacy';
  const isSw = language === 'sw';

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!onNavigate) return;
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-[#B81118] text-white">
      <SeoHead
        title={isPrivacy ? t.seo.privacyTitle : t.seo.termsTitle}
        description={isPrivacy ? t.seo.privacyDescription : t.seo.termsDescription}
        path={isPrivacy ? '/privacy-policy' : '/terms'}
        breadcrumbName={isPrivacy ? t.legal.privacyTitle : t.legal.termsTitle}
      />

      <section className="bg-[#B81118] text-white py-16 md:py-24 border-b border-white/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <header className="space-y-6 border-b border-white/20 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
              <a
                href="/privacy-policy"
                onClick={(e) => handleLink(e, '/privacy-policy')}
                aria-current={isPrivacy ? 'page' : undefined}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isPrivacy
                    ? 'bg-white text-[#9E0E15] font-bold'
                    : 'border border-white/40 text-white hover:bg-white/15'
                }`}
              >
                {t.legal.privacyTitle}
              </a>
              <a
                href="/terms"
                onClick={(e) => handleLink(e, '/terms')}
                aria-current={!isPrivacy ? 'page' : undefined}
                className={`px-4 py-2 rounded-md transition-colors ${
                  !isPrivacy
                    ? 'bg-white text-[#9E0E15] font-bold'
                    : 'border border-white/40 text-white hover:bg-white/15'
                }`}
              >
                {t.legal.termsTitle}
              </a>
            </div>

            <div className="space-y-3">
              <h1 className="hero-slide-left text-4xl sm:text-5xl font-display font-bold tracking-tight uppercase text-white">
                {isPrivacy ? t.legal.privacyTitle : t.legal.termsTitle}
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {t.legal.organisationLabel}: {settings.companyName} · {settings.headquartersAddress}
              </p>
              <p className="text-sm font-semibold text-white/80">{t.legal.effectiveDateLabel}</p>
            </div>
          </header>

          {isPrivacy ? (
            isSw ? (
              <div className="space-y-10 text-base sm:text-lg text-white/90 leading-relaxed">
                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    1. Wigo, Msimamizi wa Data na Uzingatiaji wa Kisheria
                  </h2>
                  <p>
                    Sera hii ya Faragha inaeleza jinsi <strong>{settings.companyName}</strong>{' '}
                    (iliyopo {settings.headquartersAddress}) inavyokusanya, kutumia, kuhifadhi, na kulinda taarifa zako binafsi unapovinjari tovuti hii au kutuma maombi ya miradi ya kibiashara.
                  </p>
                  <p>
                    Tunazingatia kikamilifu matakwa ya <strong>Sheria ya Ulinzi wa Data ya Kenya, 2019</strong> (Kenya Data Protection Act, 2019) na kanuni zinazosimamiwa na Ofisi ya Kamishna wa Ulinzi wa Data (ODPC) katika shughuli zetu kote Kenya, Uganda, Rwanda, Jamhuri ya Kidemokrasia ya Kongo, na Zambia.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    2. Taarifa Binafsi na za Kibiashara Tunazokusanya
                  </h2>
                  <p>Tunakusanya taarifa chache tu zinazohitajika ili kutathmini na kujibu mahitaji yako:</p>
                  <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                    <li>
                      <strong>Fomu ya Maombi ya Mradi:</strong> Jina kamili, barua pepe ya kazi, jina la kampuni au shirika, namba ya simu, sekta ya biashara, huduma unazohitaji (kama Usimamizi wa Mitandao ya Kijamii, Uundaji wa Maudhui na Masoko, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira), makadirio ya bajeti, muda wa mradi, na maelezo ya malengo yako.
                    </li>
                    <li>
                      <strong>Kumbukumbu za Maombi na Ulinzi wa Kiufundi:</strong> Tunazalisha namba ya kumbukumbu ya mradi (mfano <span className="font-display font-semibold tabular-nums">EMA-XXXX</span>) na funguo za kuzuia utumaji wa fomu mara mbili kimakosa, pamoja na ukaguzi wa kuzuia ujumbe taka (anti-spam) upande wa seva.
                    </li>
                    <li>
                      <strong>Mawasiliano ya Moja kwa Moja:</strong> Taarifa unazoshiriki kwa hiari unapotupigia simu ({settings.primaryPhone}), kutuandikia barua pepe ({settings.email}), au kuwasiliana nasi kupitia WhatsApp.
                    </li>
                    <li>
                      <strong>Jarida la Barua Pepe (Newsletter):</strong> Usajili wa jarida jipya la barua pepe umezimwa kwa sasa kwenye tovuti hii; hatukusanyi anwani za barua pepe kwa orodha za matangazo ya wingi kupitia tovuti.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    3. Misingi ya Kisheria na Matumizi ya Taarifa
                  </h2>
                  <p>Tunachakata taarifa zako kwa misingi halali ifuatayo:</p>
                  <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                    <li>
                      <strong>Idhini Yako ya Wazi:</strong> Kabla ya kutuma fomu ya mradi, unathibitisha idhini yako ya kuchakata maelezo uliyotoa chini ya Sera hii.
                    </li>
                    <li>
                      <strong>Hatua za Awali za Mkataba:</strong> Kuchambua maombi yako, kuandaa mapendekezo ya ubunifu na bajeti, na kupanga mikutano ya mashauriano ya kibiashara.
                    </li>
                    <li>
                      <strong>Usalama na Uendeshaji wa Mfumo:</strong> Kudhibiti matumizi mabaya, kulinda uadilifu wa tovuti, na kuhakikisha utendaji salama wa miundombinu yetu.
                    </li>
                    <li>
                      <strong>Wajibu wa Kisheria:</strong> Kutimiza matakwa ya kisheria, kodi, na ukaguzi chini ya sheria za Jamhuri ya Kenya pale ushirikiano rasmi unapoanza.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    4. Udhibiti wa Ufikiaji na Usalama wa Data
                  </h2>
                  <p>
                    Kila ombi linalotumwa kupitia fomu hukaguliwa kwanza na mfumo wa seva ili kuhakikisha usalama kabla ya kuhifadhiwa. Kumbukumbu za maombi ya wateja zinazuiliwa kwa wasimamizi walioidhinishwa pekee wenye uthibitisho thabiti wa kiusalama na hazipatikani kwa umma.
                  </p>
                  <p>
                    Hatuuzi, hatukodishi, na hatugawi taarifa zako binafsi kwa wauzaji wa data au watu wengine kwa madhumuni yao ya uuzaji.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    5. Huduma za Wabia wa Nje na Muunganiko wa Tovuti
                  </h2>
                  <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                    <li>
                      <strong>Hifadhi ya Wingu na Usimamizi:</strong> Tovuti na kumbukumbu zilizoidhinishwa zinatumia miundombinu salama ya wingu yenye usimbaji fiche wa mawasiliano (HTTPS/TLS) na udhibiti madhubuti wa ufikiaji.
                    </li>
                    <li>
                      <strong>Google Maps Platform:</strong> Ukurasa wetu wa Wasiliana Nasi unatumia ramani shirikishi ya Google Maps kuonyesha ofisi yetu ya Kilimani. Matumizi ya ramani hiyo yanazingatia{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold underline underline-offset-4 hover:opacity-80"
                      >
                        Sera ya Faragha ya Google
                      </a>
                      .
                    </li>
                    <li>
                      <strong>Viungo vya Nje (WhatsApp):</strong> Kubofya kitufe cha WhatsApp kunakuunganisha na jukwaa la WhatsApp chini ya sera za faragha za mtoa huduma huyo.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    6. Uratibu wa Kampeni za Kikanda (Mipakani)
                  </h2>
                  <p>
                    Pale mradi wako unapohusisha utekelezaji katika masoko yetu ya kikanda (Uganda, Rwanda, DRC, au Zambia), taarifa husika za mradi zinaweza kufikiwa na timu au waratibu wetu waliothibitishwa katika eneo husika kwa kiwango kinachohitajika tu kutekeleza kampeni, chini ya masharti madhubuti ya usiri.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    7. Muda wa Uhifadhi na Ufutaji wa Kumbukumbu
                  </h2>
                  <p>
                    Tunahifadhi taarifa za maombi ya miradi kwa muda unaohitajika kibiashara pekee ili kujibu mapendekezo au kudumisha ushirikiano hai wa mteja. Maombi ambayo hayajaanzishiwa mkataba hupitiwa kila baada ya <strong>miezi 24</strong> kwa ajili ya ufutaji salama au kuondolewa utambulisho, isipokuwa kama sheria ya Kenya inahitaji uhifadhi wa muda mrefu zaidi kwa nyaraka za kibiashara.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    8. Haki Zako Chini ya Sheria ya Ulinzi wa Data
                  </h2>
                  <p>Kama mhusika wa data chini ya Sheria ya Ulinzi wa Data ya Kenya, 2019, una haki zifuatazo:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>Kuomba nakala ya taarifa binafsi tunazoshikilia kukuhusu (Haki ya Ufikiaji).</li>
                    <li>Kuomba marekebisho ya taarifa zisizo sahihi au zisizo kamili (Haki ya Marekebisho).</li>
                    <li>Kuomba kufutwa kwa data yako pale ambapo haihitajiki tena kwa madhumuni iliyokusanywa (Haki ya Kufutwa).</li>
                    <li>Kupinga au kuzuia uchakataji wa taarifa zako, na kuondoa idhini wakati wowote.</li>
                    <li>Kuwasilisha malalamiko kwa Ofisi ya Kamishna wa Ulinzi wa Data (ODPC) iwapo unaona haki zako zimekiukwa.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    9. Mabadiliko ya Sera na Mawasiliano ya Faragha
                  </h2>
                  <p>
                    Tunaweza kusasisha Sera hii mara kwa mara ili kuakisi maboresho ya kisheria au kiutendaji. Kwa maombi yoyote ya ufikiaji, marekebisho, au ufutaji wa data, wasiliana na Dawati letu la Ulinzi wa Data kupitia{' '}
                    <a href={sanitizeMailtoHref(settings.email)} className="text-white font-semibold underline underline-offset-4 hover:opacity-80">
                      {settings.email}
                    </a>{' '}
                    au piga simu{' '}
                    <a href={sanitizeTelHref(settings.primaryPhone)} className="text-white font-semibold hover:opacity-80">
                      {settings.primaryPhone}
                    </a>
                    {settings.secondaryPhone ? ` / ${settings.secondaryPhone}` : ''}.
                  </p>
                </section>
              </div>
            ) : (
              <div className="space-y-10 text-base sm:text-lg text-white/90 leading-relaxed">
                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    1. Scope, Data Controller &amp; Legal Compliance
                  </h2>
                  <p>
                    This Privacy Policy explains how <strong>{settings.companyName}</strong>, headquartered at {settings.headquartersAddress}, collects, uses, stores, safeguards, and disposes of personal and business information submitted through this website or direct agency channels.
                  </p>
                  <p>
                    We handle personal data in alignment with the <strong>Kenya Data Protection Act, 2019</strong> and regulatory guidance issued by the Office of the Data Protection Commissioner (ODPC) across our operations in Kenya, Uganda, Rwanda, the Democratic Republic of Congo, and Zambia.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    2. Information We Collect
                  </h2>
                  <p>We apply strict data minimisation and collect only what is reasonably required to evaluate and respond to client briefs:</p>
                  <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                    <li>
                      <strong>Smart Project Inquiry Submissions:</strong> Full name, business email address, company or organisation name, telephone number, industry sector, selected core services (Social Media Management, Content Creation &amp; Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design), estimated budget tier, target timeline, and project brief details.
                    </li>
                    <li>
                      <strong>Inquiry Reference &amp; Submission Integrity Metadata:</strong> System-generated reference identifiers (such as <span className="font-display font-semibold tabular-nums">EMA-XXXX</span>), idempotency keys preventing accidental duplicate submissions, and server-side anti-spam verification tokens.
                    </li>
                    <li>
                      <strong>Direct Communications:</strong> Contact details and correspondence you voluntarily share when reaching us by email ({settings.email}), telephone ({settings.primaryPhone}), or WhatsApp.
                    </li>
                    <li>
                      <strong>Newsletter Subscriptions:</strong> Mailing-list sign-up is currently disabled on this website; no bulk marketing subscription addresses are collected through this portal.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    3. Lawful Basis &amp; Purpose of Processing
                  </h2>
                  <p>We process your information only where a clear lawful basis exists under Kenyan data protection law:</p>
                  <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                    <li>
                      <strong>Explicit Consent:</strong> Confirming your agreement to our Privacy Policy prior to submitting a Smart Project Inquiry.
                    </li>
                    <li>
                      <strong>Pre-Contractual Steps &amp; Client Delivery:</strong> Evaluating project scopes, preparing commercial proposals, coordinating discovery calls, and administering active marketing engagements.
                    </li>
                    <li>
                      <strong>Legitimate Business &amp; Security Interests:</strong> Protecting the website against automated abuse, spam submissions, and unauthorised system access.
                    </li>
                    <li>
                      <strong>Legal &amp; Statutory Obligations:</strong> Complying with applicable tax, accounting, and statutory record-keeping duties under the Laws of Kenya once an engagement becomes contractual.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    4. Security Controls &amp; Restricted Access
                  </h2>
                  <p>
                    Every project inquiry submission undergoes strict server-side schema validation and sanitisation before persistence. Recorded inquiries are stored within access-controlled administration systems restricted strictly to authorised {settings.companyName} staff protected by role-based access rules and multi-factor authentication. Inquiry records are never exposed to public website visitors.
                  </p>
                  <p>
                    We never sell, rent, or trade your personal or organisational data to third-party brokers or unrelated advertisers.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    5. Third-Party Services &amp; Platform Integrations
                  </h2>
                  <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                    <li>
                      <strong>Cloud Infrastructure &amp; Hosting:</strong> Website assets and authorised administrative records operate over encrypted HTTPS/TLS connections using vetted cloud infrastructure providers subject to strict confidentiality obligations.
                    </li>
                    <li>
                      <strong>Google Maps Platform:</strong> Our Contact page integrates interactive office mapping powered by Google Maps Platform. Use of those map features is governed by the{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold underline underline-offset-4 hover:opacity-80"
                      >
                        Google Privacy Policy
                      </a>{' '}
                      and Google Maps / Google Earth Additional Terms of Service.
                    </li>
                    <li>
                      <strong>External Messaging Links:</strong> Selecting our official WhatsApp contact links opens an external session subject to WhatsApp&apos;s privacy terms.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    6. Cross-Border Campaign Coordination
                  </h2>
                  <p>
                    When your brief requires execution across East, Central, or Southern Africa (Uganda, Rwanda, DRC, or Zambia), relevant project parameters may be shared strictly on a need-to-know basis with vetted regional production leads or partner coordinators bound by confidentiality and comparable data protection safeguards.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    7. Data Retention &amp; Secure Disposal
                  </h2>
                  <p>
                    Project inquiry records are retained only for as long as reasonably necessary to respond to commercial proposals or service ongoing client relationships. Unactioned inquiry submissions are subject to a maximum default review cycle of <strong>24 months</strong>, after which they are securely deleted or anonymised unless longer statutory retention applies to executed commercial contracts.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    8. Your Rights as a Data Subject
                  </h2>
                  <p>Under the Kenya Data Protection Act, 2019, you have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>Request access to and confirmation of the personal data we hold about you.</li>
                    <li>Request rectification or updating of inaccurate, outdated, or incomplete records.</li>
                    <li>Request erasure of personal data where retention is no longer necessary or lawful.</li>
                    <li>Object to or restrict processing of your information and withdraw consent at any time.</li>
                    <li>Request data portability in a structured electronic format where applicable.</li>
                    <li>Lodge a complaint with the Office of the Data Protection Commissioner (ODPC) in Kenya if you believe your privacy rights have been infringed.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                    9. Policy Updates &amp; Privacy Contact
                  </h2>
                  <p>
                    We may update this Privacy Policy periodically to reflect operational, technical, or regulatory changes. To exercise any data subject right or raise a privacy question, contact our Data &amp; Legal Desk at{' '}
                    <a href={sanitizeMailtoHref(settings.email)} className="text-white font-semibold underline underline-offset-4 hover:opacity-80">
                      {settings.email}
                    </a>{' '}
                    or telephone{' '}
                    <a href={sanitizeTelHref(settings.primaryPhone)} className="text-white font-semibold hover:opacity-80">
                      {settings.primaryPhone}
                    </a>
                    {settings.secondaryPhone ? ` / ${settings.secondaryPhone}` : ''}.
                  </p>
                </section>
              </div>
            )
          ) : isSw ? (
            <div className="space-y-10 text-base sm:text-lg text-white/90 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  1. Kukubali Masharti na Wigo wa Tovuti
                </h2>
                <p>
                  Kwa kufikia au kutumia tovuti hii ya <strong>{settings.companyName}</strong>, unakubali kufungwa na Vigezo na Masharti haya pamoja na{' '}
                  <a
                    href="/privacy-policy"
                    onClick={(e) => handleLink(e, '/privacy-policy')}
                    className="text-white font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    Sera yetu ya Faragha
                  </a>
                  . Ikiwa hukubaliani na kipengele chochote, tafadhali usiendelee kutumia tovuti hii.
                </p>
                <p>
                  Tovuti hii inawasilisha taarifa za kibiashara kuhusu huduma sita mahususi za shirika letu: Usimamizi wa Mitandao ya Kijamii, Uundaji wa Maudhui na Masoko, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira kote Kenya, Uganda, Rwanda, Jamhuri ya Kidemokrasia ya Kongo, na Zambia.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  2. Maombi ya Miradi, Mapendekezo na Mikataba
                </h2>
                <p>
                  Kutuma maelezo ya mradi kupitia fomu yetu ya mtandaoni hutengeneza namba ya kumbukumbu kwa ajili ya ufuatiliaji wa mazungumzo na timu yetu ya Nairobi.
                </p>
                <p>
                  Kuwasilisha ombi la mradi au kupokea makadirio ya awali <strong>hakutengenezi mkataba wa kisheria</strong>. Kazi zote za kibiashara, ratiba za utekelezaji, gharama, na masharti ya malipo huthibitishwa rasmi pale tu Mkataba wa Huduma (Master Services Agreement au Statement of Work) unaposainiwa na pande zote mbili.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  3. Wajibu wa Mteja na Usahihi wa Taarifa
                </h2>
                <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                  <li>
                    Unathibitisha kuwa taarifa zote unazotoa katika fomu za maombi ya miradi ni za kweli, sahihi, na zina idhini ya kampuni au shirika unalowakilisha.
                  </li>
                  <li>
                    Katika miradi iliyoidhinishwa, wateja wanawajibika kuhakikisha nyenzo, nembo, bidhaa, au madai yoyote ya kibiashara wanayotupatia hayakiuki haki miliki za mtu mwingine wala sheria za matangazo za nchi husika.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  4. Haki Miliki (Intellectual Property) na Jalada la Kazi
                </h2>
                <p>
                  Maandishi, mifumo ya ubunifu, msimbo wa tovuti, nembo za {settings.companyName}, na mifano ya kazi iliyochapishwa kwenye tovuti hii ni mali halali ya {settings.companyName} au wabia na wateja wake walioidhinishwa. Hairuhusiwi kunakili, kusambaza, au kutumia kibiashara maudhui ya tovuti hii bila ruhusa ya maandishi.
                </p>
                <p>
                  Kwa miradi ya wateja, umiliki au leseni ya kazi za mwisho zilizoidhinishwa huhamishiwa kwa mteja baada ya malipo kamili kukamilika kulingana na mkataba husika, huku shirika likihifadhi haki ya kuonyesha kazi zisizo za siri katika jalada lake rasmi isipokuwa kama makubaliano ya usiri (NDA) yanazuia.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  5. Washawishi, Ununuzi wa Matangazo na Matukio ya Chapa
                </h2>
                <p>
                  Kampeni za Masoko Kupitia Washawishi na Ununuzi wa Nafasi za Matangazo zinazingatia kanuni za majukwaa ya Meta, TikTok, Google, na YouTube pamoja na makubaliano ya muda wa matumizi ya maudhui ya washawishi. Utekelezaji wa matukio ya Uhamasishaji wa Chapa madukani na mitaani unategemea vibali vya kumbi na mamlaka za mitaa kama itakavyokubaliwa katika pendekezo la mradi.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  6. Matumizi Sahihi na Ulinzi wa Mfumo
                </h2>
                <p>
                  Hairuhusiwi kutumia zana za kiotomatiki kukwangua data (scraping), kutuma ujumbe taka kupitia fomu, kujaribu kukwepa ulinzi wa kiufundi, au kujaribu kuingia kwenye mfumo wa usimamizi (<span className="font-display font-semibold tabular-nums">/admin</span>) bila kibali rasmi.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  7. Muunganiko wa Google Maps Platform na Huduma za Nje
                </h2>
                <p>
                  Ukurasa wetu wa Wasiliana Nasi unajumuisha ramani shirikishi zinazoendeshwa na Google Maps Platform. Kwa kutumia ramani hizo, unakubali kufungwa na{' '}
                  <a
                    href="https://maps.google.com/help/terms_maps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    Masharti ya Ziada ya Google Maps / Google Earth
                  </a>{' '}
                  pamoja na Sera ya Faragha ya Google. Hatudhibiti wala hatuwajibikii maudhui ya tovuti za nje zilizounganishwa.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  8. Kanusho, Ukomo wa Uwajibikaji na Majanga Yasiyotarajiwa
                </h2>
                <p>
                  Taarifa zote za miradi na uchambuzi wa soko kwenye tovuti hii hutolewa kwa madhumuni ya taarifa na mifano ya kazi zetu; hazitoi dhamana ya matokeo mahususi ya kifedha bila tathmini rasmi ya mradi. Kwa kiwango kinachoruhusiwa na sheria za Kenya, {settings.companyName} haitawajibika kwa hasara zisizo za moja kwa moja zinazotokana na matumizi ya tovuti hii, hitilafu za mtandao za majukwaa ya nje, au matukio ya dharura yaliyo nje ya uwezo wa kibinadamu (Force Majeure).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  9. Sheria Inayosimamia, Utatuzi wa Migogoro na Mawasiliano
                </h2>
                <p>
                  Vigezo na Masharti haya yatasimamiwa na kutafsiriwa kwa mujibu wa <strong>Sheria za Jamhuri ya Kenya</strong>. Mgogoro wowote utashughulikiwa kwanza kwa majadiliano ya nia njema ndani ya siku 14, na iwapo hautatatuliwa, utapelekwa katika mahakama zenye mamlaka jijini Nairobi, Kenya.
                </p>
                <p>
                  Kwa maswali kuhusu masharti haya, tuandikie kupitia{' '}
                  <a href={sanitizeMailtoHref(settings.email)} className="text-white font-semibold underline underline-offset-4 hover:opacity-80">
                    {settings.email}
                  </a>{' '}
                  au tupigie{' '}
                  <a href={sanitizeTelHref(settings.primaryPhone)} className="text-white font-semibold hover:opacity-80">
                    {settings.primaryPhone}
                  </a>
                  .
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-10 text-base sm:text-lg text-white/90 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  1. Acceptance &amp; Scope of Website
                </h2>
                <p>
                  By accessing or using this website operated by <strong>{settings.companyName}</strong> ({settings.headquartersAddress}), you agree to be bound by these Terms &amp; Conditions and our{' '}
                  <a
                    href="/privacy-policy"
                    onClick={(e) => handleLink(e, '/privacy-policy')}
                    className="text-white font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    Privacy Policy
                  </a>
                  . If you do not agree with any provision stated here, please discontinue use of the site.
                </p>
                <p>
                  This website presents official capabilities, case studies, and editorial perspectives regarding our six core services: Social Media Management, Content Creation &amp; Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design across Kenya, Uganda, Rwanda, the Democratic Republic of Congo, and Zambia.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  2. Project Inquiries, Proposals &amp; Commercial Engagements
                </h2>
                <p>
                  Submitting a Smart Project Inquiry generates a reference identifier (<span className="font-display font-semibold tabular-nums">EMA-XXXX</span>) so our Nairobi strategy desk can review and respond to your brief.
                </p>
                <p>
                  Neither submitting an inquiry nor receiving an indicative proposal or budget estimate creates a binding commercial contract. All agency deliverables, production schedules, creator commitments, media budgets, and payment milestones become legally binding only upon mutual execution of a formal Statement of Work or Master Services Agreement.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  3. Client Responsibilities &amp; Brief Accuracy
                </h2>
                <ul className="list-disc pl-6 space-y-2.5 text-white/90">
                  <li>
                    You warrant that information provided through our inquiry forms is accurate, submitted in good faith, and authorised by the organisation you represent.
                  </li>
                  <li>
                    For commissioned engagements, clients remain responsible for ensuring all brand trademarks, product claims, licensed photography, and regulatory clearances supplied to {settings.companyName} comply with applicable laws in the target market(s).
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  4. Intellectual Property &amp; Portfolio Rights
                </h2>
                <p>
                  All original editorial copy, software architecture, agency trademarks, case-study summaries, and visual assets published on this website belong to {settings.companyName} or its respective authorised partners and clients. No material may be copied, republished, framed, or exploited commercially without prior written consent.
                </p>
                <p>
                  For client engagements, ownership or usage licensing of bespoke final deliverables passes to the client upon full settlement of agreed fees as specified in the governing contract. Unless restricted by an executed non-disclosure agreement (NDA), {settings.companyName} retains the right to display non-confidential completed work within its official agency portfolio.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  5. Influencer Campaigns, Paid Media &amp; Brand Activations
                </h2>
                <p>
                  Influencer Marketing and Media Buying campaigns remain subject to the advertising policies, moderation rules, and technical availability of third-party social networks including Meta (Instagram and Facebook), TikTok, Google Ads, and YouTube, as well as agreed creator usage-rights windows. On-ground Brand Activation programs are delivered subject to venue approvals, mall regulations, and municipal permits agreed in the project scope.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  6. Acceptable Use &amp; Platform Security
                </h2>
                <p>
                  You agree not to scrape website content automatically, submit deceptive or automated spam inquiries, bypass rate-limiting safeguards, probe system vulnerabilities, or attempt unauthorised access to restricted administrative endpoints (<span className="font-display font-semibold tabular-nums">/admin</span>).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  7. Google Maps Platform &amp; Third-Party Links
                </h2>
                <p>
                  Our Contact page integrates interactive office location maps powered by Google Maps Platform. By using those map features, you agree to be bound by the{' '}
                  <a
                    href="https://maps.google.com/help/terms_maps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    Google Maps / Google Earth Additional Terms of Service
                  </a>{' '}
                  and Google&apos;s Privacy Policy. External links such as WhatsApp are provided solely for convenience and remain governed by their respective providers&apos; terms.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  8. Disclaimers, Limitation of Liability &amp; Force Majeure
                </h2>
                <p>
                  This website is provided on an &ldquo;as is&rdquo; informational basis. While we maintain accuracy across portfolio showcases and research briefs, past campaign outcomes do not constitute an unconditional guarantee of future commercial performance without a scoped strategy engagement.
                </p>
                <p>
                  To the fullest extent permitted under Kenyan law, {settings.companyName} shall not be liable for indirect, incidental, or consequential damages arising from temporary website downtime, third-party ad-platform outages, or events beyond reasonable agency control (Force Majeure).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  9. Governing Law, Dispute Resolution &amp; Contact
                </h2>
                <p>
                  These Terms &amp; Conditions are governed by and construed in accordance with the <strong>Laws of the Republic of Kenya</strong>. Any dispute arising out of website use or pre-contractual communications shall first be addressed through good-faith negotiation for 14 days, failing which the courts of competent jurisdiction in Nairobi, Kenya shall have exclusive jurisdiction.
                </p>
                <p>
                  Questions regarding these Terms may be directed to{' '}
                  <a href={sanitizeMailtoHref(settings.email)} className="text-white font-semibold underline underline-offset-4 hover:opacity-80">
                    {settings.email}
                  </a>{' '}
                  or by telephone on{' '}
                  <a href={sanitizeTelHref(settings.primaryPhone)} className="text-white font-semibold hover:opacity-80">
                    {settings.primaryPhone}
                  </a>
                  .
                </p>
              </section>
            </div>
          )}

          <footer className="border-t border-white/20 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">{t.legal.contactLegalLabel}</div>
              <div className="text-sm text-white/85">
                {settings.email} · {settings.primaryPhone}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={isPrivacy ? '/terms' : '/privacy-policy'}
                onClick={(e) => handleLink(e, isPrivacy ? '/terms' : '/privacy-policy')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold border border-white/50 text-white hover:bg-white/15 rounded-md transition-colors"
              >
                <span>{isPrivacy ? t.legal.switchToTerms : t.legal.switchToPrivacy}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                onClick={(e) => handleLink(e, '/contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-white text-[#9E0E15] hover:bg-white/90 rounded-md transition-colors"
              >
                <span>{t.nav.contact}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
