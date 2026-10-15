import { demoProducts, productStatus } from "@/data/demo-products";

export const ADMIN_SAMPLE_DATE = "2026-10-15";

export type AdminSection =
  | "products"
  | "inventory"
  | "orders"
  | "sales"
  | "customers"
  | "suppliers"
  | "expenses";

export type AdminRecord = {
  id: string;
  [key: string]: string | number;
};

export const adminNavigation = [
  { label: "Dashboard", path: "/admin/", key: "dashboard" },
  { label: "Products", path: "/admin/products", key: "products" },
  { label: "Inventory", path: "/admin/inventory", key: "inventory" },
  { label: "Orders", path: "/admin/orders", key: "orders" },
  { label: "Sales", path: "/admin/sales", key: "sales" },
  { label: "Customers", path: "/admin/customers", key: "customers" },
  { label: "Suppliers", path: "/admin/suppliers", key: "suppliers" },
  { label: "Expenses", path: "/admin/expenses", key: "expenses" },
  { label: "Reports", path: "/admin/reports", key: "reports" },
  { label: "Settings", path: "/admin/settings", key: "settings" },
] as const;

export const productRecords: AdminRecord[] = demoProducts.map((product) => ({
  id: product.slug,
  name: product.name,
  sku: product.sku,
  category: product.category,
  priceKobo: product.priceKobo,
  costKobo: Math.round(product.priceKobo * 0.58),
  stock: product.stock,
  reorderAt: 5,
  status: productStatus(product.stock),
}));

export const inventoryRecords: AdminRecord[] = demoProducts.flatMap((product) => {
  const baseStock = Math.floor(product.stock / 3);
  const quantities = [baseStock, baseStock, product.stock - baseStock * 2];
  return quantities.map((onHand, index) => ({
    id: `${product.slug}-variant-${index + 1}`,
    product: product.name,
    variant: `${product.sizes[index % product.sizes.length] ?? "One size"} / ${product.colours[index % product.colours.length] ?? "Default"}`,
    sku: `${product.sku}-V${index + 1}`,
    onHand,
    reorderAt: 2,
    costKobo: Math.round(product.priceKobo * 0.58),
    status: onHand === 0 ? "Out of stock" : onHand <= 2 ? "Low stock" : "In stock",
  }));
});

export const orderRecords: AdminRecord[] = [
  { id: "AA-100241", customer: "Hauwa Ibrahim", items: 2, totalKobo: 7800000, status: "Pending", date: "2026-10-15" },
  { id: "AA-100240", customer: "Ladi Musa", items: 1, totalKobo: 6850000, status: "Processing", date: "2026-10-15" },
  { id: "AA-100239", customer: "Sarah Danladi", items: 3, totalKobo: 11200000, status: "Ready for pickup", date: "2026-10-14" },
  { id: "AA-100238", customer: "Zainab Pam", items: 1, totalKobo: 8250000, status: "Fulfilled", date: "2026-10-12" },
  { id: "AA-100237", customer: "Martha Gyang", items: 2, totalKobo: 5400000, status: "Pending", date: "2026-10-10" },
  { id: "AA-100236", customer: "Maryam Sule", items: 1, totalKobo: 9100000, status: "Delivered", date: "2026-10-08" },
];

const saleSeeds = [
  ["SA-10031", "2026-10-15", "olive-grace-abaya", 1, "Transfer"],
  ["SA-10030", "2026-10-15", "everyday-chiffon-hijab", 2, "Cash"],
  ["SA-10029", "2026-10-14", "amaria-jalabiya", 1, "Transfer"],
  ["SA-10028", "2026-10-12", "safa-everyday-abaya", 1, "POS"],
  ["SA-10027", "2026-10-10", "noor-embroidered-abaya", 1, "Transfer"],
  ["SA-10026", "2026-10-05", "silk-touch-hijab-set", 2, "Cash"],
  ["SA-10025", "2026-10-02", "sahara-evening-jalabiya", 1, "Transfer"],
] as const;

export const salesRecords: AdminRecord[] = saleSeeds.flatMap(([id, date, slug, quantity, payment]) => {
  const product = demoProducts.find((item) => item.slug === slug);
  if (!product) return [];
  const costPerUnit = Math.round(product.priceKobo * 0.58);
  return [{
    id,
    date,
    product: product.name,
    productSlug: slug,
    category: product.category,
    quantity,
    revenueKobo: product.priceKobo * quantity,
    costKobo: costPerUnit * quantity,
    payment,
  }];
});

export const customerRecords: AdminRecord[] = [
  { id: "CUS-001", name: "Hauwa Ibrahim", email: "hauwa@example.test", phone: "+234 803 555 0141", orders: 4, spendKobo: 26400000, joined: "2026-06-12" },
  { id: "CUS-002", name: "Zainab Pam", email: "zainab@example.test", phone: "+234 806 555 0182", orders: 3, spendKobo: 18750000, joined: "2026-07-08" },
  { id: "CUS-003", name: "Sarah Danladi", email: "sarah@example.test", phone: "+234 809 555 0123", orders: 2, spendKobo: 12400000, joined: "2026-08-21" },
  { id: "CUS-004", name: "Maryam Sule", email: "maryam@example.test", phone: "+234 802 555 0194", orders: 1, spendKobo: 9100000, joined: "2026-10-08" },
];

export const supplierRecords: AdminRecord[] = [
  { id: "SUP-001", name: "Northern Loom House", contact: "Amina Yusuf", phone: "+234 803 555 1110", category: "Abayas", status: "Active" },
  { id: "SUP-002", name: "Arewa Occasion Wear", contact: "Binta Bello", phone: "+234 806 555 1120", category: "Jalabiyas", status: "Active" },
  { id: "SUP-003", name: "Silk & Thread Collective", contact: "Musa Abdullahi", phone: "+234 809 555 1130", category: "Accessories", status: "Review" },
];

export const expenseRecords: AdminRecord[] = [
  { id: "EXP-1008", date: "2026-10-15", description: "Jos shop utilities", category: "Utilities", amountKobo: 135000000, payment: "Transfer" },
  { id: "EXP-1007", date: "2026-10-12", description: "Local delivery supplies", category: "Operations", amountKobo: 42000000, payment: "Cash" },
  { id: "EXP-1006", date: "2026-10-04", description: "October studio rent", category: "Rent", amountKobo: 67500000, payment: "Transfer" },
];

export const initialAdminRecords: Record<AdminSection, AdminRecord[]> = {
  products: productRecords,
  inventory: inventoryRecords,
  orders: orderRecords,
  sales: salesRecords,
  customers: customerRecords,
  suppliers: supplierRecords,
  expenses: expenseRecords,
};

export const initialAdminSettings = {
  storeName: "Abayas & Jalabayas",
  contactEmail: "hello@abayasandjalabayas.example",
  lowStockThreshold: "5",
  currency: "NGN — Nigerian Naira",
};

export function getAdminMetrics(records: Record<AdminSection, AdminRecord[]>) {
  const products = records.products;
  const sales = records.sales;
  const expenses = records.expenses;
  const monthlySales = sales.filter((sale) => String(sale.date).startsWith("2026-10"));
  return {
    todaySalesKobo: sales.filter((sale) => sale.date === ADMIN_SAMPLE_DATE).reduce((sum, sale) => sum + Number(sale.revenueKobo), 0),
    monthSalesKobo: monthlySales.reduce((sum, sale) => sum + Number(sale.revenueKobo), 0),
    orderCount: records.orders.length,
    pendingOrders: records.orders.filter((order) => order.status === "Pending").length,
    productsInStock: products.filter((product) => Number(product.stock) > 0).length,
    lowStockProducts: products.filter((product) => Number(product.stock) > 0 && Number(product.stock) < Number(product.reorderAt)).length,
    outOfStockVariants: records.inventory.filter((variant) => Number(variant.onHand) === 0).length,
    inventoryValueKobo: records.inventory.reduce((sum, variant) => sum + Number(variant.onHand) * Number(variant.costKobo), 0),
    expensesKobo: expenses.reduce((sum, expense) => sum + Number(expense.amountKobo), 0),
    estimatedGrossProfitKobo: monthlySales.reduce((sum, sale) => sum + Number(sale.revenueKobo) - Number(sale.costKobo), 0) - expenses.reduce((sum, expense) => sum + Number(expense.amountKobo), 0),
  };
}

export function getSalesChartData(sales: AdminRecord[]) {
  const byDate = new Map<string, number>();
  sales.filter((sale) => String(sale.date).startsWith("2026-10")).forEach((sale) => {
    const date = String(sale.date);
    byDate.set(date, (byDate.get(date) ?? 0) + Number(sale.revenueKobo));
  });
  return [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, salesKobo]) => ({ date: date.slice(5), salesKobo }));
}

export function getTopProductsChartData(sales: AdminRecord[]) {
  const totals = new Map<string, number>();
  sales.forEach((sale) => totals.set(String(sale.product), (totals.get(String(sale.product)) ?? 0) + Number(sale.quantity)));
  return [...totals.entries()].map(([name, units]) => ({ name, units })).sort((a, b) => b.units - a.units).slice(0, 5);
}

export function getCategoryChartData(sales: AdminRecord[]) {
  const totals = new Map<string, number>();
  sales.forEach((sale) => totals.set(String(sale.category), (totals.get(String(sale.category)) ?? 0) + Number(sale.revenueKobo)));
  return [...totals.entries()].map(([name, salesKobo]) => ({ name, salesKobo }));
}