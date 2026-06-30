import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { currentUser } = useAuth();

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0">
      {/* Mobile Menu Toggle (Placeholder) */}
      <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
        <Menu className="w-5 h-5" />
      </button>

      {/* Global Search */}
      <div className="hidden md:flex flex-1 max-w-xl relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search projects, tasks, messages... (Press '/')" 
          className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-transparent hover:border-border focus:bg-background focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 rounded-lg text-sm text-foreground transition-all outline-none"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium bg-background border border-border rounded text-muted-foreground">⌘</kbd>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium bg-background border border-border rounded text-muted-foreground">K</kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full border-2 border-background"></span>
        </button>

        <div className="h-8 w-px bg-border mx-1 hidden md:block"></div>

        <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-secondary border border-transparent hover:border-border transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-inner">
            {currentUser?.email ? currentUser.email[0].toUpperCase() : 'U'}
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:block truncate max-w-[120px]">
            {currentUser?.email || 'User'}
          </span>
        </button>
      </div>
    </header>
  );
}
