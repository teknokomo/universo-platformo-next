# Tasks: Initial Repository Setup and Next.js Foundation

**Input**: Design documents from `/specs/001-nextjs-foundation-setup/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are NOT explicitly requested in the feature specification. This implementation follows a configuration-first approach with validation through build/lint/type-check commands rather than unit tests for configuration files.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Scope**: This is **Phase 1: Foundation Setup** from the constitution roadmap. This phase establishes the repository structure and tooling that enables all future phases (Auth, Uniks, Metaverses, Spaces/Canvases, UPDL nodes, Templates).

## Roadmap Context

**Phase 1 (This Document)**: Foundation - Repository setup, Next.js configuration, monorepo structure
**Phase 2 (Future)**: Core Infrastructure - Auth, Profile, Database abstraction, shared packages (@universo/types, @universo/utils, etc.)
**Phase 3 (Future)**: Uniks (Workspaces) + Clusters - First domain entities with modular -frt/-srv packages
**Phase 4 (Future)**: Metaverses, Spaces, Analytics - Additional domains following established patterns
**Phase 5 (Future)**: UPDL nodes, LangChain integration, Space Builder - Visual programming system
**Phase 6 (Future)**: Templates + Publication - Multi-platform export system

**Reference Architecture**: This implementation draws on architectural patterns from [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react) but adapts them for Next.js App Router with optimized package structure. Unlike the React version which contains monolithic Flowise packages, this implementation plans modular -frt/-srv package separation from the beginning.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This project uses a monorepo structure:
- **Apps**: `apps/web/` - Next.js application
- **Packages**: `packages/[name]/base/` - Workspace packages with base/ directory
- **Configs**: Root-level configuration files
- **Docs**: Root-level bilingual documentation

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize repository structure and basic files

- [ ] T001 Create root package.json with workspace configuration and scripts
- [ ] T002 Create pnpm-workspace.yaml defining workspace packages
- [ ] T003 Create .gitignore file configured for Node.js, Next.js, and development artifacts
- [ ] T004 Create turbo.json with pipeline configuration for build, dev, lint, test, type-check tasks
- [ ] T005 [P] Create root tsconfig.json with strict mode and base configuration
- [ ] T006 [P] Create .eslintrc.json with Next.js and TypeScript rules
- [ ] T007 [P] Create .prettierrc with code formatting configuration
- [ ] T008 [P] Create .env.example with documented Supabase and application variables

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Create packages/ directory structure
- [ ] T010 Create apps/ directory structure
- [ ] T011 Create docker/ directory structure
- [ ] T012 Create .github/workflows/ directory for CI/CD (structure only, workflows in later phases)
- [ ] T013 Create .specify directory structure (already exists, verify completeness)
- [ ] T014 Create packages/types/base/package.json for shared TypeScript types
- [ ] T015 Create packages/types/base/tsconfig.json extending root configuration
- [ ] T016 Create packages/types/base/src/ directory structure
- [ ] T017 Create packages/types/base/README.md documenting shared types package
- [ ] T018 Create packages/types/base/README-RU.md as exact translation of English version

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Developer Initializes Project (Priority: P1) 🎯 MVP

**Goal**: Enable developers to clone, install, and run the project with comprehensive bilingual documentation

**Independent Test**: Clone repository, run `pnpm install`, run `pnpm dev`, verify development server starts without errors. Read README files to understand project structure.

### Implementation for User Story 1

- [ ] T019 [US1] Create README.md with project overview, architecture, tech stack, and getting started guide
- [ ] T020 [US1] Create README-RU.md as exact translation of README.md with identical structure
- [ ] T021 [US1] Create SECURITY.md with security policy and vulnerability reporting instructions
- [ ] T022 [US1] Add installation scripts to root package.json (install, postinstall)
- [ ] T023 [US1] Add development scripts to root package.json (dev, build, clean)
- [ ] T024 [US1] Document Node.js version requirement in package.json engines field
- [ ] T025 [US1] Document pnpm version requirement in package.json packageManager field

**Checkpoint**: At this point, User Story 1 should be fully functional - developers can clone, read docs, and understand project structure

---

## Phase 4: User Story 2 - Configure Monorepo Structure (Priority: P1)

**Goal**: Establish PNPM workspace monorepo with clear package separation supporting -frt/-srv pattern

**Independent Test**: Verify pnpm-workspace.yaml exists, packages/ directory created, run `pnpm install` to confirm workspace packages are linked, run `pnpm -r list` to see all workspace packages.

### Implementation for User Story 2

- [ ] T026 [US2] Verify pnpm-workspace.yaml includes packages/* glob pattern (created in T002)
- [ ] T027 [US2] Verify packages/ directory exists with base/ subdirectory convention (created in T009)
- [ ] T028 [US2] Add workspace commands to root package.json scripts (filter, recursive)
- [ ] T029 [US2] Document package naming convention in README.md (-frt/-srv pattern, base/ requirement, future package roadmap: @universo/types, @universo/utils, @universo/i18n, @universo/api-client, uniks-frt/srv, clusters-frt/srv, metaverses-frt/srv, spaces-frt/srv, etc.)
- [ ] T030 [US2] Document workspace commands in README.md (pnpm --filter, pnpm -r)
- [ ] T031 [US2] Create packages/types/base/src/index.ts with example shared type definitions
- [ ] T032 [US2] Verify packages/types can build successfully with `pnpm --filter @universo/types build`

**Checkpoint**: At this point, User Story 2 should be fully functional - monorepo workspace is configured and operational

---

## Phase 5: User Story 3 - Establish Development Tooling (Priority: P2)

**Goal**: Configure TypeScript, ESLint, Prettier for code quality and consistency

**Independent Test**: Run `pnpm lint`, `pnpm format`, `pnpm type-check` commands successfully without errors on the configured codebase.

### Implementation for User Story 3

- [ ] T033 [P] [US3] Configure TypeScript strict mode rules in root tsconfig.json (verify T005 settings)
- [ ] T034 [P] [US3] Configure ESLint rules for Next.js in .eslintrc.json (verify T006 settings)
- [ ] T035 [P] [US3] Configure Prettier formatting rules in .prettierrc (verify T007 settings)
- [ ] T036 [US3] Add lint script to root package.json using ESLint
- [ ] T037 [US3] Add format script to root package.json using Prettier
- [ ] T038 [US3] Add type-check script to root package.json using TypeScript compiler
- [ ] T039 [P] [US3] Create .vscode/settings.json with editor configuration for ESLint and Prettier
- [ ] T040 [P] [US3] Create .vscode/extensions.json recommending ESLint, Prettier, TypeScript extensions
- [ ] T041 [US3] Document development tooling setup in README.md
- [ ] T042 [US3] Add corresponding tooling documentation to README-RU.md

**Checkpoint**: At this point, User Story 3 should be fully functional - all code quality tools are configured and runnable

---

## Phase 6: User Story 4 - Configure GitHub Repository Settings (Priority: P2)

**Goal**: Setup GitHub labels and provide guidelines for issues and PRs with bilingual support

**Independent Test**: Verify .github/instructions/ files exist, labels are documented, create test issue following guidelines to confirm bilingual formatting works.

### Implementation for User Story 4

- [ ] T043 [P] [US4] Verify .github/instructions/github-issues.md exists and is complete (should already exist)
- [ ] T044 [P] [US4] Verify .github/instructions/github-labels.md exists and is complete (should already exist)
- [ ] T045 [P] [US4] Verify .github/instructions/github-pr.md exists and is complete (should already exist)
- [ ] T046 [P] [US4] Verify .github/instructions/i18n-docs.md exists and is complete (should already exist)
- [ ] T047 [US4] Document GitHub workflow in README.md (creating issues, PRs, using labels)
- [ ] T048 [US4] Add corresponding GitHub workflow documentation to README-RU.md
- [ ] T049 [P] [US4] Create CONTRIBUTING.md with contribution guidelines in English
- [ ] T050 [P] [US4] Create CONTRIBUTING-RU.md as exact translation of CONTRIBUTING.md

**Checkpoint**: At this point, User Story 4 should be fully functional - GitHub collaboration patterns are documented and ready to use

---

## Phase 7: User Story 5 - Configure Next.js Development Patterns (Priority: P2)

**Goal**: Setup Next.js 14 App Router with clear Server/Client Component patterns

**Independent Test**: Create apps/web/ directory, run `pnpm --filter web dev`, verify Next.js starts, create sample Server and Client Components to verify patterns work correctly.

### Implementation for User Story 5

- [ ] T051 [US5] Create apps/web/package.json with Next.js, React, and TypeScript dependencies
- [ ] T052 [US5] Create apps/web/tsconfig.json extending root TypeScript configuration
- [ ] T053 [US5] Create apps/web/next.config.js with App Router configuration
- [ ] T054 [US5] Create apps/web/app/layout.tsx as root layout with metadata
- [ ] T055 [US5] Create apps/web/app/page.tsx as home page with Server Component pattern
- [ ] T056 [P] [US5] Create apps/web/app/globals.css with base styles
- [ ] T057 [P] [US5] Create apps/web/public/ directory for static assets
- [ ] T058 [P] [US5] Create apps/web/public/favicon.ico placeholder
- [ ] T059 [US5] Create apps/web/src/components/ directory structure
- [ ] T060 [P] [US5] Create apps/web/src/components/ClientExample.tsx demonstrating Client Component with "use client"
- [ ] T061 [P] [US5] Create apps/web/src/lib/ directory for utilities
- [ ] T062 [US5] Create apps/web/README.md documenting Next.js app structure and patterns
- [ ] T063 [US5] Create apps/web/README-RU.md as exact translation
- [ ] T064 [US5] Add Next.js patterns documentation to root README.md (Server vs Client Components)
- [ ] T065 [US5] Add corresponding Next.js patterns documentation to README-RU.md
- [ ] T066 [US5] Update turbo.json pipeline to include apps/web dev and build tasks
- [ ] T067 [US5] Verify `pnpm dev` starts Next.js development server successfully

**Checkpoint**: At this point, User Story 5 should be fully functional - Next.js is configured and running with clear component patterns

---

## Phase 8: User Story 6 - Prepare for Database Integration (Priority: P3)

**Goal**: Configure Supabase environment variables and document database setup process

**Independent Test**: Verify .env.example contains all Supabase variables with documentation, README explains Supabase setup, environment variables are typed in TypeScript.

### Implementation for User Story 6

- [ ] T068 [US6] Verify .env.example includes NEXT_PUBLIC_SUPABASE_URL with documentation (created in T008)
- [ ] T069 [US6] Verify .env.example includes NEXT_PUBLIC_SUPABASE_ANON_KEY with documentation (created in T008)
- [ ] T070 [US6] Verify .env.example includes SUPABASE_SERVICE_ROLE_KEY with documentation (created in T008)
- [ ] T071 [US6] Create apps/web/src/lib/env.ts for typed environment variable validation
- [ ] T072 [US6] Document Supabase setup process in README.md (creating project, getting credentials)
- [ ] T073 [US6] Add corresponding Supabase setup documentation to README-RU.md
- [ ] T074 [P] [US6] Create docs/ section in README.md for database abstraction layer design
- [ ] T075 [P] [US6] Add corresponding database abstraction documentation to README-RU.md
- [ ] T076 [US6] Add database setup section to quickstart.md (already exists, verify completeness)

**Checkpoint**: At this point, User Story 6 should be fully functional - Supabase configuration is documented and environment variables are ready

---

## Phase 9: User Story 7 - Prepare Authentication Infrastructure (Priority: P3)

**Goal**: Configure Supabase Auth with documentation for middleware patterns

**Independent Test**: Verify Supabase Auth configuration files exist, environment variables for auth are documented, middleware pattern is documented in README.

### Implementation for User Story 7

- [ ] T077 [US7] Create apps/web/src/utils/supabase/ directory structure
- [ ] T078 [P] [US7] Create apps/web/src/utils/supabase/client.ts with browser client pattern from research.md
- [ ] T079 [P] [US7] Create apps/web/src/utils/supabase/server.ts with server client pattern from research.md
- [ ] T080 [US7] Create apps/web/middleware.ts with authentication middleware pattern from research.md
- [ ] T081 [US7] Add @supabase/supabase-js and @supabase/ssr to apps/web/package.json
- [ ] T082 [US7] Document authentication setup in README.md (@supabase/ssr, browser/server clients, middleware pattern)
- [ ] T083 [US7] Add corresponding authentication documentation to README-RU.md
- [ ] T084 [P] [US7] Document protected route patterns in README.md
- [ ] T085 [P] [US7] Add corresponding protected route documentation to README-RU.md
- [ ] T086 [US7] Verify auth configuration with type checking `pnpm type-check`

**Checkpoint**: At this point, User Story 7 should be fully functional - Authentication infrastructure is configured with clear patterns

---

## Phase 10: User Story 8 - Configure UI Framework Foundation (Priority: P3)

**Goal**: Setup Material UI v6 with Next.js App Router integration and theming

**Independent Test**: Verify MUI dependencies are installed, theme configuration exists, root layout includes MUI providers, sample MUI component renders correctly.

### Implementation for User Story 8

- [ ] T087 [US8] Add @mui/material, @mui/material-nextjs, @emotion/react, @emotion/styled to apps/web/package.json
- [ ] T088 [US8] Create apps/web/src/theme/index.ts with MUI theme configuration (colors, typography)
- [ ] T089 [US8] Update apps/web/app/layout.tsx to include AppRouterCacheProvider and ThemeProvider from research.md
- [ ] T090 [US8] Add Next.js font optimization to apps/web/app/layout.tsx (Roboto from Google Fonts)
- [ ] T091 [P] [US8] Create apps/web/src/components/MUIExample.tsx demonstrating MUI Client Component
- [ ] T092 [US8] Document MUI setup in README.md (integration with App Router, Server vs Client Components)
- [ ] T093 [US8] Add corresponding MUI documentation to README-RU.md
- [ ] T094 [P] [US8] Document theming patterns in README.md (customizing theme, using theme in components)
- [ ] T095 [P] [US8] Add corresponding theming documentation to README-RU.md
- [ ] T096 [US8] Verify MUI renders correctly with `pnpm dev` and visual inspection

**Checkpoint**: At this point, User Story 8 should be fully functional - MUI is configured and ready for component development

---

## Phase 11: User Story 9 - Establish Testing Infrastructure (Priority: P3)

**Goal**: Configure Vitest testing framework with examples for Next.js patterns

**Independent Test**: Run `pnpm test` successfully, verify test configuration exists, examine example tests for Server Components, Client Components, and API routes.

### Implementation for User Story 9

- [ ] T097 [US9] Create vitest.config.ts at root with Vitest configuration
- [ ] T098 [US9] Add vitest and @testing-library/react to root package.json devDependencies
- [ ] T099 [US9] Create apps/web/src/__tests__/ directory structure
- [ ] T100 [P] [US9] Create apps/web/src/__tests__/example.test.ts with basic Vitest example
- [ ] T101 [P] [US9] Create apps/web/src/__tests__/components/ClientExample.test.tsx testing Client Component
- [ ] T102 [US9] Add test script to root package.json running Vitest
- [ ] T103 [US9] Add test:coverage script to root package.json with coverage reporting
- [ ] T104 [US9] Document testing patterns in README.md (unit tests, component tests, Vitest commands)
- [ ] T105 [US9] Add corresponding testing documentation to README-RU.md
- [ ] T106 [P] [US9] Create TESTING.md with detailed testing guidelines
- [ ] T107 [P] [US9] Create TESTING-RU.md as exact translation
- [ ] T108 [US9] Verify `pnpm test` runs successfully with example tests passing

**Checkpoint**: At this point, User Story 9 should be fully functional - Testing infrastructure is ready for TDD development

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation affecting multiple user stories

- [ ] T109 [P] Create docker/Dockerfile.dev for development containerization
- [ ] T110 [P] Create docker/Dockerfile.prod for production builds
- [ ] T111 [P] Create docker/docker-compose.yml for local Supabase development
- [ ] T112 [P] Add Prisma ORM configuration to packages/types or new packages/db-srv per research.md
- [ ] T113 Validate all bilingual documentation pairs have identical structure (README.md/README-RU.md, etc.)
- [ ] T114 Run complete build pipeline: `pnpm install && pnpm build`
- [ ] T115 Run complete quality checks: `pnpm lint && pnpm type-check`
- [ ] T116 Run all tests: `pnpm test`
- [ ] T117 Verify quickstart.md steps work end-to-end by following the guide
- [ ] T118 Create .husky/ directory with git hooks for pre-commit linting (optional, based on team preference)
- [ ] T119 Document monorepo architecture in README.md (package organization, build system, workspace commands)
- [ ] T120 Add corresponding architecture documentation to README-RU.md
- [ ] T121 Final verification: Clone repository fresh, follow README.md, confirm all steps work

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-11)**: All depend on Foundational phase completion
  - User Stories 1-2 (P1): Highest priority, complete first
  - User Stories 3-5 (P2): Medium priority, complete after P1
  - User Stories 6-9 (P3): Lower priority, complete after P2
  - All user stories can proceed in parallel if team capacity allows
- **Polish (Phase 12)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Independent but benefits from US1 docs
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Independent
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Benefits from US2 workspace structure
- **User Story 6 (P3)**: Can start after Foundational (Phase 2) - Benefits from US5 Next.js setup
- **User Story 7 (P3)**: Can start after Foundational (Phase 2) - Benefits from US5 and US6
- **User Story 8 (P3)**: Can start after Foundational (Phase 2) - Benefits from US5 Next.js setup
- **User Story 9 (P3)**: Can start after Foundational (Phase 2) - Independent

### Within Each User Story

- Configuration files before documentation
- Setup tasks before verification tasks
- English documentation before Russian translation
- Implementation before validation

### Parallel Opportunities

- **Phase 1 (Setup)**: Tasks T005, T006, T007, T008 can run in parallel (different config files)
- **Phase 2 (Foundational)**: Most tasks are sequential due to directory dependencies
- **User Stories**: After Phase 2, all user story phases (3-11) can start in parallel with different developers
- **Within User Story 3**: Tasks T033, T034, T035 can run in parallel (different tools)
- **Within User Story 3**: Tasks T039, T040 can run in parallel (different VSCode files)
- **Within User Story 4**: Tasks T043-T046 can run in parallel (verify different files)
- **Within User Story 4**: Tasks T049, T050 can run in parallel (different contributing files)
- **Within User Story 5**: Tasks T056, T057, T058 can run in parallel (different static files)
- **Within User Story 5**: Tasks T060, T061 can run in parallel (different directories)
- **Within User Story 6**: Tasks T074, T075 can run in parallel (different doc files)
- **Within User Story 7**: Tasks T078, T079 can run in parallel (different client files)
- **Within User Story 7**: Tasks T084, T085 can run in parallel (different doc sections)
- **Within User Story 8**: Tasks T091 can be parallel with T092-T095 docs (implementation vs documentation)
- **Within User Story 8**: Tasks T094, T095 can run in parallel (different doc files)
- **Within User Story 9**: Tasks T100, T101 can run in parallel (different test files)
- **Within User Story 9**: Tasks T106, T107 can run in parallel (different testing doc files)
- **Phase 12 (Polish)**: Tasks T109, T110, T111, T112 can run in parallel (different Docker/config files)

---

## Parallel Example: Multiple User Stories

```bash
# After Phase 2 (Foundational) completes:

# Team Member A works on User Story 1 (P1):
Tasks: T019-T025 (Documentation and package configuration)

# Team Member B works on User Story 2 (P1):
Tasks: T026-T032 (Monorepo workspace setup)

# Team Member C works on User Story 3 (P2):
Tasks: T033-T042 (Development tooling)

# All three stories progress independently
```

---

## Parallel Example: Within User Story 8 (MUI Setup)

```bash
# Launch MUI example component creation together with documentation:
Task T091: "Create apps/web/src/components/MUIExample.tsx demonstrating MUI Client Component"
Task T092: "Document MUI setup in README.md"
Task T093: "Add corresponding MUI documentation to README-RU.md"

# Launch theming documentation in parallel:
Task T094: "Document theming patterns in README.md"
Task T095: "Add corresponding theming documentation to README-RU.md"
```

---

## Implementation Strategy

### MVP First (User Stories 1-2 Only)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T018) - CRITICAL
3. Complete Phase 3: User Story 1 (T019-T025) - Developer documentation
4. Complete Phase 4: User Story 2 (T026-T032) - Monorepo structure
5. **STOP and VALIDATE**: Verify developers can clone, install, and understand project
6. **MVP CHECKPOINT**: Foundation is established, ready for feature development

### Incremental Delivery

1. **Foundation**: Setup + Foundational → Project initialized
2. **MVP**: Add US1 + US2 → Test independently → Repository ready for development
3. **Developer Experience**: Add US3 (tooling) + US4 (GitHub) + US5 (Next.js) → Enhanced DX
4. **Infrastructure**: Add US6 (DB) + US7 (Auth) + US8 (UI) + US9 (Testing) → Full stack ready
5. **Production Ready**: Add Phase 12 (Docker, final polish) → Deploy-ready

### Parallel Team Strategy

With 3 developers after Foundational phase:

**Sprint 1 (P1 Priority)**:
- Developer A: User Story 1 (Documentation)
- Developer B: User Story 2 (Monorepo)
- Developer C: User Story 3 (Tooling)

**Sprint 2 (P2 Priority)**:
- Developer A: User Story 4 (GitHub)
- Developer B: User Story 5 (Next.js)
- Developer C: User Story 6 (Database)

**Sprint 3 (P3 Priority)**:
- Developer A: User Story 7 (Auth)
- Developer B: User Story 8 (MUI)
- Developer C: User Story 9 (Testing)

**Sprint 4 (Polish)**:
- All developers: Phase 12 tasks, final validation

---

## Validation Checklist

### Format Compliance ✅

- All tasks follow format: `- [ ] [TaskID] [P?] [Story?] Description with file path`
- Task IDs are sequential (T001-T121)
- [P] marker only on parallelizable tasks (different files, no dependencies)
- [Story] label on all user story tasks (US1-US9)
- File paths included in all implementation task descriptions

### User Story Coverage ✅

- User Story 1 (P1): Tasks T019-T025 (7 tasks)
- User Story 2 (P1): Tasks T026-T032 (7 tasks)
- User Story 3 (P2): Tasks T033-T042 (10 tasks)
- User Story 4 (P2): Tasks T043-T050 (8 tasks)
- User Story 5 (P2): Tasks T051-T067 (17 tasks)
- User Story 6 (P3): Tasks T068-T076 (9 tasks)
- User Story 7 (P3): Tasks T077-T086 (10 tasks)
- User Story 8 (P3): Tasks T087-T096 (10 tasks)
- User Story 9 (P3): Tasks T097-T108 (12 tasks)

### Constitutional Compliance ✅

- Monorepo architecture: US2 establishes packages/ structure
- Package separation: Documentation includes -frt/-srv pattern
- Base directories: Required in all packages (documented)
- TypeScript strict: US3 configures strict mode
- Bilingual docs: All README files have -RU versions
- Issue-driven: US4 verifies GitHub instructions
- Spec-first: This tasks.md based on spec.md

---

## Summary

**Total Tasks**: 121
**MVP Tasks**: 33 (Phase 1-4: T001-T032 + US1+US2)
**Full Implementation**: 121 tasks across all phases

**Task Distribution**:
- Setup: 8 tasks
- Foundational: 10 tasks
- User Story 1 (P1): 7 tasks
- User Story 2 (P1): 7 tasks
- User Story 3 (P2): 10 tasks
- User Story 4 (P2): 8 tasks
- User Story 5 (P2): 17 tasks
- User Story 6 (P3): 9 tasks
- User Story 7 (P3): 10 tasks
- User Story 8 (P3): 10 tasks
- User Story 9 (P3): 12 tasks
- Polish: 13 tasks

**Parallel Opportunities**: 35+ tasks marked [P] for parallel execution
**Independent Stories**: All 9 user stories can be validated independently after Foundational phase

**Suggested MVP Scope**: Phase 1 + Phase 2 + User Story 1 + User Story 2 (Foundation + Documentation + Monorepo)
**Recommended First Release**: Add User Story 3 + 5 (Tooling + Next.js) for complete developer experience

---

## Future Package Architecture (Post-Phase 1)

This Phase 1 foundation enables a modular package architecture across all future phases. The following planned packages will follow the `-frt` (frontend) / `-srv` (backend) separation pattern with `base/` directories:

### Phase 2: Core Infrastructure Packages
- `@universo/types` - Shared TypeScript types and interfaces
- `@universo/utils` - Utility functions, UPDLProcessor foundation  
- `@universo/i18n` - Internationalization runtime with next-intl
- `@universo/api-client` - Type-safe API client for both API routes and Server Actions
- `@universo/ui-components` - Shared Next.js UI components with MUI v6
- `@universo/rest-docs` - API documentation with TypeDoc + OpenAPI
- `profile-frt` / `profile-srv` - User profile management

### Phase 3: Workspace and Domain Packages
- `uniks-frt` / `uniks-srv` - Workspace (Unik) management system
- `clusters-frt` / `clusters-srv` - Clusters → Domains → Resources (3-tier hierarchy)
- `projects-frt` / `projects-srv` - Project management within workspaces (optional)

### Phase 4: Additional Domain Packages
- `metaverses-frt` / `metaverses-srv` - Virtual world containers (Metaverses → Sections → Entities)
- `spaces-frt` / `spaces-srv` - Canvas/flow management with visual node editor
- `analytics-frt` - Analytics dashboard and data visualization

### Phase 5: UPDL and Visual Programming
- `@universo/updl` - UPDL node definitions and interfaces (7 core high-level nodes)
- `@universo/updl-processor` - Flow data to UPDL conversion engine
- `space-builder-frt` / `space-builder-srv` - AI-assisted development (LLM → flow graphs)
- `langchain-nodes` - LangChain integration node library (if applicable)

### Phase 6: Template and Publication System
- `@universo/template-quiz` - AR.js educational quiz template builder
- `@universo/template-mmoomm` - PlayCanvas MMO experience template builder
- Additional template packages for Three.js, Babylon.js, A-Frame
- `publish-frt` / `publish-srv` - Publication system with UPDL → platform conversion

**Architecture Principles:**
- All packages follow modular patterns established in Phase 1
- Frontend (-frt) and backend (-srv) are always separated when both are needed
- All packages include `base/` directory for future database abstraction
- Shared infrastructure packages use `@universo/` scope without -frt/-srv suffix
- Template packages use `@universo/template-` prefix
- All packages provide dual build output (CJS + ESM + Types) via tsdown
- Bilingual documentation (README.md + README-RU.md) required for every package

**Routing Pattern (Post-Phase 2):**
All domain operations use workspace-scoped routes:
```
GET    /api/uniks/:unikId/clusters                    # List clusters in workspace
POST   /api/uniks/:unikId/clusters                    # Create cluster
GET    /api/uniks/:unikId/clusters/:clusterId         # Get cluster details
PUT    /api/uniks/:unikId/clusters/:clusterId         # Update cluster
DELETE /api/uniks/:unikId/clusters/:clusterId         # Delete cluster
```

This pattern ensures all operations are scoped to workspaces for proper multi-tenancy.

**Reference Architecture Note:**
Unlike [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react/tree/main/packages) which contains monolithic packages from Flowise legacy (e.g., `flowise-components` with many functionalities), this Next.js implementation plans optimal package separation from the beginning. Each domain gets its own -frt/-srv packages, and shared functionality is extracted into focused @universo/ packages.
