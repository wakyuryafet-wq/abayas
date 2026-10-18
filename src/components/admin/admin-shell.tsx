import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Coins,
  FileChartColumnIncreasing,
  LayoutDashboard,
  Menu,
  Package,
  Settings2,
  ShoppingBag,
  Truck,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Sales", href: "/admin/sales", icon: Coins },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Suppliers", href: "/admin/suppliers", icon: Truck },
  { label: "Expenses", href: "/admin/expenses", icon: Wallet },
  { label: "Reports", href: "/admin/reports", icon: FileChartColumnIncreasing },
  { label: "Settings", href: "/admin/settings", icon: Settings2 },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = navItems.find((item) => item.href === pathname || (item.href !== "/admin" && pathname.startsWith(item.href)));
  const activeLabel = active?.label ?? "Dashboard";

  const navigation = (mobile = false) => (
    <>
      <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-5">
        <Link to="/admin" className="min-w-0" onClick={() => setMobileOpen(false)}>
          <span className="block font-display text-xl leading-none text-sidebar-foreground">A&J</span>
          <span className={cn("mt-1 block text-[9px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/60", collapsed && !mobile && "sr-only")}>Studio · Jos</span>
        </Link>
        {mobile ? <Button variant="ghost" size="icon" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X /></Button> : null}
      </div>
      <div className="px-3 pt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
        {(!collapsed || mobile) && "Workspace"}
      </div>
      <nav aria-label="Admin navigation" className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const selected = label === "Dashboard" ? pathname === "/admin" || pathname === "/admin/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              aria-label={label}
              title={collapsed && !mobile ? label : undefined}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-sm px-3 text-sm transition-colors",
                selected ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                collapsed && !mobile && "justify-center px-0",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {(!collapsed || mobile) && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        {(!collapsed || mobile) && <p className="text-[10px] text-sidebar-foreground/55">Demo workspace · changes reset on refresh</p>}
      </div>
    </>
  );

  return (
    <div className="min-h-svh bg-background text-foreground [--admin-sidebar-width:15.5rem]">
      <aside className={cn("fixed inset-y-0 left-0 z-30 hidden flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex", collapsed ? "w-[4.25rem]" : "w-[var(--admin-sidebar-width)]")}>
        {navigation()}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-[4.45rem] size-7 rounded-full border border-border bg-background shadow-sm"
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-40 bg-charcoal/40 md:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col bg-sidebar text-sidebar-foreground transition-transform md:hidden", mobileOpen ? "translate-x-0" : "-translate-x-full")}>
        {navigation(true)}
      </aside>

      <div className={cn("min-h-svh transition-[margin] duration-200", collapsed ? "md:ml-[4.25rem]" : "md:ml-[var(--admin-sidebar-width)]")}>
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <Button className="md:hidden" variant="ghost" size="icon" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu /></Button>
            <span className="truncate text-sm font-medium">{activeLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-gold" />
            Demo data
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1600px] px-4 py-7 sm:px-7 lg:px-9">{children}</main>
      </div>
    </div>
  );
}