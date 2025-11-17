# Package README Template Guide

This guide explains how to use the package README template to create documentation for new packages in the Universo Platformo Next monorepo.

## Quick Start

1. Copy `README-TEMPLATE.md` to your package's `base/` directory as `README.md`
2. Replace all `[Placeholders]` with actual content
3. Remove sections that don't apply to your package
4. Create `README-RU.md` as an exact translation (same structure, same number of lines)

## Template Structure

The template is organized into the following sections:

### Required Sections

These sections MUST be included in every package README:

1. **Header with Badges**: Package name and basic metadata
2. **Overview**: What the package does and why it exists
3. **Key Features**: Bullet list of main capabilities
4. **Installation**: How to install/use the package
5. **Usage**: Basic and advanced examples
6. **API Reference**: Complete API documentation
7. **Development**: Build, test, and lint commands
8. **License**: License information
9. **Support**: Contact information

### Optional Sections

Include these sections if relevant to your package:

- **Architecture**: For complex packages with interesting design
- **Integration with Universo Platformo**: How it fits in the system
- **Migration Guide**: For packages with breaking changes
- **Troubleshooting**: Common issues and solutions
- **Performance**: Benchmarks and optimization tips
- **Related Packages**: Links to related packages
- **Roadmap**: Planned features
- **Changelog**: Release history link

## Section Guidelines

### Header and Badges

```markdown
# Package Name

[![npm version](https://img.shields.io/npm/v/@universo/package-name.svg)](https://www.npmjs.com/package/@universo/package-name)
[![License](https://img.shields.io/npm/l/@universo/package-name.svg)](LICENSE.md)

Brief one-sentence description
```

- Use actual package name without placeholders
- Update npm badge if package is published
- Keep description to one sentence

### Overview

Write 2-3 paragraphs covering:
- **Problem**: What problem does this solve?
- **Solution**: How does this package solve it?
- **Context**: Where does it fit in the architecture?
- **Design**: Key architectural decisions

Example:
```markdown
## Overview

The `@universo/types` package provides centralized TypeScript type definitions 
shared across all Universo Platformo Next packages. It ensures type consistency 
and prevents duplication of type definitions.

This package is a foundational infrastructure component that other packages 
depend on for type safety. It follows a dual-build pattern (CommonJS and ES 
Modules) for maximum compatibility.

Key design decisions include organizing types by domain (platform, database, 
API) and providing both granular and combined exports for flexibility.
```

### Key Features

Use bullet points with bold feature names:

```markdown
## Key Features

- **Type Safety**: Complete TypeScript coverage with strict mode
- **Dual Build**: CommonJS and ES Modules for compatibility
- **Domain Organization**: Types organized by functional area
- **Tree Shaking**: Granular exports enable tree shaking
```

### Installation

Always include monorepo installation instructions first:

```markdown
## Installation

### As a Workspace Dependency

```bash
pnpm add @universo/package-name --filter @universo/other-package
```

### External Installation (if published)

```bash
pnpm add @universo/package-name
```
```

### Usage Examples

Provide practical, runnable examples:

**Basic Example**: Simple, common use case
**Advanced Example**: More complex scenario
**Next.js Specific**: Server Components and Client Components examples

```typescript
// Always show imports
import { Feature } from '@universo/package-name';

// Show realistic usage
const result = Feature.doSomething();
```

### API Reference

Document all exported types, classes, and functions:

#### For Classes

```markdown
#### `ClassName`

Description of what the class does.

```typescript
class ClassName {
  constructor(options: ClassOptions)
  method1(): ReturnType
  method2(param: ParamType): void
}
```

**Constructor Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `string` | Required | User's name |
| `age` | `number` | `0` | User's age |
```

#### For Functions

```markdown
#### `functionName(param: Type): ReturnType`

Description of what the function does.

**Parameters:**
- `param`: Description of parameter

**Returns:** Description of return value

**Example:**
```typescript
const result = functionName('value');
```
```

#### For Types

```markdown
#### `TypeName`

Description of the type.

```typescript
interface TypeName {
  field1: string;
  field2: number;
  field3?: boolean;
}
```

**Properties:**
- `field1`: Description
- `field2`: Description
- `field3`: (Optional) Description
```

### Architecture

Include a directory tree and explain design:

```markdown
## Architecture

### Package Structure

```
@universo/package-name/
└── base/
    ├── src/
    │   ├── index.ts
    │   ├── feature1/
    │   └── feature2/
    ├── dist/
    └── package.json
```

### Design Decisions

- **Choice 1**: Why we made this choice
- **Choice 2**: Trade-offs considered
```

### Development Commands

Always include these standard commands:

```markdown
## Development

### Building

```bash
pnpm build --filter @universo/package-name
pnpm dev --filter @universo/package-name
```

### Testing

```bash
pnpm test --filter @universo/package-name
pnpm test:watch --filter @universo/package-name
pnpm test:coverage --filter @universo/package-name
```

### Linting

```bash
pnpm lint --filter @universo/package-name
pnpm lint:fix --filter @universo/package-name
```

### Type Checking

```bash
pnpm type-check --filter @universo/package-name
```
```

## Bilingual Documentation

### README-RU.md Requirements

The Russian version (`README-RU.md`) must:

1. **Exact Translation**: Translate all English content to Russian
2. **Same Structure**: Keep identical heading hierarchy
3. **Same Length**: Maintain the same number of lines
4. **Same Code**: Keep code examples identical (only translate comments)
5. **Same Links**: Use the same relative links

### Translation Guidelines

**DO:**
- Translate all text content accurately
- Translate code comments to Russian
- Translate table headers and content
- Maintain technical terms where appropriate (e.g., "TypeScript", "Next.js")

**DON'T:**
- Change code structure or examples
- Add or remove sections
- Change heading levels
- Modify links or file references

### Example Comparison

**README.md (English):**
```markdown
## Overview

The `@universo/types` package provides type definitions.

```typescript
// Create a new instance
const instance = new Class();
```
```

**README-RU.md (Russian):**
```markdown
## Обзор

Пакет `@universo/types` предоставляет определения типов.

```typescript
// Создать новый экземпляр
const instance = new Class();
```
```

## Package Types and Their Documentation

### Frontend Packages (`*-frt`)

Focus on:
- React component usage
- Client-side state management
- UI integration examples
- MUI theming considerations
- Next.js Client Component patterns

### Backend Packages (`*-srv`)

Focus on:
- Express/Next.js route handlers
- Database operations
- Authentication middleware
- API endpoints
- Server-side business logic

### Shared Utility Packages

Focus on:
- Pure functions and utilities
- Platform-agnostic usage
- Performance characteristics
- Type safety guarantees

### Type Definition Packages

Focus on:
- Type organization
- Import patterns
- Type usage examples
- Relationship to other types

## Validation Checklist

Before committing package documentation:

- [ ] All `[Placeholders]` replaced with actual content
- [ ] Code examples are tested and work correctly
- [ ] API reference is complete and accurate
- [ ] Development commands are correct for the package
- [ ] README-RU.md is exact translation with same structure
- [ ] No broken links or references
- [ ] Badges updated if package is published
- [ ] Examples show Next.js App Router patterns (if applicable)
- [ ] Security considerations mentioned (if applicable)
- [ ] Performance notes included (if relevant)

## Common Mistakes to Avoid

1. **Incomplete API Documentation**: Don't document only some exports
2. **Outdated Examples**: Keep examples in sync with actual code
3. **Missing Russian Translation**: Always create README-RU.md
4. **Inconsistent Structure**: Follow the template structure
5. **Generic Descriptions**: Be specific about what the package does
6. **Missing Integration Info**: Explain how it fits in the system
7. **No Usage Examples**: Always include practical examples
8. **Wrong Scope**: Use `@universo/` scope for all packages
9. **Broken Commands**: Test all command examples
10. **Missing Type Information**: Document TypeScript types fully

## Tips for Good Documentation

1. **Write for Beginners**: Assume minimal context knowledge
2. **Show, Don't Tell**: Prefer code examples over descriptions
3. **Be Specific**: Use concrete examples, not abstract explanations
4. **Keep it Updated**: Update docs when code changes
5. **Link to Related**: Reference related packages and docs
6. **Explain Why**: Document reasons for design decisions
7. **Include Caveats**: Mention limitations and gotchas
8. **Test Examples**: Make sure code examples actually work
9. **Use Consistent Terminology**: Match project conventions
10. **Consider Performance**: Document performance implications

## Getting Help

If you need help with package documentation:

1. Look at existing packages for examples:
   - `@universo/types` - Type definition package
   - `@universo/utils` - Utility package
   - `@universo/clusters-frt` - Frontend domain package
   - `@universo/clusters-srv` - Backend domain package

2. Ask in GitHub issues with the `documentation` label

3. Contact the team:
   - VK: [https://vk.com/vladimirlevadnij](https://vk.com/vladimirlevadnij)
   - Telegram: [https://t.me/Vladimir_Levadnij](https://t.me/Vladimir_Levadnij)
   - Email: universo.pro@yandex.com

## Template Maintenance

This template should be updated when:
- Project conventions change
- New standard sections are needed
- Better examples are discovered
- Translation guidelines evolve

Last Updated: 2025-11-17
