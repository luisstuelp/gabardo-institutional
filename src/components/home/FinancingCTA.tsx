import { Link } from '@/lib/next-router-compat';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';

export function FinancingCTA() {
  return (
    <section className="py-12 bg-[#122d54]">
      <div className="container-gabardo">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
              <Calculator className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-montserrat text-white mb-1">
                Precisa de Financiamento?
              </h3>
              <p className="text-white/80">
                Simule agora e descubra as melhores condições para o seu caminhão
              </p>
            </div>
          </div>

          <Link to="/financiamento">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Simular Financiamento
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
