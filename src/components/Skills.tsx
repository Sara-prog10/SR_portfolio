import { motion } from "motion/react";
import { SKILLS } from "../lib/constants";
import * as LucideIcons from "lucide-react";
import { useContent } from "../contexts/ContentContext";

export function Skills() {
  const { content } = useContent();
  
  let skillsList = SKILLS;
  if (content.skills_list) {
    try {
      skillsList = JSON.parse(content.skills_list);
    } catch(e) {
      console.warn("Failed to parse skills_list", e);
    }
  }

  return (
    <section id="skills" className="py-24 bg-dark-900/50 relative border-y border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tools, languages, and frameworks I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
          {skillsList.map((skillGroup: any, groupIdx: number) => {
            const Icon = (LucideIcons as any)[skillGroup.icon] || LucideIcons.Code2;
            const isLarge = groupIdx === 0 || groupIdx === 3;
            
            return (
              <motion.div
                key={groupIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                className={`bg-dark-950 border border-gray-800 rounded-3xl p-6 md:p-8 relative group overflow-hidden transition-all hover:border-primary-500/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:-translate-y-1 ${isLarge ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 md:row-span-1 border-dashed'}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-dark-800/80 rounded-xl border border-gray-800 group-hover:border-primary-500/50 group-hover:bg-primary-500/10 transition-all">
                      <Icon className="text-gray-400 group-hover:text-primary-400 transition-colors" size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-primary-100 transition-colors">{skillGroup.category}</h3>
                  </div>
                  
                  <ul className={`grid gap-3 flex-grow ${isLarge ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {skillGroup.items.map((skill: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors px-3 py-2 bg-dark-900 border border-gray-800/50 rounded-lg group-hover:border-primary-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primary-500 transition-colors shadow-[0_0_8px_transparent] group-hover:shadow-primary-500/50"></span>
                        <span className="text-sm font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
