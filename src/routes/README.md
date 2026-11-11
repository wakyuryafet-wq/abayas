# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.

## Admin workspace

`admin.tsx` is the `/admin` layout. It owns the admin provider and shell, and
renders the active page through `<Outlet />`. Keep the dashboard in
`admin.index.tsx`; each section has its own leaf file: `admin.products.tsx`,
`admin.inventory.tsx`, `admin.orders.tsx`, `admin.sales.tsx`,
`admin.customers.tsx`, `admin.suppliers.tsx`, `admin.expenses.tsx`,
`admin.reports.tsx`, and `admin.settings.tsx`. Each leaf passes its required
section key to `AdminPage`.

Shared admin records and metrics live in `src/data/admin-demo-data.ts`, while
`AdminProvider` in `src/components/admin/admin-context.tsx` owns editable
session state. `AdminWorkspace` provides the shared search, filters, forms,
tables, dashboard metrics, and charts. Keep this state separate from the
storefront provider and catalog. When persistence is enabled, enforce Owner and
Staff access in Lovable Cloud policies as well as in the page experience; route
visibility alone is not a security boundary.
