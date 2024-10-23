<template>
  <div class="mb-4">
    <!-- Label and input for filtering products by price -->
    <label for="max-price" class="mr-2 text-lg font-semibold"
      >Show products below the price:</label
    >
    <!-- Input field for entering the maximum price, bound to the 'price' ref -->
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

// 'price' is a reactive variable to hold the user input for the max price
const price = ref(100);

// Define an event emitter to send the selected price value to the parent component
const emit = defineEmits(["filterPrice"]);

// Emit the updated price when the user inputs a value
const onInput = () => {
  emit("filterPrice", price.value);
};
</script>
