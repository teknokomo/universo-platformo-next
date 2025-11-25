# Feature Specification: Initial Repository Setup and Next.js Foundation for Universo Platformo

**Feature Branch**: `001-nextjs-foundation-setup`  
**Created**: 2025-11-15  
**Updated**: 2025-11-16  
**Status**: Enhanced  
**Input**: User description: "Initial repository setup and Next.js foundation for Universo Platformo - Create a new Next.js-based implementation with PNPM monorepo structure, TypeScript, Supabase integration, and bilingual documentation"  
**Reference Implementation**: [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react) - Provides architectural patterns and concepts (not direct code copying)

### Reference Implementation Monitoring

The React implementation serves as a conceptual reference for architectural patterns. When monitoring the React repository for new features:

**Adoption Criteria:**
- Feature aligns with Next.js architecture and best practices
- Feature is fully implemented (not legacy or incomplete)
- Feature provides clear user value that applies to this implementation
- Feature can be implemented without copying React-specific code patterns

**Evaluation Process:**
1. Review new features in React repository monthly
2. Document features in specs/ with evaluation against adoption criteria
3. Create Issues for features that meet criteria
4. Implement using Next.js patterns, not direct code translation

## Context

This specification establishes the foundation for Universo Platformo Next, a new implementation built on Next.js and TypeScript. The project adopts architectural patterns from the React version (teknokomo/universo-platformo-react) including monorepo structure, package organization, and bilingual documentation, while implementing Next.js best practices and avoiding legacy code patterns.

**Technology Context:**
- **Next.js**: Version 14.x or latest stable, using App Router architecture
- **TypeScript**: Strict mode with comprehensive type checking
- **Node.js**: Version 18.x or higher required
- **PNPM**: Version 8.x or higher for workspace management
- **Target Environment**: Development, staging, and production environments with appropriate configurations

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Initializes Project (Priority: P1)

A developer clones the repository and can immediately understand the project structure, install dependencies, and run the development server. The repository includes comprehensive bilingual documentation explaining the architecture, conventions, and getting started steps.

**Why this priority**: This is the foundation for all other work. Without proper project initialization and documentation, no other functionality can be developed or maintained effectively.

**Independent Test**: Can be fully tested by cloning the repository, reading the README files, running `pnpm install`, and starting the development server. Success means the project builds and runs without errors.

**Acceptance Scenarios**:

1. **Given** a developer clones the repository for the first time, **When** they read the README.md file, **Then** they understand the project purpose, architecture, and basic structure
2. **Given** the developer has Node.js and pnpm installed, **When** they run `pnpm install`, **Then** all dependencies are installed successfully without errors
3. **Given** dependencies are installed, **When** they run `pnpm dev`, **Then** the development server starts successfully
4. **Given** the developer prefers Russian documentation, **When** they open README-RU.md, **Then** they find identical content to README.md but in Russian language

---

### User Story 2 - Configure Monorepo Structure (Priority: P1)

The project is organized as a PNPM workspace monorepo with a clear packages structure. Frontend and backend functionality can be separated into distinct packages within the `packages/` directory, following the naming convention of `*-frt` for frontend and `*-srv` for server packages.

**Why this priority**: The monorepo structure is fundamental to the architecture and must be established before any feature packages can be created. This enables parallel development and clear separation of concerns.

**Independent Test**: Can be tested by verifying pnpm-workspace.yaml exists, packages directory is created, and workspace commands work correctly. Success means being able to add new packages and manage them as a workspace.

**Acceptance Scenarios**:

1. **Given** the repository is initialized, **When** a developer examines the project structure, **Then** they find a `packages/` directory at the root
2. **Given** the monorepo is configured, **When** a developer runs workspace commands, **Then** pnpm correctly identifies and manages all packages
3. **Given** a new package is needed, **When** a developer creates a package following the naming convention, **Then** the package integrates seamlessly with the workspace
4. **Given** multiple packages exist, **When** a developer updates a shared dependency, **Then** all packages can reference the correct version

---

### User Story 3 - Establish Development Tooling (Priority: P2)

The project includes standard development tools configured and ready to use: TypeScript for type safety, ESLint for code quality, Prettier for code formatting, and appropriate configurations for Next.js development.

**Why this priority**: Development tooling ensures code quality and consistency across the team. It should be set up early but after the basic structure is in place.

**Independent Test**: Can be tested by running `pnpm lint`, `pnpm format`, and `pnpm type-check` commands. Success means all tools are configured and can analyze the codebase without errors.

**Acceptance Scenarios**:

1. **Given** the project is initialized, **When** a developer runs `pnpm lint`, **Then** ESLint analyzes the code and reports any issues
2. **Given** code exists in the project, **When** a developer runs `pnpm format`, **Then** Prettier formats all code files consistently
3. **Given** TypeScript is configured, **When** a developer runs `pnpm type-check`, **Then** TypeScript validates all type definitions
4. **Given** the developer uses VSCode, **When** they open the project, **Then** editor extensions automatically use the project's tool configurations

---

### User Story 4 - Configure GitHub Repository Settings (Priority: P2)

The GitHub repository has appropriate labels configured for issue tracking, and the repository includes guidelines for creating issues and pull requests with bilingual content.

**Why this priority**: Repository management conventions are important for team collaboration but can be set up after the basic project structure exists.

**Independent Test**: Can be tested by creating a test issue and PR following the guidelines, verifying that labels exist, and confirming bilingual formatting works correctly.

**Acceptance Scenarios**:

1. **Given** the repository is created, **When** a developer views the labels, **Then** they see standard labels like `feature`, `bug`, `documentation`, `enhancement` as well as project-specific labels
2. **Given** issue guidelines exist, **When** a developer creates an issue, **Then** they can follow the template with English content and Russian translation in a spoiler
3. **Given** PR guidelines exist, **When** a developer creates a pull request, **Then** they can follow the template with proper formatting
4. **Given** labels are configured, **When** a developer applies labels to an issue, **Then** the issue is properly categorized for filtering and tracking

---

### User Story 5 - Configure Next.js Development Patterns (Priority: P2)

The project follows Next.js 14.x App Router architecture with clear patterns for Server Components, Client Components, and API routes. The development environment is configured to support Next.js best practices including Server-Side Rendering (SSR), Static Site Generation (SSG), and proper code splitting.

**Why this priority**: Next.js-specific patterns must be established early to guide all future feature development. This ensures consistent architecture and prevents mixing incompatible patterns.

**Independent Test**: Can be tested by examining Next.js configuration files, creating sample Server and Client Components, and verifying the App Router structure works correctly. Success means understanding when to use each pattern.

**Acceptance Scenarios**:

1. **Given** Next.js is configured, **When** a developer reviews project documentation, **Then** they understand when to use Server Components vs Client Components
2. **Given** the App Router is configured, **When** a developer creates a new route, **Then** they can use the app/ directory structure with layouts and pages
3. **Given** API routes are needed, **When** a developer creates an API endpoint, **Then** they use the Next.js 14 route handler pattern in app/api/
4. **Given** the developer needs data fetching, **When** they implement data loading, **Then** they use Server Components with async/await instead of client-side fetching where appropriate

---

### User Story 6 - Prepare for Database Integration (Priority: P3)

The project includes configuration files and environment variable templates for Supabase integration, along with documentation explaining how to set up a Supabase project and configure the connection.

**Why this priority**: While database integration is important, the initial setup can be documented and configured without requiring an active database connection. Actual integration will happen when implementing features.

**Independent Test**: Can be tested by verifying `.env.example` file exists with Supabase configuration variables, and documentation explains the setup process clearly.

**Acceptance Scenarios**:

1. **Given** the repository is cloned, **When** a developer examines environment configuration, **Then** they find `.env.example` with Supabase connection variables
2. **Given** environment variables are documented, **When** a developer reads the setup guide, **Then** they understand how to create and configure a Supabase project
3. **Given** Supabase credentials are available, **When** a developer creates `.env.local` with proper values, **Then** the application can reference these configuration values
4. **Given** the project uses TypeScript, **When** environment variables are accessed in code, **Then** they are properly typed and validated

---

### User Story 7 - Prepare Authentication Infrastructure (Priority: P3)

The project includes configuration and documentation for Supabase authentication using the @supabase/ssr package. The authentication infrastructure is designed with abstraction to support future authentication strategies while initially focusing on Supabase Auth.

**Why this priority**: Authentication setup can be documented and configured in Phase 1 without full implementation. The actual authentication middleware and flows will be implemented in Phase 2 when building core infrastructure.

**Independent Test**: Can be tested by verifying authentication configuration files exist, environment variables for auth are documented, and the abstraction pattern is clearly explained in documentation.

**Acceptance Scenarios**:

1. **Given** authentication is configured, **When** a developer reviews the setup documentation, **Then** they understand how @supabase/ssr integrates with Next.js for authentication
2. **Given** auth configuration exists, **When** a developer examines `.env.example`, **Then** they find all necessary Supabase authentication variables documented
3. **Given** the abstraction pattern is documented, **When** a developer reads the architecture guide, **Then** they understand how to add future authentication strategies
4. **Given** auth middleware patterns are documented, **When** a developer needs to protect routes, **Then** they know the planned approach for authentication middleware

---

### User Story 8 - Configure UI Framework Foundation (Priority: P3)

The project includes Material UI (MUI) configured for Next.js App Router with theming support and consistent component usage patterns. Documentation explains MUI integration with Server and Client Components.

**Why this priority**: UI framework setup can be configured in Phase 1 to establish patterns. Actual component development happens in later phases when building features.

**Independent Test**: Can be tested by verifying MUI dependencies are configured, theme configuration exists, and documentation explains usage patterns with Next.js.

**Acceptance Scenarios**:

1. **Given** MUI is configured, **When** a developer reviews dependencies, **Then** they find MUI v6.x or latest stable version with ColorScheme API
2. **Given** theming is set up, **When** a developer examines the configuration, **Then** they find theme configuration file with color palette and typography settings
3. **Given** MUI + Next.js integration is documented, **When** a developer reads the UI guide, **Then** they understand how to use MUI with Server Components vs Client Components
4. **Given** component patterns are documented, **When** a developer needs to create UI, **Then** they know the conventions for consistent MUI usage

---

### User Story 9 - Establish Testing Infrastructure (Priority: P3)

The project includes testing framework configuration and documentation for unit tests, integration tests, and end-to-end tests. Testing patterns for Next.js App Router are documented with examples.

**Why this priority**: Testing infrastructure should be set up from the beginning to enable test-driven development. Initial setup includes configuration and examples, with actual test coverage growing as features are implemented.

**Independent Test**: Can be tested by running test commands, verifying test configuration files exist, and confirming sample tests pass successfully.

**Acceptance Scenarios**:

1. **Given** testing is configured, **When** a developer runs `pnpm test`, **Then** the test runner executes successfully with configured framework
2. **Given** test examples exist, **When** a developer examines the test files, **Then** they find examples for testing Server Components, Client Components, and API routes
3. **Given** test coverage is configured, **When** a developer runs tests with coverage, **Then** they see coverage reports indicating tested vs untested code
4. **Given** testing guidelines are documented, **When** a developer reads the testing guide, **Then** they understand testing patterns for Next.js App Router architecture

---

### Edge Cases

- What happens when a developer tries to install dependencies without having pnpm installed? (Should provide clear error message and installation instructions)
- What happens when someone tries to run the project without Node.js version compatible with Next.js? (Should validate Node version and provide guidance)
- How does the system handle missing environment variables? (Should fail gracefully with clear error messages indicating which variables are required)
- What happens when bilingual documentation files get out of sync? (Documentation guidelines should emphasize keeping both versions identical in structure)
- How does the workspace handle package version conflicts? (Should use pnpm workspace protocols and document resolution strategy)
- What happens when a package needs both frontend and backend but doesn't follow -frt/-srv naming? (Should be documented as exception or prevented)
- How does the system handle a package that needs only frontend OR only backend? (Single-sided packages are allowed without suffix)
- What happens when someone tries to create a docs/ directory? (Should be prevented or warned, as docs go in separate repository)
- How are development vs staging vs production environment configurations managed? (Should have clear separation with .env files for each)
- What happens when adding a new dependency with security vulnerabilities? (Should have security scanning in place)
- How does the system handle authentication failures during development without Supabase configured? (Should gracefully degrade or provide mock auth for local development)
- What happens when MUI components are used in Server Components incorrectly? (Documentation and examples should prevent this)
- How are test failures in CI/CD handled? (Should block merging until resolved)
- What happens when Russian translation is missing or incomplete? (Should be caught in review process, guidelines emphasize synchronization)

## Requirements *(mandatory)*

### Functional Requirements

#### Core Modular Architecture (NON-NEGOTIABLE)

- **FR-001**: System MUST be initialized as a PNPM workspace monorepo with a `pnpm-workspace.yaml` configuration file
- **FR-002**: System MUST include a `packages/` directory at the repository root for organizing feature packages
- **FR-002a**: **ALL feature functionality MUST be implemented within packages/ directory** - Implementation of feature code outside packages/ is STRICTLY FORBIDDEN
- **FR-002b**: Root-level directories MAY ONLY contain: configuration files, build scripts, documentation, and .github/ workflows - NO business logic or feature implementation
- **FR-003**: System MUST use TypeScript for all code with appropriate `tsconfig.json` configurations
- **FR-004**: System MUST include Next.js configured for full-stack development (frontend and API routes)
- **FR-004a**: Next.js application(s) SHOULD be organized in `apps/` directory as workspace packages (e.g., `apps/web/`)
- **FR-005**: System MUST provide bilingual documentation with README.md in English and README-RU.md in Russian with identical structure and content
- **FR-006**: Documentation MUST follow the guideline that English version is the primary standard and Russian version is an exact translation
- **FR-007**: System MUST include `.env.example` file with Supabase configuration variables documented
- **FR-008**: System MUST include ESLint configuration for code quality enforcement
- **FR-009**: System MUST include Prettier configuration for consistent code formatting
- **FR-010**: System MUST include `.gitignore` file configured for Node.js, Next.js, and development artifacts
- **FR-011**: Repository MUST include instructions files in `.github/instructions/` for issues, PRs, labels, and i18n documentation
- **FR-012**: System MUST support package naming convention with `-frt` suffix for frontend packages and `-srv` suffix for server packages
- **FR-012a**: When a feature requires BOTH frontend and backend, they MUST be implemented as separate packages (e.g., `clusters-frt` and `clusters-srv`)
- **FR-013**: Each package MUST include a `base/` directory for core implementation to support future multiple implementations
- **FR-013a**: ALL package source code MUST reside within the `base/` subdirectory
- **FR-014**: System MUST include `package.json` at root level with workspace configuration and common scripts
- **FR-015**: Documentation MUST explain the relationship to Universo Platformo React as the reference implementation
- **FR-015a**: Documentation MUST reference the modular package structure from universo-platformo-react as the architectural model
- **FR-016**: System MUST NOT include a `docs/` directory (documentation will be in separate repository)
- **FR-017**: System MUST NOT include AI agent configuration files (user will create these separately)
- **FR-018**: README files MUST explain the monorepo structure and package organization
- **FR-018a**: README files MUST explicitly state that ALL functionality is implemented in packages/ directory
- **FR-019**: README files MUST include getting started instructions for developers
- **FR-020**: README files MUST document required Node.js and pnpm versions

#### Next.js Configuration Requirements

- **FR-021**: System MUST use Next.js version 14.x or latest stable version
- **FR-022**: System MUST be configured to use Next.js App Router architecture (not Pages Router)
- **FR-023**: System MUST include TypeScript configuration with strict mode enabled
- **FR-024**: Documentation MUST explain when to use Server Components vs Client Components
- **FR-025**: Documentation MUST provide examples of Server Component data fetching patterns
- **FR-026**: API routes MUST follow Next.js 14 App Router structure in `app/api/` directory
- **FR-027**: System MUST include Next.js configuration for both development and production builds

#### Monorepo & Workspace Requirements

- **FR-028**: System MUST support PNPM workspace commands including `pnpm -r` (recursive) and `pnpm --filter`
- **FR-029**: Workspace configuration MUST define dependency management rules to prevent version conflicts
- **FR-030**: System MUST allow packages that need only frontend OR only backend without requiring the -frt/-srv suffix
- **FR-031**: Documentation MUST explain how to create new packages in the workspace
- **FR-032**: Root package.json MUST include scripts for building, testing, and linting all workspace packages

#### Version Requirements

- **FR-033**: System MUST require Node.js version 18.x or higher
- **FR-034**: System MUST require PNPM version 8.x or higher
- **FR-035**: System MUST document a dependency versioning strategy (pinning vs ranges)
- **FR-036**: Package dependencies MUST be regularly audited for security vulnerabilities

#### Database Abstraction Requirements

- **FR-037**: System MUST include a database abstraction layer design documented in architecture guide
- **FR-038**: Database-specific implementation code MUST reside in the `base/` directory of packages
- **FR-039**: Database abstraction MUST support future addition of PostgreSQL, MySQL, and MongoDB without refactoring business logic
- **FR-040**: System MUST include interfaces or types defining the database abstraction layer API
- **FR-041**: Initial implementation MUST use Supabase as the primary database
- **FR-042**: Environment configuration MUST separate database connection settings from application logic

#### Authentication Requirements

- **FR-043**: System MUST include configuration for Supabase authentication using @supabase/ssr package for Next.js App Router
- **FR-044**: System MUST include browser and server Supabase client patterns with cookie-based session management
- **FR-045**: Documentation MUST explain authentication middleware patterns for protecting routes
- **FR-046**: Authentication configuration MUST be designed to support future authentication strategies (OAuth, SAML, etc.)
- **FR-047**: System MUST include environment variables for authentication configuration in `.env.example`

#### UI Framework Requirements

- **FR-048**: System MUST include Material UI (MUI) version 6.x or latest stable with ColorScheme API
- **FR-049**: System MUST include MUI theme configuration with customizable color palette and typography
- **FR-050**: Documentation MUST explain how to use MUI components with Next.js App Router
- **FR-051**: Documentation MUST clarify which MUI components work in Server Components vs Client Components
- **FR-052**: System MUST include MUI integration configured for Next.js App Router (handling SSR, CSS-in-JS)

#### Testing Requirements

- **FR-053**: System MUST include Vitest testing framework configured with React Testing Library
- **FR-054**: System MUST include example tests for Server Components, Client Components, and API routes
- **FR-055**: System MUST support running tests with `pnpm test` command
- **FR-056**: System MUST include test coverage reporting configuration
- **FR-057**: Documentation MUST explain testing patterns for Next.js App Router architecture
- **FR-058**: Tests MUST be required to pass before merging pull requests

#### Environment Configuration Requirements

- **FR-059**: System MUST support separate configurations for development, staging, and production environments
- **FR-060**: Environment variables MUST be typed and validated in TypeScript
- **FR-061**: System MUST gracefully handle missing required environment variables with clear error messages
- **FR-062**: Documentation MUST explain which environment variables are required vs optional
- **FR-063**: Sensitive environment variables MUST NOT be committed to the repository

#### Security Requirements

- **FR-064**: System MUST include security scanning for dependencies
- **FR-065**: System MUST NOT allow merging code with known security vulnerabilities without explicit justification
- **FR-066**: Environment files with secrets (`.env.local`) MUST be in `.gitignore`
- **FR-067**: Documentation MUST include security best practices for the project

#### Code Quality Requirements

- **FR-068**: System MUST include code review requirements before merging
- **FR-069**: System MUST enforce TypeScript strict mode with no implicit `any` types
- **FR-070**: ESLint MUST be configured to catch common Next.js and React mistakes
- **FR-071**: Prettier MUST be configured to auto-format code consistently
- **FR-072**: Pre-commit hooks MUST be configured using Husky to run linting and formatting

#### Build System Requirements

- **FR-073**: System MUST use Turborepo for monorepo build orchestration with turbo.json configuration
- **FR-074**: Shared packages MUST use tsdown for dual build output (CommonJS + ES Modules + TypeScript declarations)
- **FR-075**: Root package.json MUST include turborepo-compatible scripts (build, dev, lint, test, type-check)

### Key Entities

- **Workspace**: The root-level PNPM workspace configuration that manages multiple packages as a cohesive project
- **Package**: A self-contained module within the `packages/` directory, following naming conventions for frontend (-frt) or server (-srv) functionality, with a `base/` directory for implementation
- **Configuration Files**: TypeScript, ESLint, Prettier, Next.js, and environment configurations that establish development standards
- **Documentation Files**: Bilingual README files providing project information, setup instructions, and architectural guidance
- **GitHub Instructions**: Guidelines for creating issues, pull requests, managing labels, and handling internationalization
- **Database Abstraction Layer**: Interface-based abstraction allowing multiple database implementations without changing business logic
- **Authentication Strategy**: Supabase Auth-based authentication system using @supabase/ssr with browser and server clients, supporting future OAuth and SAML strategies
- **UI Theme**: MUI theme configuration defining consistent visual styling across the application
- **Test Suite**: Collection of unit, integration, and end-to-end tests validating application functionality
- **Environment Configuration**: Typed environment variables managing different deployment contexts (dev/staging/prod)

## Success Criteria *(mandatory)*

### Measurable Outcomes

#### Foundation Setup Criteria

- **SC-001**: A developer can clone the repository, run `pnpm install`, and have all dependencies installed successfully in under 5 minutes on a standard internet connection
- **SC-002**: A developer can run `pnpm dev` and have the Next.js development server start successfully in under 30 seconds
- **SC-003**: Running `pnpm lint` completes without configuration errors and reports on code quality
- **SC-004**: Running `pnpm format` successfully formats all code files using the project's Prettier configuration
- **SC-005**: Both README.md and README-RU.md exist and have identical structure (same number of sections and lines) with content translated appropriately
- **SC-006**: TypeScript compilation (`pnpm type-check`) completes successfully with no type errors
- **SC-007**: The repository contains all required instruction files in `.github/instructions/` (github-issues.md, github-labels.md, github-pr.md, i18n-docs.md)
- **SC-008**: The project structure includes a `packages/` directory ready to accept new feature packages
- **SC-009**: Documentation clearly explains the project architecture and enables a new developer to understand the system in under 15 minutes of reading
- **SC-010**: Environment variables are documented in `.env.example` with clear descriptions of their purpose and format

#### Next.js Configuration Criteria

- **SC-011**: Next.js App Router is properly configured and routing works without errors
- **SC-012**: Documentation includes working examples of both Server Components and Client Components
- **SC-013**: API routes can be created in `app/api/` directory and respond successfully
- **SC-014**: Next.js production build (`pnpm build`) completes successfully without errors

#### Monorepo & Workspace Criteria

- **SC-015**: PNPM workspace commands (`pnpm -r`, `pnpm --filter`) work correctly across packages
- **SC-016**: A new package can be created and integrated into the workspace in under 10 minutes following documentation
- **SC-017**: Shared dependencies are managed consistently across all workspace packages

#### Testing Infrastructure Criteria

- **SC-018**: Running `pnpm test` executes all configured tests successfully
- **SC-019**: Test coverage reports are generated and show coverage percentages
- **SC-020**: Example tests exist for Server Components, Client Components, and API routes

#### Database & Authentication Preparation Criteria

- **SC-021**: Database abstraction layer design is documented with clear interfaces
- **SC-022**: Supabase configuration variables are documented in `.env.example`
- **SC-023**: Authentication configuration is documented with @supabase/ssr setup instructions for browser and server clients
- **SC-024**: Environment configuration is typed in TypeScript with validation

#### UI Framework Criteria

- **SC-025**: MUI is configured and a sample component can render successfully
- **SC-026**: MUI theme configuration is in place with documented customization options
- **SC-027**: Documentation explains MUI usage patterns with Next.js App Router

#### Quality & Security Criteria

- **SC-028**: No security vulnerabilities exist in configured dependencies (npm audit passes)
- **SC-029**: Code review guidelines are documented and accessible
- **SC-030**: All configuration files follow documented standards and best practices

#### Build System Criteria

- **SC-031**: Turborepo builds all packages in correct dependency order with caching enabled
- **SC-032**: Pre-commit hooks (Husky) run successfully before each commit, executing lint and format checks
- **SC-033**: Shared packages produce valid dual build output (CJS + ESM + TypeScript declarations)

### Assumptions

#### Development Environment

- Node.js version 18.x or higher is available in the development environment
- pnpm package manager version 8.x or higher is installed
- Developers have basic familiarity with Next.js 14, TypeScript, and monorepo concepts
- Git is installed and configured for version control
- Developers have access to GitHub repository with appropriate permissions

#### External Services

- GitHub repository has appropriate permissions configured for team collaboration
- Supabase setup will be performed separately by developers following documentation (active Supabase project not required for Phase 1)
- Internet connection is available for installing dependencies and accessing documentation

#### Implementation Phases

- Material UI (MUI) library configuration will be completed in Phase 1, but extensive component usage occurs in later phases
- Supabase Auth with @supabase/ssr will be fully implemented in Phase 2 (Core Infrastructure), with Phase 1 focusing on configuration and documentation
- Database abstraction layer will be designed in Phase 1, with full implementation in Phase 2
- Testing infrastructure will be set up in Phase 1, with comprehensive test coverage growing as features are implemented in later phases

#### Knowledge & Skills

- Developers understand TypeScript strict mode and type-safe development practices
- Team members are familiar with Git workflows, pull requests, and code review processes
- Developers can read and write technical documentation in both English and Russian, or have access to translation tools
- Team understands monorepo concepts including workspace management and package dependencies

#### Reference Implementation

- The reference implementation at teknokomo/universo-platformo-react is accessible for architectural guidance
- React version serves as conceptual reference only, not for direct code copying
- Legacy patterns and incomplete implementations in React version will be identified and avoided
- React version will be monitored monthly for new features worth adopting

#### Localization

- Russian translation maintains technical accuracy while adapting to Russian technical terminology conventions
- Both English and Russian documentation will be kept synchronized through review process
- Technical terms may be transliterated in Russian when standard Russian terminology doesn't exist

#### Quality & Security

- Security scanning tools are available and will be integrated into the development workflow
- Code review will be performed by qualified team members before merging
- Performance benchmarks will be established in future phases as features are implemented
- Accessibility requirements will be addressed when implementing UI components in later phases
