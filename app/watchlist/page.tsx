'use client';

import { useEffect, useState } from 'react';
import { useMarket } from '../components/MarketProvider';
import StockCard from '../components/StockCard';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../lib/storage';
import { WatchlistItem } from '../lib/types';

export default function WatchlistPage() {
  const { stocks } = useMarket();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const watchlistStocks = watchlist
    .map(item => stocks.find(s => s.symbol === item.symbol))
    .filter(stock => stock !== undefined);

  const availableStocks = stocks
    .filter(stock => !watchlist.some(item => item.symbol === stock.symbol))
    .filter(stock =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10);

  const handleAdd = (symbol: string) => {
    addToWatchlist(symbol);
    setWatchlist(getWatchlist());
  };

  const handleRemove = (symbol: string) => {
    removeFromWatchlist(symbol);
    setWatchlist(getWatchlist());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Watchlist</h1>
        <p className="text-gray-400">
          Track your favorite stocks and monitor their performance
        </p>
      </div>

      {/* Watchlist */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Your Watchlist ({watchlistStocks.length})
        </h2>
        {watchlistStocks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlistStocks.map((stock) => (
              <div key={stock.symbol} className="relative">
                <StockCard stock={stock} showActions={true} />
                <button
                  onClick={() => handleRemove(stock.symbol)}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                  title="Remove from watchlist"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
            <p className="text-gray-400 mb-4">Your watchlist is empty.</p>
            <p className="text-gray-500 text-sm">Search and add stocks below to start tracking them.</p>
          </div>
        )}
      </section>

      {/* Add to Watchlist */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Add to Watchlist</h2>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-4">
          <input
            type="text"
            placeholder="Search stocks to add..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {searchTerm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableStocks.map((stock) => (
              <div key={stock.symbol} className="relative">
                <StockCard stock={stock} showActions={false} />
                <button
                  onClick={() => handleAdd(stock.symbol)}
                  className="absolute top-2 right-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  title="Add to watchlist"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}

        {searchTerm && availableStocks.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <p className="text-gray-400">No stocks found matching "{searchTerm}"</p>
          </div>
        )}
      </section>
    </div>
  );
}
