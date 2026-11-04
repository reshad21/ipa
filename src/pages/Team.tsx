import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring, useReducedMotion } from 'motion/react';
import {
  Search,
  ArrowRight,
  Users,
  ShieldCheck,
  Handshake,
  BarChart3,
  X,
} from 'lucide-react';
import { PageId, TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/team';
import { TeamMemberModal } from '../components/TeamCard';

interface TeamProps {
  onNavigate: (page: PageId) => void;
  selectedMember: TeamMember | null;
  onSelectMember: (member: TeamMember | null) => void;
}

// EDIT VALUES HERE: culture cards.
const CULTURE_VALUES = [
  { icon: ShieldCheck, title: 'Independent', description: 'Research questions belong to our fellows, free from external pressure.' },
  { icon: Handshake, title: 'Collaborative', description: 'We work across disciplines and with partner institutions.' },
  { icon: BarChart3, title: 'Evidence-led', description: 'Every conclusion is grounded in verifiable data.' },
  { icon: Users, title: 'Open', description: 'We share methods, data, and findings with the public.' },
];

export const Team: React.FC<TeamProps> = ({ onNavigate, selectedMember, onSelectMember }) => {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'leadership' | 'research'>('all');

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: false, margin: '-10%' });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const leadership = useMemo(() => TEAM_MEMBERS.filter((m) => m.category === 'leadership'), []);
  const researchers = useMemo(() => TEAM_MEMBERS.filter((m) => m.category === 'research'), []);

  const q = query.trim().toLowerCase();
  const filteredLeadership = leadership.filter((m) => {
    if (filter === 'research') return false;
    if (!q) return true;
    const hay = [m.name, m.role, ...m.researchInterests].join(' ').toLowerCase();
    return hay.includes(q);
  });
  const filteredResearchers = researchers.filter((m) => {
    if (filter === 'leadership') return false;
    if (!q) return true;
    const hay = [m.name, m.role, ...m.researchInterests].join(' ').toLowerCase();
    return hay.includes(q);
  });

  const totalFiltered = filteredLeadership.length + filteredResearchers.length;

  // EDIT STATS HERE: placeholder for combined experience.
  const disciplines = new Set(TEAM_MEMBERS.flatMap((m) => m.researchInterests)).size;
  const stats = [
    { value: TEAM_MEMBERS.length, label: 'Team Members' },
    { value: disciplines, label: 'Research Disciplines' },
    { value: 120, suffix: '+', label: 'Years Combined Experience' },
  ];

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
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=85"
          alt="Research team collaborating in a newsroom"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 via-brand-deep/50 to-brand-deep/90" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
          animate={heroInView && !reduced ? { x: [0, 50, -20, 0], y: [0, 30, -20, 0] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"
          animate={heroInView && !reduced ? { x: [0, -40, 20, 0], y: [0, -30, 15, 0] } : {}}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />

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
            <span className="text-white">Our Team</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-accent text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span>Our Team</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
              The People Behind{' '}
              <span className="text-accent">Our Work</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed max-w-2xl mb-8">
              Our team brings together researchers, analysts, and professionals with diverse experience across
              media, journalism, research, technology, and communications.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              {stats.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider"
                >
                  <span className="text-accent">{s.value}{s.suffix ?? ''}</span>
                  <span className="text-white/80">{s.label}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sticky toolbar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/85 backdrop-blur-md border-y border-line">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative">
              <div className="flex gap-2 flex-nowrap overflow-x-auto md:flex-wrap no-scrollbar pb-1 md:pb-0">
                {[
                  { id: 'all', label: `All (${TEAM_MEMBERS.length})` },
                  { id: 'leadership', label: `Leadership (${leadership.length})` },
                  { id: 'research', label: `Researchers (${researchers.length})` },
                ].map((f) => {
                  const active = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(f.id as 'all' | 'leadership' | 'research')}
                      className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                        active ? 'text-white' : 'text-muted hover:text-brand-deep'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="team-filter-indicator"
                          className="absolute inset-0 bg-brand rounded-full"
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        />
                      )}
                      {!active && <span className="absolute inset-0 rounded-full border border-line bg-white" />}
                      <span className="relative z-10">{f.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="md:hidden pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/90 to-transparent" />
              <div className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/90 to-transparent" />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, role or research line"
                  aria-label="Search team members"
                  className="pl-9 pr-4 py-2 rounded-full bg-white border border-line text-sm text-ink placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-brand w-64 max-w-full"
                />
              </div>
              <div aria-live="polite" className="text-xs font-mono font-bold text-muted shrink-0">
                Showing {totalFiltered} of {TEAM_MEMBERS.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership section */}
      {(filter === 'all' || filter === 'leadership') && (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-10 sm:mb-12 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
                <span>Leadership</span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
                Directorate & Leadership
              </h2>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Guiding institutional strategy, methodological standards, and collaborative scientific governance.
              </p>
            </div>

            {filteredLeadership.length === 0 ? null : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              >
                <AnimatePresence mode="popLayout">
                  {filteredLeadership.map((member, idx) => (
                    <motion.button
                      layout
                      key={member.id}
                      type="button"
                      onClick={() => onSelectMember(member)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className="group relative text-left rounded-3xl border border-line bg-white overflow-hidden hover:-translate-y-1 hover:border-brand hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <span className="absolute top-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500 z-20" />
                      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          loading={idx < 3 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-brand-deep/10 mix-blend-multiply pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">{member.name}</h3>
                          <p className="text-xs sm:text-sm text-white/85 font-medium">{member.role}</p>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6">
                        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">{member.bio}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.researchInterests.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface border border-line text-ink"
                            >
                              {tag}
                            </span>
                          ))}
                          {member.researchInterests.length > 3 && (
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface border border-line text-muted">
                              +{member.researchInterests.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="pt-3 border-t border-line flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-muted">View Profile</span>
                          <ArrowRight className="w-4 h-4 text-brand-dark transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Researchers section */}
      {(filter === 'all' || filter === 'research') && (
        <section className="py-16 sm:py-20 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-10 sm:mb-12 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
                <span>Researchers</span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
                Researchers & Analysts
              </h2>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Specialists conducting continuous monitoring, computational audits, and survey analyses.
              </p>
            </div>

            {filteredResearchers.length === 0 && filteredLeadership.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center">
                <Search className="w-10 h-10 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-extrabold text-brand-deep mb-2">No matching team members</h3>
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
            ) : filteredResearchers.length === 0 ? null : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              >
                <AnimatePresence mode="popLayout">
                  {filteredResearchers.map((member, idx) => (
                    <motion.button
                      layout
                      key={member.id}
                      type="button"
                      onClick={() => onSelectMember(member)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="group text-left rounded-3xl border border-line bg-white p-5 hover:-translate-y-1 hover:border-brand hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand flex items-center gap-4"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-16 h-16 rounded-2xl object-cover object-top border border-line"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-brand-deep/10 mix-blend-multiply pointer-events-none" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-extrabold text-brand-deep tracking-tight truncate">{member.name}</h3>
                        <p className="text-xs text-muted font-medium line-clamp-2 mb-2">{member.role}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {member.researchInterests.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface border border-line text-ink"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0" />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Culture band */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-10 sm:mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span>Culture</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
              How Our Team Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="rounded-3xl border border-line bg-surface p-6 hover:border-brand hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-brand-deep mb-1">{v.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join us CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl bg-brand-deep text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-brand-dark"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Want to work with us?
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
                  We welcome researchers, analysts, and collaborators interested in media and information. Get in
                  touch to learn about opportunities.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-row flex-wrap gap-3 lg:justify-end">
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-brand-deep text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onNavigate('work');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white border border-white/30 text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Explore Research</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TeamMemberModal member={selectedMember} onClose={() => onSelectMember(null)} />
    </div>
  );
};
