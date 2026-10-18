import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/suppliers")({ head: () => adminPageHead("Suppliers", "Manage demo supplier contacts."), component: () => <AdminPage title="Suppliers" description="Manage demo supplier contacts." section="suppliers" /> });