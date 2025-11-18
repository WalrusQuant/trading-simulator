import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/Navigation'
import { MarketProvider } from './components/MarketProvider'

export const metadata: Metadata = {
  title: 'Stock Market Simulator - Practice Trading Without Risk',
  description: 'Learn to trade stocks with our comprehensive market simulator. Practice with $100,000 virtual cash, real-time market data, and track your performance.',
  keywords: 'stock trading simulator, practice trading, virtual portfolio, learn investing, stock market game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <MarketProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-auto">
              <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
                <p>© 2024 Stock Market Simulator. Educational purposes only. Not financial advice.</p>
              </div>
            </footer>
          </div>
        </MarketProvider>
      </body>
    </html>
  )
}
