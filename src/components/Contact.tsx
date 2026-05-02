import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { db, handleDBError, OperationType } from "../lib/firebase";
import { ref, set } from "firebase/database";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const messageId = `msg_${Date.now()}`;
      await set(ref(db, `messages/${messageId}`), {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: Date.now()
      });
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      handleDBError(err, OperationType.CREATE, "messages");
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-gray-800/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(99,102,241,0.1)_0%,transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interested in building intelligent AI systems, data pipelines, or just chatting about tech? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
              <div className="bg-dark-900 border border-gray-800 p-4 sm:p-6 rounded-2xl flex items-center gap-4 sm:gap-6 group hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-dark-800 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-dark-900 transition-colors">
                <Mail size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
                <a href="mailto:saravanan511000@gmail.com" className="text-sm sm:text-lg font-medium text-gray-200 hover:text-white truncate block">
                  saravanan511000@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-dark-900 border border-gray-800 p-4 sm:p-6 rounded-2xl flex items-center gap-4 sm:gap-6 group hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-dark-800 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-dark-900 transition-colors">
                <Github size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">GitHub</p>
                <a href="#" className="text-sm sm:text-lg font-medium text-gray-200 hover:text-white truncate block">
                  GitHub Profile
                </a>
              </div>
            </div>

            <div className="bg-dark-900 border border-gray-800 p-4 sm:p-6 rounded-2xl flex items-center gap-4 sm:gap-6 group hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-dark-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-dark-900 transition-colors">
                <Linkedin size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Social</p>
                <a href="#" className="text-sm sm:text-lg font-medium text-gray-200 hover:text-white truncate block">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Mock */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-900 border border-gray-800 p-8 rounded-2xl shadow-xl shadow-black/20"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-dark-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-dark-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                  placeholder="How can I help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              {success && <p className="text-green-400 text-sm mt-2">Message sent successfully!</p>}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-primary-600/50 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
