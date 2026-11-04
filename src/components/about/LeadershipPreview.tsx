import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageId } from '../../types';
import { TEAM_MEMBERS } from '../../data/team';

interface LeadershipPreviewProps {
  onNavigate: (page: PageId) => void;
}

export const LeadershipPreview: React.FC<LeadershipPreviewProps> = ({ onNavigate }) => {
  const reduced = useReducedMotion();
  const fade = reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
  const preview = TEAM_MEMBERS.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div {...fade} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-bold uppercase tracking-wider border border-brand-dark/10">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#f5b82e]" />
              <span>Leadership</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-deep">
              The People Behind the Research
            </h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Our team brings together researchers, analysts, and media professionals.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('team');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface hover:bg-line text-xs font-bold uppercase tracking-wider text-brand-dark transition-colors cursor-pointer border border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span>Meet the Full Team</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {preview.map((member, idx) => (
            <motion.div
              key={member.id}
              {...fade}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group rounded-3xl border border-line bg-white overflow-hidden hover:shadow-xl hover:border-brand transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100 border-b border-line">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-2.5 py-1 rounded-full bg-brand-dark/5 text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-2">
                  {member.role}
                </span>
                <h3 className="text-lg font-extrabold text-brand-deep mb-1">{member.name}</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
