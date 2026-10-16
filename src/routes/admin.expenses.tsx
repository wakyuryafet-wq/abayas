import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/expenses")({ head: () => adminPageHead("Expenses", "Track demo operating expenses."), component: () => <AdminPage title="Expenses" description="Track demo operating expenses." /> });