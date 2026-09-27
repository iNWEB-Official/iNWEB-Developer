# Architecture

## Purpose

The iNWEB website is a public, bilingual staff and capabilities page. It is designed to remain understandable, portable and inexpensive to operate.

## System boundary

The deployed system consists only of static files delivered over HTTPS. There is no server application, database, API, account system or build-time dependency graph.

```text
Browser
  ├── index.html
  ├── assets/css/styles.css
  ├── assets/js/app.js
  └── assets/images/*.svg
```

All application behaviour executes in the browser. The only outbound destinations in the interface are the public iNWEB GitHub organisation and the management email address.

## Design decisions

### One page, one source of navigation truth

The site uses section anchors for capabilities, company information, staff, contact and privacy. This keeps navigation functional before JavaScript loads and provides durable links.

### Progressive enhancement

HTML contains every primary section and all 16 staff cards. English is readable when JavaScript is unavailable. JavaScript adds:

- English/Bengali language selection and preference storage
- mobile navigation state
- team search and discipline filtering
- detailed role-profile dialogs
- viewport-based reveal and current-section cues

CSS uses the `scripting` media feature so reveal animations never hide content when scripts are unavailable or fail.

### Bilingual content

Short interface copy is colocated in `data-en` and `data-bn` attributes. Longer profile copy is grouped by locale in `assets/js/app.js`. This is intentionally small-scale and dependency-free; if the content expands to multiple pages or many locales, structured locale files should be reconsidered.

### Data minimisation

Staff entries are professional role identities. The public data model excludes legal names, individual email addresses, private phone numbers, home addresses and portraits. Contact is routed through one management-controlled address.

### No external runtime dependencies

Styles, scripts and artwork are repository-owned. No CDN, external font, cookie, analytics SDK or client-side API is required. The site remains portable across GitHub Pages and conventional static hosts.

## Browser state

The only persistent browser value is `inweb-language` in `localStorage`, containing `en` or `bn`. Search terms, filters and open dialogs are not persisted or transmitted.

## Failure behaviour

- Without CSS, semantic document order remains usable.
- Without JavaScript, English content, team cards, contact details and privacy guidance remain visible.
- Without local storage, language selection still works for the current page session.
- Unsupported optional browser APIs fall back to visible content without reveal or navigation observation.

## Change boundaries

Keep the website free of a package manager and compilation step unless a separately reviewed architecture decision demonstrates a clear need. A framework should not be introduced merely to edit content, add a section or create a small interaction.
