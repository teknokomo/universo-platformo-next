# Project Memory

This directory contains the institutional knowledge and organizational memory of the universo-platformo-next project.

## Contents

### Core Documents

- **[constitution.md](constitution.md)** - The authoritative source for project principles, technology stack, architecture patterns, and development standards (Version 1.5.0)

### Subdirectories

- **[analysis/](analysis/)** - Architectural analyses, best practices documents, and review findings
- **[archive/](archive/)** - Historical documents preserved for reference

## Constitution Overview

The constitution (constitution.md) defines:

1. **Core Principles**
   - Monorepo Architecture (NON-NEGOTIABLE)
   - Package Separation Pattern (NON-NEGOTIABLE)
   - TypeScript-First Development
   - Database Abstraction Layer
   - Bilingual Documentation (NON-NEGOTIABLE)
   - Issue-Driven Development
   - Specification-First Approach

2. **Technology Stack Requirements**
   - Next.js 14 with App Router
   - TypeScript strict mode
   - PNPM workspaces
   - Supabase with @supabase/ssr
   - Material UI v6
   - Testing with Vitest

3. **Development Standards**
   - Package structure and naming
   - Code quality and security
   - Testing requirements
   - Documentation standards

4. **Feature Development Roadmap**
   - Phase 1: Foundation (Current)
   - Phase 2: Core Infrastructure
   - Phase 3: Workspace and First Domain
   - Phase 4: Additional Domains
   - Phase 5: UPDL and Visual Programming
   - Phase 6: Templates and Publication
   - Phase 7: Advanced Features (Optional)

## Analysis Documents

The analysis subdirectory contains comprehensive reviews and findings:
- Architectural comparisons with the React implementation
- Best practices integration summaries
- Code and architecture review findings
- Planning and specification enhancements
- Task completion summaries

See [analysis/README.md](analysis/README.md) for detailed index.

## Usage Guidelines

### Referencing the Constitution

When making architectural or technical decisions:
1. Always check constitution compliance first
2. Document any justified deviations
3. Propose amendments for systemic changes

### Updating Memory

New institutional knowledge should be:
1. Added to appropriate subdirectories
2. Indexed in README files
3. Cross-referenced with related documents
4. Kept in sync with bilingual requirements where applicable

### Constitution Amendments

The constitution follows semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Backward-incompatible governance changes
- **MINOR**: New principles or significant expansions
- **PATCH**: Clarifications, typo fixes, non-semantic refinements

Current version: **1.5.0**
Last amended: **2025-11-18**

## Related Resources

- Project specifications: [../.specify/specs/](../specs/)
- Document templates: [../.specify/templates/](../templates/)
- Automation scripts: [../.specify/scripts/](../scripts/)
- Main README: [/README.md](/README.md)

---

Last updated: 2025-11-24
