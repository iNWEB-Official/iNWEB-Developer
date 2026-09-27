# Contributing

Thank you for improving the iNWEB public website.

## Workflow

1. Create a focused branch from the current `main` branch.
2. Make the smallest coherent change.
3. Update both English and Bengali content where applicable.
4. Update documentation when behaviour, deployment, privacy or maintenance changes.
5. Update release metadata for a release change.
6. Open a pull request with the purpose, content impact and manual review completed.
7. Use the GitHub Actions result as the automated validation record.

Do not add a package manager, JavaScript framework, build step, remote runtime dependency or analytics service without an approved architecture and privacy review.

## Commit style

Use concise imperative Conventional Commit subjects where practical, for example:

- `feat: add team discipline filter`
- `fix: preserve content without JavaScript`
- `docs: clarify profile privacy policy`

## Content and privacy

Follow [the content guide](docs/CONTENT_GUIDE.md). Public staff content must remain management-approved and role-focused. Never commit credentials, tokens, private contact information or unapproved personal identifiers.

## Quality

A pull request should have a passing website workflow and complete applicable manual checks in [Testing](docs/TESTING.md) and [Accessibility](docs/ACCESSIBILITY.md). Reviewers should be able to understand the change without generated files or local dependency installation.
