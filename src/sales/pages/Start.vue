<template>
  <div class="start-container">
    <!-- Sección de Novedades -->
    <div class="section">
      <h3>Novedades</h3>

      <div class="carousel">
        <button class="carousel-arrow" @click="scrollLeft">
          <img src="/public/FLECHAIZQUIERDA.png" alt="left arrow" />
        </button>
        <div class="carousel-items">
          <ClothingCard
              v-for="item in novedades"
              :key="item.id"
              :clothe="item"
              context="explore"
          />
        </div>
        <button class="carousel-arrow" @click="scrollRight">
          <img src="/public/FlechaContinuar.png" alt="right arrow" />
        </button>
      </div>
    </div>

    <!-- Sección de Ofertas -->
    <div class="section">
      <h3>Ofertas</h3>
      <div class="offer-grid">
        <div
            v-for="item in ofertas"
            :key="item.id"
            class="offer-card"
        >
          <img :src="item.imagen" :alt="item.nombre" />
          <div class="offer-info">
            <p>{{ item.nombre }}</p>
            <div class="price-container">
              <span class="old-price">S/{{ item.precio }}</span>
              <span class="new-price">S/{{ calcularDescuento(item.precio) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClothingCard from "../components/ClothingCard.vue";
import { ClotheService } from "../services/clothe.service.js";
import { ProfileService } from "@/users/services/profile.service.js"; // Asegúrate de tener este servicio que devuelva los perfiles

export default {
  components: { ClothingCard },
  data() {
    return {
      novedades: [],
      ofertas: [],
    };
  },
  methods: {
    scrollLeft() {
      const carousel = this.$el.querySelector(".carousel-items");
      carousel.scrollBy({ left: -200, behavior: "smooth" });
    },
    scrollRight() {
      const carousel = this.$el.querySelector(".carousel-items");
      carousel.scrollBy({ left: 200, behavior: "smooth" });
    },
    calcularDescuento(precio) {
      const descuento = 0.15;
      return (precio - precio * descuento).toFixed(2);
    },
  },
  created() {
    const clotheService = new ClotheService();
    const profileService = new ProfileService();

    Promise.all([
      clotheService.getAll(),          // trae todas las prendas
      profileService.getAll()          // trae todos los perfiles (usuarios)
    ])
        .then(([clothes, profilesResponse]) => {
          const profiles = profilesResponse.data;  // accede a los perfiles reales

          // Obtén todos los IDs de prendas publicadas por todos los usuarios
          const publicadosIds = profiles.flatMap(profile => profile.publicados || []);

          // Filtra las prendas que están publicadas
          this.novedades = clothes.filter(clothe => publicadosIds.includes(clothe.id));

          // Ejemplo: las primeras 4 novedades para ofertas
          this.ofertas = this.novedades.slice(0, 4);
        })
        .catch(error => {
          console.error("Error cargando prendas o perfiles:", error);
        });
  }

};
</script>
<style scoped>
.start-container {
  background-color: #ffebed;
  padding: 20px;
  font-family: 'K2D', sans-serif;
}

.section {
  margin-bottom: 20px;
}

h3 {
  font-family: 'K2D', sans-serif;
  color: #333;
  margin: 10px 0;
}

.carousel {
  display: flex;
  align-items: center;
  background-color: #f5b9cb;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  width: 100%;
  overflow: hidden;
}

.carousel-items {
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  overflow-x: auto;
  flex-grow: 1;
  scroll-behavior: smooth;
  padding: 20px 10px;
}
.carousel-items::-webkit-scrollbar {
  display: none;
}

.carousel-arrow {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  padding: 10px;
}

.carousel-arrow:hover {
  transform: scale(1.2);
}

.offer-grid {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  background-color: #f5b9cb;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
}

.offer-card {
  background-color: #f5b9cb;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  transition: transform 0.3s;
  flex: 1 1 calc(25% - 15px);
  box-sizing: border-box;
}

.offer-card:hover {
  transform: scale(1.05);
}

.offer-card img {
  width: 150px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
}

.offer-info {
  margin-top: 10px;
}

.price-container {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.old-price {
  text-decoration: line-through;
  color: #666;
  font-weight: bold;
}

.new-price {
  color: #d72323;
  font-weight: bold;
}
</style>
