import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">KINETIC<span className="text-accent">.</span></h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Curated essentials for the modern lifestyle. Premium quality meets exceptional design.
            </p>
            <div className="flex space-x-4">
              {/* Social icons placeholders */}
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <span className="sr-only">Instagram</span>
                ig
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <span className="sr-only">Twitter</span>
                tw
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Shop</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link to="/category/fashion" className="hover:text-accent transition-colors">Fashion</Link></li>
              <li><Link to="/category/accessories" className="hover:text-accent transition-colors">Accessories</Link></li>
              <li><Link to="/category/home" className="hover:text-accent transition-colors">Home Goods</Link></li>
              <li><Link to="/new" className="hover:text-accent transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Customer Care</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Join our newsletter</h4>
            <p className="text-muted-foreground mb-4">Sign up to receive 15% off your first order.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-3 rounded-l-md focus:outline-none focus:border-accent w-full text-primary-foreground"
              />
              <button 
                type="submit" 
                className="bg-accent text-accent-foreground px-6 py-3 rounded-r-md font-medium hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kinetic. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
