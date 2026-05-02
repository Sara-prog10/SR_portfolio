import { Plus, Trash2, X } from 'lucide-react';
import React from 'react';

export function HighlightsEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  let items: any[] = [];
  try { items = JSON.parse(value); } catch (e) {}

  const updateItem = (index: number, field: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    onChange(JSON.stringify(newItems, null, 2));
  };

  const addItem = () => {
    const newItems = [...items, { icon: "Bot", title: "New Highlight", desc: "Description" }];
    onChange(JSON.stringify(newItems, null, 2));
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(JSON.stringify(newItems, null, 2));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 bg-dark-950 border border-gray-800 rounded-lg flex gap-4 items-start group">
          <div className="flex-1 space-y-3">
            <div className="flex gap-3">
              <div className="w-1/3">
                <label className="text-xs text-gray-500 mb-1 block">Icon Name (Lucide)</label>
                <input
                  value={item.icon || ''}
                  onChange={e => updateItem(index, 'icon', e.target.value)}
                  className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div className="w-2/3">
                <label className="text-xs text-gray-500 mb-1 block">Title</label>
                <input
                  value={item.title || ''}
                  onChange={e => updateItem(index, 'title', e.target.value)}
                  className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Description</label>
              <textarea
                value={item.desc || ''}
                onChange={e => updateItem(index, 'desc', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none min-h-[60px]"
              />
            </div>
          </div>
          <button
            onClick={() => removeItem(index)}
            className="p-2 text-gray-600 hover:text-red-400 hover:bg-dark-900 rounded-lg transition-colors mt-6"
            title="Remove Highlight"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-sm flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors py-2"
      >
        <Plus size={16} /> Add Highlight
      </button>
    </div>
  );
}
