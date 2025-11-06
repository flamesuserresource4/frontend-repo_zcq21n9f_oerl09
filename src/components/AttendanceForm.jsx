import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, CheckCircle2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statuses = ['Present', 'Sick', 'Permission', 'Absent'];

export default function AttendanceForm({ selectedStaff }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState(statuses[0]);
  const [notes, setNotes] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showCelebrate, setShowCelebrate] = useState(false);
  const audioRef = useRef(null);

  // Auto-fill name from nickname pattern example
  useEffect(() => {
    if (selectedStaff?.full_name) setNameInput(selectedStaff.full_name);
  }, [selectedStaff]);

  const handleSubmit = e => {
    e.preventDefault();
    setShowCelebrate(true);
    audioRef.current && audioRef.current.play().catch(() => {});
    setTimeout(() => setShowCelebrate(false), 2200);
  };

  const suggestions = useMemo(() => {
    const roster = [
      { full_name: 'Muhammad Halim Naufal', nickname: 'Halim' },
      { full_name: 'Muhammad Rafli Nurin', nickname: 'Rafli' },
    ];
    const q = nameInput.trim().toLowerCase();
    if (!q) return [];
    return roster.filter(r => r.nickname.toLowerCase().includes(q) || r.full_name.toLowerCase().includes(q));
  }, [nameInput]);

  return (
    <section className="relative bg-black/60 backdrop-blur rounded-2xl p-4 sm:p-6 border border-gray-800 overflow-hidden">
      <h2 className="text-lg font-semibold text-white mb-4">Input Attendance</h2>
      <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Staff</label>
          <input
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500"
            placeholder="Type nickname (e.g., Halim) to auto-complete"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            list="staff-suggestions"
          />
          <datalist id="staff-suggestions">
            {suggestions.map((s, i) => (
              <option key={i} value={s.full_name} />
            ))}
          </datalist>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Date</label>
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-transparent outline-none text-sm text-gray-100 flex-1" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100">
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Notes</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500" />
          </div>
        </div>

        <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 bg-[#39FF14] text-black font-semibold rounded-lg px-4 py-2 text-sm hover:brightness-95 transition">
          <Save className="w-4 h-4" /> Submit Attendance
        </button>
      </form>

      <AnimatePresence>
        {showCelebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ x: '-120%', rotate: -10 }}
              animate={{ x: '120%', rotate: 10 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute top-1/3 left-0"
            >
              <div className="relative">
                <div className="w-28 h-8 bg-gray-300 rounded-full mx-auto blur-[1px]" />
                <div className="w-36 h-10 bg-gray-500 rounded-full -mt-4 mx-auto" />
                <div className="w-24 h-6 bg-[#39FF14] rounded-full -mt-6 mx-auto" />
                <div className="w-4 h-4 bg-blue-400 rounded-full -mt-7 mx-auto" />
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-green-400/30 blur-sm" />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
              className="relative bg-gray-900/90 border border-gray-700 rounded-xl px-4 py-3 text-center"
            >
              <div className="text-4xl mb-1 drop-shadow-[0_0_12px_#39FF14]">👽</div>
              <p className="text-white font-semibold">Oooooo~ Attendance Saved!</p>
              <p className="text-xs text-gray-400">Beamed to the mothership</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef}>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_88a1d25b90.mp3?filename=success-1-6297.mp3" type="audio/mpeg" />
      </audio>
    </section>
  );
}
