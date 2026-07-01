import { Link } from 'react-router-dom';
import { Users, TrendingUp, MessageSquare, BookOpen, Calendar, ArrowRight } from 'lucide-react';

const MY_COMMUNITIES = [
  {
    id: 'c1',
    name: 'React Native Developers',
    role: 'Member',
    unread: 3,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    id: 'c2',
    name: 'Product Management Hub',
    role: 'Moderator',
    unread: 0,
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
  }
];

const RECENT_DISCUSSIONS = [
  {
    id: 'd1',
    communityId: 'c1',
    communityName: 'React Native Developers',
    title: 'Best navigation library for Expo 2026?',
    author: 'Sarah Jenkins',
    replies: 24,
    time: '2 hours ago',
  },
  {
    id: 'd2',
    communityId: 'c2',
    communityName: 'Product Management Hub',
    title: 'Transitioning from Engineering to PM - Tips?',
    author: 'David Chen',
    replies: 89,
    time: '5 hours ago',
  }
];

export default function CommunityDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening in your communities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: My Communities & Stats */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold">2</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Communities</span>
            </div>
            <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold">140</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Reputation</span>
            </div>
          </div>

          {/* Joined Communities */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="font-bold text-lg">My Communities</h2>
              <Link to="/community/explore" className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                Explore
              </Link>
            </div>
            <div className="divide-y divide-border">
              {MY_COMMUNITIES.map(comm => (
                <Link key={comm.id} to={`/community/${comm.id}`} className="p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${comm.iconBg}`}>
                    <Users className={`w-5 h-5 ${comm.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate group-hover:text-purple-500 transition-colors">{comm.name}</h3>
                    <p className="text-xs text-muted-foreground">{comm.role}</p>
                  </div>
                  {comm.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                      {comm.unread}
                    </div>
                  )}
                </Link>
              ))}
              {MY_COMMUNITIES.length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  You haven't joined any communities yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            Recent Discussions
          </h2>
          
          <div className="space-y-4">
            {RECENT_DISCUSSIONS.map(disc => (
              <Link key={disc.id} to={`/community/${disc.communityId}/post/${disc.id}`} className="block bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-purple-500/50 transition-all group">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                  <span className="px-2 py-1 bg-secondary rounded-md">{disc.communityName}</span>
                  <span>•</span>
                  <span>Posted by {disc.author}</span>
                  <span>•</span>
                  <span>{disc.time}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-purple-500 transition-colors">{disc.title}</h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    {disc.replies} Replies
                  </span>
                  <span className="flex items-center gap-1 text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                    View Thread <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
