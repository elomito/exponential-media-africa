import React, {
  Component,
  type ErrorInfo,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CursorDot } from './components/CursorDot';
import { FloatingActionDock } from './components/FloatingActionDock';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { preloadAssetImages } from './components/OptimizedImage';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { AuthProvider } from './context/AuthContext';
import { CmsProvider } from './context/CmsContext';
import { LanguageProvider } from './context/LanguageContext';
import { EXECUTIVE_DIRECTOR_PORTRAIT, PAGE_HERO_IMAGES } from './data/pageHeroes';
import { ORDERED_SERVICE_DETAILS } from './data/serviceDetails';
import { normalizeRoutePath } from './lib/routing';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { ArticlePage } from './pages/ArticlePage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ContactPage } from './pages/ContactPage';
import { EcosystemPage } from './pages/EcosystemPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { InsightsPage } from './pages/InsightsPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { WorkPage } from './pages/WorkPage';

interface ErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application boundary caught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#B81118] text-white flex items-center justify-center px-4">
          <div className="max-w-lg w-full py-8 space-y-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Something went wrong</h1>
            <p className="text-sm text-white/90 leading-relaxed">
              An unexpected display issue occurred. You can reload the page or contact us directly at{' '}
              <a href="mailto:info@exponentialmedia.africa" className="text-white font-semibold hover:opacity-80">
                info@exponentialmedia.africa
              </a>{' '}
              or +254 728 231 221.
            </p>
            <button
              type="button"
              onClick={() => window.location.assign('/')}
              className="px-5 py-2.5 text-sm font-semibold bg-white hover:bg-white/90 text-[#9E0E15] rounded-lg transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RouterShell() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);

  const navigate = useCallback((to: string) => {
    const [pathname, hash] = to.split('#');
    const targetPath = pathname || '/';
    if (window.location.pathname !== targetPath || window.location.hash !== (hash ? `#${hash}` : '')) {
      window.history.pushState({}, '', to);
    }
    setCurrentPath(targetPath);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      preloadAssetImages([...Object.values(PAGE_HERO_IMAGES), EXECUTIVE_DIRECTOR_PORTRAIT]);
    }, 60);
    const servicePreloadTimer = window.setTimeout(() => {
      preloadAssetImages(ORDERED_SERVICE_DETAILS.map((s) => s.heroImageUrl));
    }, 450);
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    const onGmpQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('gmp-quota-exceeded', onGmpQuotaExceeded);
    return () => {
      window.clearTimeout(preloadTimer);
      window.clearTimeout(servicePreloadTimer);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('gmp-quota-exceeded', onGmpQuotaExceeded);
    };
  }, []);

  const openInquiry = (service?: string) => {
    setPreselectedService(service);
    setInquiryModalOpen(true);
  };

  const normalizedPath = normalizeRoutePath(currentPath);

  const renderPage = () => {
    if (normalizedPath === '/' || normalizedPath === '') {
      return <HomePage onNavigate={navigate} onOpenInquiry={openInquiry} />;
    }
    if (normalizedPath === '/about') {
      return <AboutPage onNavigate={navigate} onOpenInquiry={() => openInquiry()} />;
    }
    if (normalizedPath === '/ecosystem') {
      return <EcosystemPage onNavigate={navigate} onOpenInquiry={openInquiry} />;
    }
    if (normalizedPath === '/services') {
      return <ServicesPage onNavigate={navigate} onOpenInquiry={openInquiry} />;
    }
    if (normalizedPath.startsWith('/services/')) {
      const slug = normalizedPath.replace('/services/', '').replace(/\/$/, '');
      if (slug) {
        return (
          <ServiceDetailPage
            slug={slug}
            onNavigate={navigate}
            onOpenInquiry={openInquiry}
          />
        );
      }
    }
    if (normalizedPath === '/work') {
      return <WorkPage onNavigate={navigate} onOpenInquiry={() => openInquiry()} />;
    }
    if (normalizedPath.startsWith('/work/')) {
      const slug = normalizedPath.replace('/work/', '').replace(/\/$/, '');
      if (slug) {
        return (
          <CaseStudyPage
            slug={slug}
            onNavigate={navigate}
            onOpenInquiry={openInquiry}
          />
        );
      }
    }
    if (normalizedPath === '/insights') {
      return <InsightsPage onNavigate={navigate} />;
    }
    if (normalizedPath.startsWith('/insights/')) {
      const slug = normalizedPath.replace('/insights/', '').replace(/\/$/, '');
      if (slug) {
        return <ArticlePage slug={slug} onNavigate={navigate} />;
      }
    }
    if (normalizedPath === '/faq') {
      return <FaqPage onNavigate={navigate} onOpenInquiry={() => openInquiry()} />;
    }
    if (normalizedPath === '/team') {
      return <TeamPage onNavigate={navigate} onOpenInquiry={() => openInquiry()} />;
    }
    if (normalizedPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (normalizedPath === '/privacy-policy') {
      return <LegalPage mode="privacy" onNavigate={navigate} />;
    }
    if (normalizedPath === '/terms') {
      return <LegalPage mode="terms" onNavigate={navigate} />;
    }
    if (normalizedPath === '/admin') {
      return <AdminPage />;
    }

    return (
      <NotFoundPage
        path={normalizedPath}
        onNavigate={navigate}
        onOpenInquiry={() => openInquiry()}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#B81118] text-white overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 px-4 py-2 bg-white text-[#9E0E15] font-semibold text-xs rounded-lg"
      >
        Skip to main content
      </a>

      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Interactive map display is temporarily limited. Visit{' '}
            <a
              href="https://www.google.com/maps/search/?api=1&query=A3-10%20Casamia%2C%20Ngong%20Road%2C%20Kilimani%2C%20Nairobi%2C%20Kenya"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              A3-10 Casamia, Ngong Road, Kilimani on Google Maps
            </a>
            .
          </span>
        </div>
      )}

      <Navbar
        currentPath={normalizedPath}
        onNavigate={navigate}
        onOpenInquiry={openInquiry}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <div key={normalizedPath} className="route-enter">
          {renderPage()}
        </div>
      </main>

      <Footer onNavigate={navigate} />

      {normalizedPath !== '/admin' && <FloatingActionDock />}
      <CursorDot />

      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        preselectedService={preselectedService}
        onNavigate={navigate}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <CmsProvider>
            <RouterShell />
          </CmsProvider>
        </AuthProvider>
      </LanguageProvider>
    </AppErrorBoundary>
  );
}
