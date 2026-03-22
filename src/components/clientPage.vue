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

        <!-- Footer do modal -->
        <div class="modal-footer-details">
          <button class="btn-delete-cliente" @click="showConfirmDelete = true">
            <i class="fas fa-trash me-2"></i>Remover Cliente
          </button>
        </div>

        <!-- Confirmação de exclusão (inline) -->
        <div v-if="showConfirmDelete" class="confirm-delete-overlay" @click.self="showConfirmDelete = false">
          <div class="confirm-delete-box">
            <div class="confirm-delete-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h4 class="confirm-delete-title">Remover Cliente</h4>
            <p class="confirm-delete-text">Tem certeza que deseja remover <strong>{{ selectedCliente.nome }}</strong>? Esta ação não pode ser desfeita.</p>
            <div class="d-flex gap-3 justify-content-center mt-4">
              <button class="btn-cancel-modal" @click="showConfirmDelete = false">Cancelar</button>
              <button class="btn-confirm-delete" @click="handleDeleteCliente" :disabled="deletingCliente">
                {{ deletingCliente ? 'Removendo...' : 'Sim, remover' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Nova Cliente -->
  <div v-if="showNewClienteModal" class="luxury-modal-overlay" @click.self="closeNewClienteModal">
    <div class="luxury-modal luxury-modal-sm animate__animated animate__fadeInUp">
      <button class="btn-close-modal" @click="closeNewClienteModal">&times;</button>
      <div class="mb-4 pb-4 border-bottom-gold">
        <h2 class="modal-title-luxury mb-1">Nova Cliente</h2>
        <p class="text-gold-subtle m-0">Preencha os dados para cadastrar.</p>
      </div>
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-luxury">Nome Completo <span class="text-danger">*</span></label>
          <input v-model="newCliente.nome" class="input-luxury" placeholder="Nome da cliente" />
        </div>
        <div class="col-md-6">
          <label class="form-label-luxury">Telefone</label>
          <input v-model="newCliente.telefone" class="input-luxury" placeholder="(00) 00000-0000" />
        </div>
        <div class="col-md-6">
          <label class="form-label-luxury">CPF</label>
          <input v-model="newCliente.cpf" class="input-luxury" placeholder="000.000.000-00" />
        </div>
        <div class="col-12">
          <label class="form-label-luxury">E-mail</label>
          <input v-model="newCliente.email" class="input-luxury" placeholder="email@exemplo.com" />
        </div>
        <div class="col-12">
          <label class="form-label-luxury">Endereço</label>
          <input v-model="newCliente.endereco" class="input-luxury" placeholder="Rua, número, bairro..." />
        </div>
      </div>
      <div class="d-flex gap-3 justify-content-end mt-4">
        <button class="btn-cancel-modal" @click="closeNewClienteModal">Cancelar</button>
        <button class="btn-save-modal" @click="handleCreateCliente" :disabled="savingCliente">
          {{ savingCliente ? 'Salvando...' : 'Cadastrar Cliente' }}
        </button>
      </div>
    </div>
  </div>
  <!-- Modal: Ficha de Anamnese -->
  <div v-if="showFichaModal && selectedFicha" class="luxury-modal-overlay" @click.self="closeFichaModal">
    <div class="luxury-modal luxury-modal-ficha animate__animated animate__fadeInUp">
      <button class="btn-close-modal" @click="closeFichaModal">&times;</button>

      <div class="modal-header-luxury">
        <h2 class="modal-title-luxury">Ficha de Anamnese #{{ selectedFicha.id }}</h2>
        <p class="text-gold-subtle m-0">{{ selectedFicha.nome }} &mdash; {{ formatDate(selectedFicha.dataCriacao) }}</p>
      </div>

      <div class="modal-body-luxury custom-scrollbar pt-4">

        <div class="ficha-section-title">Dados Pessoais</div>
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="ficha-label">Nome Completo</label>
            <p class="ficha-value">{{ selectedFicha.nome }}</p>
          </div>
          <div class="col-md-3">
            <label class="ficha-label">Idade</label>
            <p class="ficha-value">{{ selectedFicha.idade }} anos</p>
          </div>
          <div class="col-md-3">
            <label class="ficha-label">Telefone</label>
            <p class="ficha-value">{{ selectedFicha.telefone }}</p>
          </div>
          <div class="col-md-6">
            <label class="ficha-label">Profissão</label>
            <p class="ficha-value">{{ selectedFicha.profissao || '---' }}</p>
          </div>
          <div class="col-md-6">
            <label class="ficha-label">Como Conheceu</label>
            <p class="ficha-value">{{ selectedFicha.comoConheceu || '---' }}</p>
          </div>
          <div class="col-12">
            <label class="ficha-label">Endereço</label>
            <p class="ficha-value">{{ selectedFicha.endereco || '---' }}</p>
          </div>
        </div>

        <div class="ficha-section-title">Queixa Principal</div>
        <div class="row g-3 mb-4">
          <div class="col-12">
            <p class="ficha-value">{{ selectedFicha.queixaPrincipal || 'Nenhuma queixa registrada.' }}</p>
          </div>
        </div>

        <div class="ficha-section-title">Histórico Patológico</div>
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="ficha-label">Medicação em uso</label>
            <p class="ficha-value">{{ selectedFicha.medicacao || 'Nenhuma' }}</p>
          </div>
          <div class="col-md-6">
            <label class="ficha-label">Alergia</label>
            <p class="ficha-value">{{ selectedFicha.alergia === 'sim' ? 'Sim: ' + selectedFicha.alergiaQual : 'Não' }}</p>
          </div>
          <div class="col-md-4">
            <label class="ficha-label">Ciclo Menstrual</label>
            <p class="ficha-value">{{ selectedFicha.cicloMenstrual === 'sim' ? 'Regular' : 'Irregular' }}</p>
          </div>
          <div class="col-md-4">
            <label class="ficha-label">Anticoncepcional</label>
            <p class="ficha-value">{{ selectedFicha.anticoncepcional === 'sim' ? 'Sim' : 'Não' }}</p>
          </div>
          <div class="col-md-4">
            <label class="ficha-label">Hipotensão</label>
            <p class="ficha-value">{{ selectedFicha.hipotensao === 'sim' ? 'Sim' : 'Não' }}</p>
          </div>
        </div>

        <div class="ficha-section-title">Histórico Social</div>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="ficha-label">Atividade Física</label>
            <p class="ficha-value">{{ selectedFicha.atividadeFisica || 'Não pratica' }}</p>
          </div>
          <div class="col-md-3">
            <label class="ficha-label">Fuma</label>
            <p class="ficha-value">{{ selectedFicha.fuma || 'Não fuma' }}</p>
          </div>
          <div class="col-md-3">
            <label class="ficha-label">Álcool</label>
            <p class="ficha-value">{{ selectedFicha.alcool || 'Não consome' }}</p>
          </div>
          <div class="col-md-6">
            <label class="ficha-label">Cirurgias</label>
            <p class="ficha-value">{{ selectedFicha.cirurgia || 'Nenhuma' }}</p>
          </div>
          <div class="col-md-6">
            <label class="ficha-label">Metais</label>
            <p class="ficha-value">{{ selectedFicha.metais || 'Nenhum' }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import clientService from '@/services/clientService';
import AnamneseService from '@/services/anamneseService';

const router = useRouter();

const clientes = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showDetailsModal = ref(false);
const selectedCliente = ref(null);

const showNewClienteModal = ref(false);
const savingCliente = ref(false);
const newCliente = ref({ nome: '', telefone: '', email: '', cpf: '', endereco: '' });

const showFichaModal = ref(false);
const selectedFicha = ref(null);

const showConfirmDelete = ref(false);
const deletingCliente = ref(false);

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
    const response = await clientService.getOne(cliente.id);
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

const openNewClienteModal = () => {
  newCliente.value = { nome: '', telefone: '', email: '', cpf: '', endereco: '' };
  showNewClienteModal.value = true;
};

const closeNewClienteModal = () => {
  showNewClienteModal.value = false;
};

const handleCreateCliente = async () => {
  if (!newCliente.value.nome.trim()) {
    alert('O nome da cliente é obrigatório.');
    return;
  }
  try {
    savingCliente.value = true;
    await clientService.create(newCliente.value);
    alert('Cliente cadastrada com sucesso!');
    closeNewClienteModal();
    fetchClientes();
  } catch (error) {
    alert('Erro ao cadastrar cliente.');
    console.error(error);
  } finally {
    savingCliente.value = false;
  }
};

const verFichaCompleta = async (fichaId) => {
  try {
    const response = await AnamneseService.getOne(fichaId);
    selectedFicha.value = response.data;
    showFichaModal.value = true;
  } catch (error) {
    alert('Erro ao carregar a ficha de anamnese.');
    console.error(error);
  }
};

const closeFichaModal = () => {
  showFichaModal.value = false;
  selectedFicha.value = null;
};

const handleDeleteCliente = async () => {
  try {
    deletingCliente.value = true;
    await clientService.delete(selectedCliente.value.id);
    showConfirmDelete.value = false;
    closeDetailsModal();
    fetchClientes();
    alert(`Cliente "${selectedCliente.value?.nome ?? ''}" removida com sucesso!`);
  } catch (error) {
    alert('Erro ao remover a cliente.');
    console.error(error);
  } finally {
    deletingCliente.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "---";
  return new Date(dateString).toLocaleDateString('pt-BR');
};

onMounted(fetchClientes);
</script>

<style scoped>
.cliente-list-page {
  color: var(--color-text-light);
  padding-bottom: 50px;
}

.page-title {
  font-family: var(--font-serif);
  color: var(--color-pink);
  font-style: italic;
  font-size: var(--font-size-3xl);
}

.text-muted-luxury {
  color: var(--color-text-50);
  font-size: var(--font-size-sm);
}

.btn-luxury-gold {
  background: var(--gradient-pink-btn);
  color: var(--color-text-primary);
  border: none;
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: var(--transition-base);
}

.btn-luxury-gold:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-pink);
}

/* Filtros */
.search-wrapper {
  position: relative;
  background: var(--color-bg-card);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-gold-border);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(212, 165, 116, 0.5);
}

.search-input {
  width: 100%;
  background: transparent;
  border: none;
  padding: 10px 15px 10px 45px;
  color: var(--color-text-primary);
  outline: none;
}

.results-count {
  color: var(--color-text-40);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

/* Cards de Cliente */
.cliente-card {
  background: var(--color-bg-card);
  border: 1px solid rgba(212, 165, 116, 0.1);
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: var(--transition-base);
  border-left: 4px solid transparent;
}

.cliente-card:hover {
  border-left-color: var(--color-gold);
  background: var(--color-gold-bg-hover);
  transform: translateX(5px);
}

.cliente-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--color-gold), #b38b6d);
  border-radius: var(--radius-circle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-bg-card);
  font-weight: bold;
  font-size: 20px;
}

.cliente-name {
  font-family: var(--font-serif);
  font-size: var(--font-size-lg);
  margin: 0;
  color: var(--color-text-light);
}

.cliente-id {
  font-size: 12px;
  color: var(--color-text-40);
}

.info-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-70);
  margin-bottom: 8px;
}

.info-item i {
  width: 20px;
  color: var(--color-gold);
}

.last-visit {
  font-size: 12px;
  color: var(--color-text-40);
}

.btn-view-profile {
  background: transparent;
  border: none;
  color: var(--color-gold);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

/* Modal de Luxo */
.luxury-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.luxury-modal {
  background-color: var(--color-bg-primary);
  background-image: var(--texture-subtle);
  border: 1px solid var(--color-gold);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  position: relative;
  padding: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.luxury-modal-sm {
  max-width: 560px;
}

.modal-body-luxury {
  overflow-y: auto;
  flex-grow: 1;
  padding-bottom: 10px;
}

.modal-title-luxury {
  font-family: var(--font-serif);
  color: var(--color-gold);
  font-size: var(--font-size-2xl);
  font-style: italic;
  margin: 0;
}

.modal-header-luxury {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--color-gold);
}

.text-gold-subtle {
  color: rgba(222, 184, 135, 0.6);
  font-size: var(--font-size-sm);
}

.border-gold {
  border-color: var(--color-gold) !important;
}

.border-gold-subtle {
  border-color: rgba(222, 184, 135, 0.2) !important;
}

.border-bottom-gold {
  border-bottom: 1px solid rgba(222, 184, 135, 0.3);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.cliente-avatar-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-gold), #b38b6d);
  border-radius: var(--radius-circle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-bg-card);
  font-size: 32px;
  font-weight: bold;
}

.section-title-luxury {
  font-family: var(--font-serif);
  color: var(--color-gold);
  font-size: var(--font-size-lg);
  font-style: italic;
  border-bottom: 1px solid var(--color-gold);
  padding-bottom: 5px;
}

.detail-item label {
  display: block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  color: var(--color-gold);
  opacity: 0.8;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.detail-item p {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
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
  background: rgba(222, 184, 135, 0.3);
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
  background: var(--color-gold);
  border-radius: var(--radius-circle);
  box-shadow: var(--shadow-appt-dot);
}

.timeline-content {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(222, 184, 135, 0.15);
  border-radius: 10px;
  padding: 15px;
}

.ficha-title {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  margin: 0;
}

.ficha-date {
  font-size: 12px;
  color: var(--color-text-40);
}

.ficha-queixa {
  font-size: var(--font-size-xs);
  color: var(--color-text-70);
  margin: 10px 0;
}

.btn-link-gold {
  background: transparent;
  border: 1px solid rgba(222, 184, 135, 0.4);
  color: var(--color-gold);
  font-size: 12px;
  padding: 5px 14px;
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}

.btn-link-gold:hover {
  background: var(--color-gold);
  color: var(--color-bg-card);
}

.btn-close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: var(--color-gold);
  font-size: 30px;
  cursor: pointer;
  line-height: 1;
  transition: var(--transition-color);
}

.btn-close-modal:hover {
  color: var(--color-pink);
}

/* Formulário */
.form-label-luxury {
  display: block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-gold);
  opacity: 0.8;
  margin-bottom: 6px;
}

.input-luxury {
  width: 100%;
  background: var(--color-bg-input);
  border: 1px solid var(--color-gold-border);
  color: var(--color-text-light);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.2s;
}

.input-luxury:focus {
  border-color: var(--color-gold);
}

.btn-cancel-modal {
  background: transparent;
  border: 1px solid var(--color-pink-dark);
  color: var(--color-pink-dark);
  padding: 10px 28px;
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}

.btn-cancel-modal:hover {
  background: var(--color-pink-dark);
  color: var(--color-bg-card);
}

.btn-save-modal {
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 10px 28px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: var(--transition-base);
}

.btn-save-modal:hover:not(:disabled) {
  background: var(--color-gold);
  color: var(--color-bg-card);
}

.btn-save-modal:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: var(--color-bg-input); }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: var(--radius-md); }

/* Footer do modal de detalhes */
.modal-footer-details {
  padding-top: 20px;
  margin-top: 10px;
  border-top: 1px solid rgba(222, 184, 135, 0.2);
  display: flex;
  justify-content: flex-start;
}
.btn-delete-cliente {
  background: transparent;
  border: 1px solid var(--color-status-error-alt);
  color: var(--color-status-error-alt);
  padding: 9px 20px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  transition: var(--transition-base);
}
.btn-delete-cliente:hover {
  background: var(--color-status-error-alt);
  color: #fff;
}

/* Confirmação de exclusão */
.confirm-delete-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.confirm-delete-box {
  text-align: center;
  padding: 40px 32px;
  max-width: 420px;
}
.confirm-delete-icon {
  font-size: 40px;
  color: var(--color-status-error-alt);
  margin-bottom: 16px;
}
.confirm-delete-title {
  font-family: var(--font-serif);
  color: var(--color-text-light);
  font-size: 22px;
  margin-bottom: 12px;
}
.confirm-delete-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 1.6;
}
.confirm-delete-text strong {
  color: var(--color-gold);
}
.btn-confirm-delete {
  background: transparent;
  border: 1px solid var(--color-status-error-alt);
  color: var(--color-status-error-alt);
  padding: 10px 28px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: var(--transition-base);
}
.btn-confirm-delete:hover:not(:disabled) {
  background: var(--color-status-error-alt);
  color: #fff;
}
.btn-confirm-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal Ficha de Anamnese */
.luxury-modal-ficha {
  max-width: 800px;
}
.ficha-section-title {
  color: var(--color-gold);
  font-family: var(--font-serif);
  font-size: var(--font-size-lg);
  font-style: italic;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-gold);
  padding-bottom: 5px;
}
.ficha-label {
  display: block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-gold);
  opacity: 0.8;
  margin-bottom: 4px;
}
.ficha-value {
  color: var(--color-text-light);
  font-size: var(--font-size-base);
  margin-bottom: 12px;
}
</style>
