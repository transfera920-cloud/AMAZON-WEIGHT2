/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Tool01Page } from './components/Tool01Page';

export default function App() {
  // Normalize /tool01, /TOOL01, /Tool01, /TOOL01/ etc. strictly to lowercase /tool01/
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const lower = currentPath.toLowerCase();
      if (lower === '/tool01' || lower === '/tool01/') {
        if (currentPath !== '/tool01/') {
          window.history.replaceState(
            null,
            '',
            '/tool01/' + window.location.search + window.location.hash
          );
        }
      }
    }
  }, []);

  // Ensure fixed SEO metadata: title, description, canonical, og:url
  useEffect(() => {
    const title = '登山裝備重量計算工具｜亞馬遜國家山岳協會';
    const canonicalHref = 'https://amazon-hike.com/tool01/';
    const metaDesc =
      '實用的登山裝備重量計算工具，可依分類自訂整理背包各項裝備，即時自動統計單件、類別與整體背包重量，資料安全儲存於瀏覽器，是您規劃百岳與長程縱走輕量化的最佳幫手。';

    document.title = title;

    // Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalHref;

    // Meta description
    const metaDescriptionTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDescriptionTag) {
      metaDescriptionTag.content = metaDesc;
    }

    // OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.content = title;

    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    if (ogDesc) ogDesc.content = metaDesc;

    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) ogUrl.content = canonicalHref;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 font-sans selection:bg-emerald-800 selection:text-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Regardless of path, always display the Tool01Page */}
        <Tool01Page />
      </main>
      <Footer />
    </div>
  );
}
