# Universo Platformo Next

**Full-stack Next.js implementation of Universo Platformo / Universo MMOOMM**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black)](https://nextjs.org/)
[![PNPM](https://img.shields.io/badge/PNPM-8.x-orange)](https://pnpm.io/)

## Overview

Universo Platformo Next is a modular, full-stack platform built on Next.js 14 with TypeScript. This project implements the architectural concepts from [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react) using Next.js best practices and a strict monorepo structure.

## 🏗️ Architecture

### Mandatory Modular Structure

**⚠️ CRITICAL: ALL functionality MUST be implemented in the `packages/` directory.**

This project follows a **strict modular architecture** where:
- ✅ **ALL feature code** resides in `packages/` directory
- ✅ **Frontend and backend are separated** into distinct packages (`-frt` / `-srv`)
- ✅ **Each package has a `base/` directory** for core implementation
- ❌ **NO feature code** is allowed in root directories (only configuration)

```
universo-platformo-next/
├── packages/               # ALL FUNCTIONALITY HERE
│   ├── [domain]-frt/      # Frontend packages
│   │   └── base/
│   ├── [domain]-srv/      # Backend packages
│   │   └── base/
│   └── universo-*/        # Shared infrastructure
│       └── base/
├── apps/                   # Next.js applications
│   └── web/
├── .github/                # GitHub workflows and instructions
├── specs/                  # Feature specifications
└── [config files]          # Root: configuration only
```

### Why This Structure?

1. **Future Repository Separation**: Packages can be extracted into independent repositories
2. **Clear Separation of Concerns**: Frontend, backend, and shared code are distinct
3. **Independent Scaling**: Packages can be deployed and scaled independently
4. **Multiple Implementations**: The `base/` directory allows future alternative implementations

### Reference Implementation

This project takes architectural inspiration from [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react), particularly:
- Monorepo structure with PNPM workspaces
- Package separation pattern (`-frt` / `-srv`)
- Base directory pattern for multiple implementations
- Bilingual documentation (English/Russian)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **PNPM**: 8.x or higher
- **Git**: Latest version

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

## 📦 Technology Stack

- **Framework**: Next.js 14.x (App Router)
- **Language**: TypeScript (strict mode)
- **Package Manager**: PNPM 8.x (workspaces)
- **Build System**: Turborepo
- **Database**: Supabase (PostgreSQL)
- **UI Framework**: Material UI v6
- **Authentication**: Supabase Auth Helpers
- **Testing**: Vitest + React Testing Library
- **State Management**: Zustand / Jotai (client-side)
- **i18n**: next-intl

## 📚 Documentation

- **English**: Primary documentation language
- **Russian**: Complete translation with identical structure ([README-RU.md](README-RU.md))

See detailed documentation in:
- [Project Constitution](.specify/memory/constitution.md) - Core principles and standards
- [Feature Specifications](specs/) - Detailed feature designs
- [GitHub Instructions](.github/instructions/) - Issue, PR, and label guidelines

## 🔒 Modular Architecture Rules

### Creating New Features

When implementing a new feature:

1. **Create packages in `packages/` directory**:
   ```bash
   packages/
   ├── my-feature-frt/    # If frontend is needed
   │   └── base/
   └── my-feature-srv/    # If backend is needed
       └── base/
   ```

2. **Each package MUST include**:
   - `base/` directory with all source code
   - `package.json` with proper naming (`@universo/my-feature-frt`)
   - `README.md` (English)
   - `README-RU.md` (Russian - exact translation)

3. **Never place feature code in**:
   - Root directory
   - `apps/` directory (only Next.js application entry points)
   - Any location outside `packages/`

### Code Review Checklist

Before merging any PR, verify:
- [ ] All feature code is in `packages/` directory
- [ ] Frontend/backend separated into `-frt`/`-srv` packages (if both needed)
- [ ] Each package has `base/` directory
- [ ] No business logic in root-level directories
- [ ] Package names follow conventions
- [ ] Bilingual documentation included

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build all packages
pnpm test             # Run tests
pnpm lint             # Lint code
pnpm format           # Format code with Prettier
pnpm type-check       # TypeScript type checking

# Workspace commands
pnpm -r build         # Build all workspace packages
pnpm --filter <pkg>   # Run commands in specific package
```

### Creating New Package

```bash
# Create package structure
mkdir -p packages/my-feature-frt/base/src
cd packages/my-feature-frt/base

# Initialize package
pnpm init

# Follow template structure from packages/TEMPLATE-README.md
```

## 🤝 Contributing

1. **Read the Constitution**: Review [constitution.md](.specify/memory/constitution.md)
2. **Create Issue**: Follow [github-issues.md](.github/instructions/github-issues.md)
3. **Create Branch**: Follow specification-first approach
4. **Implement in Packages**: All code in `packages/` directory
5. **Write Tests**: Maintain >70% coverage
6. **Update Docs**: Both English and Russian
7. **Create PR**: Follow [github-pr.md](.github/instructions/github-pr.md)

## 📋 Project Status

**Current Phase**: Phase 1 - Foundation Setup
- ✅ Repository structure established
- ✅ Constitution and standards defined
- ✅ Modular architecture mandated
- 🚧 Next.js configuration in progress
- 🚧 Core infrastructure packages pending

See [Feature Roadmap](.specify/memory/constitution.md#feature-development-roadmap) for details.

## 📄 License

[MIT License](LICENSE)

## 🔗 Links

- [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react) - Reference implementation
- [Project Documentation](https://github.com/teknokomo/universo-platformo-next/wiki) - Detailed guides
- [Issue Tracker](https://github.com/teknokomo/universo-platformo-next/issues) - Report bugs or request features

---

**⚠️ Remember**: ALL functionality MUST be in `packages/` directory. No exceptions.
