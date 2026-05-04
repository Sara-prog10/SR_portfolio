import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mail, Database, BrainCircuit, BarChart3, LineChart, Network } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "../contexts/ContentContext";
import { N8n, Claude } from '@lobehub/icons';
import { MagneticButton } from "./ui/MagneticButton";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const titles = ["Data Analyst", "AI Engineer", "Generative AI Specialist"];
  const [titleIndex, setTitleIndex] = useState(0);
  const { content } = useContent();

  const features = [
    { title: "Fault Reporting Agent", src: "https://lottie.host/embed/21f24389-395c-41a7-ad6f-7b954a4d7940/4JqwZY4j2G.lottie" },
    { title: "Interactive Chatbot", src: "https://lottie.host/embed/5c465740-5cb3-4a1e-bd72-a0f4197c33b6/Wv7A1M89Hr.lottie" },
    { title: "Web Development", src: "https://lottie.host/embed/56350a1d-b7f5-4dbc-b243-542d4c55496d/rTi7LwBsQT.lottie" },
    { title: "Building your own GPT", src: "https://lottie.host/embed/74d4d5a0-1d51-4500-b254-1af2da26d402/MD1spJT7Q3.lottie" },
    { title: "AI Automation", src: "https://lottie.host/embed/97cf9778-aa63-4ae9-b9d0-7634d989456d/qSul9otxSn.lottie" }
  ];
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    const featureInterval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => {
      clearInterval(titleInterval);
      clearInterval(featureInterval);
    };
  }, []);

  if (!mounted) return null;

  const techStack = (
    <>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <N8n.Combine size={48} type={'color'} />
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <Claude.Combine size={48} type={'color'} />
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <img src="https://img.icons8.com/color/96/power-bi.png" alt="power-bi" className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <img src="https://img.icons8.com/color/96/tableau-software.png" alt="tableau-software" className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <img src="https://img.icons8.com/color/96/arduino.png" alt="arduino" className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <img src="https://img.icons8.com/color/96/python--v1.png" alt="python--v1" className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <img src="https://img.icons8.com/ios-filled/50/ai-chatting.png" alt="ai-chatting" className="object-contain w-full h-full invert opacity-90" />
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center -ml-2 sm:-ml-4">
          <iframe src="https://lottie.host/embed/388b597f-9062-41f1-a539-a651af474d65/bAz62Lp6eU.lottie" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
        </div>
      </div>
    </>
  );

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-40 overflow-hidden border-b border-gray-800">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-4000" />
        
        {/* Floating Icons in Background */}
        <motion.div animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute left-[10%] top-[20%] opacity-10">
          <Database size={64} className="text-primary-200" />
        </motion.div>
        <motion.div animate={{ y: [20, -20, 20], x: [10, -10, 10], rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute right-[10%] top-[15%] w-16 h-16 opacity-10">
          <BrainCircuit size={64} className="text-primary-300" />
        </motion.div>
        <motion.div animate={{ y: [-15, 15, -15], x: [15, -15, 15], rotate: 180 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute left-[20%] bottom-[30%] opacity-10">
          <Network size={56} className="text-primary-200" />
        </motion.div>
        <motion.div animate={{ y: [15, -15, 15], x: [-15, 15, -15], rotate: -180 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute right-[20%] bottom-[20%] opacity-10">
          <LineChart size={56} className="text-primary-300" />
        </motion.div>
        <motion.div animate={{ y: [-25, 25, -25], rotate: 90 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} className="absolute left-[50%] top-[10%] opacity-10">
          <BarChart3 size={48} className="text-primary-400" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display text-white mb-4 leading-tight whitespace-pre-wrap">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-600">{content.hero_title || 'Ravichandran'}</span>
            <br />
            {content.hero_subtitle || 'Saravanan'}
          </h1>

          <div className="h-10 mb-6 pb-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: { opacity: 0 },
                  exit: { opacity: 0, transition: { duration: 0.2 } }
                }}
                className="text-xl md:text-2xl text-primary-400 font-medium font-mono"
              >
                &gt; I build{" "}
                {titles[titleIndex].split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1 },
                      exit: { opacity: 0 }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[3px] h-[1.2em] bg-primary-400 ml-1 align-middle"
                />
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed whitespace-pre-wrap">
            {content.hero_description || 'Building intelligent systems with data, AI, and automation. I specialize in developing RAG systems, data-driven dashboards, and seamless IoT combinations.'}
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton as="a" href="#projects" className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium flex items-center gap-2 transition-all group">
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton as="a" href="#contact" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 flex items-center gap-2 transition-all">
              <Mail size={18} />
              Contact Me
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right side - Abstract Graphic/Code Mockup */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="w-full relative mt-12 lg:mt-0"
        >
            <div className="w-full aspect-square sm:aspect-[4/3] rounded-2xl bg-transparent sm:bg-dark-900 border-none sm:border sm:border-gray-800 shadow-none sm:shadow-2xl overflow-hidden relative flex flex-col group">
               <div className="hidden sm:flex absolute top-0 inset-x-0 h-10 bg-dark-800 border-b border-gray-800 items-center px-4 gap-2 z-10">
                 <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                 <div className="ml-auto flex gap-2">
                   <div className="w-4 h-4 rounded-sm bg-gray-700/50"></div>
                   <div className="w-12 h-4 rounded-sm bg-gray-700/50"></div>
                 </div>
               </div>
               <div className="absolute inset-0 pt-0 sm:pt-10 px-4 sm:px-8 pb-4 sm:pb-8 flex flex-col items-center justify-center bg-transparent sm:bg-dark-900 overflow-hidden z-0">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]"></div>
                 
                 <div className="relative w-full h-full flex flex-col items-center justify-center">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={`lottie-${featureIndex}`}
                       initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                       animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                       exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                       transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                       className="flex-1 w-full flex items-center justify-center absolute inset-0 pb-16 sm:pb-16"
                     >
                       <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]">
                         <iframe src={features[featureIndex].src} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
                       </div>
                     </motion.div>
                   </AnimatePresence>
                   
                   <div className="absolute bottom-10 sm:bottom-12 left-0 right-0 h-10">
                     <AnimatePresence mode="wait">
                       <motion.div
                         key={`title-${featureIndex}`}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.3 }}
                         className="text-center w-full absolute inset-0 px-4"
                       >
                         <h3 className="text-xl sm:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-500">
                           {features[featureIndex].title}
                         </h3>
                       </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                  {features.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === featureIndex ? 'w-8 bg-primary-500' : 'w-2 bg-gray-700'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
        </motion.div>
      </div>

      {/* Auto-scrolling Tech Stack */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-dark-950/80 backdrop-blur-sm border-t border-gray-800 py-6 z-20">
        <motion.div
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {techStack}
          {techStack}
        </motion.div>
      </div>
    </section>
  );
}
