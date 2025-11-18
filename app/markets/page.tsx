'use client';

import { useMarket } from '../components/MarketProvider';
import StockCard from '../components/StockCard';
import { sortStocks, getSectorColor } from '../lib/utils';
import { useMemo } from 'react';

export default function MarketsPage() {
  const { stocks } = useMarket();

  const topGainers = sortStocks(stocks, 'change', 'desc').slice(0, 6);
  const topLosers = sortStocks(stocks, 'change', 'asc').slice(0, 6);
  const mostActive = sortStocks(stocks, 'volume', 'desc').slice(0, 6);

  const sectorPerformance = useMemo(() => {
    const sectors = [...new Set(stocks.map(s => s.sector))];
    return sectors.map(sector => {
      const sectorStocks = stocks.filter(s => s.sector === sector);
      const avgChange = sectorStocks.reduce((sum, s) => sum + s.dayChangePercent, 0) / sectorStocks.length;
      const topGainer = sectorStocks.reduce((max, s) => s.dayChangePercent > max.dayChangePercent ? s : max);
      const topLoser = sectorStocks.reduce((min, s) => s.dayChangePercent < min.dayChangePercent ? s : min);

      return {
        sector,
        change: avgChange,
        topGainer: topGainer.symbol,
        topLoser: topLoser.symbol,
        stockCount: sectorStocks.length,
      };
    }).sort((a, b) => b.change - a.change);
  }, [stocks]);

  const marketStats = useMemo(() => {
    const avgChange = stocks.reduce((sum, s) => sum + s.dayChangePercent, 0) / stocks.length;
    const gainers = stocks.filter(s => s.dayChangePercent > 0).length;
    const losers = stocks.filter(s => s.dayChangePercent < 0).length;
    const unchanged = stocks.length - gainers - losers;

    return { avgChange, gainers, losers, unchanged };
  }, [stocks]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Market Overview</h1>
        <p className="text-gray-400">
          Real-time market data and performance across sectors
        </p>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Market Average</h3>
          <p className={`text-3xl font-bold ${marketStats.avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {marketStats.avgChange >= 0 ? '+' : ''}{marketStats.avgChange.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Advancing</h3>
          <p className="text-green-400 text-3xl font-bold">{marketStats.gainers}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Declining</h3>
          <p className="text-red-400 text-3xl font-bold">{marketStats.losers}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-2">Unchanged</h3>
          <p className="text-gray-400 text-3xl font-bold">{marketStats.unchanged}</p>
        </div>
      </div>

      {/* Sector Performance */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Sector Performance</h2>
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Top Gainer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Top Loser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Stocks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sectorPerformance.map((sector) => (
                  <tr key={sector.sector} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: getSectorColor(sector.sector) }}
                        />
                        <span className="text-white font-medium">{sector.sector}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-bold ${sector.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-400">
                      {sector.topGainer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-400">
                      {sector.topLoser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {sector.stockCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Top Gainers */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Top Gainers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topGainers.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </section>

      {/* Top Losers */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Top Losers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topLosers.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </section>

      {/* Most Active */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Most Active</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mostActive.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </section>
    </div>
  );
}
