<template>
  <div class="min-h-screen p-6">
    <!-- Filter and Sort Section -->
    <div
      class="max-w-6xl mx-auto mb-4 bg-purple-100 border border-gray-300 rounded-lg p-4"
    >
      <div class="flex justify-between items-center">
        <!-- Input to set the maximum price for filtering -->
        <div class="flex items-center space-x-4">
          <label for="max-price" class="text-lg font-semibold"
            >Show products below the price:</label
          >
          <input
            id="max-price"
            type="number"
            v-model="maxPrice"
            class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <!-- Button to sort by price -->
        <button
          @click="toggleSortByPrice"
          class="px-4 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition"
        >
          {{ sortOrder === "asc" ? "Ascending" : "Descending" }}
        </button>
      </div>
    </div>

    <!-- Product Table -->
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
} from "../services/product-service";
import ProductTable from "./ProductTable.vue";

const data = ref([]);
const sortOrder = ref("asc");
const maxPrice = ref<number>(100);
const categoryColors = ref<{ [key: string]: string }>({});

const generateColorFromCategory = (category: string) => {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  const saturation = 40 + (hash % 20);
  const lightness = 85 - (hash % 15);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const setCategoryColors = (products: any[]) => {
  products.forEach((product) => {
    if (!categoryColors.value[product.category]) {
      categoryColors.value[product.category] = generateColorFromCategory(
        product.category
      );
    }
  });
};

onMounted(async () => {
  data.value = await fetchProductList();
  setCategoryColors(data.value);
});

const deleteProduct = (id: number) => {
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
  localStorage.setItem("sortOrder", sortOrder.value);
};

const setMaxPrice = (price: number) => {
  maxPrice.value = price;
};

const productsPostFilter = computed(() => {
  return filterProductsByPrice(data.value, maxPrice.value);
});
</script>
