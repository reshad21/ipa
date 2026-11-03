import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PageId } from '../types';
import { PRESS_RELEASES, formatPressDate } from '../data/press';
import { PressCard } from '../components/PressCard';
import { useLanguage } from '../context/LanguageContext';

interface PressListProps {
  onNavigate: (page: PageId) => void;
  onSelectPress: (id: string) => void;
}

const PER_PAGE = 9;

export const PressList: React.FC<PressListProps> = ({ onNavigate, onSelectPress }) => {
  const { isBn, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRESS_RELEASES;
    return PRESS_RELEASES.filter((item) => {
      const en = item.title.toLowerCase();
      const bn = item.titleBn.toLowerCase();
      return en.includes(q) || bn.includes(q);
    });
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handlePageChange = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {t('Press Releases', 'প্রেস বিজ্ঞপ্তি')}
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={t('Search press releases...', 'প্রেস বিজ্ঞপ্তি খুঁজুন...')}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-line bg-white text-brand-dark placeholder:text-muted focus:outline-none focus:border-brand-dark"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted">
              {t('No press releases found.', 'কোনো প্রেস বিজ্ঞপ্তি পাওয়া যায়নি।')}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {pageItems.map((item) => (
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
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handlePageChange(n)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        n === safePage
                          ? 'bg-brand-dark text-accent'
                          : 'bg-white text-brand-dark border border-line hover:border-brand-dark'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
