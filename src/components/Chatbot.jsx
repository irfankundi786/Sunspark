import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { 
  MessageCircle, X, Send, Loader2, FileText, Sun, Download, Trash2 
} from "lucide-react";
import { GoogleGenerativeAI as GoogleGenAI } from "@google/generative-ai";

// Standard Relative Paths
import { Button } from "./ui/Button"; 
import { Input } from "./ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { KNOWLEDGE_BASE } from "../lib/knowledgeBase";

// Initialize AI outside for better performance
const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY || "");

const SYSTEM_INSTRUCTION = `You are a helpful support agent for SunSpark Solar. 
Use this data: ${JSON.stringify(KNOWLEDGE_BASE)}. 
Always mention the 25-year warranty. Be professional, direct, and concise.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Hello! Welcome to SunSpark Solar Solutions. ☀️\n\nI'm your AI assistant. To get started, could you please tell me your name?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadStep, setLeadStep] = useState("name");
  const [leadData, setLeadData] = useState({ name: "", phone: "" });
  const scrollRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, leadStep]);

  const handleSend = async (customText) => {
    const userMessage = customText || input.trim();
    if (!userMessage || isLoading) return;

    if (!customText) setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    // 1. LEAD GENERATION FLOW
    if (leadStep === "name") {
      setLeadData(prev => ({ ...prev, name: userMessage }));
      setLeadStep("phone");
      setMessages(prev => [...prev, { role: "model", text: `Nice to meet you, ${userMessage}! What is your phone number?` }]);
      return;
    }

    if (leadStep === "phone") {
      setLeadData(prev => ({ ...prev, phone: userMessage }));
      setLeadStep("chat");
      setMessages(prev => [...prev, { role: "model", text: "Thank you! How can I help you today? Please choose an option or type your question." }]);
      return;
    }

    // 2. AI LOGIC (OPTIMIZED FOR SPEED)
    setIsLoading(true);
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("VITE_GEMINI_API_KEY is missing. Check your .env file.");
      }

      const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview", 
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          maxOutputTokens: 500,
        }
      });

      // Role Sequence Fix: Filter out initial model message so history starts with 'user'
      const historyForAPI = messages
        .filter((m, index) => !(index === 0 && m.role === "model"))
        .map(m => ({
          role: m.role === "model" ? "model" : "user",
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({
        history: historyForAPI,
      });

      const result = await chat.sendMessage(userMessage);
      const botResponse = await result.response.text();
      setMessages(prev => [...prev, { role: "model", text: botResponse }]);

    } catch (error) {
      console.error("Gemini Error:", error);
      
      let friendlyError = "Something went wrong.";
      if (error.message.includes("404")) {
        friendlyError = "❌ Legacy Model Retired. Using gemini-3-flash-preview.";
      } else if (error.message.includes("API_KEY_INVALID")) {
        friendlyError = "🔑 Invalid API Key. Please check AI Studio.";
      } else {
        friendlyError = `⚠️ AI Error: ${error.message}`;
      }

      setMessages(prev => [...prev, { role: "model", text: friendlyError }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4"
          >
            {/* Main Crystal Card */}
            <Card className="w-[350px] sm:w-[400px] h-[620px] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-white/30 overflow-hidden rounded-[2.5rem] bg-card/40 backdrop-blur-2xl">
              
              {/* Header: AI Studio Design */}
              <CardHeader className="p-6 border-b bg-emerald-500/10 border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.3)]">
                      <Sun className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold tracking-tight">SunSpark AI</CardTitle>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <span className="text-[10px] uppercase tracking-widest opacity-60 font-black">Expert Mode</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 opacity-40 hover:opacity-100" title="Download Leads"><Download size={16}/></Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 opacity-40 hover:opacity-100" onClick={() => setMessages([{ role: "model", text: "Chat cleared. How can I help you today?" }])} title="Clear Chat"><Trash2 size={16}/></Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 opacity-40 hover:opacity-100" onClick={() => setIsOpen(false)}><X size={16}/></Button>
                  </div>
                </div>
              </CardHeader>
              
              {/* Message Content */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-5 bg-transparent scrollbar-hide" ref={scrollRef}>
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`p-4 rounded-3xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                      msg.role === "user" 
                        ? "bg-emerald-500 text-white rounded-tr-none shadow-lg shadow-emerald-500/20" 
                        : "bg-white/70 dark:bg-white/10 text-foreground rounded-tl-none border border-white/20 backdrop-blur-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Choice Buttons */}
                {leadStep === "chat" && !isLoading && (
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      className="justify-start gap-4 h-auto p-4 text-left border-emerald-200/50 bg-emerald-50/50 hover:bg-emerald-100/70 rounded-2xl transition-all shadow-sm group dark:bg-emerald-500/10"
                      onClick={() => handleSend("I want a custom solar quotation")}
                    >
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Get a Custom Quote</div>
                        <div className="text-[10px] opacity-60">Calculated pricing for your roof</div>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start gap-4 h-auto p-4 text-left border-blue-200/50 bg-blue-50/50 hover:bg-blue-100/70 rounded-2xl transition-all shadow-sm group dark:bg-blue-500/10"
                      onClick={() => handleSend("I have some general questions")}
                    >
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                        <MessageCircle size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">General Information</div>
                        <div className="text-[10px] opacity-60">Ask about products or trends</div>
                      </div>
                    </Button>
                  </div>
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/40 dark:bg-white/10 p-3 rounded-2xl border border-white/20">
                      <Loader2 className="animate-spin text-emerald-500" size={16} />
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Input Footer */}
              <div className="p-6 border-t border-white/10 bg-white/20 backdrop-blur-xl flex gap-2">
                <Input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={leadStep === "chat" ? "Type a message..." : "Enter info above..."} 
                  className="rounded-2xl h-12 border-none bg-white/40 dark:bg-white/5 placeholder:text-gray-500 text-sm focus-visible:ring-emerald-500 transition-all"
                />
                <Button 
                  onClick={() => handleSend()} 
                  disabled={isLoading || !input.trim()} 
                  className="h-12 w-12 rounded-2xl bg-emerald-500 shadow-xl shadow-emerald-500/30 shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-[1.5rem] shadow-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen ? "bg-gray-900 text-white" : "bg-emerald-500 text-white shadow-emerald-500/40"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </motion.button>
    </div>
  );
}