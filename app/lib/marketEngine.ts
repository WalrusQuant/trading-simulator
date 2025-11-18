import { Stock, PricePoint, MarketEvent, NewsItem, MarketState } from './types';

// Market simulation engine
export class MarketEngine {
  private stocks: Stock[];
  private marketState: MarketState;
  private events: MarketEvent[] = [];
  private news: NewsItem[] = [];
  private eventProbability = 0.001; // 0.1% chance per update

  constructor(stocks: Stock[]) {
    this.stocks = stocks;
    this.marketState = this.initializeMarketState();
  }

  private initializeMarketState(): MarketState {
    const now = new Date();
    const marketOpen = new Date(now);
    marketOpen.setHours(9, 30, 0, 0);
    const marketClose = new Date(now);
    marketClose.setHours(16, 0, 0, 0);

    return {
      isOpen: this.isMarketOpen(now),
      currentTime: now.getTime(),
      marketOpenTime: marketOpen.getTime(),
      marketCloseTime: marketClose.getTime(),
      lastUpdateTime: now.getTime(),
      marketSentiment: 'neutral',
    };
  }

  private isMarketOpen(date: Date): boolean {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDay();

    // Weekend check
    if (day === 0 || day === 6) return false;

    // Market hours: 9:30 AM to 4:00 PM
    const currentMinutes = hour * 60 + minute;
    const openMinutes = 9 * 60 + 30;
    const closeMinutes = 16 * 60;

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  // Update all stock prices
  updatePrices(): Stock[] {
    const now = Date.now();
    this.marketState.currentTime = now;
    this.marketState.isOpen = this.isMarketOpen(new Date(now));
    this.marketState.lastUpdateTime = now;

    // Check for random market events
    if (Math.random() < this.eventProbability) {
      this.generateMarketEvent();
    }

    this.stocks = this.stocks.map(stock => this.updateStockPrice(stock));
    return this.stocks;
  }

  private updateStockPrice(stock: Stock): Stock {
    const volatilityMap = { low: 0.002, medium: 0.005, high: 0.01 };
    const baseVolatility = volatilityMap[stock.volatility];

    // Reduce volatility when market is closed
    const volatility = this.marketState.isOpen ? baseVolatility : baseVolatility * 0.3;

    // Random walk with slight upward drift
    const drift = 0.0001;
    const randomChange = (Math.random() - 0.5) * volatility * 2;
    const priceChange = stock.price * (drift + randomChange);

    // Apply market sentiment
    const sentimentImpact = this.getSentimentImpact();
    const newPrice = Math.max(0.01, stock.price + priceChange + sentimentImpact);

    // Check for active events affecting this stock
    const eventImpact = this.getEventImpact(stock.symbol);
    const finalPrice = Math.max(0.01, newPrice * (1 + eventImpact));

    // Update price history
    const lastPoint = stock.priceHistory[stock.priceHistory.length - 1];
    const now = Date.now();

    // Only add new point if enough time has passed (1 minute)
    const shouldAddPoint = now - lastPoint.timestamp >= 60000;

    let newPriceHistory = stock.priceHistory;
    if (shouldAddPoint) {
      const newPoint: PricePoint = {
        timestamp: now,
        price: finalPrice,
        open: stock.price,
        high: Math.max(stock.price, finalPrice),
        low: Math.min(stock.price, finalPrice),
        close: finalPrice,
        volume: Math.floor(Math.random() * 1000000 + 500000),
      };

      newPriceHistory = [...stock.priceHistory.slice(-1000), newPoint]; // Keep last 1000 points
    }

    // Calculate day change
    const dayChange = finalPrice - stock.previousClose;
    const dayChangePercent = (dayChange / stock.previousClose) * 100;

    return {
      ...stock,
      price: finalPrice,
      dayChange,
      dayChangePercent,
      priceHistory: newPriceHistory,
      volume: stock.volume + Math.floor(Math.random() * 100000),
    };
  }

  private getSentimentImpact(): number {
    const sentimentMap = {
      bearish: -0.001,
      neutral: 0,
      bullish: 0.001,
    };
    return sentimentMap[this.marketState.marketSentiment];
  }

  private getEventImpact(symbol: string): number {
    const now = Date.now();
    let totalImpact = 0;

    this.events.forEach(event => {
      const isActive = now < event.timestamp + event.duration * 60000;
      const isAffected = event.affectedSymbols.includes(symbol);

      if (isActive && isAffected) {
        totalImpact += event.priceImpact / 100;
      }
    });

    // Clean up expired events
    this.events = this.events.filter(
      event => now < event.timestamp + event.duration * 60000
    );

    return totalImpact;
  }

  private generateMarketEvent(): void {
    const eventTypes = ['earnings', 'merger', 'crash', 'rally', 'regulation', 'product-launch'] as const;
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    const affectedCount = Math.floor(Math.random() * 5) + 1;
    const affectedSymbols = this.getRandomStocks(affectedCount).map(s => s.symbol);

    const eventTemplates = {
      earnings: {
        title: 'Strong Earnings Report',
        description: 'Company beats analyst expectations',
        priceImpact: Math.random() * 5 + 2,
        duration: 120,
      },
      merger: {
        title: 'Merger Announcement',
        description: 'Major acquisition in progress',
        priceImpact: Math.random() * 8 + 3,
        duration: 240,
      },
      crash: {
        title: 'Market Correction',
        description: 'Sudden price decline',
        priceImpact: -(Math.random() * 10 + 5),
        duration: 180,
      },
      rally: {
        title: 'Market Rally',
        description: 'Strong bullish momentum',
        priceImpact: Math.random() * 6 + 3,
        duration: 150,
      },
      regulation: {
        title: 'New Regulation',
        description: 'Government policy changes',
        priceImpact: -(Math.random() * 4 + 1),
        duration: 200,
      },
      'product-launch': {
        title: 'Product Launch',
        description: 'New product announcement',
        priceImpact: Math.random() * 7 + 2,
        duration: 180,
      },
    };

    const template = eventTemplates[type];
    const event: MarketEvent = {
      id: `event_${Date.now()}_${Math.random()}`,
      type,
      title: template.title,
      description: template.description,
      timestamp: Date.now(),
      affectedSymbols,
      priceImpact: template.priceImpact,
      duration: template.duration,
    };

    this.events.push(event);

    // Generate corresponding news
    this.generateNews(event);
  }

  private generateNews(event: MarketEvent): void {
    const news: NewsItem = {
      id: `news_${Date.now()}_${Math.random()}`,
      title: event.title,
      content: event.description,
      timestamp: event.timestamp,
      affectedSymbols: event.affectedSymbols,
      impact: event.priceImpact > 0 ? 'positive' : 'negative',
      severity: Math.abs(event.priceImpact) > 5 ? 'high' : Math.abs(event.priceImpact) > 2 ? 'medium' : 'low',
    };

    this.news.unshift(news);
    this.news = this.news.slice(0, 50); // Keep last 50 news items
  }

  private getRandomStocks(count: number): Stock[] {
    const shuffled = [...this.stocks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  getMarketState(): MarketState {
    return this.marketState;
  }

  getNews(): NewsItem[] {
    return this.news;
  }

  getEvents(): MarketEvent[] {
    return this.events;
  }

  setMarketSentiment(sentiment: 'bearish' | 'neutral' | 'bullish'): void {
    this.marketState.marketSentiment = sentiment;
  }
}

// Singleton instance
let marketEngineInstance: MarketEngine | null = null;

export function getMarketEngine(stocks?: Stock[]): MarketEngine {
  if (!marketEngineInstance && stocks) {
    marketEngineInstance = new MarketEngine(stocks);
  }
  return marketEngineInstance!;
}

export function resetMarketEngine(): void {
  marketEngineInstance = null;
}
