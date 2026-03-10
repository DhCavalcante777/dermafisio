<template>
  <div class="cliente-list-page">
    <header class="d-flex justify-content-between align-items-center mb-5">
      <div class="welcome-section">
        <h1 class="page-title m-0">Gestão de Clientes</h1>
        <p class="text-muted-luxury">Visualize e gerencie o histórico completo das suas clientes.</p>
      </div>
      <button @click="openNewClienteModal" class="btn-luxury-gold">
        <i class="fas fa-user-plus me-2"></i> Nova Cliente
      </button>
    </header>

    <!-- Barra de Filtros -->
    <div class="filter-bar d-flex gap-3 mb-5 align-items-center">
      <div class="search-wrapper flex-grow-1">
        <i class="fas fa-search search-icon"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Filtrar por nome ou CPF..." 
          class="search-input"
        >
      </div>
      <div class="results-count">
        {{ filteredClientes.length }} Clientes Encontradas
      </div>
    </div>

    <!-- Grid de Clientes -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-gold" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else class="row g-4">
      <div v-for="cliente in filteredClientes" :key="cliente.id" class="col-md-6 col-lg-4">
        <div class="cliente-card shadow-lg" @click="viewClienteDetails(cliente)">
          <div class="cliente-card-header d-flex align-items-center gap-3">
            <div class="cliente-avatar">
              {{ cliente.nome.charAt(0).toUpperCase() }}
            </div>
            <div class="cliente-info">
              <h3 class="cliente-name">{{ cliente.nome }}</h3>
              <span class="cliente-id">ID: #{{ cliente.id }}</span>
            </div>
          </div>
          <div class="cliente-card-body mt-3">
            <div class="info-item">
              <i class="fas fa-phone-alt"></i> {{ cliente.telefone || 'Não informado' }}
            </div>
            <div class="info-item">
              <i class="fas fa-envelope"></i> {{ cliente.email || 'Não informado' }}
            </div>
            <div class="info-item">
              <i class="fas fa-id-card"></i> {{ cliente.cpf || 'Não informado' }}
            </div>
          </div>
          <div class="cliente-card-footer mt-3 pt-3 border-top border-gold-subtle d-flex justify-content-between align-items-center">
            <span class="last-visit">Desde: {{ formatDate(cliente.dataCriacao) }}</span>
            <button class="btn-view-profile">Ver Perfil <i class="fas fa-chevron-right ms-1"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes da Cliente -->
    <div v-if="showDetailsModal" class="luxury-modal-overlay" @click.self="closeDetailsModal">
      <div class="luxury-modal modal-lg animate__animated animate__fadeInUp">
        <button class="btn-close-modal" @click="closeDetailsModal">&times;</button>
        
        <div class="modal-header-luxury border-bottom border-gold pb-4 mb-4">
          <div class="d-flex align-items-center gap-4">
            <div class="cliente-avatar-large">{{ selectedCliente.nome.charAt(0).toUpperCase() }}</div>
            <div>
              <h2 class="modal-title-luxury mb-1">{{ selectedCliente.nome }}</h2>
              <p class="text-gold-subtle m-0">Histórico Completo de Atendimentos</p>
            </div>
          </div>
        </div>

        <div class="modal-body-luxury custom-scrollbar">
          <div class="row">
            <!-- Dados Cadastrais -->
            <div class="col-md-4 border-end border-gold-subtle pe-4">
              <h4 class="section-title-luxury mb-3">Dados Cadastrais</h4>
              <div class="detail-item mb-3">
                <label>CPF</label>
                <p>{{ selectedCliente.cpf || '---' }}</p>
              </div>
              <div class="detail-item mb-3">
                <label>E-mail</label>
                <p>{{ selectedCliente.email || '---' }}</p>
              </div>
              <div class="detail-item mb-3">
                <label>Telefone</label>
                <p>{{ selectedCliente.telefone || '---' }}</p>
              </div>
              <div class="detail-item mb-3">
                <label>Endereço</label>
                <p>{{ selectedCliente.endereco || '---' }}</p>
              </div>
            </div>

            <!-- Linha do Tempo de Anamneses -->
            <div class="col-md-8 ps-4">
              <h4 class="section-title-luxury mb-3">Histórico de Anamneses</h4>
              <div v-if="selectedCliente.historicoAnamneses && selectedCliente.historicoAnamneses.length > 0" class="timeline">
                <div v-for="ficha in selectedCliente.historicoAnamneses" :key="ficha.id" class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content shadow-sm">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <h5 class="ficha-title">Ficha de Anamnese #{{ ficha.id }}</h5>
                      <span class="ficha-date">{{ formatDate(ficha.dataCriacao) }}</span>
                    </div>
                    <p class="ficha-queixa"><strong>Queixa:</strong> {{ ficha.queixaPrincipal || 'Não informada' }}</p>
                    <button @click="verFichaCompleta(ficha.id)" class="btn-link-gold">Ver Ficha Completa <i class="fas fa-external-link-alt ms-1"></i></button>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-5 opacity-50">
                <i class="fas fa-clipboard-list fa-3x mb-3"></i>
                <p>Nenhuma ficha de anamnese vinculada a esta cliente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import clientService from '@/services/clientService';

const clientes = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showDetailsModal = ref(false);
const selectedCliente = ref(null);

const fetchClientes = async () => {
  try {
    loading.value = true;
    const response = await clientService.getAll();
    clientes.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
  } finally {
    loading.value = false;
  }
};

const filteredClientes = computed(() => {
  return clientes.value.filter(c => 
    c.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (c.cpf && c.cpf.includes(searchQuery.value))
  );
});

const viewClienteDetails = async (cliente) => {
  try {
    const response = await ClientService.getById(cliente.id);
    selectedCliente.value = response.data;
    showDetailsModal.value = true;
  } catch (error) {
    alert("Erro ao carregar detalhes da cliente.");
  }
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedCliente.value = null;
};

const formatDate = (dateString) => {
  if (!dateString) return "---";
  return new Date(dateString).toLocaleDateString('pt-BR');
};

onMounted(fetchClientes);
</script>

<style scoped>
.cliente-list-page {
  color: #f9e4b7;
  padding-bottom: 50px;
}

.page-title {
  font-family: 'Playfair Display', serif;
  color: #d4af37;
  font-size: 32px;
}

.text-muted-luxury {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.btn-luxury-gold {
  background: linear-gradient(135deg, #d4af37 0%, #f9e4b7 100%);
  color: #000;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-luxury-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(212, 165, 116, 0.4);
}

/* Filtros */
.search-wrapper {
  position: relative;
  background: #121212;
  border-radius: 10px;
  border: 1px solid rgba(212, 165, 116, 0.2);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #d4af37;
}

.search-input {
  width: 100%;
  background: transparent;
  border: none;
  padding: 12px 15px 12px 45px;
  color: #fff;
  outline: none;
}

/* Cards de Cliente */
.cliente-card {
  background: #121212;
  border: 1px solid rgba(212, 165, 116, 0.1);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.cliente-card:hover {
  border-color: #d4af37;
  transform: translateY(-5px);
  background: #1a1a1a;
}

.cliente-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #d4af37, #8a6d3b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 20px;
}

.cliente-name {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  margin: 0;
  color: #f9e4b7;
}

.cliente-id {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.info-item {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.info-item i {
  width: 20px;
  color: #d4af37;
}

.last-visit {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.btn-view-profile {
  background: transparent;
  border: none;
  color: #d4af37;
  font-size: 13px;
  font-weight: 500;
}

/* Modal de Luxo */
.luxury-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.luxury-modal {
  background: #0a0a0a;
  border: 1px solid #d4af37;
  border-radius: 20px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  position: relative;
  padding: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cliente-avatar-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #d4af37, #f9e4b7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 32px;
  font-weight: bold;
}

.section-title-luxury {
  font-family: 'Playfair Display', serif;
  color: #d4af37;
  font-size: 18px;
  border-left: 3px solid #d4af37;
  padding-left: 15px;
}

.detail-item label {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
}

.detail-item p {
  font-size: 15px;
  color: #f9e4b7;
  margin: 0;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(212, 165, 116, 0.3);
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
}

.timeline-dot {
  position: absolute;
  left: -34px;
  top: 5px;
  width: 9px;
  height: 9px;
  background: #d4af37;
  border-radius: 50%;
  box-shadow: 0 0 8px #d4af37;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 165, 116, 0.1);
  border-radius: 10px;
  padding: 15px;
}

.ficha-title {
  font-size: 15px;
  color: #f9e4b7;
  margin: 0;
}

.ficha-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.ficha-queixa {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 10px 0;
}

.btn-link-gold {
  background: transparent;
  border: none;
  color: #d4af37;
  font-size: 12px;
  padding: 0;
}

.btn-close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: #d4af37;
  font-size: 30px;
  cursor: pointer;
}

.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 10px; }
</style>
