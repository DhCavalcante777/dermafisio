<template>
  <div class="tratamentos-page">
    <header class="d-flex justify-content-between align-items-center mb-5">
      <div class="welcome-section">
        <h1 class="page-title m-0">Gestão de Tratamentos</h1>
        <p class="text-muted-luxury">Registre e gerencie o histórico de tratamentos das suas clientes.</p>
      </div>
      <button @click="openNewModal" class="btn-luxury-gold">
        <i class="fas fa-plus me-2"></i> Novo Tratamento
      </button>
    </header>

    <!-- Filtros -->
    <div class="filter-bar d-flex gap-3 mb-5 align-items-center">
      <div class="search-wrapper flex-grow-1">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          v-model="filterText"
          placeholder="Filtrar por cliente ou procedimento..."
          class="search-input"
        />
      </div>
      <button class="btn-refresh" @click="fetchTratamentos">
        <i class="fas fa-sync-alt me-2"></i> Atualizar
      </button>
    </div>

    <!-- Tabela -->
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="table-card shadow">
          <table class="table table-dark custom-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Procedimento</th>
                <th>Tratamento</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="4" class="text-center py-5">
                  <div class="spinner-border text-warning" role="status"></div>
                  <p class="mt-2">Carregando...</p>
                </td>
              </tr>
              <tr
                v-else
                v-for="item in paginatedTratamentos"
                :key="item.id"
                @click="openModal(item)"
                class="clickable-row"
              >
                <td>{{ item.clienteNome || '—' }}</td>
                <td>{{ item.procedimento || '—' }}</td>
                <td>{{ truncate(item.tratamento, 40) }}</td>
                <td>{{ formatDate(item.data || item.dataCriacao) }}</td>
              </tr>
              <tr v-if="!loading && filteredTratamentos.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  Nenhum tratamento encontrado.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação -->
        <div v-if="totalPages > 1" class="pagination-bar d-flex justify-content-between align-items-center mt-3 px-1">
          <span class="pagination-info">
            {{ (currentPage - 1) * itemsPerPage + 1 }}–{{ Math.min(currentPage * itemsPerPage, filteredTratamentos.length) }}
            de {{ filteredTratamentos.length }}
          </span>
          <div class="d-flex gap-1 align-items-center">
            <button class="btn-page" :disabled="currentPage === 1" @click="currentPage--">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              class="btn-page"
              :class="{ active: page === currentPage }"
              @click="currentPage = page"
            >{{ page }}</button>
            <button class="btn-page" :disabled="currentPage === totalPages" @click="currentPage++">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Cards laterais -->
      <div class="col-lg-4">
        <div class="info-card mb-4 text-center">
          <h3 class="card-label">Total de Tratamentos</h3>
          <div class="card-value">{{ tratamentos.length }}</div>
        </div>
        <div class="info-card">
          <h3 class="card-label mb-3">Últimos Registros</h3>
          <div class="update-list">
            <div
              v-for="item in ultimosRegistros"
              :key="item.id"
              class="update-item mb-3"
            >
              <div class="update-name">{{ item.clienteNome || '—' }}</div>
              <div class="update-procedure">{{ item.procedimento || '—' }}</div>
              <div class="update-date">{{ formatDate(item.data || item.dataCriacao) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Ver/Editar Tratamento -->
    <div v-if="showModal && selectedTratamento" class="luxury-modal-overlay" @click.self="closeModal">
      <div class="luxury-modal animate__animated animate__fadeInUp">
        <button class="btn-close-modal" @click="closeModal">&times;</button>

        <div class="modal-header-luxury">
          <h2 class="modal-title-luxury">Tratamento #{{ selectedTratamento.id }}</h2>
          <p class="text-gold-subtle m-0">{{ selectedTratamento.clienteNome || 'Sem cliente vinculado' }} &mdash; {{ formatDate(selectedTratamento.data || selectedTratamento.dataCriacao) }}</p>
        </div>

        <div class="modal-body-luxury custom-scrollbar pt-4">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="ficha-label">Procedimento</label>
              <input v-if="isEditing" v-model="selectedTratamento.procedimento" class="input-luxury" placeholder="Ex: Drenagem Linfática" />
              <p v-else class="ficha-value">{{ selectedTratamento.procedimento || '—' }}</p>
            </div>
            <div class="col-md-6">
              <label class="ficha-label">Data</label>
              <input v-if="isEditing" v-model="editableData" type="date" class="input-luxury" />
              <p v-else class="ficha-value">{{ formatDate(selectedTratamento.data || selectedTratamento.dataCriacao) }}</p>
            </div>
            <div class="col-12">
              <label class="ficha-label">Tratamento</label>
              <textarea v-if="isEditing" v-model="selectedTratamento.tratamento" class="input-luxury" rows="3" placeholder="Descreva o tratamento realizado..."></textarea>
              <p v-else class="ficha-value">{{ selectedTratamento.tratamento || '—' }}</p>
            </div>
            <div class="col-12">
              <label class="ficha-label">Resultado</label>
              <textarea v-if="isEditing" v-model="selectedTratamento.resultado" class="input-luxury" rows="3" placeholder="Resultado obtido..."></textarea>
              <p v-else class="ficha-value">{{ selectedTratamento.resultado || '—' }}</p>
            </div>
            <div class="col-12">
              <label class="ficha-label">Observações</label>
              <textarea v-if="isEditing" v-model="selectedTratamento.observacoes" class="input-luxury" rows="3" placeholder="Observações adicionais..."></textarea>
              <p v-else class="ficha-value">{{ selectedTratamento.observacoes || '—' }}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer-luxury d-flex justify-content-between align-items-center gap-3 mt-4">
          <button v-if="!isEditing" class="btn-delete-luxury" @click="showConfirmDelete = true">
            <i class="fas fa-trash me-1"></i> Excluir
          </button>
          <div class="d-flex gap-3 ms-auto">
            <button
              v-if="!isEditing && !selectedTratamento.clienteId"
              class="btn-link-luxury"
              @click="openLinkModal"
            >
              <i class="fas fa-link me-1"></i> Vincular Cliente
            </button>
            <button
              v-if="!isEditing && selectedTratamento.clienteId"
              class="btn-unlink-luxury"
              @click="handleUnlink"
            >
              <i class="fas fa-unlink me-1"></i> Desvincular
            </button>
            <button v-if="!isEditing" class="btn-edit-luxury" @click="startEdit">
              Editar
            </button>
            <button v-if="isEditing" class="btn-cancel-luxury" @click="cancelEdit">
              Cancelar
            </button>
            <button v-if="isEditing" class="btn-save-luxury" @click="handleUpdate" :disabled="savingEdit">
              {{ savingEdit ? 'Salvando...' : 'Salvar Alterações' }}
            </button>
          </div>
        </div>

        <!-- Confirmação de exclusão -->
        <div v-if="showConfirmDelete" class="confirm-delete-overlay" @click.self="showConfirmDelete = false">
          <div class="confirm-delete-box">
            <div class="confirm-delete-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h4 class="confirm-delete-title">Excluir Tratamento</h4>
            <p class="confirm-delete-text">Tem certeza que deseja excluir o tratamento <strong>#{{ selectedTratamento.id }}</strong>? Esta ação não pode ser desfeita.</p>
            <div class="d-flex gap-3 justify-content-center mt-4">
              <button class="btn-cancel-luxury" @click="showConfirmDelete = false">Cancelar</button>
              <button class="btn-confirm-delete" @click="handleDelete" :disabled="deleting">
                {{ deleting ? 'Excluindo...' : 'Sim, excluir' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Vincular Cliente -->
    <div v-if="showLinkModal" class="luxury-modal-overlay" @click.self="closeLinkModal">
      <div class="luxury-modal luxury-modal-sm animate__animated animate__fadeInUp">
        <button class="btn-close-modal" @click="closeLinkModal">&times;</button>
        <div class="mb-4 pb-4 border-bottom-gold">
          <h2 class="modal-title-luxury mb-1">Vincular à Cliente</h2>
          <p class="text-gold-subtle m-0">Selecione a cliente para vincular este tratamento.</p>
        </div>

        <div v-if="pendingClient" class="confirm-link-card">
          <div class="confirm-link-avatar">{{ pendingClient.nome.charAt(0).toUpperCase() }}</div>
          <div class="confirm-link-name">{{ pendingClient.nome }}</div>
          <div class="confirm-link-phone">{{ pendingClient.telefone || 'Sem telefone' }}</div>
          <p class="confirm-link-question">Vincular este tratamento à cliente <strong>{{ pendingClient.nome }}</strong>?</p>
          <div class="d-flex gap-3 justify-content-center mt-3">
            <button class="btn-cancel-luxury" @click="pendingClient = null">Não, voltar</button>
            <button class="btn-save-luxury" @click="confirmLink" :disabled="linking">
              {{ linking ? 'Vinculando...' : 'Sim, vincular' }}
            </button>
          </div>
        </div>

        <template v-else>
          <div class="search-wrapper mb-3" style="position: relative;">
            <i class="fas fa-search search-icon"></i>
            <input v-model="clientFilter" class="search-input" placeholder="Buscar cliente pelo nome..." style="padding-left: 38px;" />
          </div>
          <div class="client-link-list custom-scrollbar">
            <div v-if="loadingClients" class="text-center py-4">
              <div class="spinner-border" role="status"></div>
            </div>
            <div
              v-else
              v-for="client in filteredClients"
              :key="client.id"
              class="client-link-item"
              @click="pendingClient = client"
            >
              <div class="client-link-avatar">{{ client.nome.charAt(0).toUpperCase() }}</div>
              <div>
                <div class="client-link-name">{{ client.nome }}</div>
                <div class="client-link-phone">{{ client.telefone || 'Sem telefone' }}</div>
              </div>
            </div>
            <div v-if="!loadingClients && filteredClients.length === 0" class="text-center text-muted py-4">
              Nenhuma cliente encontrada.
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Modal: Novo Tratamento -->
    <div v-if="showNewModal" class="luxury-modal-overlay" @click.self="closeNewModal">
      <div class="luxury-modal luxury-modal-sm animate__animated animate__fadeInUp">
        <button class="btn-close-modal" @click="closeNewModal">&times;</button>
        <div class="mb-4 pb-4 border-bottom-gold">
          <h2 class="modal-title-luxury mb-1">Novo Tratamento</h2>
          <p class="text-gold-subtle m-0">Preencha os dados do tratamento.</p>
        </div>
        <div class="row g-3">
          <div class="col-12">
            <label class="form-label-luxury">Cliente</label>
            <select v-model="newTratamento.clienteId" class="input-luxury">
              <option value="">Sem cliente (avulso)</option>
              <option v-for="c in allClientes" :key="c.id" :value="c.id">{{ c.nome }}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label-luxury">Procedimento</label>
            <input v-model="newTratamento.procedimento" class="input-luxury" placeholder="Ex: Drenagem Linfática" />
          </div>
          <div class="col-md-6">
            <label class="form-label-luxury">Data</label>
            <input v-model="newTratamento.data" type="date" class="input-luxury" />
          </div>
          <div class="col-12">
            <label class="form-label-luxury">Tratamento</label>
            <textarea v-model="newTratamento.tratamento" class="input-luxury" rows="3" placeholder="Descreva o tratamento..."></textarea>
          </div>
          <div class="col-12">
            <label class="form-label-luxury">Resultado</label>
            <textarea v-model="newTratamento.resultado" class="input-luxury" rows="2" placeholder="Resultado obtido..."></textarea>
          </div>
          <div class="col-12">
            <label class="form-label-luxury">Observações</label>
            <textarea v-model="newTratamento.observacoes" class="input-luxury" rows="2" placeholder="Observações adicionais..."></textarea>
          </div>
        </div>
        <div class="d-flex gap-3 justify-content-end mt-4">
          <button class="btn-cancel-luxury" @click="closeNewModal">Cancelar</button>
          <button class="btn-save-luxury" @click="handleCreate" :disabled="saving">
            {{ saving ? 'Salvando...' : 'Cadastrar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import TratamentoService from '@/services/tratamentoService';
import ClientService from '@/services/clientService';

const tratamentos = ref([]);
const loading = ref(true);
const filterText = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const showModal = ref(false);
const selectedTratamento = ref(null);
const isEditing = ref(false);
const editableData = ref('');
const savingEdit = ref(false);
const showConfirmDelete = ref(false);
const deleting = ref(false);

const showLinkModal = ref(false);
const allClientes = ref([]);
const loadingClients = ref(false);
const clientFilter = ref('');
const pendingClient = ref(null);
const linking = ref(false);

const showNewModal = ref(false);
const saving = ref(false);
const newTratamento = ref({ clienteId: '', procedimento: '', data: '', tratamento: '', resultado: '', observacoes: '' });

const fetchTratamentos = async () => {
  try {
    loading.value = true;
    const response = await TratamentoService.getAll();
    let data = response.data;
    if (data.length && (!data[0].clienteNome || data.some(t => !t.clienteNome))) {
      if (!allClientes.value.length) {
        const resp = await ClientService.getAll();
        allClientes.value = resp.data;
      }
      data = data.map(t => {
        if (!t.clienteNome && t.clienteId) {
          const c = allClientes.value.find(c => c.id === t.clienteId);
          return { ...t, clienteNome: c ? c.nome : undefined };
        }
        return t;
      });
    }
    tratamentos.value = data;
  } catch (error) {
    console.error('Erro ao buscar tratamentos:', error);
  } finally {
    loading.value = false;
  }
};

const fetchClientes = async () => {
  try {
    loadingClients.value = true;
    const response = await ClientService.getAll();
    allClientes.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
  } finally {
    loadingClients.value = false;
  }
};

const filteredTratamentos = computed(() => {
  if (!filterText.value) return tratamentos.value;
  const q = filterText.value.toLowerCase();
  return tratamentos.value.filter(t =>
    (t.clienteNome && t.clienteNome.toLowerCase().includes(q)) ||
    (t.procedimento && t.procedimento.toLowerCase().includes(q)) ||
    (t.tratamento && t.tratamento.toLowerCase().includes(q))
  );
});

watch(filteredTratamentos, () => { currentPage.value = 1; });

const totalPages = computed(() => Math.ceil(filteredTratamentos.value.length / itemsPerPage));

const paginatedTratamentos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTratamentos.value.slice(start, start + itemsPerPage);
});

const visiblePages = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  return pages;
});

const ultimosRegistros = computed(() => {
  return [...tratamentos.value]
    .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))
    .slice(0, 5);
});

const filteredClients = computed(() => {
  if (!clientFilter.value) return allClientes.value;
  return allClientes.value.filter(c =>
    c.nome.toLowerCase().includes(clientFilter.value.toLowerCase())
  );
});

const openModal = (item) => {
  selectedTratamento.value = { ...item };
  editableData.value = item.data ? item.data.split('T')[0] : '';
  isEditing.value = false;
  showConfirmDelete.value = false;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedTratamento.value = null;
  isEditing.value = false;
  showConfirmDelete.value = false;
};

const startEdit = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const handleUpdate = async () => {
  try {
    savingEdit.value = true;
    const dataToSend = { ...selectedTratamento.value };
    dataToSend.data = editableData.value || null;
    if ('clienteNome' in dataToSend) delete dataToSend.clienteNome;
    await TratamentoService.update(dataToSend);
    isEditing.value = false;
    fetchTratamentos();
    closeModal();
    alert('Tratamento atualizado com sucesso!');
  } catch (error) {
    alert('Erro ao atualizar tratamento.');
    console.error(error);
  } finally {
    savingEdit.value = false;
  }
};

const handleDelete = async () => {
  try {
    deleting.value = true;
    await TratamentoService.delete(selectedTratamento.value.id);
    showConfirmDelete.value = false;
    closeModal();
    fetchTratamentos();
    alert('Tratamento excluído com sucesso!');
  } catch (error) {
    alert('Erro ao excluir tratamento.');
    console.error(error);
  } finally {
    deleting.value = false;
  }
};

const openLinkModal = async () => {
  pendingClient.value = null;
  clientFilter.value = '';
  showLinkModal.value = true;
  if (allClientes.value.length === 0) await fetchClientes();
};

const closeLinkModal = () => {
  showLinkModal.value = false;
  pendingClient.value = null;
};

const confirmLink = async () => {
  try {
    linking.value = true;
    const dataToSend = { ...selectedTratamento.value, clienteId: pendingClient.value.id };
    await TratamentoService.update(dataToSend);
    selectedTratamento.value.clienteId = pendingClient.value.id;
    selectedTratamento.value.clienteNome = pendingClient.value.nome;
    closeLinkModal();
    fetchTratamentos();
    alert(`Tratamento vinculado à cliente "${pendingClient.value.nome}" com sucesso!`);
  } catch (error) {
    alert('Erro ao vincular tratamento.');
    console.error(error);
  } finally {
    linking.value = false;
  }
};

const handleUnlink = async () => {
  if (!confirm('Deseja desvincular este tratamento da cliente?')) return;
  try {
    const dataToSend = { ...selectedTratamento.value, clienteId: null };
    if ('clienteNome' in dataToSend) delete dataToSend.clienteNome;
    await TratamentoService.update(dataToSend);
    selectedTratamento.value.clienteId = null;
    selectedTratamento.value.clienteNome = null;
    fetchTratamentos();
    alert('Tratamento desvinculado com sucesso!');
  } catch (error) {
    alert('Erro ao desvincular tratamento.');
    console.error(error);
  }
};

const openNewModal = async () => {
  newTratamento.value = { clienteId: '', procedimento: '', data: '', tratamento: '', resultado: '', observacoes: '' };
  showNewModal.value = true;
  if (allClientes.value.length === 0) await fetchClientes();
};

const closeNewModal = () => {
  showNewModal.value = false;
};

const handleCreate = async () => {
  try {
    saving.value = true;
    const dataToSend = { ...newTratamento.value };
    if (!dataToSend.clienteId) delete dataToSend.clienteId;
    if ('clienteNome' in dataToSend) delete dataToSend.clienteNome;
    await TratamentoService.create(dataToSend);
    alert('Tratamento cadastrado com sucesso!');
    closeNewModal();
    fetchTratamentos();
  } catch (error) {
    alert('Erro ao cadastrar tratamento.');
    console.error(error);
  } finally {
    saving.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const truncate = (text, len) => {
  if (!text) return '—';
  return text.length > len ? text.substring(0, len) + '...' : text;
};

onMounted(fetchTratamentos);
</script>

<style scoped>
.tratamentos-page {
  color: var(--color-text);
  padding-bottom: 50px;
}

.page-title {
  font-family: 'Playfair Display', serif;
  color: var(--color-pink);
  font-style: italic;
  font-size: 32px;
}

.text-muted-luxury {
  color: var(--color-text-muted);
  font-size: 14px;
}

.btn-luxury-gold {
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));
  color: var(--color-white);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.3s;
}
.btn-luxury-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--color-primary-glow-strong);
}

.btn-refresh {
  background: transparent;
  border: 1px solid var(--color-tan-border-medium);
  color: var(--color-text-secondary);
  padding: 10px 16px;
  border-radius: 5px;
  font-size: 13px;
  transition: 0.3s;
  white-space: nowrap;
}
.btn-refresh:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.search-wrapper {
  position: relative;
  background: var(--color-bg-elevated);
  border-radius: 5px;
  border: 1px solid var(--color-tan-border-medium);
}
.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-tan-text-muted);
}
.search-input {
  width: 100%;
  background: transparent;
  border: none;
  padding: 10px 15px 10px 45px;
  color: var(--color-white);
  outline: none;
}

/* Table */
.table-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-tan-border-subtle);
  border-radius: 10px;
  overflow: hidden;
}
.custom-table {
  background: transparent;
  margin: 0;
}
.custom-table thead tr th {
  background: var(--color-bg-elevated);
  color: var(--color-gold);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-color: var(--color-tan-border-subtle);
  padding: 14px 18px;
}
.custom-table tbody tr td {
  color: var(--color-text-secondary);
  font-size: 14px;
  border-color: var(--color-tan-border-subtle);
  padding: 12px 18px;
  vertical-align: middle;
}
.clickable-row {
  cursor: pointer;
  transition: background 0.2s;
}
.clickable-row:hover td {
  background: var(--color-tan-bg);
  color: var(--color-text);
}

/* Paginação */
.pagination-bar { color: var(--color-text-placeholder); font-size: 13px; }
.btn-page {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-tan-border-subtle);
  color: var(--color-text-secondary);
  width: 32px;
  height: 32px;
  border-radius: 5px;
  font-size: 13px;
  transition: 0.2s;
}
.btn-page:hover:not(:disabled) { border-color: var(--color-gold); color: var(--color-gold); }
.btn-page.active { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-bg-card); }
.btn-page:disabled { opacity: 0.4; cursor: not-allowed; }

/* Cards laterais */
.info-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-tan-border-subtle);
  border-radius: 10px;
  padding: 24px;
}
.card-label {
  color: var(--color-gold);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.card-value {
  font-size: 42px;
  font-family: 'Playfair Display', serif;
  color: var(--color-text);
}
.update-item { border-bottom: 1px solid var(--color-tan-border-subtle); padding-bottom: 10px; }
.update-name { color: var(--color-text); font-size: 14px; font-weight: 600; }
.update-procedure { color: var(--color-gold); font-size: 12px; margin-top: 2px; }
.update-date { color: var(--color-text-muted); font-size: 12px; }

/* Modal */
.luxury-modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: var(--color-overlay-dark);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.luxury-modal {
  background-color: var(--color-bg-page);
  background-image:
    repeating-linear-gradient(87deg, var(--color-pattern-light) 0px, var(--color-pattern-light) 1px, transparent 1px, transparent 2px),
    repeating-linear-gradient(168deg, var(--color-pattern-dark) 0px, var(--color-pattern-dark) 1px, transparent 1px, transparent 2px);
  border: 1px solid var(--color-gold);
  border-radius: 15px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  position: relative;
  padding: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.luxury-modal-sm { max-width: 520px; }
.modal-header-luxury { padding-bottom: 20px; margin-bottom: 20px; border-bottom: 2px solid var(--color-gold); }
.modal-title-luxury { font-family: 'Playfair Display', serif; color: var(--color-gold); font-size: 24px; font-style: italic; margin: 0; }
.text-gold-subtle { color: var(--color-gold-border-loud); font-size: 14px; }
.modal-body-luxury { overflow-y: auto; flex-grow: 1; padding-bottom: 10px; }
.modal-footer-luxury { padding-top: 20px; margin-top: 10px; border-top: 1px solid var(--color-gold-border); display: flex; }
.btn-close-modal { position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--color-gold); font-size: 30px; cursor: pointer; line-height: 1; }
.btn-close-modal:hover { color: var(--color-pink); }
.border-bottom-gold { border-bottom: 1px solid var(--color-gold-border-medium); padding-bottom: 20px; margin-bottom: 20px; }

.ficha-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--color-gold); opacity: 0.8; margin-bottom: 4px; }
.ficha-value { color: var(--color-text); font-size: 15px; margin-bottom: 12px; white-space: pre-wrap; }
.form-label-luxury { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--color-gold); opacity: 0.8; margin-bottom: 6px; }

.input-luxury {
  width: 100%;
  background: var(--color-bg-input);
  border: 1px solid var(--color-tan-border-medium);
  color: var(--color-text);
  padding: 10px 14px;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
}
.input-luxury:focus { border-color: var(--color-gold); }

.btn-edit-luxury, .btn-save-luxury {
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 10px 28px;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;
}
.btn-edit-luxury:hover, .btn-save-luxury:hover:not(:disabled) { background: var(--color-gold); color: var(--color-bg-card); }
.btn-save-luxury:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-cancel-luxury {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 10px 28px;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
}
.btn-cancel-luxury:hover { background: var(--color-primary); color: var(--color-bg-card); }

.btn-delete-luxury {
  background: transparent;
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  padding: 9px 20px;
  border-radius: 5px;
  font-size: 13px;
  transition: 0.3s;
  cursor: pointer;
}
.btn-delete-luxury:hover { background: var(--color-danger); color: var(--color-white); }

.btn-link-luxury {
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 9px 18px;
  border-radius: 5px;
  font-size: 13px;
  transition: 0.3s;
  cursor: pointer;
}
.btn-link-luxury:hover { background: var(--color-gold); color: var(--color-bg-card); }

.btn-unlink-luxury {
  background: transparent;
  border: 1px solid var(--color-text-muted);
  color: var(--color-text-muted);
  padding: 9px 18px;
  border-radius: 5px;
  font-size: 13px;
  transition: 0.3s;
  cursor: pointer;
}
.btn-unlink-luxury:hover { background: var(--color-text-muted); color: var(--color-bg-card); }

/* Confirmação de exclusão */
.confirm-delete-overlay {
  position: absolute;
  inset: 0;
  background: var(--color-overlay);
  backdrop-filter: blur(6px);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.confirm-delete-box { text-align: center; padding: 40px 32px; max-width: 420px; }
.confirm-delete-icon { font-size: 40px; color: var(--color-danger); margin-bottom: 16px; }
.confirm-delete-title { font-family: 'Playfair Display', serif; color: var(--color-text); font-size: 22px; margin-bottom: 12px; }
.confirm-delete-text { color: var(--color-text-secondary); font-size: 15px; line-height: 1.6; }
.confirm-delete-text strong { color: var(--color-gold); }
.btn-confirm-delete {
  background: transparent;
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  padding: 10px 28px;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;
}
.btn-confirm-delete:hover:not(:disabled) { background: var(--color-danger); color: var(--color-white); }
.btn-confirm-delete:disabled { opacity: 0.5; cursor: not-allowed; }

/* Link modal */
.client-link-list { max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
.client-link-item { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--color-gold-border); cursor: pointer; transition: all 0.25s; }
.client-link-item:hover { border-color: var(--color-gold); background: var(--color-gold-bg-subtle); transform: translateX(4px); }
.client-link-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--color-gold), var(--color-gold-warm)); color: var(--color-bg-card); font-size: 16px; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.client-link-name { color: var(--color-text-light); font-size: 14px; font-weight: 600; }
.client-link-phone { color: var(--color-text-muted); font-size: 12px; margin-top: 2px; }

.confirm-link-card { border: 1px solid var(--color-gold-border); border-radius: 10px; padding: 28px 20px; text-align: center; }
.confirm-link-avatar { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--color-gold), var(--color-gold-warm)); color: var(--color-bg-card); font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.confirm-link-name { color: var(--color-text-light); font-size: 15px; font-weight: 600; }
.confirm-link-phone { color: var(--color-text-muted); font-size: 13px; margin-top: 4px; }
.confirm-link-question { color: var(--color-text-muted); font-size: 14px; margin-top: 18px; line-height: 1.6; }
.confirm-link-question strong { color: var(--color-gold); }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: var(--color-bg-input); }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: 10px; }
</style>
