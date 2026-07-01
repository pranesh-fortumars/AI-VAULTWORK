import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
        <ShieldAlert className="w-10 h-10 text-red-500" />
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-3">
        Access Restricted
      </h1>
      
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        You do not have the required permissions to view this page. If you believe this is an error, please contact your workspace administrator.
      </p>

      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Dashboard
      </button>
    </div>
  );
}
