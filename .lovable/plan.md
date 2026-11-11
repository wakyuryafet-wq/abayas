# Finish Admin Demo and Secure Phase 3

## Build
- Add focused tests for all `/admin` routes, core demo metrics, searchable/filterable records, add/edit actions, and the responsive menu.
- Document the `/admin` layout, route leaves, state ownership, and staff/owner access boundaries in `AGENTS.md` and the routes guide.
- Add Lovable Cloud sign-in for email/password, Google, and Sign in with Lovable. Keep account creation limited to the named first Owner and Owner-managed staff invitations; do not collect profile fields.
- Protect `/admin` with a verified session and a database role check. Owner controls settings and staff access; Staff can manage operational screens but not roles or settings. Add a sign-out control.
- Persist products, inventory variants, and orders in Lovable Cloud with Owner/Staff-only row access. Keep the public storefront catalog and cart/order demo flow unchanged; leave sales, customer, supplier, and expense screens explicitly demo-only for this step.
- Bootstrap the Owner role only for `atara8309@gmail.com`; users without an assigned role must not enter the admin workspace.

## Technical details
- Use the generated Cloud client and TanStack Start server functions for privileged staff invitations/role assignment; never send service credentials to the browser.
- Store Owner/Staff in a protected `user_roles` table and enforce access with a security-definer role helper plus RLS on every persistent admin table.
- Use integer kobo for monetary fields, and keep the existing demo data and volatile storefront state isolated.
- Use additive Lovable Cloud migrations; do not add dependencies or hand-edit generated route/type files.
- Verify focused Vitest coverage, build logs, admin navigation/actions at desktop and mobile sizes, signed-out redirects, and database role protections. Report if authenticated sign-in cannot be completed without email confirmation or account setup.
