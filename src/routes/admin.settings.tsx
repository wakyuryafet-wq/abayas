import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, adminPageHead } from "@/components/admin/admin-page";

export const Route = createFileRoute("/admin/settings")({ head: () => adminPageHead("Settings", "Review demo boutique settings."), component: () => <AdminPage title="Settings" description="Review demo boutique settings." /> });