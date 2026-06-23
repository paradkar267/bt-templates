'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressiveBlur } from './progressive-blur';

const categories = [
  {
    id: 'ui-kits',
    name: 'UI Kits',
    description: 'Premium Figma & React kits',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'dashboards',
    name: 'Dashboards',
    description: 'Data-rich React Admin Panels',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    description: 'High-converting Framer templates',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3d-assets',
    name: '3D Assets',
    description: 'Premium Spline & Blender objects',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  }
];

function CategoryCard({ category }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className='relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-3xl cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={category.image}
        alt={category.name}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-100'
        style={{ transform: isHover ? 'scale(1.05)' : 'scale(1)' }}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute bottom-0 left-0 h-[60%] w-full'
        blurIntensity={0.6}
        animate={isHover ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <motion.div
        className='absolute bottom-0 left-0 w-full'
        animate={isHover ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className='flex flex-col items-start gap-1 p-6 md:p-8'>
          <h3 className='text-3xl font-black text-white tracking-tight drop-shadow-md'>{category.name}</h3>
          <p className='text-lg font-medium text-white/90 drop-shadow-sm'>{category.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function ExploreCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
