import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Breadcrumb: React.FC = () => {
  return (
    <div className="flex items-center mb-6">
      {/* 2-tier Breadcrumb nav */}
      <nav aria-label="麵包屑導覽" className="flex items-center space-x-2 text-sm text-stone-400">
        <a
          href="https://amazon-hike.com/"
          className="text-stone-300 hover:text-emerald-400 font-medium transition-colors"
        >
          亞馬遜國家山岳協會
        </a>
        <ChevronRight className="w-4 h-4 text-stone-600 shrink-0" />
        <span className="text-stone-100 font-semibold truncate">
          登山裝備重量計算工具
        </span>
      </nav>
    </div>
  );
};
