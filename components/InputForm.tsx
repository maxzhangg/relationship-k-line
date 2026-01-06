import React, { useState, useEffect } from 'react';
import { PersonInput } from '../types';
import { Users, Calendar, MapPin, Key, ExternalLink, Info } from 'lucide-react';

interface Props {
  onSubmit: (pA: PersonInput, pB: PersonInput, start: number, end: number, apiKey: string) => void;
  isLoading: boolean;
}

const EmptyPerson: PersonInput = {
  name: '',
  gender: 'Male',
  birth: { date: '', time: '12:00', location: '' }
};

export const InputForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [personA, setPersonA] = useState<PersonInput>({ ...EmptyPerson, name: 'Alice', gender: 'Female' });
  const [personB, setPersonB] = useState<PersonInput>({ ...EmptyPerson, name: 'Bob', gender: 'Male' });
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [duration, setDuration] = useState(10);
  const [apiKey, setApiKey] = useState('');

  // Load API Key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('relationship_kline_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save key for future visits
    if (apiKey) {
      localStorage.setItem('relationship_kline_key', apiKey);
    }
    onSubmit(personA, personB, startYear, startYear + duration, apiKey);
  };

  const updatePerson = (who: 'A' | 'B', field: string, val: any) => {
    const setter = who === 'A' ? setPersonA : setPersonB;
    const current = who === 'A' ? personA : personB;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setter({ ...current, [parent]: { ...(current as any)[parent], [child]: val } });
    } else {
      setter({ ...current, [field]: val });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm max-w-4xl mx-auto">
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Person A */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-sky-400 flex items-center gap-2">
            <Users className="w-5 h-5" /> Person A
          </h3>
          <input 
            type="text" placeholder="Name" required
            value={personA.name}
            onChange={e => updatePerson('A', 'name', e.target.value)}
            className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 outline-none"
          />
          <select 
            value={personA.gender}
            onChange={e => updatePerson('A', 'gender', e.target.value)}
            className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div className="flex gap-2">
            <input 
              type="date" required
              value={personA.birth.date}
              onChange={e => updatePerson('A', 'birth.date', e.target.value)}
              className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <input 
              type="time" required
              value={personA.birth.time}
              onChange={e => updatePerson('A', 'birth.time', e.target.value)}
              className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text" placeholder="Birth City (e.g. New York)" required
              value={personA.birth.location}
              onChange={e => updatePerson('A', 'birth.location', e.target.value)}
              className="w-full bg-slate-800 border-slate-700 rounded pl-10 px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>
        </div>

        {/* Person B */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
            <Users className="w-5 h-5" /> Person B
          </h3>
          <input 
            type="text" placeholder="Name" required
            value={personB.name}
            onChange={e => updatePerson('B', 'name', e.target.value)}
            className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 outline-none"
          />
          <select 
            value={personB.gender}
            onChange={e => updatePerson('B', 'gender', e.target.value)}
            className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div className="flex gap-2">
            <input 
              type="date" required
              value={personB.birth.date}
              onChange={e => updatePerson('B', 'birth.date', e.target.value)}
              className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <input 
              type="time" required
              value={personB.birth.time}
              onChange={e => updatePerson('B', 'birth.time', e.target.value)}
              className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text" placeholder="Birth City (e.g. London)" required
              value={personB.birth.location}
              onChange={e => updatePerson('B', 'birth.location', e.target.value)}
              className="w-full bg-slate-800 border-slate-700 rounded pl-10 px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
         <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Start Year</label>
            <input 
              type="number" 
              value={startYear} 
              onChange={e => setStartYear(parseInt(e.target.value))}
              className="bg-slate-800 border-slate-700 text-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
            />
         </div>
         <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Duration (Years)</label>
            <select 
              value={duration} 
              onChange={e => setDuration(parseInt(e.target.value))}
              className="bg-slate-800 border-slate-700 text-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="5">5 Years</option>
              <option value="10">10 Years</option>
              <option value="20">20 Years</option>
            </select>
         </div>
      </div>

      {/* API Key Configuration */}
      <div className="pt-6 border-t border-slate-800">
        <div className="flex justify-between items-center mb-2">
            <label className="text-slate-400 text-xs uppercase font-bold flex items-center gap-2">
            <span className="flex items-center gap-2"><Key className="w-3 h-3" /> Google Gemini API Key</span>
            </label>
            <div className="flex gap-3 text-xs">
                <a href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1">
                    <Info className="w-3 h-3" /> Pricing Info
                </a>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold">
                    Get Key <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </div>
        
        <div className="relative">
          <input 
            type="password" 
            placeholder="AIzaSy... (Use a 'Pay-as-you-go' key to avoid Rate Limits)" 
            value={apiKey}
            required
            onChange={e => setApiKey(e.target.value)}
            className="w-full bg-slate-800 border-slate-700 rounded px-3 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm placeholder:text-slate-600"
          />
        </div>
        <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
          <strong>Tip:</strong> If you see "Resource Exhausted" errors, your free key is rate-limited. 
          Link your Google Cloud billing account in AI Studio to enable Pay-as-you-go (usually &lt;$0.10/month for personal use).
        </p>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
          isLoading 
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/20'
        }`}
      >
        {isLoading ? 'Consulting the Stars...' : 'Generate Cosmic Analysis'}
      </button>
    </form>
  );
};