import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AdminProvider } from "@/components/admin/admin-context";
import { AdminShell } from "@/components/admin/admin-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Workspace | Abayas & Jalabayas" }, { name: "description", content: "Demo admin workspace for Abayas & Jalabayas in Jos." }, { property: "og:title", content: "Admin Workspace | Abayas & Jalabayas" }, { property: "og:description", content: "Demo admin workspace for Abayas & Jalabayas in Jos." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  return <AdminProvider><AdminShell><Outlet /></AdminShell></AdminProvider>;
}