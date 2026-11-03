import React from 'react';
import { ArrowUpRight, Send, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import { PageId } from '../types';
import { ORGANIZATION } from '../data/navigation';
import { useLanguage } from '../context/LanguageContext';
import { BackToTop } from './BackToTop';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, isBn } = useLanguage();

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-deep text-surface border-t border-brand">
      {/* Modern 4-Column Summary Strip with Lime Highlights */}
      <div className="hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <div className="p-4 rounded-2xl bg-white border border-line shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                {t('01 — Analytics', '০১ — বিশ্লেষণ')}
              </span>
            </div>
            <p className="text-[14px] text-muted leading-relaxed">
              {t(
                'Tracking information flows across fragmented digital ecosystems.',
                'খণ্ডিত ডিজিটাল তথ্যপ্রবাহ নিবিড়ভাবে পর্যবেক্ষণ।'
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-line shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                {t('02 — Sovereignty', '০২ — তথ্যের সার্বভৌমত্ব')}
              </span>
            </div>
            <p className="text-[14px] text-muted leading-relaxed">
              {t(
                'Investigating the intersection of data, power, and discourse.',
                'ডেটা, ক্ষমতা ও জনমত বিনিময়ের মিথস্ক্রিয়া নিয়ে অনুসন্ধান।'
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-line shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                {t('03 — Integrity', '০৩ — সততা ও বস্তুনিষ্ঠতা')}
              </span>
            </div>
            <p className="text-[14px] text-muted leading-relaxed">
              {t(
                'Measuring the resilience of journalism in the age of automation.',
                'কৃত্রিম বুদ্ধিমত্তা ও স্বয়ংক্রিয়তার যুগে সাংবাদিকতার শক্তি পরিমাপ।'
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-dark text-white border border-brand shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                {t('04 — Registry', '০৪ — গবেষণাপত্র')}
              </span>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
            <span className="text-[12px] text-white/80 font-medium">
              © 2026 {isBn ? ORGANIZATION.nameBn : ORGANIZATION.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-brand">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-2 shadow-md">
                <img
                  src="/ipa%20logo.svg"
                  alt={isBn ? ORGANIZATION.nameBn : ORGANIZATION.name}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl text-white font-extrabold tracking-tight">
                  {isBn ? ORGANIZATION.nameBn : ORGANIZATION.name}
                </h3>
                <span className="text-[10px] font-bold tracking-widest uppercase text-accent block mt-0.5">
                  {t('Independent Research Observatory', 'স্বাধীন গবেষণা মানমন্দির')}
                </span>
              </div>
            </div>

            <p className="text-lg font-bold text-accent">
              {t('“Researching Media. Understanding Society.”', '“গণমাধ্যম গবেষণা। সমাজ অনুধাবন।”')}
            </p>

            <p className="text-sm text-white/70 font-sans leading-relaxed max-w-sm font-normal">
              {t(
                'We conduct evidence-driven analysis to understand how journalism, technology, and information environments shape the public sphere.',
                'সাংবাদিকতা, প্রযুক্তি ও তথ্যপ্রবাহ কীভাবে নাগরিক সমাজকে রূপ দেয় তা বুঝতে আমরা তথ্যভিত্তিক বিশ্লেষণ করি।'
              )}
            </p>

            <div className="hidden">
              {t(
                `Established ${ORGANIZATION.established} · Dhaka & Global Partner Observatories`,
                `স্থাপিত ২০২৬ · ঢাকা ও বৈশ্বিক সহযোগী গবেষণা কেন্দ্র`
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* About Column */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {t('About', 'পরিচিতি')}
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <button
                    onClick={() => handleNavClick('about')}
                    className="text-white/70 hover:text-accent transition-colors cursor-pointer text-left"
                  >
                    {t('About Us', 'আমাদের পরিচিতি')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('work')}
                    className="text-white/70 hover:text-accent transition-colors cursor-pointer text-left"
                  >
                    {t('Researches', 'গবেষণাসমূহ')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('team')}
                    className="text-white/70 hover:text-accent transition-colors cursor-pointer text-left"
                  >
                    {t('Our Team', 'আমাদের দল')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {t('Connect', 'সংযোগ')}
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="text-white/70 hover:text-accent transition-colors cursor-pointer text-left"
                  >
                    {t('Contact Office', 'যোগাযোগ দপ্তর')}
                  </button>
                </li>
                {ORGANIZATION.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="group inline-flex items-center text-white/70 hover:text-accent transition-colors"
                    >
                      {social.name === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                      {social.name === 'X / Twitter' && <Twitter className="w-4 h-4" />}
                      {social.name === 'Facebook' && <Facebook className="w-4 h-4" />}
                      {social.name === 'YouTube' && <Youtube className="w-4 h-4" />}
                      <span className="ml-1">{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {t('Contact', 'যোগাযোগ')}
              </h4>
              <div className="space-y-4 text-xs font-sans text-white/80">
                <div>
                  <span className="block text-[11px] font-mono uppercase text-white/50">
                    {t('General Enquiries', 'সাধারণ অনুসন্ধান')}
                  </span>
                  <a
                    href={`mailto:${ORGANIZATION.contact.generalEmail}`}
                    className="text-white hover:text-accent underline underline-offset-2 transition-colors font-medium"
                  >
                    {ORGANIZATION.contact.generalEmail}
                  </a>
                </div>

                <div>
                  <span className="block text-[11px] font-mono uppercase text-white/50">
                    {t('Telephone', 'টেলিফোন')}
                  </span>
                  <span className="text-white/90">{ORGANIZATION.contact.phone}</span>
                </div>

                <div>
                  <span className="block text-[11px] font-mono uppercase text-white/50">
                    {t('Headquarters', 'সদর দপ্তর')}
                  </span>
                  <p className="text-white/70 text-xs leading-relaxed mt-1">
                    {isBn
                      ? ORGANIZATION.contact.addressBn
                      : ORGANIZATION.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            © 2026 {isBn ? ORGANIZATION.nameBn : ORGANIZATION.name}. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}
          </div>

          <div className="flex items-center gap-6 [&>span:last-child]:hidden">
            <span className="hover:text-accent transition-colors cursor-pointer">
              {t('Privacy Policy', 'গোপনীয়তা নীতি')}
            </span>
            <span className="hover:text-accent transition-colors cursor-pointer">
              {t('Terms of Use', 'ব্যবহারের শর্তাবলী')}
            </span>
            <span className="hover:text-accent transition-colors cursor-pointer">
              {t('Research Ethics', 'গবেষণা নীতিমালা')}
            </span>
          </div>

          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
