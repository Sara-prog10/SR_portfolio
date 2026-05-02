import { Plus, Trash2 } from 'lucide-react';
import React from 'react';

export function ExperienceEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  let experiences: any[] = [];
  try { experiences = JSON.parse(value); } catch (e) {}

  const updateExperience = (index: number, field: string, val: any) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: val };
    onChange(JSON.stringify(newExperiences, null, 2));
  };

  const addExperience = () => {
    const newExperiences = [
      ...experiences,
      {
        id: `exp-${Date.now()}`,
        role: "New Role",
        company: "Company Name",
        period: "Year - Year",
        description: "Role Description",
      }
    ];
    onChange(JSON.stringify(newExperiences, null, 2));
  };

  const removeExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    onChange(JSON.stringify(newExperiences, null, 2));
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, pIndex) => (
        <div key={pIndex} className="p-4 bg-dark-950 border border-gray-800 rounded-lg flex flex-col gap-4 relative">
          <button
            onClick={() => removeExperience(pIndex)}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-400 hover:bg-dark-900 rounded-lg transition-colors"
            title="Remove Experience"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="grid grid-cols-2 gap-4 pr-10">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Role</label>
              <input
                value={exp.role || ''}
                onChange={e => updateExperience(pIndex, 'role', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Company</label>
              <input
                value={exp.company || ''}
                onChange={e => updateExperience(pIndex, 'company', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
             <label className="text-xs text-gray-500 mb-1 block">Period</label>
              <input
                value={exp.period || ''}
                onChange={e => updateExperience(pIndex, 'period', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Description</label>
            <textarea
              value={exp.description || ''}
              onChange={e => updateExperience(pIndex, 'description', e.target.value)}
              className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none min-h-[60px]"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="text-sm flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors py-2"
      >
        <Plus size={16} /> Add Experience
      </button>
    </div>
  );
}
