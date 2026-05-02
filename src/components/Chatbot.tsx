import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Sparkles, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

const WEBHOOK_URL = "https://theintellect.app.n8n.cloud/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat";

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'bot',
      text: "Hi there! 👋 I'm an AI assistant trained on Ravi's portfolio. You can ask me about his skills, experience, or projects.",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(generateSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          chatInput: text,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botMsgText = data.output || data.message || (typeof data === 'string' ? data : "Sorry, I received an unparseable response.");

      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: botMsgText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Error calling chatbot webhook:", error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const preventSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      handleSend(input);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (showTooltip || isHovering) && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: showTooltip && !isHovering ? 1 : 0, duration: 0.4 }}
            className="fixed bottom-8 right-24 bg-dark-800/90 backdrop-blur-sm border border-yellow-500/30 text-white text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-40 max-w-[280px]"
          >
            <p className="leading-tight text-gray-200 font-medium">
              You can also ask questions regarding me with my AI assistant
            </p>
            <span className="text-3xl drop-shadow-[0_0_12px_rgba(234,179,8,0.6)] animate-pulse">👉</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 bg-dark-900 border border-gray-700 text-gray-400 hover:text-white rounded-full p-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
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
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-dark-900 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] max-h-[calc(100vh-8rem)]"
          >
            {/* Header */}
            <div className="bg-dark-800 px-4 py-3 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
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
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-dark-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-dark-950/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 items-start max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === 'user' ? 'bg-gray-700 text-gray-300' : 'bg-primary-500/20 text-primary-400'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`text-sm p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-dark-800 border border-gray-700 text-gray-200 rounded-tl-none'}`}>
                    {msg.role === 'bot' ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 ml-8">
                  <span 
                    onClick={() => handleSend("What is his focus?")}
                    className="px-3 py-1 bg-dark-800 border border-gray-700 rounded-full text-xs text-gray-300 cursor-pointer hover:bg-gray-700 transition-colors">
                    What is his focus?
                  </span>
                  <span 
                    onClick={() => handleSend("Tell me about his IoT projects")}
                    className="px-3 py-1 bg-dark-800 border border-gray-700 rounded-full text-xs text-gray-300 cursor-pointer hover:bg-gray-700 transition-colors">
                    Tell me about his IoT projects
                  </span>
                </div>
              )}

              {isLoading && (
                <div className="flex gap-2 items-start max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-primary-500/20 flex-shrink-0 flex items-center justify-center text-primary-400 mt-1">
                    <Bot size={14} />
                  </div>
                  <div className="bg-dark-800 border border-gray-700 text-gray-400 text-sm p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-dark-800 border-t border-gray-700 flex-shrink-0">
              <form onSubmit={preventSubmitForm} className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask a question..."
                  className="w-full bg-dark-900 border border-gray-700 rounded-full pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1.5 w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500 transition-colors"
                >
                  <Sparkles size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

