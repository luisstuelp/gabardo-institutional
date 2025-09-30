'use client';

import { useState, useEffect } from 'react';

const fonts = [
  { name: 'Playfair Display', style: { fontFamily: 'Playfair Display, serif', fontWeight: 700 } },
  { name: 'Roboto Mono', style: { fontFamily: 'Roboto Mono, monospace', fontWeight: 400 } },
  { name: 'Lora', style: { fontFamily: 'Lora, serif', fontWeight: 500 } },
  { name: 'Montserrat', style: { fontFamily: 'Montserrat, sans-serif', fontWeight: 600 } },
];

const AnimatedDiferente = () => {
  const [text, setText] = useState('diferente.');
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
        if (text.length < 'diferente.'.length) {
          setText('diferente.'.substring(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? 100 : 150);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum]);

  return (
    <span style={{ ...fonts[fontIndex].style, display: 'inline-block', minWidth: '290px' }}>
      {text}
    </span>
  );
};

export default AnimatedDiferente;