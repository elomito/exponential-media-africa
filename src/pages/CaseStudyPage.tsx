import React from 'react';
import { ArrowLeft, ArrowRight, Check, MapPin, Users } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { DIVISIONS, PROJECT_SUPPLEMENTAL_MEDIA } from '../data/seedData';

interface CaseStudyPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

export function CaseStudyPage({ slug, onNavigate, onOpenInquiry }: CaseStudyPageProps) {
  const { projects } = useCms();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center text-white">
        <SeoHead
          title="Case Study Not Found — Exponential Media Africa"
          description="The requested case study could not be found."
          path={`/work/${slug}`}
          noIndex
        />
        <h1 className="text-3xl font-display font-bold mb-4">Case Study Not Found</h1>
        <p className="text-sm text-neutral-400 mb-8">
          The requested portfolio entry could not be located or is currently unpublished.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/work')}
          className="px-5 py-2.5 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg"
        >
          Back to Our Work
        </button>
      </div>
    );
  }

  const division = DIVISIONS.find((d) => d.id === project.division);
  const supplemental = PROJECT_SUPPLEMENTAL_MEDIA[project.slug];

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title={`${project.title} — Exponential Media Africa`}
        description={project.summary}
        path={`/work/${project.slug}`}
        breadcrumbName={project.title}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <button
          type="button"
          onClick={() => onNavigate('/work')}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Our Work</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5 text-xs tracking-wide text-neutral-400 mb-5">
          <span className="text-[#FF1A1F] font-bold">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{division?.name}</span>
          <span aria-hidden="true">·</span>
          <span>{project.clientName}</span>
          {supplemental?.market && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-[#ED2126]" aria-hidden="true" />
                {supplemental.market}
              </span>
            </>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-[-0.045em] leading-[0.98] [text-wrap:balance] max-w-5xl mb-6">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl mb-10 sm:mb-14">
          {project.summary}
        </p>

        <figure className="relative overflow-hidden border-y border-white/10 mb-12 sm:mb-16 aspect-[4/3] sm:aspect-[2/1] lg:aspect-[2.4/1] bg-[#141418]">
          <OptimizedImage
            src={project.imageUrl}
            alt={project.title}
            width={1400}
            height={800}
            priority
            containerClassName="absolute inset-0 w-full h-full"
            className="w-full h-full object-cover object-center"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-t from-black/80 to-transparent text-[11px] sm:text-xs text-white/90">
            {project.category} <span aria-hidden="true">·</span> {project.clientName}
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 space-y-10">
            <section>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#FF3A3F] mb-3">01 / THE BRIEF</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white mb-4">
                The Brief &amp; Challenge
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">{project.challenge}</p>
            </section>
            <section>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#FF3A3F] mb-3">02 / OUR APPROACH</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white mb-4">
                The Exponential Approach
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">{project.solution}</p>
            </section>

            {supplemental && supplemental.gallery.length > 0 && (
              <section className="pt-4 space-y-4">
                <h2 className="text-xl font-display font-bold text-white">
                  Campaign Photography &amp; Execution Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {supplemental.gallery.map((photo) => (
                    <figure
                      key={photo.imageUrl}
                      className="bg-[#141418] border border-white/10 rounded-xl overflow-hidden flex flex-col"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <OptimizedImage
                          src={photo.imageUrl}
                          alt={photo.caption}
                          width={800}
                          height={500}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption className="px-4 py-3 text-xs text-neutral-300 leading-relaxed">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6">
            {supplemental?.creators && supplemental.creators.length > 0 && (
              <div className="p-6 bg-[#141418] border border-white/10 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
                  <span>Featured Campaign Creators</span>
                </h3>
                <ul className="space-y-2">
                  {supplemental.creators.map((creator) => (
                    <li key={creator} className="text-sm text-neutral-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ED2126]" aria-hidden="true" />
                      <span>{creator}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-6 bg-[#141418] border border-white/10 rounded-2xl">
              <h3 className="text-sm font-semibold text-white mb-4">Scope &amp; Deliverables</h3>
              <ul className="space-y-2.5">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-[#ED2126] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-[#141418] border border-white/10 rounded-2xl space-y-4">
              <h3 className="text-base font-display font-bold text-white">
                Need a similar mandate?
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Start a project inquiry pre-tagged with {project.category} capabilities.
              </p>
              <button
                type="button"
                onClick={() => onOpenInquiry(project.deliverables[0])}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors"
              >
                <span>Start Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
