import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';
import { shouldDismissDrawerOnSwipeUp } from '../lib/motion';
import { CORE_SERVICE_ROUTES } from '../lib/portfolio';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

export function Navbar({ currentPath, onNavigate, onOpenInquiry }: NavbarProps) {
  const { language, setLanguage, t, localizeServiceBySlug } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const drawerTouchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handlePointerOutside = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
        setServicesDropdownOpen(false);
      }
      if (headerRef.current && target && !headerRef.current.contains(target)) {
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerOutside, { passive: true });
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('pointerdown', handlePointerOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleLinkClick = (path: string) => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    onNavigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const trailingNavItems = [
    { label: t.nav.work, path: '/work' },
    { label: t.nav.insights, path: '/insights' },
    { label: t.nav.contact, path: '/contact' },
  ];

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[4.5rem] flex items-center justify-between gap-3 sm:gap-6">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#ED1B24]"
          aria-label="Exponential Marketing Agency"
        >
          <BrandLogo variant="navbar" />
        </a>

        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6 xl:gap-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            aria-current={isActive('/') ? 'page' : undefined}
            className={`text-sm whitespace-nowrap shrink-0 transition-colors py-1 ${
              isActive('/')
                ? 'text-[#B81118] font-bold'
                : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
            }`}
          >
            {t.nav.home}
          </a>

          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/about');
            }}
            aria-current={isActive('/about') ? 'page' : undefined}
            className={`text-sm whitespace-nowrap shrink-0 transition-colors py-1 ${
              isActive('/about')
                ? 'text-[#B81118] font-bold'
                : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
            }`}
          >
            {t.nav.about}
          </a>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-sm whitespace-nowrap shrink-0 transition-colors py-1 ${
                isActive('/services') || isActive('/ecosystem')
                  ? 'text-[#B81118] font-bold'
                  : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
              }`}
            >
              <span>{t.nav.services}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {servicesDropdownOpen && (
              <div
                role="menu"
                aria-label={t.home.sixCoreServicesHeading}
                className="absolute left-0 top-full mt-3 w-72 bg-white rounded-xl p-2 shadow-xl ring-1 ring-black/5"
              >
                <div className="space-y-0.5">
                  {CORE_SERVICE_ROUTES.map((service) => {
                    const servicePath = `/services/${service.slug}`;
                    return (
                      <a
                        key={service.slug}
                        href={servicePath}
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(servicePath);
                        }}
                        className={`block px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                          currentPath === servicePath
                            ? 'bg-[#FAF5F5] text-[#B81118]'
                            : 'text-[#2A1214] hover:bg-[#FAF5F5] hover:text-[#B81118]'
                        }`}
                      >
                        {localizeServiceBySlug(service.slug, service.title)}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {trailingNavItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.path);
              }}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={`text-sm whitespace-nowrap shrink-0 transition-colors py-1 ${
                isActive(item.path)
                  ? 'text-[#B81118] font-bold'
                  : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold tracking-wide text-white bg-[#ED1B24] hover:bg-[#B81118] rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.letsTalk}
          </button>

          <div
            role="group"
            aria-label={t.nav.languageLabel}
            className="inline-flex items-center rounded-md border border-[#B81118]/25 bg-[#FAF5F5] p-0.5 shrink-0"
          >
            <button
              type="button"
              data-testid="lang-en"
              aria-pressed={language === 'en'}
              onClick={() => setLanguage('en')}
              className={`px-2 py-1.5 text-xs font-bold rounded transition-colors whitespace-nowrap ${
                language === 'en'
                  ? 'bg-[#B81118] text-white'
                  : 'text-[#2A1214] hover:text-[#B81118]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              data-testid="lang-sw"
              aria-pressed={language === 'sw'}
              onClick={() => setLanguage('sw')}
              className={`px-2 py-1.5 text-xs font-bold rounded transition-colors whitespace-nowrap ${
                language === 'sw'
                  ? 'bg-[#B81118] text-white'
                  : 'text-[#2A1214] hover:text-[#B81118]'
              }`}
            >
              SW
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-navigation"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#9E0E15] hover:bg-[#FAF5F5] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-primary-navigation"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            if (touch) {
              drawerTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
            }
          }}
          onTouchEnd={(e) => {
            const start = drawerTouchStartRef.current;
            drawerTouchStartRef.current = null;
            const touch = e.changedTouches[0];
            if (!start || !touch) return;
            const el = e.currentTarget;
            const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
            if (
              shouldDismissDrawerOnSwipeUp(
                touch.clientY - start.y,
                touch.clientX - start.x,
                isAtBottom
              )
            ) {
              setMobileOpen(false);
              setMobileServicesOpen(false);
            }
          }}
          className="lg:hidden bg-white shadow-lg px-4 py-4 sm:py-6 space-y-2 max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain touch-pan-y"
        >
          <nav aria-label="Mobile Navigation" className="space-y-1">
            <a
              href="/"
              aria-current={isActive('/') ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className={`block px-3 py-3 text-base rounded-md ${
                isActive('/')
                  ? 'text-[#B81118] bg-[#FAF5F5] font-bold'
                  : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
              }`}
            >
              {t.nav.home}
            </a>
            <a
              href="/about"
              aria-current={isActive('/about') ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/about');
              }}
              className={`block px-3 py-3 text-base rounded-md ${
                isActive('/about')
                  ? 'text-[#B81118] bg-[#FAF5F5] font-bold'
                  : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
              }`}
            >
              {t.nav.about}
            </a>
            <div>
              <button
                type="button"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-submenu"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-3 text-base rounded-md transition-colors ${
                  isActive('/services') || isActive('/ecosystem')
                    ? 'text-[#B81118] bg-[#FAF5F5] font-bold'
                    : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
                }`}
              >
                <span>{t.nav.services}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    mobileServicesOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {mobileServicesOpen && (
                <div
                  id="mobile-services-submenu"
                  className="mt-1 pl-3 space-y-1 border-l-2 border-[#B81118]/20 ml-3"
                >
                  {CORE_SERVICE_ROUTES.map((service) => {
                    const servicePath = `/services/${service.slug}`;
                    return (
                      <a
                        key={service.slug}
                        href={servicePath}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(servicePath);
                        }}
                        className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                          currentPath === servicePath
                            ? 'text-[#B81118] bg-[#FAF5F5] font-bold'
                            : 'text-[#4A2527] hover:text-[#B81118] hover:bg-[#FAF5F5]/70 font-medium'
                        }`}
                      >
                        {localizeServiceBySlug(service.slug, service.title)}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            {trailingNavItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
                className={`block px-3 py-3 text-base rounded-md ${
                  isActive(item.path)
                    ? 'text-[#B81118] bg-[#FAF5F5] font-bold'
                    : 'text-[#2A1214] font-semibold hover:text-[#ED1B24]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3.5 px-5 text-sm font-bold text-white bg-[#ED1B24] hover:bg-[#B81118] rounded-md transition-colors"
            >
              {t.nav.letsTalk}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
