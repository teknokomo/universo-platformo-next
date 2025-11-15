<!--
SYNC IMPACT REPORT
==================
Version Change: UNVERSIONED → 1.0.0
Reason: Initial constitution ratification for Universo Platformo Next project

Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (7 principles)
  - Technology Stack Requirements
  - Development Workflow
  - Governance

Templates Status:
  ✅ plan-template.md - Reviewed, aligned with constitution principles
  ✅ spec-template.md - Reviewed, aligned with constitution principles
  ✅ tasks-template.md - Reviewed, aligned with constitution principles
  ✅ .github/instructions/github-issues.md - Reviewed, aligned
  ✅ .github/instructions/github-labels.md - Reviewed, aligned
  ✅ .github/instructions/github-pr.md - Reviewed, aligned
  ✅ .github/instructions/i18n-docs.md - Reviewed, aligned

Follow-up TODOs: None
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

The project MUST be structured as a monorepo managed with PNPM. All packages reside in the `packages/` directory. This ensures:
- Unified dependency management across all modules
- Simplified version control and atomic commits
- Efficient workspace sharing and build optimization
- Clear separation of concerns between functional domains

**Rationale**: Monorepo structure with PNPM provides the foundation for managing complex multi-package architecture while maintaining development efficiency and preventing dependency conflicts.

### II. Package Separation Pattern

Functional modules MUST be split into separate frontend and backend packages when both are required:
- Frontend packages use `-frt` suffix (e.g., `packages/clusters-frt`)
- Backend packages use `-srv` suffix (e.g., `packages/clusters-srv`)
- Each package MUST contain a `base/` directory for future multi-implementation support
- Packages that only need one side (frontend or backend) may omit the suffix

**Rationale**: Clear separation enables independent scaling, deployment, and technology choices while the base directory pattern allows for multiple database or framework implementations in the future.

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

- **Framework**: Next.js (latest stable) with App Router
- **Language**: TypeScript (strict mode)
- **Package Manager**: PNPM (workspaces)
- **Database**: Supabase (with abstraction for future alternatives)
- **Authentication**: Passport.js with Supabase connector (or compatible Supabase authentication strategy)
- **UI Framework**: Material UI (MUI)
- **State Management**: Next.js native patterns (Server/Client Components)

### Technology Guidelines

- Leverage Next.js Server Components for data fetching where possible
- Use Client Components only when interactive state is required
- Implement API routes in Next.js App Router structure
- Follow Next.js best practices for routing, layouts, and middleware
- Use MUI theming and component system consistently across the application
- Implement authentication middleware using Passport.js patterns

### Prohibited Patterns

- Do NOT create separate `docs/` directory (documentation lives in external repository)
- Do NOT create AI agent configuration files or directories (`.github/agents/`, `.github/prompts/`, etc.) - users will create these themselves as needed
- Do NOT copy legacy patterns from Universo Platformo React without evaluation
- Do NOT bypass the database abstraction layer for quick fixes
- Do NOT mix JavaScript and TypeScript in the same package

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
- All tests pass
- TypeScript compilation succeeds with no errors
- ESLint and Prettier checks pass
- Both English and Russian documentation updated
- No new dependencies added without security review
- Constitution principles not violated

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
- Repository setup and configuration
- Basic monorepo structure with PNPM
- Development tooling (TypeScript, ESLint, Prettier)
- Bilingual documentation framework
- GitHub workflow templates

### Phase 2: Core Infrastructure
- Base authentication system (Passport.js + Supabase)
- Database abstraction layer
- Material UI theming and component library setup
- Basic routing and layout structure in Next.js

### Phase 3: First Domain - Clusters
Implement the first complete functional domain as a template for others:
- **Clusters**: Top-level organizational units
- **Domains**: Sub-units within Clusters  
- **Resources**: Items within Domains

This three-tier entity structure serves as the architectural pattern for other features.

### Phase 4: Additional Domains
Replicate the Clusters pattern for related domains:
- **Metaverses**: Metaverses / Sections / Entities
- **Uniks** (Uniques): Multi-tier entity management with potentially more complex hierarchies

Each domain follows the established frontend (-frt) and backend (-srv) package pattern with base/ directories.

### Phase 5: Advanced Features
Build sophisticated functionality on top of the foundation:
- **Spaces** and **Canvases**: Visual editing environments
- **LangChain Graph System**: Node-based workflow editor for AI chains
- **UPDL Nodes** (Universo Platformo Definition Language): Custom node types for platform-specific operations
- Advanced integrations and plugins

### Implementation Principles
- Each phase builds on previous phases without breaking existing functionality
- New domains should reuse patterns from Clusters wherever possible
- Advanced features integrate with but don't replace core domain functionality
- Maintain consistency in package structure, naming, and architecture across all phases

**Version**: 1.0.0 | **Ratified**: 2025-11-15 | **Last Amended**: 2025-11-15
