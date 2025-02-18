import jsPDF from 'jspdf';

const PayoutExport = ({ payoutData }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Payout Report', 20, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Add total payout
    doc.text(`Total Payout: $${payoutData.totalPayout.toFixed(2)}`, 20, 40);
    
    // Table headers
    const headers = ['Author', 'Title', 'Date', 'Type', 'Payout'];
    const columnWidths = [40, 60, 30, 25, 25];
    let yPos = 60;
    
    // Style for headers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    
    // Draw headers
    let xPos = 20;
    headers.forEach((header, index) => {
      doc.text(header, xPos, yPos);
      xPos += columnWidths[index];
    });
    
    // Style for content
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    
    // Draw content
    payoutData.articles.forEach((article, index) => {
      // Reset x position for each row
      xPos = 20;
      
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      // Add each column
      doc.text((article?.author || 'Unknown').substring(0, 20), xPos, yPos);
      xPos += columnWidths[0];
      
      doc.text((article?.title || 'Untitled').substring(0, 30), xPos, yPos);
      xPos += columnWidths[1];
      
      doc.text(article?.date ? new Date(article.date).toLocaleDateString() : 'No date', xPos, yPos);
      xPos += columnWidths[2];
      
      doc.text(article?.isPremium ? 'Premium' : 'Standard', xPos, yPos);
      xPos += columnWidths[3];
      
      doc.text(`$${(article?.payout || 0).toFixed(2)}`, xPos, yPos);
      
      yPos += 7;
    });
    
    // Save the PDF
    doc.save('payout_report.pdf');
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