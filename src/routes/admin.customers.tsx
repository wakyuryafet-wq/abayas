import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/customers")({ head: () => adminPageHead("Customers", "Browse demo customer records."), component: () => <AdminPage title="Customers" description="Browse demo customer records." /> });