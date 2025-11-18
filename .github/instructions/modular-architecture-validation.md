# Modular Architecture Validation Guide

## Purpose

This guide provides validation checks to ensure all code contributions follow the project's mandatory modular architecture requirements. Use this checklist during code reviews and before merging any PR.

## Critical Requirements

### 1. ALL Feature Code in packages/ Directory

**Rule**: Every feature implementation MUST reside in the `packages/` directory.

**Validation**:
```bash
# Check for non-configuration code in root
find . -maxdepth 1 -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v ".config"

# Should return EMPTY or only config files
```

**✅ PASS**: Only configuration files (`.config.ts`, `.config.js`) in root  
**❌ FAIL**: Any feature code files in root directory

### 2. Frontend/Backend Package Separation

**Rule**: When a feature requires BOTH frontend and backend, they MUST be in separate packages.

**Validation**:
```bash
# Check package structure
ls packages/ | grep -E "(.*)-frt$|(.*)-srv$"

# Verify paired packages
for frt in packages/*-frt; do
    domain=$(basename "$frt" | sed 's/-frt$//')
    if [ -d "packages/${domain}-srv" ]; then
        echo "✅ $domain: properly separated"
    else
        echo "⚠️  $domain: frt exists without srv (check if srv is needed)"
    fi
done
```

**✅ PASS**: Features with both frontend and backend have `-frt` and `-srv` packages  
**❌ FAIL**: Mixed frontend/backend code in single package

### 3. Base Directory Requirement

**Rule**: Every package MUST have a `base/` directory containing all implementation code.

**Validation**:
```bash
# Check for base/ directories
for pkg in packages/*/; do
    if [ ! -d "${pkg}base" ]; then
        echo "❌ FAIL: $(basename $pkg) missing base/ directory"
    else
        echo "✅ PASS: $(basename $pkg) has base/ directory"
    fi
done
```

**✅ PASS**: All packages have `base/` directory  
**❌ FAIL**: Package without `base/` directory

### 4. Package Naming Conventions

**Rule**: Packages MUST follow naming conventions.

**Validation**:
- Frontend packages: `@universo/[domain]-frt` or `packages/[domain]-frt/`
- Backend packages: `@universo/[domain]-srv` or `packages/[domain]-srv/`
- Shared packages: `@universo/[name]` or `packages/universo-[name]/`

**✅ PASS**: All packages follow naming convention  
**❌ FAIL**: Package with incorrect naming

### 5. No Business Logic in Root

**Rule**: Root directory MUST contain ONLY configuration, documentation, and tooling files.

**Allowed in Root**:
- Configuration files: `*.config.js`, `*.config.ts`, `.eslintrc.*`, `.prettierrc`, `tsconfig.json`
- Package management: `package.json`, `pnpm-workspace.yaml`, `turbo.json`
- Documentation: `README.md`, `README-RU.md`, `SECURITY.md`, `LICENSE`
- Tooling: `.gitignore`, `.dockerignore`, `Dockerfile`, `docker-compose.yml`
- Directories: `.github/`, `.specify/`, `specs/`, `packages/`, `apps/`

**NOT Allowed in Root**:
- Source code directories: `src/`, `components/`, `services/`, `lib/`
- Business logic files: Any `.ts`/`.tsx` files with feature implementation
- Database code: Migrations, models, schemas outside packages
- API routes: Routes, controllers, middleware outside packages

**Validation**:
```bash
# Check for forbidden directories in root
forbidden_dirs=("src" "components" "services" "lib" "routes" "api" "models" "schemas")
for dir in "${forbidden_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "❌ FAIL: Root directory contains forbidden '$dir' directory"
    fi
done
```

## Pre-Merge Checklist

Before approving any PR, verify:

- [ ] **All feature code is in `packages/` directory**
  - No `.ts`/`.tsx` feature files in root
  - No `src/` or similar directories in root
  
- [ ] **Frontend/backend properly separated** (if both needed)
  - Feature with frontend has `-frt` package
  - Feature with backend has `-srv` package
  - No mixed code in single package
  
- [ ] **Each package has `base/` directory**
  - All package source code is within `base/`
  - No source code outside `base/` in package
  
- [ ] **Package names follow conventions**
  - Frontend: `@universo/[domain]-frt`
  - Backend: `@universo/[domain]-srv`
  - Shared: `@universo/[name]`
  
- [ ] **No business logic in root-level directories**
  - Only configuration files in root
  - Only permitted directories exist
  
- [ ] **Bilingual documentation included**
  - Each package has `README.md`
  - Each package has `README-RU.md` (exact translation)

## Automated Validation Script

```bash
#!/bin/bash
# Save as: scripts/validate-modular-architecture.sh

echo "=== Modular Architecture Validation ==="
echo ""

errors=0

# Check 1: No feature code in root
echo "Check 1: No feature code in root directory"
feature_files=$(find . -maxdepth 1 -type f \( -name "*.ts" -o -name "*.tsx" \) ! -name "*.config.ts" ! -name "*.config.js" 2>/dev/null | wc -l)
if [ "$feature_files" -gt 0 ]; then
    echo "❌ FAIL: Found feature code files in root"
    errors=$((errors + 1))
else
    echo "✅ PASS"
fi
echo ""

# Check 2: Base directories exist
echo "Check 2: All packages have base/ directory"
for pkg in packages/*/; do
    if [ ! -d "${pkg}base" ]; then
        echo "❌ FAIL: $(basename $pkg) missing base/ directory"
        errors=$((errors + 1))
    fi
done
if [ $errors -eq 0 ]; then
    echo "✅ PASS"
fi
echo ""

# Check 3: No forbidden directories in root
echo "Check 3: No forbidden directories in root"
forbidden=("src" "components" "services" "lib" "routes" "api" "models" "schemas")
for dir in "${forbidden[@]}"; do
    if [ -d "$dir" ]; then
        echo "❌ FAIL: Found forbidden directory '$dir' in root"
        errors=$((errors + 1))
    fi
done
if [ $errors -eq 0 ]; then
    echo "✅ PASS"
fi
echo ""

# Summary
echo "=== Summary ==="
if [ $errors -eq 0 ]; then
    echo "✅ All modular architecture checks passed"
    exit 0
else
    echo "❌ Found $errors violation(s) of modular architecture"
    exit 1
fi
```

## Common Violations and Fixes

### Violation 1: Feature Code in Root

**Problem**:
```
my-project/
├── src/           # ❌ WRONG: Feature code in root
│   ├── api/
│   └── components/
└── packages/
```

**Fix**:
```
my-project/
├── packages/
│   └── my-feature-frt/
│       └── base/
│           └── src/       # ✅ CORRECT: In package
│               ├── api/
│               └── components/
```

### Violation 2: Mixed Frontend/Backend

**Problem**:
```
packages/
└── my-feature/    # ❌ WRONG: Mixed code
    └── base/
        ├── frontend/
        └── backend/
```

**Fix**:
```
packages/
├── my-feature-frt/    # ✅ CORRECT: Separated
│   └── base/
│       └── src/
└── my-feature-srv/
    └── base/
        └── src/
```

### Violation 3: Missing Base Directory

**Problem**:
```
packages/
└── my-feature-frt/
    └── src/       # ❌ WRONG: No base/
```

**Fix**:
```
packages/
└── my-feature-frt/
    └── base/      # ✅ CORRECT: Has base/
        └── src/
```

## Enforcement in CI/CD

Add to `.github/workflows/validate.yml`:

```yaml
name: Validate Modular Architecture

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check modular architecture
        run: |
          bash scripts/validate-modular-architecture.sh
```

## Contact

Questions about modular architecture? See:
- [Project Constitution](../../.specify/memory/constitution.md)
- [Implementation Plan](../../specs/001-nextjs-foundation-setup/plan.md)
- Create an issue with label `question` and `architecture`
