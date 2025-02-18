const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {news.source_title}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(news.pub_date)}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
            <a href={news.article_link} target="_blank" rel="noopener noreferrer">
              {news.title}
            </a>
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {news.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {news.topics.map((topic, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {news.creator && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">By {news.creator}</span>
              </div>
            )}
            
            {news.sentiment && (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded">
                    Pos: {(news.sentiment.pos * 100).toFixed(1)}%
                  </span>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs rounded">
                    Neg: {(news.sentiment.neg * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {news.media_thumbnail && (
          <div className="ml-6 flex-shrink-0">
            <img 
              src={news.media_thumbnail} 
              alt={news.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default NewsCard; 