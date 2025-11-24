# Quick Reference: Documentation Structure

## 📁 Where to Find Things

### Main Documentation
```
/README.md              → Project overview (English)
/README-RU.md           → Project overview (Russian)
/SECURITY.md            → Security policy
```

### Specifications & Memory
```
/.specify/
├── specs/              → Feature specifications
│   └── NNN-name/       → Individual feature (001-nextjs-foundation-setup, etc.)
├── memory/             → Project knowledge base
│   ├── constitution.md → Core principles & standards (v1.5.0)
│   └── analysis/       → Architectural analyses & reviews
├── scripts/            → Automation tools
│   └── bash/           → Shell scripts (check-prerequisites.sh, etc.)
└── templates/          → Document templates
```

### GitHub Configuration
```
/.github/
├── agents/             → GitHub Copilot agent configurations
├── instructions/       → Development guidelines
└── prompts/            → Agent prompts
```

## 🔄 Path Changes (November 2024)

**OLD** → **NEW**
```
specs/                  → .specify/specs/
[root]/ANALYSIS-*.md    → .specify/memory/analysis/
```

## 💡 Quick Actions

### Creating a New Feature
```bash
# Specs go in .specify/specs/
mkdir -p .specify/specs/002-new-feature
cp .specify/templates/spec-template.md .specify/specs/002-new-feature/spec.md
```

### Finding Documentation
```bash
# View constitution
cat .specify/memory/constitution.md

# List all specs
ls .specify/specs/

# View analysis documents
ls .specify/memory/analysis/
```

### Running Scripts
```bash
# Check prerequisites for current feature
SPECIFY_FEATURE=001-nextjs-foundation-setup \
  .specify/scripts/bash/check-prerequisites.sh --json
```

### Agent Commands
All `/speckit.*` commands now have access to `.specify/` automatically:
- `/speckit.specify` - Create specification
- `/speckit.plan` - Create plan
- `/speckit.tasks` - Generate tasks
- `/speckit.analyze` - Analyze consistency

## 📚 Key Documents

### Must Read
1. **Constitution**: `.specify/memory/constitution.md`
   - Core principles (NON-NEGOTIABLE items marked)
   - Technology stack requirements
   - Development workflow
   - Phase roadmap

2. **Spec Template**: `.specify/templates/spec-template.md`
   - Follow this for new features

3. **README**: `.specify/README.md`
   - Complete guide to .specify structure

### Reference
- **Analysis Index**: `.specify/memory/analysis/README.md`
- **Reorganization Summary**: `.specify/memory/analysis/DOCUMENTATION-REORGANIZATION-SUMMARY.md`

## 🌍 Bilingual Support

- English is primary language
- Russian version must be exact translation
- File naming: `file.md` (EN) + `file-RU.md` (RU)
- Update both versions simultaneously

## 🚀 GitHub Actions

Agent configurations include:
```yaml
allowed_paths:
  - .specify/
  - .github/
```

This grants agents access to specifications and configuration.

## 🔧 Development Tools

### Prerequisites Script
```bash
# Basic check
.specify/scripts/bash/check-prerequisites.sh

# JSON output
.specify/scripts/bash/check-prerequisites.sh --json

# With tasks requirement
.specify/scripts/bash/check-prerequisites.sh --json --require-tasks
```

### Environment Variables
```bash
# Override branch detection
export SPECIFY_FEATURE=001-nextjs-foundation-setup

# Then run scripts normally
.specify/scripts/bash/check-prerequisites.sh
```

## ❓ Common Questions

**Q: Where do I put new specs?**  
A: `.specify/specs/NNN-feature-name/`

**Q: Where are the old analysis docs?**  
A: `.specify/memory/analysis/`

**Q: How do I access specs in scripts?**  
A: Use `.specify/scripts/bash/check-prerequisites.sh` to get paths

**Q: Do agents have access to .specify?**  
A: Yes, all 9 speckit agents have explicit access

**Q: Where's the constitution?**  
A: `.specify/memory/constitution.md` (v1.5.0)

---

Last updated: 2024-11-24  
For complete details: [.specify/README.md](README.md)
