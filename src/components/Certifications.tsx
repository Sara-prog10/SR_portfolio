import { motion } from "motion/react";
import { CERTIFICATIONS } from "../lib/constants";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Certifications</h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-dark-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4 hover:border-gray-600 hover:bg-dark-800 transition-all cursor-default shadow-lg shadow-black/20"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
                <Award size={20} />
              </div>
              <span className="text-gray-300 font-medium text-sm md:text-base">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
