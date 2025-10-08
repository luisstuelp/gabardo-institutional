import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import TeamHeroSection from '@/components/custom/TeamHeroSection';
import TeamMembersSection from '@/components/custom/TeamMembersSection';
import TeamCultureSection from '@/components/custom/TeamCultureSection';
import JoinTeamSection from '@/components/custom/JoinTeamSection';

export default function NossaGentePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <TeamHeroSection />
      <TeamMembersSection />
      <TeamCultureSection />
      <JoinTeamSection />
      <Footer />
    </main>
  );
}
