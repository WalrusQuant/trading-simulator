// Core Stock and Market Types
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  previousClose: number;
  dayChange: number;
  dayChangePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  volatility: 'low' | 'medium' | 'high';
  priceHistory: PricePoint[];
  description?: string;
}

export interface PricePoint {
  timestamp: number;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

// Portfolio and Trading Types
export interface Portfolio {
  cash: number;
  holdings: Holding[];
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  allTimeReturn: number;
  allTimeReturnPercent: number;
  initialValue: number;
}

export interface Holding {
  symbol: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  totalValue: number;
  totalCost: number;
  gainLoss: number;
  gainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  stockName: string;
  quantity: number;
  price: number;
  timestamp: number;
  totalValue: number;
  fees: number;
}

export interface Order {
  id: string;
  type: 'market' | 'limit' | 'stop-loss';
  action: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  limitPrice?: number;
  stopPrice?: number;
  status: 'pending' | 'executed' | 'cancelled';
  createdAt: number;
  executedAt?: number;
}

// Watchlist Types
export interface WatchlistItem {
  symbol: string;
  addedAt: number;
  notes?: string;
  targetPrice?: number;
  alertEnabled?: boolean;
}

// News and Events Types
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  affectedSymbols: string[];
  impact: 'positive' | 'negative' | 'neutral';
  severity: 'low' | 'medium' | 'high';
  sector?: string;
}

export interface MarketEvent {
  id: string;
  type: 'earnings' | 'merger' | 'crash' | 'rally' | 'regulation' | 'product-launch';
  title: string;
  description: string;
  timestamp: number;
  affectedSymbols: string[];
  priceImpact: number; // percentage
  duration: number; // in minutes
}

// Gamification Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (userStats: UserStats) => boolean;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  progress: number;
  target: number;
  reward: number; // XP points
  expiresAt: number;
  completed: boolean;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalTrades: number;
  profitableTrades: number;
  totalProfit: number;
  totalLoss: number;
  winRate: number;
  bestTrade: number;
  worstTrade: number;
  currentStreak: number;
  bestStreak: number;
  achievements: Achievement[];
  challenges: Challenge[];
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  username: string;
  portfolioValue: number;
  allTimeReturn: number;
  allTimeReturnPercent: number;
  winRate: number;
  level: number;
  lastUpdated: number;
}

// User Preferences Types
export interface UserPreferences {
  username: string;
  theme: 'light' | 'dark';
  difficulty: 'easy' | 'medium' | 'hard';
  marketSpeed: 'slow' | 'normal' | 'fast';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  tutorialCompleted: boolean;
}

// Market State Types
export interface MarketState {
  isOpen: boolean;
  currentTime: number;
  marketOpenTime: number;
  marketCloseTime: number;
  lastUpdateTime: number;
  marketSentiment: 'bearish' | 'neutral' | 'bullish';
}

// Chart Types
export type ChartTimeframe = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
export type ChartType = 'line' | 'candlestick' | 'area';

export interface ChartData {
  timeframe: ChartTimeframe;
  data: PricePoint[];
}

// Sector Performance
export interface SectorPerformance {
  sector: string;
  change: number;
  changePercent: number;
  topGainer?: string;
  topLoser?: string;
}
