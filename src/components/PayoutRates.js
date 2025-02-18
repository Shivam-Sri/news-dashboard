const PayoutRates = ({ rates, onRateChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onRateChange({
      ...rates,
      [name]: parseFloat(value) || 0,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-medium mb-4">Set Payout Rates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Base Rate (per article)
          </label>{" "}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              name="baseRate"
              value={rates.baseRate}
              onChange={handleChange}
              className="w-full pl-8 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-700"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Premium Rate (per article)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              name="premiumRate"
              value={rates.premiumRate}
              onChange={handleChange}
              className="w-full pl-8 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-700"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutRates;
