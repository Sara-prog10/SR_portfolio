import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useContent } from "../contexts/ContentContext";
import { EXPERIENCE } from "../lib/constants";
import { Briefcase } from "lucide-react";

export function Experience() {
  const { content } = useContent();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  let experiences = EXPERIENCE;
  if (content.experience_list) {
    try {
      experiences = JSON.parse(content.experience_list);
    } catch(e) {
      console.error("Failed to parse experiences", e);
    }
  }

  return (
    <section id="experience" className="py-24 bg-dark-900/30 relative" ref={containerRef}>
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

        <div className="relative ml-3 md:ml-6 space-y-12 pb-8">
          {/* Timeline background track */}
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gray-800" />
          
          {/* Animated animated track */}
          <motion.div 
            className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 origin-top z-0 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
            style={{ scaleY }}
          />

          {experiences.map((exp: any, idx: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline dot */}
              <div className="absolute w-8 h-8 bg-dark-950 border border-gray-700 rounded-full -left-[16.5px] top-0 flex items-center justify-center group-hover:border-primary-500 transition-colors z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600 group-hover:bg-primary-500 transition-colors group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
              </div>

              <div className="bg-dark-900/50 border border-transparent p-6 rounded-2xl group-hover:bg-dark-900 group-hover:border-gray-800 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 group-hover:text-primary-300 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-mono text-primary-400 px-3 py-1 bg-primary-500/10 rounded-full w-fit border border-primary-500/20">
                    {exp.period}
                  </span>
                </div>
                
                <div className="text-gray-400 font-medium mb-4 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                  <Briefcase size={16} />
                  {exp.company}
                </div>
                
                <p className="text-gray-400 leading-relaxed max-w-2xl text-sm md:text-base group-hover:text-gray-300 transition-colors">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
