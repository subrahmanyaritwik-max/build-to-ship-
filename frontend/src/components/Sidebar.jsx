import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  Layers, 
  HelpCircle, 
  Calculator, 
  Timer 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, pendingTaskCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'guides', label: 'Fundamental Guides', icon: BookOpen },
    { id: 'tasks', label: 'Tasks & Planner', icon: CheckSquare, badge: pendingTaskCount > 0 ? pendingTaskCount : null },
    { id: 'flashcards', label: 'Flashcard Decks', icon: Layers },
    { id: 'quiz', label: 'Knowledge Quizzes', icon: HelpCircle },
    { id: 'gpa', label: 'GPA Calculator', icon: Calculator },
    { id: 'timer', label: 'Focus Timer', icon: Timer },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          Core Pillars
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3.5 rounded-2xl glass-card border border-slate-800/80 bg-gradient-to-b from-slate-800/40 to-slate-900/60">
        <div className="flex items-center gap-2 mb-1.5 text-blue-400 text-xs font-semibold">
          <span>💡 Golden Study Rule</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          "Consistency beats intensity. 25 minutes of active focus daily yields compound academic gains."
        </p>
      </div>
    </aside>
  );
}
