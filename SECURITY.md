# Security policy

## Supported version

Security fixes are applied to the current version on `main`. The current pre-1.0 release line is `0.1.x`.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability or exposed private information. Contact iNWEB management through `ceo@inayatechlab.com` with:

- the affected URL or file;
- a concise description and potential impact;
- reproduction steps that do not harm users or data; and
- a safe way to contact you.

Do not include unnecessary personal data, exploit other systems, perform denial-of-service testing or publish the report before the team has had a reasonable opportunity to investigate.

## Project security model

The deployed website is static and has no login, database, server-side code, contact form, analytics or advertising tracker. Local assets and dependency-free browser code reduce the runtime supply-chain surface.

The main risks are repository compromise, unsafe outbound links, accidental disclosure in public content, browser-side injection introduced by future changes and deployment-workflow tampering. Changes therefore require review and GitHub Actions validation. Browser content is written with text APIs rather than inserting profile data as HTML.

Never commit secrets. GitHub environment and repository permissions should follow least privilege, branch protection should require review and passing checks, and Pages should deploy only from the reviewed `main` branch.
