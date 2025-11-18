'use client';

import { useMarket } from '../components/MarketProvider';
import { formatCurrency, formatPercent } from '../lib/utils';
import { getUserStats } from '../lib/storage';
import { useEffect, useState } from 'react';

export default function LeaderboardPage() {
  const { portfolio } = useMarket();
  const [userStats, setUserStats] = useState<any>(null);

  useEffect(() => {
    setUserStats(getUserStats());
  }, []);

  // Mock leaderboard data (in a real app, this would come from a backend)
  const leaderboardData = [
    {
      rank: 1,
      username: 'TraderPro',
      portfolioValue: 152340,
      allTimeReturn: 52340,
      allTimeReturnPercent: 52.34,
      winRate: 68.5,
      level: 15,
    },
    {
      rank: 2,
      username: 'StockMaster',
      portfolioValue: 138920,
      allTimeReturn: 38920,
      allTimeReturnPercent: 38.92,
      winRate: 61.2,
      level: 12,
    },
    {
      rank: 3,
      username: 'InvestorGuru',
      portfolioValue: 125670,
      allTimeReturn: 25670,
      allTimeReturnPercent: 25.67,
      winRate: 58.9,
      level: 10,
    },
    {
      rank: 4,
      username: 'You',
      portfolioValue: portfolio.totalValue,
      allTimeReturn: portfolio.allTimeReturn,
      allTimeReturnPercent: portfolio.allTimeReturnPercent,
      winRate: userStats?.winRate || 0,
      level: userStats?.level || 1,
    },
    {
      rank: 5,
      username: 'MarketBull',
      portfolioValue: 118450,
      allTimeReturn: 18450,
      allTimeReturnPercent: 18.45,
      winRate: 54.3,
      level: 9,
    },
    {
      rank: 6,
      username: 'DayTrader99',
      portfolioValue: 112890,
      allTimeReturn: 12890,
      allTimeReturnPercent: 12.89,
      winRate: 52.1,
      level: 8,
    },
    {
      rank: 7,
      username: 'BullishBear',
      portfolioValue: 108320,
      allTimeReturn: 8320,
      allTimeReturnPercent: 8.32,
      winRate: 49.8,
      level: 7,
    },
    {
      rank: 8,
      username: 'ValueInvestor',
      portfolioValue: 105600,
      allTimeReturn: 5600,
      allTimeReturnPercent: 5.6,
      winRate: 47.5,
      level: 6,
    },
  ];

  const sortedLeaderboard = leaderboardData.sort((a, b) => b.portfolioValue - a.portfolioValue)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-gray-400">
          Compare your performance with other traders
        </p>
      </div>

      {/* Your Rank Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-lg mb-2">Your Rank</h2>
            <p className="text-white text-4xl font-bold">
              #{sortedLeaderboard.find(e => e.username === 'You')?.rank || '-'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Portfolio Value</p>
            <p className="text-white text-2xl font-bold">
              {formatCurrency(portfolio.totalValue)}
            </p>
            <p className="text-blue-100 text-sm mt-2">
              Return: {formatPercent(portfolio.allTimeReturnPercent)}
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Trader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Portfolio Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  All-Time Return
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Win Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedLeaderboard.map((entry) => {
                const isCurrentUser = entry.username === 'You';
                return (
                  <tr
                    key={entry.username}
                    className={`${isCurrentUser ? 'bg-blue-500/10' : 'hover:bg-gray-750'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {entry.rank <= 3 && (
                          <span className="mr-2 text-2xl">
                            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                        <span className={`text-xl font-bold ${isCurrentUser ? 'text-blue-400' : 'text-white'}`}>
                          #{entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${isCurrentUser ? 'text-blue-400' : 'text-white'}`}>
                        {entry.username}
                        {isCurrentUser && (
                          <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                            You
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-400 font-medium">Lv {entry.level}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                      {formatCurrency(entry.portfolioValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`${entry.allTimeReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <div className="font-medium">{formatCurrency(entry.allTimeReturn)}</div>
                        <div className="text-sm">{formatPercent(entry.allTimeReturnPercent)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {entry.winRate.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <p className="text-gray-400 text-sm">
          Rankings are based on total portfolio value. Keep trading to improve your rank!
        </p>
      </div>
    </div>
  );
}
