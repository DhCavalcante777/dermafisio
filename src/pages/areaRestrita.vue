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
.login-page {
  background-color: var(--color-bg-primary);
  background-image: var(--texture-subtle);
  font-family: var(--font-body);
}

.login-card {
  background: var(--color-bg-card);
  width: 100%;
  max-width: 450px;
  padding: var(--spacing-2xl) var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gold-glow);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-logo {
  max-width: 200px;
  height: auto;
}

.input-group-custom {
  display: flex;
  align-items: center;
  background: var(--color-bg-input);
  border: 1px solid var(--color-gold-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: var(--transition-base);
}

.input-group-custom:focus-within {
  border-color: var(--color-gold);
  box-shadow: var(--shadow-gold-glow);
}

.icon-box {
  padding: 12px 15px;
  color: var(--color-pink);
  font-size: var(--font-size-lg);
  border-right: 1px solid rgba(222, 184, 135, 0.1);
}

.login-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 15px;
  color: var(--color-text-light);
  font-size: var(--font-size-base);
}

.login-input:focus {
  outline: none;
}

.login-input::placeholder {
  color: var(--color-text-40);
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: var(--gradient-pink-btn);
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.btn-login:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: var(--shadow-pink-hover);
}
.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-msg {
  color: var(--color-pink-dark);
  font-size: var(--font-size-sm);
  margin-bottom: 0;
}

.forgot-password {
  color: var(--color-pink);
  font-size: var(--font-size-sm);
  text-decoration: none;
  opacity: 0.8;
  transition: var(--transition-fade);
}

.forgot-password:hover {
  opacity: 1;
  color: var(--color-gold);
}

.footer-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.deco-line {
  height: 1px;
  flex: 1;
  background: var(--gradient-ornament);
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
