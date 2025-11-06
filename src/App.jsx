import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import StaffManager from './components/StaffManager';
import AttendanceForm from './components/AttendanceForm';
import MonthlyRecap from './components/MonthlyRecap';
import ExportControls from './components/ExportControls';

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-10">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <StaffManager onSelect={setSelected} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <AttendanceForm selectedStaff={selected} />
            <MonthlyRecap />
            <ExportControls />
          </div>
        </div>

        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with a neon green alien space theme • Admin-only demo
        </footer>
      </div>
    </div>
  );
}

export default App;
