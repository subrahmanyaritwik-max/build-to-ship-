import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Guides from './components/Guides';
import TasksPlanner from './components/TasksPlanner';
import Flashcards from './components/Flashcards';
import QuizModule from './components/QuizModule';
import GpaCalculator from './components/GpaCalculator';
import PomodoroTimer from './components/PomodoroTimer';
import { api } from './api/client';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);

  // Core Data States
  const [stats, setStats] = useState({
    studyStreakDays: 5,
    totalFocusMinutes: 345,
    tasksCompleted: 12,
    quizzesMastered: 4
  });

  const [guides, setGuides] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [sessions, setSessions] = useState([]);

  // Fetch initial data
  const loadData = async () => {
    try {
      const [sRes, gRes, tRes, fRes, qRes, sessRes] = await Promise.allSettled([
        api.getStats(),
        api.getGuides(),
        api.getTasks(),
        api.getFlashcards(),
        api.getQuizzes(),
        api.getSessions()
      ]);

      if (sRes.status === 'fulfilled') setStats(sRes.value);
      if (gRes.status === 'fulfilled') setGuides(gRes.value);
      if (tRes.status === 'fulfilled') setTasks(tRes.value);
      if (fRes.status === 'fulfilled') setFlashcards(fRes.value);
      if (qRes.status === 'fulfilled') setQuizzes(qRes.value);
      if (sessRes.status === 'fulfilled') setSessions(sessRes.value);

      setIsOnline(true);
    } catch (err) {
      console.warn('API connection offline, using fallback state:', err);
      setIsOnline(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers for Tasks
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      // Local state fallback
      const newTask = { ...taskData, id: 't_' + Date.now(), status: 'To Do' };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updated = await api.updateTask(id, updates);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  // Handlers for Flashcards
  const handleCreateFlashcard = async (cardData) => {
    try {
      const newCard = await api.createFlashcard(cardData);
      setFlashcards(prev => [...prev, newCard]);
    } catch (err) {
      const newCard = { ...cardData, id: 'f_' + Date.now() };
      setFlashcards(prev => [...prev, newCard]);
    }
  };

  const pendingTaskCount = tasks.filter(t => t.status !== 'Completed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header isOnline={isOnline} onRefresh={loadData} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingTaskCount={pendingTaskCount}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && (
              <Dashboard
                stats={stats}
                tasks={tasks}
                sessions={sessions}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'guides' && (
              <Guides guides={guides} />
            )}

            {activeTab === 'tasks' && (
              <TasksPlanner
                tasks={tasks}
                onCreateTask={handleCreateTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {activeTab === 'flashcards' && (
              <Flashcards
                flashcards={flashcards}
                onCreateFlashcard={handleCreateFlashcard}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizModule quizzes={quizzes} />
            )}

            {activeTab === 'gpa' && (
              <GpaCalculator />
            )}

            {activeTab === 'timer' && (
              <PomodoroTimer onSessionLogged={loadData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
