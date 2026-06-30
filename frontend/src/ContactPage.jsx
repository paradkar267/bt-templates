import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowLeft, Send, Loader2, Sparkles, MessageCircle, HeadphonesIcon } from 'lucide-react';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';
import { toast } from 'sonner';
import { Logo } from './components/ui/Logo';

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans pb-32 transition-colors duration-1000 ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-gray-50 text-black'}`}>
      
      {/* Navigation */}
      <nav className={`h-[80px] w-full px-8 md:px-16 flex items-center justify-between border-b sticky top-0 z-50 shadow-sm transition-colors duration-1000 ${isDark ? 'bg-black/40 border-white/10 text-white backdrop-blur-md' : 'bg-white/80 border-gray-200 text-black backdrop-blur-md'}`}>
        <Logo />
        <div className="flex items-center gap-6">
          <UserMenu />
        </div>
      </nav>

      <main className="max-w-7xl w-full mx-auto px-4 pt-16 sm:px-6 lg:px-8 relative">
        {/* Background Blobs for Aesthetic */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />

        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white mb-8 transition-colors self-start relative z-10">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-black dark:bg-white text-white dark:text-black mb-6 shadow-xl shadow-black/10 dark:shadow-white/10">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Have a question about our templates, need custom work, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 relative z-10">
          
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours. We are available Monday to Friday, 9:00 AM to 6:00 PM EST.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email Us</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Our friendly team is here to help.</p>
                  <a href="mailto:hello@bizleap.com" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">hello@bizleap.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Visit Us</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Come say hello at our office HQ.</p>
                  <p className="font-bold">123 Innovation Drive<br/>Tech City, TC 10012</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Call Us</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15551234567" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">+1 (555) 123-4567</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-black/5 dark:shadow-black/50">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Send className="w-5 h-5 text-gray-400" /> Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">First Name</label>
                  <input name="firstName" required type="text" placeholder="John" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Last Name</label>
                  <input name="lastName" required type="text" placeholder="Doe" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Email</label>
                <input name="email" required type="email" placeholder="you@company.com" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Subject</label>
                <select name="subject" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium text-gray-900 dark:text-white">
                  <option>General Inquiry</option>
                  <option>Support</option>
                  <option>Custom Template</option>
                  <option>Billing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Message</label>
                <textarea name="message" required rows="4" placeholder="How can we help you?" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium resize-none"></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white dark:bg-white dark:text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/10 disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
