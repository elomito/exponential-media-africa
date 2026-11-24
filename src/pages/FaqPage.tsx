import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategoryId } from '../data/faqData';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';

interface FaqPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export function FaqPage({ onNavigate, onOpenInquiry }: FaqPageProps) {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>('all');
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].id]);

  const isSw = language === 'sw';

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <SeoHead
        title={t.seo.faqTitle}
        description={t.seo.faqDescription}
        path="/faq"
        imageUrl={PAGE_HERO_IMAGES.services}
        imageAlt="Exponential Marketing Agency frequently asked questions"
        schemaType="FAQPage"
        breadcrumbName={t.footer.exploreLinks.faq}
        faqItems={FAQ_ITEMS.map((item) => ({
          question: isSw ? item.questionSw : item.questionEn,
          answer: isSw ? item.answerSw : item.answerEn,
        }))}
      />

      <section className="relative min-h-[min(580px,calc(100svh-4.5rem))] flex items-end bg-[#9E0E15] overflow-hidden border-b border-white/15">
        <HeroBackdrop
          imageUrl={PAGE_HERO_IMAGES.services}
          alt="Exponential Marketing Agency Nairobi strategy and FAQ"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-24">
          <h1 className="hero-slide-left text-[2.65rem] sm:text-6xl lg:text-[5.25rem] font-display font-bold tracking-[-0.04em] leading-[0.98] text-white max-w-5xl [text-wrap:balance] mb-6 sm:mb-7">
            {t.faq.heroTitle}
          </h1>
          <p className="hero-slide-down-delay-1 text-base sm:text-lg text-white leading-relaxed max-w-2xl">
            {t.faq.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <Reveal variant="slide-left">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.faq.questionsHeading}
              </h2>
            </Reveal>

            <div
              role="group"
              aria-label={t.faq.questionsHeading}
              className="flex flex-wrap items-center gap-5"
            >
              {FAQ_CATEGORIES.map((category) => {
                const selected = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-1 text-sm sm:text-base transition-colors whitespace-nowrap ${
                      selected
                        ? 'text-white font-bold'
                        : 'text-white/75 hover:text-white font-medium'
                    }`}
                  >
                    {isSw ? category.labelSw : category.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          <div key={activeCategory} className="route-enter space-y-8">
            {filteredFaqs.map((item, idx) => {
              const isOpen = openIds.includes(item.id);
              const question = isSw ? item.questionSw : item.questionEn;
              const answer = isSw ? item.answerSw : item.answerEn;
              const panelId = `faq-panel-${item.id}`;

              return (
                <Reveal
                  key={item.id}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 45}
                >
                  <article className="space-y-3">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-start justify-between gap-4 text-left group py-2"
                    >
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-white/85 transition-colors leading-snug">
                        {question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-white shrink-0 mt-1 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div id={panelId} className="route-enter pr-6">
                        <p className="text-base sm:text-lg text-white/95 leading-relaxed">
                          {answer}
                        </p>
                      </div>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Reveal variant="slide-left" className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
              {t.home.sixCoreServicesHeading}
            </h2>
            <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
              {t.footer.focusBody}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={80}>
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.faq.exploreServices}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-20 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal variant="slide-left" className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
              {t.faq.stillHaveQuestions}
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.faq.stillHaveQuestionsBody}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={80}>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>{t.faq.askOurTeam}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
