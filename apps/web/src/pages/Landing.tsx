import { ArrowRight, Vault, ShieldCheck, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="w-full h-20 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Vault className="w-6 h-6 text-white" />
          </div>
          VaultWork
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-foreground hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm font-medium text-muted-foreground mb-8 border border-border/50">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          VaultWork Enterprise v2.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          The Secure Workspace for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Enterprise Teams</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Zero-trust security meets seamless collaboration. Manage projects, teams, and real-time communications in one mathematically secure platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
          >
            Request Access
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full text-left">
          <div className="p-6 rounded-3xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
            <ShieldCheck className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Zero-Trust RBAC</h3>
            <p className="text-muted-foreground">Every action is verified against a strict permissions matrix and fully audited.</p>
          </div>
          <div className="p-6 rounded-3xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
            <Zap className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Sync</h3>
            <p className="text-muted-foreground">WebSockets keep your Kanban boards and internal chat instantly up to date.</p>
          </div>
          <div className="p-6 rounded-3xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
            <Users className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dynamic Workflows</h3>
            <p className="text-muted-foreground">Tailor-made dashboards automatically generated based on the user's role.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
