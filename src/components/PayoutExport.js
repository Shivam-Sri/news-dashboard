const PayoutExport = ({ payoutData }) => {
  const exportToPDF = () => {
    // Implement PDF export using a library like jsPDF
  };

  const exportToCSV = () => {
    const headers = ['Author', 'Title', 'Date', 'Type', 'Payout'];
    const rows = payoutData.articles.map(article => [
      article.author,
      article.title,
      new Date(article.date).toLocaleDateString(),
      article.isPremium ? 'Premium' : 'Standard',
      article.payout.toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'payout_report.csv';
    link.click();
  };

  const exportToGoogleSheets = () => {
    // Implement Google Sheets export using Google Sheets API
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-medium mb-4">Export Report</h2>
      <div className="flex gap-4">
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Export as PDF
        </button>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Export as CSV
        </button>
        <button
          onClick={exportToGoogleSheets}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Export to Google Sheets
        </button>
      </div>
    </div>
  );
};

export default PayoutExport; 