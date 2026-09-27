# Content guide

## Editorial principles

Public copy should be clear, specific and restrained. Describe what the team does without unverified claims, inflated metrics or invented client outcomes.

- Prefer concise sentences and active voice.
- Explain specialist terms when general readers need them.
- Keep English and Bengali meaning aligned; do not translate mechanically when a natural Bengali phrase is clearer.
- Use consistent role names across cards, search data and dedicated profile pages.
- Treat English as the source copy and review both languages in the interface after any change.

## Staff-profile policy

A public profile may include:

- a management-approved online alias;
- a professional role;
- a team discipline;
- a short role summary;
- a professional biography focused on responsibilities; and
- two or three focus areas.

Do not publish legal names, portraits, personal telephone numbers, home addresses, personal email addresses, private social accounts, employment documents or other sensitive identifiers without explicit authorisation and a privacy review.

Profiles describe responsibilities rather than claiming certifications, tenure, client history or individual achievements that have not been verified.

## Editing bilingual interface copy

Most visible text in `index.html` follows this pattern:

```html
<span data-en="Team" data-bn="টিম">Team</span>
```

The text node is the English no-JavaScript fallback. Keep it identical to `data-en`.

Input placeholders use `data-placeholder-en` and `data-placeholder-bn`. Accessible labels use `data-aria-en` and `data-aria-bn`.

Each public role has a dedicated `@HANDLE/index.html` page. Its role, department, biography, focus areas and contribution copy must be complete in both English and Bengali. The page must remain useful without JavaScript.

## Adding or changing a staff entry

Maintain all related values together:

1. The `data-member` value on the home-page card
2. The card’s `data-department`
3. English and Bengali searchable terms
4. The matching `data-profile` link and `@HANDLE/` destination
5. The profile page’s `data-profile-id`, canonical URL and bilingual metadata
6. Previous/next profile navigation
7. The approved route registry in `scripts/validate_site.py`
8. The displayed staff count and sitemap if the total changes

Identifiers use lowercase ASCII letters and numbers and must be unique.

## Contact and privacy copy

Use the management-controlled contact channel for public inquiries. Do not add a contact form unless collection purpose, retention, security, consent and abuse controls have been reviewed and documented.

Any new analytics, embedded content, remote media or third-party widget changes the privacy and security model and requires review before implementation.
