/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, TeamMember } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Work } from './pages/Work';
import { Team } from './pages/Team';
import { Contact } from './pages/Contact';
import { InvestigationDetail } from './pages/InvestigationDetail';
import { ScrollProgress } from './components/ScrollProgress';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [selectedInvestigationId, setSelectedInvestigationId] = useState<string>('media-journalism');

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash.startsWith('investigation')) {
        const parts = rawHash.split('/');
        if (parts[1]) {
          setSelectedInvestigationId(parts[1]);
        }
        setCurrentPage('investigation');
        return;
      }
      if (['home', 'about', 'work', 'team', 'contact', 'investigation'].includes(rawHash)) {
        setCurrentPage(rawHash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTeamMember = (member: TeamMember | null) => {
    setSelectedTeamMember(member);
  };

  const handleSelectInvestigation = (id: string) => {
    setSelectedInvestigationId(id);
    window.location.hash = `investigation/${id}`;
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F9F4] text-[#0D1F18] font-sans selection:bg-[#0B2A20] selection:text-[#D2F843]">
        {/* Fixed Scroll Progress Bar (Framer Motion) */}
        <ScrollProgress />

        {/* Sticky Editorial Header */}
        <Header currentPage={currentPage} onNavigate={navigateTo} />

        {/* Main Content View with Page Transition */}
        <main className="flex-1" id="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage === 'investigation' ? `investigation-${selectedInvestigationId}` : currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentPage === 'home' && (
                <Home
                  onNavigate={navigateTo}
                  onSelectTeamMember={(member) => {
                    setSelectedTeamMember(member);
                    navigateTo('team');
                  }}
                  onSelectInvestigation={(id) => {
                    handleSelectInvestigation(id);
                    navigateTo('investigation');
                  }}
                />
              )}

              {currentPage === 'about' && (
                <About onNavigate={navigateTo} />
              )}

              {currentPage === 'work' && (
                <Work
                  onNavigate={navigateTo}
                  onSelectInvestigation={handleSelectInvestigation}
                />
              )}

              {currentPage === 'investigation' && (
                <InvestigationDetail
                  investigationId={selectedInvestigationId}
                  onNavigate={navigateTo}
                  onSelectInvestigation={handleSelectInvestigation}
                />
              )}

              {currentPage === 'team' && (
                <Team
                  onNavigate={navigateTo}
                  selectedMember={selectedTeamMember}
                  onSelectMember={handleSelectTeamMember}
                />
              )}

              {currentPage === 'contact' && (
                <Contact onNavigate={navigateTo} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Institutional Footer */}
        <Footer onNavigate={navigateTo} />

      </div>
    </LanguageProvider>
  );
}
