import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { SectionHeading } from './SectionHeading';
import { useLanguage } from '../context/LanguageContext';

type ResearchItem = {
  id: number;
  featured?: boolean;
  category: string;
  categoryBn: string;
  title: string;
  titleBn: string;
  date: string;
  dateBn: string;
  image: string;
};

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 1,
    featured: true,
    category: 'Research Reports',
    categoryBn: 'গবেষণা প্রতিবেদন',
    title: 'Media Trust and Public Opinion in Bangladesh: A Longitudinal Study',
    titleBn: 'বাংলাদেশে গণমাধ্যমে আস্থা ও জনমত: একটি দীর্ঘমেয়াদি গবেষণা',
    date: 'March 2025',
    dateBn: 'মার্চ ২০২৫',
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 2,
    category: 'Policy Briefs',
    categoryBn: 'নীতি সংক্রান্ত সংক্ষিপ্ত প্রতিবেদন',
    title: 'Algorithmic Amplification and News Diversity',
    titleBn: 'অ্যালগরিদমিক বিস্তার ও সংবাদের বৈচিত্র্য',
    date: 'January 2025',
    dateBn: 'জানুয়ারি ২০২৫',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    category: 'Data Reports',
    categoryBn: 'ডেটা প্রতিবেদন',
    title: 'Mapping Misinformation Flows Across Digital Platforms',
    titleBn: 'ডিজিটাল প্ল্যাটফর্মে ভুল তথ্যের প্রবাহ ম্যাপিং',
    date: 'November 2024',
    dateBn: 'নভেম্বর ২০২৪',
    image:
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=85',
  },
];

interface FeaturedResearchProps {
  onNavigate?: (page: PageId) => void;
}

export const FeaturedResearch: React.FC<FeaturedResearchProps> = ({ onNavigate }) => {
  const { isBn, t } = useLanguage();

  const featured = RESEARCH_ITEMS.find((r) => r.featured) ?? RESEARCH_ITEMS[0];
  const smalls = RESEARCH_ITEMS.filter((r) => !r.featured).slice(0, 2);

  const handleClick = () => {
    onNavigate?.('work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredTitle = isBn ? featured.titleBn : featured.title;
  const featuredCategory = isBn ? featured.categoryBn : featured.category;
  const featuredDate = isBn ? featured.dateBn : featured.date;

  return (
    <section className="py-12 sm:py-16 border-b border-line bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          label={t('FEATURED RESEARCH', 'বিশেষ গবেষণা')}
          title={t('Featured Research', 'বিশেষ গবেষণা')}
          description={t(
            'A curated selection of our most impactful research reports and publications.',
            'আমাদের সবচেয়ে প্রভাবশালী গবেষণা প্রতিবেদন ও প্রকাশনার বাছাইকৃত সংগ্রহ।'
          )}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch"
        >
          {/* Large featured card */}
          <div className="lg:col-span-7 flex">
            <button
              type="button"
              onClick={handleClick}
              aria-label={featuredTitle}
              className="relative group w-full h-full text-left rounded-2xl overflow-hidden border border-line shadow-md min-h-[260px] lg:min-h-[300px]"
            >
              <img
                src={featured.image}
                alt={featuredTitle}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-dark/40 to-transparent pointer-events-none" />

              <div className="absolute top-0 right-0 bg-accent text-brand-dark font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-bl-xl">
                {featuredCategory}
              </div>

              <div className="absolute bottom-0 left-0 p-4 sm:p-6 max-w-2xl">
                <h3 className="font-extrabold text-white text-lg sm:text-xl lg:text-2xl">
                  <span className="bg-black/70 box-decoration-clone px-2 py-0.5 leading-[1.6]">
                    {featuredTitle}
                  </span>
                </h3>
                <div className="mt-2 flex items-center gap-2 text-white/80">
                  <span className="font-mono text-xs">{featuredDate}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          </div>

          {/* Small cards column */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {smalls.map((item) => {
              const itemTitle = isBn ? item.titleBn : item.title;
              const itemDate = isBn ? item.dateBn : item.date;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleClick}
                  aria-label={itemTitle}
                  className="group flex-1 flex items-stretch bg-white rounded-2xl border border-line overflow-hidden hover:shadow-lg hover:border-brand-dark transition-all text-left w-full"
                >
                  <div className="w-2/5 shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={itemTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1 min-w-0">
                    <h3 className="text-brand-dark font-extrabold text-sm sm:text-base line-clamp-3 mb-1">
                      {itemTitle}
                    </h3>
                    <div className="font-mono text-xs text-muted">{itemDate}</div>
                    <div className="mt-auto pt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-brand-dark font-bold group-hover:text-brand transition-colors">
                      <span>{t('Read Report', 'প্রতিবেদন পড়ুন')}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedResearch;