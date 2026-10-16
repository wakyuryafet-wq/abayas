# Complete the Demo Admin Workspace

## Build
- Finish a standalone `/admin` workspace with a dashboard and dedicated Products, Inventory, Orders, Sales, Customers, Suppliers, Expenses, Reports, and Settings screens.
- Use the existing admin demo records and Naira formatting for functional, searchable and filterable tables, useful empty states, and relevant demo forms/actions. Keep edits in temporary in-memory state only; no sign-in, backend, or browser persistence.
- Give the admin area a responsive, collapsible navigation and calm, data-focused styling consistent with the existing cream, charcoal, and muted-gold palette.
- Keep all existing storefront routes and their presentation unchanged while preventing the storefront header, footer, and contact float from appearing in the admin workspace.
- Add page-specific metadata and focused route/data tests, document the reusable admin route structure, and verify navigation and key demo interactions.

## Technical details
- Use a TanStack `/admin` layout with an index dashboard and one leaf route per section; let generated route files update automatically.
- Extend the separate `src/data/admin-demo-data.ts` as needed; keep storefront catalog and cart/order state untouched.
- Use existing UI primitives and the installed charting package. Do not add backend services or dependencies.
