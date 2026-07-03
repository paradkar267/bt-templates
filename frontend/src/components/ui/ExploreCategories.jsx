'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'ui-kits',
    name: 'UI Kits',
    description: 'Premium Figma & React kits',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
    link: '/ui-kits',
  },
  {
    id: 'dashboards',
    name: 'Dashboards',
    description: 'Data-rich React Admin Panels',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    link: '/templates',
  },
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    description: 'High-converting Framer templates',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    link: '/templates',
  },
  {
    id: '3d-assets',
    name: '3D Assets',
    description: 'Premium Spline & Blender objects',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    link: '/templates',
  }
];

function CategoryCard({ category }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className='relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-3xl cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => navigate(category.link)}
    >
      <img
        src={category.image}
        alt={category.name}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-100'
        style={{ transform: isHover ? 'scale(1.05)' : 'scale(1)' }}
      />
      {/* Always visible gradient overlay */}
      <div className='pointer-events-none absolute bottom-0 left-0 h-[50%] w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent' />
      <motion.div
        className='pointer-events-none absolute bottom-0 left-0 h-[70%] w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent'
        animate={isHover ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      {/* Always visible text */}
      <div className='absolute bottom-0 left-0 w-full'>
        <div className='flex flex-col items-start gap-1 p-6 md:p-8'>
          <h3 className='text-3xl font-black text-white tracking-tight drop-shadow-md'>{category.name}</h3>
          <p className='text-lg font-medium text-white/90 drop-shadow-sm'>{category.description}</p>
          <motion.span
            className='mt-2 text-sm font-bold text-white/70'
            animate={isHover ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            Browse →
          </motion.span>
        </div>
      </div>
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

