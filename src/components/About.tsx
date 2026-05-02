import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { useContent } from "../contexts/ContentContext";

export function About() {
  const { content } = useContent();

  const defaultHighlights = [
    { icon: "Bot", title: "Generative AI", desc: "LLMs, RAG Systems, Advanced Prompting" },
    { icon: "Database", title: "Data Analytics", desc: "Power BI, SQL, Real-time Visualizations" },
    { icon: "Workflow", title: "Automation", desc: "n8n Workflows, Data Pipelines" },
    { icon: "Cpu", title: "IoT + AI", desc: "Edge AI, Sensor Integration, Embedded Systems" },
  ];

  let highlights = defaultHighlights;
  if(content.about_highlights) {
    try {
      highlights = JSON.parse(content.about_highlights);
    } catch(e) {
      console.warn("Failed to parse about_highlights", e);
    }
  }

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light whitespace-pre-wrap">
              {content.about_text || "I am a Data Analyst and AI Engineer with a deep passion for building intelligent, data-driven solutions. My expertise lies at the intersection of Generative AI, interactive analytics, and process automation.\n\nWhether it's architecting a complex RAG system for knowledge retrieval, deploying automated n8n workflows, or integrating edge IoT devices with AI models, I focus on delivering scalable, real-time solutions that drive tangible business value."}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item: any, index: number) => {
              const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Bot;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-900 border border-gray-800 p-6 rounded-xl hover:border-primary-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/10 transition-colors">
                    <Icon className="text-primary-400" size={24} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
