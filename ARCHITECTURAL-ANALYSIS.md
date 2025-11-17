# Architectural Analysis: universo-platformo-react vs universo-platformo-next

## Executive Summary

This document provides a comprehensive comparison between the React implementation (universo-platformo-react) and the planned Next.js implementation (universo-platformo-next), identifying architectural patterns, best practices, and missing elements that should be incorporated into the Next.js version.

**Analysis Date**: 2025-11-17
**React Version Analyzed**: 0.38.0-alpha
**Next.js Target Version**: Foundation Phase (Phase 1)

## 1. Repository Structure and Organization

### 1.1 Monorepo Architecture

**React Implementation:**
- Uses PNPM workspaces with turborepo for build orchestration
- Clear package separation with naming conventions
- Comprehensive package structure with 33+ packages

**Next.js Current State:**
- PNPM workspace configured
- Basic structure defined in constitution
- No packages created yet

**Recommendations:**
1. Adopt turborepo for build optimization (missing in current spec)
2. Define clear package structure early
3. Document package README template conventions

### 1.2 Package Naming and Organization

**React Implementation Patterns:**
- Frontend packages: `*-frt` suffix (e.g., `clusters-frt`, `metaverses-frt`)
- Backend packages: `*-srv` suffix (e.g., `clusters-srv`, `metaverses-srv`)
- Shared packages: domain-based naming (e.g., `universo-types`, `universo-utils`)
- Template packages: `template-*` prefix (e.g., `template-quiz`, `template-mmoomm`)
- Legacy packages: `flowise-*` prefix (being phased out)
- Each package contains `base/` directory for implementation

**Next.js Alignment:**
✅ Already documented in constitution
- Uses same `-frt` and `-srv` suffix convention
- Requires `base/` directory pattern
- Supports single-sided packages without suffix

**Missing Elements:**
1. Template package naming convention not explicitly mentioned
2. Shared utility package conventions not detailed
3. No guidance on legacy code handling patterns

### 1.3 Directory Structure within Packages

**React Implementation Standard Structure:**
```
package-name/
└── base/
    ├── src/
    │   ├── api/          # API clients (frontend)
    │   ├── assets/       # Static resources
    │   ├── components/   # React components (frontend)
    │   ├── routes/       # Express routes (backend)
    │   ├── services/     # Business logic (backend)
    │   ├── database/     # TypeORM entities (backend)
    │   ├── i18n/         # Internationalization
    │   └── index.ts      # Entry point
    ├── dist/             # Compiled output
    ├── package.json
    ├── tsconfig.json
    ├── gulpfile.ts       # (legacy) or tsdown config
    ├── README.md
    └── README-RU.md
```

**Next.js Current State:**
- General structure acknowledged
- Specific directory conventions not documented

**Recommendations:**
1. Document standard package directory structure in constitution
2. Create package template or scaffolding tool
3. Define when to use specific directories (api/, components/, routes/, etc.)

## 2. Build System and Tooling

### 2.1 Build Tool Evolution

**React Implementation:**
- **Modern (tsdown)**: Used in 17+ packages for dual CJS+ESM output
- **Legacy (tsc+gulp)**: Still used in some packages (profile-frt, publish-frt)
- **Turborepo**: Orchestrates builds across monorepo
- **Migration strategy**: Gradually moving from gulp to tsdown

**Tools Used:**
- tsdown v0.15.7 (Rolldown + Oxc based bundler)
- TypeScript compilation
- Asset handling (SVG, CSS, etc.)
- Dual output: CommonJS + ES Modules + TypeScript declarations

**Next.js Current State:**
- No build system specified beyond "TypeScript, ESLint, Prettier"
- No mention of monorepo build orchestration
- No dual build strategy documented

**Recommendations:**
1. **Add turborepo** to technology stack for monorepo build orchestration
2. **Specify build output strategy**: CJS vs ESM vs both
3. **Document asset handling**: How to manage SVG, images, CSS in packages
4. **Add build scripts**: Standard package.json scripts for build/dev/test
5. Consider Next.js-specific build requirements for packages

## 2.2 Package Build Configurations

**React Standard Scripts:**
```json
{
  "scripts": {
    "build": "tsdown",
    "dev": "tsdown --watch",
    "clean": "rimraf dist"
  }
}
```

**Recommendations:**
1. Define standard package.json scripts template
2. Document build output requirements (dist/ structure)
3. Specify TypeScript compiler options for packages

## 3. Shared Infrastructure Packages

### 3.1 Type System

**React Implementation:**
- **@universo/types**: Centralized type definitions
  - UPDL interfaces
  - Platform types
  - Shared types for API communication
  - Dual build (CJS + ESM)

**Next.js Current State:**
- No shared types package mentioned
- TypeScript strict mode required

**Recommendations:**
1. **Create @universo/types package** early in Phase 1
2. Include in foundation specification
3. Define type organization:
   - Core platform types
   - API request/response types
   - Database entity types
   - Component prop types

### 3.2 Utility Functions

**React Implementation:**
- **@universo/utils**: Shared utilities
  - UPDLProcessor (converts flow data to UPDL)
  - Multi-scene support
  - Template-agnostic processing
  - Dual build

**Next.js Current State:**
- No shared utilities package mentioned

**Recommendations:**
1. **Add @universo/utils package** to roadmap
2. Include in Phase 2 (Core Infrastructure)
3. Define utility categories:
   - Data processing
   - Validation helpers
   - Date/time utilities
   - String manipulation

### 3.3 API Client

**React Implementation:**
- **@universo/api-client**: TypeScript API client
  - Type-safe API clients
  - Axios-based HTTP communication
  - Error handling and retry logic
  - Request/response type definitions

**Next.js Current State:**
- No API client package mentioned
- No HTTP client strategy documented

**Recommendations:**
1. **Create @universo/api-client package** in Phase 2
2. Consider Next.js-specific patterns:
   - Server Components data fetching
   - Client Components API calls
   - Route handlers integration
3. Document HTTP client choice (fetch vs axios)

### 3.4 Internationalization (i18n)

**React Implementation:**
- **@universo/i18n**: Centralized i18next instance
  - Shared i18next configuration
  - Translation file management
  - Language detection and switching
  - Namespace support

**Next.js Current State:**
- Bilingual documentation mandated
- No i18n package mentioned
- No runtime i18n strategy documented

**Recommendations:**
1. **Critical: Add @universo/i18n package** to Phase 1 or 2
2. Consider Next.js i18n patterns:
   - App Router i18n routing
   - Server Components localization
   - Client Components translation
3. Document translation file structure
4. Define namespace conventions

## 4. Authentication Architecture

### 4.1 React Implementation Details

**Packages:**
- **@universo/auth-frt**: Frontend authentication primitives
  - LoginForm, SessionGuard components
  - React hooks for auth state
  - Session-based auth UI
  - Dual build (CJS + ESM + Types)

- **@universo/auth-srv**: Backend authentication
  - Passport.js strategies (local, JWT)
  - Supabase session management
  - Session middleware for Express
  - Login/logout/session validation routes
  - Dual build (CJS + ESM)

**Architecture:**
- Passport.js + Supabase integration
- Session-based authentication
- JWT support
- Middleware patterns for route protection

**Next.js Current State:**
- Passport.js + Supabase mentioned in constitution
- Configuration documented in spec
- **No implementation details for Next.js patterns**
- Phase 1: Configuration only, Phase 2: Full implementation

**Critical Gap:**
The Next.js authentication approach needs significant adaptation:

**Recommendations:**
1. **Re-evaluate Passport.js for Next.js**:
   - Passport.js is Express-centric
   - Next.js App Router uses different patterns
   - Consider Next-Auth or Supabase Auth Helpers for Next.js

2. **Define Next.js-specific auth patterns**:
   - Server Components: `getServerSession()`
   - Client Components: `useSession()`
   - Route Handlers: Middleware patterns
   - Server Actions: Authentication context

3. **Create Next.js auth packages**:
   - @universo/auth-nextjs (server-side utilities)
   - @universo/auth-components (client components)
   - Integrate with Supabase Auth Helpers

4. **Document authentication flows**:
   - Login flow with Server Actions
   - Session management in App Router
   - Protected routes pattern
   - API route protection

5. **Update Phase 2 requirements** to include:
   - Next.js-specific authentication implementation
   - Migration from Passport.js concepts to Next.js patterns
   - Clear integration with Supabase

## 5. UI Framework and Component Library

### 5.1 Material-UI Integration

**React Implementation:**
- **@flowise/template-mui**: Unbundled MUI components (17MB CJS, 5.2MB ESM)
  - Layout, Dialogs, Forms, Cards, Pagination
  - Theme configurations
  - Extracted from flowise-ui monolith
  - Raw .tsx file distribution

- **@universo/template-mui**: Universo-specific MUI templates
  - Reusable layout components
  - Consistent theme configurations
  - Responsive design patterns

**Architecture Details:**
- MUI v6 with ColorScheme API for dark mode
- Custom theme configurations
- Component extraction pattern for reusability

**Next.js Current State:**
- MUI v5 or latest mentioned
- Theme configuration mentioned
- **No component library structure defined**
- **No guidance on MUI + Next.js App Router patterns**

**Critical Gap:**
MUI integration with Next.js App Router requires specific setup:

**Recommendations:**
1. **Document MUI + Next.js App Router integration**:
   - CSS-in-JS configuration for App Router
   - Emotion cache setup
   - Server/Client Component usage patterns
   - Font optimization

2. **Create @universo/mui-config package**:
   - Theme provider setup for Next.js
   - Emotion cache configuration
   - Server Component compatibility helpers

3. **Define component library strategy**:
   - When to create shared components
   - Package structure for UI library
   - Documentation requirements

4. **Update Phase 1 specification**:
   - Add specific Next.js + MUI setup instructions
   - Include CSS-in-JS configuration
   - Document Server vs Client Component usage with MUI

### 5.2 Shared UI Components

**React Implementation:**
- **@flowise/chatmessage**: Reusable chat components
  - 7 chat components
  - Streaming support
  - Audio recording
  - File upload
  - Eliminated ~7692 lines of duplication

- **@flowise/store**: Shared Redux store
  - Centralized state management
  - Redux Toolkit integration
  - Reusable slices

**Next.js Considerations:**
- Next.js App Router prefers Server Components and Server State
- Redux may not be the best fit for Next.js patterns
- Consider React Server Components for state management

**Recommendations:**
1. **Re-evaluate state management strategy**:
   - Server Components for server state
   - Client Components for interactive state
   - Consider Zustand or Jotai for client state (lighter than Redux)
   - Document when to use each pattern

2. **Plan for shared components**:
   - Create @universo/components package in Phase 3
   - Define component categorization
   - Document Server vs Client Component guidelines

## 6. Database and ORM Architecture

### 6.1 TypeORM Integration

**React Implementation:**
- **TypeORM 0.3.20+** for PostgreSQL only
- Entity and migration registry system
- Asynchronous route initialization (prevents race conditions)
- Database-specific code in `base/` directories

**Patterns:**
```typescript
// Entity example
packages/clusters-srv/base/src/database/entities/Cluster.ts
packages/clusters-srv/base/src/database/migrations/

// Route initialization waits for DB connection
await initDatabase();
await registerRoutes();
```

**Next.js Current State:**
- Database abstraction layer mentioned
- Supabase primary database
- Support for PostgreSQL, MySQL, MongoDB planned
- **No ORM choice specified**
- **No entity management pattern defined**

**Critical Gap:**
Next.js database patterns differ significantly from Express:

**Recommendations:**
1. **Evaluate ORM choices for Next.js**:
   - **Prisma**: Excellent Next.js integration, type-safe, migrations
   - **Drizzle ORM**: Lightweight, TypeScript-first
   - **TypeORM**: Can work but requires careful setup
   - **Supabase Client**: For direct Supabase integration

2. **Define database access patterns**:
   - Server Components: Direct database access
   - Client Components: API route access only
   - Server Actions: Database mutations
   - Route Handlers: API endpoints

3. **Create database abstraction layer design**:
   - Interface-based repository pattern
   - Database-specific implementations in `base/`
   - Separate concerns: queries, mutations, migrations

4. **Document database package structure**:
```
@universo/database/
  base/
    src/
      client/       # Database client setup
      repositories/ # Data access repositories
      migrations/   # Database migrations
      types/        # Database types
```

5. **Update constitution**: Add specific ORM choice and patterns

### 6.2 Migration Strategy

**React Implementation:**
- TypeORM migrations in each package's `database/migrations/`
- Migration registry system
- Coordinated migration execution

**Recommendations:**
1. Define migration strategy early
2. Document migration file location and naming
3. Create migration execution workflow
4. Plan for multi-database support in migrations

## 7. Domain-Driven Package Structure

### 7.1 Core Domains Identified

**React Implementation has these domains:**

1. **Uniks (Workspace Management)**
   - uniks-frt, uniks-srv
   - Workspace creation and management
   - User-workspace relationships

2. **Clusters**
   - clusters-frt, clusters-srv
   - Three-tier: Clusters → Domains → Resources

3. **Metaverses**
   - metaverses-frt, metaverses-srv
   - Three-tier: Metaverses → Sections → Entities
   - 3D positioning, spatial relationships

4. **Spaces (Canvas Management)**
   - spaces-frt, spaces-srv
   - Flow/canvas management
   - Integration with React Flow

5. **Profile**
   - profile-frt, profile-srv
   - User profile management
   - JWT token-based auth with Supabase

6. **Analytics**
   - analytics-frt
   - Quiz analytics dashboard
   - Data visualization

7. **Space Builder (Prompt-to-Flow)**
   - space-builder-frt, space-builder-srv
   - Natural language to flow graph
   - LLM integration
   - UPDL node generation

8. **Publish**
   - publish-frt, publish-srv
   - UPDL to AR.js/PlayCanvas export
   - Template registry system
   - Publication URLs

9. **UPDL (Universal Platform Definition Language)**
   - updl package
   - Node definitions for 3D/AR/VR
   - 7 core high-level nodes
   - Legacy nodes for compatibility

10. **Template Packages**
    - template-quiz (AR.js quizzes)
    - template-mmoomm (PlayCanvas MMO)

11. **Multiplayer**
    - multiplayer-colyseus-srv
    - Colyseus integration
    - Real-time networking

**Next.js Current State:**
- Phase 3: Clusters mentioned as first domain
- Phase 4: Metaverses and Uniks mentioned
- Phase 5: Spaces, Canvases, LangChain, UPDL mentioned
- **No mention of**: Profile, Analytics, Space Builder, Publish, Templates, Multiplayer

**Critical Missing Domains:**
1. **Profile Management** - Essential for user functionality
2. **Space Builder (AI-assisted development)** - Key differentiator
3. **Publish System** - Required for deploying projects
4. **Template System** - Enables multi-platform export
5. **Analytics** - Important for user insights

**Recommendations:**
1. **Update Phase 2 (Core Infrastructure)** to include:
   - Profile management package
   - User management beyond authentication

2. **Update Phase 3** to include:
   - Not just Clusters, but also Uniks (workspace management)
   - Uniks should potentially come BEFORE Clusters (workspaces contain clusters)

3. **Revise Phase 4** to include:
   - Metaverses
   - Analytics (for user engagement tracking)

4. **Expand Phase 5** to explicitly mention:
   - Space Builder (AI-assisted flow generation)
   - Publish system (UPDL export)
   - Template registry system
   - Multiplayer infrastructure (if needed)

5. **Add Phase 6: Templates and Export** (new phase):
   - Template package architecture
   - AR.js exporter templates
   - Other platform exporters
   - Publication URL system

### 7.2 Domain Implementation Pattern

**React Pattern for Three-Tier Domains:**
```
Domain Package Structure:
- Top Level Entity (e.g., Cluster, Metaverse)
  - Middle Level Entity (e.g., Domain, Section)
    - Bottom Level Entity (e.g., Resource, Entity)

Each level has:
- CRUD operations
- Authorization rules
- Relationships to parent/children
- TypeORM entities
- Express routes
- React components
```

**Recommendations:**
1. Document this three-tier pattern explicitly in constitution
2. Create scaffolding template for new domains
3. Define when to use 2-tier vs 3-tier vs other structures
4. Plan for domains with different hierarchies (Uniks may have more levels)

## 8. Documentation Standards

### 8.1 Package Documentation

**React Implementation:**
- Every package has README.md and README-RU.md
- TEMPLATE-README.md and TEMPLATE-README-GUIDE.md in packages/
- Structured documentation format:
  - Overview
  - Key Features
  - Installation
  - Usage
  - API Reference
  - Architecture
  - Development

**Next.js Current State:**
- Bilingual documentation mandated
- English primary, Russian exact translation
- Same structure required
- **No package README template provided**
- **No documentation structure defined**

**Recommendations:**
1. **Create package README templates** in Phase 1:
   - Place in `.specify/templates/` or `.github/templates/`
   - Include both README.md and README-RU.md templates
   - Define required sections

2. **Add to .github/instructions/**:
   - package-readme.md (how to document packages)
   - Define documentation quality standards
   - Include examples

3. **Document architecture diagrams**:
   - Flow diagrams for data flow
   - Component hierarchy
   - API interaction patterns

### 8.2 API Documentation

**React Implementation:**
- **universo-rest-docs**: API documentation server
  - OpenAPI/Swagger specifications
  - Interactive API documentation
  - Auto-generated from TypeScript types

**Next.js Current State:**
- No API documentation strategy mentioned

**Recommendations:**
1. **Add API documentation package** to Phase 2:
   - Next.js Route Handler documentation
   - Server Actions documentation
   - Consider OpenAPI for REST APIs
   - TypeDoc for TypeScript APIs

2. **Define documentation generation**:
   - Automated from TypeScript types
   - Examples and usage guides
   - Authentication requirements

## 9. Testing Infrastructure

### 9.1 React Implementation

**Testing Approach:**
- Jest or Vitest mentioned
- React Testing Library
- Testing across multiple packages
- No specific test structure documented in README

**Next.js Current State:**
- Testing framework configuration mentioned (Jest, Vitest, or similar)
- Example tests for Server Components, Client Components, API routes
- Test coverage reporting
- Testing patterns documented
- **No specifics on package-level testing**

**Recommendations:**
1. **Define package testing structure**:
```
package-name/
  base/
    src/
      __tests__/
        unit/
        integration/
    test/
      fixtures/
      mocks/
```

2. **Add testing guidelines**:
   - How to test Server Components
   - How to test Client Components
   - How to test Server Actions
   - How to test Route Handlers
   - Mocking Supabase client
   - Database testing patterns

3. **Document test naming conventions**:
   - File naming: `*.test.ts`, `*.spec.ts`
   - Test description patterns
   - Coverage requirements per package

4. **Add to constitution**:
   - Minimum coverage requirements (80%?)
   - Required test types per package
   - CI/CD test requirements

## 10. Development Workflow and Tooling

### 10.1 Git Hooks and Pre-commit

**React Implementation:**
- **.husky**: Git hooks directory
  - Pre-commit hooks for linting/formatting
  - Commit message validation
  - Automated quality checks

**Next.js Current State:**
- Pre-commit hooks MAY be configured (FR-072)
- Not required, only optional

**Recommendations:**
1. **Make pre-commit hooks required**:
   - ESLint
   - Prettier
   - TypeScript type checking
   - Test execution

2. **Add husky setup** to Phase 1:
   - Install and configure husky
   - Define commit message format
   - Add commit hooks documentation

### 10.2 Docker Support

**React Implementation:**
- Dockerfile at root
- .dockerignore file
- docker/ directory with additional configurations

**Next.js Current State:**
- No Docker support mentioned

**Recommendations:**
1. **Add Docker support** to Phase 1 or Phase 2:
   - Dockerfile for Next.js
   - docker-compose.yml for local development
   - Environment configuration for containers
   - Documentation for Docker deployment

2. **Document containerization strategy**:
   - Development containers
   - Production containers
   - Multi-stage builds
   - Environment variable management

### 10.3 Load Testing

**React Implementation:**
- artillery-load-test.yml file
- Performance testing infrastructure

**Next.js Current State:**
- No performance testing mentioned

**Recommendations:**
1. **Add performance testing** to Phase 2:
   - Load testing configuration
   - Performance benchmarks
   - Monitoring setup

## 11. Security Practices

### 11.1 React Implementation

**Files:**
- SECURITY.md with vulnerability reporting
- Security scanning for dependencies
- Supabase SECURITY DEFINER SQL functions

**Patterns:**
- Secure environment variable handling
- SQL injection prevention via TypeORM
- Secure session management
- Custom SQL functions with SECURITY DEFINER for safe updates

**Next.js Current State:**
- Security scanning for dependencies (FR-064)
- No security vulnerabilities allowed (FR-065)
- Environment files in .gitignore (FR-066)
- **No SECURITY.md mentioned**
- **No detailed security patterns documented**

**Recommendations:**
1. **Create SECURITY.md** in Phase 1:
   - Vulnerability reporting process
   - Security best practices
   - Contact information
   - Responsible disclosure policy

2. **Document Next.js security patterns**:
   - Server Actions security
   - Route Handler authentication
   - CSRF protection
   - XSS prevention
   - SQL injection prevention
   - Environment variable security

3. **Add security review checklist**:
   - Pre-deployment security checks
   - Dependency audit process
   - Secret management
   - API security

## 12. Missing Architectural Patterns

### 12.1 Template Registry System

**React Implementation:**
The Publish system uses a sophisticated template registry:

```typescript
// Template registration
registerTemplate('arjs-quiz', QuizTemplate);
registerTemplate('playcanvas-mmoomm', MMOOMMTemplate);

// Dynamic template loading
const template = getTemplate(templateType);
const output = await template.build(updlData);
```

**Benefits:**
- Modular template packages
- Dynamic template discovery
- Easy addition of new export targets
- Separation of concerns

**Next.js Current State:**
- Not mentioned

**Recommendations:**
1. **Add template system** to Phase 5 or new Phase 6
2. **Define template interface**:
```typescript
interface PlatformTemplate {
  name: string;
  version: string;
  supportedNodes: string[];
  build(updl: UPDLData): Promise<BuildOutput>;
  validate(updl: UPDLData): ValidationResult;
}
```
3. **Document template package structure**
4. **Create template development guide**

### 12.2 UPDL Processing Architecture

**React Implementation:**
- **UPDLProcessor**: Centralized UPDL processing
- Multi-scene support
- Template-agnostic processing
- Conversion pipeline: Flow Data → UPDL → Platform-specific Output

**Architecture:**
```
Flow Graph (Flowise) 
  → UPDLProcessor (@universo/utils)
    → UPDL Structure (@universo/types)
      → Template Builder (template-*)
        → Platform Output (AR.js, PlayCanvas, etc.)
```

**Next.js Current State:**
- UPDL mentioned in Phase 5
- **No processing architecture defined**
- **No conversion pipeline documented**

**Recommendations:**
1. **Define UPDL processing architecture** in Phase 5
2. **Create @universo/updl-processor package**:
   - Conversion utilities
   - Validation
   - Transformation pipeline
3. **Document UPDL structure**:
   - Node types
   - Relationships
   - Properties
   - Constraints

### 12.3 Publication URL System

**React Implementation:**
- Clean URL structure: `/p/{uuid}`
- Embedding options
- Version support
- Public/private publication
- Supabase storage integration

**Next.js Current State:**
- Not mentioned

**Recommendations:**
1. **Add Publication system** to Phase 5 or 6
2. **Define URL structure for Next.js**:
   - Dynamic routes in App Router
   - Static generation for published projects
   - Edge function deployment options
3. **Document publication workflow**:
   - Create → Build → Validate → Publish → Share

### 12.4 Multiplayer Infrastructure

**React Implementation:**
- **Colyseus server** for real-time multiplayer
- Room management
- State synchronization
- Player connection handling
- Integration with template-mmoomm

**Next.js Current State:**
- Not mentioned

**Recommendations:**
1. **Evaluate multiplayer needs**:
   - Is real-time multiplayer required in initial phases?
   - Can be deferred to later phase if not critical

2. **If needed, add to Phase 5**:
   - Define multiplayer architecture for Next.js
   - Evaluate Colyseus vs alternatives (WebSockets, Socket.io, Partykit)
   - Next.js edge runtime considerations

3. **Document multiplayer patterns**:
   - Connection management
   - State synchronization
   - Conflict resolution
   - Network protocol

## 13. Technology Stack Gaps

### 13.1 Missing Technologies

**React Implementation Uses:**
1. **Turborepo** - Monorepo build orchestration
2. **tsdown** - Modern build tool for dual CJS+ESM output
3. **Husky** - Git hooks
4. **i18next** - Internationalization runtime
5. **TypeORM 0.3.20+** - ORM (PostgreSQL only)
6. **Colyseus** - Multiplayer server
7. **Artillery** - Load testing
8. **Swagger/OpenAPI** - API documentation

**Next.js Current State:**
- Most of these are not mentioned
- Only generic mentions: TypeScript, ESLint, Prettier, Testing framework

**Recommendations:**
1. **Update Technology Stack Requirements in Constitution**:
```markdown
### Mandatory Technologies
- Framework: Next.js 14.x or latest with App Router
- Language: TypeScript (strict mode enabled)
- Package Manager: PNPM 8.x or higher (workspaces)
- Build Orchestration: Turborepo (NEW)
- Package Build Tool: tsdown for dual CJS+ESM output (NEW)
- Runtime: Node.js 18.x or higher
- Database: Supabase (with abstraction for alternatives)
- ORM: [Prisma/Drizzle/TypeORM - TO BE DECIDED] (NEW)
- Authentication: Supabase Auth Helpers for Next.js (UPDATED)
- UI Framework: Material UI (MUI) 6.x or latest
- State Management: Next.js native patterns + [Zustand/Jotai] for client state (UPDATED)
- Testing: Vitest with React Testing Library (SPECIFIED)
- Internationalization: next-intl or i18next for Next.js (NEW)
- API Documentation: TypeDoc + OpenAPI (NEW)
- Git Hooks: Husky (NEW)
- Load Testing: Artillery or k6 (NEW)

### Development Tools
- ESLint
- Prettier
- Docker (containerization)
- TypeDoc (documentation generation)
```

### 13.2 Build Configuration

**React Implementation:**
- Dual build output (CJS + ESM)
- TypeScript declarations
- Asset handling
- Source maps

**Next.js Considerations:**
- Next.js already builds for production
- Packages need dual build for consumption
- Server Components vs Client Components build requirements

**Recommendations:**
1. **Document package build requirements**:
   - Which packages need dual build (CJS+ESM)
   - Which packages are Next.js-only
   - Build output structure requirements

2. **Create build configuration templates**:
   - tsconfig.json template
   - tsdown.config.ts template (if using tsdown)
   - package.json scripts template

## 14. Phasing and Roadmap Adjustments

### 14.1 Current Phase Structure (Next.js)

**Phase 1: Foundation**
- Repository setup
- Monorepo structure
- Development tooling
- Next.js App Router configuration
- Bilingual documentation
- GitHub workflows
- MUI and auth configuration
- Database abstraction design

**Phase 2: Core Infrastructure**
- Authentication implementation
- Database abstraction implementation
- MUI full setup
- Routing and layout
- User management
- Authorization middleware
- Test coverage

**Phase 3: First Domain - Clusters**
- Clusters → Domains → Resources
- CRUD operations
- UI patterns
- Package structure demonstration

**Phase 4: Additional Domains**
- Metaverses
- Uniks

**Phase 5: Advanced Features**
- Spaces and Canvases
- LangChain graph system
- UPDL nodes
- Advanced integrations
- Real-time collaboration
- Analytics

### 14.2 Recommended Phase Structure

Based on React implementation analysis:

**Phase 1: Foundation** (Keep as is, with additions)
- Add: Turborepo setup
- Add: Package README templates
- Add: Husky git hooks
- Add: Docker configuration
- Add: SECURITY.md
- Add: @universo/types package initialization

**Phase 2: Core Infrastructure** (Expand)
- Add: @universo/utils package
- Add: @universo/i18n package
- Add: @universo/api-client package
- Add: Profile management (profile-frt, profile-srv)
- Specify: ORM choice and setup
- Add: API documentation infrastructure
- Update: Next.js-specific auth patterns (not Passport.js)

**Phase 3: Workspace and First Domain** (Reorder)
- **Uniks first** (workspace management)
  - Users need workspaces before creating clusters
  - uniks-frt, uniks-srv
- **Then Clusters** (first three-tier domain)
  - Clusters → Domains → Resources
  - clusters-frt, clusters-srv

**Phase 4: Additional Domains** (Keep, expand)
- Metaverses
- Analytics
- Spaces (canvas management)

**Phase 5: UPDL and Visual Programming** (Focus on core features)
- UPDL node system
- Space Builder (AI-assisted flow generation)
  - space-builder-frt, space-builder-srv
- UPDL processing utilities
- LangChain integration (if still relevant)

**NEW Phase 6: Templates and Publication**
- Template registry system
- Template packages (AR.js, PlayCanvas, etc.)
- Publish system
  - publish-frt, publish-srv
- Publication URL system
- Export and share functionality

**NEW Phase 7: Advanced Features and Scaling** (Optional/Future)
- Multiplayer infrastructure
- Real-time collaboration
- Advanced analytics
- Performance optimization
- Load testing
- Internationalization expansion

## 15. Priority Recommendations

### 15.1 Critical (Must Address Before Phase 1 Completion)

1. **Add Turborepo** to technology stack and Phase 1
2. **Create @universo/types package** structure in Phase 1
3. **Update authentication strategy** for Next.js (move away from Passport.js)
4. **Document MUI + Next.js App Router** integration patterns
5. **Specify ORM choice** for database access
6. **Create package README templates**
7. **Add Husky git hooks** configuration
8. **Create SECURITY.md**

### 15.2 High Priority (Phase 2)

1. **Create @universo/utils package**
2. **Create @universo/i18n package**
3. **Create @universo/api-client package**
4. **Add Profile management** to Phase 2
5. **Document database abstraction** implementation details
6. **Add API documentation** infrastructure
7. **Define package build** standards (dual CJS+ESM)

### 15.3 Medium Priority (Phase 3-4)

1. **Reorder domains**: Uniks before Clusters
2. **Add Analytics** to domain phases
3. **Document three-tier domain pattern**
4. **Create domain scaffolding tools**

### 15.4 Future Priority (Phase 5-7)

1. **Define UPDL processing architecture**
2. **Plan template registry system**
3. **Design publication URL system**
4. **Evaluate multiplayer needs**
5. **Plan for load testing**

## 16. Constitution Updates Required

### 16.1 New Sections to Add

1. **Package Standards**
   - Directory structure requirements
   - README template requirements
   - Build configuration standards
   - Testing requirements per package

2. **Build System**
   - Turborepo usage and configuration
   - Package build requirements (dual output)
   - Asset handling standards

3. **Documentation Standards**
   - Package documentation structure
   - API documentation requirements
   - Architecture diagram requirements

4. **Security Practices**
   - SECURITY.md requirement
   - Security review checklist
   - Vulnerability handling process

5. **Shared Package Standards**
   - When to create shared packages
   - Naming conventions for shared packages
   - Versioning strategy

### 16.2 Sections to Update

1. **Technology Stack Requirements** (Major expansion needed)
2. **Feature Development Roadmap** (Reorder and expand phases)
3. **Development Workflow** (Add git hooks, pre-commit requirements)
4. **Quality Gates** (Add specific checks)

## 17. Specification Updates Required

### 17.1 Phase 1 Specification Updates

**Add User Stories:**
- US10: Developer can use Turborepo for efficient builds
- US11: Developer can create new packages from templates
- US12: Developer can commit with automated quality checks (Husky)
- US13: Developer can deploy using Docker containers
- US14: Developer can report security vulnerabilities

**Add Functional Requirements:**
- FR-073: System MUST use Turborepo for monorepo build orchestration
- FR-074: Packages MUST provide dual build output (CJS + ESM + Types) where applicable
- FR-075: System MUST include Husky git hooks for pre-commit checks
- FR-076: System MUST include Docker configuration for containerized deployment
- FR-077: System MUST include SECURITY.md with vulnerability reporting process
- FR-078: System MUST include package README templates in both languages
- FR-079: @universo/types package MUST be created for shared type definitions

**Add Success Criteria:**
- SC-031: Turborepo builds all packages in correct dependency order
- SC-032: Packages produce valid CJS and ESM outputs
- SC-033: Pre-commit hooks run successfully before each commit
- SC-034: Docker containers build and run successfully
- SC-035: Package READMEs follow template structure

### 17.2 New Phase 2 Specifications

**Add to Phase 2:**
- Profile management packages (profile-frt, profile-srv)
- @universo/utils package creation
- @universo/i18n package creation
- @universo/api-client package creation
- API documentation infrastructure
- ORM selection and configuration

### 17.3 Phase Reordering

- Phase 3: Uniks → Clusters (not just Clusters)
- Phase 4: Metaverses, Analytics, Spaces
- Phase 5: UPDL, Space Builder
- New Phase 6: Templates and Publication
- New Phase 7: Advanced Features

## 18. Action Items Summary

### Immediate Actions (Before proceeding with Phase 1)

1. ✅ **Read React repository structure** (Done)
2. ✅ **Analyze React packages** (Done)
3. ✅ **Identify patterns and gaps** (Done)
4. ⬜ **Update constitution.md**:
   - Add technology stack details
   - Add package standards section
   - Add build system section
   - Add documentation standards
   - Add security practices
   - Update roadmap phases
5. ⬜ **Update spec.md**:
   - Add new user stories
   - Add new functional requirements
   - Add new success criteria
   - Update assumptions
6. ⬜ **Create package templates**:
   - README.md template
   - README-RU.md template
   - Place in .github/templates/
7. ⬜ **Create SECURITY.md**
8. ⬜ **Document Next.js-specific patterns**:
   - Authentication with Next.js
   - MUI with App Router
   - Database access patterns

### Short-term Actions (Phase 1 execution)

1. ⬜ Install and configure Turborepo
2. ⬜ Set up Husky git hooks
3. ⬜ Create @universo/types package structure
4. ⬜ Create Docker configuration
5. ⬜ Set up MUI for Next.js App Router
6. ⬜ Document authentication patterns for Next.js

### Medium-term Actions (Phase 2)

1. ⬜ Create shared infrastructure packages
2. ⬜ Implement ORM and database abstraction
3. ⬜ Set up API documentation
4. ⬜ Implement profile management

## 19. Conclusion

The universo-platformo-react implementation provides a wealth of architectural patterns and best practices that should be incorporated into universo-platformo-next. The key insights are:

1. **Comprehensive Package Structure**: The React version has evolved a sophisticated package architecture with clear patterns for shared infrastructure, domains, templates, and utilities.

2. **Build System Maturity**: Modern build tools (tsdown, turborepo) provide significant value and should be adopted early.

3. **Shared Infrastructure is Critical**: Packages like @universo/types, @universo/utils, @universo/i18n, and @universo/api-client prevent duplication and enforce consistency.

4. **Next.js Requires Different Patterns**: While the overall architecture can be similar, specific implementations (auth, state management, database access) need to be adapted for Next.js App Router.

5. **Phasing Needs Adjustment**: The order and content of phases should be updated to reflect the actual implementation needs and dependencies.

6. **Documentation Standards Matter**: Comprehensive documentation with templates prevents inconsistency and helps onboard contributors.

7. **Template System is a Key Differentiator**: The ability to export UPDL to multiple platforms (AR.js, PlayCanvas, etc.) is a core feature that needs explicit planning.

By incorporating these patterns and addressing the identified gaps, universo-platformo-next can benefit from the lessons learned in the React implementation while leveraging Next.js-specific advantages.
