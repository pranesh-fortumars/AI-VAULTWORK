import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  MessageSquare, 
  Video, 
  Files, 
  Settings,
  LogOut,
  Vault
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { signOut, userProfile } = useAuth();
  
  const hasPermission = (requiredPermissions?: string[]) => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    if (userProfile?.permissions?.includes('*')) return true;
    return requiredPermissions.some(p => userProfile?.permissions?.includes(p));
  };

  const allNavItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban, requiredPermissions: ['projects:view'] },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare, requiredPermissions: ['tasks:view'] },
    { name: 'Messages', path: '/messages', icon: MessageSquare, requiredPermissions: ['messages:view'] },
    { name: 'Meetings', path: '/meetings', icon: Video, requiredPermissions: ['meetings:view'] },
    { name: 'Files', path: '/files', icon: Files, requiredPermissions: ['files:view'] },
    { name: 'Users', path: '/users', icon: Vault, requiredPermissions: ['users:manage'] },
  ];

  const navItems = allNavItems.filter(item => hasPermission(item.requiredPermissions));

  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col hidden md:flex shrink-0">
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-3 text-foreground font-semibold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Vault className="w-5 h-5 text-white" />
          </div>
          VaultWork
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-secondary text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border/50 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
