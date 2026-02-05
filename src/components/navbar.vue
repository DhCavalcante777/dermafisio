<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light background">
      <div class="container-fluid linha-burlywood">
        <div class="row w-100 align-items-center">
          <div class="col-5 d-flex justify-content-center">
            <img
              class="logo"
              src="../assets/image/logo-lateralizado.png"
              alt="Logo"
            />
          </div>
          <div class="col-7 d-flex justify-content-lg-start justify-content-end">
            <button
              class="navbar-toggler"
              type="button"
              @click="menuAberto = !menuAberto"
              :aria-expanded="menuAberto"
              aria-label="Toggle navigation"
            >
              <div class="hamburger" :class="{ 'is-active': menuAberto }">
                <span class="line line-1"></span>
                <span class="line line-2"></span>
                <span class="line line-3"></span>
              </div>
            </button>
            <div class="collapse navbar-collapse" :class="{ show: menuAberto }" id="navbarNav">
              <ul class="navbar-nav gap-5">
                <li class="nav-item">
                  <a class="font-navbar" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="font-navbar" href="#">Tratamentos</a>
                </li>
                <li class="nav-item">
                  <a class="font-navbar" href="#">Sobre</a>
                </li>
                <li class="nav-item">
                  <a class="font-navbar" href="#">Contato</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuAberto = ref(false)
</script>

<style scoped>
.logo {
  height: 100px;
}
.background {
  background-color: #272427;
  background-image: repeating-linear-gradient(
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
  background-size: 6px 6px;
  padding-bottom: 2px;
}

.font-navbar {
	font-size: 22px;
	color: burlywood;
	text-decoration: none;
}

.linha-burlywood {
  width: 100%;
  padding-bottom: 1px;
  border-bottom: 2px solid burlywood;
}

/* Botão toggler com cor burlywood */
.navbar-toggler {
  border-color: burlywood;
  padding: 8px;
}

/* Hamburger animado */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;
}

.hamburger .line {
  display: block;
  height: 2px;
  width: 100%;
  background-color: burlywood;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* Animação para X */
.hamburger.is-active .line-1 {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.is-active .line-2 {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.is-active .line-3 {
  transform: translateY(-8px) rotate(-45deg);
}

/* Menu mobile expandido */
@media (max-width: 991.98px) {
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #212121;
    z-index: 1000;
    height: 235px;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: inset(0 0 100% 0);
    transition: clip-path 0.4s ease-out;
  }

  .navbar-collapse.show {
    clip-path: inset(0 0 0 0);
  }

  .navbar-nav {
    flex-direction: column;
    gap: 1.5rem !important;
    justify-content: center;
    padding: 1rem 0;
  }
}

@media (max-width: 768px) {
  .logo {
    padding-left: 50px;
  }
}

@media (max-width: 480px) {
  .logo {
    padding-left: 100px;
  }
}

@media (max-width: 320px) {
  .logo {
    height: 80px;
  }
}
</style>