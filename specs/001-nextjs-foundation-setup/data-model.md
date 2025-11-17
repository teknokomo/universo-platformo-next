# Data Model: Next.js Foundation Setup

**Feature**: 001-nextjs-foundation-setup  
**Date**: 2025-11-17  
**Status**: Draft

## Overview

This data model defines the foundational entities and structures for the Universo Platformo Next infrastructure. Since this is Phase 1 (Foundation), the focus is on infrastructure configuration, development tooling, and project structure rather than domain entities. Domain-specific entities (Users, Workspaces, Clusters, etc.) will be defined in subsequent phases.

---

## Infrastructure Entities

### 1. Package Entity

**Description**: Represents a package in the monorepo workspace

**Fields**:
- `name`: string (required) - Package name following @universo/[name] convention
- `version`: string (required) - Semantic version (e.g., "0.1.0")
- `type`: enum (required) - "frontend" | "backend" | "shared" | "app"
- `path`: string (required) - Relative path from repo root (e.g., "packages/types")
- `dependencies`: string[] - List of dependency package names
- `hasBase`: boolean (required) - Whether package has base/ directory structure
- `buildOutput`: string - Path to build artifacts (e.g., "dist/", ".next/")

**Validation Rules**:
- `name` must match pattern: `@universo/[domain](-frt|-srv)?` or valid npm package name
- `version` must be valid semver
- `path` must exist in workspace
- `type: "frontend"` should typically have `-frt` suffix in name
- `type: "backend"` should typically have `-srv` suffix in name
- `type: "shared"` should not have suffix
- `hasBase` must be true for all packages per constitution

**State Transitions**: N/A (configuration entity, not stateful)

**Relationships**:
- A Package can depend on multiple other Packages (dependencies)
- A Package belongs to one Workspace

---

### 2. Workspace Configuration

**Description**: Root-level monorepo configuration

**Fields**:
- `packages`: string[] (required) - Glob patterns for workspace packages
- `packageManager`: string (required) - "pnpm" (fixed per constitution)
- `packageManagerVersion`: string (required) - e.g., "8.x"
- `nodeVersion`: string (required) - e.g., "18.x"

**Validation Rules**:
- `packageManager` must be "pnpm"
- `packageManagerVersion` must be >= "8.0.0"
- `nodeVersion` must be >= "18.0.0"
- `packages` must include at least ["packages/*"]

**File Representation**: `pnpm-workspace.yaml`

---

### 3. TypeScript Configuration

**Description**: TypeScript compiler configuration for workspace

**Fields**:
- `strict`: boolean (required) - Must be true per constitution
- `target`: string (required) - ECMAScript target (e.g., "ES2022")
- `module`: string (required) - Module system (e.g., "ESNext")
- `moduleResolution`: string (required) - "bundler" for Next.js 14
- `lib`: string[] (required) - Standard libraries (e.g., ["ES2023", "DOM"])
- `jsx`: string (required) - "preserve" for Next.js
- `paths`: object - Path mapping for imports
- `incremental`: boolean - Enable incremental compilation

**Validation Rules**:
- `strict` must be true (non-negotiable per constitution)
- `target` must be ES2020 or higher
- `jsx` must be "preserve" or "react-jsx" for React
- If Next.js app exists, must include "DOM" in lib

**File Representation**: `tsconfig.json` (root and per-package)

---

### 4. Turborepo Pipeline Configuration

**Description**: Build orchestration configuration

**Fields**:
- `pipeline`: object (required) - Task definitions
  - `build`: TaskConfig
  - `dev`: TaskConfig
  - `lint`: TaskConfig
  - `test`: TaskConfig
  - `type-check`: TaskConfig
- `globalDependencies`: string[] - Files that invalidate all caches

**TaskConfig Fields**:
- `dependsOn`: string[] - Dependencies for this task (e.g., ["^build"])
- `outputs`: string[] - Output directories for caching
- `cache`: boolean - Whether to cache task results
- `persistent`: boolean - Whether task is long-running

**Validation Rules**:
- `pipeline` must include at minimum: build, dev, lint, test, type-check
- `build` task must have `dependsOn: ["^build"]` for proper ordering
- `dev` task should have `cache: false` and `persistent: true`
- Output paths must be gitignored

**File Representation**: `turbo.json`

---

### 5. Environment Configuration

**Description**: Environment variables and configuration

**Fields**:
- `variables`: EnvironmentVariable[] (required) - List of environment variables

**EnvironmentVariable Fields**:
- `key`: string (required) - Variable name (e.g., "NEXT_PUBLIC_SUPABASE_URL")
- `description`: string (required) - Purpose and usage
- `required`: boolean (required) - Whether variable is mandatory
- `default`: string | undefined - Default value if optional
- `example`: string (required) - Example value
- `isPublic`: boolean - Whether exposed to client (NEXT_PUBLIC_ prefix)
- `category`: enum - "database" | "auth" | "api" | "app" | "build"

**Validation Rules**:
- `key` must be uppercase with underscores
- Public variables must have `NEXT_PUBLIC_` prefix
- `required: true` variables must not have default values (must be explicitly set)
- `example` must not contain actual secrets

**File Representation**: `.env.example`, `.env.local` (gitignored)

**Example Variables**:
```
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Build
TURBO_TOKEN=
TURBO_TEAM=
```

---

### 6. Documentation Structure

**Description**: Bilingual documentation entities

**Fields**:
- `fileName`: string (required) - Base filename without language suffix
- `languages`: Language[] (required) - Always ["en", "ru"]
- `category`: enum (required) - "root" | "package" | "spec" | "instruction"

**Language Fields**:
- `code`: string (required) - ISO 639-1 code ("en" or "ru")
- `filePath`: string (required) - Actual file path
- `isPrimary`: boolean (required) - true for English
- `lineCount`: number - Number of lines in file (for sync validation)

**Validation Rules**:
- English version (en) must exist before Russian (ru)
- Russian file must have identical structure (same section count)
- File patterns:
  - Root docs: `README.md` / `README-RU.md`
  - Package docs: `packages/[name]/README.md` / `packages/[name]/README-RU.md`
  - Specs: `specs/[feature]/[name].md` (single language in these)
  - Instructions: `.github/instructions/[name].md` (single language with bilingual content)

**State Transitions**:
1. Create English version → Status: "Draft (EN only)"
2. Create Russian version → Status: "Complete (EN+RU)"
3. Update English → Status: "Out of Sync"
4. Update Russian → Status: "Complete (EN+RU)"

---

### 7. GitHub Configuration

**Description**: Repository settings and workflow configurations

**Fields**:
- `labels`: Label[] (required) - Issue/PR labels
- `instructions`: Instruction[] (required) - Workflow documentation

**Label Fields**:
- `name`: string (required) - Label name
- `color`: string (required) - Hex color code
- `description`: string (required) - Label purpose

**Instruction Fields**:
- `fileName`: string (required) - Instruction file name
- `purpose`: string (required) - What this instruction covers

**Validation Rules**:
- Must include standard labels: "feature", "bug", "documentation", "enhancement"
- Must include instructions: github-issues.md, github-labels.md, github-pr.md, i18n-docs.md
- Labels must have unique names
- Color codes must be valid hex (6 characters)

**File Representation**: 
- `.github/instructions/*.md`
- GitHub repository settings (configured via UI or API)

---

## Entity Relationships

```
Workspace Configuration
  └── contains multiple Packages
        ├── has TypeScript Configuration
        ├── referenced in Turborepo Pipeline
        └── has Documentation Structure (bilingual)

Environment Configuration
  └── used by all Packages and Apps

GitHub Configuration
  └── governs entire Repository
```

---

## Naming Conventions

### Package Names
- **Shared packages**: `@universo/[name]` (e.g., `@universo/types`, `@universo/utils`)
- **Frontend packages**: `@universo/[domain]-frt` (e.g., `@universo/clusters-frt`)
- **Backend packages**: `@universo/[domain]-srv` (e.g., `@universo/clusters-srv`)
- **App packages**: `web`, `admin`, etc. (no @ scope)

### File Names
- **TypeScript configs**: `tsconfig.json`, `tsconfig.base.json`
- **Environment files**: `.env.example`, `.env.local`, `.env.production`
- **Documentation**: `README.md`, `README-RU.md`
- **Build configs**: `turbo.json`, `next.config.js`, `vitest.config.ts`

### Directory Names
- **Packages**: lowercase with hyphens (e.g., `packages/api-client`)
- **Apps**: lowercase (e.g., `apps/web`)
- **Source**: `src/`, `base/src/`
- **Build output**: `dist/`, `.next/`
- **Tests**: `src/__tests__/` or `tests/`

---

## Infrastructure vs Domain Entities

**This Phase (Foundation)**:
- ✅ Package structure and configuration
- ✅ Build and development tooling setup
- ✅ Documentation framework
- ✅ GitHub workflow configurations

**Future Phases** (Domain Entities):
- ❌ User entity - Phase 2 (Core Infrastructure)
- ❌ Workspace (Unik) entity - Phase 3
- ❌ Cluster/Domain/Resource entities - Phase 3
- ❌ Metaverse entities - Phase 4
- ❌ Space/Canvas entities - Phase 4

---

## Validation and Constraints

### Cross-Entity Validation
- All packages referenced in Turborepo pipeline must exist in workspace
- All packages in workspace must have corresponding TypeScript configuration
- All packages must have bilingual documentation (README.md + README-RU.md)
- Environment variables used in code must be defined in .env.example
- GitHub instruction files must exist as referenced in constitution

### Constitution Compliance
- TypeScript strict mode: enforced by `tsconfig.json`
- PNPM workspaces: enforced by `pnpm-workspace.yaml`
- Bilingual docs: validated by Documentation Structure entity
- Package separation: validated by Package Entity type field
- Base directory: validated by Package Entity hasBase field

---

## Migration and Versioning

Since this is Phase 1 (initial setup), no migrations are needed. Future phases will:
1. Add domain entity definitions (Phase 2+)
2. Define database schemas with Prisma migrations (Phase 2)
3. Create entity relationships for domain objects (Phase 3+)

**Current State**: Infrastructure configuration only, no database schema yet.

---

## Notes

- This data model focuses on project structure and configuration rather than application domain
- Actual database entities will be defined starting in Phase 2 (Core Infrastructure)
- All entities here represent files, configurations, and development artifacts
- No ORM or database is used for these infrastructure entities - they are filesystem-based
