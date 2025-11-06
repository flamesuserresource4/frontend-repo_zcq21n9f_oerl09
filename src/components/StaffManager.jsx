import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

const initialStaff = [
  { id: 1, full_name: 'Muhammad Halim Naufal', nickname: 'Halim', created_at: new Date().toISOString() },
  { id: 2, full_name: 'Muhammad Rafli Nurin', nickname: 'Rafli', created_at: new Date().toISOString() },
];

export default function StaffManager({ onSelect }) {
  const [staff, setStaff] = useState(initialStaff);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ id: null, full_name: '', nickname: '' });

  useEffect(() => {
    // In a future iteration, this would load from backend
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return staff.filter(
      s => s.full_name.toLowerCase().includes(q) || s.nickname.toLowerCase().includes(q)
    );
  }, [query, staff]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.full_name || !form.nickname) return;
    if (form.id) {
      setStaff(prev => prev.map(s => (s.id === form.id ? { ...s, ...form } : s)));
    } else {
      const newItem = { id: Date.now(), full_name: form.full_name, nickname: form.nickname, created_at: new Date().toISOString() };
      setStaff(prev => [...prev, newItem]);
    }
    setForm({ id: null, full_name: '', nickname: '' });
  };

  const editItem = item => setForm(item);
  const deleteItem = id => setStaff(prev => prev.filter(s => s.id !== id));

  return (
    <section className="bg-black/60 backdrop-blur rounded-2xl p-4 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Staff</h2>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="bg-transparent outline-none text-sm text-gray-200 flex-1"
            placeholder="Search by name or nickname"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
        <input
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500"
          placeholder="Full name"
          value={form.full_name}
          onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
        />
        <input
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500"
          placeholder="Nickname"
          value={form.nickname}
          onChange={e => setForm(f => ({ ...f, nickname: e.target.value }))}
        />
        <button type="submit" className="inline-flex items-center justify-center gap-2 bg-[#39FF14] text-black font-semibold rounded-lg px-3 py-2 text-sm hover:brightness-95 transition">
          <Plus className="w-4 h-4" /> {form.id ? 'Update Staff' : 'Add Staff'}
        </button>
      </form>

      <ul className="space-y-2">
        {filtered.map(item => (
          <li key={item.id} className="flex items-center justify-between bg-gray-900/60 border border-gray-800 rounded-lg px-3 py-2">
            <div className="min-w-0">
              <p className="text-gray-100 truncate text-sm">{item.full_name}</p>
              <p className="text-xs text-gray-400">{item.nickname}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onSelect?.(item)} className="text-xs text-[#39FF14] underline decoration-dotted">Select</button>
              <button onClick={() => editItem(item)} className="p-1 hover:bg-gray-800 rounded">
                <Pencil className="w-4 h-4 text-gray-300" />
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-1 hover:bg-gray-800 rounded">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
