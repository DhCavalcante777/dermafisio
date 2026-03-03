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
import { ref, onMounted, computed } from 'vue';
import AnamneseService from '@/services/anamneseService';
import sidebar from '@/components/sidebar.vue';

// Estados
const anamneses = ref([]);
const loading = ref(true);
const filterText = ref('');

// Buscar dados da API no Railway
const fetchAnamneses = async () => {
  try {
    loading.value = true;
    const response = await AnamneseService.getAll();
    anamneses.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar anamneses:", error);
    // alert("Erro ao carregar dados do servidor.");
  } finally {
    loading.value = false;
  }
};

// Filtro reativo por nome
const filteredAnamneses = computed(() => {
  if (!filterText.value) return anamneses.value;
  return anamneses.value.filter(item => 
    item.nome.toLowerCase().includes(filterText.value.toLowerCase())
  );
});

// Formatação de data (DD/MM/AAAA)
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

// Lógica de Status
const getStatusClass = (item) => {
  return item.queixa_principal ? 'status-complete' : 'status-pending';
};

const getStatusText = (item) => {
  return item.queixa_principal ? 'Completa' : 'Pendente';
};

// Computados para os Cards
const totalAnamneses = computed(() => anamneses.value.length);

const ultimasAtualizacoes = computed(() => {
  return [...anamneses.value]
    .sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao))
    .slice(0, 3);
});

// Ciclo de Vida
onMounted(() => {
  fetchAnamneses();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap');

.dashboard-container {
  background-color: #0a0a0a;
  min-height: 100vh;
  color: #e0e0e0;
  font-family: 'Poppins', sans-serif;
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
  }
}
</style>
