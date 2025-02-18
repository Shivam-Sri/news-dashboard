import { useState, useEffect } from 'react';

const NewsFilters = ({ onFilterChange, uniqueAuthors = [], uniqueTypes = [], onReset }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('all');

  const handleFilterChange = (filterType, value) => {
    let newFilters;
    switch (filterType) {
      case 'date':
        newFilters = { ...dateRange, ...value };
        setDateRange(newFilters);
        onFilterChange({ dateRange: newFilters, author, type });
        break;
      case 'author':
        newFilters = value;
        setAuthor(value);
        onFilterChange({ dateRange, author: value, type });
        break;
      case 'type':
        newFilters = value;
        setType(value);
        onFilterChange({ dateRange, author, type: value });
        break;
    }
  };

  const handleReset = () => {
    setDateRange({ start: '', end: '' });
    setAuthor('');
    setType('all');
    onReset();
  };

  const isFiltersActive = () => {
    return dateRange.start || dateRange.end || author || type !== 'all';
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        {isFiltersActive() && (
          <button
            onClick={handleReset}
            className="flex items-center text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reset Filters
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Date Range Filters */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-700"
            value={dateRange.start}
            onChange={(e) => handleFilterChange('date', { start: e.target.value, end: dateRange.end })}
            max={dateRange.end || undefined}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-700"
            value={dateRange.end}
            onChange={(e) => handleFilterChange('date', { start: dateRange.start, end: e.target.value })}
            min={dateRange.start || undefined}
          />
        </div>

        {/* Author Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Author
          </label>
          <select
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-700"
            value={author}
            onChange={(e) => handleFilterChange('author', e.target.value)}
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((authorName) => (
              <option key={authorName} value={authorName}>
                {authorName}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </label>
          <select
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-700"
            value={type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            {uniqueTypes.map((typeName) => (
              <option key={typeName} value={typeName}>
                {typeName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NewsFilters; 