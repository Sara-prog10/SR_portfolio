import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, MessageSquare, Sparkles } from "lucide-react";

export function ChatbotMock() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 rounded-full shadow-lg shadow-primary-500/20 flex items-center justify-center text-white hover:bg-primary-500 hover:scale-105 transition-all z-40 group"
        aria-label="Open AI Assistant"
      >
        <Bot size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-dark-900 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-dark-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold">Ravi's AI Assistant</h3>
                  <p className="text-xs text-primary-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 inline-block"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-80 p-4 overflow-y-auto flex flex-col gap-4 bg-dark-950/50">
              {/* Bot Msg */}
              <div className="flex gap-2 items-start max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-primary-500/20 flex-shrink-0 flex items-center justify-center text-primary-400 mt-1">
                  <Bot size={14} />
                </div>
                <div className="bg-dark-800 border border-gray-700 text-gray-200 text-sm p-3 rounded-2xl rounded-tl-none">
                  Hi there! 👋 I'm an AI assistant trained on Ravi's portfolio. You can ask me about his skills, experience, or projects.
                </div>
              </div>
              
              {/* Bot Option Pills */}
              <div className="flex flex-wrap gap-2 ml-8">
                <span className="px-3 py-1 bg-dark-800 border border-gray-700 rounded-full text-xs text-gray-300 cursor-pointer hover:bg-gray-700 transition-colors">
                  What is his focus?
                </span>
                <span className="px-3 py-1 bg-dark-800 border border-gray-700 rounded-full text-xs text-gray-300 cursor-pointer hover:bg-gray-700 transition-colors">
                  View IoT projects
                </span>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-dark-800 border-t border-gray-700">
              <div className="relative">
                <input 
                  type="text" 
                  disabled
                  placeholder="Ask a question... (Mock)"
                  className="w-full bg-dark-900 border border-gray-700 rounded-full pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none opacity-70 cursor-not-allowed"
                />
                <button 
                  disabled
                  className="absolute right-1.5 top-1.5 w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white opacity-50 cursor-not-allowed"
                >
                  <Sparkles size={14} />
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-500 mt-2">
                This is a UI mockup demonstrating AI integration capabilities.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
