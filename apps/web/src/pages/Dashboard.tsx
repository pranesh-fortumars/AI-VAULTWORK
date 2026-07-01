import { useState, useEffect } from 'react';
import { Activity, Users, FolderKanban, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


export default function Dashboard() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API fetch delay for polish
    const loadData = async () => {
      try {
        // In a real app, this would be: await fetchWithAuth('/projects/stats');
        setTimeout(() => {
          setStats([
            { label: 'Active Projects', value: '0', icon: FolderKanban, trend: 'New workspace', color: 'text-blue-500' },
            { label: 'Tasks Completed', value: '0', icon: CheckCircle2, trend: 'Let\'s get started', color: 'text-green-500' },
            { label: 'Team Members', value: '1', icon: Users, trend: 'Just you', color: 'text-purple-500' },
            { label: 'Productivity Score', value: '-', icon: Activity, trend: 'No data yet', color: 'text-orange-500' },
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground animate-in fade-in duration-500">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
        <p className="font-medium">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Good morning, {currentUser?.email?.split('@')[0] || 'User'}! ☀️
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your workspace today.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.href='/community'}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 rounded-lg font-medium text-sm transition-all shadow-lg shadow-purple-500/20"
          >
            <Users className="w-4 h-4" />
            Enter Community Hub
          </button>
          <button className="px-4 py-2 bg-foreground text-background hover:bg-foreground/90 rounded-lg font-medium text-sm transition-colors shadow-sm">
            Create Task
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-card border border-border hover:border-border/80 transition-colors shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-2 text-foreground">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-xl bg-secondary ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-border/50 flex justify-between items-center bg-secondary/20">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <button className="text-xs font-medium text-purple-500 hover:text-purple-400">View All</button>
          </div>
          <div className="flex-1 p-5 overflow-y-auto flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-3">
              <Activity className="w-8 h-8 mx-auto opacity-20" />
              <p className="text-sm">Activity feed will appear here</p>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-border/50 flex justify-between items-center bg-secondary/20">
            <h3 className="font-semibold text-foreground">My Tasks</h3>
            <button className="text-xs font-medium text-purple-500 hover:text-purple-400">View All</button>
          </div>
          <div className="flex-1 p-5 overflow-y-auto flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 mx-auto opacity-20" />
              <p className="text-sm">You're all caught up!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
