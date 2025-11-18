'use client';

export default function LearnPage() {
  const tutorials = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of stock trading and how to use this simulator',
      topics: [
        'Understanding stocks and shares',
        'How the stock market works',
        'Reading stock prices and charts',
        'Market orders vs. limit orders',
      ],
    },
    {
      title: 'Portfolio Management',
      description: 'Build and manage a diversified investment portfolio',
      topics: [
        'Importance of diversification',
        'Asset allocation strategies',
        'Risk management techniques',
        'Rebalancing your portfolio',
      ],
    },
    {
      title: 'Technical Analysis',
      description: 'Learn to read charts and identify trading opportunities',
      topics: [
        'Candlestick patterns',
        'Support and resistance levels',
        'Moving averages',
        'Volume analysis',
      ],
    },
    {
      title: 'Trading Strategies',
      description: 'Explore different approaches to trading stocks',
      topics: [
        'Day trading vs. long-term investing',
        'Value investing principles',
        'Growth stock strategies',
        'Momentum trading',
      ],
    },
  ];

  const glossary = [
    { term: 'Ask Price', definition: 'The lowest price a seller is willing to accept' },
    { term: 'Bid Price', definition: 'The highest price a buyer is willing to pay' },
    { term: 'Market Cap', definition: 'Total value of a company\'s outstanding shares' },
    { term: 'Volatility', definition: 'Measure of price fluctuation over time' },
    { term: 'Portfolio', definition: 'Collection of financial investments' },
    { term: 'Diversification', definition: 'Spreading investments across different assets' },
    { term: 'Bull Market', definition: 'Market condition with rising prices' },
    { term: 'Bear Market', definition: 'Market condition with falling prices' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Learn Trading</h1>
        <p className="text-gray-400">
          Educational resources to help you become a better trader
        </p>
      </div>

      {/* Tutorials */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Trading Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">{tutorial.title}</h3>
              <p className="text-gray-400 mb-4">{tutorial.description}</p>
              <ul className="space-y-2">
                {tutorial.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="flex items-start text-gray-300">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trading Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Trading Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-lg p-6">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-bold text-white mb-2">Start Small</h3>
            <p className="text-gray-300 text-sm">
              Begin with small positions to minimize risk while you learn. You can always increase your investment as you gain confidence.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 rounded-lg p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Set Goals</h3>
            <p className="text-gray-300 text-sm">
              Define clear investment goals and stick to your strategy. Avoid emotional trading and stay disciplined.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30 rounded-lg p-6">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-white mb-2">Keep Learning</h3>
            <p className="text-gray-300 text-sm">
              Continuous education is key. Study market trends, learn from mistakes, and stay informed about economic news.
            </p>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trading Glossary</h2>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossary.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-white font-bold mb-1">{item.term}</h3>
                <p className="text-gray-400 text-sm">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
        <h3 className="text-yellow-400 font-bold mb-2">⚠️ Educational Purpose Only</h3>
        <p className="text-gray-300 text-sm">
          This simulator is for educational purposes only. Real stock trading involves risk and can result in loss of capital.
          Always do your own research and consider consulting with a financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}
