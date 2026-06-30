import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, MoreHorizontal, MessageSquare, Paperclip } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams();
  
  // Dummy data
  const columns = ['To Do', 'In Progress', 'In Review', 'Done'];
  const [tasks] = useState([
    { id: '1', title: 'Design Landing Page', status: 'To Do', priority: 'High', comments: 3, attachments: 1 },
    { id: '2', title: 'Setup Firebase Auth', status: 'In Progress', priority: 'High', comments: 5, attachments: 0 },
    { id: '3', title: 'Create DB Schema', status: 'Done', priority: 'Medium', comments: 1, attachments: 2 },
    { id: '4', title: 'Write API Endpoints', status: 'In Review', priority: 'Medium', comments: 8, attachments: 0 },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/10 text-red-500';
      case 'Medium': return 'bg-orange-500/10 text-orange-500';
      case 'Low': return 'bg-green-500/10 text-green-500';
      default: return 'bg-secondary text-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">VaultMobile App</h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">In Progress</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Project ID: {id} • Due Aug 15, 2026</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-secondary text-foreground hover:bg-secondary/80 rounded-lg transition-colors border border-border">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-medium text-sm transition-all shadow-lg shadow-purple-500/20">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
        {columns.map(col => (
          <div key={col} className="flex-shrink-0 w-80 flex flex-col bg-secondary/30 rounded-2xl border border-border/50">
            
            <div className="p-4 flex items-center justify-between border-b border-border/50">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                {col}
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {tasks.filter(t => t.status === col).length}
                </span>
              </h3>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {tasks.filter(t => t.status === col).map(task => (
                <div 
                  key={task.id} 
                  className="bg-card p-4 rounded-xl border border-border shadow-sm hover:border-purple-500/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm leading-tight mb-4 group-hover:text-purple-500 transition-colors">
                    {task.title}
                  </h4>
                  <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
                    <div className="flex items-center gap-3">
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {task.comments}
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-3.5 h-3.5" />
                          {task.attachments}
                        </div>
                      )}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-600 to-gray-400 border border-card"></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
