import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring, useReducedMotion, useMotionValue, useTransform, animate } from 'motion/react';
import {
  Search,
  ArrowRight,
  Newspaper,
  Globe,
  Tv,
  Users,
  Landmark,
  Cpu,
  SearchCheck,
  ShieldCheck,
  BarChart3,
  Send,
  X,
  Layers,
} from 'lucide-react';
import { PageId } from '../types';
import { WORK_AREAS } from '../data/work';
import { FeaturedResearch } from '../components/FeaturedResearch';
import { CTASection } from '../components/CTASection';

interface WorkProps {
  onNavigate: (page: PageId) => void;
  onSelectInvestigation?: (id: string) => void;
}

const AREA_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'media-journalism': Newspaper,
  'digital-media': Globe,
  'media-monitoring': Tv,
  'public-opinion': Users,
  'media-democracy': Landmark,
  'technology-ai': Cpu,
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'journalism', label: 'Journalism' },
  { id: 'platforms', label: 'Platforms & AI' },
  { id: 'opinion', label: 'Public Opinion' },
  { id: 'democracy', label: 'Democracy' },
  { id: 'monitoring', label: 'Monitoring' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

// EDIT STATS HERE: placeholder values.
const STATS = [
  { value: 6, suffix: '', label: 'Research Areas' },
  { value: 180, suffix: '+', label: 'Published Studies' },
  { value: 42, suffix: '+', label: 'Datasets Monitored' },
  { value: 6, suffix: '+', label: 'Years of Observation' },
];

const METHOD_STEPS = [
  { icon: Search, title: 'Collect', description: 'Gather multi-source evidence across broadcast, print, and digital channels.' },
  { icon: ShieldCheck, title: 'Verify', description: 'Cross-check facts, sources, and methods against transparent standards.' },
  { icon: BarChart3, title: 'Analyze', description: 'Apply quantitative and qualitative methods to detect patterns.' },
  { icon: Send, title: 'Publish', description: 'Share open, accessible findings with the public and policymakers.' },
];

const NODES = [
  { x: 80, y: 90 },
  { x: 220, y: 60 },
  { x: 360, y: 120 },
  { x: 500, y: 70 },
  { x: 640, y: 110 },
  { x: 150, y: 260 },
  { x: 300, y: 230 },
  { x: 470, y: 280 },
  { x: 620, y: 250 },
];
const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8], [8, 4],
  [1, 6], [2, 7], [3, 8],
];

export const Work: React.FC<WorkProps> = ({ onNavigate, onSelectInvestigation }) => {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterId>('all');

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: false, margin: '-10%' });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  const methodRef = useRef<HTMLDivElement>(null);
  const methodInView = useInView(methodRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const handleExplore = (id: string) => {
    if (onSelectInvestigation) onSelectInvestigation(id);
    onNavigate('investigation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const matchesFilter = (id: string) => {
    if (filter === 'all') return true;
    if (filter === 'journalism') return id === 'media-journalism';
    if (filter === 'platforms') return id === 'digital-media' || id === 'technology-ai';
    if (filter === 'opinion') return id === 'public-opinion';
    if (filter === 'democracy') return id === 'media-democracy';
    if (filter === 'monitoring') return id === 'media-monitoring';
    return true;
  };

  const q = query.trim().toLowerCase();
  const filtered = WORK_AREAS.filter((area) => {
    if (!matchesFilter(area.id)) return false;
    if (!q) return true;
    const hay = [area.name, area.tagline, area.description, ...area.methods].join(' ').toLowerCase();
    return hay.includes(q);
  });

  const clearFilters = () => {
    setQuery('');
    setFilter('all');
  };

  return (
    <div className="bg-surface text-ink">
      <motion.div
        className="fixed top-16 sm:top-20 left-0 right-0 h-0.5 bg-accent z-30 origin-left pointer-events-none"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-brand-deep text-white">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85"
          alt="Digital information networks and media systems"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 via-brand-deep/50 to-brand-deep/90" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
          animate={heroInView && !reduced ? { x: [0, 60, -20, 0], y: [0, 40, -30, 0] } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"
          animate={heroInView && !reduced ? { x: [0, -50, 30, 0], y: [0, -40, 20, 0] } : {}}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <motion.g
            animate={heroInView && !reduced ? { x: [0, 8, -6, 0], y: [0, -6, 4, 0] } : {}}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          >
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
                animate={heroInView && !reduced ? { opacity: [0.15, 0.5, 0.15] } : { opacity: 0.25 }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              />
            ))}
            {NODES.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r="3"
                fill="#F5B82E"
                animate={heroInView && !reduced ? { r: [2.5, 4.5, 2.5], opacity: [0.5, 1, 0.5] } : { r: 3, opacity: 0.8 }}
                transition={{ duration: 2.5 + (i % 4) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
          </motion.g>
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-24 sm:pb-32">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-2 text-xs font-medium text-white/70"
          >
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Home
            </button>
            <span className="text-white/40">/</span>
            <span className="text-white">Researches</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-accent text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span>Research Portfolio</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
              Exploring the Forces Shaping{' '}
              <span className="text-accent">Media</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed max-w-2xl mb-8">
              Our work examines the changing relationships between media, technology, journalism, information, and
              society.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-xl"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search research areas or methods"
                aria-label="Search research areas or methods"
                className="w-full pl-14 pr-5 py-4 rounded-full bg-white/95 text-ink placeholder:text-muted text-sm font-medium border border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="-mt-14 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div
            ref={statsRef}
            className="bg-white rounded-3xl shadow-xl border border-line p-6 sm:p-8"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat, idx) => (
                <StatCounter key={stat.label} stat={stat} inView={statsInView} reduced={!!reduced} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/85 backdrop-blur-md border-y border-line">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative">
              <div className="flex gap-2 flex-nowrap overflow-x-auto md:flex-wrap no-scrollbar pb-1 md:pb-0">
                {FILTERS.map((f) => {
                  const active = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(f.id)}
                      className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                        active ? 'text-white' : 'text-muted hover:text-brand-deep'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="work-filter-indicator"
                          className="absolute inset-0 bg-brand rounded-full"
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        />
                      )}
                      {!active && (
                        <span className="absolute inset-0 rounded-full border border-line bg-white" />
                      )}
                      <span className="relative z-10">{f.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="md:hidden pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/90 to-transparent" />
              <div className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/90 to-transparent" />
            </div>
            <div aria-live="polite" className="text-xs font-mono font-bold text-muted shrink-0">
              Showing {filtered.length} of {WORK_AREAS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Research areas grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center">
              <Search className="w-10 h-10 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-extrabold text-brand-deep mb-2">No matching research areas</h3>
              <p className="text-sm text-muted mb-6">Try a different search term or clear the filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Clear filters</span>
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              <AnimatePresence mode="popLayout">
                {filtered.map((area, idx) => {
                  const Icon = AREA_ICONS[area.id] ?? Layers;
                  const featured = idx === 0;
                  const tags = area.methods.slice(0, 3);
                  const extra = area.methods.length - tags.length;
                  return (
                    <motion.button
                      layout
                      key={area.id}
                      type="button"
                      onClick={() => handleExplore(area.id)}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className={`group relative text-left rounded-3xl border border-line bg-white overflow-hidden hover:-translate-y-1 hover:border-brand hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                        featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                      }`}
                    >
                      <span className="absolute top-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500 z-20" />
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                        <img
                          src={area.image}
                          alt={area.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/20 to-transparent" />
                        <span className="absolute top-4 left-4 bg-brand-dark text-accent font-mono text-xs px-3 py-1.5 rounded-full font-bold tracking-wider uppercase shadow-md">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center border border-white/20">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-deep tracking-tight">
                          {area.name}
                        </h3>
                        <p className="text-sm font-medium text-brand leading-snug">“{area.tagline}”</p>
                        <p className="text-sm text-muted leading-relaxed line-clamp-3">{area.description}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface border border-line text-ink"
                            >
                              {tag}
                            </span>
                          ))}
                          {extra > 0 && (
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface border border-line text-muted">
                              +{extra}
                            </span>
                          )}
                        </div>
                        <div className="pt-4 border-t border-line flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-muted">
                            {area.outputsCount}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark group-hover:text-brand transition-colors">
                            <span>Examine Focus Area</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Methodology band */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-10 sm:mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span>Methodology</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
              How We Investigate
            </h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              A rigorous, transparent process from evidence collection to public knowledge.
            </p>
          </div>

          <div ref={methodRef} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <svg
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-2 w-[75%]"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="#0C57A5"
                strokeWidth="0.4"
                strokeDasharray="1.5 1.5"
                initial={{ pathLength: 0 }}
                animate={reduced || methodInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </svg>
            {METHOD_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="relative rounded-3xl border border-line bg-white p-7 shadow-sm hover:shadow-md hover:border-brand transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-deep mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <FeaturedResearch onNavigate={onNavigate} />

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};

const StatCounter: React.FC<{
  stat: (typeof STATS)[number];
  inView: boolean;
  reduced: boolean;
  index: number;
}> = ({ stat, inView, reduced, index }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${stat.suffix}`);

  useEffect(() => {
    if (reduced) {
      count.set(stat.value);
      return;
    }
    if (inView) {
      const controls = animate(count, stat.value, { duration: 1.6, ease: 'easeOut', delay: index * 0.1 });
      return () => controls.stop();
    }
  }, [inView, reduced, stat.value, count, index]);

  return (
    <div className="flex flex-col items-center text-center px-2 py-2">
      <motion.span className="text-3xl sm:text-4xl font-extrabold text-brand tracking-tight leading-none">
        {display}
      </motion.span>
      <span className="text-xs sm:text-sm text-muted mt-2 font-medium">{stat.label}</span>
    </div>
  );
};