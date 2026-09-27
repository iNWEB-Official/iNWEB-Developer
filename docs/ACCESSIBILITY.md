# Accessibility

## Target

The website targets WCAG 2.2 Level AA practices. This is a design and maintenance target, not a claim of third-party certification.

## Implemented foundations

- Semantic header, navigation, main, section, article, list, fieldset and footer elements
- A skip link on the home page and every profile page
- Logical heading hierarchy and document order
- Keyboard-operable native buttons, links and search input
- Visible `:focus-visible` treatment
- Programmatic labels for navigation, search and controls
- Live announcement of filtered result totals
- Direct links to individual profiles rather than script-only navigation
- Text alternatives or hidden treatment for decorative graphics
- Responsive reflow from narrow mobile screens through wide desktops
- Reduced-motion handling via `prefers-reduced-motion`
- Progressive enhancement that leaves every English page visible without JavaScript
- English and Bengali document-language switching

## Required manual review

Automated checks cannot confirm the full experience. Before a release that changes layout, interaction or copy, review:

1. Keyboard navigation from each skip link through the footer
2. Mobile-menu opening, focus order and closing
3. Search and every team filter, including the empty state
4. Every profile link, breadcrumb, previous/next profile link and return-to-directory path
5. Language switching on both the home page and representative profile pages
6. Both languages at 200% and 400% browser zoom
7. Narrow reflow at 320 CSS pixels
8. Reduced-motion mode
9. High-contrast or forced-colours behaviour where available
10. Representative screen-reader output in at least one current browser/screen-reader combination
11. Bengali pronunciation, meaning, clipping and line wrapping with a fluent reviewer

Record material issues in the pull request and fix release-blocking barriers before deployment.

## Content requirements

- Link text must describe its destination without relying only on surrounding text.
- Do not communicate meaning through colour alone.
- Keep headings descriptive and sequential.
- Use native controls before custom ARIA patterns.
- Add alternative text for meaningful images; mark decorative images as decorative.
- Avoid autoplay, flashing content and time limits.

## Reporting an issue

Accessibility reports may be sent through the management contact listed on the website. Include the page or route, browser, assistive technology if any, and a concise description of the barrier. Do not include sensitive personal data.
