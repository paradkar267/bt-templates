import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-32 pb-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">

          {/* Brand & Newsletter */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif font-light mb-1 tracking-wider uppercase">Vanguard</h2>
            <p className="font-sans text-[10px] font-light tracking-[0.3em] text-accent uppercase mb-10">International Realty</p>
            <p className="text-white/60 mb-8 max-w-sm font-light leading-relaxed text-sm">
              Curating the world's most exceptional properties for the most discerning clientele.
            </p>

            <form className="flex max-w-md relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="SUBSCRIBE TO OUR NEWSLETTER"
                className="bg-transparent border-b border-white/20 focus:border-accent text-white px-0 py-3 w-full outline-none transition-colors placeholder:text-white/40 text-[10px] uppercase tracking-[0.2em]"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-accent hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 font-medium">Explore</h3>
            <ul className="space-y-4 text-sm font-light text-white/80">
              <li><Link to="/listings" className="hover:text-accent transition-colors duration-300">Properties</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors duration-300">Agents</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors duration-300">Market Reports</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors duration-300">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 font-medium">Offices</h3>
            <ul className="space-y-6 text-sm font-light">
              <li>
                <p className="text-white mb-2 tracking-wide">New York</p>
                <p className="text-white/60">157 W 57th St, NY 10019</p>
              </li>
              <li>
                <p className="text-white mb-2 tracking-wide">London</p>
                <p className="text-white/60">24 Charles St, W1J 5DT</p>
              </li>
              <li>
                <p className="text-white mb-2 tracking-wide">Los Angeles</p>
                <p className="text-white/60">1181 N Hillcrest Rd, CA 90210</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} Vanguard Real Estate. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
