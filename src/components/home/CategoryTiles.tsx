import { Link } from '@/lib/next-router-compat';
import { Tag, Truck, ChevronRight } from 'lucide-react';

export function CategoryTiles() {
  return (
    <section className="py-12 bg-white">
      <div className="container-gabardo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ofertas Especiais */}
          <Link
            to="/caminhoes?ofertas=true"
            className="group relative overflow-hidden flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(245,158,11,0.2)] hover:border-amber-200 transition-all duration-300 ease-out"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform duration-300">
              <Tag className="h-8 w-8" />
            </div>

            <div className="relative flex-1">
              <h3 className="text-xl font-bold font-montserrat text-slate-900 group-hover:text-amber-600 transition-colors">
                Ofertas Especiais
              </h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Condições exclusivas em caminhões selecionados para você
              </p>
            </div>

            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-all duration-300">
              <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Seminovos Selecionados */}
          <Link
            to="/caminhoes?seminovos=true"
            className="group relative overflow-hidden flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(18,45,84,0.2)] hover:border-blue-200 transition-all duration-300 ease-out"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#122d54] to-[#1e4b8a] text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
              <Truck className="h-8 w-8" />
            </div>

            <div className="relative flex-1">
              <h3 className="text-xl font-bold font-montserrat text-slate-900 group-hover:text-[#122d54] transition-colors">
                Seminovos Selecionados
              </h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Veículos revisados e certificados com garantia de procedência
              </p>
            </div>

            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-100 group-hover:text-[#122d54] transition-all duration-300">
              <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
