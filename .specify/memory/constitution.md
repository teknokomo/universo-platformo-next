<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 1.1.0
Reason: Enhanced requirements based on comprehensive checklist review

Modified Principles:
  - Enhanced Technology Stack Requirements with specific versions
  - Added Version Management section
  - Expanded Prohibited Patterns with legacy pattern examples
  - Enhanced Code Review Requirements section
  - Expanded Feature Development Roadmap with dependencies and success criteria

Added Sections:
  - Version Management (dependency versioning, security updates)
  - Code Review Requirements (qualifications, checklist, process, conflict resolution)
  - Phase Dependencies Summary
  - Domain-Specific Characteristics for each phase

Templates Status:
  ✅ plan-template.md - Reviewed, aligned with constitution principles
  ✅ spec-template.md - Reviewed, aligned with constitution principles
  ✅ tasks-template.md - Reviewed, aligned with constitution principles
  ✅ .github/instructions/github-issues.md - Reviewed, aligned
  ✅ .github/instructions/github-labels.md - Reviewed, aligned
  ✅ .github/instructions/github-pr.md - Reviewed, aligned
  ✅ .github/instructions/i18n-docs.md - Reviewed, aligned

Follow-up TODOs:
  - Validate specification aligns with enhanced constitution
  - Update checklists to reflect addressed gaps
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

- **Framework**: Next.js 14.x or latest stable with App Router
- **Language**: TypeScript (strict mode enabled)
- **Package Manager**: PNPM 8.x or higher (workspaces)
- **Runtime**: Node.js 18.x or higher
- **Database**: Supabase (with abstraction for future alternatives including PostgreSQL, MySQL, MongoDB)
- **Authentication**: Passport.js with Supabase connector (or compatible Supabase authentication strategy)
- **UI Framework**: Material UI (MUI) 5.x or latest stable
- **State Management**: Next.js native patterns (Server/Client Components, Server Actions)
- **Testing**: Jest, Vitest, or compatible testing framework with React Testing Library

### Technology Guidelines

- Leverage Next.js Server Components for data fetching where possible
- Use Client Components only when interactive state or browser APIs are required
- Implement API routes in Next.js App Router structure (`app/api/`)
- Follow Next.js best practices for routing, layouts, and middleware
- Use MUI theming and component system consistently across the application
- Implement authentication middleware using Passport.js patterns
- All database access must go through the abstraction layer in `base/` directories
- Environment variables must be typed and validated in TypeScript
- Security vulnerabilities must be addressed before merging to main branch

### Version Management

- **Dependency Versioning**: Use exact versions for critical dependencies, ranges (^) for minor updates
- **Security Updates**: Critical security patches must be applied within 48 hours of disclosure
- **Major Upgrades**: Major version upgrades require specification, testing, and team review
- **Dependency Audits**: Run `pnpm audit` before every release and address high/critical issues

### Prohibited Patterns

- Do NOT create separate `docs/` directory (documentation lives in external repository)
- Do NOT create AI agent configuration files or directories (`.github/agents/`, `.github/prompts/`, etc.) - users will create these themselves as needed
  - **Note**: Existing AI agent files in `.github/agents/` and `.github/prompts/` are grandfathered and maintained by project administrators
  - This prohibition applies only to new AI-generated agent configuration files created by automated processes
- Do NOT copy legacy patterns from Universo Platformo React without evaluation
  - **Legacy Patterns to Avoid**: 
    - Mixing Flowise legacy code with new implementations
    - React-specific state management patterns that don't translate to Next.js
    - Client-side data fetching where Server Components would be more appropriate
    - Monolithic package structures that should be split into -frt/-srv
- Do NOT bypass the database abstraction layer for quick fixes
- Do NOT mix JavaScript and TypeScript in the same package
- Do NOT use Pages Router patterns in an App Router project
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
- Basic monorepo structure with PNPM
- Development tooling (TypeScript, ESLint, Prettier, Testing)
- Next.js 14 App Router configuration
- Bilingual documentation framework
- GitHub workflow templates (Issues, PRs, Labels)
- Environment configuration setup
- MUI and authentication configuration (not full implementation)
- Database abstraction layer design

**Dependencies:** None (foundational phase)

**Success Criteria:**
- Developer can clone, install, and run project in under 10 minutes
- All configuration files present and validated
- Documentation complete in both languages
- Tests pass, linting passes, TypeScript compiles without errors
- Can create new packages following established patterns

### Phase 2: Core Infrastructure

**Scope:**
- Full authentication system implementation (Passport.js + Supabase)
- Database abstraction layer implementation with Supabase
- Material UI theming and component library full setup
- Basic routing and layout structure in Next.js
- User management and session handling
- Authorization middleware
- Comprehensive test coverage for core functionality

**Dependencies:** Phase 1 complete

**Success Criteria:**
- Users can authenticate with Supabase credentials
- Database operations work through abstraction layer
- MUI components render correctly in Server and Client Components
- Protected routes enforce authentication
- All core infrastructure has >80% test coverage

### Phase 3: First Domain - Clusters

**Scope:**
Implement the first complete functional domain as a template for others:
- **Clusters**: Top-level organizational units
- **Domains**: Sub-units within Clusters  
- **Resources**: Items within Domains

This three-tier entity structure serves as the architectural pattern for other features.

**Dependencies:** Phase 2 complete (requires auth, database, UI framework)

**Success Criteria:**
- Users can create, read, update, delete Clusters
- Three-tier hierarchy (Clusters → Domains → Resources) fully functional
- CRUD operations work with proper authorization
- UI implements consistent patterns reusable for other domains
- API follows RESTful conventions
- Package structure (-frt/-srv with base/) demonstrated

**Domain-Specific Characteristics:**
- Clusters are the top-level organizational primitive
- Each Cluster can contain multiple Domains
- Each Domain can contain multiple Resources
- Authorization: Users can be members of Clusters with different roles

### Phase 4: Additional Domains

**Scope:**
Replicate the Clusters pattern for related domains:

**Metaverses Domain:**
- **Metaverses**: Virtual world containers (similar to Clusters)
- **Sections**: Areas within Metaverses (similar to Domains)
- **Entities**: Objects within Sections (similar to Resources)
- Domain-specific features: 3D positioning, spatial relationships

**Uniks (Uniques) Domain:**
- Multi-tier entity management with potentially more complex hierarchies
- May have more than three tiers depending on requirements
- Domain-specific features: Uniqueness constraints, versioning

Each domain follows the established frontend (-frt) and backend (-srv) package pattern with base/ directories.

**Dependencies:** Phase 3 complete (Clusters provides the template)

**Success Criteria:**
- Metaverses and Uniks domains fully functional
- Patterns from Clusters successfully reused (>70% code pattern reuse)
- New domains integrate seamlessly with authentication and authorization
- Performance acceptable (response times < 500ms for standard operations)
- Documentation updated for each new domain

**Domain-Specific Differences:**
- Metaverses include spatial/3D concepts not present in Clusters
- Uniks may have validation rules around uniqueness
- Some domains may share relationships (e.g., Clusters can contain Metaverses)

### Phase 5: Advanced Features

**Scope:**
Build sophisticated functionality on top of the foundation:
- **Spaces** and **Canvases**: Visual editing environments for creating workflows
- **LangChain Graph System**: Node-based workflow editor for AI chains
- **UPDL Nodes** (Universo Platformo Definition Language): Custom node types for platform-specific operations
- Advanced integrations and plugins
- Real-time collaboration features
- Advanced analytics and monitoring

**Dependencies:** Phase 4 complete (requires all core domains)

**Success Criteria:**
- Users can create and edit visual workflows in Canvases
- LangChain nodes execute correctly with proper error handling
- UPDL nodes provide platform-specific operations
- Real-time updates work across multiple users
- System scales to support expected user load
- Advanced features integrate without breaking core functionality

### Phase Dependencies Summary

```
Phase 1 (Foundation)
    ↓
Phase 2 (Core Infrastructure)
    ↓
Phase 3 (Clusters - First Domain)
    ↓
Phase 4 (Additional Domains)
    ↓
Phase 5 (Advanced Features)
```

### Implementation Principles
- Each phase builds on previous phases without breaking existing functionality
- New domains should reuse patterns from Clusters wherever possible (minimum 70% pattern reuse)
- Advanced features integrate with but don't replace core domain functionality
- Maintain consistency in package structure, naming, and architecture across all phases
- Each phase requires full testing and documentation before proceeding to next
- Breaking changes require major version bump and migration guide

**Version**: 1.1.0 | **Ratified**: 2025-11-15 | **Last Amended**: 2025-11-16
