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
        <img src="/public/LOGO.png" alt="Bienvenido" />
        <p class="highlight">Revoluciona tu estilo y cuida el planeta: compra, vende y descubre moda de segunda mano de forma fácil, rápida y segura.</p>
      </div>
    </div>

    <div class="form-section">
      <div class="tab-buttons">
        <button :class="{ active: !isRegister }" @click="isRegister = false">Iniciar Sesión</button>
        <button :class="{ active: isRegister }" @click="goToRegister">Registrarse</button>
      </div>

      <div class="login-form">
        <div class="field">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="email" placeholder="ejemplo@email.com" />
        </div>
        <div class="field">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="********" />
          <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="remember" v-model="rememberMe" />
          <label for="remember">Recuérdame</label>
        </div>
        <button class="login-button" @click="login">Iniciar Sesión</button>
        <p v-if="loginError" class="error">{{ loginError }}</p>

        <div class="social-login">
          <p>O continua con</p>
          <button class="social-btn facebook">Facebook</button>
          <button class="social-btn google">Google</button>
          <button class="social-btn email">Email</button>
        </div>
      </div>
    </div>
  </div>
</template>


// src/components/login.component.vue

<script>
import { useProfileStore } from "@/users/services/profile.store.js";
import { AuthService } from "@/users/services/auth.service.js";
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      loginError: ""
    };
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const profileStore = useProfileStore();
    return { toast, router, profileStore };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.loginError = "Por favor completa todos los campos.";
        return;
      }

      try {
        const authService = new AuthService();
        const profile = await authService.login(this.email, this.password);

        if (profile) {

          this.profileStore.setProfile(profile);

          await this.router.push("/start");
        } else {
          this.loginError = "Correo electrónico o contraseña incorrectos.";
        }
      } catch (error) {
        this.loginError = "Error al iniciar sesión. Por favor, intenta de nuevo.";
        console.error("Login error:", error);
      }
    },
    goToRegister() {
      this.router.push("/register");
    }
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  padding: 40px;
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
  color: #000;
  margin-bottom: 20px;
  font-weight: bold;
}

.welcome-section p {
  margin: 10px 0;
  color: #000;
}

.image-container {
  margin-top: 20px;
}

.image-container img {
  width: 250px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.highlight {
  background-color: #e4738f;
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
}

.form-section {
  width: 45%;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tab-buttons {
  display: flex;
  margin-bottom: 20px;
}

.tab-buttons button {
  background-color: #fcd5ce;
  color: #000;
  border: none;
  padding: 15px 20px;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  width: 50%;
  font-weight: bold;
  transition: background-color 0.3s;
}

.tab-buttons button.active {
  background-color: #e4738f;
  color: #fff;
}

.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  margin-bottom: 5px;
  color: #000;
  font-weight: bold;
}

.field input {
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #e4738f;
  border-radius: 5px;
}

.forgot-password {
  color: #e4738f;
  font-size: 14px;
  text-align: right;
  display: block;
  margin-bottom: 15px;
}

.checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox label {
  margin-left: 10px;
  color: #000;
}

.login-button {
  width: 100%;
  padding: 15px;
  background-color: #e4738f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #d72323;
}

.social-login {
  text-align: center;
}

.social-login p {
  margin-bottom: 15px;
  color: #000;
}

.social-btn {
  width: 100px;
  margin: 5px;
  background-color: #e4738f;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
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

.error {
  color: #d72323;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
}
</style>

