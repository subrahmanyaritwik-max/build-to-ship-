import React from 'react';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  BookOpen, 
  Timer, 
  HelpCircle, 
  PlusCircle, 
  Calendar 
} from 'lucide-react';

export default function Dashboard({ stats, tasks, sessions, setActiveTab }) {
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl shadow-blue-500/10">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
            <span>⚡ Ready for today's session?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Master the Fundamentals of Learning
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Build strong study habits, leverage active recall, manage task priorities, and track your focus hours with evidence-based strategies.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('timer')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
            >
              <Timer className="w-4 h-4" />
              <span>Start Pomodoro Timer</span>
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Guides</span>
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Study Streak</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{stats?.studyStreakDays || 5}</span>
            <span className="text-xs text-slate-400 font-medium">Days active</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Focus Time</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {Math.round((stats?.totalFocusMinutes || 0) / 60 * 10) / 10}
            </span>
            <span className="text-xs text-slate-400 font-medium">Hours logged</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tasks Done</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{stats?.tasksCompleted || 0}</span>
            <span className="text-xs text-slate-400 font-medium">Completed</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quizzes Mastered</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{stats?.quizzesMastered || 0}</span>
            <span className="text-xs text-slate-400 font-medium">Top scores</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 columns: Priority Tasks & Quick Navigation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Upcoming Academic Tasks
                </h3>
                <p className="text-xs text-slate-400">Prioritize high impact assignments first</p>
              </div>

              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View All ({tasks.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingTasks.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="text-sm font-medium text-slate-300">All caught up! No pending tasks.</p>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-semibold hover:bg-blue-600/30"
                >
                  Create New Task
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        t.priority === 'High' ? 'bg-red-400' : t.priority === 'Medium' ? 'bg-amber-400' : 'bg-blue-400'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-sm text-slate-200">{t.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300">{t.subject}</span>
                          <span>Due: {t.dueDate}</span>
                          <span>~{t.estimatedMinutes} mins</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/80 text-slate-300 font-medium">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Hub Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveTab('flashcards')}
              className="glass-card glass-card-hover p-4 rounded-2xl text-left border border-slate-800 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Flashcard Decks</h4>
              <p className="text-xs text-slate-400 mt-1">Active recall repetition cards</p>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className="glass-card glass-card-hover p-4 rounded-2xl text-left border border-slate-800 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Knowledge Check</h4>
              <p className="text-xs text-slate-400 mt-1">Self-assess fundamental topics</p>
            </button>

            <button
              onClick={() => setActiveTab('gpa')}
              className="glass-card glass-card-hover p-4 rounded-2xl text-left border border-slate-800 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">GPA Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Project target semester scores</p>
            </button>
          </div>
        </div>

        {/* Right Column: Focus Session Log */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Timer className="w-4 h-4 text-purple-400" />
              Recent Study Sessions
            </h3>

            {sessions.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No study sessions logged today yet.</p>
            ) : (
              <div className="space-y-3">
                {sessions.slice(0, 5).map((s) => (
                  <div key={s.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-200">{s.taskTitle}</p>
                      <span className="text-[11px] text-slate-400">{new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 font-bold">
                      +{s.durationMinutes}m
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
