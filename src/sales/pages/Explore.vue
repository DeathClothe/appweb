<template>
  <div class="explore-container">
    <h2>Explorar Prendas</h2>

    <!-- Carrusel horizontal para categorías usando CategoriesList -->
    <div class="section">
      <h3>Novedades</h3>
      <div class="carousel">
        <button class="carousel-arrow left" @click="scrollLeft('categories')">
          <img src="/public/FLECHAIZQUIERDA.png" alt="Flecha izquierda" />
        </button>

        <div class="carousel-items" ref="categoriesCarousel">
          <CategoriesList />
        </div>

        <button class="carousel-arrow right" @click="scrollRight('categories')">
          <img src="/public/FlechaContinuar.png" alt="Flecha derecha" />
        </button>
      </div>
    </div>

    <!-- Carrusel horizontal para ofertas -->
    <div class="section">
      <h3>Ofertas</h3>
      <div class="carousel">
        <button class="carousel-arrow left" @click="scrollLeft('offers')">
          <img src="/public/FLECHAIZQUIERDA.png" alt="Flecha izquierda" />
        </button>

        <div class="carousel-items" ref="offersCarousel">
          <ClothingCard
              v-for="item in offers"
              :key="item.id"
              :clothe="item"
              context="explore"
          />
        </div>

        <button class="carousel-arrow right" @click="scrollRight('offers')">
          <img src="/public/FlechaContinuar.png" alt="Flecha derecha" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ClothingCard from "../components/ClothingCard.vue";
import CategoriesList from "/src/categories/components/CategoriesList.vue";
import { ClotheService } from "../services/clothe.service.js";
import { ProfileService } from "@/users/services/profile.service.js";

export default {
  components: { ClothingCard, CategoriesList },
  data() {
    return {
      offers: [],
    };
  },
  mounted() {
  const clotheService = new ClotheService();
  const profileService = new ProfileService();

  Promise.all([clotheService.getAll(), profileService.getAll()])
    .then(([clothes, profiles]) => {
      const publicadosIds = profiles.flatMap(
        (profile) => profile.publicados || []
      );
      const publicados = clothes.filter((clothe) =>
        publicadosIds.includes(clothe.id)
      );
      this.offers = publicados.slice(0, 8);
    })
    .catch((error) => {
      console.error("Error cargando prendas o perfiles:", error);
    });
},
  methods: {
    scrollLeft(carousel) {
      const container =
          carousel === "categories"
              ? this.$refs.categoriesCarousel
              : this.$refs.offersCarousel;
      if (container) {
        container.scrollBy({
          top: 0,
          left: -250,
          behavior: "smooth",
        });
      }
    },
    scrollRight(carousel) {
      const container =
          carousel === "categories"
              ? this.$refs.categoriesCarousel
              : this.$refs.offersCarousel;
      if (container) {
        container.scrollBy({
          top: 0,
          left: 250,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style scoped>
.explore-container {
  background-color: #ffebed;
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

h2,
h3 {
  font-family: "K2D", sans-serif;
  color: #333;
  margin: 10px 0;
}

.carousel {
  display: flex;
  align-items: center;
  background-color: #f1b9cd;
  border-radius: 12px;
  padding: 15px 10px;
  gap: 10px;
  position: relative;
}

.carousel-arrow {
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-arrow img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.carousel-items {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 15px;
  padding: 5px 0;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: #e4738f #fcd5ce;
}

.carousel-items::-webkit-scrollbar {
  height: 8px;
}

.carousel-items::-webkit-scrollbar-thumb {
  background-color: #e4738f;
  border-radius: 4px;
}

.carousel-items::-webkit-scrollbar-track {
  background-color: #fcd5ce;
  border-radius: 4px;
}

/* Asegura que el CategoriesList muestre sus items horizontalmente */
.carousel-items > * {
  display: flex;
  gap: 15px;
}
</style>
