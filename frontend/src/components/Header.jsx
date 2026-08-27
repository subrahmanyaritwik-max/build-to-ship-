import React from 'react';
import { GraduationCap, Zap, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Header({ isOnline, onRefresh }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white flex items-center gap-2">
            Student<span className="text-blue-400">Fundamentals</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Full Stack</span>
          </h1>
          <p className="text-xs text-slate-400">Academic Excellence & Study Mastery Hub</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onRefresh}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium"
          title="Refresh Data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync</span>
        </button>

        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border ${
          isOnline 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          <span>{isOnline ? 'Backend API Live' : 'Offline Mode'}</span>
        </div>
      </div>
    </header>
  );
}
