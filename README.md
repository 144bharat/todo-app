# Todo App

A secure full-stack Todo application built with **TypeScript**.

## Tech Stack

**Frontend**
- Next.js
- TypeScript
- Axios
- React Toastify

**Backend**
- Node.js
- Express (TypeScript)
- Prisma ORM
- JSON Web Tokens (Access + Refresh)
- bcrypt

**Database**
- Microsoft SQL Server

---

## Features

- User registration & login
- JWT authentication (Access + Refresh tokens)
- HttpOnly refresh token cookies
- Password hashing with bcrypt
- Protected Todo CRUD
- Axios interceptor with automatic token refresh
- Centralized error handling with proper HTTP status codes
- Clean project structure

---
## Project Structure
todo-app/
├── backend/
│ ├── src/
│ └── prisma/
└── frontend/
├── app/
└── components/
