'use client';

import { useMarket } from '../components/MarketProvider';
import PortfolioSummary from '../components/PortfolioSummary';
import HoldingCard from '../components/HoldingCard';
import { sortStocks } from '../lib/utils';
import { useState } from 'react';

export default function PortfolioPage() {
  const { stocks, portfolio } = useMarket();
  const [sortBy, setSortBy] = useState<'symbol' | 'value' | 'gainLoss' | 'dayChange'>('value');

  const sortedHoldings = [...portfolio.holdings].sort((a, b) => {
    switch (sortBy) {
      case 'symbol':
        return a.symbol.localeCompare(b.symbol);
      case 'value':
        return b.totalValue - a.totalValue;
      case 'gainLoss':
        return b.gainLoss - a.gainLoss;
      case 'dayChange':
        return b.dayChange - a.dayChange;
      default:
        return 0;
    }
  });

  const totalInvested = portfolio.holdings.reduce((sum, h) => sum + h.totalCost, 0);
  const totalGainLoss = portfolio.holdings.reduce((sum, h) => sum + h.gainLoss, 0);
  const sectors = [...new Set(portfolio.holdings.map(h => {
    const stock = stocks.find(s => s.symbol === h.symbol);
    return stock?.sector || 'Unknown';
  }))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-gray-400">
          Detailed view of your holdings and performance
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="mb-8">
        <PortfolioSummary portfolio={portfolio} />
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Total Invested</h3>
          <p className="text-white text-xl font-bold">
            ${totalInvested.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Total Gain/Loss</h3>
          <p className={`text-xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${Math.abs(totalGainLoss).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Number of Holdings</h3>
          <p className="text-white text-xl font-bold">{portfolio.holdings.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Sectors</h3>
          <p className="text-white text-xl font-bold">{sectors.length}</p>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Holdings</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="value">Value</option>
              <option value="symbol">Symbol</option>
              <option value="gainLoss">Total Gain/Loss</option>
              <option value="dayChange">Day Change</option>
            </select>
          </div>
        </div>

        {sortedHoldings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedHoldings.map((holding) => {
              const stock = stocks.find(s => s.symbol === holding.symbol);
              return (
                <HoldingCard
                  key={holding.symbol}
                  holding={holding}
                  stockName={stock?.name}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">You don't have any holdings yet.</p>
            <a
              href="/trade"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Start Trading
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
