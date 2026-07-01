<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=8b5cf6&height=200&section=header&text=VaultWork&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=ffffff" />
  
  <br />
  
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" /></a>
  
  <br />
  <br />

  **The Zero-Trust, Enterprise-Grade Collaboration Workspace.** <br/>
  *Featuring real-time task management, secure communications, and an interactive Community Hub.*

  <br />
</div>

---

## ✨ Features

VaultWork is built for modern teams that require bank-level security without sacrificing beautiful, real-time user experiences.

### 🏢 Enterprise Core
- 🛡️ **Zero-Trust RBAC**: Every action is verified against a strict permissions matrix.
- ⚡ **Real-Time Sync**: WebSockets keep Kanbans, dashboards, and chats instantly up to date.
- 📊 **Dynamic Workflows**: Tailor-made dashboards automatically generated based on user roles.

### 🌐 Community Hub (New!)
We recently launched the **Community Hub**, a standalone module seamlessly integrated into the VaultWork platform!
- 🗣️ **Threaded Discussions**: Explore niche communities, join discussions, and share knowledge.
- 💼 **Career Board**: Discover exclusive job postings, get referrals, and prepare for interviews.
- 📚 **Resource Library**: A centralized grid for sharing PDFs, tech docs, and video tutorials.
- 🤖 **AI Assistant**: A built-in LLM companion to help summarize threads and answer tech questions.
- 👤 **Dynamic Member Profiles**: Track your reputation points, showcase your top skills, and view your activity timeline.

---

## 🚀 Getting Started

This repository is structured as a [Turborepo](https://turborepo.org/) monorepo containing both the React frontend and the NestJS backend.

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/vaultwork.git
   cd vaultwork
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```
   *This single command uses Turbo to concurrently launch the React frontend on `localhost:5173` and the NestJS API on `localhost:3000`.*

---

## 🏗️ Architecture

This Turborepo includes the following packages/apps:

- `apps/web`: The main frontend application built with **React**, **Vite**, and **Tailwind CSS**.
- `apps/api`: The backend microservice built with **NestJS**, heavily utilizing WebSockets and Firebase Admin.
- `@repo/ui`: A shared React component library for design system consistency.
- `@repo/eslint-config`: Shared `eslint` configurations.
- `@repo/typescript-config`: Shared `tsconfig.json`s.

---

## 🔒 Firebase Configuration (Local Dev)
If you are developing locally without Firebase Service Account credentials, **do not worry!** 
Our backend services (like `JobsService`, `CommunitiesService`, etc.) are designed to gracefully catch missing credentials and fallback to **Mock Data Mode**. This means you can build, test, and design the UI without needing cloud access.

<br />

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=8B5CF6&center=true&vCenter=true&width=435&lines=Built+with+%E2%9D%A4%EF%B8%8F+by+the+VaultWork+Team;Secure.+Fast.+Beautiful." alt="Typing SVG" />
</div>
