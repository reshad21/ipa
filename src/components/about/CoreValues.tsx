import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, BadgeCheck, Search, Globe, ClipboardCheck, Users } from 'lucide-react';

const VALUES = [
  { icon: ShieldCheck, title: 'Independence', description: 'We protect the independence and integrity of our research.' },
  { icon: BadgeCheck, title: 'Integrity', description: 'We uphold rigorous ethical standards in every study.' },
  { icon: Search, title: 'Evidence', description: 'We prioritize reliable evidence over assumptions.' },
  { icon: Globe, title: 'Openness', description: 'We communicate our findings and methods clearly.' },
  { icon: ClipboardCheck, title: 'Accountability', description: 'We take responsibility for the quality of our work.' },
  { icon: Users, title: 'Collaboration', description: 'We work with partners to strengthen public understanding.' },
];

export const CoreValues: React.FC = () => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fade} className="mb-10 sm:mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
            <span>Core Values</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
            What Guides Our Work
          </h2>
          <p className="mt-3 text-base text-muted leading-relaxed">
            Six principles govern our research, from fieldwork to public reporting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                {...fade}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={reduced ? undefined : { y: -4 }}
                className="group rounded-3xl border border-line bg-white p-7 transition-all hover:border-brand hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-brand-deep mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
