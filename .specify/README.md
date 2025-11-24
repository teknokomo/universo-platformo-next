# .specify Directory Structure

This directory contains all project specifications, documentation, and organizational memory for the universo-platformo-next project.

## Directory Structure

```
.specify/
├── memory/           # Project memory and knowledge base
│   ├── constitution.md      # Core principles, standards, and guidelines
│   ├── analysis/            # Architectural analysis and reviews
│   └── archive/             # Archived historical documents
├── specs/            # Feature specifications
│   └── NNN-feature-name/    # Individual feature specifications
│       ├── spec.md          # Feature specification
│       ├── tasks.md         # Implementation tasks
│       ├── plan.md          # Implementation plan
│       ├── data-model.md    # Data models and schemas
│       ├── research.md      # Research and decisions
│       ├── quickstart.md    # Quick start guide
│       ├── checklists/      # Quality checklists
│       └── contracts/       # API contracts
├── scripts/          # Utility scripts
│   └── bash/                # Bash scripts for automation
└── templates/        # Document templates
    ├── spec-template.md        # Feature specification template
    ├── tasks-template.md       # Tasks document template
    ├── plan-template.md        # Implementation plan template
    ├── checklist-template.md   # Checklist template
    └── agent-file-template.md  # Agent configuration template
```

## Directory Descriptions

### `/memory`
Contains the project's institutional knowledge:
- **constitution.md**: The authoritative source for project principles, technology stack, architecture patterns, and development standards
- **analysis/**: Architectural analyses, best practices documents, and review findings
- **archive/**: Historical documents that are no longer actively used but preserved for reference

### `/specs`
Feature specifications organized by numbered directories (NNN-feature-name):
- Each feature gets its own directory with a three-digit prefix for ordering
- Contains all documentation for a specific feature or epic
- Follows templates from `/templates` directory

### `/scripts`
Automation scripts for project operations:
- **bash/**: Shell scripts for prerequisites checking, validation, and automation

### `/templates`
Standard templates for creating new documentation:
- Used by automation tools and developers
- Ensures consistency across all specifications

## Usage Guidelines

### Creating a New Feature Specification

1. Create a new directory: `.specify/specs/NNN-feature-name/`
2. Copy templates from `.specify/templates/`
3. Fill in the specification following the template structure
4. Reference `.specify/memory/constitution.md` for standards compliance

### Updating the Constitution

The constitution is the source of truth for project standards. Updates should:
1. Be proposed with clear rationale
2. Follow the amendment process defined in the constitution
3. Include version increment (semantic versioning)
4. Document all changes with impact analysis

### Adding Analysis Documents

New architectural analyses, reviews, or summaries should be placed in:
- `.specify/memory/analysis/` - For active reference documents
- `.specify/memory/archive/` - For historical documents

## Integration with .github/agents

The `.specify` directory is accessible to GitHub Copilot agents in specific modes:
- **tasks** mode: Can access `.specify/` for task generation and planning
- **analytics** mode: Can access `.specify/` for project analysis

This integration is configured in `.github/agents/` configuration files.

## Document Formatting Standards

All documents in `.specify/` must follow these standards:

1. **Markdown**: Use standard GitHub-flavored Markdown
2. **Bilingual**: Provide both English and Russian versions where required
3. **Structure**: Follow template structure precisely
4. **Naming**: Use lowercase with hyphens (kebab-case)
5. **Line Length**: Prefer 120 characters or less for readability
6. **Code Blocks**: Always specify language for syntax highlighting

## Related Documentation

- Main project README: `/README.md`
- Security policy: `/SECURITY.md`
- GitHub workflow instructions: `/.github/instructions/`
- Agent configurations: `/.github/agents/`

---

For questions about this structure, refer to the constitution or project documentation.
