<template>
  <div class="min-h-screen p-6">
    <!-- Filter and Sort Section -->
    <div
      class="max-w-6xl mx-auto mb-4 bg-purple-100 border border-gray-300 rounded-lg p-4"
    >
      <div class="flex justify-between items-center">
        <PriceFilter @filterPrice="setMaxPrice" />
        <button
          @click="toggleSortByPrice"
          class="px-4 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition"
        >
          {{ sortOrder === "asc" ? "Ascending" : "Descending" }}
        </button>
      </div>
    </div>

    <!-- Display message if no products are available after filtering -->
    <div v-if="paginatedProducts.length === 0" class="text-center">
      <p>No products available</p>
    </div>

    <!-- Product Table: Displays the paginated list of products -->
    <ProductTable
      v-else
      :products="paginatedProducts"
      :categoryColors="categoryColors"
      @deleteProduct="deleteProduct"
      @sortByPrice="toggleSortByPrice"
      :sortOrder="sortOrder"
    />

    <!-- Pagination Component: Pass currentPage, totalPages, and handle page changes -->
    <PaginationComponent
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import PaginationComponent from "./PaginationComponent.vue"; // Import the PaginationComponent
import {
  fetchProductList,
  filterProductsByPrice,
  generateColorFromCategory,
} from "../services/product-service";
import { paginate } from "../services/pagination-service"; // Import the pagination service
import ProductTable from "./ProductTable.vue";
import PriceFilter from "./PriceFilter.vue";
import { Product } from "../types/product-types";

const data = ref<Product[]>([]);
const sortOrder = ref("asc");
const maxPrice = ref<number>(100);
const categoryColors = ref<{ [key: string]: string }>({});
const currentPage = ref(1);
const productsPerPage = ref(10);

// Pagination logic: Use the pagination service to compute paginated data
const paginatedProducts = computed(() => {
  const { paginatedData } = paginate(
    productsPostFilter.value,
    currentPage.value,
    productsPerPage.value
  );
  return paginatedData;
});

// Compute total pages using the pagination service
const totalPages = computed(() => {
  return Math.ceil(productsPostFilter.value.length / productsPerPage.value);
});

// Handle page change event emitted by PaginationComponent
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

// Other methods for filtering, sorting, and fetching products remain unchanged

const setCategoryColors = (products: Product[]) => {
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
  const error = ref<string | null>(null); // Properly declare the error variable

  try {
    const result = await fetchProductList();
    if (result.length === 0) {
      error.value = "No products available.";
    }
    data.value = result;
    setCategoryColors(data.value);
  } catch (err) {
    error.value = "Failed to load products.";
  }
});

const deleteProduct = (id: number) => {
  const productExists = data.value.some((product) => product.id === id);
  if (!productExists) {
    console.warn(`Product with ID ${id} not found.`);
    return;
  }

  const confirmation = window.confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmation) return;

  data.value = data.value.filter((product) => product.id !== id);
  setCategoryColors(data.value);
};

const toggleSortByPrice = () => {
  if (sortOrder.value === "asc") {
    data.value.sort((a, b) => a.price - b.price);
    sortOrder.value = "desc";
  } else {
    data.value.sort((a, b) => b.price - a.price);
    sortOrder.value = "asc";
  }
};

const setMaxPrice = (price: number) => {
  if (price < 0 || isNaN(price)) {
    console.warn("Invalid price. Setting default value.");
    maxPrice.value = 100;
  } else {
    maxPrice.value = price;
  }
};

const productsPostFilter = computed(() => {
  return filterProductsByPrice(data.value, maxPrice.value);
});
</script>
