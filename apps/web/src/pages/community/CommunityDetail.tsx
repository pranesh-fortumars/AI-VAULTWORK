import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Search, MessageSquare, Video, FileText, Plus, ThumbsUp, MoreHorizontal, MessageCircle, Calendar } from 'lucide-react';

const MOCK_COMMUNITY = {
  id: 'c1',
  name: 'React Native Developers',
  description: 'A community for React Native developers to share resources, ask questions, and collaborate.',
  members: 1250,
  banner: 'bg-gradient-to-r from-blue-600 to-indigo-600',
};

const MOCK_POSTS = [
  {
    id: 'p1',
    title: 'Best navigation library for Expo 2026?',
    content: "I'm starting a new project using Expo SDK 50+ and I'm torn between Expo Router and standard React Navigation. What is the current industry standard?",
    author: 'Sarah Jenkins',
    time: '2 hours ago',
    likes: 34,
    comments: 24,
    tags: ['React Navigation', 'Expo'],
  },
  {
    id: 'p2',
    title: 'Memory leak in FlatList with large images',
    content: "Has anyone experienced severe memory leaks when rendering high-res images inside a FlatList on Android? I've tried `windowSize` and `maxToRenderPerBatch` but it still crashes.",
    author: 'Marcus Cole',
    time: '5 hours ago',
    likes: 12,
    comments: 8,
    tags: ['Performance', 'Android'],
  }
];

export default function CommunityDetail() {
  useParams(); // Destructuring removed to fix TS unused variable warning
  const [activeTab, setActiveTab] = useState('discussions');

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Community Header (Banner) */}
      <div className={`${MOCK_COMMUNITY.banner} h-48 w-full relative shrink-0`}>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-8 -mt-16 relative z-10">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">{MOCK_COMMUNITY.name}</h1>
            <p className="text-muted-foreground max-w-2xl">{MOCK_COMMUNITY.description}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex -space-x-3 mr-4">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-card bg-secondary flex items-center justify-center font-bold text-xs">
                  U{i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-card bg-secondary flex items-center justify-center font-bold text-xs">
                +1k
              </div>
            </div>
            <button className="px-6 py-2.5 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors">
              Joined
            </button>
          </div>
        </div>

        {/* Community Tabs */}
        <div className="flex items-center gap-6 border-b border-border mt-8">
          {[
            { id: 'discussions', label: 'Discussions', icon: MessageSquare },
            { id: 'resources', label: 'Resource Library', icon: FileText },
            { id: 'rooms', label: 'Live Rooms', icon: Video },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 px-2 text-sm font-semibold transition-all border-b-2 -mb-[1px] ${
                activeTab === tab.id 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'discussions' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Main Feed */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search discussions..."
                      className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20">
                    <Plus className="w-5 h-5" />
                    New Post
                  </button>
                </div>

                <div className="space-y-4">
                  {MOCK_POSTS.map(post => (
                    <div key={post.id} className="bg-card border border-border p-6 rounded-2xl hover:border-purple-500/50 transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                      <div className="flex gap-4">
                        {/* Vote Column */}
                        <div className="flex flex-col items-center gap-1 text-muted-foreground shrink-0">
                          <button className="p-1.5 rounded bg-secondary hover:bg-purple-500/10 hover:text-purple-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold">{post.likes}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">{post.author}</span>
                              <span>•</span>
                              <span>{post.time}</span>
                            </div>
                            <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <h3 className="text-lg font-bold text-foreground mb-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {post.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-secondary text-xs font-medium rounded-md text-secondary-foreground">{tag}</span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-purple-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments} Comments
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                  <h3 className="font-bold mb-4">About Community</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><Users className="w-4 h-4"/> Members</span>
                      <span className="font-medium text-foreground">{MOCK_COMMUNITY.members}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> Created</span>
                      <span className="font-medium text-foreground">Oct 2025</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-600/10 border border-purple-500/20 p-5 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-purple-600 mb-2">Community Rules</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Be respectful and welcoming.</li>
                    <li>No spam or self-promotion.</li>
                    <li>Use appropriate tags for posts.</li>
                    <li>Keep discussions on-topic.</li>
                  </ol>
                </div>
              </div>

            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search resources, PDFs, links..."
                    className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors border border-border shadow-sm">
                  <Plus className="w-5 h-5" />
                  Add Resource
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 1, title: 'React Performance Cheat Sheet', type: 'PDF', size: '2.4 MB', author: 'Sarah J.', tags: ['React', 'Perf'] },
                  { id: 2, title: 'Complete Guide to System Design', type: 'Link', author: 'Mark T.', tags: ['System Design'] },
                  { id: 3, title: 'Q3 Interview Prep Guide', type: 'Doc', size: '15 KB', author: 'Admin', tags: ['Interviews'] },
                  { id: 4, title: 'GraphQL Best Practices', type: 'Video', size: '45 mins', author: 'Sarah J.', tags: ['GraphQL'] },
                ].map(resource => (
                  <div key={resource.id} className="bg-card border border-border p-5 rounded-2xl hover:border-purple-500/50 transition-all group shadow-sm flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-secondary rounded text-muted-foreground uppercase tracking-wider">{resource.type}</span>
                    </div>
                    
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-purple-500 transition-colors line-clamp-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Shared by {resource.author} • {resource.size || 'External'}</p>
                    
                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex gap-2">
                        {resource.tags.map(t => (
                          <span key={t} className="text-xs font-medium text-secondary-foreground bg-secondary px-2 py-1 rounded-md">{t}</span>
                        ))}
                      </div>
                      <button className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition-colors">Open</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'rooms' && (
            <div className="py-20 text-center text-muted-foreground border-2 border-dashed border-border rounded-2xl">
              <h3 className="text-lg font-bold mb-2">Live Rooms Coming Soon</h3>
              <p>Real-time voice and video collaboration spaces.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
