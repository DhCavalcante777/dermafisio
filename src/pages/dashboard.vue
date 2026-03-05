<template>
  <div class="dashboard-container d-flex">
    <sidebar />

    <!-- Conteúdo Principal -->
    <main class="main-content flex-grow-1 p-4 background">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import sidebar from '@/components/sidebar.vue';

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap');

.dashboard-container {
  background-color: #0a0a0a;
  min-height: 100vh;
  color: #e0e0e0;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
}

.main-content {
  overflow-x: hidden;
  max-width: 100%;
}

.background {
  background-color: #272427;
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
  background-size: 6px 6px;
}

@media (max-width: 767px) {
  .main-content {
    padding-top: 75px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}
</style>
