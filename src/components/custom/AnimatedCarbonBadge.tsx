'use client';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { type FocusEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

type AnimationPhase = 'idle' | 'expanding' | 'expanded' | 'collapsing';

const LINE_ONE = '#1 TRANSPORTADORA NO MUNDO';
const LINE_TWO = 'CARBONO NEGATIVO';

const waitForNextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

export default function AnimatedCarbonBadge() {
  const coinControls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [textPhase, setTextPhase] = useState<'static' | 'animating' | 'hidden'>('static');
  const [showCertificateButton, setShowCertificateButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationPhaseRef = useRef<AnimationPhase>('idle');
  const hoverRef = useRef(false);

  const calculateSlideDistance = useCallback(
    (includeButton: boolean) => {
      const baseWidth = contentRef.current?.offsetWidth ?? 0;
      const buffer = includeButton ? 160 : 110;
      return Math.max(baseWidth + buffer, 320);
    },
    []
  );

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const includeButton = animationPhaseRef.current === 'expanded' || hoverRef.current;
      const distance = calculateSlideDistance(includeButton);

      if (animationPhaseRef.current === 'expanded') {
        coinControls.set({ x: distance });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateSlideDistance, coinControls]);

  const collapse = useCallback(async () => {
    if (animationPhaseRef.current === 'collapsing' || animationPhaseRef.current === 'idle') {
      return;
    }

    animationPhaseRef.current = 'collapsing';
    hoverRef.current = false;
    setShowCertificateButton(false);
    setTextPhase('hidden');
    coinControls.stop();

    try {
      await coinControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        filter: 'drop-shadow(0 0 0px rgba(56, 182, 255, 0))',
        transition: {
          duration: 0.55,
          ease: [0.4, 0, 0.2, 1],
        },
      });
    } finally {
      animationPhaseRef.current = 'idle';
      setTextPhase('static');
    }
  }, [coinControls]);

  const expand = useCallback(async () => {
    if (animationPhaseRef.current === 'expanding' || animationPhaseRef.current === 'expanded') {
      return;
    }

    animationPhaseRef.current = 'expanding';
    setShowCertificateButton(false);
    setTextPhase('hidden');
    coinControls.stop();

    await coinControls.start({
      scale: [1, 1.38, 1.24],
      rotate: [0, -18, -12],
      filter: [
        'drop-shadow(0 0 0px rgba(56, 182, 255, 0))',
        'drop-shadow(0 0 30px rgba(56, 182, 255, 0.85))',
        'drop-shadow(0 0 22px rgba(56, 182, 255, 0.6))',
      ],
      transition: {
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1],
      },
    });

    await waitForNextFrame();

    const distance = calculateSlideDistance(true);

    await coinControls.start({
      x: distance,
      rotate: [-12, 360 - 12],
      scale: 1.16,
      transition: {
        duration: 0.9,
        ease: [0.45, 0, 0.55, 1],
      },
    });

    if (hoverRef.current) {
      setShowCertificateButton(true);
      await waitForNextFrame();
      setTextPhase('animating');
      animationPhaseRef.current = 'expanded';
    } else {
      await collapse();
    }
  }, [calculateSlideDistance, collapse, coinControls]);

  useEffect(() => {
    hoverRef.current = isHovered;

    if (isHovered) {
      void expand();
    } else {
      void collapse();
    }
  }, [collapse, expand, isHovered]);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className="relative inline-flex items-center gap-1 py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <motion.div
        animate={coinControls}
        initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
        className="relative z-20 flex-shrink-0"
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <Image
          src="/images/certifications/carbon-negative-certified.png"
          alt="Carbono Negativo"
          width={96}
          height={96}
          className="w-20 h-20 sm:w-24 sm:h-24"
        />
      </motion.div>

      <div ref={contentRef} className="flex flex-col relative min-w-0">
        <div className="flex flex-col relative overflow-hidden min-w-0">
          <div className="text-[0.6rem] sm:text-sm font-bold tracking-[0.18em] sm:tracking-[0.28em] uppercase text-white whitespace-nowrap">
            {LINE_ONE.split('').map((char, index) => (
              <motion.span
                key={`line1-${index}`}
                initial={{ opacity: 1, x: 0 }}
                animate={
                  textPhase === 'animating'
                    ? {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: index * 0.04,
                          duration: 0.25,
                          ease: 'easeOut',
                        },
                      }
                    : textPhase === 'hidden'
                    ? {
                        opacity: 0,
                        x: -20,
                        transition: { duration: 0.12 },
                      }
                    : {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0 },
                      }
                }
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-col mt-2 sm:mt-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="text-[0.68rem] sm:text-sm md:text-base font-semibold tracking-[0.12em] sm:tracking-[0.18em] uppercase text-white/90 whitespace-nowrap">
                {LINE_TWO.split('').map((char, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    initial={{ opacity: 1, x: 0 }}
                    animate={
                      textPhase === 'animating'
                        ? {
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: 0.06 + index * 0.03,
                              duration: 0.25,
                              ease: 'easeOut',
                            },
                          }
                        : textPhase === 'hidden'
                        ? {
                            opacity: 0,
                            x: -20,
                            transition: { duration: 0.12 },
                          }
                        : {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0 },
                          }
                    }
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <AnimatePresence>
                {showCertificateButton && (
                  <motion.a
                    key="certificate-button"
                    href="https://drive.google.com/file/d/1J4ItTI0_6yYVohR_V8UwPqOcxCw62Ay_/view?usp=drivesdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="group relative inline-flex items-center gap-1 pl-1 pr-2 pb-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.26em] text-gabardo-light-blue transition-colors duration-200 hover:text-white"
                  >
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gabardo-light-blue to-transparent transition-transform duration-200 group-hover:scale-x-100" aria-hidden />
                    Conferir certificado
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={
          textPhase === 'animating'
            ? {
                opacity: [0, 0.3, 0],
                scaleX: [0, 1, 1],
                transition: {
                  duration: 1.2,
                  ease: 'easeOut',
                },
              }
            : {
                opacity: 0,
                scaleX: 0,
              }
        }
        className="absolute left-[6rem] sm:left-[7.5rem] top-1/2 -translate-y-1/2 h-px w-40 bg-gradient-to-r from-gabardo-light-blue/60 to-transparent"
        style={{ originX: 0 }}
      />
    </div>
  );
}
