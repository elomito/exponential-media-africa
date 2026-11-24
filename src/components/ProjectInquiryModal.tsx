import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
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
  const { t } = useLanguage();

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
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#63060B]/80 backdrop-blur-sm overscroll-contain"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y bg-[#9E0E15] border border-white/25 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4 pb-4 mb-6">
          <div>
            <h2
              id="inquiry-modal-title"
              className="text-2xl sm:text-4xl font-display font-bold tracking-tight uppercase text-white"
            >
              {t.form.modalTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.form.closeDialog}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-white/25 text-white hover:bg-white/15 transition-colors shrink-0"
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
