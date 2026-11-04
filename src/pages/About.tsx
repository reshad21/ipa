import React from 'react';
import { PageId } from '../types';
import { AboutHero } from '../components/about/AboutHero';
import { StatsStrip } from '../components/about/StatsStrip';
import { WhoWeAre } from '../components/about/WhoWeAre';
import { MissionVision } from '../components/about/MissionVision';
import { GoalPractice } from '../components/about/GoalPractice';
import { CoreValues } from '../components/about/CoreValues';
import { JourneyTimeline } from '../components/about/JourneyTimeline';
import { HowWeWork } from '../components/about/HowWeWork';
import { LeadershipPreview } from '../components/about/LeadershipPreview';
import { PartnersStrip } from '../components/about/PartnersStrip';
import { AboutCTA } from '../components/about/AboutCTA';

interface AboutProps {
  onNavigate: (page: PageId) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="bg-surface text-ink">
      <AboutHero onNavigate={onNavigate} />
      <StatsStrip />
      <WhoWeAre />
      <MissionVision />
      <GoalPractice />
      <CoreValues />
      <JourneyTimeline />
      <HowWeWork />
      <LeadershipPreview onNavigate={onNavigate} />
      <PartnersStrip />
      <AboutCTA onNavigate={onNavigate} />
    </div>
  );
};
