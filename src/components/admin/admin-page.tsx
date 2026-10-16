import { Database } from "lucide-react";

export function AdminPage({ title, description }: { title: string; description: string }) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Abayas & Jalabayas · Demo workspace</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex min-h-56 flex-col items-center justify-center border border-dashed bg-card px-5 text-center">
        <Database className="size-5 text-gold" aria-hidden="true" />
        <h2 className="mt-3 text-sm font-medium">Demo screen scaffold</h2>
        <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">This section is part of the frontend-only admin workspace. Its tables and actions are not finished yet.</p>
      </div>
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