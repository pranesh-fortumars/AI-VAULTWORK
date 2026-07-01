import { NavLink } from 'react-router-dom';
import { 
  Globe2, 
  Home, 
  Compass, 
  Briefcase, 
  GraduationCap, 
  Video, 
  BookOpen, 
  Calendar, 
  Bot,
  Settings,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CommunitySidebar() {
  useAuth(); // Using this hook but no variables extracted currently

  const navItems = [
    { name: 'Dashboard', path: '/community', icon: Home },
    { name: 'Explore', path: '/community/explore', icon: Compass },
    { name: 'Discussions', path: '/community/discussions', icon: MessageSquare },
    { name: 'Live Rooms', path: '/community/live', icon: Video },
    { name: 'Study Prep', path: '/community/prep', icon: GraduationCap },
    { name: 'Career Hub', path: '/community/career', icon: Briefcase },
    { name: 'Library', path: '/community/library', icon: BookOpen },
    { name: 'Events', path: '/community/events', icon: Calendar },
    { name: 'AI Assistant', path: '/community/ai', icon: Bot },
  ];

  return (
    <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl flex flex-col hidden md:flex z-10 shadow-lg">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-border/50">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Globe2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Community Hub
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/community'} // Dashboard is index route
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`
              }
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Switch back to Main App Action */}
      <div className="p-4 border-t border-border/50 space-y-1 bg-secondary/10">
        <NavLink
          to="/dashboard"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
        >
          <div className="w-5 h-5 flex items-center justify-center rounded bg-secondary">
            <span className="text-xs font-bold text-foreground">VW</span>
          </div>
          Return to VaultWork
        </NavLink>

        <NavLink
          to="/community/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          Hub Settings
        </NavLink>
      </div>
    </aside>
  );
}
