import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

// EDIT PARTNERS HERE: placeholder text labels (not real brand logos).
const PARTNERS = ['Partner A', 'Partner B', 'Partner C', 'Partner D', 'Partner E', 'Partner F'];

export const PartnersStrip: React.FC = () => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fade} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
            <span>Partners</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
            Trusted by & collaborating with
          </h2>
        </motion.div>

        <motion.div {...fade} className="flex flex-wrap justify-center gap-4">
          {PARTNERS.map((p) => (
            <div
              key={p}
              className="px-8 py-5 rounded-2xl border border-line bg-white text-muted font-bold uppercase tracking-wider text-sm grayscale hover:grayscale-0 hover:text-brand-deep hover:border-brand transition-all cursor-default"
            >
              {p}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
