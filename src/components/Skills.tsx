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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsList.map((skillGroup: any, groupIdx: number) => {
            const Icon = (LucideIcons as any)[skillGroup.icon] || LucideIcons.Code2;
            return (
              <motion.div
                key={groupIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                className="bg-dark-950 border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-500/10 rounded-lg">
                    <Icon className="text-primary-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{skillGroup.category}</h3>
                </div>
                
                <ul className="space-y-3">
                  {skillGroup.items.map((skill: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
