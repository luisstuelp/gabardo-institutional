'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

interface SimpleNavbarProps {
  variant?: 'light' | 'dark';
}

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'SOBRE', href: '/sobre' },
  { label: 'SERVIÇOS', href: '/servicos' },
  { label: 'NOSSA GENTE', href: '/nossa-gente' },
  { label: 'SUSTENTABILIDADE', href: '/sustentabilidade' },
  { label: 'CONTATO', href: '/contato' },
  { label: 'BLOG', href: '/blog' },
];

const SimpleNavbar: React.FC<SimpleNavbarProps> = ({ variant = 'light' }) => {

  return (
    <nav className="hidden md:flex items-center space-x-12 lg:space-x-16">
      {navItems.map((item, index) => {
        
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.08,
              ease: 'easeOut'
            }}
            className="relative"
          >
            <Link
              href={item.href}
              className={`
                relative text-sm font-normal tracking-widest uppercase font-primary
                transition-all duration-200 ease-out
                hover:opacity-60
                ${variant === 'dark' 
                  ? 'text-white'
                  : 'text-gray-800'
                }
              `}
            >
              {item.label}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default SimpleNavbar;
