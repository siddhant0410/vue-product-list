import { filterProductsByPrice } from "../services/product-service";
import { Product } from "../types/product-types";
import {describe, it, expect} from "vitest"
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Test Product",
    price: 50,
    category: "category1",
    rating: 4.5,
    description: "test description",
    discountPercentage: 10,
    stock: 10,
    tags: [],
    brand: "test brand",
    sku: "test123",
    weight: 1,
    dimensions: { width: 10, height: 20, depth: 5 },
    warrantyInformation: "1 year",
    shippingInformation: "Ships in 3 days",
    availabilityStatus: "in stock",
    reviews: [],
    returnPolicy: "30 days",
    minimumOrderQuantity: 1,
    meta: { createdAt: "2023-01-01", updatedAt: "2023-01-02", barcode: "123", qrCode: "qr123" },
    images: [],
    thumbnail: "image_url"
  },
  // Add more mock products if needed
];

describe("filterProductsByPrice", () => {
  it("filters products by price", () => {
    const filtered = filterProductsByPrice(mockProducts, 60);
    expect(filtered.length).toBe(1);
    expect(filtered[0].price).toBeLessThanOrEqual(60);
  });

  it("returns all products if no price is provided", () => {
    const filtered = filterProductsByPrice(mockProducts);
    expect(filtered.length).toBe(1); // All mock products should be returned
  });
});
