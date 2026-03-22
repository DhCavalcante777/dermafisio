<template>
  <div class="dashboard-container d-flex">
    <sidebar />

    <main class="main-content flex-grow-1 p-4 background">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import sidebar from '@/components/sidebar.vue';

</script>

<style scoped>
.dashboard-container {
  background-color: var(--color-bg-input);
  min-height: 100vh;
  color: var(--color-text-light);
  font-family: var(--font-body);
  overflow-x: hidden;
}

.main-content {
  overflow-x: hidden;
  max-width: 100%;
}

.background {
  background-color: var(--color-bg-primary);
  background-image: var(--texture-subtle);
  background-size: var(--texture-size);
}

@media (max-width: 767px) {
  .main-content {
    padding-top: 75px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}
</style>
