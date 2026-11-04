import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const STEPS = [
  { number: '01', title: 'Research', subtitle: 'Defining the Inquiry', description: 'We formulate rigorous empirical questions targeting institutional shifts and media transformations.' },
  { number: '02', title: 'Evidence', subtitle: 'Systematic Collection', description: 'We assemble verifiable empirical material from archives, panels, and computational traces.' },
  { number: '03', title: 'Analysis', subtitle: 'Rigorous Synthesis', description: 'We deploy cross-verified coding and qualitative ethnography to detect patterns.' },
  { number: '04', title: 'Insight', subtitle: 'Public Knowledge', description: 'We translate findings into accessible monographs and policy briefings.' },
];

export const HowWeWork: React.FC = () => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fade} className="mb-10 sm:mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
            <span>How We Work</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
            From Questions to Insight
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-brand/30" />
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              {...fade}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative rounded-3xl border border-line bg-white p-7 shadow-sm hover:shadow-md hover:border-brand transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-mono text-xs font-bold border-4 border-white shadow">
                  {step.number}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Stage</span>
              </div>
              <h3 className="text-xl font-extrabold text-brand-deep mb-1">{step.title}</h3>
              <div className="text-xs font-mono uppercase text-muted font-semibold mb-3">{step.subtitle}</div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
