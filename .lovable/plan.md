# Phase 1: Abayas & Jalabayas Storefront

## Build
- Replace the `/` placeholder with a premium, mobile-first modest-fashion storefront using cream, charcoal, muted gold, editorial product imagery, serif headings, and clear sans-serif body text.
- Add a labelled demo catalog in Naira/kobo and shared store presentation: sticky searchable header, cart drawer, product cards/details, filters/sorting, WhatsApp enquiry, Jos contact/footer, and polished loading/empty states.
- Add pages for `/shop`, its three requested categories, `/product/$slug`, `/cart`, `/checkout`, `/order-confirmation`, `/order-tracking`, and `/contact`.
- Make demo shopping work across routes: add/remove/change quantities, calculate totals, collect checkout details, show an order confirmation and track its in-session demo order. Keep this phase frontend-only, without admin pages, auth, backend, or browser storage.
- Add page-specific metadata and route coverage tests; record the reusable storefront structure in `AGENTS.md`.

## Technical details
- Use TanStack file routes, a clearly named TypeScript demo-data module, and React context for volatile cart/order state.
- Use semantic design tokens in `src/styles.css`; use the generated project assets locally, not externally hosted product photography.
