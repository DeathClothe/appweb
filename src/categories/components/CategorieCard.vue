<template>
  <div class="categorie-card">
    <img :src="categorie.imagen" alt="categoria imagen" />
    <div class="categorie-title">{{ categorie.title }}</div>
  </div>
</template>

<script setup>
defineProps({
  categorie: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.categorie-card {
  background-color: #f8f0f0; /* tono rosa más suave */
  border-radius: 12px;
  padding: 10px;
  width: 180px; /* más compacto */
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* sombra ligera */
}

.categorie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
}

.categorie-card img {
  width: 160px;
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.categorie-title {
  margin-top: 12px;
  font-weight: 600;
  font-size: 16px;
  color: #333;
  white-space: normal;
  line-height: 1.3;
  width: 100%;
  text-align: center;
  user-select: text;
}
</style>
