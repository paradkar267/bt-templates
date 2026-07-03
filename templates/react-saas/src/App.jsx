import React from 'react'

function App() {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
          <span className="text-xl font-bold">NexusApp</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition">Features</a>
          <a href="#" className="hover:text-indigo-600 transition">Testimonials</a>
          <a href="#" className="hover:text-indigo-600 transition">Pricing</a>
        </div>
        <div className="flex space-x-4">
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Login</button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center px-3 py-1 mb-8 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
          ✨ Introducing AI Analytics 2.0
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-slate-900 leading-tight">
          Supercharge your workflow with <span className="text-indigo-600">smart tools</span>
        </h1>
        <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
          NexusApp gives your team the superpowers they need to scale faster. Built for modern product teams who want to move at the speed of thought.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            Start your free trial
          </button>
          <button className="px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 transition">
            Book a demo
          </button>
        </div>

        {/* Dashboard Mockup */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="flex items-center px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="aspect-[16/9] w-full bg-slate-100 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400">
              <span className="font-medium">App Dashboard Interface</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 NexusApp Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-900 transition">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition">Terms</a>
            <a href="#" className="hover:text-slate-900 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
