import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../lib/constants";
import * as LucideIcons from "lucide-react";
import { useContent } from "../contexts/ContentContext";
import { TiltCard } from "./ui/TiltCard";

export function Projects() {
  const { content } = useContent();

  let projectsList = PROJECTS;
  if(content.projects_list) {
    try {
      projectsList = JSON.parse(content.projects_list);
    } catch(e) {
      console.warn("Failed to parse projects_list", e);
    }
  }

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl">
            A selection of my recent work focusing on Generative AI, data analytics, and full-stack development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8" style={{ perspective: "1000px" }}>
          {projectsList.map((project: any, idx: number) => {
            const Icon = (LucideIcons as any)[project.icon] || LucideIcons.Folder;
            return (
              <TiltCard key={project.id || idx} className="h-full flex">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-dark-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-primary-500/30 transition-all hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.1)] relative w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="p-8 flex-grow relative z-10 w-full h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-dark-800 rounded-xl flex items-center justify-center border border-gray-700/50 group-hover:border-primary-500/50 transition-colors text-gray-400 group-hover:text-primary-400">
                        <Icon size={24} />
                      </div>
                      
                      <div className="flex gap-3 relative z-20">
                        <a href={project.github} className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub Repository">
                          <Github size={20} />
                        </a>
                        <a href={project.demo} className="text-gray-500 hover:text-primary-400 transition-colors" aria-label="Live Demo">
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-primary-500/80 mb-4 font-mono">
                      {project.subtitle}
                    </p>
                    
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Achievements</h4>
                      <ul className="space-y-1">
                        {project.achievements?.map((acc: string, aIdx: number) => (
                          <li key={aIdx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-primary-500 mt-1">▹</span>
                            {acc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-8 py-4 bg-dark-800/50 border-t border-gray-800 flex flex-wrap gap-2 relative z-10">
                    {project.techStack?.map((tech: string, tIdx: number) => (
                      <span 
                        key={tIdx} 
                        className="px-2.5 py-1 text-xs font-medium bg-dark-950 text-gray-300 rounded border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
