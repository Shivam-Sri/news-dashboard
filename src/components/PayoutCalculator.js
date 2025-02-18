const PayoutCalculator = ({ payoutData, onCalculate }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Payout Calculator</h2>
        <button
          onClick={onCalculate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate Payouts
        </button>
      </div>

      {payoutData.articles.length > 0 && (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Author</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {payoutData.articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{article.author}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{article.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(article.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {article.isPremium ? 'Premium' : 'Standard'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 text-right">
                      ${article.payout.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Total</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
                    ${payoutData.totalPayout.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayoutCalculator; 