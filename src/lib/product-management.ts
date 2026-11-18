import type { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { demoProducts, productStatus, type DemoProduct, type ProductCategory } from "@/data/demo-products";
import type { AdminRecord } from "@/data/admin-demo-data";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

export const PRODUCT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp"];

export type ProductInput = {
  id?: string;
  name: string;
  sku: string;
  category: ProductCategory;
  description: string;
  priceKobo: number;
  stock: number;
  reorderAt: number;
  sizes: string[];
  colours: string[];
  isPublished: boolean;
  imageUrl?: string;
};

export function validateProductImage(file: File): string | null {
  if (!acceptedImageTypes.includes(file.type)) return "Choose a JPG, PNG, or WebP image.";
  if (file.size > PRODUCT_IMAGE_MAX_BYTES) return "Choose an image smaller than 5 MB.";
  return null;
}

export function productRowToAdminRecord(row: ProductRow): AdminRecord {
  return {
    id: row.id,
    name: row.name,
    sku: row.sku,
    category: row.category,
    description: row.description,
    priceKobo: row.price_kobo,
    costKobo: row.cost_kobo,
    stock: row.stock,
    reorderAt: row.reorder_at,
    status: row.status,
    imageUrl: row.image_url ?? "",
    slug: row.slug ?? "",
    sizes: row.sizes.join(", "),
    colours: row.colours.join(", "),
    isPublished: row.is_published ? "Published" : "Draft",
  };
}

export function productRowToStoreProduct(row: ProductRow): DemoProduct {
  const category = normalizeCategory(row.category);
  const fallbackImage = demoProducts.find((product) => product.category === category)?.image ?? "";
  return {
    slug: row.slug ?? slugify(`${row.name}-${row.sku}`),
    name: row.name,
    category,
    description: row.description,
    priceKobo: row.price_kobo,
    sizes: row.sizes,
    colours: row.colours,
    stock: row.stock,
    sku: row.sku,
    image: row.image_url ?? fallbackImage,
  };
}

export async function listAdminProducts() {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(productRowToAdminRecord);
}

export async function listPublishedProducts() {
  const { data, error } = await supabase.from("products").select("*").eq("is_published", true);
  if (error) throw error;
  return data.map(productRowToStoreProduct);
}

export async function saveProduct(input: ProductInput, imageFile?: File) {
  let uploadedPath: string | undefined;
  let imageUrl = input.imageUrl ?? null;

  if (imageFile) {
    const validationError = validateProductImage(imageFile);
    if (validationError) throw new Error(validationError);

    const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `products/${crypto.randomUUID()}-${safeName}`;
    const { data: uploaded, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, imageFile, { cacheControl: "3600", contentType: imageFile.type, upsert: false });
    if (uploadError) throw uploadError;
    uploadedPath = uploaded.path;
    imageUrl = supabase.storage.from("product-images").getPublicUrl(uploaded.path).data.publicUrl;
  }

  const payload = {
    name: input.name,
    sku: input.sku,
    category: input.category,
    description: input.description,
    price_kobo: input.priceKobo,
    cost_kobo: Math.round(input.priceKobo * 0.58),
    stock: input.stock,
    reorder_at: input.reorderAt,
    status: productStatus(input.stock),
    image_url: imageUrl,
    slug: slugify(`${input.name}-${input.sku}`),
    sizes: input.sizes,
    colours: input.colours,
    is_published: input.isPublished,
    updated_at: new Date().toISOString(),
  };

  const result = input.id
    ? await supabase.from("products").update(payload).eq("id", input.id).select("*").single()
    : await supabase.from("products").insert(payload).select("*").single();

  if (result.error) {
    if (uploadedPath) await supabase.storage.from("product-images").remove([uploadedPath]);
    throw result.error;
  }
  return productRowToAdminRecord(result.data);
}

function normalizeCategory(value: string): ProductCategory {
  if (value === "Jalabiyas" || value === "Hijabs & Accessories") return value;
  if (value === "Accessories") return "Hijabs & Accessories";
  return "Abayas";
}

function slugify(value: string) {
  return value.toLocaleLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}