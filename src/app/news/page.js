'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import NewsCard from '@/components/NewsCard';
import ErrorPage from '@/components/ErrorPage';
import NewsFilters from '@/components/NewsFilters';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    author: '',
    type: 'all'
  });

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      populateDropdowns();
    }
  }, [news]);

  useEffect(() => {
    applyFilters();
  }, [news, searchQuery, filters]);

  const populateDropdowns = () => {
    // Extract unique authors
    const authors = [...new Set(news.map(item => item.creator).filter(Boolean))].sort();
    setUniqueAuthors(authors);

    // Extract unique types from topics
    const types = [...new Set(news.flatMap(item => item.topics))].sort();
    setUniqueTypes(types);
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('https://api.newsdatahub.com/sandbox/news');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNews(data.data);
      setFilteredNews(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch news');
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...news];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply author filter
    if (filters.author) {
      filtered = filtered.filter(item =>
        item.creator?.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    // Apply date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(item =>
        new Date(item.pub_date) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(item =>
        new Date(item.pub_date) <= new Date(filters.dateRange.end)
      );
    }

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(item =>
        item.topics.includes(filters.type)
      );
    }

    setFilteredNews(filtered);
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      author: '',
      type: 'all'
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 flex flex-col h-screen">
          <div className="sticky top-16 bg-background z-10 p-8 pb-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Global News</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Latest updates from around the world
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative">
              <input
                type="search"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-gray-300 dark:focus:border-gray-700 focus:outline-none"
                placeholder="Search in news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filters */}
            <NewsFilters 
              onFilterChange={setFilters} 
              uniqueAuthors={uniqueAuthors}
              uniqueTypes={uniqueTypes}
              onReset={handleResetFilters}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            )}

            {error && <ErrorPage message={error} />}

            {!loading && !error && (
              <div className="grid gap-6">
                {filteredNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            )}

            {!loading && !error && filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No results found for your search criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 