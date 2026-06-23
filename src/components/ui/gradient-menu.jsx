import React from 'react';
import { LayoutTemplate, Layers, Zap, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: 'Templates', icon: <LayoutTemplate />, gradientFrom: '#a955ff', gradientTo: '#ea51ff', link: '/templates' },
  { title: 'UI Kits', icon: <Layers />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED', href: '#catalog' },
  { title: 'Plugins', icon: <Zap />, gradientFrom: '#FF9966', gradientTo: '#FF5E62', href: '#catalog' },
  { title: 'Pricing', icon: <Box />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA', href: '#catalog' }
];

export default function GradientMenu() {
  const handleClick = (e, href) => {
    if (href === '#catalog') {
      e.preventDefault();
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <ul className="flex gap-4 lg:gap-6">
        {menuItems.map(({ title, icon, gradientFrom, gradientTo, link, href }, idx) => {
          const Wrapper = link ? Link : 'a';
          return (
            <li
              key={idx}
              style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo }}
              className="relative w-[50px] h-[50px] bg-white dark:bg-black shadow-md border border-gray-100 rounded-full flex items-center justify-center transition-all duration-500 hover:w-[140px] hover:shadow-none group cursor-pointer"
            >
              <Wrapper
                to={link}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="w-full h-full flex items-center justify-center absolute inset-0 z-20"
              >
                {/* Gradient background on hover */}
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100 -z-10"></span>
                {/* Blur glow */}
                <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-20 transition-all duration-500 group-hover:opacity-50"></span>

                {/* Icon */}
                <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0 flex items-center justify-center">
                  <span className="text-gray-500 flex items-center justify-center">{icon}</span>
                </span>

                {/* Title */}
                <span className="absolute text-white font-bold uppercase tracking-wide text-xs lg:text-sm transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
                  {title}
                </span>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
