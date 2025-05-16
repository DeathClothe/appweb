<template>
  <div class="profile-wrapper">

    <div class="profile-content">
      <div class="left-panel">
        <h1>Perfil {{ activeProfile === 'comprador' ? 'Comprador' : 'Vendedor' }}</h1>
        <div class="profile-tabs">
          <button
              :class="{ active: activeProfile === 'comprador' }"
              @click="activeProfile = 'comprador'">COMPRADOR</button>
          <button
              :class="{ active: activeProfile === 'vendedor' }"
              @click="activeProfile = 'vendedor'">VENDEDOR</button>
        </div>

        <div v-if="activeProfile === 'comprador'" class="comprador-section">
          <div class="tabs-fav-ti">
            <button :class="{ active: favTab === 'favoritos' }" @click="favTab='favoritos'">Favoritos</button>
            <button :class="{ active: favTab === 'parati' }" @click="favTab='parati'">Para ti</button>
          </div>

          <div v-if="favTab === 'favoritos'" class="favoritos-list">
            <div class="clothes-item" v-for="item in favoritos" :key="item.id">
              <img :src="item.image" alt="Prenda" />
              <div class="heart">♡</div>
            </div>
            <button class="btn-ver-fav">Ver catálogo de favoritos</button>
          </div>
          <div v-if="favTab === 'parati'">
            <p>Recomendaciones para ti próximamente...</p>
          </div>
        </div>

        <div v-if="activeProfile === 'vendedor'" class="vendedor-section">
          <h3>Vendidas:</h3>
          <div class="vendidas-list">
            <div class="vendida-item" v-for="item in vendidas" :key="item.id">
              <img :src="item.image" alt="Prenda vendida" />
              <div>Tipo: {{ item.tipo }}</div>
              <div>Estado: {{ item.estado }}</div>
              <div>Precio: {{ item.precio }}</div>
            </div>
          </div>
          <p class="label-lista">Lista de prendas vendidas</p>

          <h3>Pendientes:</h3>
          <ul class="pendientes-list">
            <li v-for="(pendiente, idx) in pendientes" :key="idx">
              {{ pendiente }}
              <button class="editar-btn">Editar</button>
            </li>
          </ul>
          <p class="label-lista">Lista de prendas</p>
        </div>
      </div>

      <div class="right-panel">
        <!-- Imagen y datos dinámicos del perfil desde el store -->
        <div v-if="profile" class="profile-image-wrapper">
          <img :src="profile.imagen || 'https://i.imgur.com/XwiWtcq.png'" alt="Perfil Usuario" />
          <p><strong>Correo electrónico:</strong> {{ profile.email }}</p>
          <p><strong>Dirección:</strong> {{ profile.direccion }}</p>
          <!-- Puedes agregar más campos si los necesitas -->
        </div>
        <div v-else class="profile-image-wrapper">
          <p>No hay datos de perfil disponibles.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfileStore } from "@/users/services/profile.store.js";

export default {
  name: "ProfileView",
  data() {
    return {
      activeProfile: 'comprador',
      favTab: 'favoritos',
      pendientes: ['Prenda 1', 'Prenda 2', 'Prenda 3']
    };
  },
  computed: {
    profile() {
      return this.profileStore.profile;
    },
    favoritos() {
      return this.profile?.favoritos || [];
    },
    vendidas() {
      return this.profile?.vendidas || [];
    }
  },
  setup() {
    const profileStore = useProfileStore();
    return { profileStore };
  },
  created() {
    this.profileStore.initialize();
  }
};

</script>


<style scoped>
.profile-wrapper {
  font-family: 'Poppins', sans-serif;
  background-color: #ffebed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-content {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex: 1;
}

.left-panel {
  background-color: #ffdde4;
  flex: 2;
  border-radius: 20px 0 0 20px;
  padding: 20px;
  color: #222;
}

.right-panel {
  background-color: #e4738f;
  flex: 1;
  border-radius: 0 20px 20px 0;
  padding: 30px 20px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image-wrapper img {
  border-radius: 50% 50% 50% 50% / 45% 60% 40% 60%;
  width: 180px;
  margin-bottom: 30px;
  object-fit: cover;
}
.profile-image-wrapper p {
  color: black;
  font-weight: 600;
  text-align: center;
  margin: 15px 0 10px 0;
}

.profile-tabs {
  margin-bottom: 15px;
}

.profile-tabs button {
  background-color: #ffb6c1;
  border: none;
  padding: 10px 25px;
  margin-right: 10px;
  font-weight: 700;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-tabs button.active,
.profile-tabs button:hover {
  background-color: #e4738f;
  color: white;
}

.tabs-fav-ti {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.tabs-fav-ti button {
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  padding-bottom: 5px;
  color: #7a3030;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.tabs-fav-ti button.active {
  border-color: #7a3030;
  font-weight: 900;
}

.favoritos-list {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.clothes-item {
  background-color: #e4738f44;
  border-radius: 25px;
  padding: 10px;
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
}

.clothes-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
}

.clothes-item .heart {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 1.2rem;
  color: red;
  user-select: none;
}

.btn-ver-fav {
  background-color: #f7cfd7;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-ver-fav:hover {
  background-color: #e4738f;
  color: white;
}

.vendidas-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 10px;
}

.vendida-item {
  background-color: #ffdde4;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #7a3030;
}

.vendida-item img {
  width: 80px;
  border-radius: 15px;
  margin-bottom: 5px;
}

.label-lista {
  color: #b46e7e;
  font-weight: 600;
  margin-top: 5px;
  font-size: 0.9rem;
}

.pendientes-list {
  list-style: none;
  padding-left: 0;
  color: #7a3030;
}

.pendientes-list li {
  margin-bottom: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.editar-btn {
  background: #ffd2dd;
  border: none;
  padding: 4px 12px;
  border-radius: 15px;
  cursor: pointer;
  color: #b46e7e;
  font-weight: 700;
}




</style>
