import { Stock, PricePoint } from './types';

// Initial stock data with 50+ popular stocks across different sectors
export const INITIAL_STOCKS: Omit<Stock, 'priceHistory' | 'dayChange' | 'dayChangePercent'>[] = [
  // Technology
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, previousClose: 175.30, volume: 52000000, marketCap: 2800000000000, sector: 'Technology', volatility: 'medium', description: 'Consumer electronics and software giant' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.25, previousClose: 375.80, volume: 28000000, marketCap: 2810000000000, sector: 'Technology', volatility: 'medium', description: 'Software, cloud computing, and AI leader' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.15, previousClose: 140.90, volume: 24000000, marketCap: 1780000000000, sector: 'Technology', volatility: 'medium', description: 'Search engine and digital advertising leader' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.35, previousClose: 176.20, volume: 48000000, marketCap: 1840000000000, sector: 'Technology', volatility: 'high', description: 'E-commerce and cloud computing giant' },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 488.75, previousClose: 485.20, volume: 16000000, marketCap: 1240000000000, sector: 'Technology', volatility: 'high', description: 'Social media and virtual reality company' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.28, previousClose: 868.50, volume: 42000000, marketCap: 2160000000000, sector: 'Technology', volatility: 'high', description: 'Graphics processing and AI chip manufacturer' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.84, previousClose: 238.45, volume: 95000000, marketCap: 770000000000, sector: 'Technology', volatility: 'high', description: 'Electric vehicles and clean energy' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 485.30, previousClose: 482.15, volume: 8500000, marketCap: 210000000000, sector: 'Technology', volatility: 'high', description: 'Streaming entertainment service' },
  { symbol: 'INTC', name: 'Intel Corporation', price: 43.25, previousClose: 42.80, volume: 38000000, marketCap: 180000000000, sector: 'Technology', volatility: 'medium', description: 'Semiconductor chip manufacturer' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 168.45, previousClose: 165.90, volume: 52000000, marketCap: 272000000000, sector: 'Technology', volatility: 'high', description: 'Semiconductor and processor company' },
  { symbol: 'ORCL', name: 'Oracle Corporation', price: 118.50, previousClose: 117.25, volume: 12000000, marketCap: 325000000000, sector: 'Technology', volatility: 'low', description: 'Enterprise software and cloud solutions' },
  { symbol: 'ADBE', name: 'Adobe Inc.', price: 562.75, previousClose: 558.40, volume: 3200000, marketCap: 258000000000, sector: 'Technology', volatility: 'medium', description: 'Creative and marketing software' },
  { symbol: 'CRM', name: 'Salesforce Inc.', price: 285.60, previousClose: 282.90, volume: 6800000, marketCap: 278000000000, sector: 'Technology', volatility: 'medium', description: 'Cloud-based CRM software' },
  { symbol: 'CSCO', name: 'Cisco Systems', price: 52.35, previousClose: 51.90, volume: 18000000, marketCap: 212000000000, sector: 'Technology', volatility: 'low', description: 'Networking hardware and software' },

  // Healthcare
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.80, previousClose: 156.20, volume: 8500000, marketCap: 385000000000, sector: 'Healthcare', volatility: 'low', description: 'Pharmaceutical and consumer health products' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: 524.30, previousClose: 521.85, volume: 3200000, marketCap: 490000000000, sector: 'Healthcare', volatility: 'low', description: 'Health insurance and care services' },
  { symbol: 'PFE', name: 'Pfizer Inc.', price: 28.45, previousClose: 28.15, volume: 42000000, marketCap: 160000000000, sector: 'Healthcare', volatility: 'medium', description: 'Pharmaceutical manufacturer' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', price: 172.90, previousClose: 171.50, volume: 6500000, marketCap: 305000000000, sector: 'Healthcare', volatility: 'low', description: 'Biopharmaceutical company' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific', price: 548.25, previousClose: 545.60, volume: 1800000, marketCap: 214000000000, sector: 'Healthcare', volatility: 'low', description: 'Life sciences and laboratory equipment' },
  { symbol: 'MRNA', name: 'Moderna Inc.', price: 95.60, previousClose: 92.80, volume: 12000000, marketCap: 37000000000, sector: 'Healthcare', volatility: 'high', description: 'Biotechnology and mRNA therapeutics' },
  { symbol: 'LLY', name: 'Eli Lilly and Company', price: 785.40, previousClose: 778.90, volume: 3500000, marketCap: 745000000000, sector: 'Healthcare', volatility: 'medium', description: 'Pharmaceutical research and development' },

  // Finance
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 185.75, previousClose: 184.30, volume: 12000000, marketCap: 540000000000, sector: 'Finance', volatility: 'medium', description: 'Banking and financial services' },
  { symbol: 'BAC', name: 'Bank of America Corp', price: 38.45, previousClose: 38.10, volume: 48000000, marketCap: 305000000000, sector: 'Finance', volatility: 'medium', description: 'Banking and financial services' },
  { symbol: 'WFC', name: 'Wells Fargo & Company', price: 56.80, previousClose: 56.25, volume: 22000000, marketCap: 205000000000, sector: 'Finance', volatility: 'medium', description: 'Banking and financial services' },
  { symbol: 'GS', name: 'Goldman Sachs Group', price: 458.30, previousClose: 455.60, volume: 3200000, marketCap: 155000000000, sector: 'Finance', volatility: 'medium', description: 'Investment banking and securities' },
  { symbol: 'MS', name: 'Morgan Stanley', price: 102.45, previousClose: 101.80, volume: 8500000, marketCap: 172000000000, sector: 'Finance', volatility: 'medium', description: 'Investment banking and wealth management' },
  { symbol: 'V', name: 'Visa Inc.', price: 278.90, previousClose: 276.50, volume: 7200000, marketCap: 578000000000, sector: 'Finance', volatility: 'low', description: 'Payment processing technology' },
  { symbol: 'MA', name: 'Mastercard Inc.', price: 462.35, previousClose: 459.80, volume: 3800000, marketCap: 438000000000, sector: 'Finance', volatility: 'low', description: 'Payment processing technology' },
  { symbol: 'PYPL', name: 'PayPal Holdings', price: 78.25, previousClose: 77.40, volume: 14000000, marketCap: 82000000000, sector: 'Finance', volatility: 'high', description: 'Digital payments platform' },

  // Energy
  { symbol: 'XOM', name: 'Exxon Mobil Corporation', price: 112.45, previousClose: 111.30, volume: 18000000, marketCap: 465000000000, sector: 'Energy', volatility: 'medium', description: 'Oil and gas exploration and production' },
  { symbol: 'CVX', name: 'Chevron Corporation', price: 158.70, previousClose: 157.25, volume: 9500000, marketCap: 295000000000, sector: 'Energy', volatility: 'medium', description: 'Oil and gas multinational' },
  { symbol: 'COP', name: 'ConocoPhillips', price: 124.35, previousClose: 123.10, volume: 7800000, marketCap: 155000000000, sector: 'Energy', volatility: 'medium', description: 'Exploration and production company' },
  { symbol: 'SLB', name: 'Schlumberger Limited', price: 52.80, previousClose: 52.15, volume: 12000000, marketCap: 74000000000, sector: 'Energy', volatility: 'medium', description: 'Oilfield services company' },
  { symbol: 'NEE', name: 'NextEra Energy', price: 78.45, previousClose: 77.90, volume: 8200000, marketCap: 157000000000, sector: 'Energy', volatility: 'low', description: 'Electric power and renewable energy' },

  // Consumer Goods
  { symbol: 'WMT', name: 'Walmart Inc.', price: 72.85, previousClose: 72.30, volume: 9500000, marketCap: 590000000000, sector: 'Consumer Goods', volatility: 'low', description: 'Retail corporation' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 165.40, previousClose: 164.75, volume: 6800000, marketCap: 395000000000, sector: 'Consumer Goods', volatility: 'low', description: 'Consumer goods corporation' },
  { symbol: 'KO', name: 'The Coca-Cola Company', price: 61.25, previousClose: 60.85, volume: 14000000, marketCap: 264000000000, sector: 'Consumer Goods', volatility: 'low', description: 'Beverage manufacturer' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', price: 172.90, previousClose: 172.15, volume: 5200000, marketCap: 238000000000, sector: 'Consumer Goods', volatility: 'low', description: 'Food and beverage corporation' },
  { symbol: 'COST', name: 'Costco Wholesale', price: 865.50, previousClose: 860.25, volume: 2100000, marketCap: 384000000000, sector: 'Consumer Goods', volatility: 'low', description: 'Membership warehouse club' },
  { symbol: 'NKE', name: 'Nike Inc.', price: 108.75, previousClose: 107.50, volume: 8500000, marketCap: 168000000000, sector: 'Consumer Goods', volatility: 'medium', description: 'Athletic footwear and apparel' },
  { symbol: 'MCD', name: "McDonald's Corporation", price: 292.40, previousClose: 290.85, volume: 3200000, marketCap: 212000000000, sector: 'Consumer Goods', volatility: 'low', description: 'Fast food restaurant chain' },
  { symbol: 'SBUX', name: 'Starbucks Corporation', price: 98.65, previousClose: 97.90, volume: 7800000, marketCap: 113000000000, sector: 'Consumer Goods', volatility: 'medium', description: 'Coffeehouse chain' },

  // Industrial
  { symbol: 'BA', name: 'Boeing Company', price: 178.45, previousClose: 176.80, volume: 8500000, marketCap: 109000000000, sector: 'Industrial', volatility: 'high', description: 'Aerospace manufacturer' },
  { symbol: 'CAT', name: 'Caterpillar Inc.', price: 328.75, previousClose: 326.40, volume: 3200000, marketCap: 172000000000, sector: 'Industrial', volatility: 'medium', description: 'Construction and mining equipment' },
  { symbol: 'GE', name: 'General Electric', price: 168.90, previousClose: 167.25, volume: 5800000, marketCap: 185000000000, sector: 'Industrial', volatility: 'medium', description: 'Industrial conglomerate' },
  { symbol: 'MMM', name: '3M Company', price: 102.35, previousClose: 101.70, volume: 4200000, marketCap: 57000000000, sector: 'Industrial', volatility: 'low', description: 'Diversified technology company' },
  { symbol: 'HON', name: 'Honeywell International', price: 208.45, previousClose: 206.90, volume: 3100000, marketCap: 139000000000, sector: 'Industrial', volatility: 'low', description: 'Industrial conglomerate' },

  // Communications
  { symbol: 'T', name: 'AT&T Inc.', price: 21.85, previousClose: 21.65, volume: 32000000, marketCap: 156000000000, sector: 'Communications', volatility: 'low', description: 'Telecommunications company' },
  { symbol: 'VZ', name: 'Verizon Communications', price: 42.30, previousClose: 42.05, volume: 18000000, marketCap: 177000000000, sector: 'Communications', volatility: 'low', description: 'Telecommunications conglomerate' },
  { symbol: 'DIS', name: 'Walt Disney Company', price: 112.45, previousClose: 111.30, volume: 12000000, marketCap: 205000000000, sector: 'Communications', volatility: 'medium', description: 'Entertainment and media conglomerate' },
  { symbol: 'CMCSA', name: 'Comcast Corporation', price: 44.75, previousClose: 44.35, volume: 16000000, marketCap: 182000000000, sector: 'Communications', volatility: 'low', description: 'Telecommunications conglomerate' },

  // Real Estate
  { symbol: 'AMT', name: 'American Tower Corp', price: 218.50, previousClose: 217.25, volume: 2100000, marketCap: 101000000000, sector: 'Real Estate', volatility: 'low', description: 'Real estate investment trust' },
  { symbol: 'PLD', name: 'Prologis Inc.', price: 132.75, previousClose: 131.90, volume: 3400000, marketCap: 120000000000, sector: 'Real Estate', volatility: 'low', description: 'Logistics real estate' },
];

// Generate initial price history for a stock
export function generateInitialPriceHistory(
  currentPrice: number,
  volatility: 'low' | 'medium' | 'high',
  days: number = 365
): PricePoint[] {
  const history: PricePoint[] = [];
  const volatilityMap = { low: 0.01, medium: 0.02, high: 0.04 };
  const dailyVolatility = volatilityMap[volatility];

  let price = currentPrice * 0.8; // Start 20% lower a year ago
  const now = Date.now();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * millisecondsPerDay;

    // Generate intraday prices
    const open = price * (1 + (Math.random() - 0.5) * dailyVolatility * 0.5);
    const change = (Math.random() - 0.48) * dailyVolatility; // Slight upward bias
    const close = open * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * dailyVolatility * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * dailyVolatility * 0.5);
    const volume = Math.floor(Math.random() * 50000000 + 10000000);

    history.push({
      timestamp,
      price: close,
      open,
      high,
      low,
      close,
      volume,
    });

    price = close;
  }

  return history;
}

// Initialize all stocks with price history
export function initializeStocks(): Stock[] {
  return INITIAL_STOCKS.map(stock => {
    const priceHistory = generateInitialPriceHistory(stock.price, stock.volatility);
    const dayChange = stock.price - stock.previousClose;
    const dayChangePercent = (dayChange / stock.previousClose) * 100;

    return {
      ...stock,
      priceHistory,
      dayChange,
      dayChangePercent,
    };
  });
}
