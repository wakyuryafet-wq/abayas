# Abayas

Build an app that CONTEXT: I am building "Abayas & Jalabayas", a modest-fashion boutique in Jos, Plateau State, Nigeria. It has (1) a public online storefront and (2) a secure admin dashboard for inventory, orders, sales and reports. Stack: React, TypeScript, Tailwind CSS, Supabase (auth, database, storage). Currency: Nigerian Naira (₦). Money is stored as integer kobo and displayed in Naira. Colours: warm cream, charcoal black, muted gold. Style: premium, elegant, mobile-first, not a generic template. Roles: Owner/Admin (full access) and Staff (limited). Customers check out without accounts. Never expose secret keys in frontend code. Never use local browser storage as the main database. Every button must be functional.
IMPORTANT: Implement ONLY the phase described below. Do not build features from later phases. Keep existing working features intact. PHASE 1: Build the public storefront UI with realistic demo data stored in a clearly labelled demo data file.

Pages and routes: Home, Shop All (/shop), Abayas (/shop/abayas), Jalabiyas (/shop/jalabiyas), Hijabs & Accessories (/shop/accessories), Product Details (/product/:slug), Cart, Checkout, Order Confirmation, Order Tracking, Contact Us.

Home page: hero section with headline and shop button, featured products, new arrivals, popular categories, promotional banner, a floating WhatsApp contact button, and a footer with Jos address, hours and social links.

Product card and details: name, images, description, category, price in ₦ with thousands separators, sizes, colours, stock status (In stock / Low stock / Out of stock), SKU, Add to Cart button, and WhatsApp Enquiry button. Use a placeholder gallery with zoom.

Also build: sticky header with search, cart icon with count, a working cart drawer (add, remove, change quantity, totals), shop filters (category, size, colour, price range, in-stock only) and sorting, a simple text logo, loading and empty states, and smooth subtle animations.

Design rules: mobile-first, generous spacing, readable typography (an elegant serif for headings and a clean sans-serif for body), accessible contrast and focus states.

Do NOT build the admin dashboard or any backend in this phase.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://abayas.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b85e9f37-a0a4-4bed-86fd-eaa0342259fc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
