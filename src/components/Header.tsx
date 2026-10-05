import React from 'react';
import { Mountain } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name - Real hyperlink to https://amazon-hike.com/ without target="_blank" */}
          <div className="flex items-center space-x-3">
            <a
              href="https://amazon-hike.com/"
              className="group flex items-center space-x-2.5 text-stone-100 hover:text-emerald-400 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
              title="亞馬遜國家山岳協會"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow group-hover:bg-emerald-500 transition-colors">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight">
                亞馬遜國家山岳協會
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
