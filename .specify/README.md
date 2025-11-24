# .specify Directory

This directory contains the project's documentation, specifications, and tooling for the Specification-Driven Development (SpecKit) workflow.

## Directory Structure

```
.specify/
├── memory/          # Project memory and constitution
├── specs/           # Feature specifications
├── templates/       # Documentation templates
├── scripts/         # Helper scripts
└── docs/            # Analysis and summary documents
```

## Subdirectories

### memory/

Contains the project's long-term memory and constitutional documents:

- **constitution.md** - Core project principles, architectural standards, technology guidelines, and development roadmap. This is the authoritative source for project-wide decisions.

### specs/

Feature specifications organized by number and name (NNN-feature-name):

```
specs/
└── 001-nextjs-foundation-setup/
    ├── spec.md          # Feature specification
    ├── plan.md          # Technical implementation plan
    ├── tasks.md         # Task breakdown
    ├── data-model.md    # Data model (if applicable)
    ├── research.md      # Research and decisions
    ├── quickstart.md    # Testing scenarios
    ├── checklists/      # Validation checklists
    └── contracts/       # API contracts and schemas
```

Each feature gets its own numbered directory (001, 002, 003, etc.) with a descriptive name.

### templates/

Documentation templates for consistent structure:

- **spec-template.md** - Template for feature specifications
- **plan-template.md** - Template for technical plans
- **tasks-template.md** - Template for task breakdowns
- **checklist-template.md** - Template for validation checklists
- **agent-file-template.md** - Template for agent instructions

### scripts/

Helper scripts for workflow automation:

- **bash/check-prerequisites.sh** - Validate feature environment
- **bash/create-new-feature.sh** - Create new feature structure
- **bash/setup-plan.sh** - Initialize planning documents
- **bash/update-agent-context.sh** - Update agent instructions
- **bash/common.sh** - Shared functions and utilities

### docs/

#### docs/analysis/

Architectural and code analysis documents:

- Architectural analysis documents (ARCHITECTURAL-ANALYSIS*.md)
- Code review findings (REVIEW-FINDINGS*.md)
- Technical debt assessments
- Pattern analysis

#### docs/summaries/

Project summaries and proposals:

- Best practices integration summaries
- Specification enhancement summaries
- Task completion summaries
- Constitution update proposals
- Planning summaries

## Usage

### For Developers

1. **Starting a new feature**: Use `/speckit.specify` command or run `create-new-feature.sh`
2. **Planning implementation**: Use `/speckit.plan` to generate technical plan
3. **Breaking down tasks**: Use `/speckit.tasks` to create task list
4. **Implementing**: Use `/speckit.implement` to execute tasks
5. **Analyzing**: Use `/speckit.analyze` for consistency checks

### For Agents

Agents working on **tasks** and **analytics** modes have full access to the `.specify/` directory:

- **Read access**: All subdirectories (memory, specs, templates, docs, scripts)
- **Write access**: specs/, docs/ (for updating specifications and documentation)
- **Execute access**: scripts/ (for automation)

### For Reviewers

Before reviewing code changes:

1. Check `.specify/memory/constitution.md` for project principles
2. Read relevant feature spec in `.specify/specs/NNN-feature-name/spec.md`
3. Review technical plan in `.specify/specs/NNN-feature-name/plan.md`
4. Verify tasks checklist in `.specify/specs/NNN-feature-name/tasks.md`

## Documentation Standards

All documentation in this directory follows these standards:

1. **Bilingual**: English is primary, Russian translations provided where applicable
2. **Markdown format**: All documents use Markdown (.md)
3. **Structured**: Follow templates for consistency
4. **Versioned**: Track changes through git
5. **Cross-referenced**: Link related documents

## SpecKit Commands

The SpecKit workflow provides these commands:

- `/speckit.specify` - Create/update feature specification
- `/speckit.clarify` - Clarify ambiguous requirements
- `/speckit.plan` - Generate technical implementation plan
- `/speckit.tasks` - Break down into actionable tasks
- `/speckit.analyze` - Validate consistency across artifacts
- `/speckit.implement` - Execute implementation
- `/speckit.constitution` - Update project constitution

## File Naming Conventions

### Feature Directories

Format: `NNN-short-descriptive-name`

Examples:
- `001-nextjs-foundation-setup`
- `002-user-authentication`
- `003-analytics-dashboard`

### Analysis Documents

Format: `DESCRIPTIVE-NAME[-LANG].md`

Examples:
- `ARCHITECTURAL-ANALYSIS.md` (English)
- `ARCHITECTURAL-ANALYSIS-RU.md` (Russian)
- `REVIEW-FINDINGS.md`

### Summary Documents

Format: `TOPIC-SUMMARY[-LANG].md`

Examples:
- `PLANNING-SUMMARY.md`
- `TASK-COMPLETION-SUMMARY.md`
- `BEST-PRACTICES-INTEGRATION-SUMMARY-RU.md`

## Maintenance

### Adding New Features

Run the creation script:
```bash
.specify/scripts/bash/create-new-feature.sh "Feature description"
```

This will:
1. Determine the next available number
2. Create the feature directory structure
3. Initialize spec.md from template
4. Create a git branch (if in git repository)

### Updating Constitution

Use the constitution agent:
```
/speckit.constitution Update authentication to use new library
```

### Organizing Documentation

- Keep analysis documents in `docs/analysis/`
- Keep summaries in `docs/summaries/`
- Archive old documents rather than deleting
- Update this README when adding new document types

## Integration with GitHub

The `.github/agents/` directory contains agent instructions that reference `.specify/`:

- Agents read constitution from `.specify/memory/constitution.md`
- Agents read/write specs in `.specify/specs/`
- Agents use templates from `.specify/templates/`
- Agents execute scripts from `.specify/scripts/`

## Best Practices

1. **Always run through SpecKit workflow**: Don't manually edit specs without corresponding commands
2. **Keep constitution updated**: Document major architectural decisions
3. **Archive, don't delete**: Move old documents to appropriate subdirectories
4. **Use templates**: Maintain consistency across features
5. **Cross-reference**: Link related documents
6. **Version control**: Commit changes regularly with descriptive messages

## References

- [Project Constitution](./memory/constitution.md) - Core principles
- [Root README](../README.md) - Project overview
- [GitHub Instructions](../.github/instructions/) - Workflow guidelines
