import React from 'react';
import { FAQSection } from '../components/FAQSection';
import { Mail, Phone, MapPin, Clock, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';
import { ORGANIZATION } from '../data/navigation';
import { PageHero } from '../components/PageHero';
import { ContactForm } from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
  onNavigate: (page: PageId) => void;
}

export const Contact: React.FC<ContactProps> = () => {
  const { isBn, t } = useLanguage();

  return (
    <div className="bg-surface text-ink">
      {/* 26. HERO */}
      <PageHero
        backgroundImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85"
        label={t('CONTACT', 'যোগাযোগ')}
        title={t('Let’s Start a Conversation.', 'আমাদের সাথে যোগাযোগ করুন')}
        description={t(
          'Whether you have a question about our work, are interested in collaboration, or would like to connect with our team, we’d be glad to hear from you.',
          'আমাদের কাজ, যৌথ গবেষণা বা যেকোনো বিষয়ে তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন।'
        )}
        metadata={t('Direct Communications & Field Office', 'সরাসরি যোগাযোগ ও সচিবালয়')}
      />

      {/* 27. CONTACT INFORMATION & 28. CONTACT FORM */}
      <section id="contact-form-section" className="py-16 sm:py-24 border-b border-line bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Contact Information & Map Column (Left Side) */}
            <div className="lg:col-span-5 space-y-6">
              {/* UNIFIED CONTACT CARD: 2 PHONES, 1 EMAIL, 1 ADDRESS */}
              <div className="rounded-3xl border border-line bg-[#FFFFFF] p-6 sm:p-7 shadow-sm hover:border-brand-dark/40 transition-all space-y-5">
                {/* Header badge */}
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_#f5b82e]" />
                    <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-brand-dark">
                      {t('DIRECT CONTACT INFO', 'সরাসরি যোগাযোগের তথ্য')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-dark/5 text-brand-dark font-bold uppercase border border-brand-dark/10">
                    {t('DHAKA HQ', 'ঢাকা প্রধান কার্যালয়')}
                  </span>
                </div>

                {/* 2 Phone Numbers */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-dark text-accent flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted">
                      {t('TELEPHONE (2 LINES)', 'টেলিফোন (২টি লাইন)')}
                    </span>
                  </div>

                  <div className="pl-1 space-y-2">
                    {/* Line 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <a
                        href={`tel:${ORGANIZATION.contact.phone.replace(/\s+/g, '')}`}
                        className="font-sans font-extrabold text-base sm:text-lg text-brand-dark hover:text-brand transition-colors tracking-tight"
                      >
                        {ORGANIZATION.contact.phone}
                      </a>
                      <span className="text-xs font-mono text-muted">
                        {t('Main Secretariat', 'প্রধান সচিবালয়')}
                      </span>
                    </div>

                    {/* Line 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <a
                        href={`tel:${ORGANIZATION.contact.secondaryPhone.replace(/\s+/g, '')}`}
                        className="font-sans font-extrabold text-base sm:text-lg text-brand-dark hover:text-brand transition-colors tracking-tight"
                      >
                        {ORGANIZATION.contact.secondaryPhone}
                      </a>
                      <span className="text-xs font-mono text-muted">
                        {t('Research Desk & Media', 'গবেষণা ও গণমাধ্যম শাখা')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted pt-1">
                      <Clock className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>{isBn ? 'রবি - বৃহঃ, সকাল ৯:০০ - বিকাল ৫:০০ (বিএসটি)' : ORGANIZATION.contact.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-line" />

                {/* 1 Email Address */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-brand-dark text-accent flex items-center justify-center shrink-0 shadow-sm">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted">
                      {t('OFFICIAL EMAIL', 'অফিসিয়াল ইমেইল')}
                    </span>
                  </div>

                  <div className="pl-1 space-y-0.5">
                    <a
                      href={`mailto:${ORGANIZATION.contact.generalEmail}`}
                      className="font-sans font-extrabold text-base sm:text-lg text-brand-dark hover:text-brand transition-colors break-all block tracking-tight"
                    >
                      {ORGANIZATION.contact.generalEmail}
                    </a>
                    <p className="text-xs font-sans text-muted">
                      {t(
                        'Inquiries, press commentary requests, and research correspondence.',
                        'গবেষণা অনুসন্ধান, প্রেস মন্তব্য ও সাধারণ যোগাযোগ।'
                      )}
                    </p>
                  </div>
                </div>

                <div className="border-t border-line" />

                {/* 1 Address */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-brand-dark text-accent flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted">
                      {t('SECRETARIAT ADDRESS', 'সচিবালয়ের ঠিকানা')}
                    </span>
                  </div>

                  <div className="pl-1 space-y-1.5">
                    <p className="font-sans text-sm text-ink font-medium leading-relaxed">
                      {isBn
                        ? '৪২ গুলশান অ্যাভিনিউ, সার্কেল-২, ঢাকা ১২১২, বাংলাদেশ'
                        : ORGANIZATION.contact.address}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <a
                        href="https://maps.google.com/?q=42+Gulshan+Avenue,+Dhaka+1212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-dark hover:text-brand uppercase tracking-wider transition-colors group"
                      >
                        <span>{t('Open in Google Maps', 'গুগল ম্যাপে দেখুন')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <span className="text-[11px] font-mono text-muted">
                        {isBn ? 'ঢাকা ১২১২' : 'Dhaka 1212'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* UNDER THE CARD: INTERACTIVE MAP */}
              <div className="rounded-3xl border border-line bg-[#FFFFFF] overflow-hidden shadow-sm hover:border-brand-dark/40 transition-all">
                <div className="px-5 py-3.5 border-b border-line bg-surface flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_#f5b82e]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-dark">
                      {t('Secretariat Location Map', 'সচিবালয়ের অবস্থান মানচিত্র')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted uppercase">
                    {t('Interactive View', 'ইন্টারেক্টিভ ভিউ')}
                  </span>
                </div>

                <div className="relative w-full h-64 sm:h-72 bg-[#E7EEE9]">
                  <iframe
                    title="IPA Secretariat Location Map"
                    src="https://maps.google.com/maps?q=42+Gulshan+Avenue,+Dhaka+1212&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="px-5 py-3.5 bg-white flex items-center justify-between text-xs text-muted">
                  <span className="font-sans flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span>{isBn ? '৪২ গুলশান অ্যাভিনিউ, ঢাকা' : '42 Gulshan Avenue, Dhaka'}</span>
                  </span>
                  <a
                    href="https://maps.google.com/?q=42+Gulshan+Avenue,+Dhaka+1212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-brand-dark hover:text-brand transition-colors inline-flex items-center gap-1"
                  >
                    <span>{t('Get Directions', 'দিকনির্দেশনা পান')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Column (Right Side) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 29. FREQUENTLY ASKED QUESTIONS (ACCORDION INTERFACE) */}
      <FAQSection />
    </div>
  );
};
