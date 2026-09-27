# iNWEB public website

The official public team website for **iNWEB**, a multidisciplinary engineering collective spanning leadership, architecture, security, mobile, web, backend, quality and delivery.

[![Website validation](https://github.com/iNWEB-Official/iNWEB-Developer/actions/workflows/website.yml/badge.svg)](https://github.com/iNWEB-Official/iNWEB-Developer/actions/workflows/website.yml)

## What the site includes

- A bilingual English/Bengali interface
- Responsive layouts for mobile, tablet and desktop
- Search and discipline filters for 16 professional role profiles
- Accessible navigation, focus treatment, semantic landmarks and a keyboard-operable profile dialog
- Progressive enhancement: core English content remains available without JavaScript
- Privacy-conscious public profiles that omit legal names, portraits and personal contact details
- No framework, build step, package manager, third-party font, tracker or runtime dependency

## Technology

This is a normal static website:

- **HTML** provides content and semantic structure.
- **CSS** provides the responsive visual system and motion preferences.
- **JavaScript** provides language switching, directory filtering, mobile navigation and profile dialogs.
- **SVG** provides local brand artwork.

There is no Node.js project and no generated application bundle.

## Repository layout

```text
.
├── .github/workflows/website.yml  # CI validation and Pages deployment
├── assets/
│   ├── css/styles.css             # Design system and responsive components
│   ├── images/                    # Favicon and social artwork
│   └── js/app.js                  # Dependency-free enhancements
├── docs/                          # Architecture and maintenance guidance
├── scripts/validate_site.py       # Standard-library static checks used in CI
├── CHANGELOG.md                   # Release history
├── VERSION                        # Current SemVer version
├── index.html                     # The complete one-page website
└── robots.txt                     # Crawler policy
```

## Previewing the site

Open `index.html` directly in a browser or serve the repository root from any static file server. The site uses relative asset paths and does not require a compilation step.

Project validation is intentionally performed by **GitHub Actions**, not by local test commands. Every pull request and push runs the validation job described in [Testing](docs/TESTING.md).

## Updating content

English is the source language and the no-JavaScript default. Bilingual elements in `index.html` use matching `data-en` and `data-bn` attributes. Long-form profile dialog content is held in the `profiles` object in `assets/js/app.js`.

When changing a staff profile:

1. Keep the card and profile identifiers aligned.
2. Update both English and Bengali copy.
3. Use only management-approved role identities and professional information.
4. Do not add legal names, personal email addresses, phone numbers, home addresses or portraits without explicit approval and a privacy review.
5. Open a pull request and rely on the website workflow for validation.

See the [content guide](docs/CONTENT_GUIDE.md) for the full editorial model.

## Accessibility and privacy

The project targets WCAG 2.2 AA practices and uses progressive enhancement, visible focus indicators, reduced-motion handling, live directory results and semantic controls. Automated structural checks support—but do not replace—manual keyboard, zoom, screen-reader and bilingual-content review. See [Accessibility](docs/ACCESSIBILITY.md).

The website has no account system, analytics, contact form, advertising tracker or session replay. See [Security](SECURITY.md) for reporting guidance and [Architecture](docs/ARCHITECTURE.md) for the trust model.

## Deployment

Merges to `main` are validated and then published as a static artifact through GitHub Pages. Pull requests are validated but never deployed. See [Deployment](docs/DEPLOYMENT.md).

## Versioning

The project follows [Semantic Versioning](https://semver.org/). The initial public static release is **0.1.0**. Update `VERSION`, `CHANGELOG.md` and the version displayed in `index.html` together.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). By participating, contributors agree to keep public staff content professional, minimal and privacy-conscious.

## License

See [LICENSE](LICENSE).
