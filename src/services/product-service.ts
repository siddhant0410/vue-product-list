import type { Product } from "../types/product-types";

export const fetchProductList = async (): Promise<Product[]> => {
  try {
    const result = await (await fetch("https://dummyjson.com/products?limit=100")).json();
    return result.products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const filterProductsByPrice = (products: Product[], maxPrice?: number): Product[] => {
  if (typeof maxPrice !== "number" || isNaN(maxPrice)) {
    return products;
  }
  return products.filter((product) => product.price <= maxPrice);
};
