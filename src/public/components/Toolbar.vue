<!-- src/public/components/Toolbar.vue -->
<template>
  <div class="main-toolbar">
    <!-- Logo -->
    <div class="toolbar-left">
      <router-link to="/" class="logo">
        <img src="/public/LOGO.png" alt="DeathClothe" />

      </router-link>
    </div>

    <!-- Navegación -->
    <div class="toolbar-center">
      <button @click="navigateTo('/start')">Inicio</button>
      <button @click="navigateTo('/explore')">Explorar</button>
      <button @click="navigateTo('/wardrobe')">Armario</button>
      <button @click="navigateTo('/favorites')">Favoritos</button>
    </div>

    <!-- Buscar y Perfil -->
    <div class="toolbar-right">
      <div class="search-container">
        <input type="text" placeholder="Buscar..." v-model="searchQuery" />
        <img src="/public/chat_bubble.png" alt="Chat" class="icon" @click="navigateTo('/chat')" />
        <img src="/public/User_cicrle_light.png" alt="User" class="icon" @click="navigateTo('/profile')" />
      </div>
    </div>
  </div>
</template>
<script>
import { useProfileStore } from "@/users/services/profile.store.js";
import { mapState } from "pinia";
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    ...mapState(useProfileStore, ["isAuthenticated"]),
  },
  methods: {
    navigateTo(route) {
      if (this.isAuthenticated) {
        this.$router.push(route);
      } else {

        alert("Debes iniciar sesión para acceder a esta sección.");
        this.$router.push('/login'); 
      }
    },
    searchItems() {
      console.log("Buscar:", this.searchQuery);
    }
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=K2D:wght@400;600&display=swap');

.main-toolbar {
  background-color: #E4738F;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'K2D', sans-serif;
  border-bottom: 2px solid #E4738F;
}

.toolbar-left .logo {
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
  text-decoration: none;
}

.toolbar-left .logo img {
  height: 50px;
  margin-right: 15px;
}

.toolbar-center button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #000000;
  padding: 8px 15px;
  font-size: 20px;
  transition: 0.3s;
}

.toolbar-center button:hover {
  color: #ffe6e9;
  border-bottom: 2px solid #ffffff;
}

.toolbar-right .search-container {
  display: flex;
  align-items: center;
}

.toolbar-right input {
  padding: 10px;
  border-radius: 20px;
  border: 2px solid #ffffff;
  margin-right: 15px;
  font-family: 'K2D', sans-serif;
  font-size: 16px;
  width: 250px;
}

.toolbar-right .icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 10px;
  transition: 0.3s;
}

.toolbar-right .icon:hover {
  transform: scale(1.2);
}

.toolbar-left .logo img {
  height: 100px;
  margin-right: 20px;
}
</style>
