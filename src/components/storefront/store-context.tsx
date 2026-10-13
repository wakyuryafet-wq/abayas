import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { DemoProduct } from "@/data/demo-products";

export type CartLine = { product: DemoProduct; size: string; colour: string; quantity: number };
export type DemoOrder = { number: string; name: string; email: string; phone: string; address: string; lines: CartLine[]; totalKobo: number };
type StoreContextValue = { lines: CartLine[]; itemCount: number; subtotalKobo: number; addLine: (product: DemoProduct, size?: string, colour?: string) => void; removeLine: (slug: string, size: string, colour: string) => void; setQuantity: (slug: string, size: string, colour: string, quantity: number) => void; clearCart: () => void; order: DemoOrder | null; placeOrder: (details: Omit<DemoOrder, "number" | "lines" | "totalKobo">) => DemoOrder };
const StoreContext = createContext<StoreContextValue | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const addLine = useCallback((product: DemoProduct, size = product.sizes[0] ?? "One size", colour = product.colours[0] ?? "Default") => setLines((current) => {
    const index = current.findIndex((line) => line.product.slug === product.slug && line.size === size && line.colour === colour);
    if (index >= 0) return current.map((line, i) => i === index ? { ...line, quantity: Math.min(line.quantity + 1, product.stock) } : line);
    if (product.stock < 1) return current;
    return [...current, { product, size, colour, quantity: 1 }];
  }), []);
  const removeLine = useCallback((slug: string, size: string, colour: string) => setLines((current) => current.filter((line) => !(line.product.slug === slug && line.size === size && line.colour === colour))), []);
  const setQuantity = useCallback((slug: string, size: string, colour: string, quantity: number) => setLines((current) => current.map((line) => line.product.slug === slug && line.size === size && line.colour === colour ? { ...line, quantity: Math.max(1, Math.min(quantity, line.product.stock)) } : line)), []);
  const clearCart = useCallback(() => setLines([]), []);
  const subtotalKobo = lines.reduce((sum, line) => sum + line.product.priceKobo * line.quantity, 0);
  const placeOrder = useCallback((details: Omit<DemoOrder, "number" | "lines" | "totalKobo">) => {
    const next: DemoOrder = { ...details, number: `AA-${Math.floor(100000 + Math.random() * 900000)}`, lines: [...lines], totalKobo: subtotalKobo };
    setOrder(next); setLines([]); return next;
  }, [lines, subtotalKobo]);
  const value = useMemo(() => ({ lines, itemCount: lines.reduce((sum, line) => sum + line.quantity, 0), subtotalKobo, addLine, removeLine, setQuantity, clearCart, order, placeOrder }), [lines, subtotalKobo, addLine, removeLine, setQuantity, clearCart, order, placeOrder]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useStore() { const store = useContext(StoreContext); if (!store) throw new Error("useStore must be used within StoreProvider"); return store; }