import { Clock, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function PendingApproval() {
  const { signOut, currentUser } = useAuth();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 bg-card border border-border shadow-2xl rounded-3xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-6">
          <Clock className="w-8 h-8 text-orange-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Account Pending Approval
        </h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Hello <strong>{currentUser?.email}</strong>, your account has been successfully created but is currently locked. 
          An administrator must assign you a role and provision your access before you can enter the workspace.
        </p>

        <button 
          onClick={signOut}
          className="flex items-center justify-center w-full gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-foreground bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
