import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center relative z-10">
      <div className="inline-flex items-center gap-3 mb-2">
        <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-6 h-6 text-cyan-400" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white">
          TOK<span className="text-cyan-400">MAX</span>
        </h1>
      </div>
      <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mt-2">
        AI-powered optimization for maximum <span className="text-pink-500 font-bold">virality</span> on TikTok.
      </p>
    </header>
  );
};

export default Header;
