import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/products")({ head: () => adminPageHead("Products", "Manage the demo product catalog."), component: () => <AdminPage title="Products" description="Manage the demo product catalog." section="products" /> });