import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Volume2, 
  Brain 
} from 'lucide-react';
import { api } from '../api/client';

export default function PomodoroTimer({ onSessionLogged }) {
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [taskTitle, setTaskTitle] = useState('Active Recall Study');
  const [isLogged, setIsLogged] = useState(false);

  const MODE_CONFIGS = {
    pomodoro: { name: 'Pomodoro Focus', seconds: 25 * 60, color: 'text-blue-400', bg: 'bg-blue-600' },
    shortBreak: { name: 'Short Rest (5m)', seconds: 5 * 60, color: 'text-emerald-400', bg: 'bg-emerald-600' },
    longBreak: { name: 'Deep Break (15m)', seconds: 15 * 60, color: 'text-purple-400', bg: 'bg-purple-600' }
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      handleFinishSession();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODE_CONFIGS[newMode].seconds);
    setIsRunning(false);
    setIsLogged(false);
  };

  const handleFinishSession = async () => {
    const mins = Math.round(MODE_CONFIGS[mode].seconds / 60);
    try {
      await api.logSession({
        taskTitle,
        durationMinutes: mins,
        type: MODE_CONFIGS[mode].name
      });
      setIsLogged(true);
      if (onSessionLogged) onSessionLogged();
    } catch (err) {
      console.error('Session log failed:', err);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalSecs = MODE_CONFIGS[mode].seconds;
  const progressPercent = ((totalSecs - timeLeft) / totalSecs) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-white flex items-center justify-center gap-2.5">
          <Timer className="w-7 h-7 text-purple-400" />
          Focus & Pomodoro Timer
        </h2>
        <p className="text-sm text-slate-400">
          Work in intense 25-minute focus blocks to avoid mental burnout.
        </p>
      </div>

      {/* Mode Switches */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {Object.keys(MODE_CONFIGS).map((mKey) => (
          <button
            key={mKey}
            onClick={() => switchMode(mKey)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === mKey
                ? `${MODE_CONFIGS[mKey].bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {MODE_CONFIGS[mKey].name}
          </button>
        ))}
      </div>

      {/* Timer Container */}
      <div className="glass-card p-10 rounded-3xl border border-slate-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Task Title Input */}
        <div className="max-w-xs mx-auto">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Focus Session Target
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-center text-xs text-white font-semibold focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Big Digit Display */}
        <div className="py-4">
          <div className="text-6xl md:text-7xl font-extrabold text-white tracking-widest font-mono">
            {formatTime(timeLeft)}
          </div>
          <div className="w-48 mx-auto bg-slate-800 h-2 rounded-full overflow-hidden mt-6">
            <div
              className={`h-full transition-all duration-500 ${MODE_CONFIGS[mode].bg}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setTimeLeft(MODE_CONFIGS[mode].seconds);
              setIsRunning(false);
              setIsLogged(false);
            }}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm text-white transition-all shadow-xl flex items-center gap-2 ${
              isRunning ? 'bg-amber-600 hover:bg-amber-500' : `${MODE_CONFIGS[mode].bg} hover:opacity-90`
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" /> Start Focus
              </>
            )}
          </button>
        </div>

        {isLogged && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Session logged to your stats!</span>
          </div>
        )}
      </div>
    </div>
  );
}
