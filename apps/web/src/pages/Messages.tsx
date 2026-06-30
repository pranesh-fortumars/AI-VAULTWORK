import { useState } from 'react';
import { Hash, Search, Plus, Send, Smile, Paperclip, Phone, Video, Info, MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Messages() {
  const { currentUser } = useAuth();
  
  // Dummy state
  const [channels] = useState([
    { id: '1', name: 'general', unread: 0 },
    { id: '2', name: 'engineering', unread: 3 },
    { id: '3', name: 'design', unread: 0 },
    { id: '4', name: 'announcements', unread: 12 },
  ]);

  const [dms] = useState([
    { id: '1', name: 'Sarah Miller', online: true, unread: 1 },
    { id: '2', name: 'Alex Kumar', online: false, unread: 0 },
    { id: '3', name: 'Elena Kova', online: true, unread: 0 },
  ]);

  const [activeChat, setActiveChat] = useState('engineering');
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-card border border-border rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-500">
      
      {/* Left Sidebar (Channels & DMs) */}
      <div className="w-64 border-r border-border bg-secondary/10 flex flex-col hidden sm:flex shrink-0">
        
        <div className="p-4 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-9 pr-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          
          {/* Channels Section */}
          <div className="px-3 mb-6">
            <div className="flex items-center justify-between px-2 mb-2 group">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Channels</h3>
              <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-0.5">
              {channels.map(channel => (
                <button 
                  key={channel.id}
                  onClick={() => setActiveChat(channel.name)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors ${
                    activeChat === channel.name 
                      ? 'bg-purple-500/10 text-purple-500 font-medium' 
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Hash className="w-4 h-4 opacity-50 shrink-0" />
                    <span className="truncate">{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span className="px-1.5 py-0.5 bg-purple-500 text-white text-[10px] font-bold rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* DMs Section */}
          <div className="px-3">
            <div className="flex items-center justify-between px-2 mb-2 group">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Direct Messages</h3>
              <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-0.5">
              {dms.map(dm => (
                <button 
                  key={dm.id}
                  onClick={() => setActiveChat(dm.name)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors ${
                    activeChat === dm.name 
                      ? 'bg-purple-500/10 text-purple-500 font-medium' 
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="relative shrink-0">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-gray-600 to-gray-400 flex items-center justify-center text-[10px] text-white font-bold">
                        {dm.name[0]}
                      </div>
                      {dm.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <span className="truncate">{dm.name}</span>
                  </div>
                  {dm.unread > 0 && (
                    <span className="px-1.5 py-0.5 bg-purple-500 text-white text-[10px] font-bold rounded-full">
                      {dm.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background min-w-0">
        
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-border/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-bold text-foreground">{activeChat}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors hidden sm:block">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors hidden sm:block">
              <Video className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
              <Info className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors sm:hidden">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Thread (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          <div className="text-center my-6">
            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">Today</span>
          </div>

          {/* Dummy Message */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
              SM
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-foreground">Sarah Miller</span>
                <span className="text-xs text-muted-foreground">10:42 AM</span>
              </div>
              <div className="text-foreground leading-relaxed">
                Hey everyone! Just deployed the latest API updates. Let me know if you run into any issues. 🚀
              </div>
            </div>
          </div>

          {/* Dummy Current User Message */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground font-bold shrink-0">
              {currentUser?.email ? currentUser.email[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-foreground">{currentUser?.email?.split('@')[0] || 'You'}</span>
                <span className="text-xs text-muted-foreground">10:45 AM</span>
              </div>
              <div className="text-foreground leading-relaxed">
                Looks good on my end! The latency dropped significantly. Great job.
              </div>
            </div>
          </div>

        </div>

        {/* Input Area */}
        <div className="p-4 px-6 border-t border-border/50 shrink-0">
          <div className="flex items-end gap-2 bg-secondary/30 border border-border rounded-xl p-2 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all">
            <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${activeChat}`}
              className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none resize-none outline-none py-2.5 text-foreground placeholder:text-muted-foreground text-sm custom-scrollbar"
              rows={1}
            />
            <div className="flex items-center gap-1 pb-1 shrink-0">
              <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors hidden sm:block">
                <Smile className="w-5 h-5" />
              </button>
              <button 
                disabled={!message.trim()}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
