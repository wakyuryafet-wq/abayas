import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/sales")({ head: () => adminPageHead("Sales", "Explore demo sales transactions."), component: () => <AdminPage title="Sales" description="Explore demo sales transactions." section="sales" /> });