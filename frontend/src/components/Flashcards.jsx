import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Check, 
  X, 
  Sparkles 
} from 'lucide-react';

export default function Flashcards({ flashcards, onCreateFlashcard }) {
  const [selectedDeck, setSelectedDeck] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCard, setNewCard] = useState({
    deck: 'Cognitive Science & Learning',
    question: '',
    answer: '',
    difficulty: 'Medium'
  });

  const decks = ['All', ...new Set(flashcards.map(f => f.deck))];

  const filteredCards = flashcards.filter(f => selectedDeck === 'All' || f.deck === selectedDeck);
  const currentCard = filteredCards[currentIndex] || null;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % (filteredCards.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + (filteredCards.length || 1)) % (filteredCards.length || 1));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCard.question || !newCard.answer) return;
    onCreateFlashcard(newCard);
    setNewCard({ deck: 'Cognitive Science & Learning', question: '', answer: '', difficulty: 'Medium' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-purple-400" />
            Active Recall Flashcards
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Test retrieval speed to lock information into long-term memory.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Flashcard</span>
        </button>
      </div>

      {/* Deck Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {decks.map(deck => (
          <button
            key={deck}
            onClick={() => {
              setSelectedDeck(deck);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDeck === deck
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {deck}
          </button>
        ))}
      </div>

      {/* Flashcard Flip Stage */}
      {filteredCards.length === 0 ? (
        <div className="glass-card text-center py-16 rounded-3xl border border-slate-800">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No flashcards found in this deck.</p>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Card counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-2">
            <span>Deck: {currentCard?.deck}</span>
            <span>Card {currentIndex + 1} of {filteredCards.length}</span>
          </div>

          {/* Interactive Flip Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[260px] cursor-pointer rounded-3xl p-8 glass-card border border-purple-500/30 hover:border-purple-500/60 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden group select-none"
          >
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                isFlipped ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              }`}>
                {isFlipped ? 'ANSWER / CONCEPT' : 'QUESTION / PROMPT'}
              </span>

              <span className="text-slate-400 flex items-center gap-1 group-hover:text-white transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                Click to flip
              </span>
            </div>

            <div className="my-auto py-6 text-center">
              <h3 className="text-xl font-bold text-white leading-relaxed">
                {isFlipped ? currentCard?.answer : currentCard?.question}
              </h3>
            </div>

            <div className="text-center text-xs text-slate-500">
              Difficulty: <span className="text-slate-300 font-medium">{currentCard?.difficulty}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-6 py-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold border border-purple-500/30 transition-all flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add New Flashcard</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Deck Category</label>
                <input
                  type="text"
                  required
                  value={newCard.deck}
                  onChange={(e) => setNewCard({ ...newCard, deck: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Question / Prompt</label>
                <textarea
                  rows="3"
                  required
                  placeholder="What is the concept or active recall question?"
                  value={newCard.question}
                  onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Answer / Explanation</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Concise explanation or answer..."
                  value={newCard.answer}
                  onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
