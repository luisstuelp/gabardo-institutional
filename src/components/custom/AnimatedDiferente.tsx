'use client';

import { useState, useEffect } from 'react';

const fonts = [
  { name: 'Playfair Display', style: { fontFamily: '"Playfair Display", serif', fontWeight: 700 } },
  { name: 'Roboto Mono', style: { fontFamily: '"Roboto Mono", monospace', fontWeight: 500 } },
  { name: 'Lora', style: { fontFamily: '"Lora", serif', fontWeight: 600 } },
  { name: 'Montserrat', style: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 } },
  { name: 'Zalando Sans Expanded', style: { fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600, letterSpacing: '0.06em' } },
  { name: 'Bebas Neue', style: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.08em', fontWeight: 400 } },
  { name: 'Dancing Script', style: { fontFamily: '"Dancing Script", cursive', fontWeight: 600 } },
  { name: 'Smooch Sans', style: { fontFamily: '"Smooch Sans", sans-serif', fontWeight: 500 } },
  { name: 'DM Serif Display', style: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 } },
  { name: 'Caveat', style: { fontFamily: '"Caveat", cursive', fontWeight: 600 } },
  { name: 'Antonio', style: { fontFamily: '"Antonio", sans-serif', fontWeight: 600, letterSpacing: '0.1em' } },
  { name: 'Fugaz One', style: { fontFamily: '"Fugaz One", cursive', fontWeight: 400 } },
  { name: 'Manrope', style: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 } },
  { name: 'Space Grotesk', style: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 } },
  { name: 'Lobster', style: { fontFamily: '"Lobster", cursive', fontWeight: 400 } },
  { name: 'Yanone Kaffeesatz', style: { fontFamily: '"Yanone Kaffeesatz", sans-serif', fontWeight: 500, letterSpacing: '0.12em' } },
  { name: 'Inter', style: { fontFamily: '"Inter", sans-serif', fontWeight: 700 } },
];

const AnimatedDiferente = () => {
  const fullText = 'diferente.';
  const [text, setText] = useState(fullText);
  const [fontIndex, setFontIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        if (text.length > 0) {
          setText(text.substring(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
        }
      } else {
        if (text.length < fullText.length) {
          setText(fullText.substring(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 900);
        }
      }
    };

    const atFull = text.length === fullText.length;
    const atEmpty = text.length === 0;
    const typingTimeout = setTimeout(
      handleTyping,
      isDeleting
        ? (atFull ? 150 : 55)
        : atEmpty
        ? 140
        : atFull
        ? 140
        : 75
    );

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum, fullText]);

  const atFull = text.length === fullText.length;
  const atEmpty = text.length === 0;
  const showBoundaryBlink = atFull || atEmpty;
  const caretAnimation = showBoundaryBlink ? 'typingCaretBlink 0.45s steps(1, end)' : 'none';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.15rem', minWidth: '320px' }}>
      <span style={{ ...fonts[fontIndex].style }}>{text}</span>
      <span
        aria-hidden="true"
        style={{
          width: '0.85px',
          height: '0.88em',
          marginLeft: '0.015rem',
          borderRadius: '0.9px',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 1.5px rgba(255, 255, 255, 0.45)',
          opacity: showBoundaryBlink ? 1 : 0.9,
          alignSelf: 'baseline',
          animation: caretAnimation,
          animationIterationCount: showBoundaryBlink ? 3 : 1,
          animationFillMode: showBoundaryBlink ? 'forwards' : 'none',
        }}
      />
    </span>
  );
};

export default AnimatedDiferente;