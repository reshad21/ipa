import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FocusAreaItem } from '../types';
import { FOCUS_AREAS } from '../data/focusAreas';
import { useLanguage } from '../context/LanguageContext';
import { FOCUS_AREAS_BN } from '../data/translations';

interface FocusAreaListProps {
  onSelectArea?: (area: FocusAreaItem) => void;
}

export const FocusAreaList: React.FC<FocusAreaListProps> = ({ onSelectArea }) => {
  const { isBn, t } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  const currentAreas = isBn
    ? FOCUS_AREAS.map((item, idx) => {
        const bn = FOCUS_AREAS_BN[idx];
        return bn
          ? {
              ...item,
              number: bn.number,
              topic: bn.topic,
              description: bn.description,
              expandedDetails: bn.expandedDetails,
            }
          : item;
      })
    : FOCUS_AREAS;

  const activeItem = hoveredIdx !== null ? currentAreas[hoveredIdx] : currentAreas[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* List Column */}
      <div className="lg:col-span-7 space-y-4">
        {currentAreas.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isExpanded = expandedIdx === idx;

          return (
            <div
              key={item.number}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={`rounded-2xl border transition-all duration-300 ${
                isHovered
                  ? 'border-brand-dark bg-white shadow-md'
                  : 'border-line bg-[#FFFFFF] hover:border-muted'
              }`}
            >
              <div
                onClick={() => {
                  toggleExpand(idx);
                  if (onSelectArea) onSelectArea(item);
                }}
                className="py-5 sm:py-6 px-5 sm:px-7 cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="w-8 h-8 rounded-xl bg-brand-dark text-accent flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {item.number}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl text-brand-dark font-extrabold tracking-tight group-hover:text-brand-dark transition-colors">
                      {item.topic}
                    </h3>
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] text-muted pl-11 max-w-xl leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Toggle details for ${item.topic}`}
                    className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-brand-dark hover:bg-accent transition-colors cursor-pointer"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-brand-dark" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Expanded Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 sm:px-7 pb-6 pt-2 pl-12 sm:pl-16 border-t border-line"
                  >
                    <div className="text-xs font-bold tracking-wider uppercase text-brand-dark mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {t('Core Lines of Investigation', 'মূল অনুসন্ধানের ক্ষেত্রসমূহ')}
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-ink">
                      {item.expandedDetails?.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-dark shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Side Visual Preview Column (Sticky on Desktop) */}
      <div className="hidden lg:block lg:col-span-5 sticky top-32">
        <div className="rounded-3xl border border-line bg-white p-4 shadow-xl overflow-hidden">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
            <motion.img
              key={activeItem.number}
              src={activeItem.image}
              alt={activeItem.topic}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="hidden">
                {t(`Domain ${activeItem.number}`, `ক্ষেত্র ${activeItem.number}`)}
              </span>
              <div className="font-sans text-xl font-bold tracking-tight text-white">{activeItem.topic}</div>
            </div>
          </div>

          <div className="hidden">
            <span>{t('Systematic Inquiry', 'পদ্ধতিগত অনুসন্ধান')}</span>
            <span className="text-brand-dark font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent fill-current" />
              {t('Continuous Research', 'ধারাবাহিক গবেষণা')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
