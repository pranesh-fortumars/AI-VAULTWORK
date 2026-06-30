import { Link } from 'react-router-dom';
import { Plus, MoreVertical, FolderKanban, Clock, Users } from 'lucide-react';

export default function Projects() {
  // Dummy data for visual scaffolding
  const projects = [
    { id: '1', name: 'VaultMobile App', status: 'In Progress', progress: 65, tasks: 24, dueDate: '2026-08-15', members: ['JD', 'SM', 'AK'] },
    { id: '2', name: 'Website Redesign', status: 'Review', progress: 90, tasks: 12, dueDate: '2026-07-10', members: ['AB', 'JD'] },
    { id: '3', name: 'Q3 Marketing Assets', status: 'Planning', progress: 15, tasks: 45, dueDate: '2026-09-01', members: ['EK', 'SM', 'JB', 'AK'] },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Review': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Planning': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-secondary text-foreground';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-purple-500" />
            Projects
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track all company projects.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 rounded-lg font-medium text-sm transition-all shadow-lg shadow-purple-500/10">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Filters (Placeholder) */}
      <div className="flex gap-2">
        {['All Active', 'My Projects', 'Archived'].map((filter, i) => (
          <button 
            key={filter}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${i === 0 ? 'bg-secondary border-border text-foreground' : 'bg-transparent border-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="group block p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <button className="text-muted-foreground hover:text-foreground p-1 transition-colors z-10" onClick={(e) => e.preventDefault()}>
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-500 transition-colors">
              {project.name}
            </h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4" />
                {project.tasks} tasks
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-foreground">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
              <div className="flex -space-x-2">
                {project.members.slice(0, 3).map((member, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-card z-10">
                    {member}
                  </div>
                ))}
                {project.members.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-xs font-bold border-2 border-card z-0">
                    +{project.members.length - 3}
                  </div>
                )}
              </div>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Temporary inline import missing from lucid-react top import
import { CheckSquare } from 'lucide-react';
