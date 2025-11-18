'use client';

import { use } from 'react';
import { useMarket } from '../../components/MarketProvider';
import PriceChart from '../../components/PriceChart';
import OrderForm from '../../components/OrderForm';
import { executeBuy, executeSell } from '../../lib/storage';
import { formatCurrency, formatPercent, formatLargeNumber, formatVolume, getChangeColor, getChangeArrow } from '../../lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { stocks, portfolio, refreshPortfolio } = useMarket();
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const stock = stocks.find(s => s.symbol === resolvedParams.symbol);
  const holding = portfolio.holdings.find(h => h.symbol === resolvedParams.symbol);

  if (!stock) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Stock Not Found</h1>
          <p className="text-gray-400 mb-6">The stock symbol "{resolvedParams.symbol}" was not found.</p>
          <button
            onClick={() => router.push('/markets')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Browse Markets
          </button>
        </div>
      </div>
    );
  }

  const handleTrade = (action: 'buy' | 'sell', quantity: number) => {
    const success = action === 'buy'
      ? executeBuy(stock.symbol, stock.name, quantity, stock.price)
      : executeSell(stock.symbol, stock.name, quantity, stock.price);

    if (success) {
      refreshPortfolio();
      setNotification({
        type: 'success',
        message: `Successfully ${action === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${stock.symbol}`,
      });
      setTimeout(() => setNotification(null), 5000);
    } else {
      setNotification({
        type: 'error',
        message: action === 'buy' ? 'Insufficient funds' : 'Insufficient shares',
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const changeColor = getChangeColor(stock.dayChange);
  const arrow = getChangeArrow(stock.dayChange);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification */}
      {notification && (
        <div className={`mb-6 p-4 rounded-lg border ${
          notification.type === 'success'
            ? 'bg-green-500/10 border-green-500 text-green-400'
            : 'bg-red-500/10 border-red-500 text-red-400'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Stock Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{stock.symbol}</h1>
            <p className="text-xl text-gray-400 mb-4">{stock.name}</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                {stock.sector}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                stock.volatility === 'high' ? 'bg-red-500/20 text-red-400' :
                stock.volatility === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {stock.volatility.charAt(0).toUpperCase() + stock.volatility.slice(1)} Volatility
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-2">
              {formatCurrency(stock.price)}
            </div>
            <div className={`text-xl ${changeColor} flex items-center justify-end gap-2`}>
              <span>{arrow}</span>
              <span>{formatCurrency(Math.abs(stock.dayChange))}</span>
              <span>({formatPercent(stock.dayChangePercent)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Position (if owned) */}
      {holding && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Your Position</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Shares Owned</p>
              <p className="text-white text-xl font-bold">{holding.quantity}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Average Cost</p>
              <p className="text-white text-xl font-bold">{formatCurrency(holding.averageCost)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Value</p>
              <p className="text-white text-xl font-bold">{formatCurrency(holding.totalValue)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Gain/Loss</p>
              <p className={`text-xl font-bold ${holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(holding.gainLoss)} ({formatPercent(holding.gainLossPercent)})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Chart and Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Price Chart */}
          <PriceChart priceHistory={stock.priceHistory} symbol={stock.symbol} />

          {/* Stock Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Stock Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Previous Close</p>
                <p className="text-white font-medium">{formatCurrency(stock.previousClose)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Volume</p>
                <p className="text-white font-medium">{formatVolume(stock.volume)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                <p className="text-white font-medium">{formatLargeNumber(stock.marketCap)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Day Change</p>
                <p className={`font-medium ${changeColor}`}>
                  {formatCurrency(stock.dayChange)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Day Change %</p>
                <p className={`font-medium ${changeColor}`}>
                  {formatPercent(stock.dayChangePercent)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Sector</p>
                <p className="text-white font-medium">{stock.sector}</p>
              </div>
            </div>
          </div>

          {/* About */}
          {stock.description && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">About {stock.symbol}</h2>
              <p className="text-gray-300">{stock.description}</p>
            </div>
          )}
        </div>

        {/* Right Column - Trading */}
        <div>
          <OrderForm
            stock={stock}
            availableCash={portfolio.cash}
            ownedShares={holding?.quantity || 0}
            onExecute={handleTrade}
          />
        </div>
      </div>
    </div>
  );
}
