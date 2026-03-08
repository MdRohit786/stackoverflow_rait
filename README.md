# 🚀 Rait-Quest

> A modern, full-stack developer Q&A platform inspired by Stack Overflow — built with Next.js, Node.js, and MongoDB.

![Rait-Quest Banner](./stack/public/logo.png)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://stackoverflow-rait.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://stackoverflow-rait.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

- 🔐 **Authentication** — Secure signup, login & logout with JWT
- ❓ **Questions** — Ask, view, search, and delete questions
- 💬 **Answers** — Post and delete answers on questions
- 👍 **Voting** — Upvote and downvote questions
- 🔖 **Bookmarks** — Save and unsave questions
- 🏷️ **Tags** — Browse and filter questions by tags
- 👥 **Users** — View all users and their profiles
- 🤖 **AI Assist** — Get instant AI-powered programming help (powered by OpenRouter)
- 🏆 **Challenges** — Gamified coding challenges
- 🔍 **Search** — Full-text search across questions
- 👤 **Profile** — Update your name, bio and tags

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org) | React framework with SSR |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [shadcn/ui](https://ui.shadcn.com) | UI components |
| [Axios](https://axios-http.com) | HTTP client |
| [React Toastify](https://fkhadra.github.io/react-toastify) | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org) | Runtime |
| [Express.js](https://expressjs.com) | Web framework |
| [MongoDB](https://mongodb.com) | Database |
| [Mongoose](https://mongoosejs.com) | ODM |
| [JWT](https://jwt.io) | Authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |

### AI & Deployment
| Technology | Purpose |
|---|---|
| [OpenRouter](https://openrouter.ai) | AI model routing |
| [Vercel](https://vercel.com) | Frontend hosting |
| [Render](https://render.com) | Backend hosting |
| [MongoDB Atlas](https://cloud.mongodb.com) | Cloud database |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/MdRohit786/stackoverflow_rait.git
cd stackoverflow_rait
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
node index.js
```

### 3. Setup the Frontend

```bash
cd stack
npm install
```

Create a `.env.local` file in the `stack/` directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
OPENROUTER_API_KEY=your_openrouter_api_key
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the app

Visit `http://localhost:3000` in your browser 🎉

---

## 🔐 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Required |
|---|---|---|
| `PORT` | Server port | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |

### Frontend (`stack/.env.local`)

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL | ✅ |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI Assist | ✅ |

---

## 📡 API Reference

### Auth Routes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/user/signup` | ❌ | Register new user |
| `POST` | `/user/login` | ❌ | Login user |
| `GET` | `/user/getalluser` | ❌ | Get all users |
| `PATCH` | `/user/update/:id` | ✅ | Update user profile |
| `PATCH` | `/user/save/:id` | ✅ | Save/unsave question |

### Question Routes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/question/ask` | ✅ | Post a question |
| `GET` | `/question/getallquestion` | ❌ | Get all questions |
| `DELETE` | `/question/delete/:id` | ✅ | Delete a question |
| `PATCH` | `/question/vote/:id` | ✅ | Upvote/downvote question |

### Answer Routes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/answer/postanswer/:id` | ✅ | Post an answer |
| `DELETE` | `/answer/delete/:id` | ✅ | Delete an answer |

---

## 🚀 Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `stack`
4. Add environment variables
5. Deploy!

### Backend → Render

1. Create new **Web Service** on [render.com](https://render.com)
2. Set **Root Directory** to `server`
3. Set **Start Command** to `node index.js`
4. Add environment variables
5. Deploy!

---

## 🐛 Known Issues & Fixes Applied

| Bug | Fix Applied |
|---|---|
| `newuser` used before declaration in Signup | Reordered code — create user before signing token |
| JWT token expired after 1 hour | Extended to 7 days |
| Frontend calling wrong API URL | Added `NEXT_PUBLIC_BACKEND_URL` env variable |
| Dark mode on all pages | Removed `prefers-color-scheme: dark` media query |
| Answer count not updating | Replaced `noofanswer` with `answer.length` |
| Bookmark state lost on reload | Initialize `isBookmarked` from localStorage on mount |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Rohit** — [@MdRohit786](https://github.com/MdRohit786)

---

<p align="center">Made with ❤️ by Rohit</p>
