import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PageId } from '../../types';

interface AboutHeroProps {
  onNavigate: (page: PageId) => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <img
        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2400&q=85"
        alt="Media research observatory and newsroom analysis"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 via-brand-deep/50 to-brand-deep/90" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-32 sm:pb-40">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-medium text-white/70">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-white/40" />
          <span className="text-white">About Us</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-accent text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
            <span>About the Organization</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Independent Research for a Changing{' '}
            <span className="text-accent">Media World</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed max-w-2xl mb-8">
            We research the systems, technologies, institutions, and behaviors shaping today's media and information
            environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onNavigate('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-brand-deep text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Our Research</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onNavigate('team');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white border border-white/30 text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Meet the Team</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
