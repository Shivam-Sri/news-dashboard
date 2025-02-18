'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ErrorPage from '@/components/ErrorPage';
import DashboardStats from '@/components/DashboardStats';
import ArticleCharts from '@/components/ArticleCharts';

export default function DashboardPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalArticles: 0,
    uniqueAuthors: 0,
    uniqueTopics: 0
  });

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      calculateStats();
    }
  }, [news]);

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

  const calculateStats = () => {
    const uniqueAuthors = new Set(news.map(item => item.creator).filter(Boolean));
    const uniqueTopics = new Set(news.flatMap(item => item.topics));

    setStats({
      totalArticles: news.length,
      uniqueAuthors: uniqueAuthors.size,
      uniqueTopics: uniqueTopics.size
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <h1 className="text-2xl font-bold mb-8">Analytics Dashboard</h1>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          )}

          {error && <ErrorPage message={error} />}

          {!loading && !error && (
            <>
              <DashboardStats stats={stats} />
              <div className="mt-8">
                <ArticleCharts newsData={news} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
} 