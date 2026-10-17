import { useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAdminMetrics,
  getCategoryChartData,
  getSalesChartData,
  getTopProductsChartData,
  initialAdminSettings,
  type AdminRecord,
  type AdminSection,
} from "@/data/admin-demo-data";
import { formatNaira } from "@/data/demo-products";
import { useAdmin } from "@/components/admin/admin-context";

type AdminView = AdminSection | "dashboard" | "reports" | "settings";
type FieldKind = "text" | "number" | "currency" | "date" | "email" | "tel";
type DataField = { key: string; label: string; kind?: FieldKind; options?: string[] };
type TableSetup = { heading: string; fields: DataField[]; searchable: string[]; filterKey?: string };

const tableSetups: Record<AdminSection, TableSetup> = {
  products: {
    heading: "Product catalogue",
    fields: [
      { key: "name", label: "Product" },
      { key: "sku", label: "SKU" },
      { key: "category", label: "Category", options: ["Abayas", "Jalabiyas", "Hijabs & Accessories"] },
      { key: "priceKobo", label: "Price", kind: "currency" },
      { key: "stock", label: "Stock", kind: "number" },
      { key: "status", label: "Status" },
    ],
    searchable: ["name", "sku", "category"],
    filterKey: "category",
  },
  inventory: {
    heading: "Stock by variant",
    fields: [
      { key: "product", label: "Product" },
      { key: "variant", label: "Variant" },
      { key: "sku", label: "SKU" },
      { key: "onHand", label: "On hand", kind: "number" },
      { key: "reorderAt", label: "Reorder at", kind: "number" },
      { key: "costKobo", label: "Unit cost", kind: "currency" },
      { key: "status", label: "Status" },
    ],
    searchable: ["product", "variant", "sku"],
    filterKey: "status",
  },
  orders: {
    heading: "Customer orders",
    fields: [
      { key: "id", label: "Order" },
      { key: "customer", label: "Customer" },
      { key: "items", label: "Items", kind: "number" },
      { key: "totalKobo", label: "Total", kind: "currency" },
      { key: "date", label: "Date", kind: "date" },
      { key: "status", label: "Status", options: ["Pending", "Processing", "Ready for pickup", "Fulfilled", "Delivered", "Cancelled"] },
    ],
    searchable: ["id", "customer"],
    filterKey: "status",
  },
  sales: {
    heading: "Sales transactions",
    fields: [
      { key: "id", label: "Sale" },
      { key: "date", label: "Date", kind: "date" },
      { key: "product", label: "Product" },
      { key: "quantity", label: "Qty", kind: "number" },
      { key: "revenueKobo", label: "Revenue", kind: "currency" },
      { key: "payment", label: "Payment", options: ["Transfer", "Cash", "POS"] },
    ],
    searchable: ["id", "product", "payment"],
    filterKey: "payment",
  },
  customers: {
    heading: "Customer directory",
    fields: [
      { key: "name", label: "Customer" },
      { key: "email", label: "Email", kind: "email" },
      { key: "phone", label: "Phone", kind: "tel" },
      { key: "orders", label: "Orders", kind: "number" },
      { key: "spendKobo", label: "Lifetime spend", kind: "currency" },
      { key: "joined", label: "Joined", kind: "date" },
    ],
    searchable: ["name", "email", "phone"],
  },
  suppliers: {
    heading: "Supplier directory",
    fields: [
      { key: "name", label: "Supplier" },
      { key: "contact", label: "Contact" },
      { key: "phone", label: "Phone", kind: "tel" },
      { key: "category", label: "Category", options: ["Abayas", "Jalabiyas", "Accessories"] },
      { key: "status", label: "Status", options: ["Active", "Review", "Paused"] },
    ],
    searchable: ["name", "contact", "phone", "category"],
    filterKey: "status",
  },
  expenses: {
    heading: "Operating expenses",
    fields: [
      { key: "date", label: "Date", kind: "date" },
      { key: "description", label: "Description" },
      { key: "category", label: "Category", options: ["Utilities", "Operations", "Rent", "Supplies", "Other"] },
      { key: "amountKobo", label: "Amount", kind: "currency" },
      { key: "payment", label: "Payment", options: ["Transfer", "Cash", "POS"] },
    ],
    searchable: ["description", "category", "payment"],
    filterKey: "category",
  },
};

const chartPalette = ["var(--gold)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function AdminWorkspace({ section }: { section: AdminView }) {
  if (section === "dashboard") return <Dashboard />;
  if (section === "reports") return <Reports />;
  if (section === "settings") return <Settings />;
  return <RecordsTable section={section} />;
}

function MetricCard({ title, value, icon: Icon, detail, tone = "gold" }: {
  title: string;
  value: string;
  icon: typeof ShoppingBag;
  detail: string;
  tone?: "gold" | "charcoal";
}) {
  return (
    <Card className="rounded-sm shadow-none">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <span className={tone === "gold" ? "grid size-8 shrink-0 place-items-center bg-gold-soft text-foreground" : "grid size-8 shrink-0 place-items-center bg-secondary text-secondary-foreground"}>
            <Icon className="size-4" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-3 break-words text-xl font-semibold tabular-nums sm:text-2xl">{value}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function MetricsGrid() {
  const { records } = useAdmin();
  const metrics = getAdminMetrics(records);
  const cards = [
    { title: "Sales today", value: formatNaira(metrics.todaySalesKobo), icon: CircleDollarSign, detail: "Recorded transactions today" },
    { title: "Sales this month", value: formatNaira(metrics.monthSalesKobo), icon: BarChart3, detail: "October demo sales" },
    { title: "Total orders", value: metrics.orderCount.toLocaleString(), icon: ShoppingBag, detail: `${metrics.pendingOrders} awaiting action`, tone: "charcoal" as const },
    { title: "Pending orders", value: metrics.pendingOrders.toLocaleString(), icon: ClipboardList, detail: "Across all demo orders" },
    { title: "Products in stock", value: records.products.filter((item) => Number(item["stock"]) > 0).length.toLocaleString(), icon: Package, detail: "Catalog items available", tone: "charcoal" as const },
    { title: "Low-stock products", value: metrics.lowStockProducts.toLocaleString(), icon: ArrowDownRight, detail: "Below reorder point" },
    { title: "Out-of-stock variants", value: metrics.outOfStockVariants.toLocaleString(), icon: Boxes, detail: "Variants with no units" },
    { title: "Inventory at cost", value: formatNaira(metrics.inventoryValueKobo), icon: Wallet, detail: "Current stock valuation", tone: "charcoal" as const },
    { title: "Recorded expenses", value: formatNaira(metrics.expensesKobo), icon: ArrowUpRight, detail: "Expenses entered to date" },
    { title: "Estimated gross profit", value: formatNaira(metrics.estimatedGrossProfitKobo), icon: CircleDollarSign, detail: "Month sales less cost & expenses", tone: "charcoal" as const },
  ];
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">{cards.map((card) => <MetricCard key={card.title} {...card} />)}</div>;
}

function ChartPanel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={`rounded-sm shadow-none ${className}`}>
      <CardHeader className="px-4 pb-2 pt-4 sm:px-5">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-4 sm:px-4">
        <div className="h-56 w-full sm:h-64">{children}</div>
      </CardContent>
    </Card>
  );
}

function SalesCharts() {
  const { records } = useAdmin();
  const daily = getSalesChartData(records.sales);
  const topProducts = getTopProductsChartData(records.sales);
  const category = getCategoryChartData(records.sales);
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <ChartPanel title="Daily sales">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={daily} margin={{ top: 12, right: 10, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} width={48} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} tickFormatter={(value: number) => `₦${Math.round(value / 100_000)}k`} />
            <Tooltip formatter={(value) => formatNaira(Number(value))} contentStyle={{ borderRadius: 2, borderColor: "var(--border)", background: "var(--background)" }} />
            <Line type="monotone" dataKey="salesKobo" name="Sales" stroke="var(--gold)" strokeWidth={2} dot={{ r: 3, fill: "var(--gold)" }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>
      <ChartPanel title="Top-selling products">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topProducts} layout="vertical" margin={{ top: 4, right: 10, left: 4, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
            <YAxis type="category" dataKey="name" width={118} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
            <Tooltip contentStyle={{ borderRadius: 2, borderColor: "var(--border)", background: "var(--background)" }} />
            <Bar dataKey="units" name="Units sold" fill="var(--chart-2)" barSize={15} radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartPanel>
      <ChartPanel title="Sales by category">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={category} dataKey="salesKobo" nameKey="name" innerRadius={48} outerRadius={82} paddingAngle={3}>
              {category.map((item, index) => <Cell key={item.name} fill={chartPalette[index % chartPalette.length]} stroke="var(--background)" />)}
            </Pie>
            <Tooltip formatter={(value) => formatNaira(Number(value))} contentStyle={{ borderRadius: 2, borderColor: "var(--border)", background: "var(--background)" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
          {category.map((item, index) => <span key={item.name} className="inline-flex items-center gap-1.5"><span className="size-2" style={{ backgroundColor: chartPalette[index % chartPalette.length] }} />{item.name}</span>)}
        </div>
      </ChartPanel>
    </div>
  );
}

function Dashboard() {
  const { records } = useAdmin();
  const recentOrders = records.orders.slice(0, 4);
  return (
    <div className="space-y-6">
      <MetricsGrid />
      <div>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div><h2 className="text-base font-semibold">Trading overview</h2><p className="mt-1 text-xs text-muted-foreground">Sales performance across the demo period</p></div>
          <span className="text-[11px] text-muted-foreground">Updated {"15 Oct 2026"}</span>
        </div>
        <SalesCharts />
      </div>
      <section className="border-t pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div><h2 className="text-base font-semibold">Recent orders</h2><p className="mt-1 text-xs text-muted-foreground">Latest activity from the sample records</p></div>
          <Button asChild variant="outline" size="sm"><Link to="/admin/orders">All orders</Link></Button>
        </div>
        <div className="overflow-hidden border bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader>
            <TableBody>{recentOrders.map((order) => <TableRow key={order.id}><TableCell className="font-medium">{order.id}</TableCell><TableCell>{order["customer"]}</TableCell><TableCell>{formatDate(order["date"])}</TableCell><TableCell><StatusTag value={String(order["status"])} /></TableCell><TableCell className="text-right tabular-nums">{formatNaira(Number(order["totalKobo"]))}</TableCell></TableRow>)}</TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

function Reports() {
  const { records } = useAdmin();
  const metrics = getAdminMetrics(records);
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard title="October revenue" value={formatNaira(metrics.monthSalesKobo)} icon={BarChart3} detail="Recorded demo sales" />
        <MetricCard title="Cost of stock on hand" value={formatNaira(metrics.inventoryValueKobo)} icon={Boxes} detail="Current inventory valuation" tone="charcoal" />
        <MetricCard title="Estimated gross profit" value={formatNaira(metrics.estimatedGrossProfitKobo)} icon={CircleDollarSign} detail="After product cost and expenses" />
      </div>
      <SalesCharts />
      <section className="border-t pt-5">
        <h2 className="text-base font-semibold">Report notes</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">Gross profit is an estimate based on sample sales, a demo product-cost assumption, and recorded expenses. All values are illustrative and reset when this page is refreshed.</p>
      </section>
    </div>
  );
}

function RecordsTable({ section }: { section: AdminSection }) {
  const { records, addRecord, updateRecord } = useAdmin();
  const setup = tableSetups[section];
  const items = records[section];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const filterOptions = setup.filterKey
    ? [...new Set(items.map((item) => String(item[setup.filterKey ?? ""] ?? "")))].filter(Boolean).sort()
    : [];
  const visibleItems = useMemo(() => items.filter((item) => {
    const searchText = setup.searchable.map((key) => String(item[key] ?? "")).join(" ").toLocaleLowerCase();
    return searchText.includes(query.toLocaleLowerCase()) && (filter === "all" || String(item[setup.filterKey ?? ""] ?? "") === filter);
  }), [items, query, filter, setup]);

  const openCreate = () => { setEditing(null); setFormError(""); setDialogOpen(true); };
  const openEdit = (record: AdminRecord) => { setEditing(record); setFormError(""); setDialogOpen(true); };

  function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const next: AdminRecord = { id: editing?.id ?? "" };
    for (const field of setup.fields) {
      const value = String(formData.get(field.key) ?? "").trim();
      if (!value) {
        setFormError(`Please enter ${field.label.toLocaleLowerCase()}.`);
        return;
      }
      if (field.kind === "number") next[field.key] = Number(value);
      else if (field.kind === "currency") next[field.key] = Math.round(Number(value) * 100);
      else next[field.key] = value;
    }
    if (section === "products") {
      const priceKobo = Number(next["priceKobo"]);
      const stock = Number(next["stock"]);
      next["costKobo"] = Math.round(priceKobo * 0.58);
      next["status"] = stock === 0 ? "Out of stock" : stock < 5 ? "Low stock" : "In stock";
    }
    if (section === "inventory") {
      const onHand = Number(next["onHand"]);
      next["status"] = onHand === 0 ? "Out of stock" : onHand <= 2 ? "Low stock" : "In stock";
    }
    if (section === "sales") next["costKobo"] = Math.round(Number(next["revenueKobo"]) * 0.58);
    if (editing) updateRecord(section, editing.id, next);
    else addRecord(section, next);
    setDialogOpen(false);
    setFormError("");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${section}…`} aria-label={`Search ${section}`} className="pl-9" /></div>
          {setup.filterKey && <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label={`Filter ${section} by ${setup.filterKey}`} className="h-9 min-w-36 border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="all">All {setup.filterKey}</option>{filterOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>}
        </div>
        <Button onClick={openCreate}><Plus />Add {section === "sales" ? "sale" : section === "customers" ? "customer" : section === "suppliers" ? "supplier" : section === "expenses" ? "expense" : section === "products" ? "product" : section === "inventory" ? "stock entry" : "order"}</Button>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{visibleItems.length} of {items.length} records</span>{query || filter !== "all" ? <Button type="button" variant="ghost" size="sm" onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters</Button> : <span>Changes reset on refresh</span>}</div>
      {visibleItems.length > 0 ? (
        <div className="overflow-hidden border bg-card">
          <Table>
            <TableHeader><TableRow>{setup.fields.map((field) => <TableHead key={field.key}>{field.label}</TableHead>)}<TableHead className="w-16 text-right"><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader>
            <TableBody>{visibleItems.map((record) => <TableRow key={record.id}>
              {setup.fields.map((field) => <TableCell key={field.key} className={field.kind === "currency" || field.kind === "number" ? "whitespace-nowrap tabular-nums" : "min-w-28"}>{field.key === "status" ? <StatusTag value={String(record[field.key] ?? "")} /> : field.kind === "currency" ? formatNaira(Number(record[field.key] ?? 0)) : field.kind === "date" ? formatDate(record[field.key]) : String(record[field.key] ?? "—")}</TableCell>)}
              <TableCell className="text-right"><Button variant="ghost" size="icon" aria-label={`Edit ${record.id}`} title={`Edit ${record.id}`} onClick={() => openEdit(record)}><Pencil /></Button></TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex min-h-56 flex-col items-center justify-center border border-dashed px-5 text-center">
          <Package className="size-5 text-gold" aria-hidden="true" />
          <h2 className="mt-3 text-sm font-medium">{items.length ? "No matching records" : `No ${section} yet`}</h2>
          <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">{items.length ? "Try another search or clear the selected filter." : "Add a demo record to start building this list."}</p>
          {items.length ? <Button variant="outline" size="sm" className="mt-3" onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters</Button> : <Button size="sm" className="mt-3" onClick={openCreate}><Plus />Add first record</Button>}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-xl">
          <DialogHeader><DialogTitle>{editing ? `Edit ${section.slice(0, -1)}` : `Add ${section.slice(0, -1)}`}</DialogTitle><DialogDescription>Demo changes stay in memory and reset when you refresh.</DialogDescription></DialogHeader>
          <form onSubmit={saveRecord} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {setup.fields.filter((field) => field.key !== "id" && field.key !== "status" || field.options).map((field) => {
                const initial = editing?.[field.key];
                const isCurrency = field.kind === "currency";
                const value = initial === undefined ? "" : isCurrency ? String(Number(initial) / 100) : String(initial);
                return <label key={field.key} className="grid gap-1.5 text-xs font-medium text-foreground">
                  <span>{field.label}{isCurrency ? " (₦)" : ""}</span>
                  {field.options ? (
                    <select name={field.key} defaultValue={value || field.options[0]} required className="h-9 w-full border border-input bg-background px-3 text-sm font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : (
                    <Input name={field.key} type={isCurrency ? "number" : field.kind === "number" ? "number" : field.kind ?? "text"} min={field.kind === "number" || isCurrency ? 0 : undefined} step={isCurrency ? "0.01" : field.kind === "number" ? "1" : undefined} defaultValue={value} required />
                  )}
                </label>;
              })}
            </div>
            {formError && <p role="alert" className="text-xs text-destructive">{formError}</p>}
            <DialogFooter><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit">{editing ? "Save changes" : "Add record"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Settings() {
  const { settings, updateSettings } = useAdmin();
  const [saved, setSaved] = useState(false);
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    updateSettings({
      storeName: String(values.get("storeName") ?? "").trim(),
      contactEmail: String(values.get("contactEmail") ?? "").trim(),
      lowStockThreshold: String(values.get("lowStockThreshold") ?? "5"),
      currency: initialAdminSettings.currency,
    });
    setSaved(true);
  }
  return (
    <div className="max-w-3xl space-y-7">
      <section className="border-b pb-6">
        <h2 className="text-base font-semibold">Store details</h2>
        <p className="mt-1 text-sm text-muted-foreground">Basic information used across the boutique workspace.</p>
        <form onSubmit={save} className="mt-5 space-y-4">
          <label className="grid max-w-xl gap-1.5 text-xs font-medium">Store name<Input name="storeName" defaultValue={settings.storeName} required onChange={() => setSaved(false)} /></label>
          <label className="grid max-w-xl gap-1.5 text-xs font-medium">Contact email<Input name="contactEmail" type="email" defaultValue={settings.contactEmail} required onChange={() => setSaved(false)} /></label>
          <label className="grid max-w-xl gap-1.5 text-xs font-medium">Low-stock alert threshold<Input name="lowStockThreshold" type="number" min="1" step="1" defaultValue={settings.lowStockThreshold} required onChange={() => setSaved(false)} /></label>
          <div className="grid max-w-xl gap-1.5 text-xs font-medium">Store currency<div className="flex h-9 items-center border bg-muted px-3 text-sm font-normal text-muted-foreground">{settings.currency}</div></div>
          <div className="flex items-center gap-3 pt-1"><Button type="submit">Save settings</Button>{saved && <span role="status" className="text-xs text-muted-foreground">Settings saved for this session.</span>}</div>
        </form>
      </section>
      <section>
        <h2 className="text-base font-semibold">Workspace data</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">This admin workspace uses sample records only. Edits are temporary and clear when the page is refreshed; no customer, stock, or order data is sent anywhere.</p>
      </section>
    </div>
  );
}

function StatusTag({ value }: { value: string }) {
  const state = value.toLocaleLowerCase();
  const style = state.includes("out") || state.includes("cancel")
    ? "bg-destructive/10 text-destructive"
    : state.includes("low") || state.includes("pending") || state.includes("review")
      ? "bg-gold-soft text-foreground"
      : "bg-secondary text-secondary-foreground";
  return <span className={`inline-flex max-w-full items-center whitespace-nowrap px-2 py-1 text-[10px] font-medium ${style}`}>{value}</span>;
}

function formatDate(value: unknown) {
  const text = String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return text || "—";
  const [year, month, day] = text.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 2026, (month ?? 1) - 1, day ?? 1));
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}