import React, { useMemo, useState } from 'react';
import { PieChart, CalendarRange, FileDown } from 'lucide-react';

export default function MonthlyRecap() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));

  // Mock data for visualization
  const data = useMemo(() => ({ Present: 16, Sick: 2, Permission: 1, Absent: 3 }), []);

  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const rows = Object.entries(data);

  const exportCSV = () => {
    const lines = [
      ['Status', 'Count'],
      ...rows.map(([k, v]) => [k, String(v)]),
    ];
    const csv = lines.map(l => l.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-black/60 backdrop-blur rounded-2xl p-4 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Monthly Recap</h2>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 text-xs bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-gray-100 hover:bg-gray-700">
          <FileDown className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Month</label>
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 w-full">
            <CalendarRange className="w-4 h-4 text-gray-400" />
            <input type="month" value={month} onChange={e => setMonth(e.target.value)} className="bg-transparent outline-none text-sm text-gray-100 flex-1" />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-gray-300 text-sm mb-2">
              <span>Total Days</span>
              <span className="font-semibold text-white">{total}</span>
            </div>
            <ul className="space-y-1">
              {rows.map(([label, value]) => (
                <li key={label} className="flex items-center justify-between text-sm text-gray-300">
                  <span>{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#39FF14]/20 to-blue-400/10 border border-gray-700 flex items-center justify-center">
            <PieChart className="w-8 h-8 text-[#39FF14]" />
          </div>
        </div>
      </div>
    </section>
  );
}
