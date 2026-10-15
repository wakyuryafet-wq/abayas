# Phase 2: Demo Admin Dashboard

## Build
- Add a separate `/admin` workspace with a responsive, collapsible navigation for Dashboard, Products, Inventory, Orders, Sales, Customers, Suppliers, Expenses, Reports, and Settings.
- Create a clearly labelled demo dataset and a data-focused overview showing the requested sales, order, stock, inventory-cost, expense, and gross-profit measures, plus sales, top-product, and category charts.
- Add dedicated screens for each admin section with suitable demo tables, search/filter controls, empty states, and usable demo forms/actions where relevant.
- Keep all admin UI frontend-only, isolated from the public storefront, and organized so authentication can be added around the admin route tree in a later phase.
- Add page-specific metadata and route/data coverage tests; document the reusable admin route structure in `AGENTS.md`.

## Technical details
- Use TanStack file routes with an `/admin` parent layout and one leaf route per section.
- Keep admin sample records in a separate `src/data/admin-demo-data.ts` module; do not add backend, authentication, or browser persistence.
- Reuse the existing semantic cream, charcoal, and muted-gold tokens and UI primitives; use the installed Recharts package for accessible, restrained charts.