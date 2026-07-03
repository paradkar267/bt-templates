import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-fuchsia-500 selection:text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-32">
          <div className="text-xl font-bold tracking-tighter">alex.dev</div>
          <nav className="hidden md:flex space-x-8 text-sm text-zinc-400">
            <a href="#work" className="hover:text-white transition">Work</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-3 py-1 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-zinc-300 font-medium tracking-wide">Available for new opportunities</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            Building digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              experiences
            </span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-xl leading-relaxed mb-12">
            I'm a full-stack engineer specializing in building exceptional digital experiences. Currently focused on building accessible, human-centered products.
          </p>

          <div className="flex space-x-4">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition">
              View Work
            </button>
            <button className="border border-zinc-800 bg-zinc-900/50 px-6 py-3 rounded-lg font-semibold text-zinc-300 hover:bg-zinc-800 transition">
              Get in touch
            </button>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="mt-40">
          <h2 className="text-3xl font-bold mb-12 tracking-tight">Selected Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group relative">
              <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Vercel Dashboard</h3>
                  <span className="text-zinc-500 text-sm">2023</span>
                </div>
                <p className="text-zinc-400">A complete redesign of the core analytics dashboard.</p>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="group relative">
              <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Linear App</h3>
                  <span className="text-zinc-500 text-sm">2022</span>
                </div>
                <p className="text-zinc-400">Frontend engineering for the issue tracking tool.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
