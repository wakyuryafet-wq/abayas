import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/inventory")({ head: () => adminPageHead("Inventory", "Review demo stock levels and reorder status."), component: () => <AdminPage title="Inventory" description="Review demo stock levels and reorder status." section="inventory" /> });