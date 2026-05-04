import { useState, useEffect } from "react";
import { User, Briefcase, Code, FolderGit2, Mail, Home } from "lucide-react";
import { NAV_LINKS } from "../lib/constants";
import { motion } from "motion/react";
import { MagneticButton } from "./ui/MagneticButton";

const ICONS: Record<string, React.ReactNode> = {
  about: <User size={20} />,
  skills: <Code size={20} />,
  projects: <FolderGit2 size={20} />,
  experience: <Briefcase size={20} />,
  contact: <Mail size={20} />
};

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        if (window.scrollY >= top - 200 && window.scrollY < top + height - 200) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center pointer-events-none">
        <a href="#" className="pointer-events-auto text-xl font-bold font-display tracking-wider flex items-center gap-2 group">
          <span className="text-primary-500 group-hover:text-primary-400 transition-colors">R</span>
          <span className="text-gray-100 group-hover:text-white transition-colors">Saravanan</span>
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
        </a>
      </div>

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-dark-900/80 backdrop-blur-xl border border-gray-800 shadow-2xl shadow-black/50">
          <MagneticButton as="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`relative p-3 rounded-xl transition-all duration-300 group ${activeSection === "" ? "bg-primary-500/20 text-primary-400" : "text-gray-400 hover:text-white hover:bg-dark-800"}`}
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Home</div>
            <Home size={20} />
          </MagneticButton>
          
          <div className="w-px h-8 bg-gray-800 mx-1"></div>

          {NAV_LINKS.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <MagneticButton
                key={link.label}
                as="a"
                href={link.href}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`relative p-3 rounded-xl transition-all duration-300 group flex items-center justify-center ${isActive ? "bg-primary-500/20 text-primary-400 shadow-[0_0_15px_rgba(212,175,55,0.2)]" : "text-gray-400 hover:text-white hover:bg-dark-800"}`}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {link.label}
                </div>
                {ICONS[id] || <Code size={20} />}
                {isActive && (
                  <motion.div layoutId="dock-indicator" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
                )}
              </MagneticButton>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
