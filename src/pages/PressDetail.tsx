import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageId } from '../types';
import { PRESS_RELEASES, formatPressDate } from '../data/press';
import { PressCard } from '../components/PressCard';
import { useLanguage } from '../context/LanguageContext';

interface PressDetailProps {
  id: string;
  onNavigate: (page: PageId) => void;
  onSelectPress: (id: string) => void;
}

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
  const others = PRESS_RELEASES.filter((p) => p.id !== item.id).slice(0, 3);

  return (
    <div>
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => onNavigate('press')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B2A20] mb-6 hover:text-[#195642] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('All Press Releases', 'সব প্রেস বিজ্ঞপ্তি')}
          </button>

          {tag && (
            <div className="inline-block bg-[#D2F843] text-[#0B2A20] font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-4">
              {tag}
            </div>
          )}

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A20] leading-tight mb-3">
            {title}
          </h1>

          <div className="font-mono text-xs text-[#556B62] mb-6">
            {formatPressDate(item.date, isBn)}
          </div>

          <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-[#E2EAE4] mb-8">
            <img
              src={item.image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-5 text-base sm:text-lg text-[#0D1F18] leading-relaxed">
            {body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#F6F9F4] border-t border-[#E2EAE4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B2A20] mb-6">
              {t('More Press Releases', 'আরও প্রেস বিজ্ঞপ্তি')}
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
