import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { PRESS_RELEASES } from '../data/press';
import { SectionHeading } from './SectionHeading';
import { PressCard } from './PressCard';
import { useLanguage } from '../context/LanguageContext';

interface PressReleasesProps {
  onNavigate: (page: PageId) => void;
  onSelectPress: (id: string) => void;
}

export const PressReleases: React.FC<PressReleasesProps> = ({ onNavigate, onSelectPress }) => {
  const { t } = useLanguage();

  const latest = [...PRESS_RELEASES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-line">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          title={t('Press Releases', 'প্রেস বিজ্ঞপ্তি')}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {latest.map((item) => (
            <PressCard
              key={item.id}
              item={item}
              onSelect={(id) => {
                onSelectPress(id);
                onNavigate('press-detail');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </motion.div>

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => {
              onNavigate('press');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-brand transition-all cursor-pointer"
          >
            <span>{t('View All Press Releases', 'সব প্রেস বিজ্ঞপ্তি দেখুন')}</span>
            <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
