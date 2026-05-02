import { motion } from "motion/react";
import { EXPERIENCE } from "../lib/constants";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-dark-900/30 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-gray-400">My professional journey so far.</p>
        </motion.div>

        <div className="relative border-l border-gray-800 ml-3 md:ml-6 space-y-12 pb-8">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline dot */}
              <div className="absolute w-8 h-8 bg-dark-950 border border-gray-700 rounded-full -left-[16.5px] top-0 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {exp.role}
                </h3>
                <span className="text-sm font-mono text-primary-400 px-3 py-1 bg-primary-500/10 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>
              
              <div className="text-gray-400 font-medium mb-4 flex items-center gap-2">
                <Briefcase size={16} />
                {exp.company}
              </div>
              
              <p className="text-gray-400 leading-relaxed max-w-2xl text-sm md:text-base">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
