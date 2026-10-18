import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/reports")({ head: () => adminPageHead("Reports", "Review demo sales and inventory reports."), component: () => <AdminPage title="Reports" description="Review demo sales and inventory reports." section="reports" /> });