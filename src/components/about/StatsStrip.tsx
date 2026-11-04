import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react';
import { Calendar, Layers, FileText, Users } from 'lucide-react';

// EDIT STATS HERE: placeholder values, replace with real numbers.
const STATS = [
  { icon: Calendar, value: 6, suffix: '+', label: 'Years of Research' },
  { icon: Layers, value: 6, suffix: '', label: 'Research Areas' },
  { icon: FileText, value: 160, suffix: '+', label: 'Publications' },
  { icon: Users, value: 12, suffix: '+', label: 'Team Members' },
];

interface StatItemProps {
  stat: (typeof STATS)[number];
  inView: boolean;
  reduced: boolean | null;
}

const StatItem: React.FC<StatItemProps> = ({ stat, inView, reduced }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${stat.suffix}`);

  useEffect(() => {
    if (reduced) {
      count.set(stat.value);
      return;
    }
    if (inView) {
      const controls = animate(count, stat.value, { duration: 1.6, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, reduced, stat.value, count]);

  const Icon = stat.icon;
  return (
    <div className="flex flex-col items-center text-center px-2 py-2">
      <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <motion.span className="text-3xl sm:text-4xl font-extrabold text-brand tracking-tight leading-none">
        {display}
      </motion.span>
      <span className="text-xs sm:text-sm text-muted mt-2 font-medium">{stat.label}</span>
    </div>
  );
};

export const StatsStrip: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section className="-mt-16 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          ref={ref}
          className="bg-white rounded-3xl shadow-xl border border-line p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`relative ${
                  idx > 0 && idx % 2 !== 0 ? 'border-l border-line pl-4 sm:pl-6' : ''
                } ${idx >= 2 ? 'border-t border-line pt-4 lg:border-t-0 lg:pt-0' : ''}`}
              >
                {idx > 0 && idx % 2 === 0 && (
                  <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-line" />
                )}
                <StatItem stat={stat} inView={inView} reduced={reduced} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
