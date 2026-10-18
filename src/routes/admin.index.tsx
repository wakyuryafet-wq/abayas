import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin")({
  head: () => adminPageHead("Dashboard", "A demo overview of boutique sales, orders, inventory and performance."),
  component: () => <AdminPage title="Dashboard" description="A demo overview of boutique sales, orders, inventory and performance." section="dashboard" />,
});