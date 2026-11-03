import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { NAV_ITEMS, ORGANIZATION } from '../data/navigation';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getNavLabel = (id: string, defaultLabel: string) => {
    switch (id) {
      case 'home':
        return t('Home', 'হোম');
      case 'about':
        return t('About Us', 'আমাদের সম্পর্কে');
      case 'work':
        return t('Researches', 'গবেষণাসমূহ');
      case 'team':
        return t('Our Team', 'আমাদের টিম');
      default:
        return defaultLabel;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 print:hidden ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3.5 border-b border-line'
            : 'bg-white/90 backdrop-blur-sm py-4 sm:py-5 border-b border-line/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Brand Logo matching Greenset layout */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none flex items-center gap-2.5"
              aria-label="Institute of Public Accountability Home"
            >
              <img
                src="/ipa%20logo.svg"
                alt={t(ORGANIZATION.name, ORGANIZATION.nameBn)}
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <span className="hidden lg:inline-block text-xs font-medium text-muted border-l border-line pl-2.5">
                {t(ORGANIZATION.name, ORGANIZATION.nameBn)}
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                const label = getNavLabel(item.id, item.label);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm font-semibold transition-colors cursor-pointer relative py-1 ${
                      isActive
                        ? 'text-brand-dark font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-brand-dark after:rounded-full'
                        : 'text-ink/65 hover:text-brand-dark'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls: Language Toggle & CTA Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Contact Us Pill CTA (Desktop) */}
              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:inline-flex group items-center gap-3 pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-brand-dark hover:bg-brand-dark hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>{t('Contact Us', 'যোগাযোগ')}</span>
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-surface text-brand-dark hover:bg-line focus:outline-none cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-30 bg-[#FFFFFF] pt-24 px-6 pb-10 flex flex-col justify-between md:hidden border-b border-line overflow-y-auto"
          >
            <div>
              {/* Header inside mobile drawer */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-line">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-dark">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{t('Navigation', 'নেভিগেশন')}</span>
                </div>

              </div>

              <nav className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = currentPage === item.id;
                  const label = getNavLabel(item.id, item.label);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between text-left p-4 rounded-2xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-dark text-accent'
                          : 'bg-surface text-ink hover:bg-line'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isActive ? 'text-accent' : 'text-muted'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="font-sans font-bold text-lg">{label}</span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-muted'}`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-line space-y-4">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-between pl-6 pr-2 py-2.5 rounded-full bg-accent text-brand-dark text-xs font-bold uppercase tracking-wider hover:bg-brand-dark shadow-md transition-colors"
              >
                <span>{t('Contact Us', 'যোগাযোগ করুন')}</span>
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <div className="text-center text-xs text-muted">
                {t(ORGANIZATION.tagline, ORGANIZATION.taglineBn)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
