import { Briefcase, MapPin, Building2, Search, ArrowRight, DollarSign, Clock, Star } from 'lucide-react';

const JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Vercel',
    location: 'Remote',
    salary: '$140k - $180k',
    type: 'Full-time',
    posted: '2 days ago',
    featured: true,
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Figma',
    location: 'San Francisco, CA',
    salary: '$130k - $160k',
    type: 'Full-time',
    posted: '5 hours ago',
    featured: false,
  },
  {
    id: 3,
    title: 'React Native Developer',
    company: 'Meta',
    location: 'Remote',
    salary: '$150k - $200k',
    type: 'Contract',
    posted: '1 week ago',
    featured: false,
  }
];

export default function CareerHub() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-10 md:p-14 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            Career Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Find Your Next Big Opportunity</h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-8">Discover exclusive job postings, get referrals from community members, and prepare for your upcoming interviews.</p>
          
          <div className="w-full max-w-2xl relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Job title, keywords, or company..."
                className="w-full pl-12 pr-4 py-3.5 bg-background border-none rounded-xl text-foreground focus:ring-4 focus:ring-white/20 outline-none shadow-lg"
              />
            </div>
            <button className="px-6 py-3.5 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-all shadow-lg whitespace-nowrap">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-4">Job Type</h3>
            <div className="space-y-3">
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                <label key={type} className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer group">
                  <div className="w-4 h-4 border-2 border-muted-foreground rounded group-hover:border-purple-500 transition-colors" />
                  {type}
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-4">Location</h3>
            <div className="space-y-3">
              {['Remote', 'On-site', 'Hybrid'].map(loc => (
                <label key={loc} className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer group">
                  <div className="w-4 h-4 border-2 border-muted-foreground rounded group-hover:border-purple-500 transition-colors" />
                  {loc}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Job Board */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Latest Opportunities</h2>
            <span className="text-sm text-muted-foreground">Showing {JOBS.length} jobs</span>
          </div>

          {JOBS.map(job => (
            <div key={job.id} className={`bg-card border p-6 rounded-2xl hover:shadow-md transition-all group ${job.featured ? 'border-blue-500/50 shadow-blue-500/5' : 'border-border'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg group-hover:text-blue-500 transition-colors">{job.title}</h3>
                      {job.featured && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3" /> Promoted
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium mb-3">{job.company}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
                      <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" />{job.salary}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{job.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-4 mt-4 sm:mt-0">
                  <span className="text-xs font-medium text-muted-foreground">{job.posted}</span>
                  <button className="px-4 py-2 bg-secondary text-foreground hover:bg-blue-600 hover:text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
