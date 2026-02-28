# Universo Platformo Next

**Full-stack Next.js 15 implementation of Universo Platformo / Universo MMOOMM**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org/)
[![PNPM](https://img.shields.io/badge/PNPM-8.x-orange)](https://pnpm.io/)

## Overview

Universo Platformo Next is a modular, full-stack platform built on Next.js 15 with TypeScript. It implements the architectural concepts from [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react) using Next.js App Router best practices and a strict PNPM monorepo structure.

The project provides a **guest start page**, an **authenticated dashboard**, and a complete **Supabase authentication flow** — all with the frontend communicating exclusively through the project's own backend API, never directly with Supabase.

## 🏗️ Architecture

### Security Principle: Backend-only Supabase Access

**The frontend never communicates with Supabase directly.** All authentication and data operations go through the project's own Next.js API routes (backend). Supabase tokens are stored in HttpOnly cookies managed by the server.

```
Browser (frontend)
    │  fetch /api/v1/auth/login   (credentials: same-origin)
    ▼
Next.js API Routes (backend)
    │  supabase.auth.signInWithPassword(...)
    ▼
Supabase (external service)
```

### Project Structure

```
universo-platformo-next/
├── apps/
│   └── web/                        # Next.js 15 application
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/v1/auth/    # Backend: login, logout, me, register
│       │   │   ├── auth/           # Auth page route
│       │   │   └── layout.tsx      # Root layout with providers
│       │   ├── lib/supabase/       # Server-only Supabase client
│       │   └── providers/          # App-level providers
│       └── middleware.ts           # Session refresh middleware
├── packages/
│   ├── auth-frt/base/              # Auth context, hooks, login/register form
│   └── start-frt/base/             # Start pages (guest + authenticated)
├── .env.example                    # Required environment variables
├── package.json                    # Monorepo root
├── pnpm-workspace.yaml
└── turbo.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20+
- **PNPM**: 8.x or higher
- **Supabase**: Project with email/password auth enabled

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

```bash
# Clone the repository
git clone https://github.com/teknokomo/universo-platformo-next.git
cd universo-platformo-next

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Technology Stack

- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Package Manager**: PNPM 8.x (workspaces)
- **Build System**: Turborepo
- **Database / Auth**: Supabase (server-side only via `@supabase/ssr`)
- **UI Framework**: Material UI v6 with Emotion
- **State Management**: React Context + hooks (no external library needed)
- **Styling**: MUI system + `sx` prop (no additional CSS files)

## 🔑 Auth Architecture

Authentication is implemented so that:

1. The **frontend** (`packages/auth-frt`) calls only `/api/v1/auth/*` routes — it has zero Supabase dependencies.
2. The **backend** API routes use `@supabase/ssr` server client to communicate with Supabase.
3. Session tokens are stored in **HttpOnly cookies** set by the backend, invisible to JavaScript.
4. The **middleware** (`apps/web/middleware.ts`) refreshes expired sessions automatically on every request.

### API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/v1/auth/login` | Sign in with email and password |
| POST | `/api/v1/auth/register` | Create a new account |
| POST | `/api/v1/auth/logout` | Sign out and clear session |
| GET | `/api/v1/auth/me` | Get current authenticated user |

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server (apps/web on port 3000)
pnpm build            # Build for production
pnpm type-check       # TypeScript type checking across all packages

# Workspace commands
pnpm --filter @universo/web dev     # Run dev in specific package
pnpm --filter @universo/web build   # Build specific package
```

## 🤝 Contributing

1. **Read the Constitution**: Review [constitution.md](.specify/memory/constitution.md)
2. **Create Issue**: Follow [github-issues.md](.github/instructions/github-issues.md)
3. **Create Branch**: Follow specification-first approach
4. **Implement in Packages**: All feature code must live in `packages/`
5. **Write Tests**: Maintain adequate test coverage
6. **Update Docs**: Both English (`README.md`) and Russian (`README-RU.md`)
7. **Create PR**: Follow [github-pr.md](.github/instructions/github-pr.md)

## 📋 Project Status

**Current Phase**: Phase 1 — Foundation & Authentication

- ✅ Monorepo structure (PNPM workspaces + Turborepo)
- ✅ Next.js 15 App Router application (`apps/web`)
- ✅ Guest start page with hero section and product cards
- ✅ Authenticated dashboard with sign-out
- ✅ Supabase auth via backend API routes (login, register, logout, me)
- ✅ Session management via HttpOnly cookies + middleware refresh
- 🚧 Additional feature packages (Kiberplano, Kompendio, etc.)

## 📄 License

Omsk Open License

## 🔗 Links

- [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react) — Reference implementation
- [Project Documentation](https://github.com/teknokomo/universo-platformo-next/wiki) — Detailed guides
- [Issue Tracker](https://github.com/teknokomo/universo-platformo-next/issues) — Report bugs or request features

---

**⚠️ Remember**: The frontend must NEVER call Supabase directly — always route through `/api/v1/`.
