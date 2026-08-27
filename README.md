# 🎓 Student Fundamentals - Full Stack Web Application

A modern, responsive full-stack platform focused on **Student Fundamentals**: evidence-based study techniques, time management protocols, active recall flashcards, interactive knowledge quizzes, Pomodoro focus timer, and GPA forecasting.

---

## 🌐 Live Local Links & Ports

- 💻 **Frontend Web Interface**: [http://localhost:5173](http://localhost:5173)
- ⚙️ **Backend REST API**: [http://localhost:5000](http://localhost:5000)
- 🏥 **Backend Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Configured API Keys & Credentials

The backend environment is configured in `backend/.env`:

```env
PORT=5000
API_SECRET_KEY=your_api_secret_key_here
BACKEND_TOKEN=your_backend_token_here
```

---

## 📁 Directory Structure

```
BUILD_TO_SHIP/
├── package.json               # Root scripts to run frontend & backend
├── vercel.json                # Production deployment configuration
├── backend/                   # Node.js + Express REST API
│   ├── .env                   # Secret keys & port configuration
│   ├── server.js              # Server entry point
│   ├── db/                    # Persistent JSON database & seed data
│   └── routes/                # Express API routes (stats, guides, tasks, etc.)
└── frontend/                  # React 18 + Vite + Tailwind CSS
    ├── src/
    │   ├── App.jsx            # Core state manager & tab navigation
    │   ├── api/client.js      # REST API client
    │   └── components/        # Dashboard, Guides, Tasks, Flashcards, Quiz, GPA, Pomodoro
    └── vite.config.js         # API proxying to backend
```

---

## 🚀 How to Run in VS Code

Run both servers from the root workspace folder:

### 1. Install All Dependencies
```bash
npm run install:all
```

### 2. Run Backend API
```bash
npm run start:backend
```

### 3. Run Frontend UI
```bash
npm run start:frontend
```

---

## ☁️ Deployment Instructions

To publish live on Vercel:
```bash
npx vercel
```
*The root `vercel.json` automatically routes `/api` to the backend Express server and serves the React static build.*
