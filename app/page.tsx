'use client';

import { useMarket } from './components/MarketProvider';
import PortfolioSummary from './components/PortfolioSummary';
import StockCard from './components/StockCard';
import HoldingCard from './components/HoldingCard';
import NewsCard from './components/NewsCard';
import Link from 'next/link';
import { sortStocks } from './lib/utils';

export default function DashboardPage() {
  const { stocks, portfolio, news, isLoading } = useMarket();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading market data...</div>
      </div>
    );
  }

  const topGainers = sortStocks(stocks, 'change', 'desc').slice(0, 3);
  const topLosers = sortStocks(stocks, 'change', 'asc').slice(0, 3);
  const recentNews = news.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Trading Dashboard</h1>
        <p className="text-gray-400">
          Practice trading with $100,000 virtual cash. Track your portfolio and learn investing strategies.
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="mb-8">
        <PortfolioSummary portfolio={portfolio} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Holdings and Top Movers */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Holdings */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Your Holdings</h2>
              <Link
                href="/portfolio"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View All →
              </Link>
            </div>
            {portfolio.holdings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.holdings.slice(0, 4).map((holding) => {
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
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <p className="text-gray-400 mb-4">You don't have any holdings yet.</p>
                <Link
                  href="/trade"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Start Trading
                </Link>
              </div>
            )}
          </section>

          {/* Top Gainers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Top Gainers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topGainers.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} showActions={false} />
              ))}
            </div>
          </section>

          {/* Top Losers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Top Losers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topLosers.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} showActions={false} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - News and Quick Actions */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/trade"
                className="block w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-center font-medium"
              >
                Buy Stocks
              </Link>
              <Link
                href="/portfolio"
                className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-center font-medium"
              >
                View Portfolio
              </Link>
              <Link
                href="/markets"
                className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-center font-medium"
              >
                Explore Markets
              </Link>
              <Link
                href="/learn"
                className="block w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors text-center font-medium"
              >
                Learn Trading
              </Link>
            </div>
          </section>

          {/* Market News */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Market News</h2>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              {recentNews.length > 0 ? (
                recentNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))
              ) : (
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center text-gray-400">
                  No news yet. Market events will appear here.
                </div>
              )}
            </div>
          </section>

          {/* Portfolio Stats */}
          <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Portfolio Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Number of Holdings</span>
                <span className="text-white font-medium">{portfolio.holdings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cash Ratio</span>
                <span className="text-white font-medium">
                  {((portfolio.cash / portfolio.totalValue) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Invested Amount</span>
                <span className="text-white font-medium">
                  ${(portfolio.totalValue - portfolio.cash).toLocaleString()}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
