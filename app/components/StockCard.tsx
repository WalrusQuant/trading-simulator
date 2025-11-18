'use client';

import Link from 'next/link';
import { Stock } from '../lib/types';
import { formatCurrency, formatPercent, getChangeColor, getChangeArrow } from '../lib/utils';

interface StockCardProps {
  stock: Stock;
  onTrade?: (symbol: string) => void;
  showActions?: boolean;
}

export default function StockCard({ stock, onTrade, showActions = true }: StockCardProps) {
  const changeColor = getChangeColor(stock.dayChange);
  const arrow = getChangeArrow(stock.dayChange);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
      <Link href={`/stocks/${stock.symbol}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">{stock.symbol}</h3>
            <p className="text-gray-400 text-sm truncate max-w-[200px]">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-lg">{formatCurrency(stock.price)}</p>
            <p className={`text-sm ${changeColor} flex items-center justify-end`}>
              <span>{arrow}</span>
              <span className="ml-1">{formatPercent(stock.dayChangePercent)}</span>
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <div>
          <span className="block">Sector</span>
          <span className="text-gray-300">{stock.sector}</span>
        </div>
        <div className="text-right">
          <span className="block">Volatility</span>
          <span className={`${
            stock.volatility === 'high' ? 'text-red-400' :
            stock.volatility === 'medium' ? 'text-yellow-400' :
            'text-green-400'
          } capitalize`}>
            {stock.volatility}
          </span>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2">
          <Link
            href={`/stocks/${stock.symbol}`}
            className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition-colors text-center"
          >
            Details
          </Link>
          {onTrade && (
            <button
              onClick={() => onTrade(stock.symbol)}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
            >
              Trade
            </button>
          )}
        </div>
      )}
    </div>
  );
}
