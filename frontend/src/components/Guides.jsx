import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Zap, 
  Brain, 
  CheckSquare, 
  FileText, 
  Sparkles, 
  X, 
  ChevronRight 
} from 'lucide-react';

const ICON_MAP = {
  Brain: Brain,
  Clock: Clock,
  FileText: FileText,
  CheckSquare: CheckSquare,
  Zap: Zap
};

export default function Guides({ guides }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGuide, setActiveGuide] = useState(null);

  const categories = ['All', 'Study Technique', 'Time Management', 'Note Taking', 'Prioritization', 'Wellness & Biology'];

  const filteredGuides = guides.filter(g => {
    const matchesCat = selectedCategory === 'All' || g.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery = searchQuery === '' || 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      g.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-blue-400" />
            Fundamental Learning Pillars
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Science-backed strategies to maximize memory retention and study output.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search strategies & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((g) => {
          const IconComp = ICON_MAP[g.icon] || BookOpen;
          return (
            <div
              key={g.id}
              onClick={() => setActiveGuide(g)}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                    {g.difficulty}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-1">
                  {g.category}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {g.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {g.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {g.readTime}
                </span>

                <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Detail Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {activeGuide.category} • {activeGuide.readTime}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">{activeGuide.title}</h2>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm space-y-4 leading-relaxed whitespace-pre-wrap font-sans">
              {activeGuide.content}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveGuide(null)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-all shadow-md"
              >
                Got It, Apply Strategy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
