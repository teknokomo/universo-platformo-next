# Quickstart Guide: Universo Platformo Next Foundation Setup

**Feature**: 001-nextjs-foundation-setup  
**Last Updated**: 2025-11-17  
**Audience**: Developers setting up the project for the first time

---

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **PNPM**: Version 8.x or higher (Install: `npm install -g pnpm`)
- **Git**: For version control
- **Code Editor**: VSCode recommended with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

**Check versions**:
```bash
node --version  # Should be >= 18.0.0
pnpm --version  # Should be >= 8.0.0
```

---

## Step 1: Clone Repository

```bash
git clone https://github.com/teknokomo/universo-platformo-next.git
cd universo-platformo-next
```

---

## Step 2: Install Dependencies

Install all workspace dependencies:

```bash
pnpm install
```

This will:
- Install root dependencies
- Install dependencies for all packages in `packages/`
- Install dependencies for all apps in `apps/`
- Link workspace packages together

**Expected time**: 2-5 minutes depending on internet connection

---

## Step 3: Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure required variables:

```env
# Required for development
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Optional: Turborepo remote caching
TURBO_TOKEN=
TURBO_TEAM=
```

**Getting Supabase credentials**:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → API
4. Copy Project URL and anon/public key

---

## Step 4: Build Packages

Build all shared packages in dependency order:

```bash
pnpm build
```

Turborepo will:
- Build `@universo/types` first
- Build packages that depend on `types`
- Cache build outputs for future runs

**Expected time**: 1-3 minutes for first build, <30s with cache

---

## Step 5: Start Development Server

Start the Next.js development server:

```bash
pnpm dev
```

The application will be available at:
- **Web**: http://localhost:3000
- **Turborepo UI** (if enabled): http://localhost:9090

**Expected startup time**: <30 seconds

---

## Step 6: Verify Installation

Open http://localhost:3000 in your browser. You should see the Universo Platformo welcome page.

Run verification commands:

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Run tests
pnpm test
```

All commands should complete successfully.

---

## Project Structure Overview

```
universo-platformo-next/
├── apps/
│   └── web/              # Main Next.js application
├── packages/
│   └── types/            # Shared TypeScript types
├── specs/                # Feature specifications
├── .github/
│   └── instructions/     # Development guidelines
├── .specify/
│   ├── memory/           # Project constitution
│   └── templates/        # Spec/plan templates
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # Workspace definition
└── package.json          # Root package.json
```

---

## Common Development Tasks

### Create New Package

```bash
# Frontend package
mkdir -p packages/my-feature-frt/base/src
cd packages/my-feature-frt/base

# Copy package.json template and customize
# Add to workspace in pnpm-workspace.yaml if needed (already covered by glob)
```

### Run Specific Package

```bash
# Run command in specific package
pnpm --filter @universo/types build
pnpm --filter web dev
```

### Add Dependency to Package

```bash
# Add to specific package
pnpm --filter @universo/types add lodash

# Add to workspace root
pnpm add -w turbo
```

### Clean Build Artifacts

```bash
# Clean all dist/ and .next/ directories
pnpm clean

# Or manually
find . -name "dist" -type d -exec rm -rf {} +
find . -name ".next" -type d -exec rm -rf {} +
```

---

## Bilingual Documentation

This project maintains documentation in English and Russian:

- **English** (primary): `README.md`, `docs/*.md`
- **Russian** (translation): `README-RU.md`, `docs/*-RU.md`

When updating documentation:
1. Update English version first
2. Translate to Russian maintaining identical structure
3. Ensure same number of sections and lines

See `.github/instructions/i18n-docs.md` for full guidelines.

---

## GitHub Workflow

### Creating Issues

Follow `.github/instructions/github-issues.md`:
- Use proper labels
- Include bilingual description (Russian in spoiler)
- Reference related issues/PRs

### Creating Pull Requests

Follow `.github/instructions/github-pr.md`:
- Reference issue number
- Include bilingual description
- Ensure all checks pass

### Using Labels

See `.github/instructions/github-labels.md` for complete list and usage.

---

## Docker Development (Optional)

For containerized development:

```bash
# Start Supabase locally
docker-compose -f docker/docker-compose.supabase.yml up -d

# Start Next.js in container (alternative to pnpm dev)
docker-compose -f docker/docker-compose.dev.yml up

# Or use host machine for Next.js (recommended for better hot reload)
pnpm dev
```

---

## Troubleshooting

### pnpm install fails

```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```

### Build fails with TypeScript errors

```bash
# Rebuild packages in order
pnpm clean
pnpm build
```

### Port 3000 already in use

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

### Supabase connection error

- Verify `.env.local` has correct credentials
- Check Supabase project is active
- Ensure URL includes `https://`

---

## Next Steps

After successful setup:

1. **Read Documentation**:
   - `README.md` - Project overview
   - `.specify/memory/constitution.md` - Development principles
   - `specs/001-nextjs-foundation-setup/spec.md` - Foundation specification

2. **Explore Codebase**:
   - Review `apps/web/` structure
   - Examine `packages/types/` for shared types
   - Study configuration files (tsconfig.json, turbo.json, etc.)

3. **Development Workflow**:
   - Create issue for your feature
   - Write specification in `specs/`
   - Follow constitution guidelines
   - Submit PR with bilingual description

---

## Getting Help

- **Documentation**: Check `.github/instructions/` for guidelines
- **Issues**: Search existing issues or create new one
- **Constitution**: Review `.specify/memory/constitution.md` for principles
- **Reference**: Study `teknokomo/universo-platformo-react` for concepts (not code)

---

## Quick Reference Commands

```bash
# Installation
pnpm install

# Development
pnpm dev              # Start dev server
pnpm build            # Build all packages
pnpm lint             # Lint all code
pnpm test             # Run all tests
pnpm type-check       # Check types

# Workspace
pnpm --filter <pkg> <cmd>  # Run command in specific package
pnpm -r <cmd>              # Run command in all packages

# Cleanup
pnpm clean            # Remove build artifacts
```

---

**Note**: This quickstart focuses on Phase 1 (Foundation Setup). As new features are added in Phase 2+ (Core Infrastructure, Domains), this guide will be updated with additional steps for database setup, authentication configuration, and domain-specific workflows.
