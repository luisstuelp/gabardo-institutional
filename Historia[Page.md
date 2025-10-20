# Copy-paste prompt 
Goal: Build a responsive “Culture/História” page that replicates the structure, layout, and interactions of clearcover.com/culture while using original text and assets. Tech: Next.js + React + Tailwind + Framer Motion (or native CSS + small JS). Ensure WCAG AA and prefers-reduced-motion support.

Global

Header with brand logo left, primary nav, secondary CTAs (“Make a Payment”, “View all jobs”) and mobile menu. Sticky on scroll.

Footer with 3 columns (Resources, Company, Partners) and legal line.

System fonts or Inter. Color tokens (edit later): --bg:#0B0E12, --text:#E7ECEF, --muted:#9BA7B0, --brand:#2BB0ED, --brand-2:#4F46E5.

SEO: <title>Experimente nossa cultura | [Your Brand]</title>, description, OG/Twitter tags, JSON-LD Organization, canonical.

Hero (“Here’s your [Brand] story”)

Large H1 + short lead paragraph.

Horizontal pill tab bar with 5 items: “Day 1 Beginning”, “Day 40 Challenging”, “Day 81 Evolving”, “Day 753 Leaving”, “Any Day Creating”. Each is both:

a focusable tab (ARIA tabs pattern) and

an anchor that smooth-scrolls to its section.

Subtle underline/indicator that animates to the active tab; active state syncs to scroll (IntersectionObserver).

Five Story Sections (one per tab)
Each section is a full-width panel with:

Section kicker: “The day you… [find your place / step out… / reach the next stage / move on / make something brand new]”.

2-column layout: left = copy; right = card stack:

“Core value:” chip.

A quote block with name + role.

A poster video card with “Play video” button → opens accessible modal with embedded mp4/mp4 fallback; trap focus & ESC to close.

Subtle content fade/slide on enter; parallax of background shapes at 10–15% translate.

Use Lenis or CSS scroll-behavior for smooth scroll.

Provide dummy assets and Lorem ipsum placeholders I can replace.

Leadership Principles grid

H2 “Leadership Principles”.

10 items in a responsive grid (1/2/3 columns).

Each item: bold title + supporting paragraph.

Optional “expand on click” for mobile (accordion) with ARIA.

Jobs CTA

Inline CTA linking to “View open jobs”.

Interactions & A11y

Tabs: ARIA role="tablist", aria-selected, aria-controls, keyboard nav (← → Home End).

Scrollspy: highlight current tab, update URL hash without jump.

Reduced motion: disable parallax; replace with simple opacity.

Video modal: aria-modal="true", focus trap, close on overlay/ESC.

All cards/quotes are semantic (figure/blockquote/cite).

Images lazy-load with width/height to prevent CLS.

Performance

Tailwind + @next/font (or system).

Next/Image with priority only for hero.

Defer noncritical JS; no heavy libraries beyond Framer Motion (or use CSS where possible).

Deliverables

Production-ready page component app/culture/page.tsx (or single HTML file) with all sections and dummy content.

components/ for: Header, Footer, Tabs, SectionVideoModal, QuoteCard, LeadershipGrid.

Minimal CSS variables in globals.css for colors/spacing; Tailwind config ready.

Content JSON (content/culture.json) so I can edit text, quotes, and principles without touching code.

Acceptance Criteria (must match the reference page’s UX)

Sticky header + identical nav structure and CTAs.

Hero + 5-tab bar that controls/reflects scroll position.

Each section contains: kicker, headline paragraph(s), “Core value” chip, quote card with name/role, and a video poster with working modal.

Leadership principles list of ~10 items with titles like “Know the Customer, Work for the Customer”, “Earn Trust”, “Think ‘Better-er’”, “Execute with Urgency and Focus”, “Embrace Technology”, “Raise the Bar”, “Operate Like an Owner”, “Play the Long Game”, “Dive Deep”, “Act like an Underdog” — use my own wording, same count and layout.

Smooth scroll + scrollspy; keyboard accessible; reduced-motion safe.

Lighthouse (mobile) ≥ 90 Performance/Accessibility/Best Practices/SEO.

Populate with placeholders

Replace all brand names, quotes, and leadership copy with neutral placeholders referencing my company (pt-BR allowed).

Provide a TODO: comment where images/videos should be replaced.

Code:
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Cultura/História – Clearcover-style page scaffold (single-file)
 * Tech: React + TailwindCSS (no external deps)
 * Accessible tabs + scrollspy + smooth-scroll + reduced-motion safe
 * Replace placeholder copy/media (TODO tags) with your content.
 */

// ---- Content model (edit freely) -------------------------------------------------
const STORY_SECTIONS = [
  {
    id: "day-1",
    tab: "Day 1 Beginning",
    kicker: "O dia em que você encontra seu lugar",
    heading: "Começar aqui é começar certo",
    body:
      "Desde o primeiro dia, nossa cultura acolhe, explica e te dá contexto. Você entende o porquê antes do como, e entra em ritmo com autonomia e apoio.",
    coreValue: "Onboarding inteligente",
    quote: {
      text:
        "No primeiro mês me senti parte de algo maior. As expectativas eram claras e pude entregar de verdade.",
      person: "Nome Sobrenome",
      role: "Produto",
    },
    videoPoster:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop", // TODO: replace
    videoSrc: "", // TODO: optional mp4 url
  },
  {
    id: "day-40",
    tab: "Day 40 Challenging",
    kicker: "O dia em que você sai da zona de conforto",
    heading: "Desafios que elevam o nível",
    body:
      "A gente gosta de problemas reais. Usamos dados, aprendemos em ciclos curtos e celebramos o que melhora a vida do cliente.",
    coreValue: "Foco no cliente",
    quote: {
      text:
        "Sempre que mergulhamos no dado, surgem insights que mudam a direção. É intenso, mas é o melhor tipo de intenso.",
      person: "Nome Sobrenome",
      role: "Dados",
    },
    videoPoster:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop", // TODO
    videoSrc: "",
  },
  {
    id: "day-81",
    tab: "Day 81 Evolving",
    kicker: "O dia em que você alcança o próximo estágio",
    heading: "Evoluir é padrão",
    body:
      "Feedback direto, planos claros e espaço para experimentar. Aqui você cresce com propósito e consequência.",
    coreValue: "Crescimento contínuo",
    quote: {
      text:
        "A cadência de 1:1 e reviews me deu visibilidade e rumo. Não tem surpresa, tem evolução.",
      person: "Nome Sobrenome",
      role: "Engenharia",
    },
    videoPoster:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop", // TODO
    videoSrc: "",
  },
  {
    id: "day-753",
    tab: "Day 753 Leaving",
    kicker: "O dia em que você decide ir",
    heading: "Respeito nas transições",
    body:
      "Saídas acontecem. Documentamos, transferimos contexto e apoiamos a pessoa. O legado importa mais que a estatística.",
    coreValue: "Transparência",
    quote: {
      text:
        "Quando decidi sair, fui tratada com respeito. Fechei ciclos e deixei meu trabalho preparado para seguir.",
      person: "Nome Sobrenome",
      role: "Design",
    },
    videoPoster:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop", // TODO
    videoSrc: "",
  },
  {
    id: "any-day",
    tab: "Any Day Creating",
    kicker: "Qualquer dia em que você cria algo novo",
    heading: "Construir juntos é nosso esporte",
    body:
      "Menos ego, mais entrega. Preferimos shipping com qualidade a apresentações bonitas. O cliente percebe.",
    coreValue: "Ownership",
    quote: {
      text:
        "Aqui a ideia sai do Figma e vira impacto de verdade. Você sente o resultado no produto e no cliente.",
      person: "Nome Sobrenome",
      role: "UX Pesquisa",
    },
    videoPoster:
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=1600&auto=format&fit=crop", // TODO
    videoSrc: "",
  },
] as const;

const PRINCIPLES = [
  "Conheça o cliente, trabalhe pelo cliente",
  "Conquiste confiança",
  "Pense sempre em ‘melhorar’",
  "Execute com urgência e foco",
  "Abrace tecnologia",
  "Aumente a barra",
  "Haja como dono",
  "Jogue o longo prazo",
  "Mergulhe fundo",
  "Aja como azarão",
];

// ---- Utils ----------------------------------------------------------------------
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(m.matches);
    handler();
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);
  return reduced;
};

// ---- Components -----------------------------------------------------------------
function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div aria-hidden className="size-8 rounded-md bg-cyan-400" />
          <span className="sr-only">[Sua Marca] – Início</span>
          <a href="#top" className="font-semibold text-slate-100 tracking-tight">Sua Marca</a>
        </div>
        <nav aria-label="principal" className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a className="hover:text-white" href="#principles">Princípios</a>
          <a className="hover:text-white" href="#jobs">Vagas</a>
          <a className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1" href="#contact">Fale com a gente</a>
        </nav>
        <button className="md:hidden rounded-md border border-white/10 px-3 py-1 text-slate-200">Menu</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3 text-sm text-slate-300">
        <div>
          <h3 className="font-semibold text-white">Recursos</h3>
          <ul className="mt-4 space-y-2">
            <li><a className="hover:underline" href="#">Blog</a></li>
            <li><a className="hover:underline" href="#">Ajuda</a></li>
            <li><a className="hover:underline" href="#">API</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Empresa</h3>
          <ul className="mt-4 space-y-2">
            <li><a className="hover:underline" href="#">Sobre</a></li>
            <li><a className="hover:underline" href="#">Carreiras</a></li>
            <li><a className="hover:underline" href="#">Contato</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Parceiros</h3>
          <ul className="mt-4 space-y-2">
            <li><a className="hover:underline" href="#">Programa</a></li>
            <li><a className="hover:underline" href="#">Afiliados</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Sua Marca</div>
    </footer>
  );
}

function VideoModal({ open, onClose, src }: { open: boolean; onClose: () => void; src?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open || !ref.current) return;
    const el = ref.current;
    const prev = document.activeElement as HTMLElement | null;
    const focusable = el.querySelector<HTMLElement>("button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])");
    focusable?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="w-full max-w-3xl rounded-2xl bg-slate-900 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white">Assista ao vídeo</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-slate-300 hover:bg-white/10">Fechar</button>
        </div>
        <div className="aspect-video w-full">
          {src ? (
            <video className="h-full w-full" controls>
              <source src={src} />
            </video>
          ) : (
            <div className="h-full w-full grid place-content-center text-slate-300">
              <p>TODO: adicionar src do vídeo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StoryCard({ s, onOpen }: { s: typeof STORY_SECTIONS[number]; onOpen: () => void }) {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-300">
        <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" aria-hidden />
        Core value: {s.coreValue}
      </div>
      <figure className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
        <blockquote className="text-slate-200">“{s.quote.text}”</blockquote>
        <figcaption className="mt-3 text-sm text-slate-400">
          <span className="font-medium text-slate-200">{s.quote.person}</span> — {s.quote.role}
        </figcaption>
      </figure>
      <button
        onClick={onOpen}
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
      >
        <img
          src={s.videoPoster}
          alt="Prévia do vídeo"
          loading="lazy"
          className="h-56 w-full object-cover opacity-90 transition group-hover:opacity-100"
        />
        <span className="absolute inset-0 grid place-content-center">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">Reproduzir vídeo</span>
        </span>
      </button>
    </div>
  );
}

function Tabs({ ids, activeId, setActiveId }: { ids: { id: string; label: string }[]; activeId: string; setActiveId: (id: string) => void }) {
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Animate indicator under active tab
    const list = listRef.current;
    const ind = indicatorRef.current;
    if (!list || !ind) return;
    const idx = ids.findIndex((t) => t.id === activeId);
    const tab = list.querySelectorAll<HTMLElement>("[role='tab']")[idx];
    if (!tab) return;
    const rect = tab.getBoundingClientRect();
    const parent = list.getBoundingClientRect();
    ind.style.width = `${rect.width}px`;
    ind.style.transform = `translateX(${rect.left - parent.left}px)`;
  }, [activeId, ids]);

  return (
    <div className="relative mt-8 w-full overflow-x-auto">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Seções da história"
        className="relative mx-auto flex w-max min-w-full items-center gap-6 border-b border-white/10 px-2"
      >
        {ids.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeId === t.id}
            aria-controls={t.id}
            className={`whitespace-nowrap py-3 text-sm font-medium outline-none transition ${
              activeId === t.id ? "text-white" : "text-slate-300 hover:text-white"
            }`}
            onClick={() => {
              setActiveId(t.id);
              const el = document.getElementById(t.id);
              if (!el) return;
              const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
              history.replaceState(null, "", `#${t.id}`);
            }}
          >
            {t.label}
          </button>
        ))}
        <div
          aria-hidden
          ref={indicatorRef}
          className="pointer-events-none absolute bottom-0 h-0.5 bg-cyan-400 transition-[transform,width] duration-300"
        />
      </div>
    </div>
  );
}

export default function CulturePage() {
  const [activeId, setActiveId] = useState(STORY_SECTIONS[0].id);
  const [modalSrc, setModalSrc] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Scrollspy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    STORY_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const tabIds = useMemo(
    () => STORY_SECTIONS.map((s) => ({ id: s.id, label: s.tab })),
    []
  );

  return (
    <main id="top" className="min-h-screen scroll-smooth bg-slate-950 text-slate-200">
      <Header />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-cyan-300">Nossa história</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Aqui é onde a cultura acontece</h1>
          <p className="mt-4 text-lg text-slate-300">
            Construímos um lugar onde boas pessoas resolvem problemas difíceis com responsabilidade, foco no cliente e vontade de aprender rápido.
          </p>
        </div>
        <Tabs ids={tabIds} activeId={activeId} setActiveId={setActiveId} />
      </section>

      {/* Sections */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {STORY_SECTIONS.map((s) => (
          <section
            id={s.id}
            key={s.id}
            aria-labelledby={`${s.id}-title`}
            className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 border-t border-white/10"
          >
            <div>
              <p className="text-cyan-300 text-sm font-medium">{s.kicker}</p>
              <h2 id={`${s.id}-title`} className="mt-2 text-3xl font-bold text-white">{s.heading}</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">{s.body}</p>
            </div>
            <div>
              <StoryCard
                s={s}
                onOpen={() => {
                  setModalSrc(s.videoSrc || undefined);
                  setModalOpen(true);
                }}
              />
            </div>
          </section>
        ))}
      </div>

      {/* Leadership Principles */}
      <section id="principles" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10">
        <h2 className="text-3xl font-bold text-white">Princípios de Liderança</h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          Os princípios orientam nossas decisões e como trabalhamos no dia a dia. Eles não são slogans, são compromissos praticáveis.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
              <h3 className="font-semibold text-white">{p}</h3>
              <p className="mt-2 text-sm text-slate-300">
                {/* TODO: descreva cada princípio com 2–3 frases. */}
                Descreva como este princípio aparece no trabalho real, decisões e rituais semanais.
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Jobs CTA */}
      <section id="jobs" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Venha construir com a gente</h2>
          <p className="mt-2 max-w-2xl text-slate-200">
            Estamos sempre procurando pessoas boas que queiram resolver problemas importantes. Veja as vagas abertas e se inscreva.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-slate-900 font-semibold hover:bg-slate-100"
            >
              Ver vagas abertas
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <VideoModal open={modalOpen} src={modalSrc} onClose={() => setModalOpen(false)} />

      {/* Background accents (subtle) */}
      <Accents reduced={reduced} />
    </main>
  );
}

function Accents({ reduced }: { reduced: boolean }) {
  // decorative blobs; disabled motion if reduced
  return (
    <div aria-hidden>
      <div
        className={`pointer-events-none fixed -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl ${
          reduced ? "" : "animate-pulse"
        }`}
      />
      <div
        className={`pointer-events-none fixed top-1/3 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl ${
          reduced ? "" : "animate-pulse"
        }`}
      />
    </div>
  );
}


