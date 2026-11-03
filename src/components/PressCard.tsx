import React from 'react';
import { PressRelease, formatPressDate } from '../data/press';
import { useLanguage } from '../context/LanguageContext';

interface PressCardProps {
  item: PressRelease;
  onSelect: (id: string) => void;
}

export const PressCard: React.FC<PressCardProps> = ({ item, onSelect }) => {
  const { isBn } = useLanguage();
  const title = isBn ? item.titleBn : item.title;
  const tag = isBn ? (item.tagBn ?? item.tag) : item.tag;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      aria-label={title}
      className="group flex flex-col h-full rounded-3xl overflow-hidden border border-[#E2EAE4] hover:shadow-xl hover:border-[#0B2A20] transition-all text-left"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={item.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="bg-[#0B2A20] text-white p-5 min-h-[190px] flex flex-col flex-1">
        {tag && (
          <div className="text-[#D2F843] text-xs mb-2">{tag}</div>
        )}
        <h3 className="font-bold text-base line-clamp-4">{title}</h3>
        <div className="mt-auto font-mono text-xs text-white/70 pt-3">
          {formatPressDate(item.date, isBn)}
        </div>
      </div>
    </button>
  );
};
