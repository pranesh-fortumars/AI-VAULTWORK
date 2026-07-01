import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield } from 'lucide-react';

export default function UserProfile() {
  const { currentUser, userProfile } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Global Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-inner mb-4">
              {currentUser?.email ? currentUser.email[0].toUpperCase() : 'U'}
            </div>
            <h3 className="font-bold text-lg">{currentUser?.email || 'Guest User'}</h3>
            <p className="text-sm text-muted-foreground mb-4">Enterprise User</p>
            <button className="w-full py-2 bg-secondary text-foreground hover:bg-secondary/80 rounded-xl text-sm font-medium transition-colors">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border/50 pb-4">
              <User className="w-5 h-5 text-purple-500" /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input type="text" defaultValue="VaultWork Admin" className="w-full px-4 py-2.5 bg-secondary/50 border border-transparent rounded-xl text-foreground focus:bg-background focus:border-purple-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" disabled defaultValue={currentUser?.email || ''} className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border border-transparent rounded-xl text-muted-foreground opacity-70 cursor-not-allowed" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border/50 pb-4">
              <Shield className="w-5 h-5 text-blue-500" /> Security & Access
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Assigned Roles</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-bold uppercase tracking-wider">Super Admin</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {userProfile?.permissions?.map((p: string) => (
                    <span key={p} className="px-2 py-1 bg-secondary text-muted-foreground border border-border rounded-md text-xs font-medium">
                      {p}
                    </span>
                  ))}
                  {!userProfile?.permissions?.length && (
                    <span className="text-sm text-muted-foreground">No specific permissions assigned.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button className="px-5 py-2.5 bg-secondary text-foreground hover:bg-secondary/80 rounded-xl font-medium transition-colors border border-border">
              Cancel
            </button>
            <button className="px-5 py-2.5 bg-purple-600 text-white hover:bg-purple-700 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/20">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
