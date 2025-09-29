
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface CaseStudy {
  client: string;
  title: string;
  summary: string;
  imageUrl: string;
  logoUrl?: string;
  slug: string;
}

interface CaseStudyCardProps {
  study: CaseStudy;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study }) => {
  return (
    <Link href={`/cases-de-sucesso/${study.slug}`} passHref>
      <a className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden">
        <div className="relative w-full h-56">
          <Image
            src={study.imageUrl}
            alt={study.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {study.logoUrl && (
            <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-md shadow-sm">
              <div className="relative h-8 w-24">
                <Image
                  src={study.logoUrl}
                  alt={`${study.client} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{study.summary}</p>
          <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
            Ver Estudo de Caso
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CaseStudyCard;
