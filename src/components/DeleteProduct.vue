<template>
  <button
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
    @click="handleDelete"
  >
    Delete
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

// Props passed to the DeleteButton component
const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

// Emit an event for the delete action
const emit = defineEmits(["deleteProduct"]);

// Delete function
const handleDelete = () => {
  emit("deleteProduct", props.productId);
};
</script>

<style scoped></style>
