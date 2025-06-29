# 🛠️ Meeting App - Full Stack Test Project

This is a full-stack test project for demonstrating authentication, RESTful APIs, wallet integration, and meeting CRUD functionality using **React**, **Node.js (Express)**, and **MongoDB**.

---

## 📦 Tech Stack

### 🔹 Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Access & Refresh Tokens)
- Ethers.js
- post-man collection

### 🔹 Frontend

- React (Vite)
- Tailwind CSS
- React Query
- React Hook Form
- Ethers.js

---

## 🧠 Features

- ✅ Wallet connection (sign & verify)
- ✅ Email & password login (after wallet verification)
- ✅ Auto-create default user on first app run
- ✅ JWT-based authentication (access & refresh)
- ✅ RESTful Meeting CRUD APIs
- ✅ Protected routes
- ✅ Clean project structure with separation of concerns

---

## 🚀 How to Run

### 🔧 Backend Setup

#### 1. Install dependencies

````bash
cd backend
yarn install
yarn start


---

## 🎯 Front-End (Branch: `front`)

This frontend is built in the `front` branch and developed using a modern React-based stack focused on performance, DX, and modular structure.

### 🧱 Stack

| Tool               | Purpose                            |
|--------------------|---------------------------------- |
| **React**          | Frontend framework                |
| **Vite**           | Fast dev server & build tool      |
| **ethers.js**      | Wallet connection & message signing (used under the hood) |
| **reown-appkit**   | Wallet connection,                |
| **React Query**    | API requests, caching & async logic |
| **React Hook Form**| Forms and validation control     |
| **Yup**            | Schema-based validation          |
| **Tailwind CSS**   | Utility-first styling            |

---

### 🪙 Wallet Integration

- Connect wallet via MetaMask using `ethers.js`
- Sign a message before enabling login
- Wallet address is required before login form is active

---

### 🧾 Forms

- Login form is built with `React Hook Form` + `Yup` validation
- Disabled until wallet is connected and signed

---

### 🔗 API Integration

All data fetching is handled with `React Query`:

- Fetch meetings list
- Create / update / delete meeting entries
- Authentication & protected routes

---

### 💻 UI

Built with `Tailwind CSS`:

- Fully responsive
- Clean and modern UI
- Utility-based styling

---

### 🏁 Running Front-End

```bash
cd frontend
yarn install
yarn  dev
````
