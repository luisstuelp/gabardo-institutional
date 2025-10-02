import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen bg-neutral-50 flex flex-col">
      <Header variant="dark" />

      <section className="relative flex-1 flex items-center justify-center px-6 py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Trans%20Gabardo%20-%20Framers%20produtora%20-5337.JPG')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#132D51]/35" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl text-center text-white" style={{ textShadow: "0 18px 32px rgba(0,0,0,0.45)" }}>
          <div className="mb-6 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 backdrop-blur">
            <Sparkles className="mr-3 h-5 w-5" />
            <span className="text-sm md:text-base font-semibold uppercase tracking-[0.45em]">Erro 404</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Rota fora do trajeto
          </h1>

          <p className="mt-6 text-base md:text-lg font-light leading-relaxed text-white/80">
            A página que você tentou acessar não faz parte do mapa da Gabardo. Vamos te reconduzir às rotas certas para
            continuar sua jornada com a gente.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#132D51] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <Home className="h-4 w-4" />
              <span>Voltar para a página inicial</span>
            </Link>

            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Falar com a Gabardo</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
