'use client';

import { useEffect, useState } from 'react';
import { getTransactions } from '../lib/storage';
import { Transaction } from '../lib/types';
import { formatCurrency, formatDateTime } from '../lib/utils';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const filteredTransactions = transactions.filter(txn =>
    filter === 'all' || txn.type === filter
  );

  const stats = {
    totalTransactions: transactions.length,
    totalBuys: transactions.filter(t => t.type === 'buy').length,
    totalSells: transactions.filter(t => t.type === 'sell').length,
    totalBuyVolume: transactions
      .filter(t => t.type === 'buy')
      .reduce((sum, t) => sum + t.totalValue, 0),
    totalSellVolume: transactions
      .filter(t => t.type === 'sell')
      .reduce((sum, t) => sum + t.totalValue, 0),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
        <p className="text-gray-400">
          Complete record of all your trades
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Total Transactions</h3>
          <p className="text-white text-2xl font-bold">{stats.totalTransactions}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Buy Orders</h3>
          <p className="text-green-400 text-2xl font-bold">{stats.totalBuys}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Sell Orders</h3>
          <p className="text-red-400 text-2xl font-bold">{stats.totalSells}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-gray-400 text-sm mb-1">Total Volume</h3>
          <p className="text-white text-2xl font-bold">
            {formatCurrency(stats.totalBuyVolume + stats.totalSellVolume)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All ({transactions.length})
          </button>
          <button
            onClick={() => setFilter('buy')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === 'buy'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Buys ({stats.totalBuys})
          </button>
          <button
            onClick={() => setFilter('sell')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === 'sell'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Sells ({stats.totalSells})
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDateTime(txn.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        txn.type === 'buy'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {txn.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{txn.symbol}</div>
                      <div className="text-gray-400 text-xs">{txn.stockName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {txn.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {formatCurrency(txn.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {formatCurrency(txn.fees)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                      {formatCurrency(txn.totalValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-400 mb-4">No transactions yet.</p>
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
