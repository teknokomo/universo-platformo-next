# Specification Analysis Report

**Date**: 2025-11-25  
**Feature**: 001-nextjs-foundation-setup  
**Artifacts Analyzed**: spec.md, plan.md, tasks.md, constitution.md (v1.5.0)  
**Status**: Analysis Complete

---

## Executive Summary

This analysis identified **3 CRITICAL issues**, **4 HIGH severity issues**, and **6 MEDIUM severity issues** across the three core artifacts. The most significant finding is an inconsistency between spec.md and constitution.md regarding authentication technology (Passport.js vs @supabase/ssr) and MUI version (v5 vs v6).

---

## Findings Table

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| I1 | Inconsistency | CRITICAL | spec.md:L143,279-280,333 vs constitution.md:L255,277 | **Authentication technology conflict**: spec.md mandates Passport.js (FR-043, FR-044) while constitution v1.5.0 specifies @supabase/ssr package. Constitution explicitly states Passport.js was replaced. | Update spec.md to replace Passport.js references with @supabase/ssr. Update FR-043, FR-044, User Story 7, and Key Entities. |
| I2 | Inconsistency | CRITICAL | spec.md:L168,287 vs constitution.md:L256,287 | **MUI version conflict**: spec.md specifies "MUI v5.x" (FR-048) while constitution v1.5.0 requires "MUI v6.x" with ColorScheme API. | Update spec.md FR-048 to "MUI v6.x or latest stable" and add ColorScheme API requirement. |
| I3 | Coverage Gap | CRITICAL | spec.md:FR-001-072 vs constitution.md:L250 | **Missing Turborepo requirement**: Constitution mandates Turborepo for build orchestration, but spec.md has NO functional requirement for Turborepo. tasks.md has T004 for turbo.json. | Add FR-073: "System MUST use Turborepo for monorepo build orchestration with turbo.json configuration" to spec.md. |
| C1 | Coverage Gap | HIGH | spec.md:FR-001-072 vs constitution.md:L251 | **Missing tsdown requirement**: Constitution mandates tsdown for dual CJS+ESM output, but spec.md has no corresponding requirement. | Add FR-074: "Shared packages MUST use tsdown for dual build output (CJS + ESM + Types)" to spec.md. |
| C2 | Coverage Gap | HIGH | spec.md:FR-001-072 vs constitution.md:L262 | **Missing Husky requirement**: Constitution mandates Husky for git hooks, but spec.md only says "MAY be configured" (FR-072). | Update FR-072 from "MAY be configured" to "MUST be configured" to align with constitution. |
| C3 | Coverage Gap | HIGH | spec.md vs tasks.md | **No explicit FR-to-Task mapping**: Tasks reference User Stories (US1-US9) but not Functional Requirements (FR-001-072). Coverage tracking is difficult. | Consider adding FR references to tasks or creating a coverage matrix document. |
| C4 | Underspecification | HIGH | spec.md:FR-037-042 | **Database abstraction vague**: FR-037-042 mention database abstraction but don't specify ORM choice. Constitution recommends Prisma (research.md Task 4). | Add note that ORM will be selected in Phase 2, with Prisma as the recommended option per research.md. |
| A1 | Ambiguity | MEDIUM | plan.md:L30,35,39,43,47,52,58 | **Unresolved "NEEDS CLARIFICATION" markers**: Seven items marked as needing clarification in Key Technology Decisions, though research.md claims to resolve them. | Remove "NEEDS CLARIFICATION" markers from plan.md since research.md provides answers. Add "RESOLVED - see research.md" notes. |
| D1 | Duplication | MEDIUM | spec.md:FR-002 + FR-002a + FR-002b | **Redundant packages/ directory requirements**: Three separate requirements all address packages/ directory structure. | Consider consolidating FR-002, FR-002a, FR-002b into a single comprehensive requirement with sub-points. |
| D2 | Duplication | MEDIUM | spec.md:FR-012 + FR-012a + FR-013 + FR-013a | **Redundant package structure requirements**: Four requirements address package naming and base/ directory with overlapping content. | Consider consolidating into two clear requirements: naming convention (FR-012) and directory structure (FR-013). |
| T1 | Terminology Drift | MEDIUM | spec.md:L333 vs constitution.md:L255 | **"Passport.js-based authentication"**: Key Entities section still uses Passport.js terminology when constitution uses Supabase Auth. | Update Key Entities "Authentication Strategy" to reference Supabase Auth with @supabase/ssr. |
| T2 | Terminology Drift | MEDIUM | tasks.md:T082 | **Mixed auth terminology**: Task T082 mentions "Supabase Auth Helpers" but constitution uses "@supabase/ssr". Should be consistent. | Update T082 description to use "@supabase/ssr" instead of "Supabase Auth Helpers". |
| U1 | Underspecification | MEDIUM | spec.md:FR-053 | **Testing framework not specified**: FR-053 says "Jest, Vitest, or similar" but constitution specifies Vitest. | Update FR-053 to specify "Vitest with React Testing Library" per constitution. |

---

## Coverage Summary Table

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|
| FR-001 (pnpm-workspace.yaml) | ✅ | T002 | - |
| FR-002 (packages/ directory) | ✅ | T009 | - |
| FR-003 (TypeScript) | ✅ | T005, T033 | - |
| FR-004 (Next.js) | ✅ | T051-T067 | US5 covers this |
| FR-005 (bilingual README) | ✅ | T019, T020 | - |
| FR-007 (.env.example) | ✅ | T008 | - |
| FR-008 (ESLint) | ✅ | T006, T034 | - |
| FR-009 (Prettier) | ✅ | T007, T035 | - |
| FR-010 (.gitignore) | ✅ | T003 | - |
| FR-011 (.github/instructions) | ✅ | T043-T046 | Verification tasks |
| FR-012 (package naming) | ✅ | T029 | - |
| FR-013 (base/ directory) | ✅ | T014-T018 | @universo/types |
| FR-014 (root package.json) | ✅ | T001 | - |
| FR-037-042 (database abstraction) | ⚠️ | T074, T075 | Documentation only, no implementation in Phase 1 |
| FR-043-047 (auth/Passport.js) | ⚠️ | T077-T086 | Tasks use @supabase/ssr, FR uses Passport.js - CONFLICT |
| FR-048-052 (MUI) | ✅ | T087-T096 | But version conflict (v5 vs v6) |
| FR-053-058 (testing) | ✅ | T097-T108 | - |
| FR-059-063 (environment config) | ✅ | T068-T076 | - |
| FR-064-067 (security) | ⚠️ | T021 | SECURITY.md only, no scanning setup task |
| FR-068-072 (code quality) | ✅ | T033-T042 | - |
| **Constitution: Turborepo** | ✅ | T004 | No FR exists - GAP |
| **Constitution: tsdown** | ❌ | - | No FR, no task - GAP |
| **Constitution: Husky** | ⚠️ | T118 | Optional task, but constitution mandates |

---

## Constitution Alignment Issues

### CRITICAL Violations

1. **Authentication Technology (I1)**
   - **Principle Violated**: Technology Stack Requirements
   - **Constitution States**: "Authentication: Supabase with @supabase/ssr package (replacing deprecated @supabase/auth-helpers-nextjs)"
   - **Spec States**: "System MUST include configuration for Passport.js authentication framework"
   - **Resolution**: spec.md MUST be updated to align with constitution

2. **MUI Version (I2)**
   - **Principle Violated**: Technology Stack Requirements
   - **Constitution States**: "UI Framework: Material UI (MUI) 6.x or latest stable with ColorScheme API"
   - **Spec States**: "System MUST include Material UI (MUI) version 5.x or latest stable"
   - **Resolution**: spec.md MUST be updated to v6.x

3. **Build Orchestration (I3)**
   - **Principle Violated**: Mandatory Technologies
   - **Constitution States**: "Build Orchestration: Turborepo for monorepo build coordination"
   - **Spec States**: (no requirement)
   - **Resolution**: Add Turborepo requirement to spec.md

---

## Unmapped Tasks

The following tasks have no clear mapping to specific Functional Requirements:

| Task ID | Description | Suggested FR |
|---------|-------------|--------------|
| T004 | Create turbo.json | New FR-073 (Turborepo) |
| T112 | Add Prisma ORM configuration | New FR for Phase 2, or reference in FR-037 |
| T118 | Create .husky/ directory | Update FR-072 to MUST |

---

## Metrics

| Metric | Value |
|--------|-------|
| **Total Functional Requirements** | 72 (FR-001 to FR-072) |
| **Total Success Criteria** | 30 (SC-001 to SC-030) |
| **Total Tasks** | 121 (T001 to T121) |
| **User Stories** | 9 (US1 to US9) |
| **Coverage % (FR with tasks)** | ~90% (rough estimate) |
| **Ambiguity Count** | 7 (NEEDS CLARIFICATION markers) |
| **Duplication Count** | 2 clusters |
| **Critical Issues** | 3 |
| **High Issues** | 4 |
| **Medium Issues** | 6 |
| **Low Issues** | 0 |

---

## Next Actions

### Must Fix Before Implementation (CRITICAL) - ✅ ALL RESOLVED

1. ✅ **I1**: Updated spec.md authentication requirements (FR-043, FR-044, User Story 7, Key Entities) to reference @supabase/ssr instead of Passport.js
2. ✅ **I2**: Updated spec.md FR-048 from "MUI v5.x" to "MUI v6.x or latest stable with ColorScheme API"
3. ✅ **I3**: Added new FR-073, FR-074, FR-075 for Turborepo, tsdown, and build scripts requirements

### Recommended Improvements (HIGH) - ✅ RESOLVED

4. ✅ **C1**: Added FR-074 for tsdown dual build requirement
5. ✅ **C2**: Changed FR-072 from "MAY" to "MUST" for pre-commit hooks (Husky)
6. ⬜ **C3**: Create a requirements traceability matrix (optional, deferred)
7. ⬜ **C4**: Add note to FR-037-042 about ORM selection deferred to Phase 2 (optional)

### Optional Improvements (MEDIUM) - ✅ RESOLVED

8. ✅ **A1**: Cleaned up "NEEDS CLARIFICATION" markers in plan.md - replaced with "RESOLVED" references
9. ⬜ **D1, D2**: Consider consolidating redundant requirements (optional, low priority)
10. ⬜ **T1**: Fixed terminology drift in Key Entities (done in I1)
11. ✅ **T2**: Fixed terminology drift in tasks.md T082 (@supabase/ssr)
12. ✅ **U1**: Specified Vitest in FR-053

---

## Recommended Remediation Edits

### Priority 1: Critical Authentication Fix (I1)

**Files to modify**: spec.md

**Changes**:
1. Line 143: Change "Passport.js authentication with Supabase connector" to "Supabase authentication using @supabase/ssr package"
2. Line 151: Change "understand how Passport.js integrates with Supabase" to "understand how @supabase/ssr integrates for authentication"
3. Line 279 (FR-043): Change to "System MUST include configuration for Supabase authentication using @supabase/ssr package"
4. Line 280 (FR-044): Remove or change to "System MUST include browser and server Supabase client patterns per constitution"
5. Line 333: Update Authentication Strategy key entity
6. Line 378 (SC-023): Update to reference @supabase/ssr instead of Passport.js

### Priority 2: Critical MUI Version Fix (I2)

**Files to modify**: spec.md

**Changes**:
1. Line 168: Change "MUI v5.x" to "MUI v6.x"
2. Line 287 (FR-048): Change to "System MUST include Material UI (MUI) version 6.x or latest stable with ColorScheme API"

### Priority 3: Add Turborepo Requirement (I3)

**Files to modify**: spec.md

**Changes**:
1. Add new FR after FR-072: "FR-073: System MUST use Turborepo for monorepo build orchestration with turbo.json configuration"
2. Add corresponding SC: "SC-031: Turborepo builds all packages in correct dependency order with caching enabled"

---

## Conclusion

The specification artifacts are generally well-structured and comprehensive. However, there are **3 critical inconsistencies** between spec.md and constitution.md that **MUST be resolved before implementation** to ensure alignment with the project's technology choices.

The tasks.md file is correctly structured (121 tasks, proper format with checkboxes, task IDs, [P] markers, and [US#] labels). The tasks already align with the constitution's technology choices (using @supabase/ssr, MUI v6 patterns) - it is the spec.md that needs updating to match.

**Status**: ✅ All CRITICAL issues RESOLVED - spec.md, plan.md, tasks.md updated and aligned with constitution
