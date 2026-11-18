import React, {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { AuthProvider } from './context/AuthContext';
import { CmsProvider } from './context/CmsContext';
import { HomePage } from './pages/HomePage';

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const AdminPage = lazy(() =>
  import('./pages/AdminPage').then((m) => ({ default: m.AdminPage }))
);
const ArticlePage = lazy(() =>
  import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage }))
);
const CaseStudyPage = lazy(() =>
  import('./pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const EcosystemPage = lazy(() =>
  import('./pages/EcosystemPage').then((m) => ({ default: m.EcosystemPage }))
);
const InsightsPage = lazy(() =>
  import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage }))
);
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.LegalPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const TeamPage = lazy(() =>
  import('./pages/TeamPage').then((m) => ({ default: m.TeamPage }))
);
const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage }))
);

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
        <div className="min-h-screen bg-[#0B0B0D] text-white flex items-center justify-center px-4">
          <div className="max-w-lg w-full p-8 bg-[#141418] border border-white/15 border-t-4 border-t-[#ED2126] rounded-2xl space-y-4 text-center">
            <h1 className="text-2xl font-display font-bold">Something went wrong</h1>
            <p className="text-sm text-neutral-300 leading-relaxed">
              An unexpected display issue occurred. You can reload the page or contact us directly at{' '}
              <a href="mailto:info@exponentialmedia.africa" className="text-[#FF1A1F] underline font-semibold">
                info@exponentialmedia.africa
              </a>{' '}
              or +254 728 231 221.
            </p>
            <button
              type="button"
              onClick={() => window.location.assign('/')}
              className="px-5 py-2.5 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors"
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    const onGmpQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('gmp-quota-exceeded', onGmpQuotaExceeded);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('gmp-quota-exceeded', onGmpQuotaExceeded);
    };
  }, []);

  const openInquiry = (service?: string) => {
    setPreselectedService(service);
    setInquiryModalOpen(true);
  };

  const normalizedPath =
    currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

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
      return <ServicesPage onOpenInquiry={openInquiry} />;
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
    if (normalizedPath === '/team') {
      return <TeamPage onNavigate={navigate} onOpenInquiry={() => openInquiry()} />;
    }
    if (normalizedPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (normalizedPath === '/privacy-policy') {
      return <LegalPage mode="privacy" />;
    }
    if (normalizedPath === '/terms') {
      return <LegalPage mode="terms" />;
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
    <div className="min-h-screen flex flex-col bg-[#0B0B0D] text-[#F4F4F2]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 px-4 py-2 bg-[#ED2126] text-white font-semibold text-xs rounded-lg"
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

      <main id="main-content" className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center text-sm text-neutral-400">
              Loading page...
            </div>
          }
        >
          {renderPage()}
        </Suspense>
      </main>

      <Footer onNavigate={navigate} />

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
      <AuthProvider>
        <CmsProvider>
          <RouterShell />
        </CmsProvider>
      </AuthProvider>
    </AppErrorBoundary>
  );
}
