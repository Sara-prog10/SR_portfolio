import { Plus, Trash2, X } from 'lucide-react';
import React from 'react';

export function SkillsEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  let categories: any[] = [];
  try { categories = JSON.parse(value); } catch (e) {}

  const updateCategory = (index: number, field: string, val: string) => {
    const newCats = [...categories];
    newCats[index] = { ...newCats[index], [field]: val };
    onChange(JSON.stringify(newCats, null, 2));
  };

  const addCategory = () => {
    const newCats = [...categories, { category: "New Category", icon: "Code2", items: ["New Skill"] }];
    onChange(JSON.stringify(newCats, null, 2));
  };

  const removeCategory = (index: number) => {
    const newCats = categories.filter((_, i) => i !== index);
    onChange(JSON.stringify(newCats, null, 2));
  };

  const updateSkill = (cIndex: number, sIndex: number, val: string) => {
    const newCats = [...categories];
    const newItems = [...(newCats[cIndex].items || [])];
    newItems[sIndex] = val;
    newCats[cIndex] = { ...newCats[cIndex], items: newItems };
    onChange(JSON.stringify(newCats, null, 2));
  };

  const addSkill = (cIndex: number) => {
    const newCats = [...categories];
    const newItems = [...(newCats[cIndex].items || []), "New Skill"];
    newCats[cIndex] = { ...newCats[cIndex], items: newItems };
    onChange(JSON.stringify(newCats, null, 2));
  };

  const removeSkill = (cIndex: number, sIndex: number) => {
    const newCats = [...categories];
    const newItems = (newCats[cIndex].items || []).filter((_: any, i: number) => i !== sIndex);
    newCats[cIndex] = { ...newCats[cIndex], items: newItems };
    onChange(JSON.stringify(newCats, null, 2));
  };

  return (
    <div className="space-y-6">
      {categories.map((cat, cIndex) => (
        <div key={cIndex} className="p-4 bg-dark-950 border border-gray-800 rounded-lg">
          <div className="flex gap-4 items-start mb-4">
            <div className="flex-1 flex gap-3">
              <div className="w-1/3">
                <label className="text-xs text-gray-500 mb-1 block">Icon (Lucide)</label>
                <input
                  value={cat.icon || ''}
                  onChange={e => updateCategory(cIndex, 'icon', e.target.value)}
                  className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div className="w-2/3">
                <label className="text-xs text-gray-500 mb-1 block">Category Name</label>
                <input
                  value={cat.category || ''}
                  onChange={e => updateCategory(cIndex, 'category', e.target.value)}
                  className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => removeCategory(cIndex)}
              className="p-2 text-gray-600 hover:text-red-400 hover:bg-dark-900 rounded-lg transition-colors mt-6"
              title="Remove Category"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="pl-4 border-l-2 border-gray-800 space-y-2">
            <label className="text-xs text-gray-500 block mb-2">Skills</label>
            {(cat.items || []).map((skill: string, sIndex: number) => (
              <div key={sIndex} className="flex gap-2 items-center">
                <input
                  value={skill}
                  onChange={e => updateSkill(cIndex, sIndex, e.target.value)}
                  className="flex-1 bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
                <button
                  onClick={() => removeSkill(cIndex, sIndex)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-dark-900 rounded transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addSkill(cIndex)}
              className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors py-1 mt-2"
            >
              <Plus size={14} /> Add Skill
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addCategory}
        className="text-sm flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors py-2"
      >
        <Plus size={16} /> Add Skill Category
      </button>
    </div>
  );
}
