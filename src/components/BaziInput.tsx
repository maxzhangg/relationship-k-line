import React from 'react';
import { UserProfile } from '../types';

interface Props {
  title: string;
  profile: UserProfile;
  onChange: (p: UserProfile) => void;
}

export const BaziInput: React.FC<Props> = ({ title, profile, onChange }) => {
  const handleChange = (field: keyof UserProfile, value: string) => {
    onChange({ ...profile, [field]: value });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-blue-400 font-bold mb-3">{title}</h3>
      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="姓名/昵称"
          value={profile.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full bg-gray-900 text-white p-2 rounded border border-gray-600"
        />
        <select 
          value={profile.gender}
          onChange={(e) => handleChange('gender', e.target.value as 'male'|'female')}
          className="w-full bg-gray-900 text-white p-2 rounded border border-gray-600"
        >
          <option value="male">男 (乾造)</option>
          <option value="female">女 (坤造)</option>
        </select>
        <div className="flex gap-2">
          <input 
            type="date" 
            value={profile.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            className="flex-1 bg-gray-900 text-white p-2 rounded border border-gray-600"
          />
          <input 
            type="time" 
            value={profile.birthTime}
            onChange={(e) => handleChange('birthTime', e.target.value)}
            className="w-24 bg-gray-900 text-white p-2 rounded border border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};