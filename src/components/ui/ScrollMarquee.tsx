'use client';

import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

export type ScrollMarqueeProps = {
  children: React.ReactNode;
  /** Time in milliseconds before animation begins */
  delay?: number;
  /** Base velocity in rem per second. Positive moves left, negative moves right */
  baseVelocity?: number;
  className?: string;
  gradient?: boolean;
};

const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({
  children,
  delay = 0,
  baseVelocity = 3,
  className,
  gradient = true,
}) => {
  const [active, setActive] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const timer = window.setTimeout(() => setActive(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  const direction = baseVelocity >= 0 ? 'normal' : 'reverse';
  const duration = useMemo(() => {
    const speed = Math.max(Math.abs(baseVelocity), 0.5);
    return 30 / speed; // lower speed => longer duration
  }, [baseVelocity]);

  return (
    <div className="relative overflow-hidden py-2 sm:py-3">
      <div
        className={clsx(
          'flex w-max min-w-full items-center gap-16 whitespace-nowrap text-balance text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] md:leading-[1.2]',
          gradient && 'before:absolute before:inset-y-0 before:left-0 before:w-24 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:inset-y-0 after:right-0 after:w-24 after:bg-gradient-to-l after:from-white after:to-transparent',
          'relative before:pointer-events-none after:pointer-events-none',
          className
        )}
        style={{
          animation: active ? `marquee-${direction === 'normal' ? 'l' : 'r'} ${duration}s linear infinite` : undefined,
        }}
      >
        {[0, 1, 2].map((index) => (
          <span key={index} className="flex items-center gap-6">
            {children}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-l {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @keyframes marquee-r {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(33.333%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollMarquee;
