<template>
  <div class="clothing-card" @click="navigateToDetail">
    <img :src="clothe.imagen" :alt="clothe.nombre" />
    <div class="clothing-info">
      <h3>{{ clothe.nombre }}</h3>
      <p>S/{{ clothe.precio }}</p>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    clothe: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToDetail() {
      this.$router.push(`/clothing/${this.clothe.id}`);
    }
  }
};
</script>

<style scoped>
.clothing-card {
  background-color: #f8d7da;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.clothing-card:hover {
  transform: scale(1.05);
}
.clothing-card img {
  width: 150px;
  height: 200px;
  border-radius: 5px;
  object-fit: cover;
}
.clothing-info {
  margin-top: 10px;
}
</style>
