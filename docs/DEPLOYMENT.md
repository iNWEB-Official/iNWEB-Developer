# Deployment

## Platform

The website is deployed as static files with GitHub Pages. No server process, build service, environment secret or runtime configuration is required.

## Workflow

`.github/workflows/website.yml` separates validation from deployment:

- Pull requests and branch pushes run validation only.
- A push to `main` runs validation and, if it succeeds, creates a minimal Pages artifact containing `index.html`, `assets/`, `robots.txt` and `.nojekyll`.
- GitHub’s Pages deployment action publishes that artifact to the `github-pages` environment.

The repository’s Pages source must be set to **GitHub Actions**. Environment protection rules may be enabled for additional release approval.

## Release checklist

1. Confirm the proposed version follows Semantic Versioning.
2. Update `VERSION`, `CHANGELOG.md` and the footer version together.
3. Complete bilingual, privacy, visual and accessibility review.
4. Require a passing website-validation check.
5. Merge the reviewed pull request to `main`.
6. Confirm the deployment job completes and the Pages environment records the new revision.
7. Review the live page and its contact links.

## Rollback

Revert the problematic commit on `main` through a reviewed pull request. The normal workflow validates and redeploys the restored static files. Avoid editing the generated Pages environment directly because source control is the deployment record.

## Other static hosts

The same public files can be copied to any HTTPS static host. Preserve the repository-relative directory structure. If a custom domain is introduced, add its platform configuration and update any absolute social metadata in a separately reviewed change.
