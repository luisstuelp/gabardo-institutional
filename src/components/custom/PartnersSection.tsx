'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

type TeamImage = {
  id: number;
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
};

const baseTeamImages: TeamImage[] = Array.from({ length: 15 }, (_, index) => {
  const id = index + 1;
  const fileName = `Equipe (${id}).png`;
  const encodedFileName = encodeURIComponent(fileName);

  return {
    id,
    src: `/images/${encodedFileName}`,
    alt: `Equipe Gabardo ${id}`,
  };
});

const teamImages: TeamImage[] = baseTeamImages;

const aspectRatioClasses = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[5/4]', 'aspect-[4/3]'];
const columnOffsetClasses = [
  'sm:translate-y-0',
  'sm:translate-y-10 lg:translate-y-16',
  'lg:-translate-y-16',
];

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 60,
    filter: 'blur(14px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.12 * i,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function PartnersSection() {
  const columnCount = 3;
  const columns: { image: TeamImage; index: number }[][] = Array.from({ length: columnCount }, () => []);

  teamImages.forEach((image, index) => {
    columns[index % columnCount].push({ image, index });
  });

  return (
    <section className="py-16 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight">Nossa Equipe</h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          Pessoas reais movendo a Gabardo diariamente. Momentos capturados nas operações, treinamentos e celebrações.
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              className={`flex flex-col gap-6 ${columnOffsetClasses[columnIndex] ?? ''}`}
            >
              {column.map(({ image, index }) => (
                <motion.div
                  key={image.id}
                  custom={index}
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`group relative overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow-xl ${aspectRatioClasses[index % aspectRatioClasses.length]}`}
                >
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 bg-gabardo-blue/5 opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                  />
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 90vw"
                    className="h-full w-full object-cover"
                    style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
