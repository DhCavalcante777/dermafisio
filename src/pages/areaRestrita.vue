<template>
  <div
    class="login-page min-vh-100 d-flex align-items-center justify-content-center"
  >
    <div class="login-card shadow-lg">
      <!-- Logo Centralizado -->
      <div class="text-center mb-4">
        <div class="logo-container">
          <span class="logo-sl">SL</span>
          <h2 class="brand-name">DERMAFÍSIO</h2>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Campo E-mail -->
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

        <!-- Campo Senha -->
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

        <!-- Botão Entrar -->
        <button type="submit" class="btn-login">Entrar no Painel</button>

        <!-- Esqueci minha senha -->
        <div class="text-center mt-3">
          <a href="#" class="forgot-password">Esqueci minha senha</a>
        </div>
      </form>

      <!-- Detalhe Decorativo Inferior -->
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

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Tentativa de login:", {
    email: email.value,
    password: password.value,
  });
  // Lógica de autenticação aqui
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap");

.login-page {
  background-color: #0a0a0a;
  /* Textura de fundo estilo couro/premium */
  background-image: radial-gradient(circle at center, #1a1a1a 0%, #050505 100%);
  font-family: "Poppins", sans-serif;
}

.login-card {
  background: #121212;
  width: 100%;
  max-width: 450px;
  padding: 50px 40px;
  border-radius: 15px;
  border: 1px solid rgba(212, 165, 116, 0.15);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
}

/* Estilo do Logo */
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-sl {
  font-family: "Playfair Display", serif;
  font-size: 60px;
  background: linear-gradient(135deg, #d4af37 0%, #f9e4b7 50%, #b8860b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 5px;
}

.brand-name {
  color: #d4af37;
  font-family: "Playfair Display", serif;
  font-size: 22px;
  letter-spacing: 6px;
  margin: 0;
  font-weight: 400;
}

/* Inputs Customizados */
.input-group-custom {
  display: flex;
  align-items: center;
  background: #0a0a0a;
  border: 1px solid rgba(212, 165, 116, 0.3);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-group-custom:focus-within {
  border-color: #d4af37;
  box-shadow: 0 0 10px rgba(212, 165, 116, 0.2);
}

.icon-box {
  padding: 12px 15px;
  color: #ff69b4; /* Cor rosa sutil conforme a imagem */
  font-size: 18px;
  border-right: 1px solid rgba(212, 165, 116, 0.1);
}

.login-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 15px;
  color: #e0e0e0;
  font-size: 15px;
}

.login-input:focus {
  outline: none;
}

.login-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* Botão Dourado Metálico */
.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(to bottom, #e5c06d 0%, #b8860b 100%);
  border: none;
  border-radius: 8px;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.btn-login:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(184, 134, 11, 0.3);
}

.forgot-password {
  color: #ff69b4;
  font-size: 13px;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.forgot-password:hover {
  opacity: 1;
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
  background: linear-gradient(to right, transparent, #d4af37, transparent);
}

.deco-diamond {
  width: 8px;
  height: 8px;
  background: #d4af37;
  transform: rotate(45deg);
}

@media (max-width: 480px) {
  .login-card {
    padding: 40px 25px;
    margin: 20px;
  }
}
</style>
