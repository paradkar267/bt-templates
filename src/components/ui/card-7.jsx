import * as React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "../../CartContext";

export function InteractiveProductCard({
  className = "",
  template,
  ...props
}) {
  const { addToCart, cartItems } = useCart();
  const cardRef = React.useRef(null);
  const [tiltStyle, setTiltStyle] = React.useState({});
  const [hovered, setHovered] = React.useState(false);
  const inCart = cartItems.some(item => item.id === template.id);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -6;
    const rotateY = ((x - width / 2) / (width / 2)) * 6;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-in-out",
    });
  };

  const categoryStyles = {
    'Figma':        'bg-violet-100 text-violet-700',
    'Next.js':      'bg-slate-900 text-white',
    'React':        'bg-cyan-100 text-cyan-700',
    'Webflow':      'bg-blue-100 text-blue-700',
    'Framer':       'bg-pink-100 text-pink-700',
    'Shopify':      'bg-green-100 text-green-700',
    'HTML':         'bg-orange-100 text-orange-700',
    'Tailwind':     'bg-sky-100 text-sky-700',
    'React Native': 'bg-cyan-100 text-cyan-700',
  };
  const catStyle = categoryStyles[template.category] || 'bg-gray-100 dark:bg-gray-800 text-gray-600';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative w-full rounded-[1.75rem] bg-white dark:bg-black border border-black/[0.06] flex flex-col cursor-pointer
        hover:border-violet-200 hover:shadow-[0_20px_50px_rgba(120,80,255,0.12)]
        shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-500 ${className}`}
      {...props}
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-[1.75rem] bg-gray-100 dark:bg-gray-800">
        <img
          src={template.image}
          alt={template.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${catStyle} shadow-sm`}>
            {template.category}
          </span>
        </div>

        {/* Hover action overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center gap-3 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <Link
            to={`/product/${template.id}`}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-black text-black dark:text-white text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            <Eye className="w-4 h-4" /> View
          </Link>
          <button
            onClick={e => { e.preventDefault(); addToCart(template); }}
            className={`p-2.5 rounded-full hover:scale-105 transition-all shadow-xl ${inCart ? 'bg-green-500 text-white' : 'bg-violet-600 hover:bg-violet-700 text-white'}`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <Link to={`/product/${template.id}`} className="flex flex-col flex-1 p-5 bg-white dark:bg-black rounded-b-[1.75rem]">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{template.tag}</p>
        <h3 className="font-black text-[15px] leading-tight text-gray-900 dark:text-gray-100 group-hover:text-violet-700 line-clamp-2 mb-1
          transition-colors" style={{ color: hovered ? '#7c3aed' : '#111827' }}>
          {template.title}
        </h3>
        <p className="text-xs text-gray-400 mb-4">by <span className="text-gray-600 font-semibold">{template.author}</span></p>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-black/[0.04]">
          <div className="flex flex-col gap-0.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(template.rating) ? 'fill-current' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{template.sales.toLocaleString()} sales</span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-gray-100">${template.price}</div>
        </div>
      </Link>
    </div>
  );
}
