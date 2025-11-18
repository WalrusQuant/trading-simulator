import {
  Portfolio,
  Transaction,
  WatchlistItem,
  UserPreferences,
  UserStats,
  Achievement,
  Challenge,
  Holding,
  Stock,
} from './types';

const STORAGE_KEYS = {
  PORTFOLIO: 'trading_simulator_portfolio',
  TRANSACTIONS: 'trading_simulator_transactions',
  WATCHLIST: 'trading_simulator_watchlist',
  PREFERENCES: 'trading_simulator_preferences',
  USER_STATS: 'trading_simulator_user_stats',
  STOCKS: 'trading_simulator_stocks',
  LAST_UPDATE: 'trading_simulator_last_update',
};

// Portfolio Management
export function getPortfolio(): Portfolio {
  if (typeof window === 'undefined') {
    return getDefaultPortfolio();
  }

  const stored = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
  if (!stored) {
    const defaultPortfolio = getDefaultPortfolio();
    savePortfolio(defaultPortfolio);
    return defaultPortfolio;
  }

  return JSON.parse(stored);
}

export function savePortfolio(portfolio: Portfolio): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
}

function getDefaultPortfolio(): Portfolio {
  return {
    cash: 100000,
    holdings: [],
    totalValue: 100000,
    dayChange: 0,
    dayChangePercent: 0,
    allTimeReturn: 0,
    allTimeReturnPercent: 0,
    initialValue: 100000,
  };
}

export function updatePortfolio(stocks: Stock[]): Portfolio {
  const portfolio = getPortfolio();

  // Update holdings with current prices
  const updatedHoldings: Holding[] = portfolio.holdings.map(holding => {
    const stock = stocks.find(s => s.symbol === holding.symbol);
    if (!stock) return holding;

    const currentPrice = stock.price;
    const totalValue = holding.quantity * currentPrice;
    const totalCost = holding.quantity * holding.averageCost;
    const gainLoss = totalValue - totalCost;
    const gainLossPercent = (gainLoss / totalCost) * 100;

    const previousPrice = stock.previousClose;
    const dayChange = (currentPrice - previousPrice) * holding.quantity;
    const dayChangePercent = ((currentPrice - previousPrice) / previousPrice) * 100;

    return {
      ...holding,
      currentPrice,
      totalValue,
      gainLoss,
      gainLossPercent,
      dayChange,
      dayChangePercent,
    };
  });

  const holdingsValue = updatedHoldings.reduce((sum, h) => sum + h.totalValue, 0);
  const totalValue = portfolio.cash + holdingsValue;
  const allTimeReturn = totalValue - portfolio.initialValue;
  const allTimeReturnPercent = (allTimeReturn / portfolio.initialValue) * 100;

  // Calculate day change
  const previousTotalValue = portfolio.cash + updatedHoldings.reduce(
    (sum, h) => sum + h.quantity * (h.currentPrice - h.dayChange / h.quantity),
    0
  );
  const dayChange = totalValue - previousTotalValue;
  const dayChangePercent = previousTotalValue > 0 ? (dayChange / previousTotalValue) * 100 : 0;

  const updatedPortfolio: Portfolio = {
    ...portfolio,
    holdings: updatedHoldings,
    totalValue,
    dayChange,
    dayChangePercent,
    allTimeReturn,
    allTimeReturnPercent,
  };

  savePortfolio(updatedPortfolio);
  return updatedPortfolio;
}

export function executeBuy(symbol: string, stockName: string, quantity: number, price: number): boolean {
  const portfolio = getPortfolio();
  const totalCost = quantity * price;
  const fees = totalCost * 0.001; // 0.1% fee
  const totalWithFees = totalCost + fees;

  if (portfolio.cash < totalWithFees) {
    return false;
  }

  // Update holdings
  const existingHolding = portfolio.holdings.find(h => h.symbol === symbol);
  let updatedHoldings: Holding[];

  if (existingHolding) {
    const newQuantity = existingHolding.quantity + quantity;
    const newTotalCost = existingHolding.totalCost + totalCost;
    const newAverageCost = newTotalCost / newQuantity;

    updatedHoldings = portfolio.holdings.map(h =>
      h.symbol === symbol
        ? {
            ...h,
            quantity: newQuantity,
            averageCost: newAverageCost,
            totalCost: newTotalCost,
            totalValue: newQuantity * price,
          }
        : h
    );
  } else {
    const newHolding: Holding = {
      symbol,
      quantity,
      averageCost: price,
      currentPrice: price,
      totalValue: totalCost,
      totalCost,
      gainLoss: 0,
      gainLossPercent: 0,
      dayChange: 0,
      dayChangePercent: 0,
    };
    updatedHoldings = [...portfolio.holdings, newHolding];
  }

  // Update portfolio
  const updatedPortfolio = {
    ...portfolio,
    cash: portfolio.cash - totalWithFees,
    holdings: updatedHoldings,
  };

  savePortfolio(updatedPortfolio);

  // Record transaction
  const transaction: Transaction = {
    id: `txn_${Date.now()}_${Math.random()}`,
    type: 'buy',
    symbol,
    stockName,
    quantity,
    price,
    timestamp: Date.now(),
    totalValue: totalCost,
    fees,
  };
  addTransaction(transaction);

  return true;
}

export function executeSell(symbol: string, stockName: string, quantity: number, price: number): boolean {
  const portfolio = getPortfolio();
  const holding = portfolio.holdings.find(h => h.symbol === symbol);

  if (!holding || holding.quantity < quantity) {
    return false;
  }

  const totalValue = quantity * price;
  const fees = totalValue * 0.001; // 0.1% fee
  const totalWithFees = totalValue - fees;

  // Update holdings
  let updatedHoldings: Holding[];

  if (holding.quantity === quantity) {
    updatedHoldings = portfolio.holdings.filter(h => h.symbol !== symbol);
  } else {
    const newQuantity = holding.quantity - quantity;
    const newTotalCost = holding.totalCost - (holding.averageCost * quantity);

    updatedHoldings = portfolio.holdings.map(h =>
      h.symbol === symbol
        ? {
            ...h,
            quantity: newQuantity,
            totalCost: newTotalCost,
            totalValue: newQuantity * price,
          }
        : h
    );
  }

  // Update portfolio
  const updatedPortfolio = {
    ...portfolio,
    cash: portfolio.cash + totalWithFees,
    holdings: updatedHoldings,
  };

  savePortfolio(updatedPortfolio);

  // Record transaction
  const transaction: Transaction = {
    id: `txn_${Date.now()}_${Math.random()}`,
    type: 'sell',
    symbol,
    stockName,
    quantity,
    price,
    timestamp: Date.now(),
    totalValue,
    fees,
  };
  addTransaction(transaction);

  return true;
}

// Transaction Management
export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return stored ? JSON.parse(stored) : [];
}

export function addTransaction(transaction: Transaction): void {
  if (typeof window === 'undefined') return;
  const transactions = getTransactions();
  transactions.unshift(transaction);
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

// Watchlist Management
export function getWatchlist(): WatchlistItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
  return stored ? JSON.parse(stored) : [];
}

export function addToWatchlist(symbol: string): void {
  if (typeof window === 'undefined') return;
  const watchlist = getWatchlist();

  if (watchlist.some(item => item.symbol === symbol)) {
    return;
  }

  const item: WatchlistItem = {
    symbol,
    addedAt: Date.now(),
  };

  watchlist.push(item);
  localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
}

export function removeFromWatchlist(symbol: string): void {
  if (typeof window === 'undefined') return;
  const watchlist = getWatchlist().filter(item => item.symbol !== symbol);
  localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
}

// User Preferences
export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return getDefaultPreferences();
  }

  const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  if (!stored) {
    const defaultPrefs = getDefaultPreferences();
    savePreferences(defaultPrefs);
    return defaultPrefs;
  }

  return JSON.parse(stored);
}

export function savePreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
}

function getDefaultPreferences(): UserPreferences {
  return {
    username: 'Trader',
    theme: 'dark',
    difficulty: 'medium',
    marketSpeed: 'normal',
    soundEnabled: true,
    notificationsEnabled: true,
    tutorialCompleted: false,
  };
}

// User Stats and Gamification
export function getUserStats(): UserStats {
  if (typeof window === 'undefined') {
    return getDefaultUserStats();
  }

  const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS);
  if (!stored) {
    const defaultStats = getDefaultUserStats();
    saveUserStats(defaultStats);
    return defaultStats;
  }

  return JSON.parse(stored);
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
}

function getDefaultUserStats(): UserStats {
  return {
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
    totalTrades: 0,
    profitableTrades: 0,
    totalProfit: 0,
    totalLoss: 0,
    winRate: 0,
    bestTrade: 0,
    worstTrade: 0,
    currentStreak: 0,
    bestStreak: 0,
    achievements: [],
    challenges: [],
  };
}

export function updateUserStats(transaction: Transaction, profit: number): void {
  const stats = getUserStats();

  stats.totalTrades += 1;
  if (profit > 0) {
    stats.profitableTrades += 1;
    stats.totalProfit += profit;
    stats.currentStreak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
  } else {
    stats.totalLoss += Math.abs(profit);
    stats.currentStreak = 0;
  }

  stats.winRate = (stats.profitableTrades / stats.totalTrades) * 100;
  stats.bestTrade = Math.max(stats.bestTrade, profit);
  stats.worstTrade = Math.min(stats.worstTrade, profit);

  // Award XP
  const xpGained = Math.max(10, Math.floor(Math.abs(profit) / 10));
  stats.xp += xpGained;

  // Level up
  while (stats.xp >= stats.xpToNextLevel) {
    stats.xp -= stats.xpToNextLevel;
    stats.level += 1;
    stats.xpToNextLevel = Math.floor(stats.xpToNextLevel * 1.5);
  }

  saveUserStats(stats);
}

// Reset all data
export function resetAllData(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
  localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
  localStorage.removeItem(STORAGE_KEYS.WATCHLIST);
  localStorage.removeItem(STORAGE_KEYS.USER_STATS);
  // Keep preferences
}

// Stocks cache
export function saveStocksToCache(stocks: Stock[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.STOCKS, JSON.stringify(stocks));
  localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString());
}

export function getStocksFromCache(): Stock[] | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.STOCKS);
  return stored ? JSON.parse(stored) : null;
}
