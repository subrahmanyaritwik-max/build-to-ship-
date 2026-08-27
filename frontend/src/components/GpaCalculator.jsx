import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Award, 
  CheckCircle 
} from 'lucide-react';
import { api } from '../api/client';

const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

export default function GpaCalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Computer Science 101', grade: 'A', credits: 4 },
    { id: 2, name: 'Calculus II', grade: 'B+', credits: 3 },
    { id: 3, name: 'Physics Mechanics', grade: 'A-', credits: 4 },
    { id: 4, name: 'Academic Writing', grade: 'A', credits: 3 }
  ]);

  const [priorGpa, setPriorGpa] = useState('3.50');
  const [priorCredits, setPriorCredits] = useState('30');
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: `Course #${courses.length + 1}`, grade: 'A', credits: 3 }
    ]);
  };

  const removeCourse = (id) => {
    if (courses.length === 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id, field, val) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const payload = {
        courses,
        currentGpa: priorGpa ? parseFloat(priorGpa) : undefined,
        currentCredits: priorCredits ? parseFloat(priorCredits) : undefined
      };
      const res = await api.calculateGpa(payload);
      setResults(res);
    } catch (err) {
      console.error('GPA Calc API error:', err);
      // Fallback local calculation
      const gradePointsMap = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0 };
      let semPts = 0, semCreds = 0;
      courses.forEach(c => {
        const pts = gradePointsMap[c.grade] || 4.0;
        const cr = Number(c.credits) || 0;
        semPts += pts * cr;
        semCreds += cr;
      });
      const semGpa = semCreds > 0 ? semPts / semCreds : 0;
      let cumGpa = semGpa;
      let totCreds = semCreds;
      if (priorGpa && priorCredits) {
        const pCr = parseFloat(priorCredits) || 0;
        const pG = parseFloat(priorGpa) || 0;
        totCreds = pCr + semCreds;
        cumGpa = totCreds > 0 ? ((pG * pCr) + semPts) / totCreds : 0;
      }
      setResults({
        semesterGpa: Math.round(semGpa * 100) / 100,
        semesterCredits: semCreds,
        cumulativeGpa: Math.round(cumGpa * 100) / 100,
        totalCredits: totCreds
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Calculator className="w-7 h-7 text-blue-400" />
          Interactive GPA Estimator
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Calculate your target semester and overall cumulative Grade Point Average.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Course Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Semester Courses</h3>
              <button
                onClick={addCourse}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600/30 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Course
              </button>
            </div>

            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.id} className="grid grid-cols-12 gap-3 items-center bg-slate-800/40 p-3 rounded-2xl border border-slate-800 text-xs">
                  <div className="col-span-6 sm:col-span-6">
                    <input
                      type="text"
                      placeholder="Course name"
                      value={c.name}
                      onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-3">
                    <select
                      value={c.grade}
                      onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:outline-none"
                    >
                      {GRADES.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={c.credits}
                      onChange={(e) => updateCourse(c.id, 'credits', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-white text-center focus:outline-none"
                    />
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => removeCourse(c.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Prior Cumulative GPA (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 3.50"
                  value={priorGpa}
                  onChange={(e) => setPriorGpa(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Prior Total Credits (Optional)</label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  value={priorCredits}
                  onChange={(e) => setPriorCredits(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-4"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{isCalculating ? 'Calculating...' : 'Calculate GPA'}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Results Display */}
        <div>
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              GPA Results
            </h3>

            {results ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <span className="text-xs text-blue-300 uppercase tracking-wider font-bold">Semester GPA</span>
                  <div className="text-4xl font-extrabold text-white mt-1">{results.semesterGpa}</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">{results.semesterCredits} Credits This Term</span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <span className="text-xs text-purple-300 uppercase tracking-wider font-bold">Cumulative GPA</span>
                  <div className="text-4xl font-extrabold text-white mt-1">{results.cumulativeGpa}</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">{results.totalCredits} Total Credits</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs">
                Enter your course grades and click "Calculate GPA" to see projected scores.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
