<script setup lang="ts">
import { Product } from "../types/product-types";
import ProductRow from "./ProductRow.vue";

const props = defineProps<{
  products: Product[];
  categoryColors: { [key: string]: string };
  sortOrder: string;
}>();
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Product table -->
    <table
      class="table-auto w-full bg-white shadow-lg rounded-lg border border-gray-300"
    >
      <thead class="bg-purple-900 text-white text-center">
        <tr>
          <th class="px-4 py-4">Thumbnail</th>
          <th class="px-4 py-4">ID</th>
          <th class="px-4 py-4">Title</th>
          <th class="px-4 py-4">Category</th>
          <th class="px-4 py-4">Rating</th>
          <th class="px-4 py-4">Price ($)</th>
          <th class="px-4 py-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <ProductRow
          v-for="product in products"
          :key="product.id"
          :product="product"
          :backgroundColor="categoryColors[product.category]"
          @deleteProduct="$emit('deleteProduct', product.id)"
        />
      </tbody>
    </table>
  </div>
</template>
