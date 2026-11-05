// ==============================================================================
// FILE: frontend/app/components/NewsEngine.tsx
// WHAT IT IS: Clean, Minimalist News Wire Component
// ==============================================================================

'use client';

import React, { useState, useEffect } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedTime: string;
  summary: string;
  category: string;
  url: string;
}

export default function NewsEngine() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchNewsWire = () => {
      setLoading(true);

      const feed: NewsArticle[] = [
        {
          id: 'wire-1',
          title: 'Global Economy & Central Bank Policy Tracking',
          source: 'Financial Times',
          publishedTime: 'Published 35 mins ago',
          summary: 'In-depth coverage on international monetary policy shifts, global growth buffers, and central bank interest rate trajectories across Western and Asian economies.',
          category: 'Macroeconomics',
          url: 'https://www.ft.com/global-economy'
        },
        {
          id: 'wire-2',
          title: 'Gold Markets & Bullion Safe-Haven Flow Analysis',
          source: 'Reuters',
          publishedTime: 'Published 1 hour ago',
          summary: 'Active reporting on XAU/USD price action, institutional bullion reserves, and geopolitical safe-haven positioning across global commodity desks.',
          category: 'Commodities (XAU)',
          url: 'https://www.reuters.com/markets/commodities/'
        },
        {
          id: 'wire-3',
          title: 'Crypto Institutional Flows & Bitcoin Technical Resistance',
          source: 'Bloomberg',
          publishedTime: 'Published 2 hours ago',
          summary: 'Real-time tracking of spot ETF volume, digital asset liquidity brackets, and institutional capital deployment into Bitcoin and major tokens.',
          category: 'Crypto (BTC)',
          url: 'https://www.bloomberg.com/crypto'
        },
        {
          id: 'wire-4',
          title: 'FT Swap Notes & Macroeconomic Policy Insights',
          source: 'Financial Times',
          publishedTime: 'Published 3 hours ago',
          summary: 'Specialized commentary on debt markets, currency swaps, liquidity mechanics, and regulatory adjustments impacting global financial institutions.',
          category: 'Macroeconomics',
          url: 'https://www.ft.com/global-economy'
        },
        {
          id: 'wire-5',
          title: 'Energy, Oil Futures & Global Supply Chain Rebalancing',
          source: 'Reuters',
          publishedTime: 'Published 4.5 hours ago',
          summary: 'Comprehensive updates on crude oil inventories, shipping corridors, and supply constraints affecting international industrial sectors.',
          category: 'Commodities (XAU)',
          url: 'https://www.reuters.com/business/energy/'
        }
      ];

      setArticles(feed);
      setLoading(false);
    };

    fetchNewsWire();
  }, []);

  const categories = ['All', 'Commodities (XAU)', 'Crypto (BTC)', 'Macroeconomics'];

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="bg-white border border-slate-200/80 p-6 md:p-10 rounded-3xl shadow-sm max-w-4xl mx-auto space-y-8 font-sans">
      
      {/* HEADER */}
      <div className="text-center space-y-2 border-b border-slate-100 pb-6">
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">News Wire</h3>
        <p className="text-slate-500 text-sm">
          Real-time market reporting and institutional financial updates.
        </p>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES FEED */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm animate-pulse">
            Loading market news wire...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No articles found for this category.
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-slate-300 transition-all">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 bg-slate-200/70 px-2.5 py-1 rounded-md">
                    {article.source}
                  </span>
                  <span className="text-slate-500 font-medium">• {article.publishedTime}</span>
                </div>
                <span className="text-slate-400">{article.category}</span>
              </div>

              <h4 className="text-xl font-bold text-slate-900">
                {article.title}
              </h4>

              <p className="text-slate-600 text-sm leading-relaxed">{article.summary}</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                  className="text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                >
                  Verify on {article.source} ➔
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}