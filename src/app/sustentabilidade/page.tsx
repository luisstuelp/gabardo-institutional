'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewSustainabilityHeroSection from '@/components/custom/NewSustainabilityHeroSection';

import ClimateChangeSection from '@/components/custom/ClimateChangeSection';
import HowWeActSection from '@/components/custom/HowWeActSection';
import CarbonCompensationSection from '@/components/custom/CarbonCompensationSection';
import SustainabilityReportSection from '@/components/custom/SustainabilityReportSection';
import ESGSection from '@/components/custom/EASGSection';
import HomeSustainabilitySpotlight from '@/components/custom/HomeSustainabilitySpotlight';
import MaxAgeSection from '@/components/custom/MaxAgeSection';
import InnovativeSolutionsSection from '@/components/custom/InnovativeSolutionsSection';
import InitiativesSection from '@/components/custom/InitiativesSection';

import SocialClimateSection from '@/components/custom/SocialClimateSection';
import SocialCommitmentSection from '@/components/custom/SocialCommitmentSection';
import SocialInnovationSection from '@/components/custom/SocialInnovationSection';

import SobreInstitucionalLeadershipSection from '@/components/custom/SobreInstitucionalLeadershipSection';
import GovernanceClimateSection from '@/components/custom/GovernanceClimateSection';
import GovernanceHowWeActSection from '@/components/custom/GovernanceHowWeActSection';
import GovernanceFleetSection from '@/components/custom/GovernanceFleetSection';
import GovernanceCommitmentSection from '@/components/custom/GovernanceCommitmentSection';

import InnovationClimateSection from '@/components/custom/InnovationClimateSection';
import InnovationCommitmentSection from '@/components/custom/InnovationCommitmentSection';
import InovacoesSection from '@/components/custom/InovacoesSection';

const TAB_TO_SECTION: Record<string, string> = {
  AMBIENTAL: 'ambiental',
  SOCIAL: 'social',
  'GOVERNANÇA': 'governanca',
  'INOVAÇÕES': 'inovacoes',
};

export default function SustentabilidadePage() {
  const [activeTab, setActiveTab] = useState('AMBIENTAL');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('id');
          if (!id) return;
          const tab = Object.entries(TAB_TO_SECTION).find(([, value]) => value === id)?.[0];
          if (tab) {
            setActiveTab((prev) => (prev === tab ? prev : tab));
          }
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    );

    Object.values(TAB_TO_SECTION).forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab: string) => {
    const sectionId = TAB_TO_SECTION[tab];
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveTab(tab);
  };

  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <NewSustainabilityHeroSection activeTab={activeTab} onTabClick={handleTabClick} />

      <section id="ambiental" className="scroll-mt-32">
        <ClimateChangeSection />
        <HowWeActSection />
        <CarbonCompensationSection />
        <SustainabilityReportSection />
        <ESGSection />
        <HomeSustainabilitySpotlight />
        <MaxAgeSection />
        <InnovativeSolutionsSection />
        <InitiativesSection />
      </section>

      <section id="social" className="scroll-mt-32">
        <SocialClimateSection />
        <SocialCommitmentSection />
        <SocialInnovationSection />
      </section>

      <section id="governanca" className="scroll-mt-32">
        <SobreInstitucionalLeadershipSection />
        <GovernanceClimateSection />
        <GovernanceHowWeActSection />
        <GovernanceFleetSection />
        <GovernanceCommitmentSection />
      </section>

      <section id="inovacoes" className="scroll-mt-32">
        <InnovationClimateSection />
        <InnovationCommitmentSection />
        <InovacoesSection />
      </section>

      <Footer />
    </main>
  );
}