<template>
  <tr :style="{ backgroundColor: backgroundColor }">
    <td>
      <img
        :src="product.thumbnail"
        alt="Thumbnail"
        class="w-24 h-24 object-cover"
      />
    </td>
    <td>{{ product.id }}</td>
    <td>{{ product.title }}</td>
    <td>{{ product.category }}</td>
    <td>{{ product.rating }}</td>
    <td>{{ product.price }}</td>
    <td>
      <DeleteProduct :productId="product.id" @deleteProduct="onDeleteProduct" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import DeleteProduct from "./DeleteProduct.vue";
const props = defineProps({
  product: Object,
  backgroundColor: String, // Accept the background color as a prop
});

const emit = defineEmits(["deleteProduct"]);

const onDeleteProduct = (id: number) => {
  emit("deleteProduct", id);
};
</script>
