import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { ORGANIZATION } from '../../data/navigation';

const HIGHLIGHTS = [
  'Independent and non-partisan research',
  'Evidence-based methodology and open data',
  'Accessible knowledge for the public',
];

const LARGE_IMAGE = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85';
const SMALL_IMAGE = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85';

export const WhoWeAre: React.FC = () => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div {...fade} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span>Our Identity</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
              Who We Are
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-ink leading-relaxed">
              <p>
                <strong>{ORGANIZATION.name}</strong> is an independent media research organization dedicated to
                developing a deeper understanding of media, journalism, and information.
              </p>
              <p className="text-muted">
                We examine how traditional and digital media operate, how audiences interact with information, and
                how technological and social changes are reshaping the media environment.
              </p>
              <p className="text-muted">
                Through independent research and analysis, we aim to make complex developments easier to understand
                and contribute meaningful knowledge to public discussion.
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm font-medium text-ink">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-3xl bg-accent/20 -z-10" />
            <div className="relative rounded-3xl overflow-hidden border border-line shadow-lg aspect-[4/3] bg-surface">
              <img
                src={LARGE_IMAGE}
                alt="Researchers collaborating on media analysis"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-surface">
              <img
                src={SMALL_IMAGE}
                alt="Data and information systems"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-2xl shadow-lg border border-line px-4 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">Founded</span>
              <span className="text-lg font-extrabold text-brand-deep">2019</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
