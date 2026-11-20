import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { DIVISIONS } from '../data/seedData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

export function Navbar({ currentPath, onNavigate, onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleLinkClick = (path: string) => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const trailingNavItems = [
    { label: 'Our Work', path: '/work' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0B0B0D]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-[#0B0B0D]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[4.5rem] flex items-center justify-between gap-3 sm:gap-6">
        {/* Single-element Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="inline-flex items-center gap-2.5 text-white font-display font-bold text-lg tracking-tight whitespace-nowrap shrink-0"
          aria-label="Exponential Media Africa Home"
        >
          <img
            src="/assets/profile/brand/exp-mark.png"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded object-contain shrink-0 bg-white p-0.5"
          />
          <span>EXPONENTIAL</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-5 xl:gap-7">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            aria-current={isActive('/') ? 'page' : undefined}
            className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              isActive('/')
                ? 'text-white border-[#ED2126]'
                : 'text-neutral-300 border-transparent hover:text-white'
            }`}
          >
            Home
          </a>

          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/about');
            }}
            aria-current={isActive('/about') ? 'page' : undefined}
            className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              isActive('/about')
                ? 'text-white border-[#ED2126]'
                : 'text-neutral-300 border-transparent hover:text-white'
            }`}
          >
            About Us
          </a>

          {/* Services & Integrated Practice Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                isActive('/services') || isActive('/ecosystem')
                  ? 'text-white border-[#ED2126]'
                  : 'text-neutral-300 border-transparent hover:text-white'
              }`}
            >
              <span>Services</span>
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
                aria-label="Services and Practice Areas"
                className="absolute left-0 top-full mt-3 w-80 bg-[#141418] border border-white/15 rounded-xl p-2 shadow-2xl"
              >
                <a
                  href="/services"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('/services');
                  }}
                  className="block px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors border-b border-white/10 mb-1"
                >
                  <div className="text-sm font-semibold text-white">All Six Core Services</div>
                  <div className="text-xs text-neutral-400">
                    Social, Content, Influencer, Media Buy, Activation &amp; Design
                  </div>
                </a>
                <a
                  href="/ecosystem"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('/ecosystem');
                  }}
                  className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors border-b border-white/10 mb-1"
                >
                  <div className="text-sm font-medium text-[#FF1A1F]">Integrated Delivery Model</div>
                  <div className="text-xs text-neutral-400">
                    How strategy, creative, media &amp; activations connect
                  </div>
                </a>
                {DIVISIONS.map((div) => (
                  <a
                    key={div.id}
                    href={`/ecosystem#${div.id}`}
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(`/ecosystem#${div.id}`);
                    }}
                    className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="text-sm font-medium text-neutral-100">{div.name}</div>
                    <div className="text-xs text-neutral-400 truncate">{div.tagline}</div>
                  </a>
                ))}
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
              className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                isActive(item.path)
                  ? 'text-white border-[#ED2126]'
                  : 'text-neutral-300 border-transparent hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#ED2126] hover:bg-[#D1191E] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Let&apos;s Talk
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-navigation"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div id="mobile-primary-navigation" className="lg:hidden bg-[#0B0B0D] border-t border-white/10 px-4 py-4 sm:py-6 space-y-2 max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain">
          <nav aria-label="Mobile Navigation" className="space-y-1">
            <a
              href="/"
              aria-current={isActive('/') ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className={`block px-3 py-3 rounded-lg text-base font-medium ${
                isActive('/') ? 'bg-white/10 text-white' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Home
            </a>
            <a
              href="/about"
              aria-current={isActive('/about') ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/about');
              }}
              className={`block px-3 py-3 rounded-lg text-base font-medium ${
                isActive('/about') ? 'bg-white/10 text-white' : 'text-neutral-300 hover:text-white'
              }`}
            >
              About Us
            </a>
            <a
              href="/services"
              aria-current={isActive('/services') ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/services');
              }}
              className={`block px-3 py-3 rounded-lg text-base font-medium ${
                isActive('/services') ? 'bg-white/10 text-white' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Services
            </a>
            <div className="pl-4 space-y-1 border-l border-white/10 ml-3">
              <a
                href="/ecosystem"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/ecosystem');
                }}
                className="block px-3 py-2 text-sm text-[#FF1A1F] font-medium"
              >
                Integrated Delivery Model
              </a>
              {DIVISIONS.map((div) => (
                <a
                  key={div.id}
                  href={`/ecosystem#${div.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(`/ecosystem#${div.id}`);
                  }}
                  className="block px-3 py-2 text-sm text-neutral-400 hover:text-white"
                >
                  {div.name}
                </a>
              ))}
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
                className={`block px-3 py-3 rounded-lg text-base font-medium ${
                  isActive(item.path) ? 'bg-white/10 text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#ED2126] hover:bg-[#D1191E] rounded-lg transition-colors"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
