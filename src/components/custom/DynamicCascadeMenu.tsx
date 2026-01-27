'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import CustomCursor from './CustomCursor'; // Assuming this might still be used

interface DynamicCascadeMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'home', name: 'HOME', href: '/' },
  { id: 'sobre', name: 'SOBRE', href: '/sobre' },
  { id: 'blog', name: 'BLOG', href: '/blog' },
  { id: 'contato', name: 'CONTATO', href: '/contato' },
];

// Animation Configuration
const SOFT_EASE = [0.32, 0.72, 0, 1]; // A softer, more flowing ease
const PANEL_ANIM_DURATION = 0.7;
const ITEM_ANIM_DURATION = 0.5;

// --- Overall Menu Container --- 
const menuContainerVariants: Variants = {
  initial: {
    // opacity: 0, // Example: if a subtle fade for the whole thing is desired
  },
  animate: {
    // opacity: 1,
    transition: {
      // delayChildren: 0.1, // Delay before first panel starts
      staggerChildren: 0.15, // Stagger panel animations
    },
  },
  exit: {
    // opacity: 0,
    transition: {
      staggerChildren: 0.1, // Stagger panel exit
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

// --- Panel Animations --- 
// Panel 1: Large background, slides down from top
const panel1Variants: Variants = {
  initial: { y: '-100%', opacity: 0.8 },
  animate: {
    y: '0%',
    opacity: 1,
    transition: { duration: PANEL_ANIM_DURATION, ease: SOFT_EASE },
  },
  exit: {
    y: '-100%',
    opacity: 0.8,
    transition: { duration: PANEL_ANIM_DURATION * 0.7, ease: SOFT_EASE },
  },
};

// Panel 2: Slides from right, slightly overlaps
const panel2Variants: Variants = {
  initial: { x: '100%', opacity: 0.7 },
  animate: {
    x: '0%',
    opacity: 0.95, // Slightly less opaque than panel 1 for layering
    transition: { duration: PANEL_ANIM_DURATION * 0.9, ease: SOFT_EASE, delay: 0.1 },
  },
  exit: {
    x: '100%',
    opacity: 0.7,
    transition: { duration: PANEL_ANIM_DURATION * 0.6, ease: SOFT_EASE },
  },
};

// Panel 3: Smaller, from bottom-left, could be an accent
const panel3Variants: Variants = {
  initial: { x: '-100%', y: '100%', opacity: 0.6 },
  animate: {
    x: '0%',
    y: '0%',
    opacity: 0.9, // Layering opacity
    transition: { duration: PANEL_ANIM_DURATION * 0.8, ease: SOFT_EASE, delay: 0.2 },
  },
  exit: {
    x: '-100%',
    y: '100%',
    opacity: 0.6,
    transition: { duration: PANEL_ANIM_DURATION * 0.5, ease: SOFT_EASE },
  },
};

// --- Content (Nav Items & Close Button) Animations --- 
const contentGroupVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: PANEL_ANIM_DURATION * 0.5, // Wait for panels to be substantially in
      staggerChildren: 0.1,
      duration: ITEM_ANIM_DURATION,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: ITEM_ANIM_DURATION * 0.5, staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants: Variants = {
  initial: { opacity: 0, y: 25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: ITEM_ANIM_DURATION, ease: SOFT_EASE },
  },
  exit: {
    opacity: 0,
    y: 15,
    transition: { duration: ITEM_ANIM_DURATION * 0.6, ease: SOFT_EASE },
  },
};

const closeButtonVariants: Variants = {
  initial: { opacity: 0, scale: 0.7 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: ITEM_ANIM_DURATION, ease: SOFT_EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    transition: { duration: ITEM_ANIM_DURATION * 0.6, ease: SOFT_EASE },
  },
};

const DynamicCascadeMenu: React.FC<DynamicCascadeMenuProps> = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  // For this concept, we'll use 3 distinct panels with specific positions and sizes.
  // We can adjust these classes for different looks.

  return (
    <AnimatePresence mode="wait"> {/* 'wait' ensures one animation completes before next on open/close switch */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden cursor-none"
          variants={menuContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Panel 1: Top section */}
          <motion.div
            variants={panel1Variants}
            className="absolute top-0 left-0 w-full h-full bg-neutral-900 shadow-2xl"
          // style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }} // Example: angled bottom
          />

          {/* Panel 2: Right vertical strip */}
          <motion.div
            variants={panel2Variants}
            className="absolute top-0 right-0 w-[40vw] h-full bg-neutral-800 shadow-xl"
          // style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }} // Example: angled left
          />

          {/* Panel 3: Bottom-left accent */}
          <motion.div
            variants={panel3Variants}
            className="absolute bottom-0 left-0 w-[50vw] h-[40vh] bg-neutral-850 shadow-lg"
          // style={{ clipPath: 'polygon(0 0, 100% 10%, 90% 100%, 0 90%)' }} // Example: custom shape
          />

          {/* Content Group: Nav items and Close button, appears on top */}
          <motion.div
            className="relative z-50 flex flex-col items-center justify-center w-full max-w-2xl p-8"
            variants={contentGroupVariants}
          >
            <motion.button
              onClick={onClose}
              className="absolute text-white top-8 right-8 md:top-12 md:right-12 hover:text-neutral-300"
              aria-label="Close menu"
              variants={closeButtonVariants} // Inherits initial/animate/exit from parent if not specified
            >
              <X size={40} />
            </motion.button>

            <nav className="mt-20 text-center md:mt-0">
              <ul className="space-y-5 md:space-y-7">
                {navItems.map((item) => (
                  <motion.li key={item.id} variants={menuItemVariants}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block text-4xl font-medium tracking-wider text-white uppercase md:text-5xl lg:text-6xl hover:text-neutral-300 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* CustomCursor should be outside the main animating menu div if it needs to persist or not be affected by its exit */}
          {/* For now, keeping it here means it will only show when menu is open */}
          <CustomCursor />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicCascadeMenu; 