import { AdminWorkspace } from "@/components/admin/admin-workspace";
import type { AdminSection } from "@/data/admin-demo-data";

type AdminView = AdminSection | "dashboard" | "reports" | "settings";

export function AdminPage({ title, description, section }: { title: string; description: string; section: AdminView }) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Abayas & Jalabayas · Demo workspace</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      <AdminWorkspace section={section} />
    </section>
  );
}

export function adminPageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Abayas & Jalabayas Admin` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Abayas & Jalabayas Admin` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}