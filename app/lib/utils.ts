// Formatting utilities

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value >= 0 ? '+' : ''}${formatNumber(value, decimals)}%`;
}

export function formatLargeNumber(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return formatCurrency(value);
}

export function formatVolume(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toString();
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ago`;
  }
  if (hours > 0) {
    return `${hours}h ago`;
  }
  if (minutes > 0) {
    return `${minutes}m ago`;
  }
  return `${seconds}s ago`;
}

// Color helpers
export function getChangeColor(value: number): string {
  if (value > 0) return 'text-market-green';
  if (value < 0) return 'text-market-red';
  return 'text-gray-500';
}

export function getChangeBgColor(value: number): string {
  if (value > 0) return 'bg-market-green/10';
  if (value < 0) return 'bg-market-red/10';
  return 'bg-gray-500/10';
}

export function getChangeArrow(value: number): string {
  if (value > 0) return '↑';
  if (value < 0) return '↓';
  return '→';
}

// Chart data helpers
export function getChartDataForTimeframe(
  priceHistory: any[],
  timeframe: string
): any[] {
  const now = Date.now();
  let startTime: number;

  switch (timeframe) {
    case '1D':
      startTime = now - 24 * 60 * 60 * 1000;
      break;
    case '1W':
      startTime = now - 7 * 24 * 60 * 60 * 1000;
      break;
    case '1M':
      startTime = now - 30 * 24 * 60 * 60 * 1000;
      break;
    case '3M':
      startTime = now - 90 * 24 * 60 * 60 * 1000;
      break;
    case '1Y':
      startTime = now - 365 * 24 * 60 * 60 * 1000;
      break;
    case 'ALL':
      return priceHistory;
    default:
      startTime = now - 24 * 60 * 60 * 1000;
  }

  return priceHistory.filter(point => point.timestamp >= startTime);
}

// Validation helpers
export function isValidQuantity(quantity: number): boolean {
  return quantity > 0 && Number.isInteger(quantity);
}

export function isValidPrice(price: number): boolean {
  return price > 0 && !isNaN(price);
}

export function calculateOrderTotal(quantity: number, price: number, fees: boolean = true): number {
  const total = quantity * price;
  return fees ? total * 1.001 : total; // 0.1% fee
}

// Sector colors
export const SECTOR_COLORS: Record<string, string> = {
  Technology: '#3b82f6',
  Healthcare: '#10b981',
  Finance: '#f59e0b',
  Energy: '#ef4444',
  'Consumer Goods': '#8b5cf6',
  Industrial: '#6366f1',
  Communications: '#ec4899',
  'Real Estate': '#14b8a6',
};

export function getSectorColor(sector: string): string {
  return SECTOR_COLORS[sector] || '#64748b';
}

// Sort helpers
export function sortStocks(stocks: any[], sortBy: string, order: 'asc' | 'desc' = 'desc'): any[] {
  const sorted = [...stocks].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'symbol':
        aVal = a.symbol;
        bVal = b.symbol;
        break;
      case 'name':
        aVal = a.name;
        bVal = b.name;
        break;
      case 'price':
        aVal = a.price;
        bVal = b.price;
        break;
      case 'change':
        aVal = a.dayChangePercent;
        bVal = b.dayChangePercent;
        break;
      case 'volume':
        aVal = a.volume;
        bVal = b.volume;
        break;
      case 'marketCap':
        aVal = a.marketCap;
        bVal = b.marketCap;
        break;
      default:
        return 0;
    }

    if (typeof aVal === 'string') {
      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return sorted;
}

// Achievement helpers
export function checkAchievements(stats: any): string[] {
  const newAchievements: string[] = [];

  if (stats.totalTrades >= 1 && !stats.achievements.includes('first-trade')) {
    newAchievements.push('first-trade');
  }
  if (stats.totalTrades >= 10 && !stats.achievements.includes('active-trader')) {
    newAchievements.push('active-trader');
  }
  if (stats.totalTrades >= 100 && !stats.achievements.includes('veteran-trader')) {
    newAchievements.push('veteran-trader');
  }
  if (stats.winRate >= 60 && stats.totalTrades >= 20 && !stats.achievements.includes('profit-master')) {
    newAchievements.push('profit-master');
  }
  if (stats.currentStreak >= 5 && !stats.achievements.includes('hot-streak')) {
    newAchievements.push('hot-streak');
  }
  if (stats.bestTrade >= 10000 && !stats.achievements.includes('big-win')) {
    newAchievements.push('big-win');
  }

  return newAchievements;
}
