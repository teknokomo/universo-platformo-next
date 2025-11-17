# Configuration Contracts

This directory contains schema definitions and contracts for Phase 1 foundation setup. These are primarily TypeScript interfaces and JSON schemas for configuration files rather than REST/GraphQL API contracts (those will come in later phases).

## Contents

1. **package-schema.json** - JSON Schema for package.json structure in workspace packages
2. **workspace-schema.json** - JSON Schema for pnpm-workspace.yaml
3. **turbo-pipeline-schema.json** - JSON Schema for turbo.json pipeline configuration
4. **env-schema.ts** - TypeScript schema for environment variable validation
5. **tsconfig-schema.json** - JSON Schema for tsconfig.json validation

These schemas serve as:
- Validation rules for configuration files
- Documentation of expected structure
- Type definitions for tooling and scripts
- Contracts between packages and build system

## Usage

Configuration schemas are used by:
- Development tooling for validation
- CI/CD pipelines for verification
- Documentation generation
- IDE autocomplete and validation
