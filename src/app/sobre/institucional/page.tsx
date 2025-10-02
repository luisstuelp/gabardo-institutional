import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import InstitucionalPage from '@/components/custom/InstitucionalPage';

export default function SobreInstitucionalPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <InstitucionalPage />
      <Footer />
    </main>
  );
}
