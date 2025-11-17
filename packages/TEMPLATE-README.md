# Package Name

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/teknokomo/universo-platformo-next)
[![License](https://img.shields.io/badge/license-MIT-green)](../../LICENSE)

## Overview

[Brief description of the package in 2-3 sentences. Explain what problem it solves and how it fits into the Universo Platformo Next ecosystem.]

## Features

- **Feature 1**: Description of the first key feature
- **Feature 2**: Description of the second key feature
- **Feature 3**: Description of the third key feature
- **Feature 4**: Additional features as needed

## Installation

### As a Workspace Package

This package is part of the Universo Platformo Next monorepo:

```bash
# From repository root
pnpm install
```

### As an External Dependency (if published)

```bash
pnpm add @universo/package-name
```

## Usage

### Basic Usage

```typescript
// Import the package
import { MainClass, helperFunction } from '@universo/package-name'

// Basic example
const instance = new MainClass({
  option1: 'value1',
  option2: 'value2',
})

const result = instance.doSomething()
console.log(result)
```

### Advanced Usage

```typescript
// Advanced example with more complex configuration
import { MainClass, AdvancedOptions } from '@universo/package-name'

const advancedInstance = new MainClass({
  option1: 'value1',
  option2: 'value2',
  advanced: {
    setting1: true,
    setting2: 'custom',
  },
} as AdvancedOptions)

// Use advanced features
await advancedInstance.advancedMethod()
```

### With Next.js

```typescript
// Example for frontend packages
'use client' // or 'use server' as appropriate

import { ComponentName } from '@universo/package-name'

export default function Page() {
  return (
    <div>
      <ComponentName prop1="value" prop2={123} />
    </div>
  )
}
```

## API Reference

### Classes

#### `MainClass`

Main class description.

**Constructor:**
```typescript
constructor(options: MainClassOptions)
```

**Methods:**

##### `doSomething(param: string): Result`

Description of what this method does.

**Parameters:**
- `param` (string): Description of the parameter

**Returns:** `Result` - Description of return value

**Example:**
```typescript
const result = instance.doSomething('input')
```

### Functions

#### `helperFunction(input: Input): Output`

Description of the helper function.

**Parameters:**
- `input` (Input): Description of input parameter

**Returns:** `Output` - Description of return value

**Example:**
```typescript
const output = helperFunction({ key: 'value' })
```

### Types

#### `MainClassOptions`

Configuration options for MainClass.

```typescript
interface MainClassOptions {
  /** Description of option1 */
  option1: string
  /** Description of option2 */
  option2: string
  /** Optional advanced settings */
  advanced?: AdvancedOptions
}
```

#### `Result`

Result type returned by MainClass methods.

```typescript
interface Result {
  /** Success status */
  success: boolean
  /** Result data */
  data?: unknown
  /** Error message if failed */
  error?: string
}
```

### Components (for UI packages)

#### `ComponentName`

React component description.

**Props:**

```typescript
interface ComponentNameProps {
  /** Description of prop1 */
  prop1: string
  /** Description of prop2 */
  prop2: number
  /** Optional callback */
  onAction?: (value: string) => void
}
```

**Example:**
```tsx
<ComponentName 
  prop1="example" 
  prop2={42} 
  onAction={(value) => console.log(value)}
/>
```

## Architecture

This package follows the standard Universo Platformo Next architecture:

```
package-name/
└── base/
    ├── src/
    │   ├── components/      # React components (frontend)
    │   ├── routes/          # API routes (backend)
    │   ├── services/        # Business logic (backend)
    │   ├── database/        # ORM entities (backend)
    │   ├── types/           # TypeScript definitions
    │   ├── utils/           # Utility functions
    │   └── index.ts         # Main entry point
    ├── dist/                # Compiled output (CJS + ESM)
    ├── package.json
    ├── tsconfig.json
    ├── vitest.config.ts
    ├── README.md            # This file
    └── README-RU.md         # Russian translation
```

### Design Decisions

- **Decision 1**: Explanation of key architectural decision
- **Decision 2**: Rationale for technology choice
- **Decision 3**: Pattern used and why

### Dependencies

- `dependency1`: Why this dependency is needed
- `dependency2`: Purpose of this dependency
- `@universo/types`: Shared type definitions

## Development

### Prerequisites

- Node.js >=18.15.0
- PNPM >=9

### Setup

```bash
# Clone the repository
git clone https://github.com/teknokomo/universo-platformo-next.git
cd universo-platformo-next

# Install dependencies
pnpm install

# Navigate to this package
cd packages/package-name/base
```

### Building

```bash
# Build this package
pnpm build

# Build with watch mode
pnpm dev
```

### Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Linting

```bash
# Run ESLint
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format with Prettier
pnpm format
```

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Create an Issue describing the feature or bug
2. Create a feature branch from `main`
3. Make your changes following the project conventions
4. Write or update tests
5. Update documentation (both English and Russian)
6. Submit a Pull Request referencing the Issue

### Code Style

- Follow TypeScript strict mode requirements
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Write tests for all new features

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Acknowledgments

- Based on architectural patterns from [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react)
- Built with [Next.js](https://nextjs.org/)
- UI components powered by [Material-UI](https://mui.com/)
- Database integration with [Supabase](https://supabase.com/)

## Support

For questions or issues:

- Create an issue in the [GitHub repository](https://github.com/teknokomo/universo-platformo-next/issues)
- Refer to the [main project documentation](../../README.md)
- Contact: [universo.pro@yandex.com](mailto:universo.pro@yandex.com)

---

**Version**: 0.1.0  
**Last Updated**: 2025-11-17
