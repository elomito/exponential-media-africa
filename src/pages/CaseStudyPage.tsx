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

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <button
          type="button"
          onClick={() => onNavigate('/work')}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Our Work</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 mb-4">
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

        <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance] mb-6">
          {project.title}
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl mb-10">
          {project.summary}
        </p>

        <div className="rounded-2xl overflow-hidden border border-white/10 mb-14 max-h-[540px]">
          <OptimizedImage
            src={project.imageUrl}
            alt={project.title}
            width={1400}
            height={800}
            priority
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <section>
              <h2 className="text-xl font-display font-bold text-white mb-3">
                The Brief &amp; Challenge
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">{project.challenge}</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-bold text-white mb-3">
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
