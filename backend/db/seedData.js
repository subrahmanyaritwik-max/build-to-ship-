const initialData = {
  guides: [
    {
      id: "g1",
      title: "Active Recall & Spaced Repetition",
      category: "Study Technique",
      readTime: "5 min read",
      difficulty: "Essential",
      summary: "Stop passive re-reading. Test yourself regularly to trigger long-term memory retrieval pathways.",
      content: `### What is Active Recall?
Active recall is a principle of efficient learning which claims the need to actively stimulate memory retrieval during the learning process. Unlike passive reviewing (re-reading notes or highlighting text), active recall forces your brain to retrieve answers from memory.

### How to Implement:
1. **The Closed Book Method**: After reading a page, close the book and write down everything you remember.
2. **Flashcards (Anki / Quizlet)**: Create question-and-answer cards rather than simple definition cards.
3. **Feynman Technique**: Explain the concept out loud as if teaching it to a 10-year-old.

### Why Spaced Repetition Works:
According to Ebbinghaus's Forgetting Curve, we lose 70% of new information within 24 hours unless reviewed. Spaced repetition increases intervals between reviews (Day 1, Day 3, Day 7, Day 14, Day 30) to lock knowledge into long-term memory.`,
      icon: "Brain",
      featured: true
    },
    {
      id: "g2",
      title: "The Pomodoro & Time Blocking Method",
      category: "Time Management",
      readTime: "4 min read",
      difficulty: "Beginner",
      summary: "Beat procrastination by breaking study blocks into sprint intervals with intentional breaks.",
      content: `### The Pomodoro Protocol
Developed by Francesco Cirillo in the late 1980s, this technique uses a timer to break down work into intervals:

1. **Choose a single task** to focus on.
2. **Set a timer for 25 minutes** (1 Pomodoro).
3. **Work with zero distractions** until the timer rings.
4. **Take a short 5-minute break** (stretch, hydrate, walk).
5. After 4 Pomodoros, take a **longer 15-30 minute break**.

### Time Blocking Strategy
Instead of maintaining a generic to-do list, assign specific hours of your day to specific subjects. Treat these study blocks as non-negotiable appointments with yourself.`,
      icon: "Clock",
      featured: true
    },
    {
      id: "g3",
      title: "The Cornell Note-Taking System",
      category: "Note Taking",
      readTime: "6 min read",
      difficulty: "Intermediate",
      summary: "Divide your page into Cues, Notes, and Summary for effortless, high-yield exam revision.",
      content: `### Page Layout Setup
Divide a sheet of paper into 3 distinct sections:
- **Notes Column (Right 70%)**: Main lecture notes, main ideas, diagrams, and formulas.
- **Cue Column (Left 30%)**: Keywords, questions, and prompts added right after class.
- **Summary Section (Bottom 2 inches)**: Brief 2-3 sentence summary of the entire page in your own words.

### Revision Workflow
Cover the main notes section with your hand. Look at the cues in the left column and try to recite the concept out loud before revealing the right column.`,
      icon: "FileText",
      featured: false
    },
    {
      id: "g4",
      title: "The Eisenhower Matrix for Students",
      category: "Prioritization",
      readTime: "5 min read",
      difficulty: "Essential",
      summary: "Categorize tasks by urgency and importance to eliminate exam night panics.",
      content: `### The 4 Quadrants
1. **Do First (Urgent & Important)**: Upcoming exam in 2 days, overdue lab report.
2. **Schedule (Not Urgent & Important)**: Weekly problem sets, long-term project research, health.
3. **Delegate / Reduce (Urgent & Not Important)**: Group chat notifications, minor administrative tasks.
4. **Eliminate (Not Urgent & Not Important)**: Mindless doom-scrolling, unproductive multitasking.

Focus 80% of your proactive energy in **Quadrant 2 (Schedule)** before tasks turn into Quadrant 1 emergencies.`,
      icon: "CheckSquare",
      featured: true
    },
    {
      id: "g5",
      title: "Sleep, Nutrition & Exam Neuroscience",
      category: "Wellness & Biology",
      readTime: "7 min read",
      difficulty: "Essential",
      summary: "Optimize your brain chemistry. Sleep is where memories are consolidated, not lost.",
      content: `### Why Pulling All-Nighters Backfires
Sleep is not passive downtime. During Deep Sleep and REM sleep, the hippocampus transfers short-term study data to the neocortex for long-term storage (Memory Consolidation).

Pulling an all-nighter impairs cognitive function equal to a 0.05% blood alcohol level and reduces problem-solving capacity by up to 40%.

### Pre-Exam Protocol:
- **7.5 to 9 Hours of Sleep**: Non-negotiable the night before exams.
- **Hydration**: Even 2% dehydration impairs concentration.
- **Glucose Control**: Avoid high-sugar crash snacks; opt for complex carbs, nuts, and proteins.`,
      icon: "Zap",
      featured: false
    }
  ],
  tasks: [
    {
      id: "t1",
      title: "Review Active Recall flashcards for CS 101",
      subject: "Computer Science",
      dueDate: "2026-08-28",
      priority: "High",
      status: "To Do",
      estimatedMinutes: 30,
      createdAt: "2026-08-27T08:00:00Z"
    },
    {
      id: "t2",
      title: "Complete Linear Algebra Problem Set #4",
      subject: "Mathematics",
      dueDate: "2026-08-29",
      priority: "High",
      status: "In Progress",
      estimatedMinutes: 60,
      createdAt: "2026-08-27T09:15:00Z"
    },
    {
      id: "t3",
      title: "Draft Outline for World History Essay",
      subject: "History",
      dueDate: "2026-08-30",
      priority: "Medium",
      status: "Completed",
      estimatedMinutes: 45,
      createdAt: "2026-08-26T14:20:00Z"
    },
    {
      id: "t4",
      title: "Read Chapter 5 Physics Mechanics",
      subject: "Physics",
      dueDate: "2026-08-31",
      priority: "Low",
      status: "To Do",
      estimatedMinutes: 40,
      createdAt: "2026-08-27T10:00:00Z"
    }
  ],
  flashcards: [
    {
      id: "f1",
      deck: "Cognitive Science & Learning",
      question: "What is the Ebbinghaus Forgetting Curve?",
      answer: "A graph showing how information is forgotten over time when there is no attempt to retain it. Most loss occurs within 24 hours.",
      difficulty: "Medium"
    },
    {
      id: "f2",
      deck: "Cognitive Science & Learning",
      question: "What is Interleaving in study strategy?",
      answer: "Mixing different topics or types of problems within a single study session rather than practicing one skill repeatedly (blocking).",
      difficulty: "Hard"
    },
    {
      id: "f3",
      deck: "Cognitive Science & Learning",
      question: "What is Dual Coding theory?",
      answer: "Combining verbal/textual information with visual diagrams to create two separate cognitive traces in memory.",
      difficulty: "Easy"
    },
    {
      id: "f4",
      deck: "Time Management",
      question: "Explain Parkinson's Law.",
      answer: "'Work expands so as to fill the time available for its completion.' Setting tighter time blocks forces focus.",
      difficulty: "Medium"
    },
    {
      id: "f5",
      deck: "Time Management",
      question: "What is the 'Eat The Frog' strategy?",
      answer: "Tackling your hardest, most important task first thing in the morning before fatigue sets in.",
      difficulty: "Easy"
    }
  ],
  quizzes: [
    {
      id: "q1",
      title: "Study Methods & Retention Mastery",
      subject: "Cognitive Learning",
      questions: [
        {
          id: 1,
          question: "Which of the following is considered the MOST effective technique for long-term retention?",
          options: [
            "Highlighting textbook paragraphs in bright colors",
            "Active Recall through self-testing",
            "Re-reading notes 5 times back to back",
            "Listening to lecture audio while sleeping"
          ],
          correctAnswer: 1,
          explanation: "Active recall forces the brain to retrieve information, building stronger neural connections compared to passive reading or highlighting."
        },
        {
          id: 2,
          question: "How long is a standard Pomodoro work interval?",
          options: [
            "10 minutes",
            "25 minutes",
            "60 minutes",
            "90 minutes"
          ],
          correctAnswer: 1,
          explanation: "The classical Pomodoro technique prescribes 25 minutes of uninterrupted work followed by a 5-minute break."
        },
        {
          id: 3,
          question: "In the Cornell Note-Taking System, what goes into the left-hand column?",
          options: [
            "Full verbatim transcriptions",
            "Cues, main questions, and keywords",
            "Teacher grade comments",
            "Personal doodles"
          ],
          correctAnswer: 1,
          explanation: "The left 30% column is reserved for Cues & Keywords used for self-quizzing during review."
        }
      ]
    },
    {
      id: "q2",
      title: "Time Management & Productivity Essentials",
      subject: "Productivity",
      questions: [
        {
          id: 1,
          question: "Which quadrant of the Eisenhower Matrix should effective students invest most of their proactive time into?",
          options: [
            "Quadrant 1: Urgent & Important (Crises)",
            "Quadrant 2: Not Urgent & Important (Planning & Learning)",
            "Quadrant 3: Urgent & Not Important (Interruptions)",
            "Quadrant 4: Not Urgent & Not Important (Distractions)"
          ],
          correctAnswer: 1,
          explanation: "Investing in Quadrant 2 (Not Urgent & Important) prevents assignments from becoming last-minute Quadrant 1 emergencies."
        },
        {
          id: 2,
          question: "What is Parkinson's Law?",
          options: [
            "Memory decays by 50% every hour",
            "Work expands to fill the time allotted for its completion",
            "Multitasking increases IQ by 10%",
            "Sleep decreases study efficiency"
          ],
          correctAnswer: 1,
          explanation: "Parkinson's Law observes that giving yourself 3 weeks for a 2-hour assignment means it will take 3 weeks to complete."
        }
      ]
    }
  ],
  sessions: [
    {
      id: "s1",
      taskTitle: "Linear Algebra Practice",
      durationMinutes: 25,
      type: "Pomodoro",
      timestamp: "2026-08-26T15:30:00Z"
    },
    {
      id: "s2",
      taskTitle: "CS 101 Data Structures",
      durationMinutes: 50,
      type: "Deep Focus",
      timestamp: "2026-08-27T09:00:00Z"
    }
  ],
  userStats: {
    studyStreakDays: 5,
    totalFocusMinutes: 345,
    tasksCompleted: 12,
    quizzesMastered: 4
  }
};

module.exports = initialData;
