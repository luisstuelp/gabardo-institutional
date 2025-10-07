'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  phoneNumber = "555133733000",
  message = "Olá! Gostaria de falar com a Gabardo.",
  className = ""
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link 
      href={whatsappUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 z-50 ${className}`}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={24} />
    </Link>
  );
};

export default WhatsAppFloat; 