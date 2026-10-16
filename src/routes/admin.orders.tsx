import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/orders")({ head: () => adminPageHead("Orders", "Review and update demo customer orders."), component: () => <AdminPage title="Orders" description="Review and update demo customer orders." /> });