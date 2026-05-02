import { Plus, Trash2, X } from 'lucide-react';
import React from 'react';

export function ProjectsEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  let projects: any[] = [];
  try { projects = JSON.parse(value); } catch (e) {}

  const updateProject = (index: number, field: string, val: any) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: val };
    onChange(JSON.stringify(newProjects, null, 2));
  };

  const addProject = () => {
    const newProjects = [
      ...projects,
      {
        id: `proj-${Date.now()}`,
        title: "New Project",
        description: "Project Description",
        achievements: ["Achievement 1"],
        icon: "Folder",
        github: "#",
        demo: "#",
        techStack: ["React", "Tailwind"]
      }
    ];
    onChange(JSON.stringify(newProjects, null, 2));
  };

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    onChange(JSON.stringify(newProjects, null, 2));
  };

  const updateArrayItem = (pIndex: number, field: 'achievements' | 'techStack', aIndex: number, val: string) => {
    const newProjects = [...projects];
    const newArray = [...(newProjects[pIndex][field] || [])];
    newArray[aIndex] = val;
    newProjects[pIndex] = { ...newProjects[pIndex], [field]: newArray };
    onChange(JSON.stringify(newProjects, null, 2));
  };

  const addArrayItem = (pIndex: number, field: 'achievements' | 'techStack', defaultVal: string) => {
    const newProjects = [...projects];
    const newArray = [...(newProjects[pIndex][field] || []), defaultVal];
    newProjects[pIndex] = { ...newProjects[pIndex], [field]: newArray };
    onChange(JSON.stringify(newProjects, null, 2));
  };

  const removeArrayItem = (pIndex: number, field: 'achievements' | 'techStack', aIndex: number) => {
    const newProjects = [...projects];
    const newArray = (newProjects[pIndex][field] || []).filter((_: any, i: number) => i !== aIndex);
    newProjects[pIndex] = { ...newProjects[pIndex], [field]: newArray };
    onChange(JSON.stringify(newProjects, null, 2));
  };

  return (
    <div className="space-y-6">
      {projects.map((proj, pIndex) => (
        <div key={pIndex} className="p-4 bg-dark-950 border border-gray-800 rounded-lg flex flex-col gap-4 relative">
          <button
            onClick={() => removeProject(pIndex)}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-400 hover:bg-dark-900 rounded-lg transition-colors"
            title="Remove Project"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="grid grid-cols-2 gap-4 pr-10">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Title</label>
              <input
                value={proj.title || ''}
                onChange={e => updateProject(pIndex, 'title', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Icon (Lucide)</label>
              <input
                value={proj.icon || ''}
                onChange={e => updateProject(pIndex, 'icon', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Description</label>
            <textarea
              value={proj.description || ''}
              onChange={e => updateProject(pIndex, 'description', e.target.value)}
              className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none min-h-[60px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">GitHub URL</label>
              <input
                value={proj.github || ''}
                onChange={e => updateProject(pIndex, 'github', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Demo URL</label>
              <input
                value={proj.demo || ''}
                onChange={e => updateProject(pIndex, 'demo', e.target.value)}
                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
            {/* Tech Stack */}
            <div>
              <label className="text-xs text-primary-400 mb-2 block font-medium">Tech Stack</label>
              <div className="space-y-2">
                {(proj.techStack || []).map((tech: string, aIndex: number) => (
                  <div key={aIndex} className="flex gap-2 items-center">
                    <input
                      value={tech}
                      onChange={e => updateArrayItem(pIndex, 'techStack', aIndex, e.target.value)}
                      className="flex-1 bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none"
                    />
                    <button
                      onClick={() => removeArrayItem(pIndex, 'techStack', aIndex)}
                      className="p-1.5 text-gray-500 hover:text-red-400 rounded transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem(pIndex, 'techStack', 'New Tech')}
                  className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors py-1"
                >
                  <Plus size={14} /> Add Tech
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <label className="text-xs text-primary-400 mb-2 block font-medium">Achievements/Points</label>
              <div className="space-y-2">
                {(proj.achievements || []).map((acc: string, aIndex: number) => (
                  <div key={aIndex} className="flex gap-2 items-start">
                    <textarea
                      value={acc}
                      onChange={e => updateArrayItem(pIndex, 'achievements', aIndex, e.target.value)}
                      className="flex-1 bg-dark-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-primary-500 focus:outline-none min-h-[40px]"
                    />
                    <button
                      onClick={() => removeArrayItem(pIndex, 'achievements', aIndex)}
                      className="p-1.5 text-gray-500 hover:text-red-400 rounded transition-colors mt-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem(pIndex, 'achievements', 'New Achievement')}
                  className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors py-1"
                >
                  <Plus size={14} /> Add Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addProject}
        className="text-sm flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors py-2"
      >
        <Plus size={16} /> Add Project
      </button>
    </div>
  );
}
