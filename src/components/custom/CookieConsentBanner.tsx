'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Cookie } from 'lucide-react';
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
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 z-[70] w-[min(90vw,420px)] origin-bottom-right transform"
        >
          <div className="flex flex-col gap-4 rounded-lg border border-gray-700/60 bg-gabardo-blue p-5 shadow-[0_16px_48px_-20px_rgba(10,25,50,0.5)] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow-inner">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1 text-white">
                <h3 className="font-semibold text-base leading-tight tracking-tight text-white">Nós valorizamos sua privacidade</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-200/90">
                  Utilizamos cookies para aprimorar sua experiência de navegação e analisar o tráfego do nosso site. Ao clicar em &quot;Aceitar&quot;, você concorda com nosso uso de cookies.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Link href="/politica-de-privacidade" className="text-[0.7rem] font-medium text-gray-300 underline-offset-3 transition-colors hover:text-white hover:underline">
                  Política de Privacidade
              </Link>
              <button
                type="button"
                onClick={rejectCookies}
                className="inline-flex items-center justify-center rounded-md border border-white/50 bg-transparent px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={acceptCookies}
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-1.5 text-xs font-semibold text-gabardo-blue shadow-[0_8px_20px_-12px_rgba(255,255,255,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-[0_12px_24px_-12px_rgba(255,255,255,0.5)]"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;