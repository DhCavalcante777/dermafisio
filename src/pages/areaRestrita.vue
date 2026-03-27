<template>
  <div
    class="login-page min-vh-100 d-flex align-items-center justify-content-center"
  >
    <div class="login-card shadow-lg">
      <div class="text-center mb-4">
        <div class="logo-container">
          <img
            class="login-logo"
            src="@/assets/image/logo-sldermafisio.png"
            alt="SL Dermafísio"
          />
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group-custom mb-3">
          <div class="icon-box">
            <i class="fas fa-envelope"></i>
          </div>
          <input
            type="email"
            v-model="email"
            class="login-input"
            placeholder="E-mail Profissional"
            required
          />
        </div>

        <div class="input-group-custom mb-4">
          <div class="icon-box">
            <i class="fas fa-lock"></i>
          </div>
          <input
            type="password"
            v-model="password"
            class="login-input"
            placeholder="Senha"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar no Painel' }}
        </button>

        <p v-if="errorMsg" class="error-msg text-center mt-3">{{ errorMsg }}</p>

        <div class="text-center mt-3">
          <a href="#" class="forgot-password">Esqueci minha senha</a>
        </div>
      </form>

      <div class="footer-decoration mt-4">
        <div class="deco-line"></div>
        <div class="deco-diamond"></div>
        <div class="deco-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/authService";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMsg = ref("");

const handleLogin = async () => {
  try {
    errorMsg.value = "";
    isLoading.value = true;
    await AuthService.login(email.value, password.value);
    router.push("/dashboard");
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMsg.value = "E-mail ou senha incorretos.";
    } else {
      errorMsg.value = "Erro ao conectar. Tente novamente.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap");

.login-page {
  background-color: var(--color-bg-page);
  background-image:
    repeating-linear-gradient(
      87deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 2px
    ),
    repeating-linear-gradient(
      168deg,
      rgba(0, 0, 0, 0.05) 0px,
      rgba(0, 0, 0, 0.05) 1px,
      transparent 1px,
      transparent 2px
    );
  font-family: "Poppins", sans-serif;
}

.login-card {
  background: var(--color-bg-card);
  width: 100%;
  max-width: 450px;
  padding: 50px 40px;
  border-radius: 15px;
  border: 1px solid var(--color-gold-border-light);
  box-shadow: 0 25px 50px var(--shadow-card);
  position: relative;
  overflow: hidden;
}

/* Estilo do Logo */
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-logo {
  max-width: 200px;
  height: auto;
}

/* Inputs Customizados */
.input-group-custom {
  display: flex;
  align-items: center;
  background: var(--color-bg-input);
  border: 1px solid var(--color-gold-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-group-custom:focus-within {
  border-color: var(--color-gold);
  box-shadow: 0 0 10px var(--color-gold-glow);
}

.icon-box {
  padding: 12px 15px;
  color: var(--color-pink);
  font-size: 18px;
  border-right: 1px solid var(--color-gold-border-subtle);
}

.login-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 15px;
  color: var(--color-text);
  font-size: 15px;
}

.login-input:focus {
  outline: none;
}

.login-input::placeholder {
  color: var(--color-text-placeholder);
}

/* Botão de Login */
.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow-btn);
}

.btn-login:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--color-primary-glow);
}
.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-msg {
  color: var(--color-primary);
  font-size: 14px;
  margin-bottom: 0;
}

.forgot-password {
  color: var(--color-pink);
  font-size: 13px;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.forgot-password:hover {
  opacity: 1;
  color: var(--color-gold);
}

/* Decoração Inferior */
.footer-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.deco-line {
  height: 1px;
  flex: 1;
  background: linear-gradient(to right, transparent, var(--color-gold), transparent);
}

.deco-diamond {
  width: 8px;
  height: 8px;
  background: var(--color-gold);
  transform: rotate(45deg);
}

@media (max-width: 480px) {
  .login-card {
    padding: 40px 25px;
    margin: 20px;
  }
}
</style>
