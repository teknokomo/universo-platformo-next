# Constitution Update Proposal

**Date**: 2025-11-17  
**Current Version**: 1.2.0  
**Proposed Version**: 1.3.0  
**Reason**: Incorporate additional architectural patterns from universo-platformo-react analysis

## Overview

This document proposes updates to the Universo Platformo Next Constitution based on comprehensive analysis of the React implementation. The analysis identified several patterns and packages that should be explicitly documented in the constitution to ensure completeness and alignment with the proven architecture.

## Proposed Changes

### 1. Infrastructure Packages (Phase 2 Enhancement)

**Current State**: Phase 2 mentions some infrastructure packages but not comprehensively.

**Proposed Addition**:
```markdown
### Phase 2: Core Infrastructure

**Shared Infrastructure Packages (All Required)**:

1. **@universo/types** - Shared TypeScript types
   - UPDL interfaces and platform types
   - Type-only package (no runtime dependencies)
   - Dual build system (CJS + ESM)

2. **@universo/utils** - Shared utilities and processors
   - UPDLProcessor for converting flow data to UPDL
   - Multi-scene support
   - Template-agnostic processing foundation
   - Dual build system (CJS + ESM)

3. **@universo/api-client** - Type-safe API client
   - Axios-based HTTP communication for traditional API routes
   - Support for Server Actions pattern
   - Request/response type definitions
   - Error handling and retry logic
   - Dual build system (CJS + ESM)

4. **@universo/i18n** - Centralized i18next instance
   - Shared i18next configuration
   - Translation file management
   - Language detection and switching
   - Namespace support for modular translations
   - Integration with next-intl for runtime

5. **@universo/ui-components** - Shared Next.js UI components
   - MUI v6 components configured for App Router
   - Shared layout components
   - Consistent theme integration
   - Server/Client Component wrappers
   - Dual build system (CJS + ESM)

6. **@universo/rest-docs** - API documentation
   - OpenAPI 3.0 specifications
   - TypeDoc integration
   - Swagger UI for interactive documentation
   - Auto-generation from TypeScript types
```

**Rationale**: These 6 packages form the core infrastructure that all other packages depend on. They are proven in the React implementation and essential for the Next.js version.

---

### 2. Projects Domain (Phase 3 Addition)

**Current State**: Phase 3 includes Uniks and Clusters but doesn't mention Projects domain.

**Proposed Addition**:
```markdown
### Phase 3: Workspace and First Domains

**Projects Domain (Optional)**:
- projects-frt, projects-srv packages
- Workspace-level project management
- Project organization within Uniks
- CRUD operations for projects
- Integration with other domain entities

**Dependencies**: Profile, Uniks (Workspace Management)

**Success Criteria**:
- Users can create and manage projects within workspaces
- Projects can contain references to Clusters, Metaverses, and Spaces
- Proper authorization at workspace level
- At least 70% code coverage
```

**Rationale**: The Projects domain exists in the React implementation and provides important workspace-level organization. It should be optional in Phase 3 to avoid scope creep but documented for future implementation.

---

### 3. Workspace-Scoped Routing Pattern (Phase 2 Addition)

**Current State**: Constitution mentions authorization but doesn't specify routing patterns.

**Proposed Addition**:
```markdown
### Phase 2: Core Infrastructure

**Workspace-Scoped API Routing Pattern**:

All domain operations MUST be scoped to workspaces (Uniks). The following routing pattern MUST be used consistently across all domain packages:

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
```

Example for Clusters domain:
```
GET    /api/uniks/:unikId/clusters                    # List all clusters in workspace
POST   /api/uniks/:unikId/clusters                    # Create cluster in workspace
GET    /api/uniks/:unikId/clusters/:clusterId         # Get specific cluster
PUT    /api/uniks/:unikId/clusters/:clusterId         # Update cluster
DELETE /api/uniks/:unikId/clusters/:clusterId         # Delete cluster
GET    /api/uniks/:unikId/clusters/:clusterId/domains # List domains in cluster
```

All operations MUST:
- Validate user has access to the specified workspace
- Use workspace context for authorization
- Follow consistent URL structure across all domains
```

**Rationale**: This pattern is proven in the React implementation and ensures consistent, secure, workspace-scoped operations across all domains.

---

### 4. Template Package Standards (Phase 6 Enhancement)

**Current State**: Phase 6 mentions templates but doesn't specify the interface pattern.

**Proposed Addition**:
```markdown
### Phase 6: Templates and Publication

**Template Builder Interface**:

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

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface BuildOutput {
  html?: string;
  assets?: Record<string, string>;
  metadata?: Record<string, unknown>;
}
```

**Template Registry Pattern**:

```typescript
// @universo/publish-frt
export const templateRegistry: Record<string, TemplateBuilder> = {
  'arjs-quiz': new ARJSQuizBuilder(),
  'playcanvas-mmo': new PlayCanvasMMOBuilder(),
  // Additional templates registered here
};

export function getTemplate(name: string): TemplateBuilder | undefined {
  return templateRegistry[name];
}
```

**Template Package Structure**:

```
template-{name}/
└── base/
    ├── src/
    │   ├── builders/      # UPDL → Platform converters
    │   ├── components/    # Platform-specific generators
    │   ├── utils/         # Template utilities
    │   └── index.ts       # Export TemplateBuilder
    ├── dist/              # CJS + ESM + Types
    ├── package.json
    ├── README.md
    └── README-RU.md
```
```

**Rationale**: Standardized interface ensures all templates work consistently with the publication system and provides clear contracts for template developers.

---

### 5. Security Requirements Enhancement

**Current State**: Security mentioned in Phase 1 and Version Management.

**Proposed Addition**:
```markdown
### Security Standards

**Security File Requirements**:
- `SECURITY.md` MUST exist in repository root
- Must document vulnerability reporting process
- Must list security contact information
- Must specify supported versions and security policy

**Dependency Security**:
- Run `pnpm audit` before every release
- Critical vulnerabilities MUST be patched within 48 hours
- High vulnerabilities MUST be patched within 1 week
- Use `pnpm overrides` for immediate security patches
- Document all security-related overrides

**CI/CD Security Checks**:
- Automated security scanning in pull requests
- Dependency vulnerability scanning (Dependabot or Snyk)
- CodeQL scanning for code vulnerabilities
- No merge allowed with critical or high vulnerabilities

**Environment Security**:
- Never commit .env.local or .env.production files
- All environment variables MUST be typed and validated
- Use TypeScript for env var validation (e.g., Zod schema)
- Sensitive data stored in Supabase Vault or secure secrets manager
```

**Rationale**: The React implementation has good security practices that should be explicitly documented and enforced in the Next.js version.

---

### 6. Testing Standards Enhancement

**Current State**: Testing mentioned but requirements not fully specified.

**Proposed Addition**:
```markdown
### Testing Requirements

**Testing Stack**:
- **Test Runner**: Vitest ^2.1.8
- **React Testing**: @testing-library/react ^14.3.1
- **DOM Simulation**: happy-dom ^16.14.2
- **Coverage**: @vitest/coverage-v8 ^2.1.4

**Coverage Requirements**:
- Infrastructure packages (@universo/*): Minimum 80% coverage
- Domain packages (*-frt, *-srv): Minimum 70% coverage
- Template packages: Minimum 60% coverage
- All tests must pass before merging

**Next.js Specific Testing**:
- Server Components: Mock data fetching, test rendered output
- Client Components: Use @testing-library/react for interactions
- API Routes: Test with MSW (Mock Service Worker) or similar
- Server Actions: Test with direct function calls

**Test Organization**:
```
package/
└── base/
    ├── src/
    │   ├── components/
    │   │   ├── Button.tsx
    │   │   └── Button.test.tsx    # Colocated tests
    │   └── utils/
    │       ├── format.ts
    │       └── format.test.ts
    └── vitest.config.ts
```
```

**Rationale**: Explicit testing standards ensure consistent quality across all packages and provide clear guidelines for contributors.

---

### 7. Documentation Standards Enhancement

**Current State**: Bilingual documentation mandated but structure not fully specified.

**Proposed Addition**:
```markdown
### Documentation Standards

**Package README Structure**:

Every package MUST include README.md and README-RU.md with the following structure:

```markdown
# Package Name

[Badge: Version] [Badge: License]

## Overview
Brief description (2-3 sentences)

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation
\`\`\`bash
pnpm add @universo/package-name
\`\`\`

## Usage
### Basic Usage
Code example

### Advanced Usage
Code example

## API Reference
### Functions
### Types
### Components (for UI packages)

## Architecture
High-level architecture diagram or description

## Development
### Setup
### Building
### Testing

## Contributing
Reference to main CONTRIBUTING.md

## License
Reference to LICENSE
```

**README Template Files**:
- Create `packages/TEMPLATE-README.md` as English template
- Create `packages/TEMPLATE-README-RU.md` as Russian template
- Create `packages/TEMPLATE-README-GUIDE.md` with instructions

**Documentation Reviews**:
- Russian translation MUST be reviewed for accuracy
- Technical terminology MUST be consistent
- Code examples MUST work in both languages
```

**Rationale**: Standardized documentation structure improves maintainability and ensures all packages have consistent, high-quality documentation.

---

## Version Update Justification

**From**: 1.2.0  
**To**: 1.3.0

**Version Type**: MINOR (backward-compatible additions)

**Changes Summary**:
- **Added**: 6 infrastructure packages explicitly defined
- **Added**: Projects domain (optional) in Phase 3
- **Added**: Workspace-scoped routing pattern specification
- **Added**: Template builder interface standards
- **Enhanced**: Security requirements with specific policies
- **Enhanced**: Testing requirements with Next.js specifics
- **Enhanced**: Documentation standards with structure templates

**Impact**:
- No breaking changes to existing plans
- Clarifies implementation requirements
- Provides additional guidance for developers
- Aligns with proven React implementation patterns

---

## Implementation Timeline

1. **Immediate** (with this PR):
   - Update constitution to v1.3.0
   - Create package README templates
   - Document security policies

2. **Phase 1** (Foundation Setup):
   - Implement Husky and security scanning
   - Create SECURITY.md
   - Set up testing infrastructure

3. **Phase 2** (Core Infrastructure):
   - Implement all 6 infrastructure packages
   - Document workspace-scoped routing
   - Set up API documentation

4. **Phase 3+**:
   - Follow enhanced documentation standards
   - Implement optional Projects domain if needed

---

## Approval Process

**Required Reviews**:
- [ ] Project lead approval
- [ ] Architecture review
- [ ] Documentation review (bilingual)
- [ ] Security review

**Amendment Date**: 2025-11-17  
**Ratified Date**: _Pending approval_

---

## Appendix: Comparison with React Implementation

This proposal ensures the Next.js constitution captures all critical patterns from the React implementation:

✅ **Fully Aligned**: Monorepo, TypeScript, Package structure, UPDL system  
🔄 **Adapted for Next.js**: Authentication, API routing, State management  
➕ **Added to Constitution**: Infrastructure packages, Security policies, Testing standards  
❌ **Intentionally Excluded**: Flowise legacy patterns, Express-specific patterns

The proposed changes maintain the constitution's philosophy while ensuring completeness and clarity for implementers.
