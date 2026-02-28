<template>
  <div class="dashboard-container d-flex">
    <sidebar />

    <!-- Conteúdo Principal -->
    <main class="main-content flex-grow-1 p-4">
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

/* Main Content */
.page-title {
  font-family: 'Playfair Display', serif;
  color: #d4af37;
  font-style: italic;
  font-weight: 400;
}

.custom-input {
  background: #1a1a1a;
  border: 1px solid rgba(212, 165, 116, 0.3);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  width: 100%;
  transition: border-color 0.3s;
}

.custom-input:focus {
  outline: none;
  border-color: #d4af37;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(212, 165, 116, 0.5);
}

.btn-buscar {
  background: linear-gradient(to right, #d67a7a, #b35d5d);
  border: none;
  color: white;
  padding: 10px 40px;
  border-radius: 5px;
  font-weight: 600;
  transition: opacity 0.3s;
}

.btn-buscar:hover {
  opacity: 0.9;
}

/* Tabela */
.table-card {
  background: #121212;
  border-radius: 10px;
  border: 1px solid rgba(212, 165, 116, 0.1);
  overflow: hidden;
}

.custom-table {
  margin-bottom: 0;
}

.custom-table th {
  background: #1a1a1a;
  color: #d4af37;
  border-bottom: 1px solid rgba(212, 165, 116, 0.2);
  padding: 15px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
}

.custom-table td {
  padding: 15px;
  vertical-align: middle;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 14px;
}

/* Badges de Status */
.status-badge {
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 11px;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  font-weight: 600;
}

.status-complete { background: rgba(76, 175, 80, 0.15); color: #81c784; border: 1px solid rgba(76, 175, 80, 0.3); }
.status-progress { background: rgba(214, 122, 122, 0.15); color: #e57373; border: 1px solid rgba(214, 122, 122, 0.3); }
.status-pending { background: rgba(158, 158, 158, 0.15); color: #bdbdbd; border: 1px solid rgba(158, 158, 158, 0.3); }

/* Cards Laterais */
.info-card {
  background: #121212;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid rgba(212, 165, 116, 0.1);
}

.card-label {
  color: #d4af37;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-value {
  font-size: 56px;
  font-family: 'Playfair Display', serif;
  color: #f9e4b7;
  margin-top: 10px;
}

.update-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 12px;
}

.update-name { color: #e0e0e0; font-size: 14px; font-weight: 600; }
.update-date { color: rgba(255, 255, 255, 0.4); font-size: 12px; }

.pagination-wrapper .page-number.active {
  color: #d4af37;
  font-weight: bold;
}

.page-arrow {
  cursor: pointer;
  padding: 0 15px;
  color: rgba(212, 165, 116, 0.5);
}

@media (max-width: 992px) {
  .sidebar { width: 80px; }
  .sidebar .brand-name, .sidebar .nav-link span { display: none; }
  .nav-link { text-align: center; padding: 20px; }
  .nav-link i { margin: 0 !important; font-size: 20px; }
}
</style>
