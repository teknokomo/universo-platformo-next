# universo-platformo-next Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-17

## Active Technologies
- Supabase (PostgreSQL) with database abstraction layer for future multi-DB support (001-nextjs-foundation-setup)

- TypeScript (strict mode) with Node.js 18.x or higher + Next.js 14.x (App Router), React 18.x, PNPM 8.x, Turborepo, tsdown (001-nextjs-foundation-setup)

## Project Structure

```text
.specify/              # Specifications and documentation (accessible to agents)
  ├── memory/         # Project constitution and principles
  ├── specs/          # Feature specifications (NNN-feature-name/)
  ├── templates/      # Documentation templates
  ├── scripts/        # Helper scripts
  └── docs/           # Analysis and summaries
packages/             # ALL feature code (modular architecture)
  ├── *-frt/          # Frontend packages
  └── *-srv/          # Backend packages
apps/                 # Next.js applications
.github/              # Workflows and agent instructions
```

## Commands

npm test && npm run lint

## Code Style

TypeScript (strict mode) with Node.js 18.x or higher: Follow standard conventions

## Recent Changes
- 001-nextjs-foundation-setup: Added TypeScript (strict mode) with Node.js 18.x or higher + Next.js 14.x (App Router), React 18.x, PNPM 8.x, Turborepo, tsdown

- 001-nextjs-foundation-setup: Added TypeScript (strict mode) with Node.js 18.x or higher + Next.js 14.x (App Router), React 18.x, PNPM 8.x, Turborepo, tsdown

## Agent Access to .specify/

Agents working on **tasks** and **analytics** have full access to the `.specify/` directory:

- **Read**: All documentation, specifications, and templates
- **Write**: specs/ and docs/ subdirectories for updates
- **Execute**: scripts/ for workflow automation

Key resources:
- Project constitution: `.specify/memory/constitution.md`
- Feature specs: `.specify/specs/NNN-feature-name/`
- Templates: `.specify/templates/`
- Helper scripts: `.specify/scripts/bash/`

For complete directory structure and usage, see [.specify/README.md](../.specify/README.md).

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
