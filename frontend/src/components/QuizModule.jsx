import React, { useState } from 'react';
import { 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles 
} from 'lucide-react';
import { api } from '../api/client';

export default function QuizModule({ quizzes }) {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startQuiz = (q) => {
    setActiveQuiz(q);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  const handleOptionSelect = (optionIdx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIdx]: optionIdx
    });
  };

  const handleSubmit = async () => {
    if (!activeQuiz) return;
    setIsSubmitting(true);
    try {
      const userAnswers = activeQuiz.questions.map((_, idx) => selectedAnswers[idx] ?? -1);
      const res = await api.submitQuiz(activeQuiz.id, userAnswers);
      setQuizResult(res);
    } catch (err) {
      console.error('Quiz submission error:', err);
      // Fallback local evaluation if backend fails
      let score = 0;
      const results = activeQuiz.questions.map((q, idx) => {
        const sel = selectedAnswers[idx];
        const isCorr = sel === q.correctAnswer;
        if (isCorr) score++;
        return {
          questionId: q.id,
          selectedOption: sel,
          correctOption: q.correctAnswer,
          isCorrect: isCorr,
          explanation: q.explanation
        };
      });
      const pct = Math.round((score / activeQuiz.questions.length) * 100);
      setQuizResult({
        score,
        totalQuestions: activeQuiz.questions.length,
        percentage: pct,
        passed: pct >= 70,
        results
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (quizResult) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
        <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
            quizResult.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-white">
            {quizResult.passed ? '🎉 Knowledge Mastered!' : '💪 Good Effort! Keep Reviewing'}
          </h2>

          <div className="flex items-center justify-center gap-6 py-2">
            <div>
              <p className="text-3xl font-extrabold text-white">{quizResult.percentage}%</p>
              <p className="text-xs text-slate-400">Final Score</p>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <p className="text-3xl font-extrabold text-blue-400">{quizResult.score} / {quizResult.totalQuestions}</p>
              <p className="text-xs text-slate-400">Correct Answers</p>
            </div>
          </div>

          <button
            onClick={() => setActiveQuiz(null)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Back to All Quizzes</span>
          </button>
        </div>

        {/* Question Breakdown */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Detailed Explanation Breakdown</h3>
          {quizResult.results.map((res, idx) => {
            const q = activeQuiz.questions[idx];
            return (
              <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-sm text-slate-200">
                    Q{idx + 1}. {q.question}
                  </h4>
                  {res.isCorrect ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-red-400 font-bold shrink-0">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 space-y-1 pt-1">
                  <p>Your choice: <span className="font-medium text-slate-300">{q.options[res.selectedOption] || 'None'}</span></p>
                  {!res.isCorrect && (
                    <p className="text-emerald-400">Correct answer: <span className="font-medium">{q.options[res.correctOption]}</span></p>
                  )}
                </div>

                <p className="text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-800 italic mt-2">
                  💡 {res.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeQuiz) {
    const currentQ = activeQuiz.questions[currentQuestionIdx];
    const isLast = currentQuestionIdx === activeQuiz.questions.length - 1;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveQuiz(null)}
            className="text-xs font-semibold text-slate-400 hover:text-white"
          >
            ← Exit Quiz
          </button>
          <span className="text-xs font-bold text-blue-400">
            Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionSelect(optIdx)}
                  className={`w-full p-4 rounded-xl text-left text-xs font-semibold transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border-blue-500 shadow-md'
                      : 'bg-slate-800/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-600'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-30"
            >
              Previous
            </button>

            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || selectedAnswers[currentQuestionIdx] === undefined}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 disabled:opacity-40"
              >
                {isSubmitting ? 'Evaluating...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                disabled={selectedAnswers[currentQuestionIdx] === undefined}
                onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <HelpCircle className="w-7 h-7 text-emerald-400" />
          Interactive Fundamentals Quizzes
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Evaluate your understanding of study techniques and focus principles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((q) => (
          <div
            key={q.id}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                {q.subject}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{q.title}</h3>
              <p className="text-xs text-slate-400 mt-2">
                {q.questions.length} Multiple Choice Questions • Instant Feedback & Explanations
              </p>
            </div>

            <button
              onClick={() => startQuiz(q)}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <span>Take Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
