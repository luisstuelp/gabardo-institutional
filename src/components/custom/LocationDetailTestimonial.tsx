'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LocationDetailTestimonialProps {
  location: {
    testimonial?: {
      text?: string;
      author?: string;
      role?: string;
    };
  };
}

const LocationDetailTestimonial: React.FC<LocationDetailTestimonialProps> = ({ location }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-6xl text-white/20">
              &ldquo;
            </div>
            
            {/* Testimonial Text */}
            <p className="text-xl md:text-2xl leading-relaxed mb-8 relative z-10">
              {location.testimonial?.text || 'Experiência excepcional de trabalho neste espaço único e inspirador.'}
            </p>
            
            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">
                  {location.testimonial?.author?.charAt(0) || 'C'}
                </span>
              </div>
              <div className="text-left">
                <div className="font-bold">
                  {location.testimonial?.author || 'Cliente Satisfeito'}
                </div>
                <div className="text-white/80 text-sm">
                  {location.testimonial?.role || 'Empresário'}
                </div>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationDetailTestimonial; 