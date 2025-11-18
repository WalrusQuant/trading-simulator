'use client';

import { Portfolio } from '../lib/types';
import { formatCurrency, formatPercent, getChangeColor, getChangeArrow } from '../lib/utils';

interface PortfolioSummaryProps {
  portfolio: Portfolio;
}

export default function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const dayChangeColor = getChangeColor(portfolio.dayChange);
  const allTimeColor = getChangeColor(portfolio.allTimeReturn);
  const dayArrow = getChangeArrow(portfolio.dayChange);
  const allTimeArrow = getChangeArrow(portfolio.allTimeReturn);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-gray-400 text-sm mb-2">Total Value</h3>
        <p className="text-white text-3xl font-bold">{formatCurrency(portfolio.totalValue)}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-sm ${dayChangeColor}`}>
            {dayArrow} {formatCurrency(Math.abs(portfolio.dayChange))}
          </span>
          <span className={`text-sm ${dayChangeColor}`}>
            ({formatPercent(portfolio.dayChangePercent)})
          </span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-gray-400 text-sm mb-2">Cash Available</h3>
        <p className="text-white text-3xl font-bold">{formatCurrency(portfolio.cash)}</p>
        <p className="text-gray-400 text-sm mt-2">
          {((portfolio.cash / portfolio.totalValue) * 100).toFixed(1)}% of portfolio
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-gray-400 text-sm mb-2">Holdings Value</h3>
        <p className="text-white text-3xl font-bold">
          {formatCurrency(portfolio.totalValue - portfolio.cash)}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          {portfolio.holdings.length} position{portfolio.holdings.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-gray-400 text-sm mb-2">All-Time Return</h3>
        <p className={`text-3xl font-bold ${allTimeColor}`}>
          {formatCurrency(portfolio.allTimeReturn)}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-sm ${allTimeColor}`}>
            {allTimeArrow} {formatPercent(portfolio.allTimeReturnPercent)}
          </span>
        </div>
      </div>
    </div>
  );
}
