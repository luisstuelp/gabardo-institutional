'use client';

import Image from 'next/image';

const LINE_ONE = '#1 TRANSPORTADORA NO MUNDO';
const LINE_TWO = 'CARBONO NEGATIVO';

export default function AnimatedCarbonBadge() {
  return (
    <div className="relative inline-flex items-center gap-4 py-4">
      <div className="relative z-20 flex-shrink-0 block rounded-full">
        <Image
          src="/images/Instagram - Gabardo.png"
          alt="Selo Instagram Gabardo"
          width={96}
          height={96}
          className="w-20 h-20 sm:w-24 sm:h-24"
        />
      </div>

      <div className="flex flex-col relative min-w-0 pr-6 sm:pr-8 lg:pr-10 max-w-[calc(100vw-140px)] sm:max-w-[calc(100vw-200px)] md:max-w-none">
        <div className="flex flex-col relative min-w-0 overflow-visible">
          <div className="text-[0.62rem] sm:text-sm md:text-base font-bold tracking-[0.12em] sm:tracking-[0.28em] uppercase text-white whitespace-nowrap leading-tight">
            {LINE_ONE}
          </div>

          <div className="flex flex-col mt-2 sm:mt-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="text-[0.62rem] sm:text-sm md:text-base font-semibold tracking-[0.08em] sm:tracking-[0.18em] uppercase text-white/90 whitespace-nowrap leading-tight">
                {LINE_TWO}
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute left-[6rem] sm:left-[7.5rem] top-1/2 -translate-y-1/2 h-px w-40 bg-gradient-to-r from-gabardo-light-blue/60 to-transparent" />
    </div>
  );
}
