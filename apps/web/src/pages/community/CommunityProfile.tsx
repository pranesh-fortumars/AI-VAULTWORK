import { User, Activity, Award, MessageSquare, Zap, Globe, MapPin, Link as LinkIcon } from 'lucide-react';

export default function CommunityProfile() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6 md:p-8 pb-24">
      {/* Profile Header Card */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm relative">
        <div className="h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-12">
            <div className="flex items-end gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-card flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                V
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  VaultWork User
                  <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </h1>
                <p className="text-muted-foreground font-medium">Senior Developer @ VaultWork</p>
              </div>
            </div>
            
            <button className="px-6 py-2.5 bg-secondary text-foreground hover:bg-secondary/80 rounded-xl font-medium transition-colors border border-border shadow-sm mb-2">
              Edit Community Profile
            </button>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
            <span className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> vaultwork.com</span>
            <span className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors"><Globe className="w-4 h-4" /> @vaultuser</span>
            <span className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors"><Globe className="w-4 h-4" /> @vault_dev</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Sidebar (Stats & Info) */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
              <Activity className="w-4 h-4 text-purple-500" /> Community Impact
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Award className="w-4 h-4" /> Reputation</span>
                <span className="font-bold text-foreground">1,240</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Discussions</span>
                <span className="font-bold text-foreground">34</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><User className="w-4 h-4" /> Joined Communities</span>
                <span className="font-bold text-foreground">5</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 border-b border-border/50 pb-3">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'System Design', 'UI/UX'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg border border-border/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content (Activity Feed) */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {[
              { id: 1, type: 'post', title: 'Best practices for managing micro-frontends?', community: 'React Native Developers', time: '2 hours ago', likes: 12 },
              { id: 2, type: 'reply', title: 'Re: How to handle authentications in Next.js 14', community: 'Next.js Experts', time: '1 day ago', likes: 5 },
              { id: 3, type: 'resource', title: 'Shared "Complete Guide to System Design" PDF', community: 'System Design Interview Prep', time: '3 days ago', likes: 34 }
            ].map(activity => (
              <div key={activity.id} className="bg-card border border-border rounded-2xl p-5 hover:border-purple-500/50 transition-colors group shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className={`p-2 rounded-lg ${activity.type === 'post' ? 'bg-blue-500/10 text-blue-500' : activity.type === 'reply' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                      {activity.type === 'post' ? <MessageSquare className="w-4 h-4" /> : activity.type === 'reply' ? <Activity className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{activity.community}</p>
                      <h4 className="font-semibold text-foreground group-hover:text-purple-500 transition-colors cursor-pointer">{activity.title}</h4>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium pl-12">
                  <span>{activity.time}</span>
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {activity.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
