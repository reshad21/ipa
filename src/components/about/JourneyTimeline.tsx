import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

// EDIT MILESTONES HERE: placeholder descriptions.
const MILESTONES = [
  { year: '2019', title: 'Founded', description: 'Institute established to study media and information.' },
  { year: '2020', title: 'Monitoring Lab', description: 'Launched continuous broadcast and digital archiving.' },
  { year: '2022', title: 'Trust Barometer', description: 'Published the first National Media Trust Barometer.' },
  { year: '2024', title: 'Platform Governance', description: 'Opened a dedicated platform governance research unit.' },
  { year: '2026', title: 'AI Auditing', description: 'Expanded into synthetic media and algorithmic auditing.' },
];

export const JourneyTimeline: React.FC = () => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fade} className="mb-10 sm:mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
            <span>Our Journey</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
            Milestones Along the Way
          </h2>
        </motion.div>

        <div className="lg:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-brand/30" />
          <div className="space-y-8">
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={m.year}
                {...fade}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative"
              >
                <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-brand border-4 border-white shadow" />
                <span className="text-sm font-extrabold text-brand">{m.year}</span>
                <h3 className="text-base font-extrabold text-brand-deep mt-1">{m.title}</h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-brand/30 -translate-y-1/2" />
          <div className="grid grid-cols-5 gap-4">
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={m.year}
                {...fade}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex flex-col items-center"
              >
                <div className="min-h-[110px] flex items-end pb-6 w-full">
                  {idx % 2 === 0 && (
                    <div className="w-full rounded-2xl border border-line bg-surface p-4 text-center">
                      <span className="text-sm font-extrabold text-brand">{m.year}</span>
                      <h3 className="text-sm font-extrabold text-brand-deep mt-1">{m.title}</h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{m.description}</p>
                    </div>
                  )}
                </div>
                <div className="w-4 h-4 rounded-full bg-brand border-4 border-white shadow z-10 shrink-0" />
                <div className="min-h-[110px] flex items-start pt-6 w-full">
                  {idx % 2 !== 0 && (
                    <div className="w-full rounded-2xl border border-line bg-surface p-4 text-center">
                      <span className="text-sm font-extrabold text-brand">{m.year}</span>
                      <h3 className="text-sm font-extrabold text-brand-deep mt-1">{m.title}</h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{m.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
