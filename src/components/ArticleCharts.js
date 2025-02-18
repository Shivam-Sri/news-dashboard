'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ArticleCharts = ({ newsData }) => {
  const authorChartRef = useRef(null);
  const topicsChartRef = useRef(null);
  const authorChartInstance = useRef(null);
  const topicsChartInstance = useRef(null);

  const truncateLabel = (str, maxLength = 15) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  useEffect(() => {
    if (newsData.length > 0) {
      createCharts();
    }
    return () => {
      if (authorChartInstance.current) {
        authorChartInstance.current.destroy();
      }
      if (topicsChartInstance.current) {
        topicsChartInstance.current.destroy();
      }
    };
  }, [newsData]);

  const createCharts = () => {
    // Author distribution chart
    const authorData = {};
    newsData.forEach(item => {
      if (item.creator) {
        authorData[item.creator] = (authorData[item.creator] || 0) + 1;
      }
    });

    // Topics distribution chart
    const topicsData = {};
    newsData.forEach(item => {
      item.topics.forEach(topic => {
        topicsData[topic] = (topicsData[topic] || 0) + 1;
      });
    });

    createAuthorChart(authorData);
    createTopicsChart(topicsData);
  };

  const createAuthorChart = (data) => {
    const ctx = authorChartRef.current.getContext('2d');
    if (authorChartInstance.current) {
      authorChartInstance.current.destroy();
    }

    const originalLabels = Object.keys(data);
    const truncatedLabels = originalLabels.map(label => truncateLabel(label));

    authorChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: truncatedLabels,
        datasets: [{
          label: 'Articles per Author',
          data: Object.values(data),
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Article Distribution by Author',
            padding: 20
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                return originalLabels[context[0].dataIndex];
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          }
        }
      }
    });
  };

  const createTopicsChart = (data) => {
    const ctx = topicsChartRef.current.getContext('2d');
    if (topicsChartInstance.current) {
      topicsChartInstance.current.destroy();
    }

    // Sort data by value in descending order
    const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const originalLabels = sortedEntries.map(([label]) => label);
    const truncatedLabels = originalLabels.map(label => truncateLabel(label));
    const values = sortedEntries.map(([, value]) => value);

    // Generate colors for the sorted data
    const generateColors = (count) => {
      return Array.from({ length: count }, () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.5)`;
      });
    };

    const colors = generateColors(originalLabels.length);

    topicsChartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: truncatedLabels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            display: true,
            labels: {
              padding: 10,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          title: {
            display: true,
            text: 'Topics Distribution'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = originalLabels[context.dataIndex];
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="h-[400px]">
          <canvas ref={authorChartRef}></canvas>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="h-[400px]">
          <canvas ref={topicsChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ArticleCharts; 