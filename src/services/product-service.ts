import type { Product } from "../types/product-types";

// Fetch the first 100 products from the API
export const fetchProductList = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    
    // Check if the response is valid
    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return [];
    }

    const result = await response.json();
    return result.products;
  } catch (error) {
    console.error("Failed to fetch product list:", error);
    return [];
  }
};

// Filter products by the max price value
export const filterProductsByPrice = (products: Product[], maxPrice?: number): Product[] => {
  if (typeof maxPrice !== "number" || isNaN(maxPrice)) {
    return products;
  }
  return products.filter((product) => product.price <= maxPrice);
};

// Generate a unique color based on the product category
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
