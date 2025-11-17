# Implementation Plan: Initial Repository Setup and Next.js Foundation

**Branch**: `001-nextjs-foundation-setup` | **Date**: 2025-11-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-nextjs-foundation-setup/spec.md`

**Note**: This plan follows the Phase 0-1 workflow: Research → Design → Agent Context Update

## Summary

Establish the foundational infrastructure for Universo Platformo Next, a Next.js 14-based full-stack application using TypeScript, PNPM workspaces, and Turborepo build orchestration. The project follows a monorepo architecture with clear frontend/backend package separation (-frt/-srv pattern), bilingual documentation (EN/RU), and configuration for Supabase, MUI v6, and comprehensive development tooling. This phase focuses on repository structure, configuration, and development patterns that will serve as the foundation for all future features.

## Technical Context

**Language/Version**: TypeScript (strict mode) with Node.js 18.x or higher  
**Primary Dependencies**: Next.js 14.x (App Router), React 18.x, PNPM 8.x, Turborepo, tsdown  
**Storage**: Supabase (PostgreSQL) with database abstraction layer for future multi-DB support  
**Testing**: Vitest with React Testing Library  
**Target Platform**: Web (modern browsers), Server (Node.js runtime)  
**Project Type**: Full-stack web application (monorepo with frontend/backend packages)  
**Performance Goals**: Development server start <30s, production build <5min, page load <2s  
**Constraints**: TypeScript strict mode (no implicit any), bilingual docs (EN/RU synchronized), no legacy React patterns  
**Scale/Scope**: Foundation for multi-domain platform, starting with ~10 packages, targeting scalable architecture

### Key Technology Decisions

**Build System**: 
- PNPM workspaces for monorepo dependency management
- Turborepo for coordinated builds with caching
- tsdown for dual CJS+ESM output in shared packages
- NEEDS CLARIFICATION: Turborepo task configuration patterns for Next.js + shared packages

**UI Framework**:
- Material UI v6 with ColorScheme API for theming
- Emotion cache for Next.js App Router SSR compatibility  
- NEEDS CLARIFICATION: Best practices for MUI v6 + Next.js 14 App Router integration (Server vs Client Components)

**Authentication**:
- Supabase Auth Helpers for Next.js (not Passport.js - Express-centric)
- NEEDS CLARIFICATION: Next.js middleware patterns for auth with App Router

**Database Abstraction**:
- ORM selection pending (Prisma, Drizzle ORM, or TypeORM)
- NEEDS CLARIFICATION: ORM compatibility with Next.js Server Actions and App Router patterns

**Internationalization**:
- next-intl or i18next for runtime localization
- NEEDS CLARIFICATION: Best i18n library for Next.js App Router with bilingual docs strategy

**State Management**:
- Next.js native (Server/Client Components, Server Actions) as primary
- Zustand or Jotai for complex client state
- NEEDS CLARIFICATION: When to use client state management vs Server Components

**Development Tools**:
- Husky for git hooks
- ESLint + Prettier for code quality
- Docker for containerized development
- NEEDS CLARIFICATION: Docker Compose setup for Next.js + Supabase local development

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

#### I. Monorepo Architecture ✅ COMPLIANT
- **Requirement**: Project MUST be structured as PNPM monorepo with packages/ directory
- **Implementation**: pnpm-workspace.yaml will define workspace, packages/ directory created
- **Status**: Aligned with constitution

#### II. Package Separation Pattern ✅ COMPLIANT  
- **Requirement**: Frontend (-frt) and backend (-srv) packages separated, base/ directories required
- **Implementation**: Package naming convention documented, templates will follow pattern
- **Status**: Aligned with constitution, initial setup may not have domain packages yet

#### III. TypeScript-First Development ✅ COMPLIANT
- **Requirement**: All code in TypeScript strict mode, no implicit any
- **Implementation**: tsconfig.json with strict: true, ESLint rules enforcing type safety
- **Status**: Aligned with constitution

#### IV. Database Abstraction Layer ✅ COMPLIANT
- **Requirement**: Database access through abstraction layer, base/ directory isolation
- **Implementation**: Architecture documented for future implementation, Supabase as initial target
- **Status**: Design phase - full implementation in Phase 2

#### V. Bilingual Documentation ✅ COMPLIANT
- **Requirement**: All docs in EN (primary) and RU (exact translation with same structure)
- **Implementation**: README.md + README-RU.md, i18n-docs.md guidelines followed
- **Status**: Aligned with constitution

#### VI. Issue-Driven Development ✅ COMPLIANT
- **Requirement**: Issues before implementation, using templates and labels
- **Implementation**: GitHub instructions in .github/instructions/, labels configured
- **Status**: Aligned with constitution

#### VII. Specification-First Approach ✅ COMPLIANT
- **Requirement**: Complex features designed in specs/ before implementation
- **Implementation**: This specification in specs/001-nextjs-foundation-setup/
- **Status**: Aligned with constitution

### Technology Stack Compliance

#### Mandatory Technologies ✅ COMPLIANT
- Next.js 14.x App Router ✅
- TypeScript strict mode ✅
- PNPM 8.x workspaces ✅
- Turborepo ✅
- tsdown for dual build ✅
- Node.js 18.x+ ✅
- Supabase ✅
- Supabase Auth Helpers ✅
- MUI v6 ✅
- Vitest ✅
- Husky ✅
- Docker ✅

#### Prohibited Patterns ✅ COMPLIANT
- ❌ No docs/ directory (will use external repo) - COMPLIANT
- ❌ No AI agent config files (grandfathered existing ones OK) - COMPLIANT
- ❌ No legacy React patterns - COMPLIANT
- ❌ No database abstraction bypass - COMPLIANT (design only in Phase 1)
- ❌ No JavaScript/TypeScript mixing - COMPLIANT
- ❌ No Pages Router - COMPLIANT (using App Router)
- ❌ No committed secrets - COMPLIANT (.env.example only)

### Package Standards Compliance ✅ COMPLIANT
- Directory structure with base/, src/, dist/ ✅
- Dual build output (CJS + ESM + Types) with tsdown ✅
- README.md + README-RU.md for packages ✅
- Testing in src/__tests__/ ✅
- Naming: @universo/[domain]-frt, @universo/[domain]-srv ✅

### Development Workflow Compliance ✅ COMPLIANT
- Pre-implementation phase (Issue → Spec → Constitution Check → Review) ✅
- Implementation phase (Branch → Commits → Tests → Docs) ✅
- Review & Merge phase (PR → CI → Merge) ✅
- Quality gates defined ✅

### Violations or Exceptions

**No violations identified.** This feature represents the foundation setup that enables all constitutional requirements. All aspects are designed to comply with or establish the patterns required by the constitution.

**Re-evaluation Point**: After Phase 1 design (data-model.md, contracts/, quickstart.md completed), this section will be reviewed again to ensure design decisions remain compliant.

## Project Structure

### Documentation (this feature)

```text
specs/001-nextjs-foundation-setup/
├── spec.md              # Feature specification (already exists)
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0 output (to be created)
├── data-model.md        # Phase 1 output (to be created)
├── quickstart.md        # Phase 1 output (to be created)
├── contracts/           # Phase 1 output (to be created)
└── tasks.md             # Phase 2 output (future - not part of this plan command)
```

### Source Code (repository root)

This is a **monorepo web application** with distinct frontend/backend packages:

```text
/home/runner/work/universo-platformo-next/universo-platformo-next/
├── .github/
│   ├── instructions/        # Issue, PR, label, i18n guidelines (exists)
│   └── workflows/           # CI/CD pipelines (to be created)
├── .specify/
│   ├── memory/
│   │   └── constitution.md  # Project governance (exists)
│   ├── scripts/             # Workflow scripts (exists)
│   └── templates/           # Spec/plan templates (exists)
├── packages/
│   ├── types/               # @universo/types - shared type definitions
│   │   └── base/
│   │       ├── src/
│   │       ├── dist/        # tsdown build output (gitignored)
│   │       ├── package.json
│   │       ├── tsconfig.json
│   │       ├── README.md
│   │       └── README-RU.md
│   └── [future domain packages: clusters-frt, clusters-srv, etc.]
├── apps/                    # Next.js application(s)
│   └── web/                 # Main web application
│       ├── app/             # Next.js 14 App Router
│       │   ├── api/         # API routes
│       │   ├── layout.tsx   # Root layout
│       │   └── page.tsx     # Home page
│       ├── public/          # Static assets
│       ├── src/             # Application code
│       │   ├── components/  # React components
│       │   ├── lib/         # Utilities
│       │   └── styles/      # Global styles
│       ├── tests/           # Application tests
│       ├── next.config.js
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
├── docker/                  # Docker configurations
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── docker-compose.yml
├── .env.example             # Environment variable template
├── .gitignore
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── turbo.json               # Turborepo configuration
├── pnpm-workspace.yaml      # PNPM workspace definition
├── package.json             # Root package.json
├── tsconfig.json            # Root TypeScript config
├── vitest.config.ts         # Test configuration
├── SECURITY.md              # Security policy (to be created)
├── README.md                # English documentation (to be created)
└── README-RU.md             # Russian documentation (to be created)
```

**Structure Decision**: 

We use a monorepo structure combining:
1. **`apps/web/`**: Next.js 14 application using App Router for the main web interface
2. **`packages/`**: Shared packages following the constitution's separation pattern:
   - Infrastructure packages: `@universo/types`, `@universo/utils`, `@universo/i18n`, `@universo/api-client`
   - Domain packages (future): `@universo/[domain]-frt` and `@universo/[domain]-srv`
3. **`docker/`**: Containerization for development and production
4. **Root-level configs**: Workspace-wide tooling (Turborepo, PNPM, ESLint, TypeScript, etc.)

This structure enables:
- Clear separation between application code and reusable packages
- Independent versioning and publishing of packages
- Efficient builds with Turborepo caching
- Scalability as new domains are added in future phases

## Complexity Tracking

**No complexity violations identified.** This foundation setup aligns with all constitutional requirements and establishes patterns for future development. No justifications needed.
