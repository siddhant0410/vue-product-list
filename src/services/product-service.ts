import type { Product } from "../types/product-types";

// Fetch the first 100 products from the API
export const fetchProductList = async (): Promise<Product[]> => {
  try {
    const result = await (await fetch("https://dummyjson.com/products?limit=100")).json();
    return result.products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Filter products based on a maximum price
export const filterProductsByPrice = (products: Product[], maxPrice?: number): Product[] => {
  // If maxPrice is not a valid number, return all products
  if (typeof maxPrice !== "number" || isNaN(maxPrice)) {
    return products;
  }
  // Return products that are priced lower or equal to maxPrice
  return products.filter((product) => product.price <= maxPrice);
};

// Generate a unique color based on the category name
export const generateColorFromCategory = (category: string) => {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  const saturation = 40 + (hash % 20);
  const lightness = 85 - (hash % 15);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
