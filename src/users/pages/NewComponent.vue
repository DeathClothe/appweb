<template>

  <div v-if="profile" class="profile-container">
    <div class="profile-header">
      <button class="rol-btn activo">COMPRADOR</button>
      <button class="rol-btn">VENDEDOR</button>
      <img :src="profile.imagen || '/public/default-profile.png'" alt="Profile Image" class="profile-image"/>
      <div class="profile-info">
      </div>
      <h2>{{ profile.nombre }} {{ profile.apellidos }}</h2>
      <p>{{ profile.email }}</p>
      <button @click="editProfile" class="edit-btn">Guardar Cambios</button>
    </div>

    <div class="profile-details">
      <h3>Detalles del Perfil</h3>
      <p><strong>Dirección:</strong> {{ profile.direccion }}</p>
      <p><strong>Prendas Publicadas:</strong> {{ profile.publicados.length }}</p>
      <p><strong>Favoritos:</strong> {{ profile.favoritos.length }}</p>
    </div>
  </div>

</template>
<script>
export default {
  name: 'NewComponent',
  props: {
    editProfile: {},
    logout: {},
    profile: {}
  }

}
</script>
<style scoped>
.rol-btn {
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ccc;
  color: #333;
}
.rol-btn.activo {
  background-color: #4caf50;
  color: white;
}
.profile-info {
  margin-top: 10px;
}
.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px auto;
  display: block;
}
.profile-form label {
  font-weight: bold;
}

.profile-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-form button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.profile-form button:hover {
  background-color: #45a049;
}
.edit-btn {
  background-color: #4caf50;
  color: white;
}

.profile-container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}



.logout-button {
  background-color: #e4738f;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.logout-button:hover {
  background-color: #d72323;
}

.profile-details {
  text-align: left;
  margin-top: 20px;
}

.profile-details h3 {
  color: #333;
  margin-bottom: 10px;
}
</style>