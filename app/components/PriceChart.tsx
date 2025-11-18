'use client';

import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PricePoint, ChartTimeframe } from '../lib/types';
import { formatCurrency, formatDate, formatTime, getChartDataForTimeframe } from '../lib/utils';

interface PriceChartProps {
  priceHistory: PricePoint[];
  symbol: string;
}

export default function PriceChart({ priceHistory, symbol }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('1D');

  const timeframes: ChartTimeframe[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const chartData = useMemo(() => {
    const filtered = getChartDataForTimeframe(priceHistory, timeframe);
    return filtered.map(point => ({
      timestamp: point.timestamp,
      price: point.close,
      date: formatDate(point.timestamp),
      time: formatTime(point.timestamp),
    }));
  }, [priceHistory, timeframe]);

  const minPrice = useMemo(() => Math.min(...chartData.map(d => d.price)), [chartData]);
  const maxPrice = useMemo(() => Math.max(...chartData.map(d => d.price)), [chartData]);
  const firstPrice = chartData[0]?.price || 0;
  const lastPrice = chartData[chartData.length - 1]?.price || 0;
  const isPositive = lastPrice >= firstPrice;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">{symbol} Price Chart</h2>
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey={timeframe === '1D' ? 'time' : 'date'}
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              domain={[minPrice * 0.995, maxPrice * 1.005]}
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => [formatCurrency(value), 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? '#10b981' : '#ef4444'}
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
