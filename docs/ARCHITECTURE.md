# Architecture

## Purpose

The iNWEB website is a public, bilingual staff and capabilities site. A searchable home page introduces the organisation and every approved role identity has its own durable public route. The system is designed to remain understandable, portable and inexpensive to operate.

## System boundary

The deployed system consists only of static files delivered over HTTPS. There is no server application, database, API, account system or build-time dependency graph.

```text
Browser
  ├── index.html
  ├── @HANDLE/index.html (16 dedicated profile routes)
  ├── assets/css/*.css
  ├── assets/js/*.js
  └── assets/images/*.svg
```

All application behaviour executes in the browser. The only outbound destinations in the interface are the public iNWEB GitHub organisation and the management email address.

## Design decisions

### Static home and profile routes

The home page uses section anchors for capabilities, company information, staff, contact and privacy. Every staff card is a normal link to a repository directory such as `@CEO/` or `@iNAYA/`, where an `index.html` supplies the individual profile. This makes navigation functional before JavaScript loads and gives each identity a durable, indexable URL.

### Progressive enhancement

HTML contains every primary section, all 16 staff cards and the complete English content of every profile. JavaScript adds:

- English/Bengali language selection and preference storage;
- mobile navigation state;
- team search and discipline filtering;
- bilingual switching on dedicated role-profile pages; and
- viewport-based reveal and current-section cues on the home page.

Content is visible by default. Reveal styles are activated only after compatible JavaScript has successfully initialised, preventing script failures from hiding content.

### Bilingual content

Interface and profile copy is colocated in matching `data-en` and `data-bn` attributes. Every profile page contains its complete English fallback and Bengali translation in static HTML, while a small shared script switches the visible language. If the content expands to many more pages or locales, structured locale files may be reconsidered.

### Profile routes

Public handles are management-approved, case-sensitive route names. Each profile connects four values that must remain aligned:

1. the home-page `data-member` identifier;
2. the home-page `data-profile` identifier and link destination;
3. the profile page’s `data-profile-id` and canonical URL; and
4. the profile registry in `scripts/validate_site.py`.

GitHub Actions rejects missing, additional or mismatched profile routes.

### Data minimisation

Staff entries are professional role identities. The public data model excludes legal names, individual email addresses, private phone numbers, home addresses and portraits. Contact is routed through one management-controlled address.

### No external runtime dependencies

Styles, scripts and artwork are repository-owned. No CDN, external font, cookie, analytics SDK or client-side API is required. The site remains portable across GitHub Pages and conventional static hosts.

## Browser state

The only persistent browser value is `inweb-language` in `localStorage`, containing `en` or `bn`. Search terms and filters are not persisted or transmitted.

## Failure behaviour

- Without CSS, semantic document order remains usable.
- Without JavaScript, English home content, team cards, all dedicated profile pages, contact details and privacy guidance remain visible.
- Without local storage, language selection still works for the current page session.
- Unsupported optional browser APIs fall back to visible content without reveal or navigation observation.

## Change boundaries

Keep the website free of a package manager and compilation step unless a separately reviewed architecture decision demonstrates a clear need. A framework should not be introduced merely to edit content, add a profile or create a small interaction.
