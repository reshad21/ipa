import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Target, Workflow } from 'lucide-react';

export const GoalPractice: React.FC = () => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            {...fade}
            className="rounded-3xl bg-accent text-brand-deep p-7 sm:p-8 flex items-start gap-5 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-deep/10 text-brand-deep flex items-center justify-center shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight mb-1">Our Goal</h3>
              <p className="text-sm font-semibold leading-relaxed text-brand-deep/85">
                Turn rigorous evidence into insight that strengthens public accountability.
              </p>
              <p className="text-xs mt-2 text-brand-deep/70 leading-relaxed">
                We connect careful research with practical knowledge for journalists, institutions, and communities.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-surface border border-line text-ink p-7 sm:p-8 flex items-start gap-5 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight text-brand-deep mb-1">Our Practice</h3>
              <p className="text-sm font-semibold leading-relaxed text-ink">
                Research that remains open, useful, and accountable.
              </p>
              <p className="text-xs mt-2 text-muted leading-relaxed">
                From fieldwork to public reporting, every step is designed to make evidence easier to examine and act upon.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
