<!--
SYNC IMPACT REPORT
==================
Version Change: 1.3.0 → 1.4.0
Reason: Strengthened modular architecture requirements - MANDATORY packages/ structure

Previous Update (1.2.0 → 1.3.0):
Reason: Comprehensive architectural patterns analysis from universo-platformo-react

Modified Principles (1.3.0 → 1.4.0):
  - **Section I: Monorepo Architecture**: Added CRITICAL REQUIREMENT stating it is FORBIDDEN to implement feature functionality outside packages/ directory. Added explicit list of only permitted root-level files.
  - **Section II: Package Separation Pattern**: Changed to NON-NEGOTIABLE, added MANDATORY STRUCTURE heading, expanded with Frontend/Backend Separation Rules, added detailed package structure example.
  - **Prohibited Patterns**: Completely restructured into 4 categories with "CRITICAL PROHIBITIONS" heading. Added extensive section 1 on Non-Modular Implementation with 5 ❌ NEVER rules and 2 ✅ ALWAYS rules.
  - **Quality Gates**: Added "Modular Architecture Compliance (CRITICAL)" as first gate with 5 specific checks.
  - **Review Checklist**: Added "Modular Architecture (CRITICAL - MUST VERIFY FIRST)" section with 5 mandatory checks before other reviews.
  - **Implementation Principles**: Added two new principles emphasizing ALL functionality in packages/ and frontend/backend separation.

Added Sections (1.4.0):
  - **Non-Modular Implementation Prohibitions**: Comprehensive list of forbidden patterns with clear NEVER/ALWAYS rules
  - **Modular Architecture Quality Gates**: First-priority checks for package structure compliance
  - **Modular Architecture Review Checklist**: Mandatory verification steps for code reviewers

Key Architectural Enhancements (1.4.0):
  - Absolute prohibition on feature code outside packages/ directory
  - Explicit FORBIDDEN language for non-modular implementations  
  - Clear distinction between permitted root-level configuration and forbidden root-level feature code
  - Mandatory package separation into -frt/-srv for dual-sided features
  - Required base/ directory in all packages without exception
  - Quality gates prioritize modular architecture verification above all other checks
  - Code review process must verify package structure FIRST before reviewing code quality

Modified Principles (1.2.0 → 1.3.0):
  - **Technology Stack Requirements**: Added Turborepo, tsdown, Husky, i18next, specific ORM options, updated auth to Supabase Auth Helpers, MUI v6, client state management options, API documentation tools, Docker
  - **Technology Guidelines**: Expanded with Next.js-specific patterns, MUI v6 setup, dual build requirements, package documentation requirements
  - **Version Management**: Enhanced with package standards
  - **Feature Development Roadmap**: Completely restructured from 5 to 7 phases with detailed scope changes

Added Sections (1.3.0):
  - **Package Standards**: Directory structure, build requirements, documentation requirements, testing requirements, naming conventions
  - Phase 1 additions: Turborepo, Husky, Docker, SECURITY.md, package templates, @universo/types
  - Phase 2 additions: Profile management, shared infrastructure packages (@universo/utils, @universo/i18n, @universo/api-client), ORM selection, API docs
  - Phase 3 restructure: Uniks (workspace) added before Clusters
  - Phase 4 restructure: Added Spaces and Analytics domains
  - Phase 5 focus: UPDL and Space Builder (AI-assisted development)
  - **NEW Phase 6**: Templates and Publication system
  - **NEW Phase 7**: Advanced features and scaling (optional)

Key Architectural Changes (1.3.0):
  - Authentication: Passport.js → Supabase Auth Helpers for Next.js
  - Build system: Added Turborepo + tsdown for package builds
  - Infrastructure packages: Defined @universo/types, @universo/utils, @universo/i18n, @universo/api-client
  - Domain order: Uniks (workspace) must come before Clusters
  - Added missing domains: Profile, Analytics, Space Builder
  - Added template and publication phases

Templates Status:
  ✅ plan-template.md - Reviewed, aligned with constitution principles
  ✅ spec-template.md - Reviewed, aligned with constitution principles
  ✅ tasks-template.md - Reviewed, aligned with constitution principles
  ✅ .github/instructions/github-issues.md - Reviewed, aligned
  ✅ .github/instructions/github-labels.md - Reviewed, aligned
  ✅ .github/instructions/github-pr.md - Reviewed, aligned
  ✅ .github/instructions/i18n-docs.md - Reviewed, aligned

Follow-up TODOs:
  - Update all existing specifications to explicitly require packages/ structure
  - Add validation script to check for non-package feature code
  - Update CI/CD to reject PRs with feature code outside packages/
  - Create architectural decision record for strict modular requirement
  - Update agent instructions with strengthened modular requirements
-->

# Universo Platformo Next Constitution

## Core Principles

### Context and Reference Implementation

**Reference Project**: This implementation is based on the architectural concepts established in [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react). The React version serves as the conceptual reference but is still partially implemented with legacy code from Flowise that has not yet been fully removed. This Next.js implementation adopts the validated patterns and architecture from the React version while following Next.js best practices and avoiding legacy implementation issues.

**Key Guidance**:
- Learn from the general architecture and package structure of the React implementation
- Do NOT copy specific code implementations or legacy patterns
- Focus on the proven concepts: monorepo structure, package organization, database abstraction, and bilingual documentation
- Monitor the React repository for new features and architectural improvements to implement in this Next.js version

### I. Monorepo Architecture (NON-NEGOTIABLE)

The project MUST be structured as a monorepo managed with PNPM. **ALL functionality (except root-level configuration and build files) MUST reside in the `packages/` directory**. This ensures:
- Unified dependency management across all modules
- Simplified version control and atomic commits
- Efficient workspace sharing and build optimization
- Clear separation of concerns between functional domains
- Ability to extract packages into separate repositories in the future

**CRITICAL REQUIREMENT**: It is FORBIDDEN to implement any feature functionality outside the `packages/` directory structure. The only permitted root-level files are:
- Configuration files (package.json, tsconfig.json, turbo.json, etc.)
- Build and tooling files (.eslintrc, .prettierrc, docker-compose.yml, etc.)
- Documentation files (README.md, README-RU.md, SECURITY.md, etc.)
- GitHub workflow files (.github/)

**Rationale**: Monorepo structure with PNPM provides the foundation for managing complex multi-package architecture while maintaining development efficiency and preventing dependency conflicts. The strict packages/ requirement enables future extraction of packages into independent repositories without refactoring.

### II. Package Separation Pattern (NON-NEGOTIABLE)

**MANDATORY STRUCTURE**: ALL functional modules MUST be implemented as packages in the `packages/` directory with strict separation:

**Frontend/Backend Separation Rules**:
- When functionality requires BOTH frontend and backend: MUST create separate packages
  - Frontend package: `packages/[domain]-frt/` (e.g., `packages/clusters-frt/`)
  - Backend package: `packages/[domain]-srv/` (e.g., `packages/clusters-srv/`)
- When functionality requires ONLY frontend OR backend: MAY use single package without suffix
- Shared infrastructure packages: Use descriptive names (e.g., `packages/universo-types/`, `packages/universo-utils/`)

**Base Directory Requirement**:
- Each package MUST contain a `base/` directory at its root for the core implementation
- The `base/` directory enables future multiple implementations (e.g., different database adapters)
- ALL package code MUST be within the `base/` subdirectory

**Package Structure Example**:
```
packages/
├── clusters-frt/          # Clusters frontend package
│   └── base/
│       ├── src/
│       ├── package.json
│       └── README.md
├── clusters-srv/          # Clusters backend package
│   └── base/
│       ├── src/
│       ├── package.json
│       └── README.md
└── universo-types/        # Shared types package
    └── base/
        ├── src/
        ├── package.json
        └── README.md
```

**Rationale**: Clear separation enables independent scaling, deployment, and technology choices. The base directory pattern allows for multiple database or framework implementations in the future. Strict package separation enables gradual extraction of packages into independent repositories as the project matures.

### III. TypeScript-First Development

All code MUST be written in TypeScript with strict type checking enabled:
- No implicit `any` types allowed
- Type definitions MUST be explicit and comprehensive
- Prefer TypeScript-native patterns over JavaScript workarounds
- Full Next.js TypeScript integration required

**Rationale**: TypeScript provides compile-time safety, better IDE support, and serves as living documentation, reducing bugs and improving maintainability in a large codebase.

### IV. Database Abstraction Layer

Database access MUST be abstracted to support multiple implementations:
- Current implementation uses Supabase as primary database
- All database operations MUST go through an abstraction layer
- Database-specific code MUST be isolated in the `base/` directory of each package
- Future support for additional databases (PostgreSQL, MySQL, MongoDB) MUST be feasible without refactoring business logic

**Rationale**: Database abstraction prevents vendor lock-in and allows the platform to be deployed in different environments with different database requirements.

### V. Bilingual Documentation (NON-NEGOTIABLE)

All documentation MUST be provided in both English and Russian:
- English is the primary standard language
- Russian translation MUST match English structure exactly (same number of lines, sections, and content)
- README files use `README.md` (English) and `README-RU.md` (Russian) pattern
- GitHub Issues and PRs MUST include Russian translation in `<details><summary>In Russian</summary>` spoiler tags
- Update English first, then synchronize Russian version

**Rationale**: The project serves a bilingual community, and complete documentation parity ensures all contributors and users have equal access to information.

### VI. Issue-Driven Development

All work MUST be tracked through GitHub Issues:
- Create an Issue BEFORE starting any implementation work
- Issues MUST follow `.github/instructions/github-issues.md` template
- Issues MUST be labeled according to `.github/instructions/github-labels.md`
- Pull Requests MUST reference and close the corresponding Issue
- PRs MUST follow `.github/instructions/github-pr.md` template

**Rationale**: Issue tracking provides transparency, enables project planning, and creates an auditable history of all changes with clear motivation and context.

### VII. Specification-First Approach

Complex features MUST be designed before implementation:
- Create specification documents in `specs/` directory structure
- Follow `.specify/templates/spec-template.md` for specifications
- Use `.specify/templates/plan-template.md` for implementation planning
- Generate tasks using `.specify/templates/tasks-template.md` structure
- Validate specifications against constitution principles before implementation

**Rationale**: Thorough upfront design prevents costly refactoring, ensures alignment with project goals, and provides clear success criteria before code is written.

## Technology Stack Requirements

### Mandatory Technologies

- **Framework**: Next.js 14.x or latest stable with App Router
- **Language**: TypeScript (strict mode enabled)
- **Package Manager**: PNPM 8.x or higher (workspaces)
- **Build Orchestration**: Turborepo for monorepo build coordination
- **Package Build Tool**: tsdown for dual CJS+ESM output in shared packages
- **Runtime**: Node.js 18.x or higher
- **Database**: Supabase (with abstraction for future alternatives including PostgreSQL, MySQL, MongoDB)
- **ORM**: Prisma, Drizzle ORM, or TypeORM (to be determined in Phase 2 based on Next.js compatibility)
- **Authentication**: Supabase Auth Helpers for Next.js (replacing Passport.js which is Express-centric)
- **UI Framework**: Material UI (MUI) 6.x or latest stable with ColorScheme API
- **State Management**: Next.js native patterns (Server/Client Components, Server Actions) + Zustand or Jotai for client state
- **Testing**: Vitest with React Testing Library
- **Internationalization**: next-intl or i18next with Next.js App Router support
- **API Documentation**: TypeDoc for TypeScript + OpenAPI for REST endpoints
- **Git Hooks**: Husky for pre-commit quality checks
- **Containerization**: Docker for development and deployment

### Technology Guidelines

- Leverage Next.js Server Components for data fetching where possible
- Use Client Components only when interactive state or browser APIs are required
- Implement API routes in Next.js App Router structure (`app/api/`)
- Follow Next.js best practices for routing, layouts, and middleware
- Use MUI v6 with ColorScheme API for consistent theming and dark mode support
- Configure MUI with Emotion cache for Next.js App Router SSR compatibility
- Implement authentication using Supabase Auth Helpers (not Passport.js)
- Use Server Actions for mutations and form submissions
- Use Zustand or Jotai for client-side state management (lighter than Redux)
- All database access must go through the abstraction layer in `base/` directories
- Use Turborepo to orchestrate builds across packages with proper dependency caching
- Shared packages must provide dual build output (CommonJS + ES Modules + TypeScript declarations)
- Use Husky git hooks to enforce code quality before commits
- Environment variables must be typed and validated in TypeScript
- Security vulnerabilities must be addressed before merging to main branch
- All packages must include README.md and README-RU.md following standard templates

### Version Management

- **Dependency Versioning**: Use exact versions for critical dependencies, ranges (^) for minor updates
- **Security Updates**: Critical security patches must be applied within 48 hours of disclosure
- **Major Upgrades**: Major version upgrades require specification, testing, and team review
- **Dependency Audits**: Run `pnpm audit` before every release and address high/critical issues

### Package Standards

**Directory Structure:**
Every package must follow this standard structure (use only directories needed for your package type):

```
package-name/
└── base/
    ├── src/
    │   ├── api/          # API clients (frontend packages)
    │   ├── assets/       # Static resources (icons, images)
    │   ├── components/   # React components (frontend packages)
    │   ├── routes/       # Express routes (backend packages)
    │   ├── services/     # Business logic (backend packages)
    │   ├── database/     # ORM entities and migrations (backend packages)
    │   ├── i18n/         # Internationalization resources
    │   ├── types/        # TypeScript type definitions
    │   ├── utils/        # Utility functions
    │   └── index.ts      # Entry point
    ├── dist/             # Compiled output (generated, not committed)
    ├── package.json
    ├── tsconfig.json
    ├── README.md         # English documentation
    └── README-RU.md      # Russian documentation (exact translation)
```

**Build Requirements:**
- Shared packages must use tsdown for dual build output (CJS + ESM + Types)
- Build output goes to `dist/` directory (add to .gitignore)
- Package entry points defined in package.json: `main`, `module`, `types`
- TypeScript must compile with no errors in strict mode

**Documentation Requirements:**
- Every package must have README.md (English) and README-RU.md (Russian)
- Russian version must be exact translation with same structure and line count
- Use provided templates in `.github/templates/package-readme/`
- Include: Overview, Features, Installation, Usage, API Reference, Architecture

**Testing Requirements:**
- Tests must be in `src/__tests__/` or `test/` directory
- Minimum 80% code coverage for shared infrastructure packages
- Minimum 70% code coverage for domain packages
- All tests must pass before merging

**Naming Conventions:**
- Frontend packages: `@universo/[domain]-frt` or scoped name
- Backend packages: `@universo/[domain]-srv` or scoped name
- Shared utilities: `@universo/[name]` (e.g., `@universo/types`, `@universo/utils`)
- Template packages: `@universo/template-[name]` (e.g., `@universo/template-quiz`)
- Single-sided packages may omit -frt/-srv suffix

### Prohibited Patterns

**CRITICAL PROHIBITIONS** - These violations will result in rejected pull requests:

**1. Non-Modular Implementation (STRICTLY FORBIDDEN)**:
- ❌ **NEVER** implement feature functionality outside `packages/` directory
- ❌ **NEVER** place business logic, domain code, or feature implementation in root-level directories
- ❌ **NEVER** create monolithic applications without package separation
- ❌ **NEVER** mix frontend and backend code in the same package when both are needed
- ❌ **NEVER** skip the `base/` directory requirement in packages
- ✅ **ALWAYS** create separate `-frt` and `-srv` packages for features needing both frontend and backend
- ✅ **ALWAYS** place ALL feature code inside appropriate packages in `packages/` directory

**2. Documentation and Configuration**:
- Do NOT create separate `docs/` directory (documentation lives in external repository)
- Do NOT create AI agent configuration files or directories (`.github/agents/`, `.github/prompts/`, etc.) - users will create these themselves as needed
  - **Note**: Existing AI agent files in `.github/agents/` and `.github/prompts/` are grandfathered and maintained by project administrators
  - This prohibition applies only to new AI-generated agent configuration files created by automated processes

**3. Legacy Patterns from Reference Implementation**:
- Do NOT copy legacy patterns from Universo Platformo React without evaluation
  - **Legacy Patterns to Avoid**: 
    - Mixing Flowise legacy code with new implementations
    - React-specific state management patterns that don't translate to Next.js
    - Client-side data fetching where Server Components would be more appropriate
    - Monolithic package structures that should be split into -frt/-srv

**4. Technical Standards Violations**:
- Do NOT bypass the database abstraction layer for quick fixes
- Do NOT mix JavaScript and TypeScript in the same package
- Do NOT use Pages Router patterns in an App Router project
- Do NOT commit environment files with secrets (`.env.local`, `.env.production`)
- Do NOT commit environment files with secrets (`.env.local`, `.env.production`)

## Development Workflow

### Pre-Implementation Phase

1. **Issue Creation**: Create GitHub Issue with bilingual description
2. **Specification**: Write detailed spec in `specs/` following templates
3. **Constitution Check**: Verify alignment with all core principles
4. **Review & Approval**: Get specification reviewed before implementation

### Implementation Phase

1. **Branch Creation**: Create feature branch from main
2. **Incremental Development**: Make small, focused commits
3. **Testing**: Write tests alongside implementation
4. **Documentation**: Update README files in both languages
5. **Self-Review**: Verify changes against specification and constitution

### Review & Merge Phase

1. **Pull Request**: Create PR following template with bilingual description
2. **Code Review**: Address reviewer feedback
3. **CI Validation**: Ensure all automated checks pass
4. **Merge**: Squash and merge to main branch
5. **Issue Closure**: Verify Issue is automatically closed

### Quality Gates

Before merging, verify:
- **Modular Architecture Compliance** (CRITICAL):
  - All feature functionality is in `packages/` directory
  - Frontend/backend separation follows `-frt`/`-srv` pattern when both needed
  - Each package has `base/` directory
  - No business logic in root-level directories
- All tests pass (unit, integration, e2e where applicable)
- TypeScript compilation succeeds with no errors
- ESLint and Prettier checks pass
- Both English and Russian documentation updated with identical structure
- No new dependencies added without security review (pnpm audit passes)
- Test coverage maintains or improves current levels
- Constitution principles not violated
- Code review approved by at least one qualified reviewer
- All CI/CD checks pass successfully

### Code Review Requirements

#### Reviewer Qualifications
- Reviewers must understand Next.js App Router architecture
- Reviewers must be familiar with TypeScript strict mode
- Reviewers must know the project's constitution and architectural principles
- At least one reviewer must approve before merging

#### Review Checklist

**Modular Architecture (CRITICAL - MUST VERIFY FIRST)**:
- [ ] ALL feature code is in `packages/` directory (NO exceptions)
- [ ] Frontend/backend properly separated into `-frt`/`-srv` packages when both needed
- [ ] Each package has required `base/` directory structure
- [ ] NO business logic or domain code in root-level directories
- [ ] Package naming follows conventions (`@universo/[domain]-frt`, `@universo/[domain]-srv`)

**Code Quality**:
- [ ] Code follows TypeScript strict mode (no `any` types)
- [ ] Next.js patterns used correctly (Server vs Client Components)
- [ ] Database access uses abstraction layer (in `base/` directory)
- [ ] Tests are included and pass
- [ ] Documentation updated in both English and Russian
- [ ] No security vulnerabilities introduced
- [ ] No prohibited patterns used
- [ ] Code is maintainable and follows project conventions
- [ ] Changes align with specification and Issue requirements
- [ ] Environment variables properly typed and validated

#### Review Process
1. Reviewer examines code changes against checklist
2. Reviewer tests functionality locally if needed
3. Reviewer provides constructive feedback inline
4. Author addresses feedback with additional commits
5. Reviewer approves when all concerns resolved
6. Automated CI checks must pass before merge

#### Conflict Resolution
When reviewers disagree or requirements conflict:
1. Document the specific conflict and competing concerns
2. Refer to constitution principles for guidance
3. Escalate to project lead if constitution doesn't provide clarity
4. Project lead makes final decision with documented rationale
5. Update constitution if pattern should be codified

## Security Standards

### Security File Requirements

- `SECURITY.md` MUST exist in repository root (Phase 1)
- Must document vulnerability reporting process
- Must list security contact information
- Must specify supported versions and security policy

### Dependency Security

**Security Management:**
- Run `pnpm audit` before every release and address issues
- Critical vulnerabilities MUST be patched within 48 hours of disclosure
- High vulnerabilities MUST be patched within 1 week
- Medium vulnerabilities should be patched within 1 month
- Use `pnpm overrides` for immediate security patches when needed
- Document all security-related overrides with justification

**CI/CD Security Checks:**
- Automated security scanning in pull requests
- Dependency vulnerability scanning (Dependabot, Snyk, or similar)
- CodeQL scanning for code vulnerabilities
- No merge allowed with unresolved critical or high vulnerabilities
- Security scan results must be reviewed before merging

### Environment Security

- Never commit `.env.local`, `.env.production`, or similar files with secrets
- All environment variables MUST be typed and validated using TypeScript
- Use validation libraries (e.g., Zod) for runtime environment variable checks
- Sensitive data MUST be stored in Supabase Vault or secure secrets manager
- Document required environment variables in README files
- Provide `.env.example` files without actual secrets

### Code Security

- Follow OWASP security best practices
- Sanitize all user inputs before processing
- Use parameterized queries for database operations
- Implement rate limiting on public API endpoints
- Use HTTPS for all external communications
- Never log sensitive information (passwords, tokens, PII)

## Testing Standards

### Testing Stack

**Required Tools:**
- **Test Runner**: Vitest ^2.1.8 or higher
- **React Testing**: @testing-library/react ^14.3.1
- **DOM Simulation**: happy-dom ^16.14.2 (faster than jsdom)
- **Coverage**: @vitest/coverage-v8 ^2.1.4
- **User Interaction**: @testing-library/user-event ^14.6.1

### Coverage Requirements

**Minimum Coverage Targets:**
- Infrastructure packages (@universo/*): 80% coverage
- Domain packages (*-frt, *-srv): 70% coverage
- Template packages (@universo/template-*): 60% coverage
- All tests MUST pass before merging to main

**Coverage Measurement:**
- Line coverage (primary metric)
- Branch coverage (conditional logic)
- Function coverage (all functions executed)

### Next.js Specific Testing

**Server Components:**
- Mock data fetching functions
- Test rendered output with expected data
- Verify correct props passed to Client Components

**Client Components:**
- Use @testing-library/react for interactions
- Test user events and state changes
- Verify accessibility with jest-axe

**API Routes:**
- Test with direct function calls or supertest
- Mock Supabase client and database operations
- Verify response status codes and payloads

**Server Actions:**
- Test with direct async function calls
- Mock database and external service calls
- Verify return values and error handling

### Test Organization

```
package/
└── base/
    ├── src/
    │   ├── components/
    │   │   ├── Button.tsx
    │   │   └── Button.test.tsx    # Colocated tests
    │   └── utils/
    │       ├── format.ts
    │       └── format.test.ts     # Colocated tests
    └── vitest.config.ts
```

**Test File Naming:**
- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

## Documentation Standards

### Package README Structure

Every package MUST include `README.md` (English) and `README-RU.md` (Russian) with this structure:

```markdown
# Package Name

[Badges: Version, License, Build Status]

## Overview
Brief description (2-3 sentences explaining purpose)

## Features
- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Installation
\`\`\`bash
pnpm add @universo/package-name
\`\`\`

## Usage

### Basic Usage
\`\`\`typescript
// Code example with explanation
\`\`\`

### Advanced Usage
\`\`\`typescript
// Advanced code example
\`\`\`

## API Reference

### Functions
Document exported functions with parameters and return types

### Types
Document exported TypeScript interfaces and types

### Components (for UI packages)
Document React components with props

## Architecture
High-level architecture diagram or description of package structure

## Development

### Setup
\`\`\`bash
pnpm install
\`\`\`

### Building
\`\`\`bash
pnpm build
\`\`\`

### Testing
\`\`\`bash
pnpm test
\`\`\`

## Contributing
Reference to main CONTRIBUTING.md

## License
Reference to LICENSE file
```

### Documentation Templates

**Phase 1 Deliverables:**
- Create `packages/TEMPLATE-README.md` as English template
- Create `packages/TEMPLATE-README-RU.md` as Russian template  
- Create `packages/TEMPLATE-README-GUIDE.md` with usage instructions

### Documentation Review Process

- Russian translation MUST be reviewed for accuracy by bilingual reviewer
- Technical terminology MUST be consistent across both languages
- Code examples MUST be tested and work correctly
- Documentation MUST be updated in same PR as code changes
- Screenshots and diagrams MUST have bilingual annotations when containing text

## Governance

### Authority & Compliance

This constitution supersedes all other development practices and guidelines. All team members, contributors, and automated processes MUST adhere to these principles. Violations MUST be justified with documented technical or business necessity.

### Amendment Process

1. **Proposal**: Document proposed amendment with rationale
2. **Impact Analysis**: Assess effect on existing codebase and workflow
3. **Team Review**: Discuss and gather consensus
4. **Version Update**: Increment version following semantic versioning:
   - MAJOR: Backward-incompatible governance changes or principle removal
   - MINOR: New principles added or significant expansion
   - PATCH: Clarifications, typo fixes, non-semantic refinements
5. **Migration Plan**: Document steps to align existing code with amendments
6. **Ratification**: Update constitution with new version and amendment date

### Version Control

Constitution versions MUST follow semantic versioning (MAJOR.MINOR.PATCH). Each amendment MUST update the "Last Amended" date to the date of ratification.

### Complexity Justification

When constitutional principles must be violated for technical necessity:
1. Document the specific principle being violated
2. Explain why the violation is necessary
3. Propose the simplest alternative that was rejected and why
4. Set a timeline for removing the violation if possible
5. Get explicit approval in code review

### Continuous Improvement

Review this constitution quarterly to ensure it remains relevant and effective. Update based on lessons learned and evolving project needs.

## Feature Development Roadmap

The platform follows a phased implementation approach, building complexity incrementally:

### Phase 1: Foundation (Current)

**Scope:**
- Repository setup and configuration
- Basic monorepo structure with PNPM and Turborepo
- Development tooling (TypeScript, ESLint, Prettier, Vitest)
- Git hooks (Husky) for pre-commit quality checks
- Next.js 14 App Router configuration
- Bilingual documentation framework and package README templates
- GitHub workflow templates (Issues, PRs, Labels)
- Environment configuration setup
- MUI v6 configuration for Next.js App Router with Emotion cache
- Supabase Auth Helpers configuration (not full implementation)
- Database abstraction layer design
- Docker configuration for development and deployment
- SECURITY.md with vulnerability reporting process
- @universo/types package initialization

**Dependencies:** None (foundational phase)

**Success Criteria:**
- Developer can clone, install, and run project in under 10 minutes
- Turborepo builds packages in correct dependency order
- All configuration files present and validated
- Documentation complete in both languages
- Pre-commit hooks run successfully
- Tests pass, linting passes, TypeScript compiles without errors
- Can create new packages following established patterns
- Docker containers build and run successfully
- @universo/types package provides shared type definitions

### Phase 2: Core Infrastructure

**Scope:**
- Full authentication system implementation (Supabase Auth Helpers for Next.js)
- ORM selection and configuration (Prisma, Drizzle, or TypeORM evaluation)
- Database abstraction layer implementation with Supabase
- Material UI theming and component library full setup for App Router
- Basic routing and layout structure in Next.js
- User management and session handling
- Profile management (profile-frt, profile-srv packages)
- Authorization middleware for Server Components and API routes
- Workspace-scoped API routing pattern implementation
- Shared infrastructure packages (all required):
  - @universo/types (shared TypeScript types and interfaces)
  - @universo/utils (utility functions, UPDLProcessor foundation)
  - @universo/i18n (internationalization runtime with next-intl)
  - @universo/api-client (type-safe API client supporting both API routes and Server Actions)
  - @universo/ui-components (shared Next.js UI components with MUI v6)
  - @universo/rest-docs (API documentation with TypeDoc + OpenAPI)
- API documentation infrastructure (TypeDoc + OpenAPI)
- Comprehensive test coverage for core functionality

**Workspace-Scoped Routing Pattern:**

All domain operations MUST be scoped to workspaces (Uniks). The following routing pattern MUST be used consistently:

```
Next.js Route Structure:
app/
├── api/
│   └── uniks/
│       └── [unikId]/
│           ├── {domain}/
│           │   └── route.ts          # GET (list), POST (create)
│           └── {domain}/
│               └── [itemId]/
│                   └── route.ts      # GET, PUT, DELETE

Example:
GET    /api/uniks/:unikId/clusters                    # List
POST   /api/uniks/:unikId/clusters                    # Create
GET    /api/uniks/:unikId/clusters/:clusterId         # Get
PUT    /api/uniks/:unikId/clusters/:clusterId         # Update
DELETE /api/uniks/:unikId/clusters/:clusterId         # Delete
```

All operations MUST:
- Validate user has access to the specified workspace
- Use workspace context for authorization
- Follow consistent URL structure across all domains

**Dependencies:** Phase 1 complete

**Success Criteria:**
- Users can authenticate with Supabase credentials using Auth Helpers
- Database operations work through abstraction layer
- ORM is selected and configured for Next.js patterns
- MUI components render correctly in Server and Client Components
- Protected routes enforce authentication in App Router
- Profile management fully functional
- Workspace-scoped routing pattern implemented and documented
- All 6 infrastructure packages provide dual build output (CJS + ESM)
- @universo/ui-components provides Server/Client Component wrappers for MUI
- API documentation is generated and accessible via @universo/rest-docs
- All core infrastructure has >80% test coverage

### Phase 3: Workspace and First Domain

**Scope:**
Implement workspace management and the first complete functional domain:

**Uniks (Workspace Management)** - Implemented First:
- uniks-frt, uniks-srv packages
- Workspace creation and management
- User-workspace relationships
- Workspace member management
- Workspace-level permissions
- Rationale: Users need workspaces before creating domain entities like clusters

**Clusters Domain** - Implemented Second:
- clusters-frt, clusters-srv packages
- **Clusters**: Top-level organizational units
- **Domains**: Sub-units within Clusters
- **Resources**: Items within Domains
- Three-tier entity structure as template for other features
- Proper authorization and access control

**Projects Domain** - Optional Third:
- projects-frt, projects-srv packages
- Workspace-level project management
- Project organization within Uniks
- CRUD operations for projects
- Integration with other domain entities (optional)
- Can be implemented in Phase 4 if time constraints exist

**Dependencies:** Phase 2 complete (requires auth, database, UI framework, profile)

**Success Criteria:**
- Users can create and manage workspaces (Uniks)
- Users can create, read, update, delete Clusters within workspaces
- Three-tier hierarchy (Clusters → Domains → Resources) fully functional
- CRUD operations work with proper authorization at workspace level
- UI implements consistent patterns reusable for other domains
- API follows RESTful or Next.js patterns (Server Actions + Route Handlers)
- Package structure (-frt/-srv with base/) demonstrated
- At least 70% code coverage for both domains

**Domain-Specific Characteristics:**
- Uniks (Workspaces): Container for all user's projects and resources
- Clusters: Top-level organizational primitive within a workspace
- Each Cluster can contain multiple Domains
- Each Domain can contain multiple Resources
- Authorization: Users can be members of workspaces and clusters with different roles

### Phase 4: Additional Domains and Analytics

**Scope:**
Replicate the established patterns for additional domains:

**Metaverses Domain:**
- metaverses-frt, metaverses-srv packages
- **Metaverses**: Virtual world containers (similar to Clusters)
- **Sections**: Areas within Metaverses (similar to Domains)
- **Entities**: Objects within Sections (similar to Resources)
- Domain-specific features: 3D positioning, spatial relationships

**Spaces (Canvas Management):**
- spaces-frt, spaces-srv packages
- Flow/canvas management within workspaces
- Integration with visual node editor
- Canvas storage and versioning

**Analytics:**
- analytics-frt package
- User engagement tracking
- Usage analytics dashboard
- Data visualization components
- Quiz and interaction analytics

Each domain follows the established frontend (-frt) and backend (-srv) package pattern with base/ directories.

**Dependencies:** Phase 3 complete (Uniks and Clusters provide the templates)

**Success Criteria:**
- Metaverses, Spaces, and Analytics domains fully functional
- Patterns from Clusters successfully reused (>70% code pattern reuse)
- New domains integrate seamlessly with authentication and workspace management
- Performance acceptable (response times < 500ms for standard operations)
- Documentation updated for each new domain in both languages
- Analytics provides actionable insights

**Domain-Specific Differences:**
- Metaverses include spatial/3D concepts not present in Clusters
- Spaces integrate with visual flow editor
- Analytics focuses on read-only data visualization
- All domains operate within workspace (Unik) context

### Phase 5: UPDL and Visual Programming

**Scope:**
Build the Universal Platform Definition Language system and AI-assisted development:

**UPDL Node System:**
- updl package with node definitions
- 7 core high-level nodes for 3D/AR/VR scene description
- Node interfaces and type definitions
- Integration with visual flow editor

**UPDL Processing:**
- @universo/updl-processor package
- Flow data to UPDL conversion
- Multi-scene support
- Template-agnostic processing pipeline
- Validation and transformation utilities

**Space Builder (AI-Assisted Development):**
- space-builder-frt, space-builder-srv packages
- Natural language prompt to flow graph conversion
- LLM integration for code generation
- UPDL node generation from descriptions
- Model selection and configuration
- Test mode for development

**LangChain Integration (if applicable):**
- Node-based workflow editor for AI chains
- LangChain node definitions and execution
- Integration with UPDL system

**Dependencies:** Phase 4 complete (requires Spaces domain and all infrastructure)

**Success Criteria:**
- UPDL nodes are defined and documented
- Users can create UPDL structures through visual editor
- UPDLProcessor converts flow data to valid UPDL
- Space Builder generates valid flows from natural language
- LLM integration works reliably
- Node validation prevents invalid structures
- System scales to support expected user load
- Documentation includes UPDL specification and examples

### Phase 6: Templates and Publication

**Scope:**
Build the template system for multi-platform export and publication:

**Template Registry System:**
- Template registration and discovery
- Dynamic template loading
- Template interface standardization (see Template Builder Interface below)
- Template versioning

**Template Builder Interface:**

All template packages MUST implement the following TypeScript interface:

```typescript
export interface TemplateBuilder {
  /** Unique template identifier */
  name: string;
  
  /** Semantic version */
  version: string;
  
  /** Human-readable display name */
  displayName: string;
  
  /** Build UPDL space into platform-specific output */
  build(updl: UPDLSpace): Promise<string | BuildOutput>;
  
  /** Validate UPDL is compatible with this template */
  validate(updl: UPDLSpace): ValidationResult;
  
  /** Get template configuration schema */
  getConfigSchema(): ConfigSchema;
}
```

**Template Package Structure:**

```
template-{name}/
└── base/
    ├── src/
    │   ├── builders/      # UPDL → Platform converters
    │   ├── components/    # Platform-specific generators
    │   ├── utils/         # Template utilities
    │   └── index.ts       # Export TemplateBuilder implementation
    ├── dist/              # CJS + ESM + Types
    ├── package.json
    ├── README.md
    └── README-RU.md
```

**Template Packages:**
- template-quiz package (AR.js educational quizzes)
- template-mmoomm package (PlayCanvas MMO experiences)
- Additional templates for other platforms (Three.js, Babylon.js, A-Frame)
- Template builders that consume UPDL

**Publication System:**
- publish-frt, publish-srv packages
- UPDL to platform-specific output conversion
- Template selection and configuration
- Build and validation pipeline
- Publication URL system (/p/{uuid})
- Public/private publication options
- Version management
- Embedding options

**Dependencies:** Phase 5 complete (requires UPDL system)

**Success Criteria:**
- Template registry discovers and loads templates dynamically
- At least 2 template packages functional (AR.js and one other)
- Users can select template and export UPDL projects
- Publication generates valid output for target platforms
- Published projects accessible via clean URLs
- Embedding works correctly
- Version control prevents breaking published projects
- Documentation includes template development guide

### Phase 7: Advanced Features and Scaling (Optional/Future)

**Scope:**
Advanced features for scaling and enterprise use:

**Multiplayer Infrastructure:**
- multiplayer-colyseus-srv or alternative
- Real-time networking
- State synchronization
- Player connection management
- Integration with templates that support multiplayer

**Performance and Scaling:**
- Load testing infrastructure (Artillery or k6)
- Performance monitoring and metrics
- Caching strategies
- CDN integration for published projects
- Database query optimization

**Advanced Collaboration:**
- Real-time collaborative editing
- Conflict resolution
- Version control for spaces
- Team management features

**Extended Internationalization:**
- Additional language support beyond EN/RU
- RTL language support
- Cultural localization

**Dependencies:** Phase 6 complete

**Success Criteria:**
- Multiplayer works reliably with low latency
- System handles expected load with acceptable performance
- Real-time collaboration prevents data loss
- Additional languages fully supported
- Performance benchmarks met

### Phase Dependencies Summary

```
Phase 1 (Foundation: Setup, Turborepo, Types)
    ↓
Phase 2 (Core Infrastructure: Auth, DB, Utils, Profile)
    ↓
Phase 3 (Workspace & First Domain: Uniks → Clusters)
    ↓
Phase 4 (Additional Domains: Metaverses, Spaces, Analytics)
    ↓
Phase 5 (UPDL & Visual Programming: Nodes, Space Builder)
    ↓
Phase 6 (Templates & Publication: Export, Share)
    ↓
Phase 7 (Advanced Features: Multiplayer, Scaling) [Optional]
```

### Implementation Principles
- **ALL functionality MUST be implemented in packages/ directory** - No exceptions for feature code
- Each phase builds on previous phases without breaking existing functionality
- New domains should reuse patterns from Clusters wherever possible (minimum 70% pattern reuse)
- Advanced features integrate with but don't replace core domain functionality
- Maintain consistency in package structure, naming, and architecture across all phases
- Each phase requires full testing and documentation before proceeding to next
- Breaking changes require major version bump and migration guide
- Templates must be modular and independently maintainable
- Publication system must be template-agnostic
- **Frontend and backend MUST be in separate packages** when both are needed for a feature

**Version**: 1.4.0 | **Ratified**: 2025-11-17 | **Last Amended**: 2025-11-17
