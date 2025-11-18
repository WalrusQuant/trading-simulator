'use client';

import { useEffect, useState } from 'react';
import { getPreferences, savePreferences, resetAllData, getUserStats } from '../lib/storage';
import { UserPreferences } from '../lib/types';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [userStats, setUserStats] = useState<any>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setPreferences(getPreferences());
    setUserStats(getUserStats());
  }, []);

  const handleSave = () => {
    if (preferences) {
      savePreferences(preferences);
      setNotification('Settings saved successfully!');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    setNotification('Portfolio reset successfully!');
    setTimeout(() => {
      router.push('/');
      router.refresh();
    }, 1500);
  };

  if (!preferences) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Customize your trading experience
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-400">
          {notification}
        </div>
      )}

      {/* User Profile */}
      <section className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Username</label>
            <input
              type="text"
              value={preferences.username}
              onChange={(e) => setPreferences({ ...preferences, username: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {userStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-gray-400 text-sm">Level</p>
                <p className="text-white text-xl font-bold">{userStats.level}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Trades</p>
                <p className="text-white text-xl font-bold">{userStats.totalTrades}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Win Rate</p>
                <p className="text-white text-xl font-bold">{userStats.winRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">XP</p>
                <p className="text-white text-xl font-bold">{userStats.xp}/{userStats.xpToNextLevel}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Appearance */}
      <section className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Appearance</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Theme</label>
            <select
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as any })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light (Coming Soon)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Trading Preferences */}
      <section className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Trading Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Difficulty</label>
            <select
              value={preferences.difficulty}
              onChange={(e) => setPreferences({ ...preferences, difficulty: e.target.value as any })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">Easy - Low volatility, slower market</option>
              <option value="medium">Medium - Balanced experience</option>
              <option value="hard">Hard - High volatility, fast market</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Market Speed</label>
            <select
              value={preferences.marketSpeed}
              onChange={(e) => setPreferences({ ...preferences, marketSpeed: e.target.value as any })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="slow">Slow - Updates every 10 seconds</option>
              <option value="normal">Normal - Updates every 5 seconds</option>
              <option value="fast">Fast - Updates every 2 seconds</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Sound Effects</p>
              <p className="text-gray-400 text-sm">Play sounds for trades and alerts</p>
            </div>
            <button
              onClick={() => setPreferences({ ...preferences, soundEnabled: !preferences.soundEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Price Alerts</p>
              <p className="text-gray-400 text-sm">Receive notifications for price changes</p>
            </div>
            <button
              onClick={() => setPreferences({ ...preferences, notificationsEnabled: !preferences.notificationsEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.notificationsEnabled ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium mb-6"
      >
        Save Settings
      </button>

      {/* Reset Portfolio */}
      <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h2>
        <p className="text-gray-400 mb-4">
          Reset your portfolio to start fresh with $100,000. This action cannot be undone.
        </p>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
          >
            Reset Portfolio
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-white font-medium">Are you sure? This will delete all your:</p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Current holdings</li>
              <li>Transaction history</li>
              <li>Trading statistics</li>
              <li>Achievements and progress</li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
