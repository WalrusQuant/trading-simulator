'use client';

import { useMarket } from '../components/MarketProvider';
import StockCard from '../components/StockCard';
import { useState } from 'react';
import { sortStocks } from '../lib/utils';

export default function TradePage() {
  const { stocks, portfolio } = useMarket();
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'symbol' | 'price' | 'change' | 'volume'>('symbol');

  const sectors = ['All', ...new Set(stocks.map(s => s.sector))];

  const filteredStocks = stocks
    .filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = sectorFilter === 'All' || stock.sector === sectorFilter;
      return matchesSearch && matchesSector;
    });

  const sortedStocks = sortStocks(filteredStocks, sortBy, 'desc');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Trade Stocks</h1>
        <p className="text-gray-400">
          Browse and trade from our selection of {stocks.length} stocks
        </p>
      </div>

      {/* Account Info */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-gray-400 text-sm mb-1">Available Cash</h3>
            <p className="text-white text-2xl font-bold">
              ${portfolio.cash.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm mb-1">Portfolio Value</h3>
            <p className="text-white text-2xl font-bold">
              ${portfolio.totalValue.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm mb-1">Buying Power</h3>
            <p className="text-white text-2xl font-bold">
              ${portfolio.cash.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by symbol or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Sector</label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="symbol">Symbol</option>
              <option value="price">Price</option>
              <option value="change">% Change</option>
              <option value="volume">Volume</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {sortedStocks.length} of {stocks.length} stocks
        </p>
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            showActions={true}
          />
        ))}
      </div>

      {sortedStocks.length === 0 && (
        <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
          <p className="text-gray-400">No stocks found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
