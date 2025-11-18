'use client';

import { useState } from 'react';
import { Stock } from '../lib/types';
import { formatCurrency, calculateOrderTotal, isValidQuantity } from '../lib/utils';

interface OrderFormProps {
  stock: Stock;
  availableCash: number;
  ownedShares?: number;
  onExecute: (action: 'buy' | 'sell', quantity: number) => void;
}

export default function OrderForm({ stock, availableCash, ownedShares = 0, onExecute }: OrderFormProps) {
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<string>('1');
  const [error, setError] = useState<string>('');

  const numQuantity = parseInt(quantity) || 0;
  const orderTotal = calculateOrderTotal(numQuantity, stock.price, true);
  const maxBuyQuantity = Math.floor(availableCash / (stock.price * 1.001));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidQuantity(numQuantity)) {
      setError('Please enter a valid quantity');
      return;
    }

    if (action === 'buy') {
      if (orderTotal > availableCash) {
        setError('Insufficient funds');
        return;
      }
    } else {
      if (numQuantity > ownedShares) {
        setError('Insufficient shares');
        return;
      }
    }

    onExecute(action, numQuantity);
    setQuantity('1');
  };

  const setMaxQuantity = () => {
    if (action === 'buy') {
      setQuantity(maxBuyQuantity.toString());
    } else {
      setQuantity(ownedShares.toString());
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-white text-xl font-bold mb-4">Place Order</h2>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setAction('buy')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            action === 'buy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setAction('sell')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            action === 'sell'
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Sell
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Current Price
          </label>
          <div className="text-white text-2xl font-bold">
            {formatCurrency(stock.price)}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-400 text-sm">
              Quantity
            </label>
            <button
              type="button"
              onClick={setMaxQuantity}
              className="text-blue-400 text-sm hover:text-blue-300"
            >
              Max: {action === 'buy' ? maxBuyQuantity : ownedShares}
            </button>
          </div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quantity"
          />
        </div>

        <div className="bg-gray-700 rounded-md p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">{formatCurrency(numQuantity * stock.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Fee (0.1%)</span>
            <span className="text-white">{formatCurrency(numQuantity * stock.price * 0.001)}</span>
          </div>
          <div className="border-t border-gray-600 pt-2 flex justify-between">
            <span className="text-gray-300 font-medium">Total</span>
            <span className="text-white font-bold">{formatCurrency(orderTotal)}</span>
          </div>
        </div>

        {action === 'buy' && (
          <div className="text-sm text-gray-400">
            Available: {formatCurrency(availableCash)}
          </div>
        )}

        {action === 'sell' && (
          <div className="text-sm text-gray-400">
            Owned Shares: {ownedShares}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-md p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-md font-bold text-white transition-colors ${
            action === 'buy'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {action === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
        </button>
      </form>
    </div>
  );
}
