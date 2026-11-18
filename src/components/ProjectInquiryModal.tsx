import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ProjectInquiryForm } from './ProjectInquiryForm';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onNavigate: (path: string) => void;
}

export function ProjectInquiryModal({
  isOpen,
  onClose,
  preselectedService,
  onNavigate,
}: ProjectInquiryModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141418] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold text-[#FF1A1F] mb-1.5">
              <span className="w-4 h-0.5 bg-[#FF1A1F]" aria-hidden="true" />
              <span>Start a Project · Nairobi &amp; Beyond</span>
            </p>
            <h2
              id="inquiry-modal-title"
              className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white"
            >
              Tell us what we are building together.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry dialog"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-white/15 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ProjectInquiryForm
          preselectedService={preselectedService}
          onNavigate={(path) => {
            onClose();
            onNavigate(path);
          }}
        />
      </div>
    </div>
  );
}
