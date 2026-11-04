import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageId } from '../../types';

interface AboutCTAProps {
  onNavigate: (page: PageId) => void;
}

export const AboutCTA: React.FC<AboutCTAProps> = ({ onNavigate }) => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          {...fade}
          className="relative rounded-3xl bg-brand-deep text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-brand-dark"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Let's Understand the Media Landscape Together
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
                Whether you are interested in our work, exploring a research collaboration, or simply want to learn
                more about the organization, we would be happy to hear from you.
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
                <span>Explore Our Research</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
