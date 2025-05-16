<template>
  <div class="categories-list">
    <CategorieCard
        v-for="categorie in categories"
        :key="categorie.id"
        :categorie="categorie"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import httpInstance from "@/shared/services/http.instance.js";
import CategorieCard from "./CategorieCard.vue";

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await httpInstance.get("/categories"); // Ajusta la URL de tu API
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.categories-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 12px;
}
</style>
