# Stock Market Trading Simulator

A comprehensive web-based stock market trading simulator built with Next.js 14, TypeScript, and Tailwind CSS. Practice trading with $100,000 virtual cash, track real-time market data, and learn investing strategies without financial risk.

![Stock Market Simulator](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=flat-square&logo=tailwindcss)

## Features

### Core Trading Features
- **Virtual Portfolio Management**: Start with $100,000 in virtual cash
- **Real-Time Stock Data**: Live stock prices with realistic price movements
- **Buy/Sell Orders**: Execute market orders with 0.1% transaction fees
- **Portfolio Analytics**: Track performance, gains/losses, and asset allocation
- **Transaction History**: Complete record of all trades with timestamps
- **Watchlist**: Monitor favorite stocks with quick access to trading

### Educational Features
- **Market News Feed**: Simulated news events that impact stock prices
- **Trading Tutorials**: Interactive guides for beginners
- **Performance Metrics**: P&L statements, return percentages, and analytics
- **Leaderboard**: Compare performance with other traders
- **Achievement System**: Unlock badges for trading milestones

### Market Simulation
- **Realistic Price Movement**: Stocks move based on volatility patterns
- **Market Events**: Random events (earnings, mergers, crashes) affect prices
- **Multiple Sectors**: Technology, Healthcare, Finance, Energy, Consumer Goods
- **50+ Stocks**: Diverse selection across different sectors
- **Historical Charts**: Interactive price charts with multiple timeframes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trading-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
/app
  /components      # Reusable UI components
    - Navigation.tsx
    - StockCard.tsx
    - PortfolioSummary.tsx
    - OrderForm.tsx
    - PriceChart.tsx
    - MarketProvider.tsx
  /lib            # Utility functions and business logic
    - types.ts          # TypeScript interfaces
    - stocks.ts         # Stock data and initialization
    - marketEngine.ts   # Market simulation engine
    - storage.ts        # localStorage utilities
    - utils.ts          # Helper functions
  /portfolio      # Portfolio page
  /trade          # Trading page
  /markets        # Markets overview page
  /stocks/[symbol] # Individual stock detail page
  /watchlist      # Watchlist page
  /history        # Transaction history page
  /leaderboard    # Leaderboard page
  /learn          # Educational resources page
  /settings       # Settings page
  layout.tsx      # Root layout
  page.tsx        # Dashboard/home page
  globals.css     # Global styles
/public           # Static assets
```

## Key Features Explained

### Market Simulation Engine

The market engine (`app/lib/marketEngine.ts`) provides:
- **Price Updates**: Stocks update every 5 seconds with realistic volatility
- **Random Walk Algorithm**: Prices follow a random walk with drift
- **Market Events**: Randomly generated events that affect stock prices
- **News Generation**: Automatic news creation based on market events
- **Market Sentiment**: Overall market conditions (bullish/bearish/neutral)

### Data Persistence

All user data is stored in `localStorage`:
- Portfolio holdings and cash balance
- Transaction history
- Watchlist items
- User preferences and settings
- User statistics and achievements

### Stock Data

50+ stocks across sectors:
- **Technology**: AAPL, MSFT, GOOGL, AMZN, META, NVDA, TSLA, etc.
- **Healthcare**: JNJ, UNH, PFE, ABBV, TMO, MRNA, LLY
- **Finance**: JPM, BAC, WFC, GS, MS, V, MA, PYPL
- **Energy**: XOM, CVX, COP, SLB, NEE
- **Consumer Goods**: WMT, PG, KO, PEP, COST, NKE, MCD, SBUX
- **Industrial**: BA, CAT, GE, MMM, HON
- **Communications**: T, VZ, DIS, CMCSA
- **Real Estate**: AMT, PLD

## Pages Overview

### Dashboard (`/`)
- Portfolio summary with key metrics
- Current holdings overview
- Top gainers and losers
- Market news feed
- Quick actions sidebar

### Portfolio (`/portfolio`)
- Detailed holdings view
- Portfolio statistics
- Sortable positions
- Individual holding cards with P&L

### Trade (`/trade`)
- Browse all available stocks
- Search and filter functionality
- Sector filtering
- Sort by various metrics

### Stock Detail (`/stocks/[symbol]`)
- Interactive price charts
- Detailed stock statistics
- Buy/sell order form
- Current position (if owned)

### Markets (`/markets`)
- Market overview and statistics
- Sector performance table
- Top gainers, losers, and most active
- Market sentiment indicators

### Watchlist (`/watchlist`)
- Personal stock watchlist
- Add/remove stocks
- Quick access to stock details

### History (`/history`)
- Complete transaction history
- Filter by buy/sell
- Transaction statistics
- Detailed trade information

### Leaderboard (`/leaderboard`)
- Rankings by portfolio value
- Performance comparison
- User statistics
- Level and win rate display

### Learn (`/learn`)
- Trading tutorials
- Educational resources
- Trading glossary
- Tips and best practices

### Settings (`/settings`)
- User profile customization
- Trading preferences
- Notification settings
- Portfolio reset option

## Gamification System

### Levels and XP
- Earn XP for each trade
- Level up as you gain experience
- XP based on trade profitability

### Achievements
- First Trade
- Active Trader (10 trades)
- Veteran Trader (100 trades)
- Profit Master (60%+ win rate)
- Hot Streak (5+ consecutive wins)
- Big Win ($10,000+ profit on single trade)

### Statistics Tracked
- Total trades
- Profitable trades
- Win rate
- Best/worst trades
- Current streak
- Best streak

## Customization

### Adding New Stocks

Edit `app/lib/stocks.ts` and add to `INITIAL_STOCKS`:

```typescript
{
  symbol: 'XYZ',
  name: 'XYZ Corporation',
  price: 100.00,
  previousClose: 98.50,
  volume: 10000000,
  marketCap: 50000000000,
  sector: 'Technology',
  volatility: 'medium',
  description: 'Description here'
}
```

### Adjusting Market Speed

Modify the interval in `app/components/MarketProvider.tsx`:

```typescript
// Current: 5000ms (5 seconds)
const interval = setInterval(() => {
  // Update code
}, 5000);
```

### Changing Initial Cash

Edit `app/lib/storage.ts` in `getDefaultPortfolio()`:

```typescript
return {
  cash: 100000, // Change this value
  // ...
};
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the static export:

```bash
npm run build
```

Deploy the `.next` folder to your hosting platform.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers supported

## Known Limitations

- Data stored in localStorage (cleared if cache is cleared)
- Single-user experience (no backend/database)
- Simulated market data (not real stock prices)
- No real money involved

## Future Enhancements

Potential features for future versions:
- [ ] Options trading
- [ ] Crypto trading
- [ ] News API integration
- [ ] Social features (friend leaderboards)
- [ ] Advanced order types (stop-loss, limit orders)
- [ ] Portfolio sharing
- [ ] Export data to CSV
- [ ] Dark/light theme toggle
- [ ] Mobile app version
- [ ] Backend integration for multi-user support

## Contributing

This is an educational project. Feel free to fork and customize for your needs.

## License

MIT License - Feel free to use this project for educational purposes.

## Disclaimer

**This is a simulation for educational purposes only.**

This application does not use real money or real stock market data. It is designed to help users learn about stock trading in a risk-free environment. Real stock trading involves substantial risk of loss. Always do your own research and consult with a qualified financial advisor before making investment decisions.

## Support

For issues or questions:
1. Check the documentation above
2. Review the code comments
3. Open an issue on GitHub

---

**Happy Trading! 📈**
