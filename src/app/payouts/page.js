'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import PayoutRates from '@/components/PayoutRates';
import PayoutCalculator from '@/components/PayoutCalculator';
import PayoutExport from '@/components/PayoutExport';

export default function PayoutPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payoutData, setPayoutData] = useState({
    baseRate: 0,
    premiumRate: 0,
    totalPayout: 0,
    articles: []
  });

  useEffect(() => {
    fetchNews();
    loadPayoutRates();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('https://api.newsdatahub.com/sandbox/news');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNews(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch news');
      setLoading(false);
    }
  };

  const loadPayoutRates = () => {
    const savedRates = localStorage.getItem('payoutRates');
    if (savedRates) {
      const rates = JSON.parse(savedRates);
      setPayoutData(prev => ({
        ...prev,
        baseRate: rates.baseRate,
        premiumRate: rates.premiumRate
      }));
    }
  };

  const handleRateChange = (rates) => {
    localStorage.setItem('payoutRates', JSON.stringify(rates));
    setPayoutData(prev => ({
      ...prev,
      baseRate: rates.baseRate,
      premiumRate: rates.premiumRate
    }));
  };

  const calculatePayouts = () => {
    const articles = news.map(item => ({
      id: item.id,
      title: item.title,
      author: item.creator,
      date: item.pub_date,
      isPremium: item.topics.includes('Premium'),
      payout: item.topics.includes('Premium') ? payoutData.premiumRate : payoutData.baseRate
    }));

    const total = articles.reduce((sum, article) => sum + article.payout, 0);

    setPayoutData(prev => ({
      ...prev,
      articles,
      totalPayout: total
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <h1 className="text-2xl font-bold mb-8">Payout Management</h1>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              <PayoutRates 
                rates={payoutData}
                onRateChange={handleRateChange}
              />
              
              <PayoutCalculator
                payoutData={payoutData}
                onCalculate={calculatePayouts}
              />

              {payoutData.articles.length > 0 && (
                <PayoutExport 
                  payoutData={payoutData}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 