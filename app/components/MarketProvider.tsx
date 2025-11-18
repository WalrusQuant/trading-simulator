'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Stock, Portfolio, NewsItem } from '../lib/types';
import { initializeStocks } from '../lib/stocks';
import { getMarketEngine } from '../lib/marketEngine';
import { getPortfolio, updatePortfolio, getStocksFromCache, saveStocksToCache } from '../lib/storage';

interface MarketContextType {
  stocks: Stock[];
  portfolio: Portfolio;
  news: NewsItem[];
  isLoading: boolean;
  refreshPortfolio: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize stocks
    const cachedStocks = getStocksFromCache();
    const initialStocks = cachedStocks || initializeStocks();
    setStocks(initialStocks);

    // Initialize market engine
    const engine = getMarketEngine(initialStocks);

    // Initialize portfolio
    const initialPortfolio = updatePortfolio(initialStocks);
    setPortfolio(initialPortfolio);
    setNews(engine.getNews());
    setIsLoading(false);

    // Update prices every 5 seconds
    const interval = setInterval(() => {
      const updatedStocks = engine.updatePrices();
      setStocks([...updatedStocks]);
      saveStocksToCache(updatedStocks);

      // Update portfolio
      const updatedPortfolio = updatePortfolio(updatedStocks);
      setPortfolio(updatedPortfolio);
      setNews(engine.getNews());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshPortfolio = () => {
    if (stocks.length > 0) {
      const updatedPortfolio = updatePortfolio(stocks);
      setPortfolio(updatedPortfolio);
    }
  };

  if (!portfolio) {
    return null;
  }

  return (
    <MarketContext.Provider value={{ stocks, portfolio, news, isLoading, refreshPortfolio }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
