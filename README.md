# oclxn — by Syed Developers

> Advanced AI Chat Interface · Created by **Syed Haider Hussein**

Powered by **Groq (free)** + LLaMA 3.3 70B. No credit card needed.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

Get your **free** Groq API key at → https://console.groq.com/keys

---

## 📁 Project Structure

```
oclxn/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Main app shell
    ├── styles/
    │   └── globals.css       # CSS variables, Tailwind, animations
    ├── components/
    │   ├── ui/               # Headless UI primitives (Button, Input, etc.)
    │   ├── ApiKeyModal.jsx
    │   ├── LeftSidebar.jsx
    │   ├── RightSidebar.jsx
    │   ├── ChatMessage.jsx
    │   ├── AIResponse.jsx
    │   ├── ChatInput.jsx
    │   ├── WelcomeScreen.jsx
    │   ├── ThinkingIndicator.jsx
    │   ├── SidebarItem.jsx
    │   ├── HistoryItem.jsx
    │   └── Logo.jsx
    ├── hooks/
    │   └── useChat.js        # Streaming chat state + API logic
    ├── utils/
    │   ├── api.js            # Groq streaming API
    │   ├── cn.js             # Tailwind className helper
    │   └── storage.js        # Session storage helpers
    └── assets/
```

---

## 🌐 Deploy to Vercel

```bash
npm run build
# Then push to GitHub and connect repo to Vercel
# vercel.json is already configured for SPA routing
```

## 🌐 Deploy to GitHub Pages

```bash
npm run build
# Copy dist/ contents to your gh-pages branch
# Or use: npx gh-pages -d dist
```

---

## ⚡ Features

- 🤖 **Real AI** — Groq + LLaMA 3.3 70B (free, fast)
- ⚡ **Streaming** — word-by-word like ChatGPT
- 🌙 **Dark/Light mode** — persistent
- 📱 **Mobile responsive** — collapsible sidebar
- 🗂️ **Chat history** — pin, delete, search
- 📋 **Copy responses**
- 🔄 **Regenerate**
- 💬 **Markdown rendering** — code blocks, tables, lists
- 🛑 **Stop generation** anytime

---

Made with ❤️ by **Syed Haider Hussein** · Syed Developers
