import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdminProvider } from "@/components/admin/admin-context";
import { AdminWorkspace } from "@/components/admin/admin-workspace";
import { initialAdminRecords } from "@/data/admin-demo-data";

function renderProducts() {
  return render(
    <AdminProvider>
      <AdminWorkspace section="products" />
    </AdminProvider>,
  );
}

describe("Admin product workspace", () => {
  it("searches and filters demo products", () => {
    renderProducts();

    fireEvent.change(screen.getByRole("searchbox", { name: "Search products" }), {
      target: { value: "Noor" },
    });
    expect(screen.getByText("Noor Embroidered Abaya")).toBeInTheDocument();
    expect(screen.queryByText("Olive Grace Abaya")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Filter products by category" }), {
      target: { value: "Jalabiyas" },
    });
    expect(screen.getByText("Amaria Jalabiya")).toBeInTheDocument();
    expect(screen.queryByText("Noor Embroidered Abaya")).not.toBeInTheDocument();
  });

  it("adds a product and calculates its demo status", () => {
    renderProducts();

    fireEvent.click(screen.getByRole("button", { name: "Add product" }));
    fireEvent.change(screen.getByLabelText("Product"), { target: { value: "Test Abaya" } });
    fireEvent.change(screen.getByLabelText("SKU"), { target: { value: "TEST-001" } });
    fireEvent.change(screen.getByLabelText("Price (₦)"), { target: { value: "12500" } });
    fireEvent.change(screen.getByLabelText("Stock"), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Add record" }));

    const row = screen.getByRole("row", { name: /Test Abaya/ });
    expect(within(row).getByText("Out of stock")).toBeInTheDocument();
    expect(within(row).getByText("₦12,500")).toBeInTheDocument();
  });

  it("updates a product in the current admin session", () => {
    renderProducts();

    fireEvent.click(screen.getByRole("button", { name: "Edit olive-grace-abaya" }));
    fireEvent.change(screen.getByLabelText("Stock"), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    const row = screen.getByRole("row", { name: /Olive Grace Abaya/ });
    expect(within(row).getByText("Out of stock")).toBeInTheDocument();
  });
});

describe("Admin demo data", () => {
  it("starts with the existing product catalog and operations records", () => {
    expect(initialAdminRecords.products).toHaveLength(9);
    expect(initialAdminRecords.inventory).toHaveLength(27);
    expect(initialAdminRecords.orders).toHaveLength(6);
    expect(initialAdminRecords.sales).toHaveLength(7);
  });
});