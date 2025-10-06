'use client';

import { useState, useEffect } from 'react';

const words = [
  'inovação',
  'sustentabilidade',
  'qualidade',
  'garra',
  'compromisso',
  'integridade',
  'segurança',
  'confiabilidade',
  'propósito',
  'eficiência',
];

const AnimatedWords = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const handleTyping = () => {
      if (isDeleting) {
        if (text.length > 0) {
          setText(text.substring(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        if (text.length < currentWord.length) {
          setText(currentWord.substring(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.15rem' }}>
      <span>{text}</span>
      <span
        aria-hidden="true"
        style={{
          width: '0.85px',
          height: '0.88em',
          marginLeft: '0.015rem',
          borderRadius: '0.9px',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 1.5px rgba(255, 255, 255, 0.45)',
          animation: 'typingCaretBlink 0.75s steps(1, end) infinite',
        }}
      />
    </span>
  );
};

export default AnimatedWords;
