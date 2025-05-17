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
    const response = await fetch("/db.json");
    const json = await response.json();

    if (!json.categories || !Array.isArray(json.categories)) {
      console.error("No se encontraron categorías válidas.");
      return;
    }

    categories.value = json.categories;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
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
