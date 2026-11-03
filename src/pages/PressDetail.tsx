import React from 'react';
import { ArrowLeft, Mail, Printer } from 'lucide-react';
import { PageId } from '../types';
import { PRESS_RELEASES, formatPressDate } from '../data/press';
import { PressCard } from '../components/PressCard';
import { useLanguage } from '../context/LanguageContext';

interface PressDetailProps {
  id: string;
  onNavigate: (page: PageId) => void;
  onSelectPress: (id: string) => void;
}

const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const PressDetail: React.FC<PressDetailProps> = ({ id, onNavigate, onSelectPress }) => {
  const { isBn, t } = useLanguage();

  const item = PRESS_RELEASES.find((p) => p.id === id);

  if (!item) {
    return (
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-[#556B62] mb-6">
            {t('Press release not found.', 'প্রেস বিজ্ঞপ্তি পাওয়া যায়নি।')}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('press')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B2A20] text-white text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('All Press Releases', 'সব প্রেস বিজ্ঞপ্তি')}
          </button>
        </div>
      </div>
    );
  }

  const title = isBn ? item.titleBn : item.title;
  const tag = isBn ? (item.tagBn ?? item.tag) : item.tag;
  const body = isBn ? item.bodyBn : item.body;
  const dateline = isBn ? item.datelineBn : item.dateline;
  const topics = isBn ? (item.topicsBn ?? item.topics) : item.topics;
  const others = [...PRESS_RELEASES]
    .filter((p) => p.id !== item.id)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div>
      <section className="bg-[#0B2A20] text-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => onNavigate('press')}
            className="inline-flex items-center gap-2 text-[#D2F843] text-sm font-semibold mb-4 hover:underline print:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('All Press Releases', 'সব প্রেস বিজ্ঞপ্তি')}
          </button>
          <h1 className="font-extrabold text-xl sm:text-2xl lg:text-3xl leading-tight">
            {title}
          </h1>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 print:max-w-none">
          <div className="text-center text-sm font-semibold uppercase tracking-wider text-[#556B62] mb-6">
            {t('Press Release', 'প্রেস বিজ্ঞপ্তি')}
          </div>

          {item.image && (
            <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-[#E2EAE4] mb-8">
              <img
                src={item.image}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="space-y-5 text-justify text-[15px] sm:text-base leading-relaxed text-[#0D1F18]">
            {body.map((para, idx) => (
              <p key={idx}>
                {idx === 0 && dateline ? <strong>{dateline} </strong> : null}
                {para}
              </p>
            ))}
          </div>

          {item.documentUrl && (
            <div className="mt-6">
              <a
                href={item.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#195642] hover:underline"
              >
                {t('Link to the research documents', 'গবেষণা নথির লিংক')}
              </a>
            </div>
          )}

          {item.contact && (
            <div className="mt-8 text-sm text-[#0D1F18]">
              <div className="font-bold mb-1">{t('Media Contact:', 'মিডিয়া যোগাযোগ:')}</div>
              <div>{isBn ? item.contact.nameBn : item.contact.name}</div>
              <div>{isBn ? item.contact.roleBn : item.contact.role}</div>
              <div>{item.contact.phone}</div>
              <div>
                <a
                  href={`mailto:${item.contact.email}`}
                  className="text-[#195642] hover:underline"
                >
                  {item.contact.email}
                </a>
              </div>
            </div>
          )}

          {topics && topics.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="bg-[#F6F9F4] border border-[#E2EAE4] text-[#0B2A20] rounded-lg px-3 py-1.5 text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2 print:hidden">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white text-xs font-semibold bg-[#1877F2]"
            >
              <FacebookIcon />
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white text-xs font-semibold bg-[#000000]"
            >
              <XIcon />
              X
            </a>
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white text-xs font-semibold bg-[#25D366]"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
              aria-label="Share by Email"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white text-xs font-semibold bg-[#6B7280]"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white text-xs font-semibold bg-[#111827]"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-[#F6F9F4] border-t border-[#E2EAE4] py-12 print:hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center text-[#0B2A20] font-extrabold text-2xl mb-8">
              {t('Previous Press Release', 'পূর্ববর্তী প্রেস বিজ্ঞপ্তি')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {others.map((p) => (
                <PressCard
                  key={p.id}
                  item={p}
                  onSelect={(pressId) => {
                    onSelectPress(pressId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
