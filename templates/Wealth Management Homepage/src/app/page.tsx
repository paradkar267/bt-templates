import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-gray-200 selection:text-black">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tight">AlphaFinance</div>
        <div className="hidden md:flex gap-8 text-sm text-gray-500 font-medium">
          <a href="#" className="text-black border-b-2 border-black pb-1">Dashboard</a>
          <a href="#" className="hover:text-black transition-colors">Markets</a>
          <a href="#" className="hover:text-black transition-colors">Portfolio</a>
          <a href="#" className="hover:text-black transition-colors">Treasury</a>
          <a href="#" className="hover:text-black transition-colors">Impact</a>
        </div>
        <div className="flex items-center gap-5">
          <button className="text-gray-600 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>
          <button className="text-gray-600 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
          <div className="flex gap-3 ml-2">
            <button className="border border-gray-300 px-5 py-2 text-sm font-semibold rounded-sm hover:bg-gray-50 transition-colors">
              Sign In
            </button>
            <button className="bg-black text-white px-5 py-2 text-sm font-semibold rounded-sm hover:bg-gray-800 transition-colors">
              Open Account
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          {/* Blurred Background Image */}
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover opacity-60 blur-sm scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/90 via-gray-200/50 to-transparent"></div>
          </div>
          
          <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10 flex justify-between items-center h-full pt-12 pb-24">
            <div className="max-w-xl pr-8 mt-12 relative z-20">
              <h1 className="text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-6 text-gray-900 drop-shadow-sm">
                Legacy is built<br/>
                <span className="italic">over decades</span>, not days.
              </h1>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed font-medium">
                AlphaFinance Institutional Suite provides the surgical precision and stability required for multi-generational wealth preservation and strategic growth.
              </p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-8 py-3.5 text-sm font-semibold rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg">
                  Begin Planning <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
                <button className="border border-gray-400 bg-white/40 backdrop-blur-md text-black px-8 py-3.5 text-sm font-semibold rounded-sm hover:bg-white/60 transition-colors">
                  Explore Strategies
                </button>
              </div>
            </div>
            
            {/* Prominent Image */}
            <div className="hidden lg:block w-[700px] h-[480px] absolute right-0 top-1/2 -translate-y-1/2 rounded-[32px] overflow-hidden shadow-2xl z-10 mr-8">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" alt="Mountain Lake Reflection" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Portfolio Dynamics */}
        <section className="py-20 px-8 max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-2">Portfolio Dynamics</h2>
              <p className="text-gray-500 text-sm font-medium">Real-time performance metrics for Institutional Tier accounts.</p>
            </div>
            <div className="text-xs font-bold tracking-wider text-gray-500 uppercase flex items-center gap-2">
              Last Update: 14:02 EST <span className="w-2 h-2 rounded-full bg-emerald-500 block"></span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            {/* Chart Card */}
            <div className="border border-gray-200 rounded-sm p-8 flex flex-col relative overflow-hidden bg-white shadow-sm h-[400px]">
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">GROWTH INDEX</div>
                  <div className="text-3xl font-serif font-medium mb-1">$4,821,092.44</div>
                  <div className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    +12.4% Annualized
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-bold bg-[#1b1f2e] text-white rounded">1Y</button>
                  <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded">5Y</button>
                  <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded">MAX</button>
                </div>
              </div>
              
              {/* Abstract Chart Representation */}
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-80 z-0 pt-32 px-8 pb-12">
                 <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <path d="M0 180 Q 150 160 200 130 T 400 60 T 600 20" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="600" cy="20" r="4" fill="#111" />
                 </svg>
              </div>
            </div>

            {/* Allocation Card */}
            <div className="border border-gray-200 rounded-sm p-8 flex flex-col justify-between bg-white shadow-sm">
              <div>
                <h3 className="font-bold text-sm mb-8">Strategic Allocation</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>Blue Chip Equities</span>
                      <span className="font-bold">42%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-black h-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>Fixed Income</span>
                      <span className="font-bold">28%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gray-400 h-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>Alternative Assets</span>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>Liquid Cash</span>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gray-300 h-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-10 border border-gray-300 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors rounded-sm">
                Rebalance Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* Freedom by Design */}
        <section className="bg-[#f4f5f7] py-24">
          <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">Freedom by Design</h2>
              <p className="text-gray-600 mb-10 leading-relaxed font-medium max-w-lg">
                Our Retirement Intelligence engine analyzes 50+ variables to map your path to total financial independence. See how your current trajectory aligns with your vision.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Target Age</label>
                  <input type="text" defaultValue="62" className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-black font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Desired Income</label>
                  <input type="text" defaultValue="$250k/yr" className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-black font-medium" />
                </div>
              </div>
              <button className="bg-black text-white px-8 py-3.5 text-sm font-semibold rounded-sm hover:bg-gray-800 transition-colors w-full sm:w-auto">
                Run Full Simulation
              </button>
            </div>

            <div className="bg-white p-10 rounded-lg shadow-xl shadow-gray-200/50">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-bold">Projection</h3>
                <svg className="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
              </div>
              
              {/* Abstract Projection Graph UI */}
              <div className="space-y-4 mb-8">
                <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                <div className="h-3 bg-gray-100 rounded-full w-4/5"></div>
              </div>
              <div className="h-32 bg-gray-50 flex items-end gap-2 p-4 rounded border border-gray-100">
                <div className="w-1/12 bg-gray-300 h-1/4 rounded-t-sm"></div>
                <div className="w-1/12 bg-gray-300 h-2/4 rounded-t-sm"></div>
                <div className="w-1/12 bg-gray-400 h-3/4 rounded-t-sm"></div>
                <div className="w-1/12 bg-gray-400 h-full rounded-t-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* The Human Element */}
        <section className="py-24 px-8 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic mb-4">The Human Element</h2>
            <p className="text-gray-600 font-medium">Technology powers our insights; experts guide your journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="Julian Vance" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-300">SENIOR PARTNER</div>
                  <h3 className="text-2xl font-serif">Julian Vance, CFA</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic pr-4">
                "Preservation is the highest form of growth. We manage risk first, then capital."
              </p>
            </div>

            <div className="group">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Elena Rostova" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-300">WEALTH STRATEGIST</div>
                  <h3 className="text-2xl font-serif">Elena Rostova</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic pr-4">
                "We view wealth as a tool for legacy. Every portfolio is a blueprint for the future."
              </p>
            </div>

            <div className="bg-[#0a0a0a] text-white p-10 rounded-sm flex flex-col justify-center h-full min-h-[400px]">
              <h3 className="text-3xl font-serif leading-tight mb-10">Direct Access to<br/>Institutional Capital</h3>
              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex items-center gap-3">
                  <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span className="font-medium text-gray-200">Private Equity Directs</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span className="font-medium text-gray-200">SEC Regulated Custody</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span className="font-medium text-gray-200">Exclusive Yield Products</span>
                </li>
              </ul>
              <button className="w-full border border-gray-600 py-4 text-sm font-semibold hover:bg-white hover:text-black transition-colors rounded-sm">
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f0f1f3] py-12 px-8 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="text-xl font-bold">AlphaFinance</div>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-black transition-colors">Cookie Settings</a>
              <a href="#" className="hover:text-black transition-colors">Regulatory Disclosures</a>
              <a href="#" className="hover:text-black transition-colors">API Status</a>
              <a href="#" className="hover:text-black transition-colors">Contact Support</a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-[11px] text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
              AlphaFinance Global Markets is a member of FINRA/SIPC. All investment strategies involve risk of loss. Past performance is no guarantee of future results. The information provided does not constitute personalized financial advice.
            </p>
            <p className="text-[11px] text-gray-400">
              © 2024 AlphaFinance Global Markets. All rights reserved. Registered SEC/FINRA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
