<template>
  <div class="login-container">
    <div class="welcome-section">
      <h1>BIENVENIDO A DEATH CLOTHE</h1>
      <p>
        DeathClothe es una plataforma de moda circular que ofrece compra, venta y descubrimiento de ropa de segunda mano con recomendaciones personalizadas basadas en tu armario virtual.
        Su experiencia intuitiva conecta a usuarios interesados en autenticidad, estilo y sostenibilidad, dando nueva vida a prendas únicas.
        Más que un mercado digital, es un espacio comunitario donde el estilo evoluciona con propósito.
      </p>
      <div class="image-container">
        <img src="/public/LOGO.png" alt="DeathClothe" class="logo">
        <p class="highlight">Revoluciona tu estilo y cuida el planeta: compra, vende y descubre moda de segunda mano de forma fácil, rápida y segura.</p>
      </div>
    </div>

    <div class="form-section">
      <div class="tab-buttons">
        <button :class="{ active: false }" @click="goToLogin">Iniciar Sesión</button>
        <button class="active">Registrarse</button>
      </div>

      <div class="register-form">
        <div class="field">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="user.nombre" type="text" />
        </div>

        <div class="field">
          <label for="apellidos">Apellidos</label>
          <input id="apellidos" v-model="user.apellidos" type="text" />
        </div>

        <div class="field">
          <label for="email">Correo Electrónico</label>
          <input id="email" v-model="user.email" type="email" />
        </div>

        <div class="field">
          <label for="direccion">Dirección</label>
          <input id="direccion" v-model="user.direccion" type="text" />
        </div>

        <div class="field">
          <label for="password">Contraseña</label>
          <input id="password" v-model="user.password" type="password" />
        </div>

        <div class="terms">
          <input type="checkbox" id="terms" v-model="acceptTerms">
          <label for="terms">Acepto los Términos de Servicio y la Política de Privacidad</label>
        </div>

        <!-- Botón de Crear Cuenta -->
        <button @click="register" class="register-button">Crear Cuenta</button>

        <p class="login-prompt">
          ¿Ya tienes una cuenta? <a href="#" @click.prevent="goToLogin">Iniciar Sesión</a>
        </p>
      </div>

      <div class="social-login">
        <p>O continúa con</p>
        <button class="social-btn facebook">Facebook</button>
        <button class="social-btn google">Google</button>
        <button class="social-btn email">Email</button>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from "@/users/services/auth.service.js";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      user: {
        nombre: "",
        apellidos: "",
        email: "",
        direccion: "",
        password: "",
        tipo: "comprador"
      },
      acceptTerms: false,
    };
  },
  setup() {
    const router = useRouter();
    const authService = new AuthService();
    return { router, authService };
  },
  methods: {
    async register() {
      if (!this.acceptTerms) {
        alert("Por favor acepta los términos de servicio");
        return;
      }

      try {
        // Registra el usuario
        await this.authService.register(this.user);
        await this.router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Error durante el registro. Por favor, intenta de nuevo.");
      }
    },
    goToLogin() {
      this.router.push("/login");
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffebed;
  font-family: 'K2D', sans-serif;
}

.welcome-section {
  width: 50%;
  padding: 20px;
  text-align: center;
}

.welcome-section h1 {
  font-size: 36px;
  color: #333;
}

.welcome-section p {
  margin: 10px 0;
}

.image-container {
  margin-top: 20px;
}

.logo {
  width: 200px;
}

.highlight {
  background-color: #e4738f;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
}

.form-section {
  width: 45%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tab-buttons {
  display: flex;
  margin-bottom: 20px;
}

.tab-buttons button {
  flex: 1;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
  background-color: #fcd5ce;
  color: #333;
  transition: background-color 0.3s;
}

.tab-buttons button.active {
  background-color: #e4738f;
  color: #fff;
}

.field {
  margin-bottom: 15px;
}

.field label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.field input {
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #e4738f;
  border-radius: 5px;
  font-size: 14px;
}

.terms {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.terms label {
  margin-left: 8px;
  font-size: 14px;
  color: #333;
}

.register-button {
  width: 100%;
  padding: 15px;
  background-color: #e4738f;
  color: #fff;
  border: none;
  margin-top: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
}

.register-button:hover {
  background-color: #d72323;
}

.login-prompt {
  text-align: center;
  margin-top: 15px;
  color: #333;
  font-size: 14px;
}

.login-prompt a {
  color: #e4738f;
  text-decoration: none;
  font-weight: bold;
}

.login-prompt a:hover {
  text-decoration: underline;
}

.social-login {
  text-align: center;
  margin-top: 20px;
}

.social-btn {
  width: 100px;
  margin: 5px;
  background-color: #e4738f;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
}

.social-btn.facebook {
  background-color: #3b5998;
}

.social-btn.google {
  background-color: #db4437;
}

.social-btn.email {
  background-color: #333;
}

.social-btn:hover {
  opacity: 0.9;
}
</style>
