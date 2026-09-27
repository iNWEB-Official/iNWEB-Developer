# Testing and validation

## Policy

Project validation runs in GitHub Actions. Contributors are not expected to install a local toolchain or run a local test suite.

The `.github/workflows/website.yml` workflow runs for pull requests and pushes. A change is ready to merge only after its validation job passes and required manual review is complete.

## Automated checks

The workflow:

1. checks out the exact revision;
2. rejects whitespace errors;
3. runs JavaScript syntax validation without installing project dependencies;
4. runs `scripts/validate_site.py` with the Python standard library; and
5. uploads a static GitHub Pages artifact only for the protected deployment path.

The static validator checks required files, relative asset references, duplicate and broken fragment identifiers, key document metadata, basic control attributes, paired bilingual attributes, the number and identity of staff cards, and corresponding JavaScript profile records.

## Manual acceptance checks

Automation does not establish visual, translation or complete accessibility quality. Pull-request review should cover:

- responsive layout at mobile, tablet and desktop sizes;
- English and Bengali copy;
- navigation and contact destinations;
- search, filters, clear state and profile dialogs;
- privacy requirements for staff content;
- the checklist in [Accessibility](ACCESSIBILITY.md); and
- current versions of major browsers used by the intended audience.

## Failure handling

Open the failed workflow run, expand the failing step and use its annotations or terminal output to identify the file and condition. Correct the source and push a new commit; do not bypass or delete a failed check to make a pull request appear green.
