'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewSustainabilityHeroSection from '@/components/custom/NewSustainabilityHeroSection';

import ClimateChangeSection from '@/components/custom/ClimateChangeSection';
import HowWeActSection from '@/components/custom/HowWeActSection';
import CarbonCompensationSection from '@/components/custom/CarbonCompensationSection';
import SustainabilityReportSection from '@/components/custom/SustainabilityReportSection';
import HomeSustainabilitySpotlight from '@/components/custom/HomeSustainabilitySpotlight';
import ESGSection from '@/components/custom/EASGSection';
import FleetSection from '@/components/custom/FleetSection';
import MaxAgeSection from '@/components/custom/MaxAgeSection';
import InnovativeSolutionsSection from '@/components/custom/InnovativeSolutionsSection';
import InitiativesSection from '@/components/custom/InitiativesSection';

import SocialClimateSection from '@/components/custom/SocialClimateSection';
import SocialHowWeActSection from '@/components/custom/SocialHowWeActSection';
import SocialESGSection from '@/components/custom/SocialEASGSection';
import SocialFleetSection from '@/components/custom/SocialFleetSection';
import SocialCommitmentSection from '@/components/custom/SocialCommitmentSection';
import SocialInnovationSection from '@/components/custom/SocialInnovationSection';
import SocialTestimonialsSection from '@/components/custom/SocialTestimonialsSection';
import SocialInitiativesSection from '@/components/custom/SocialInitiativesSection';
import SocialSection from '@/components/custom/SocialSection';

import SobreInstitucionalLeadershipSection from '@/components/custom/SobreInstitucionalLeadershipSection';
import GovernanceClimateSection from '@/components/custom/GovernanceClimateSection';
import GovernanceHowWeActSection from '@/components/custom/GovernanceHowWeActSection';
import GovernanceFleetSection from '@/components/custom/GovernanceFleetSection';
import GovernanceCommitmentSection from '@/components/custom/GovernanceCommitmentSection';
import GovernanceInnovationSection from '@/components/custom/GovernanceInnovationSection';
import GovernanceInitiativesSection from '@/components/custom/GovernanceInitiativesSection';
import GovernanceSection from '@/components/custom/GovernanceSection';
import AboutCulturaSection from '@/components/custom/AboutCulturaSection';

import InnovationClimateSection from '@/components/custom/InnovationClimateSection';
import InnovationHowWeActSection from '@/components/custom/InnovationHowWeActSection';
import InnovationESGSection from '@/components/custom/InnovationEASGSection';
import InnovationFleetSection from '@/components/custom/InnovationFleetSection';
import InnovationCommitmentSection from '@/components/custom/InnovationCommitmentSection';
import InovacoesSection from '@/components/custom/InovacoesSection';

export default function SustentabilidadePage() {
  const [selectedTab, setSelectedTab] = useState('AMBIENTAL');

  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <NewSustainabilityHeroSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'AMBIENTAL' && (
        <>
          <ClimateChangeSection />
          <HowWeActSection />
          <CarbonCompensationSection />
          <SustainabilityReportSection />
          <HomeSustainabilitySpotlight />
          <ESGSection />
          <FleetSection />
          <MaxAgeSection />
          <InnovativeSolutionsSection />
          <InitiativesSection />
        </>
      )}
      {selectedTab === 'SOCIAL' && (
        <>
          <SocialClimateSection />
          <SocialHowWeActSection />
          <SocialESGSection />
          <SocialFleetSection />
          <SocialCommitmentSection />
          <SocialInnovationSection />
          <SocialTestimonialsSection />
          <SocialInitiativesSection />
          <SocialSection />
        </>
      )}
      {selectedTab === 'GOVERNANÇA' && (
        <>
          <SobreInstitucionalLeadershipSection />
          <GovernanceClimateSection />
          <GovernanceHowWeActSection />
          <GovernanceFleetSection />
          <GovernanceCommitmentSection />
          <AboutCulturaSection />
          <GovernanceInnovationSection />
          <GovernanceInitiativesSection />
          <GovernanceSection />
        </>
      )}
      {selectedTab === 'INOVAÇÕES' && (
        <>
          <InnovationClimateSection />
          <InnovationHowWeActSection />
          <InnovationESGSection />
          <InnovationFleetSection />
          <InnovationCommitmentSection />
          <InovacoesSection />
        </>
      )}
      <Footer />
    </main>
  );
}