import React from 'react';
import { useNavigate } from 'react-router-dom';
import landing_bg from "../assets/landing_bg.jpg"
import { Wallet, BarChart3, ShieldCheck, Layers } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

    const moneyBgImage = landing_bg;

  return (
    <div className="relative min-h-screen bg-slate-100/50 text-slate-900 font-sans overflow-x-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 blur-[1px]"
        style={{ 
          backgroundImage: `url('${moneyBgImage}')` 
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center px-6 md:px-12">
        {/* Navbar */}
        <nav className="w-full max-w-7xl flex justify-between items-center py-6 border-b border-slate-200/70 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-950">
            <Wallet className="w-8 h-8 text-[#7c3aed]" strokeWidth={2.5} /> Money Manager
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-slate-700 transition-all border border-slate-300 hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-5 py-2 rounded-lg font-semibold text-sm bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all shadow-md shadow-[#7c3aed]/15 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="flex flex-col items-center text-center max-w-4xl mt-24 md:mt-32 mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-slate-950">
            Smart Tracking, <br />
            <span className="text-[#7c3aed]">Financial Clarity.</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-slate-700 max-w-2xl leading-relaxed">
            Take command of your wealth with an intuitive expense and budget manager built for modern life.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
            <button 
              onClick={() => navigate('/signup')}
              className="px-10 py-4 rounded-xl font-bold text-lg bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#7c3aed]/20 cursor-pointer"
            >
              Get Started for Free
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-10 py-4 rounded-xl font-bold text-lg bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-100 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Welcome Back
            </button>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mb-24">
          <div className="bg-white border border-slate-200/70 p-9 rounded-3xl shadow-lg shadow-slate-100 hover:border-[#7c3aed]/20 hover:shadow-[#7c3aed]/5 transition-all group">
            <div className="text-3xl mb-6 bg-[#f3e8ff] w-14 h-14 flex items-center justify-center rounded-2xl text-[#7c3aed] group-hover:scale-105 transition-transform">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">Dynamic Insights</h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Visualize your spending habits with clean, dynamic summaries powered by real-time backend calculations.
            </p>
          </div>
          <div className="bg-white border border-slate-200/70 p-9 rounded-3xl shadow-lg shadow-slate-100 hover:border-[#7c3aed]/20 hover:shadow-[#7c3aed]/5 transition-all group">
            <div className="text-3xl mb-6 bg-[#f3e8ff] w-14 h-14 flex items-center justify-center rounded-2xl text-[#7c3aed] group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">Secure & Private</h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Your financial records are strictly secured by robust backend authentication.
            </p>
          </div>
          <div className="bg-white border border-slate-200/70 p-9 rounded-3xl shadow-lg shadow-slate-100 hover:border-[#7c3aed]/20 hover:shadow-[#7c3aed]/5 transition-all group">
            <div className="text-3xl mb-6 bg-[#f3e8ff] w-14 h-14 flex items-center justify-center rounded-2xl text-[#7c3aed] group-hover:scale-105 transition-transform">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">Effortless Budgeting</h3>
            <p className="text-slate-600 leading-relaxed text-base">
              Organize transactions by flexible categories like Food, Bills, and Shopping.
            </p>
          </div>
        </section>
        <footer className="w-full max-w-7xl mt-auto py-8 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Money Manager. All rights reserved.</p>
          <p className="hidden sm:block">Securely managed. Smartly spent.</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;