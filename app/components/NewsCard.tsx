'use client';

import { NewsItem } from '../lib/types';
import { formatRelativeTime } from '../lib/utils';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const impactColor =
    news.impact === 'positive' ? 'text-green-400 bg-green-400/10' :
    news.impact === 'negative' ? 'text-red-400 bg-red-400/10' :
    'text-gray-400 bg-gray-400/10';

  const severityBadge =
    news.severity === 'high' ? 'bg-red-500' :
    news.severity === 'medium' ? 'bg-yellow-500' :
    'bg-blue-500';

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full ${severityBadge} mt-2 flex-shrink-0`} />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold">{news.title}</h3>
            <span className="text-gray-400 text-xs whitespace-nowrap">
              {formatRelativeTime(news.timestamp)}
            </span>
          </div>

          <p className="text-gray-300 text-sm mb-3">{news.content}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-1 rounded text-xs font-medium ${impactColor}`}>
              {news.impact.toUpperCase()}
            </span>
            {news.affectedSymbols.map((symbol) => (
              <span
                key={symbol}
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium"
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
