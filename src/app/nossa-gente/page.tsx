import Link from 'next/link';

export default function NossaGentePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-24 text-center">
      <div className="max-w-xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gabardo-blue">Página indisponível</p>
        <h1 className="text-3xl font-bold text-gabardo-blue md:text-4xl">Conteúdo da Nossa Gente indisponível</h1>
        <p className="text-base text-neutral-600 md:text-lg">
          Esta página foi desativada temporariamente. Para falar com nossa equipe ou conhecer outros serviços, utilize os canais principais.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gabardo-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Voltar ao início
          </Link>
          <Link
            href="/orcamento"
            className="inline-flex items-center justify-center rounded-full border border-gabardo-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-gabardo-blue transition-transform duration-300 hover:-translate-y-0.5 hover:bg-gabardo-blue/10"
          >
            Solicitar orçamento
          </Link>
        </div>
      </div>
    </main>
  );
}
