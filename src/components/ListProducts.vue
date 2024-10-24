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

      <!-- Display message if no products are available after filtering -->
      <div v-if="productsPostFilter.length === 0" class="text-center">
        <p>No products available</p>
      </div>

      <!-- Product Table: Displays the filtered and sorted list of products -->
      <ProductTable
        v-else
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

  const data = ref<Product[]>([]);
  const sortOrder = ref("asc");
  const maxPrice = ref<number>(100);
  const categoryColors = ref<{ [key: string]: string }>({});
  const error = ref<string | null>(null);

  // Assign category colors for products
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

  // Delete a product by ID with confirmation
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

  // Toggle sorting order by price and persist it in localStorage
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

  // Set the maximum price for filtering products
  const setMaxPrice = (price: number) => {
    if (price < 0 || isNaN(price)) {
      console.warn("Invalid price. Setting default value.");
      maxPrice.value = 100;
    } else {
      maxPrice.value = price;
    }
  };

  // Filter products based on the max price
  const productsPostFilter = computed(() => {
    return filterProductsByPrice(data.value, maxPrice.value);
  });
  </script>
