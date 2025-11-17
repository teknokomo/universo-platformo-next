# Package README Template Usage Guide

This guide explains how to use the README templates (`TEMPLATE-README.md` and `TEMPLATE-README-RU.md`) when creating documentation for new packages in the Universo Platformo Next monorepo.

## Overview

The templates provide a standardized structure for package documentation that ensures:
- Consistent format across all packages
- Complete information for users and developers
- Bilingual support (English and Russian)
- Professional presentation

## When to Use These Templates

Use these templates when:
- Creating a new package in the `packages/` directory
- Documenting an existing package that lacks proper documentation
- Updating documentation to match current standards

## Template Structure

Both templates contain the same sections:

1. **Header**: Package name, version badge, license badge
2. **Overview**: Brief 2-3 sentence description
3. **Features**: Bulleted list of key features
4. **Installation**: Instructions for adding the package
5. **Usage**: Basic and advanced code examples
6. **API Reference**: Detailed documentation of exports
7. **Architecture**: Package structure and design decisions
8. **Development**: Setup, building, testing, linting
9. **Contributing**: Link to contribution guidelines
10. **License**: License information
11. **Acknowledgments**: Credits and dependencies
12. **Support**: Contact information

## Step-by-Step Usage

### 1. Copy the Template

```bash
# Navigate to your package directory
cd packages/your-package-name/base

# Copy the English template
cp ../../TEMPLATE-README.md ./README.md

# Copy the Russian template
cp ../../TEMPLATE-README-RU.md ./README-RU.md
```

### 2. Replace Placeholders

Replace all placeholders in both files:

**Package Identification:**
- `Package Name` → Your actual package name (e.g., "Universo Types")
- `Название пакета` → Russian package name (e.g., "Типы Universo")
- `package-name` → Your package directory name (e.g., `universo-types`)
- `@universo/package-name` → Your package's npm scope name

**Version and Metadata:**
- `0.1.0` → Your package's current version
- `2025-11-17` → Current date

### 3. Fill in Content Sections

#### Overview Section
Write a clear, concise 2-3 sentence description:
- What problem does this package solve?
- How does it fit into the ecosystem?
- What is its primary purpose?

**Example:**
```markdown
## Overview

This package provides shared TypeScript type definitions and interfaces used across all Universo Platformo Next packages. It ensures type consistency and enables type-safe development across the entire platform.
```

#### Features Section
List 3-5 key features with brief descriptions:

**Example:**
```markdown
## Features

- **UPDL Interfaces**: Complete type definitions for UPDL nodes and spaces
- **Platform Types**: Shared types for authentication, API, and database
- **Type Safety**: Strict TypeScript definitions prevent runtime errors
- **Dual Build**: Supports both CommonJS and ES Modules
```

#### Usage Section
Provide realistic code examples:
- Start with basic usage
- Progress to advanced scenarios
- Include Next.js-specific examples if relevant
- Use actual APIs from your package

#### API Reference
Document all public exports:
- Classes with their methods
- Functions with parameters and return types
- TypeScript interfaces and types
- React components with props (for UI packages)

**Tips:**
- Use TypeScript syntax for type definitions
- Include JSDoc-style parameter descriptions
- Provide code examples for each item
- Be thorough but concise

#### Architecture Section
Explain your package structure:
- Why certain directories exist
- Key design decisions
- Technology choices and rationale
- Dependencies and why they're needed

### 4. Maintain Parity Between Languages

**Critical Rule**: The Russian README MUST be an exact translation of the English README with:
- Same number of lines
- Same section structure
- Same code examples (with Russian comments if applicable)
- Same headings hierarchy

**Checking Parity:**
```bash
# Compare line counts (should be very close)
wc -l README.md README-RU.md

# Visual diff to check structure
diff -u <(grep '^#' README.md) <(grep '^#' README-RU.md)
```

### 5. Update Package-Specific Content

#### For Frontend Packages (*-frt)
- Emphasize React components in API Reference
- Show Next.js Client Component usage
- Document UI props and styling options
- Include accessibility considerations

#### For Backend Packages (*-srv)
- Focus on API routes and Server Actions
- Document database interactions
- Show middleware usage
- Explain authorization patterns

#### For Shared Packages (@universo/*)
- Document both frontend and backend usage
- Show dual build output structure
- Explain how other packages depend on it
- Include version compatibility notes

#### For Template Packages (@universo/template-*)
- Document the TemplateBuilder interface implementation
- Explain UPDL compatibility
- Show platform-specific output examples
- Include template configuration options

### 6. Keep Examples Working

All code examples MUST:
- Use actual imports from your package
- Be syntactically correct
- Work when copy-pasted (unless marked otherwise)
- Be tested during development

**Good Practice:**
```typescript
// ✅ Good: Real working example
import { UPDLProcessor } from '@universo/utils'

const processor = new UPDLProcessor()
const result = processor.processFlowData(flowData)
```

**Bad Practice:**
```typescript
// ❌ Bad: Pseudo-code that won't work
import { Something } from 'package'
// ...magic happens...
console.log(result)
```

## Common Sections to Customize

### Dependencies Section

List and explain each dependency:

```markdown
### Dependencies

- `next`: Next.js framework for React applications
- `@supabase/auth-helpers-nextjs`: Authentication integration
- `@universo/types`: Shared type definitions across platform
- `zod`: Runtime type validation for API requests
```

### Architecture Diagram

For complex packages, add ASCII diagrams or describe data flow:

```markdown
## Architecture

```
Data Flow:
User Request → API Route → Service Layer → Database
                                    ↓
                              Business Logic
                                    ↓
                            Response Formatter
```
```

### Development Setup

Provide clear, step-by-step setup instructions:

```markdown
### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/teknokomo/universo-platformo-next.git
   ```

2. Install dependencies:
   ```bash
   cd universo-platformo-next
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. Build the package:
   ```bash
   pnpm build --filter @universo/your-package
   ```
```

## Translation Tips

When translating to Russian:

### Technical Terms
- Keep English terms in backticks: `package.json`, `TypeScript`, `API`
- Translate general concepts: "package" → "пакет", "function" → "функция"
- Use established Russian tech terminology

### Code Comments
- Keep code identical in both versions
- Translate only code comments:
```typescript
// Create instance → // Создать экземпляр
const instance = new Class()
```

### Formatting
- Maintain markdown formatting exactly
- Keep the same number of empty lines
- Preserve indentation and structure

### Common Translations
- "Overview" → "Обзор"
- "Features" → "Возможности"
- "Installation" → "Установка"
- "Usage" → "Использование"
- "API Reference" → "Справочник API"
- "Architecture" → "Архитектура"
- "Development" → "Разработка"
- "Contributing" → "Участие в разработке"
- "License" → "Лицензия"
- "Support" → "Поддержка"

## Quality Checklist

Before committing your README files, verify:

- [ ] Both README.md and README-RU.md exist
- [ ] Package name updated in both files
- [ ] Version badges point to correct package
- [ ] All placeholders replaced
- [ ] Code examples use real APIs
- [ ] Code examples are tested and work
- [ ] API reference is complete
- [ ] Russian translation matches English structure
- [ ] Line counts are similar (within 5%)
- [ ] No broken links
- [ ] Grammar and spelling checked
- [ ] Markdown renders correctly in preview

## Examples from React Implementation

The React implementation has excellent README examples:

**Good Examples to Study:**
- `packages/universo-types/base/README.md` - Excellent type documentation
- `packages/universo-utils/base/README.md` - Clear utility documentation
- `packages/template-quiz/base/README.md` - Comprehensive template docs
- `packages/profile-frt/base/README.md` - Good frontend package example

## Updating Existing Documentation

When updating existing READMEs:

1. **Preserve existing good content** - Don't blindly replace
2. **Add missing sections** from template
3. **Update both languages** simultaneously
4. **Verify examples** still work with current code
5. **Update version numbers** and dates
6. **Commit both files** in same PR

## Getting Help

If you need help with README documentation:

1. Check existing package READMEs for examples
2. Review the React implementation examples
3. Ask in project discussions or issues
4. Reference this guide for structure

## Version History

- **v1.0** (2025-11-17): Initial template creation based on React implementation patterns

---

**Remember**: Good documentation is as important as good code. Take time to write clear, accurate, and helpful README files for all packages.
