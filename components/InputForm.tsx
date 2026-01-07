import React, { useState, useEffect } from 'react';
import { PersonInput } from '../types';
import { Users, Calendar, MapPin, Key, ExternalLink, Info, Globe, Map } from 'lucide-react';
import { getCountries, getRegions, getCities } from '../services/cityData';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onSubmit: (pA: PersonInput, pB: PersonInput, start: number, end: number, apiKey: string) => void;
  isLoading: boolean;
}

const getEmptyPerson = (): PersonInput => ({
  name: '',
  gender: 'Male',
  birth: { 
    date: '', 
    time: '12:00', 
    country: 'China', 
    region: 'Beijing',
    city: 'Beijing',
    lat: 39.9042,
    lon: 116.4074,
    timezoneOffset: 8
  }
});

export const InputForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const { t, language } = useLanguage();
  
  // Initialize with deep copies using the factory function
  const [personA, setPersonA] = useState<PersonInput>(() => ({ ...getEmptyPerson(), name: 'Alice', gender: 'Female' }));
  const [personB, setPersonB] = useState<PersonInput>(() => ({ ...getEmptyPerson(), name: 'Bob', gender: 'Male' }));
  
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
    
    setter(prev => {
      // Handle nested updates for 'birth' property safely and immutably
      if (field.startsWith('birth.')) {
        const key = field.split('.')[1];
        return {
          ...prev,
          birth: {
            ...prev.birth,
            [key]: val
          }
        };
      }
      
      // Handle top-level updates
      return {
        ...prev,
        [field]: val
      };
    });
  };

  // --- LOCATION HANDLERS ---

  const handleCountryChange = (who: 'A' | 'B', countryName: string) => {
    // Note: inputs store English values (IDs), UI displays localized labels
    const regions = getRegions(countryName, language);
    const defaultRegion = regions[0];
    const defaultCity = defaultRegion ? getCities(countryName, defaultRegion.value, language)[0] : null;

    const setter = who === 'A' ? setPersonA : setPersonB;
    // We must use functional updates to ensure we are working with latest state if called rapidly, 
    // though here usually triggered by user interaction so direct state access is also okay but prev is safer.
    
    setter(current => {
        if (defaultRegion && defaultCity) {
            return {
                ...current,
                birth: {
                ...current.birth,
                country: countryName,
                region: defaultRegion.value,
                city: defaultCity.value,
                lat: defaultCity.raw.lat,
                lon: defaultCity.raw.lng,
                timezoneOffset: defaultCity.raw.timezone
                }
            };
        } else {
            return {
                ...current,
                birth: { ...current.birth, country: countryName, region: '', city: '' }
            };
        }
    });
  };

  const handleRegionChange = (who: 'A' | 'B', countryName: string, regionName: string) => {
    const cities = getCities(countryName, regionName, language);
    const defaultCity = cities[0];

    const setter = who === 'A' ? setPersonA : setPersonB;

    setter(current => {
        if (defaultCity) {
            return {
                ...current,
                birth: {
                ...current.birth,
                country: countryName,
                region: regionName,
                city: defaultCity.value,
                lat: defaultCity.raw.lat,
                lon: defaultCity.raw.lng,
                timezoneOffset: defaultCity.raw.timezone
                }
            };
        }
        return current;
    });
  };

  const handleCityChange = (who: 'A' | 'B', countryName: string, regionName: string, cityName: string) => {
    const cities = getCities(countryName, regionName, language);
    const cityData = cities.find(c => c.value === cityName);

    if (cityData) {
      const setter = who === 'A' ? setPersonA : setPersonB;
      setter(current => ({
        ...current,
        birth: {
          ...current.birth,
          city: cityData.value,
          lat: cityData.raw.lat,
          lon: cityData.raw.lng,
          timezoneOffset: cityData.raw.timezone
        }
      }));
    }
  };

  const renderPersonInputs = (person: PersonInput, who: 'A' | 'B', label: string, colorClass: string) => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${colorClass} flex items-center gap-2`}>
        <Users className="w-5 h-5" /> {label}
      </h3>
      
      <input 
        type="text" placeholder={t.name} required
        value={person.name}
        onChange={e => updatePerson(who, 'name', e.target.value)}
        className={`w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white outline-none focus:ring-2 ${who==='A' ? 'focus:ring-sky-500' : 'focus:ring-pink-500'}`}
      />
      
      <select 
        value={person.gender}
        onChange={e => updatePerson(who, 'gender', e.target.value)}
        className={`w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white outline-none focus:ring-2 ${who==='A' ? 'focus:ring-sky-500' : 'focus:ring-pink-500'}`}
      >
        <option value="Male">{t.male}</option>
        <option value="Female">{t.female}</option>
      </select>

      <div className="flex gap-2">
        <div className="relative w-2/3">
           <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
           <input 
             type="date" required
             value={person.birth.date}
             onChange={e => updatePerson(who, 'birth.date', e.target.value)}
             className={`w-full bg-slate-800 border-slate-700 rounded pl-10 px-3 py-2 text-white outline-none focus:ring-2 ${who==='A' ? 'focus:ring-sky-500' : 'focus:ring-pink-500'}`}
           />
        </div>
        <div className="w-1/3">
           <input 
             type="time" required
             value={person.birth.time}
             onChange={e => updatePerson(who, 'birth.time', e.target.value)}
             className={`w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-white outline-none focus:ring-2 ${who==='A' ? 'focus:ring-sky-500' : 'focus:ring-pink-500'}`}
           />
        </div>
      </div>

      <div className="space-y-2">
        {/* Country */}
        <div className="relative">
           <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
           <select
             value={person.birth.country}
             onChange={e => handleCountryChange(who, e.target.value)}
             className={`w-full bg-slate-800 border-slate-700 rounded pl-10 px-3 py-2 text-white appearance-none outline-none focus:ring-2 ${who==='A' ? 'focus:ring-sky-500' : 'focus:ring-pink-500'}`}
           >
             {getCountries(language).map(c => (
               <option key={c.value} value={c.value}>{c.label}</option>
             ))}
           </select>
        </div>

        {/* Region (Province/State) */}
        <div className="relative">
           <Map className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
           <select
             value={person.birth.region}
             onChange={e => handleRegionChange(who, person.birth.country, e.target.value)}
             className={`w-full bg-slate-800 border-slate-700 rounded pl-10 px-3 py-2 text-white appearance-none outline-none focus:ring-2 ${who==='A' ? 'focus:ring-sky-500' : 'focus:ring-pink-500'}`}
           >
             {getRegions(person.birth.country, language).map(r => (
               <option key={r.value} value={r.value}>{r.label}</option>
             ))}
           </select>
        </div>

        {/* City */}
        <div className="relative">
           <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
           <select
             value={person.birth.city}
             onChange={e => handleCityChange(who, person.birth.country, person.birth.region, e.target.value)}
             className={`w-full bg-slate-800 border-slate-700 rounded pl-10 px-3 py-2 text-white appearance-none outline-none focus:ring-2 ${who==='A' ? 'focus:ring-sky-500' : 'focus:ring-pink-500'}`}
           >
             {getCities(person.birth.country, person.birth.region, language).map(c => (
               <option key={c.value} value={c.value}>{c.label}</option>
             ))}
           </select>
        </div>
      </div>
      
      <div className="text-[10px] text-slate-500 text-right">
        {t.zone}: UTC{person.birth.timezoneOffset && person.birth.timezoneOffset >= 0 ? '+' : ''}{person.birth.timezoneOffset}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm max-w-4xl mx-auto">
      
      <div className="grid md:grid-cols-2 gap-8">
        {renderPersonInputs(personA, 'A', t.personA, 'text-sky-400')}
        {renderPersonInputs(personB, 'B', t.personB, 'text-pink-400')}
      </div>

      <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
         <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">{t.startYear}</label>
            <input 
              type="number" 
              value={startYear} 
              onChange={e => setStartYear(parseInt(e.target.value))}
              className="bg-slate-800 border-slate-700 text-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
            />
         </div>
         <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">{t.duration}</label>
            <select 
              value={duration} 
              onChange={e => setDuration(parseInt(e.target.value))}
              className="bg-slate-800 border-slate-700 text-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="5">5 {t.years}</option>
              <option value="10">10 {t.years}</option>
              <option value="20">20 {t.years}</option>
            </select>
         </div>
      </div>

      {/* API Key Configuration */}
      <div className="pt-6 border-t border-slate-800">
        <div className="flex justify-between items-center mb-2">
            <label className="text-slate-400 text-xs uppercase font-bold flex items-center gap-2">
            <span className="flex items-center gap-2"><Key className="w-3 h-3" /> {t.apiKey}</span>
            </label>
            <div className="flex gap-3 text-xs">
                <a href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1">
                    <Info className="w-3 h-3" /> {t.pricing}
                </a>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold">
                    {t.getKey} <ExternalLink className="w-3 h-3" />
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
          {t.tip}
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
        {isLoading ? t.submitting : t.submit}
      </button>
    </form>
  );
};