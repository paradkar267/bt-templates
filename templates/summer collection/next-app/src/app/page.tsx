import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#a6d1c8] selection:text-white">
      {/* Top Header */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-white">
        <div className="w-12 h-12 flex items-center justify-center">
          {/* Logo Placeholder */}
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 L20 30 L30 10 M15 10 L20 20 L25 10" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="20" cy="20" r="18" stroke="#333" strokeWidth="1.5"/>
          </svg>
        </div>
        
        <div className="flex-1 max-w-4xl mx-8 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" className="w-full border border-gray-300 rounded-full py-2.5 pl-12 pr-6 focus:outline-none focus:border-gray-500 transition-colors" />
        </div>

        <div className="flex items-center gap-5">
          <button className="text-gray-700 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
          <button className="text-gray-700 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
          <button className="text-gray-700 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[650px] w-full bg-[#82c1d9] overflow-hidden">
        {/* We use an image with a similar beach/summer vibe */}
        <img src="https://images.unsplash.com/photo-1533036662496-d8d1722e1189?q=80&w=2000&auto=format&fit=crop" alt="Summer Fashion" className="absolute inset-0 w-full h-full object-cover object-top" />
        
        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col pt-24 px-16">
          <h1 className="text-[120px] font-serif italic text-white drop-shadow-md leading-[0.9] -ml-2">
            Hot Like<br/>
            <span className="font-sans font-bold italic text-[140px]">Summer</span>
          </h1>
          <p className="text-white text-3xl font-serif mt-12 drop-shadow-md">
            The Collection That Finally<br/>
            <span className="font-bold">Gets It Right</span>
          </p>
        </div>
      </section>

      {/* Navigation Links */}
      <nav className="flex justify-center items-center gap-10 py-10 bg-white sticky top-0 z-40 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <a href="#" className="text-sm font-semibold tracking-[0.15em] text-gray-500 hover:text-black transition-colors">SHOP</a>
        <a href="#" className="text-sm font-semibold tracking-[0.15em] text-gray-500 hover:text-black transition-colors">WOMEN'S</a>
        <a href="#" className="text-sm font-semibold tracking-[0.15em] text-gray-500 hover:text-black transition-colors">MEN'S</a>
        <a href="#" className="text-sm font-semibold tracking-[0.15em] text-gray-500 hover:text-black transition-colors">KIDS</a>
        <a href="#" className="text-sm font-semibold tracking-[0.15em] text-gray-500 hover:text-black transition-colors">ABOUT</a>
        <a href="#" className="text-sm font-semibold tracking-[0.15em] text-gray-500 hover:text-black transition-colors">JOURNAL</a>
      </nav>

      {/* Couple's Collection */}
      <section className="max-w-[1400px] mx-auto py-24 px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] w-full max-w-[500px] mx-auto group overflow-hidden">
            <img src="https://images.unsplash.com/photo-1582236166547-2b5ba38de283?q=80&w=1000&auto=format&fit=crop" alt="Couple" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-sm font-medium tracking-[0.2em] mb-2 text-white/80">CASUAL CHIC</p>
              <h2 className="text-4xl font-serif italic mb-2 tracking-wide">SUMMER</h2>
              <h2 className="text-4xl font-serif uppercase tracking-[0.2em]">FASHION</h2>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="pr-10 lg:pr-24">
            <h2 className="text-5xl font-serif italic text-[#3c3e29] mb-12">COUPLE'S COLLECTION</h2>
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-lg mb-16">
              <p>
                nisl. Donec tempor at, felis. Donec malesuada Donec ex. ipsum lacus eget tempor maximus amet, ex vitae tincidunt libero, viverra adipiscing lobortis, In at id
              </p>
              <p>
                laoreet orci tincidunt Morbi ipsum porta non, ultrices scelerisque ultrices urna. amet, non. Ut efficitur. sollicitudin. non, sit libero, Quisque eu ex elit
              </p>
            </div>
            <button className="border border-black rounded-full px-10 py-4 text-sm font-bold tracking-[0.1em] hover:bg-black hover:text-white transition-all flex items-center gap-6 group">
              EXPLORE MORE 
              <svg className="transform group-hover:translate-x-2 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Brand Banner */}
      <section className="px-8 pb-24 max-w-[1400px] mx-auto">
        <div className="bg-[#f6f5ed] rounded-[40px] p-16 md:p-24 flex flex-col md:flex-row items-center gap-16 md:gap-32">
          {/* Logo Graphic */}
          <div className="flex flex-col items-center">
            <svg width="180" height="150" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10 L60 140 L100 20 M60 140 L140 140 M180 10 L140 140 L100 20" stroke="#524340" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M90 20 L100 10 L110 20" stroke="#524340" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M100 10 L100 40" stroke="#524340" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex justify-between w-[220px] mt-6 relative pb-2 border-b-2 border-gray-400">
              {/* barcode like pattern */}
              <div className="absolute top-full left-0 w-full h-3 flex justify-between px-1">
                <div className="w-[1px] h-full bg-gray-500"></div><div className="w-[2px] h-full bg-gray-500"></div><div className="w-[1px] h-full bg-gray-500"></div><div className="w-[3px] h-full bg-gray-500"></div><div className="w-[1px] h-full bg-gray-500"></div><div className="w-[2px] h-full bg-gray-500"></div><div className="w-[1px] h-full bg-gray-500"></div><div className="w-[2px] h-full bg-gray-500"></div><div className="w-[1px] h-full bg-gray-500"></div><div className="w-[3px] h-full bg-gray-500"></div>
              </div>
              <span className="text-[10px] tracking-[0.4em] font-medium text-gray-500 pt-5">WEAR</span>
              <span className="text-[10px] tracking-[0.4em] font-medium text-gray-500 pt-5">OCCASIONS</span>
            </div>
          </div>
          
          <div className="max-w-xl text-lg text-gray-800 leading-relaxed font-serif">
            Praesent Quisque est. Sed nec urna. sodales. Nunc elit placerat venenatis Nullam non, Praesent placerat. id felis, quam Sed  ncjdcn mdncuc m jhehfc kmddedc
          </div>
        </div>
      </section>

      {/* Large Image - Boat */}
      <section className="relative w-full h-[700px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544473244-f6895e69af8e?q=80&w=2000&auto=format&fit=crop" alt="Men on boat" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-0 w-full text-center px-4">
          <h2 className="text-[#f1f0da] text-6xl md:text-[80px] font-sans font-light tracking-[0.15em] drop-shadow-md mix-blend-overlay opacity-90">
            ONE <span className="text-4xl md:text-5xl font-serif italic mx-4 tracking-normal font-normal">WITH THE</span> SUN
          </h2>
        </div>
      </section>

      {/* Large Image - Pier */}
      <section className="relative w-full h-[750px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=2000&auto=format&fit=crop" alt="People on pier" className="w-full h-full object-cover object-bottom" />
      </section>

      {/* Text block footer */}
      <section className="py-32 px-8 max-w-4xl mx-auto text-center space-y-8">
        <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
          lacus amet, elementum Lorem tincidunt varius ultrices at, maximus fringilla tortor. elementum Lorem at, nec non ipsum amet, est. nibh viverra odio sit sapien non risus felis, placerat vitae faucibus ullamcorper faucibus nisi lacus tempor
        </p>
        <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
          luctus eget Nunc id vitae nibh quis lacus facilisis dolor lacus efficitur. amet, diam tincidunt gravida gravida quis Donec elit In elit placerat nulla, at, non, orci lorem. non, vitae varius non. viverra lacus, enim. sed leo. porta cursus
        </p>
      </section>
    </div>
  );
}
