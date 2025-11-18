'use client';

import Link from 'next/link';
import { Holding } from '../lib/types';
import { formatCurrency, formatPercent, getChangeColor, getChangeArrow } from '../lib/utils';

interface HoldingCardProps {
  holding: Holding;
  stockName?: string;
}

export default function HoldingCard({ holding, stockName }: HoldingCardProps) {
  const totalChangeColor = getChangeColor(holding.gainLoss);
  const dayChangeColor = getChangeColor(holding.dayChange);
  const totalArrow = getChangeArrow(holding.gainLoss);
  const dayArrow = getChangeArrow(holding.dayChange);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
      <Link href={`/stocks/${holding.symbol}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">{holding.symbol}</h3>
            {stockName && (
              <p className="text-gray-400 text-sm">{stockName}</p>
            )}
            <p className="text-gray-400 text-sm mt-1">
              {holding.quantity} shares @ {formatCurrency(holding.averageCost)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-lg">{formatCurrency(holding.totalValue)}</p>
            <p className="text-gray-400 text-sm">{formatCurrency(holding.currentPrice)}/share</p>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
        <div>
          <p className="text-gray-400 text-xs mb-1">Total Gain/Loss</p>
          <p className={`font-bold ${totalChangeColor}`}>
            {totalArrow} {formatCurrency(Math.abs(holding.gainLoss))}
          </p>
          <p className={`text-sm ${totalChangeColor}`}>
            {formatPercent(holding.gainLossPercent)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs mb-1">Today</p>
          <p className={`font-bold ${dayChangeColor}`}>
            {dayArrow} {formatCurrency(Math.abs(holding.dayChange))}
          </p>
          <p className={`text-sm ${dayChangeColor}`}>
            {formatPercent(holding.dayChangePercent)}
          </p>
        </div>
      </div>

      <Link
        href={`/stocks/${holding.symbol}`}
        className="block mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors text-center"
      >
        View Details
      </Link>
    </div>
  );
}
