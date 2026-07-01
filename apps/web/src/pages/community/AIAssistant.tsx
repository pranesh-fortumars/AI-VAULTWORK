import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, Loader2, ArrowRight } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Community Hub AI Assistant. I can summarize discussions, find learning resources, or help you prepare for technical interviews. What would you like to do today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `I can certainly help with "${userMsg}". Here are some top recommended resources from the community library that match your query, along with a quick summary of the best practices discussed by our mentors last week...` 
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              Community AI <Sparkles className="w-4 h-4 text-yellow-500" />
            </h1>
            <p className="text-sm text-muted-foreground">Powered by VaultWork Intelligence</p>
          </div>
        </div>
        <button className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors">
          Clear Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-secondary/10">
        
        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8 mt-4">
            {[
              "Summarize the latest React Navigation trends",
              "How do I prepare for a FAANG System Design interview?",
              "Find me beginner resources for Python",
              "What are the most active career communities right now?"
            ].map(prompt => (
              <button 
                key={prompt}
                onClick={() => setInput(prompt)}
                className="p-4 bg-card border border-border rounded-xl text-left text-sm hover:border-purple-500/50 hover:shadow-md transition-all group flex justify-between items-center"
              >
                <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{prompt}</span>
                <ArrowRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-purple-600 text-white' : 'bg-secondary border border-border'
            }`}>
              {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            
            <div className={`p-4 rounded-2xl max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-foreground text-background rounded-tr-none shadow-lg' 
                : 'bg-card border border-border rounded-tl-none shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 max-w-3xl mx-auto">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-card border border-border flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-card border-t border-border shrink-0">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="w-full pl-6 pr-16 py-4 bg-background border border-border rounded-full focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Send className="w-4 h-4 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
