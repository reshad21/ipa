import React from 'react';
import { ArrowRight, Mail, GraduationCap, Linkedin, Twitter } from 'lucide-react';
import { TeamMember } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TEAM_MEMBERS_BN } from '../data/translations';

interface TeamCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, onSelect }) => {
  const { isBn, t } = useLanguage();
  const bn = TEAM_MEMBERS_BN[member.id];

  const name = isBn && bn ? bn.nameBn : member.name;
  const role = isBn && bn ? bn.roleBn : member.role;
  const bio = isBn && bn ? bn.bioBn : member.bio;
  const researchInterests = isBn && bn ? bn.researchInterestsBn : member.researchInterests;

  return (
    <div className="group rounded-3xl border border-line bg-[#FFFFFF] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-brand-dark overflow-hidden">
      <div>
        {/* Photo Container with modern rounded layout */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 border-b border-line">
          <img
            src={member.image}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 bg-brand-dark text-accent font-mono text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase shadow-md">
            {isBn
              ? member.category === 'leadership'
                ? 'পরিচালনা পরিষদ'
                : 'রিসার্চ ফেলো'
              : member.category === 'leadership'
              ? 'Directorate'
              : 'Research Fellow'}
          </div>
        </div>

        {/* Member Details */}
        <div className="p-6 sm:p-7">
          <div className="inline-block px-2.5 py-1 rounded-full bg-brand-dark/5 text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
            {role}
          </div>

          <h3 className="font-sans text-2xl sm:text-3xl text-brand-dark font-extrabold tracking-tight mb-3">
            {name}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-6 font-normal line-clamp-3">
            {bio}
          </p>

          {/* Research Interests Tags */}
          <div className="pt-4 border-t border-line space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted font-semibold">
              {t('Primary Research Lines', 'মূল গবেষণা ক্ষেত্রসমূহ')}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {researchInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-sans px-2.5 py-1 rounded-lg bg-surface border border-line text-ink font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 sm:p-7 pt-0">
        <button
          onClick={() => onSelect(member)}
          className="w-full pt-4 border-t border-line flex items-center justify-between text-xs font-mono uppercase tracking-wider text-brand-dark font-bold hover:text-brand transition-colors cursor-pointer"
        >
          <span>{t('View Profile', 'প্রোফাইল দেখুন')}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-brand-dark" />
        </button>
      </div>
    </div>
  );
};

export const TeamMemberModal: React.FC<{
  member: TeamMember | null;
  onClose: () => void;
}> = ({ member, onClose }) => {
  const { isBn, t } = useLanguage();
  if (!member) return null;

  const bn = TEAM_MEMBERS_BN[member.id];
  const name = isBn && bn ? bn.nameBn : member.name;
  const role = isBn && bn ? bn.roleBn : member.role;
  const fullBio = isBn && bn ? bn.fullBioBn : member.fullBio;
  const education = isBn && bn ? bn.educationBn : member.education;
  const researchInterests = isBn && bn ? bn.researchInterestsBn : member.researchInterests;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-dark/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] border border-line rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-brand-dark font-mono text-xs px-3 py-1.5 rounded-full border border-line bg-surface cursor-pointer font-bold"
          aria-label="Close modal"
        >
          {t('✕ CLOSE', '✕ বন্ধ করুন')}
        </button>

        <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
          <img
            src={member.image}
            alt={name}
            className="w-24 h-28 sm:w-32 sm:h-40 object-cover object-top rounded-2xl border border-line"
          />
          <div>
            <span className="inline-block px-2.5 py-1 rounded-full bg-brand-dark/5 text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
              {role}
            </span>
            <h3 className="font-sans text-3xl sm:text-4xl text-brand-dark mb-2 font-extrabold tracking-tight">
              {name}
            </h3>
            {education && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-brand" />
                <span>{education}</span>
              </div>
            )}
            {member.email && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted">
                <Mail className="w-3.5 h-3.5 text-brand" />
                <a href={`mailto:${member.email}`} className="underline hover:text-brand-dark font-semibold">
                  {member.email}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-line">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold mb-2">
              {t('Biography & Background', 'জীবনী ও পটভূমি')}
            </h4>
            <p className="font-sans text-sm text-ink leading-relaxed">
              {fullBio}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold mb-2">
              {t('Research Domains', 'গবেষণার বিষয়সমূহ')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs font-sans px-3 py-1 rounded-xl bg-surface border border-line text-ink font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {false && member.recentPublications && member.recentPublications.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold mb-2">
                {t('Selected Monographs & Papers', 'নির্বাচিত মনোগ্রাফ ও গবেষণাপত্র')}
              </h4>
              <ul className="space-y-2 text-xs font-sans text-ink">
                {member.recentPublications.map((pub, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-brand font-mono">↳</span>
                    <span>{pub}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold mb-3">
              {t('Connect', 'যোগাযোগ')}
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.linkedin.com/in/${member.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className="w-9 h-9 rounded-xl bg-surface border border-line text-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://x.com/${member.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on X`}
                className="w-9 h-9 rounded-xl bg-surface border border-line text-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-accent transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${name}`}
                  className="w-9 h-9 rounded-xl bg-surface border border-line text-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
