import React from 'react';
import { FileSpreadsheet, FileText } from 'lucide-react';

export default function ExportControls() {
  const exportExcel = () => {
    const rows = [
      ['Date', 'Staff', 'Status', 'Notes'],
      ['2025-01-01', 'Muhammad Halim Naufal', 'Present', '-'],
      ['2025-01-01', 'Muhammad Rafli Nurin', 'Sick', 'Fever'],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance-sample.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="bg-black/60 backdrop-blur rounded-2xl p-4 sm:p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-3">Export Data</h2>
      <div className="flex flex-wrap gap-3">
        <button onClick={exportExcel} className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-800">
          <FileSpreadsheet className="w-4 h-4 text-[#39FF14]" /> Export to CSV (Excel)
        </button>
        <button onClick={exportPDF} className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-800">
          <FileText className="w-4 h-4 text-blue-400" /> Export to PDF
        </button>
      </div>
    </div>
  );
}
