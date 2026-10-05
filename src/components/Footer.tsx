import React from 'react';
import { Mountain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-stone-900 text-stone-400 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-stone-800 flex items-center justify-center text-emerald-400">
              <Mountain className="w-4 h-4" />
            </div>
            <div>
              <a
                href="https://amazon-hike.com/"
                className="text-stone-100 hover:text-emerald-400 font-bold transition-colors text-base"
              >
                亞馬遜國家山岳協會
              </a>
              <p className="text-xs text-stone-400 mt-0.5">
                推廣登山安全、輕量化健行與山林無痕環境守護
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://amazon-hike.com/"
              className="text-stone-400 hover:text-stone-200 transition-colors"
            >
              協會首頁
            </a>
            <span className="text-stone-700">·</span>
            <a
              href="https://amazon-hike.com/tool01/"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              登山裝備重量計算工具
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
