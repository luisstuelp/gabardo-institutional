import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  itemMinHeight?: number;
  isTilted?: boolean;
  tiltDirection?: 'left' | 'right';
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: 'down' | 'up';
  pauseOnHover?: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = '30rem',
  maxHeight = '100%',
  negativeMargin = '-0.5em',
  items = [],
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = 'left',
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = 'up',
  pauseOnHover = false
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playbackStateRef = useRef({ speed: 0 });
  const tickerCallbackRef = useRef<(() => void) | null>(null);
  const isHoveringRef = useRef(false);

  const getTiltTransform = (): string => {
    if (!isTilted) return 'none';
    return tiltDirection === 'left'
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    const observer = Observer.create({
      target: container,
      type: 'wheel,touch,pointer',
      preventDefault: true,
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = 'grabbing';
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = 'grab';
      },
      onChange: ({ deltaY, isDragging, event }) => {
        const d = event.type === 'wheel' ? -deltaY : deltaY;
        const distance = isDragging ? d * 2 : d * 4;
        divItems.forEach(child => {
          gsap.to(child, {
            duration: 0.5,
            ease: 'expo.out',
            y: `+=${distance}` ,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
      }
    });

    const removeTicker = () => {
      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current);
        tickerCallbackRef.current = null;
      }
      gsap.killTweensOf(playbackStateRef.current);
      playbackStateRef.current.speed = 0;
    };

    if (autoplay) {
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;
      playbackStateRef.current.speed = autoplaySpeed * directionFactor;

      const tick = () => {
        const { speed } = playbackStateRef.current;
        if (Math.abs(speed) < 0.0005) return;

        divItems.forEach(child => {
          gsap.set(child, {
            y: `+=${speed}` ,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
      };

      tickerCallbackRef.current = tick;
      gsap.ticker.add(tick);

      const setAutoplaySpeed = (value: number, options?: gsap.TweenVars) => {
        gsap.killTweensOf(playbackStateRef.current);
        gsap.to(playbackStateRef.current, {
          speed: value,
          duration: 0.45,
          ease: 'power2.out',
          ...options
        });
      };

      if (pauseOnHover) {
        const handleMouseEnter = () => {
          isHoveringRef.current = true;
          setAutoplaySpeed(0, { duration: 0.08, ease: 'power1.out' });
        };

        const handleMouseLeave = () => {
          isHoveringRef.current = false;
          setAutoplaySpeed(autoplaySpeed * directionFactor, { duration: 0.6 });
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          observer.kill();
          removeTicker();
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
        };
      }

      return () => {
        observer.kill();
        removeTicker();
      };
    }

    return () => {
      observer.kill();
      removeTicker();
    };
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, isTilted, tiltDirection, negativeMargin]);

  return (
    <>
      <style>
        {`
          .infinite-scroll-wrapper {
            max-height: ${maxHeight};
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            cursor: grab;
            perspective: 1000px;
          }

          .infinite-scroll-wrapper:active {
            cursor: grabbing;
          }

          .infinite-scroll-container {
            width: ${width};
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            transform-style: preserve-3d;
          }

          .infinite-scroll-item {
            height: ${itemMinHeight}px;
            margin-top: ${negativeMargin};
            display: flex;
            justify-content: center;
            align-items: center;
            will-change: transform;
          }
        `}
      </style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={{
            transform: getTiltTransform()
          }}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
