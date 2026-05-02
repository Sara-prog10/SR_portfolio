import { motion } from "motion/react";
import { ArrowRight, Mail, Database, BrainCircuit, BarChart3, LineChart, Network } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "../contexts/ContentContext";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const titles = ["Data Analyst", "AI Engineer", "Generative AI Specialist"];
  const [titleIndex, setTitleIndex] = useState(0);
  const { content } = useContent();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-4000" />
        

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
            Available for opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-4 leading-tight whitespace-pre-wrap">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-600">{content.hero_title || 'Ravichandran'}</span>
            <br />
            {content.hero_subtitle || 'Saravanan'}
          </h1>

          <div className="h-10 mb-6">
            <motion.p
              key={titleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl md:text-2xl text-gray-400 font-medium"
            >
              {titles[titleIndex]}
            </motion.p>
          </div>

          <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed whitespace-pre-wrap">
            {content.hero_description || 'Building intelligent systems with data, AI, and automation. I specialize in developing RAG systems, data-driven dashboards, and seamless IoT combinations.'}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium flex items-center gap-2 transition-all group"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 flex items-center gap-2 transition-all"
            >
              <Mail size={18} />
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right side - Abstract Graphic/Code Mockup */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="hidden lg:block relative"
        >
            <div className="w-full aspect-[4/3] rounded-2xl bg-dark-900 border border-gray-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-10 bg-dark-800 border-b border-gray-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
              </div>
              <div className="absolute inset-0 pt-10 flex items-center justify-center bg-dark-900 overflow-hidden z-0">
                {/* Background Grid inside window */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]"></div>

                {/* Orbit Rings element */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[280px] h-[280px] rounded-full border border-gray-800/50 border-dashed"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[380px] h-[380px] rounded-full border border-gray-800/30 border-dashed"
                />

                {/* Left items - Data Sources */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[15%] top-[30%] bg-dark-800 border border-gray-700 p-3 rounded-xl z-20 shadow-lg"
                >
                  <Database size={24} className="text-gray-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute left-[20%] bottom-[25%] bg-dark-800 border border-gray-700 p-3 rounded-xl z-20 shadow-lg"
                >
                  <Network size={20} className="text-gray-400" />
                </motion.div>

                {/* Right items - Analytics Output */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute right-[15%] top-[25%] bg-dark-800 border border-primary-500/30 p-3 rounded-xl z-20 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                >
                  <LineChart size={24} className="text-primary-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute right-[20%] bottom-[30%] bg-dark-800 border border-primary-500/20 p-3 rounded-xl z-20 shadow-lg"
                >
                  <BarChart3 size={20} className="text-primary-300" />
                </motion.div>

                {/* Center - AI Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <motion.div
                    animate={{
                      boxShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 40px rgba(212,175,55,0.2)", "0px 0px 0px rgba(212,175,55,0)"],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 bg-dark-950 border border-primary-500/50 rounded-full flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ping opacity-20"></div>
                    <BrainCircuit size={32} className="text-primary-400" />
                  </motion.div>
                </div>

                {/* Moving Particles (Data Flow) */}
                {/* From Left to Center */}
                <motion.div
                  animate={{ x: [-120, 0], y: [40, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "circOut" }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gray-400 z-10 -mt-1 -ml-1"
                />
                <motion.div
                  animate={{ x: [-100, 0], y: [-50, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "circOut", delay: 1 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gray-500 z-10 -mt-1 -ml-1"
                />

                {/* From Center to Right */}
                <motion.div
                  animate={{ x: [0, 120], y: [0, -30], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "circIn", delay: 0.5 }}
                  className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-primary-400 z-10 shadow-[0_0_5px_var(--color-primary-500)] -mt-1 -ml-1"
                />
                <motion.div
                  animate={{ x: [0, 90], y: [0, 50], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "circIn", delay: 1.2 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary-300 z-10 shadow-[0_0_5px_var(--color-primary-500)] -mt-1 -ml-1"
                />

                {/* Floating Labels */}
                <motion.div
                  animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                  className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-400 bg-dark-800/80 px-2 py-1 rounded border border-gray-700 backdrop-blur-md z-20 pointer-events-none"
                >
                  Processing stream...
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 2 }}
                  className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary-400 bg-primary-950/50 px-2 py-1 rounded border border-primary-900/50 backdrop-blur-md z-20 pointer-events-none"
                >
                  Generating Insights
                </motion.div>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
