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
import { ref } from "vue";

// Reactive variable for price input
const price = ref(100);

// Emit price change event to parent component
const emit = defineEmits(["filterPrice"]);

const onInput = () => {
  emit("filterPrice", price.value);
};
</script>
