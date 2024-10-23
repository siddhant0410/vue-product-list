<template>
  <div class="min-h-screen p-6">
    <!-- Filter and Sort Section -->
    <div
      class="max-w-6xl mx-auto mb-4 bg-purple-100 border border-gray-300 rounded-lg p-4"
    >
      <div class="flex justify-between items-center">
        <!-- PriceFilter component: Allows the user to filter products by price -->
        <PriceFilter @filterPrice="setMaxPrice" />

        <!-- Button to sort products by price: Toggles between ascending and descending -->
        <button
          @click="toggleSortByPrice"
          class="px-4 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition"
        >
          {{ sortOrder === "asc" ? "Ascending" : "Descending" }}
        </button>
      </div>
    </div>

    <!-- Product Table: Displays the filtered and sorted list of products -->
    <ProductTable
      :products="productsPostFilter"
      :categoryColors="categoryColors"
      @deleteProduct="deleteProduct"
      @sortByPrice="toggleSortByPrice"
      :sortOrder="sortOrder"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  fetchProductList,
  filterProductsByPrice,
  generateColorFromCategory,
} from "../services/product-service";
import ProductTable from "./ProductTable.vue";
import PriceFilter from "./PriceFilter.vue";
import { Product } from "../types/product-types";

// 'data' holds the full product list fetched from the API
const data = ref<Product[]>([]);

// Controls the sort order (asc or desc) for the price sorting
const sortOrder = ref("asc");

// 'maxPrice' holds the user-set maximum price for filtering products
const maxPrice = ref<number>(100);

// Holds the background colors for each product category
const categoryColors = ref<{ [key: string]: string }>({});

// This function assigns a background color to each category using the 'generateColorFromCategory' utility
const setCategoryColors = (products: any[]) => {
  products.forEach((product) => {
    if (!categoryColors.value[product.category]) {
      categoryColors.value[product.category] = generateColorFromCategory(
        product.category
      );
    }
  });
};

// Fetch product data when the component is mounted
onMounted(async () => {
  data.value = await fetchProductList();
  setCategoryColors(data.value); // Assign colors to categories
});

// Delete a product from the list by its ID
const deleteProduct = (id: number) => {
  // Filter out the deleted product and update the list
  data.value = data.value.filter((product) => product.id !== id);
  setCategoryColors(data.value); // Recompute category colors after deletion
};

// Toggle the sort order between ascending and descending, and sort the products by price
const toggleSortByPrice = () => {
  if (sortOrder.value === "asc") {
    // Sort in ascending order
    data.value.sort((a, b) => a.price - b.price);
    sortOrder.value = "desc";
  } else {
    // Sort in descending order
    data.value.sort((a, b) => b.price - a.price);
    sortOrder.value = "asc";
  }
  // Store the sort order in localStorage to maintain state on reload
  localStorage.setItem("sortOrder", sortOrder.value);
};

// Set the maximum price for filtering products
const setMaxPrice = (price: number) => {
  maxPrice.value = price;
};

// Filter the products by the max price set by the user
const productsPostFilter = computed(() => {
  return filterProductsByPrice(data.value, maxPrice.value);
});
</script>
