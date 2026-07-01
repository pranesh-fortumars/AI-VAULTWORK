import { useState } from 'react';
import { Search, Users, TrendingUp, Briefcase, Code, GraduationCap, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all', name: 'All Communities' },
  { id: 'career', name: 'Career Hub', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'tech', name: 'Technology', icon: Code, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'prep', name: 'Interview Prep', icon: GraduationCap, color: 'text-green-500', bg: 'bg-green-500/10' },
];

const MOCK_COMMUNITIES = [
  {
    id: 'c1',
    name: 'React Native Developers',
    description: 'A community for React Native developers to share resources, ask questions, and collaborate.',
    members: 1250,
    category: 'tech',
    tags: ['React', 'Mobile', 'TypeScript'],
    activeDiscussions: 45,
    banner: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    featured: true,
  },
  {
    id: 'c2',
    name: 'Product Management Hub',
    description: 'Discuss strategy, roadmaps, and career growth in Product Management.',
    members: 850,
    category: 'career',
    tags: ['PM', 'Strategy', 'Agile'],
    activeDiscussions: 12,
    banner: 'bg-gradient-to-r from-orange-500 to-red-500',
    featured: true,
  },
  {
    id: 'c3',
    name: 'FAANG Interview Prep',
    description: 'System design, DSA practice, and mock interviews for top tech companies.',
    members: 3400,
    category: 'prep',
    tags: ['System Design', 'DSA', 'Algorithms'],
    activeDiscussions: 120,
    banner: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    featured: false,
  },
  {
    id: 'c4',
    name: 'Cybersecurity Enthusiasts',
    description: 'Learn ethical hacking, share security news, and prepare for certifications.',
    members: 560,
    category: 'tech',
    tags: ['Security', 'Infosec', 'CTF'],
    activeDiscussions: 8,
    banner: 'bg-gradient-to-r from-gray-700 to-gray-900',
    featured: false,
  }
];

export default function CommunityHome() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCommunities = MOCK_COMMUNITIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || c.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-transparent -z-10" />
        <div className="p-12 md:p-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Discover Your Tribe
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to the <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Community Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10">
            Join thousands of professionals exploring new careers, preparing for interviews, and building the future of technology together.
          </p>
          
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search communities, discussions, and resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-background border-2 border-border rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none text-lg transition-all shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Communities Grid */}
      {search === '' && activeCategory === 'all' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Featured Communities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_COMMUNITIES.filter(c => c.featured).map(community => (
              <div key={community.id} className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-purple-500/50 transition-all duration-300">
                <div className={`h-24 w-full ${community.banner}`} />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-purple-500 transition-colors">{community.name}</h3>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">
                      <Users className="w-4 h-4" />
                      {community.members.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6 flex-1">{community.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex gap-2">
                      {community.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-secondary-foreground">{tag}</span>
                      ))}
                    </div>
                    <Link to={`/community/${community.id}`} className="text-sm font-semibold text-purple-600 hover:text-purple-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters & All Communities */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'bg-card border border-border text-muted-foreground hover:bg-secondary'
              }`}
            >
              {cat.icon && <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-background' : cat.color}`} />}
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCommunities.map(community => (
            <Link key={community.id} to={`/community/${community.id}`} className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-purple-500/50 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${CATEGORIES.find(c => c.id === community.category)?.bg}`}>
                   {(() => {
                     const Icon = CATEGORIES.find(c => c.id === community.category)?.icon || Users;
                     return <Icon className={`w-6 h-6 ${CATEGORIES.find(c => c.id === community.category)?.color}`} />;
                   })()}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  {community.activeDiscussions} active
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-purple-500 transition-colors line-clamp-1">{community.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{community.description}</p>
              
              <div className="flex items-center justify-between text-sm mt-auto">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {community.members}
                </span>
                <span className="text-purple-600 font-medium">Join Community</span>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredCommunities.length === 0 && (
          <div className="text-center py-20 bg-card border border-border rounded-2xl">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No communities found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
