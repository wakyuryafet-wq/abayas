import abayaImage from "@/assets/abayas-editorial.jpg";
import jalabiyaImage from "@/assets/jalabiya-editorial.jpg";
import accessoriesImage from "@/assets/accessories-editorial.jpg";

/** DEMO DATA — sample catalog for Phase 1 only. Prices are integer kobo. */
export type ProductCategory = "Abayas" | "Jalabiyas" | "Hijabs & Accessories";
export type DemoProduct = {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  priceKobo: number;
  sizes: string[];
  colours: string[];
  stock: number;
  sku: string;
  image: string;
  featured?: boolean;
  isNew?: boolean;
};

export const demoProducts: DemoProduct[] = [
  { slug: "olive-grace-abaya", name: "Olive Grace Abaya", category: "Abayas", description: "A graceful flowing abaya in rich olive with delicate tonal embroidery. Made for unhurried gatherings and everyday elegance.", priceKobo: 6850000, sizes: ["S", "M", "L", "XL"], colours: ["Olive", "Black"], stock: 8, sku: "AA-AB-001", image: abayaImage, featured: true, isNew: true },
  { slug: "noor-embroidered-abaya", name: "Noor Embroidered Abaya", category: "Abayas", description: "Soft, fluid drape meets intricate gold embroidery along the cuffs and neckline.", priceKobo: 7450000, sizes: ["S", "M", "L", "XL"], colours: ["Black", "Midnight"], stock: 3, sku: "AA-AB-002", image: abayaImage, featured: true },
  { slug: "safa-everyday-abaya", name: "Safa Everyday Abaya", category: "Abayas", description: "An effortless, breathable everyday layer with a beautifully clean silhouette.", priceKobo: 5200000, sizes: ["S", "M", "L", "XL", "XXL"], colours: ["Black", "Olive", "Sand"], stock: 12, sku: "AA-AB-003", image: abayaImage, isNew: true },
  { slug: "amaria-jalabiya", name: "Amaria Jalabiya", category: "Jalabiyas", description: "A statement jalabiya in dusky rose, finished with thoughtful geometric hand-inspired detailing.", priceKobo: 8250000, sizes: ["M", "L", "XL"], colours: ["Rose", "Plum"], stock: 5, sku: "AA-JA-001", image: jalabiyaImage, featured: true, isNew: true },
  { slug: "sahara-evening-jalabiya", name: "Sahara Evening Jalabiya", category: "Jalabiyas", description: "A softly structured special-occasion piece with beautiful weight and a sweeping hem.", priceKobo: 9100000, sizes: ["S", "M", "L", "XL"], colours: ["Rose", "Black"], stock: 2, sku: "AA-JA-002", image: jalabiyaImage },
  { slug: "layla-classic-jalabiya", name: "Layla Classic Jalabiya", category: "Jalabiyas", description: "A classic silhouette to reach for when comfort and occasion-ready polish matter equally.", priceKobo: 6850000, sizes: ["M", "L", "XL"], colours: ["Plum", "Olive"], stock: 0, sku: "AA-JA-003", image: jalabiyaImage },
  { slug: "silk-touch-hijab-set", name: "Silk Touch Hijab Set", category: "Hijabs & Accessories", description: "A considered pairing of two softly lustrous hijabs in versatile jewel tones.", priceKobo: 1850000, sizes: ["One size"], colours: ["Emerald", "Charcoal"], stock: 16, sku: "AA-HA-001", image: accessoriesImage, featured: true },
  { slug: "everyday-chiffon-hijab", name: "Everyday Chiffon Hijab", category: "Hijabs & Accessories", description: "Lightweight chiffon with a lovely soft drape and a generously sized cut.", priceKobo: 950000, sizes: ["One size"], colours: ["Charcoal", "Rose", "Sand"], stock: 4, sku: "AA-HA-002", image: accessoriesImage, isNew: true },
  { slug: "gold-petal-hijab-pins", name: "Gold Petal Hijab Pins", category: "Hijabs & Accessories", description: "A delicate floral pin and two smooth magnetic pins in a warm muted gold finish.", priceKobo: 1250000, sizes: ["One size"], colours: ["Gold"], stock: 0, sku: "AA-HA-003", image: accessoriesImage },
];

export const shopCategories: { name: ProductCategory; path: "/shop/abayas" | "/shop/jalabiyas" | "/shop/accessories"; image: string }[] = [
  { name: "Abayas", path: "/shop/abayas", image: abayaImage },
  { name: "Jalabiyas", path: "/shop/jalabiyas", image: jalabiyaImage },
  { name: "Hijabs & Accessories", path: "/shop/accessories", image: accessoriesImage },
];

export const formatNaira = (kobo: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Math.round(kobo / 100));
export const productStatus = (stock: number) => stock < 1 ? "Out of stock" : stock < 5 ? "Low stock" : "In stock";
export const whatsappUrl = (message: string) => `https://wa.me/2348030000000?text=${encodeURIComponent(message)}`;