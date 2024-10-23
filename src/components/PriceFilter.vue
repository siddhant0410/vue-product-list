<template>
  <div class="mb-4">
    <label for="max-price" class="mr-2 text-lg font-semibold"
      >Show products below the price:</label
    >
    <input
      id="max-price"
      type="number"
      v-model="price"
      @input="onInput"
      class="px-2 py-1 border border-gray-300 rounded-md"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"; // Make sure ref is imported
const price = ref(100);
const emit = defineEmits(["filterPrice"]);

const onInput = () => {
  emit("filterPrice", price.value);
};
</script>
