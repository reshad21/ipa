import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Target, Eye } from 'lucide-react';

export const MissionVision: React.FC = () => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fade} className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
            <span>Purpose & Outlook</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
            Mission & Vision
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative rounded-3xl border border-line bg-white p-8 sm:p-10 overflow-hidden"
          >
            <span className="absolute top-2 right-6 text-9xl font-serif text-brand/5 leading-none select-none pointer-events-none">
              “
            </span>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Our Mission</h3>
              <p className="text-xl sm:text-2xl font-semibold text-brand-deep leading-snug mb-6">
                “To produce credible, independent, and accessible research that contributes to a better understanding
                of media and its role in society.”
              </p>
              <p className="text-sm text-muted leading-relaxed pt-6 border-t border-line">
                We ensure that public conversations regarding information integrity are supported by verifiable
                empirical benchmarks rather than ideological posturing.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-3xl border border-brand-deep bg-brand-deep text-white p-8 sm:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-accent flex items-center justify-center mb-6 border border-white/15">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3">Our Vision</h3>
              <p className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-6">
                “We envision an informed society where media and information can be better understood through
                independent research, evidence, and open analysis.”
              </p>
              <p className="text-sm text-white/80 leading-relaxed pt-6 border-t border-white/15">
                An information ecosystem where journalists are safeguarded, citizens are empowered with critical
                literacy, and digital platforms are transparent to the public.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
