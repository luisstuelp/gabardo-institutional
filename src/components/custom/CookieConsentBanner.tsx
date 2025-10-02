'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { ShieldCheck, X, Cookie } from 'lucide-react';
import Link from 'next/link';

const CookieConsentBanner: React.FC = () => {
  const { isVisible, acceptCookies, rejectCookies } = useCookieConsent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-4 left-1/2 z-[70] w-[min(96vw,680px)] -translate-x-[55%] origin-bottom transform scale-[0.75]"
        >
          <div className="flex items-center gap-3 rounded-lg border border-gray-700/80 bg-gray-800/95 px-5 py-1.5 shadow-[0_12px_32px_-24px_rgba(19,45,81,0.55)] backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white shadow-[0_10px_18px_-14px_rgba(19,45,81,0.45)]">
              <Cookie className="h-4 w-4" />
            </div>
            <div className="flex-1 text-white">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.26em] text-white/65">Consentimento de Cookies</p>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-gray-300">
                Usamos cookies para aperfeiçoar sua navegação. Saiba mais na nossa{' '}
                <Link href="/politica-de-privacidade" className="font-semibold text-gabardo-light-blue underline-offset-3 hover:underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={rejectCookies}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-transparent px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white shadow-none transition-all duration-200 hover:border-white/45 hover:bg-white/10"
              >
                <X className="h-3 w-3" />
                Recusar
              </button>
              <button
                type="button"
                onClick={acceptCookies}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gray-800 shadow-[0_10px_28px_-18px_rgba(255,255,255,0.75)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/90 hover:shadow-[0_14px_32px_-18px_rgba(255,255,255,0.5)]"
              >
                <ShieldCheck className="h-3 w-3" />
                Aceitar
              </button>
              <button
                type="button"
                onClick={rejectCookies}
                aria-label="Fechar aviso de cookies"
                className="inline-flex items-center justify-center rounded-full border border-transparent p-0.5 text-white/45 transition-colors duration-200 hover:text-white"
              >
                <X className="h-2 w-2" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
