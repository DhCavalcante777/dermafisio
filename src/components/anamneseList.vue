<template>
  <div class="anamnese-list-page">
    <header class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="page-title">Gestão de Anamneses</h1>
    </header>

    <div class="filter-bar d-flex gap-3 mb-4 align-items-end">
      <div class="flex-grow-1">
        <div class="search-input-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            v-model="filterText"
            class="custom-input ps-3"
            placeholder="Filtrar por Cliente..."
          />
        </div>
      </div>
      <div class="btn-actions-group">
        <button class="btn-buscar btn-copy-link" @click="copyLink">
          <i class="fas fa-copy me-2"></i>{{ linkCopiado ? 'Link Copiado!' : 'Copiar Link' }}
        </button>
        <button class="btn-buscar" @click="fetchAnamneses">
          Atualizar Lista
        </button>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="table-card shadow">
          <table class="table table-dark custom-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Telefone</th>
                <th>Data</th>
                <th>Tipo de Tratamento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="4" class="text-center py-5">
                  <div class="spinner-border text-warning" role="status"></div>
                  <p class="mt-2">Carregando dados luxuosos...</p>
                </td>
              </tr>

              <tr
                v-else
                v-for="item in paginatedAnamneses"
                :key="item.id"
                @click="openModal(item)"
                class="clickable-row"
              >
                <td>{{ item.nome }}</td>
                <td>{{ item.telefone }}</td>
                <td>{{ formatDate(item.dataCriacao) }}</td>
                <td>{{ item.queixaPrincipal || "Avaliação Geral" }}</td>
              </tr>

              <tr v-if="!loading && filteredAnamneses.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  Nenhuma anamnese encontrada.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="totalPages > 1" class="pagination-bar d-flex justify-content-between align-items-center mt-3 px-1">
          <span class="pagination-info">{{ (currentPage - 1) * itemsPerPage + 1 }}–{{ Math.min(currentPage * itemsPerPage, filteredAnamneses.length) }} de {{ filteredAnamneses.length }}</span>
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

      <div class="col-lg-4">
        <div class="info-card mb-4 text-center">
          <h3 class="card-label">Total de Anamneses</h3>
          <div class="card-value">{{ totalAnamneses }}</div>
        </div>
        <div class="info-card">
          <h3 class="card-label mb-3">Últimas Atualizações</h3>
          <div class="update-list">
            <div
              v-for="upd in ultimasAtualizacoes"
              :key="upd.id"
              class="update-item mb-3"
            >
              <div class="update-name">{{ upd.nome }}</div>
              <div class="update-date">
                Atualizado: {{ formatDate(upd.dataCriacao) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content-luxury shadow-lg">
        <div
          class="modal-header-luxury d-flex justify-content-between align-items-center"
        >
          <h2 class="modal-title-luxury">
            Ficha Completa: {{ selectedAnamnese.nome }}
          </h2>
          <button class="btn-close-luxury close-button is-active" @click="closeModal">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
          </button>
        </div>

        <div class="modal-body-luxury custom-scrollbar">
          <div class="section-title-luxury">Dados Pessoais</div>
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="label-luxury">Nome Completo</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.nome"
                class="input-luxury"
              />
              <p v-else class="text-luxury">{{ selectedAnamnese.nome }}</p>
            </div>
            <div class="col-md-3">
              <label class="label-luxury">Idade</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.idade"
                class="input-luxury"
              />
              <p v-else class="text-luxury">
                {{ selectedAnamnese.idade }} anos
              </p>
            </div>
            <div class="col-md-3">
              <label class="label-luxury">Telefone</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.telefone"
                class="input-luxury"
              />
              <p v-else class="text-luxury">{{ selectedAnamnese.telefone }}</p>
            </div>
            <div class="col-md-6">
              <label class="label-luxury">Profissão</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.profissao"
                class="input-luxury"
              />
              <p v-else class="text-luxury">{{ selectedAnamnese.profissao }}</p>
            </div>
            <div class="col-md-6">
              <label class="label-luxury">Como Conheceu</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.comoConheceu"
                class="input-luxury"
              />
              <p v-else class="text-luxury">
                {{ selectedAnamnese.comoConheceu }}
              </p>
            </div>
            <div class="col-md-6">
              <label class="label-luxury">Data de Criação</label>
              <input
                v-if="isEditing"
                v-model="editableDate"
                type="date"
                class="input-luxury"
              />
              <p v-else class="text-luxury">{{ formatDate(selectedAnamnese.dataCriacao) }}</p>
            </div>
            <div class="col-12">
              <label class="label-luxury">Endereço</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.endereco"
                class="input-luxury"
              />
              <p v-else class="text-luxury">{{ selectedAnamnese.endereco }}</p>
            </div>
          </div>

          <div class="section-title-luxury">Queixa Principal</div>
          <div class="row g-3 mb-4">
            <div class="col-12">
              <textarea
                v-if="isEditing"
                v-model="selectedAnamnese.queixaPrincipal"
                class="input-luxury"
                rows="3"
              ></textarea>
              <p v-else class="text-luxury">
                {{
                  selectedAnamnese.queixaPrincipal ||
                  "Nenhuma queixa registrada."
                }}
              </p>
            </div>
          </div>

          <div class="section-title-luxury">Tratamento</div>
          <div class="row g-3 mb-4">
            <div class="col-12">
              <textarea
                v-if="isEditing"
                v-model="selectedAnamnese.tratamento"
                class="input-luxury"
                rows="3"
                placeholder="Descreva o tratamento..."
              ></textarea>
              <p v-else class="text-luxury">
                {{ selectedAnamnese.tratamento || "Nenhum tratamento registrado." }}
              </p>
            </div>
          </div>

          <div class="section-title-luxury">Histórico Patológico</div>
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="label-luxury">Medicação em uso</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.medicacao"
                class="input-luxury"
              />
              <p v-else class="text-luxury">
                {{ selectedAnamnese.medicacao || "Nenhuma" }}
              </p>
            </div>
            <div class="col-md-6">
              <label class="label-luxury">Alergia</label>
              <div v-if="isEditing" class="d-flex gap-3">
                <select v-model="selectedAnamnese.alergia" class="input-luxury">
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                <input
                  v-if="selectedAnamnese.alergia === 'sim'"
                  v-model="selectedAnamnese.alergiaQual"
                  class="input-luxury"
                  placeholder="Qual?"
                />
              </div>
              <p v-else class="text-luxury">
                {{
                  selectedAnamnese.alergia === "sim"
                    ? "Sim: " + selectedAnamnese.alergiaQual
                    : "Não"
                }}
              </p>
            </div>
            <div class="col-md-4">
              <label class="label-luxury">Ciclo Menstrual</label>
              <select
                v-if="isEditing"
                v-model="selectedAnamnese.cicloMenstrual"
                class="input-luxury"
              >
                <option value="sim">Regular</option>
                <option value="nao">Irregular</option>
              </select>
              <p v-else class="text-luxury">
                {{
                  selectedAnamnese.cicloMenstrual === "sim"
                    ? "Regular"
                    : "Irregular"
                }}
              </p>
            </div>
            <div class="col-md-4">
              <label class="label-luxury">Anticoncepcional</label>
              <select
                v-if="isEditing"
                v-model="selectedAnamnese.anticoncepcional"
                class="input-luxury"
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
              <p v-else class="text-luxury">
                {{
                  selectedAnamnese.anticoncepcional === "sim" ? "Sim" : "Não"
                }}
              </p>
            </div>
            <div class="col-md-4">
              <label class="label-luxury">Hipotensão</label>
              <select
                v-if="isEditing"
                v-model="selectedAnamnese.hipotensao"
                class="input-luxury"
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
              <p v-else class="text-luxury">
                {{ selectedAnamnese.hipotensao === "sim" ? "Sim" : "Não" }}
              </p>
            </div>
          </div>

          <div class="section-title-luxury">Histórico Social</div>
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="label-luxury">Atividade Física</label>
              <input
                v-if="isEditing"
                v-model="selectedAnamnese.atividadeFisica"
                class="input-luxury"
              />
              <p v-else class="text-luxury">
                {{ selectedAnamnese.atividadeFisica || "Não pratica" }}
              </p>
            </div>
            <div class="col-md-6">
              <div class="d-flex gap-2">
                <div class="flex-grow-1">
                  <label class="label-luxury">Fuma</label>
                  <input v-if="isEditing" v-model="selectedAnamnese.fuma" class="input-luxury" placeholder="Fuma?" />
                  <p v-else class="text-luxury">
                    {{ selectedAnamnese.fuma || "Não fuma" }}
                  </p>
                </div>
                <div class="flex-grow-1">
                  <label class="label-luxury">Álcool</label>
                  <input v-if="isEditing" v-model="selectedAnamnese.alcool" class="input-luxury" placeholder="Álcool?" />
                  <p v-else class="text-luxury">
                    {{ selectedAnamnese.alcool || "Não consome" }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex gap-2">
                <div class="flex-grow-1">
                  <label class="label-luxury">Cirurgias</label>
                  <input v-if="isEditing" v-model="selectedAnamnese.cirurgia" class="input-luxury" placeholder="Cirurgias" />
                  <p v-else class="text-luxury">
                    {{ selectedAnamnese.cirurgia || "Nenhuma" }}
                  </p>
                </div>
                <div class="flex-grow-1">
                  <label class="label-luxury">Metais</label>
                  <input v-if="isEditing" v-model="selectedAnamnese.metais" class="input-luxury" placeholder="Metais no corpo" />
                  <p v-else class="text-luxury">
                    {{ selectedAnamnese.metais || "Nenhum" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-luxury d-flex justify-content-between align-items-center gap-3 mt-4">
          <button
            v-if="!isEditing"
            class="btn-delete-luxury"
            @click="handleDelete"
          >
            <i class="fas fa-trash me-1"></i> Excluir
          </button>
          <div class="d-flex gap-3 ms-auto">
            <button
              v-if="!isEditing && !selectedAnamnese.clienteId"
              class="btn-link-luxury"
              @click="openLinkModal"
            >
              <i class="fas fa-link me-1"></i> Vincular Cliente
            </button>
            <button
              v-if="!isEditing && selectedAnamnese.clienteId"
              class="btn-unlink-luxury"
              @click="unlinkClient"
            >
              <i class="fas fa-unlink me-1"></i> Desvincular
            </button>
            <button
              v-if="!isEditing && selectedAnamnese.clienteId"
              class="btn-profile-luxury"
              @click="goToClientProfile"
            >
              <i class="fas fa-user me-1"></i> Ver Perfil
            </button>
            <button
              v-if="!isEditing"
              class="btn-edit-luxury"
              @click="isEditing = true"
            >
              Editar Ficha
            </button>
            <button
              v-if="isEditing"
              class="btn-cancel-luxury"
              @click="cancelEdit"
            >
              Cancelar
            </button>
            <button
              v-if="isEditing"
              class="btn-save-luxury"
              @click="handleUpdate"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Vincular Cliente -->
  <div v-if="showLinkModal" class="modal-overlay" @click.self="closeLinkModal">
    <div class="link-modal-content shadow-lg">
      <div class="modal-header-luxury d-flex justify-content-between align-items-center">
        <h2 class="modal-title-luxury">Vincular à Cliente</h2>
        <button class="btn-close-luxury close-button is-active" @click="closeLinkModal">
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
        </button>
      </div>
      <div class="p-4">
        <div class="search-input-wrapper mb-3">
          <i class="fas fa-search search-icon"></i>
          <input
            v-model="clientFilter"
            class="custom-input ps-5"
            placeholder="Buscar cliente pelo nome..."
          />
        </div>
        <!-- Confirmação de vínculo -->
        <div v-if="pendingClient" class="confirm-link-card">
          <div class="confirm-link-avatar">{{ pendingClient.nome.charAt(0).toUpperCase() }}</div>
          <div class="confirm-link-name">{{ pendingClient.nome }}</div>
          <div class="confirm-link-phone">{{ pendingClient.telefone || 'Sem telefone' }}</div>
          <p class="confirm-link-question">Você gostaria de vincular a ficha à cliente <strong>{{ pendingClient.nome }}</strong>?</p>
          <div class="d-flex gap-3 justify-content-center mt-3">
            <button class="btn-cancel-luxury" @click="pendingClient = null">Não, voltar</button>
            <button class="btn-save-luxury" @click="confirmLinkClient">Sim, vincular</button>
          </div>
        </div>

        <!-- Lista de clientes -->
        <template v-else>
          <div class="client-list-link custom-scrollbar">
            <div v-if="loadingClients" class="text-center py-4">
              <div class="spinner-border text-warning" role="status"></div>
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
            <div
              v-if="!loadingClients && filteredClients.length === 0"
              class="text-center text-muted py-4"
            >
              Nenhuma cliente encontrada.
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import AnamneseService from "@/services/anamneseService";
import ClientService from "@/services/clientService";

const router = useRouter();

const anamneses = ref([]);
const loading = ref(true);
const filterText = ref("");
const showModal = ref(false);
const isEditing = ref(false);
const selectedAnamnese = ref(null);
const originalData = ref(null);
const linkCopiado = ref(false);

const editableDate = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const showLinkModal = ref(false);
const clients = ref([]);
const clientFilter = ref("");
const loadingClients = ref(false);
const pendingClient = ref(null);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText('https://sldermafisio.com.br/anamnese');
    linkCopiado.value = true;
    setTimeout(() => { linkCopiado.value = false; }, 2000);
  } catch {
    alert('Erro ao copiar o link.');
  }
};

const fetchAnamneses = async () => {
  try {
    loading.value = true;
    const response = await AnamneseService.getAll();
    anamneses.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar anamneses:", error);
  } finally {
    loading.value = false;
  }
};

const openModal = (item) => {
  selectedAnamnese.value = { ...item };
  originalData.value = { ...item };
  editableDate.value = item.dataCriacao ? item.dataCriacao.split('T')[0] : '';
  showModal.value = true;
  isEditing.value = false;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
};

const cancelEdit = () => {
  selectedAnamnese.value = { ...originalData.value };
  editableDate.value = originalData.value.dataCriacao ? originalData.value.dataCriacao.split('T')[0] : '';
  isEditing.value = false;
};

const handleDelete = async () => {
  if (!confirm(`Deseja mesmo excluir a anamnese de "${selectedAnamnese.value.nome}"?`)) return;
  try {
    await AnamneseService.delete(selectedAnamnese.value.id);
    alert('Anamnese excluída com sucesso!');
    closeModal();
    fetchAnamneses();
  } catch (error) {
    alert('Erro ao excluir a anamnese.');
    console.error(error);
  }
};

const handleUpdate = async () => {
  try {
    const dataToSend = { ...selectedAnamnese.value };
    dataToSend.dataCriacao = editableDate.value ? new Date(editableDate.value).toISOString() : null;
    await AnamneseService.update(dataToSend);
    alert("Ficha atualizada com sucesso!");
    fetchAnamneses();
    closeModal();
  } catch (error) {
    alert("Erro ao atualizar a ficha.");
    console.log(error);
  }
};

const openLinkModal = async () => {
  showLinkModal.value = true;
  clientFilter.value = "";
  loadingClients.value = true;
  try {
    const response = await ClientService.getAll();
    clients.value = response.data;
  } catch (error) {
    alert("Erro ao carregar clientes.");
    console.error(error);
  } finally {
    loadingClients.value = false;
  }
};

const closeLinkModal = () => {
  showLinkModal.value = false;
  pendingClient.value = null;
};

const confirmLinkClient = () => {
  if (pendingClient.value) linkClient(pendingClient.value);
};

const linkClient = async (client) => {
  try {
    const dataToSend = { ...selectedAnamnese.value, clienteId: client.id };
    delete dataToSend.dataCriacao;
    await AnamneseService.update(dataToSend);
    selectedAnamnese.value.clienteId = client.id;
    selectedAnamnese.value.clienteNome = client.nome;
    originalData.value = { ...selectedAnamnese.value };
    pendingClient.value = null;
    closeLinkModal();
    fetchAnamneses();
    alert(`Ficha vinculada à cliente "${client.nome}" com sucesso!`);
  } catch (error) {
    alert("Erro ao vincular cliente.");
    console.error(error);
  }
};

const unlinkClient = async () => {
  if (!confirm("Deseja desvincular esta ficha da cliente?")) return;
  try {
    const dataToSend = { ...selectedAnamnese.value, clienteId: null };
    delete dataToSend.dataCriacao;
    await AnamneseService.update(dataToSend);
    selectedAnamnese.value.clienteId = null;
    originalData.value = { ...selectedAnamnese.value };
    fetchAnamneses();
    alert("Vínculo removido com sucesso!");
  } catch (error) {
    alert("Erro ao desvincular cliente.");
    console.error(error);
  }
};

const goToClientProfile = () => {
  closeModal();
  router.push({ name: 'ClientsList' });
};

const filteredClients = computed(() => {
  if (!clientFilter.value) return clients.value;
  return clients.value.filter((c) =>
    c.nome.toLowerCase().includes(clientFilter.value.toLowerCase())
  );
});

const filteredAnamneses = computed(() => {
  if (!filterText.value) return anamneses.value;
  return anamneses.value.filter((item) =>
    item.nome.toLowerCase().includes(filterText.value.toLowerCase()),
  );
});

const totalPages = computed(() => Math.ceil(filteredAnamneses.value.length / itemsPerPage));

const paginatedAnamneses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredAnamneses.value.slice(start, start + itemsPerPage);
});

const visiblePages = computed(() => {
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

watch(filterText, () => { currentPage.value = 1; });

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pt-BR", { timeZone: 'UTC' });
};

const totalAnamneses = computed(() => anamneses.value.length);
const ultimasAtualizacoes = computed(() =>
  [...anamneses.value]
    .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))
    .slice(0, 3),
);

onMounted(fetchAnamneses);
</script>

<style scoped>
.page-title {
  font-family: "Playfair Display", serif;
  color: #f6aeb8;
  font-style: italic;
}
.custom-input {
  background: #1a1a1a;
  border: 1px solid rgba(212, 165, 116, 0.3);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  width: 100%;
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
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
}
.btn-actions-group {
  display: flex;
  gap: 12px;
  align-items: stretch;
}
.btn-copy-link {
  background: transparent;
  border: 1px solid burlywood;
  color: burlywood;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-copy-link:hover {
  background: burlywood;
  color: #121212;
}

.table-card {
  background: #121212;
  border-radius: 10px;
  border: 1px solid rgba(212, 165, 116, 0.1);
  overflow: hidden;
}
.custom-table th {
  background: #1a1a1a;
  color: burlywood;
  border-bottom: 1px solid rgba(212, 165, 116, 0.2);
  padding: 15px;
  text-transform: uppercase;
  font-size: 12px;
}
.custom-table td {
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 14px;
}

.clickable-row {
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}
.clickable-row:hover {
  background: rgba(212, 165, 116, 0.08) !important;
  border-left-color: burlywood;
  transform: translateX(5px);
}

.info-card {
  background: #121212;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid rgba(212, 165, 116, 0.1);
}
.card-label {
  color: #f6aeb8;
  font-size: 14px;
  text-transform: uppercase;
}
.card-value {
  font-size: 56px;
  font-family: "Playfair Display", serif;
  color: #e0e0e0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
}
.modal-content-luxury {
  background-size: 6px 6px;
  width: 95%;
  max-width: 850px;
  max-height: 90vh;
  border-radius: 15px;
  border: 1px solid #d4af37;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal-header-luxury {
  padding: 25px 30px;
  border-bottom: 2px solid burlywood;
  color: burlywood;
}

.modal-body-luxury {
  padding: 30px;
  overflow-y: auto;
  flex-grow: 1;
}
.modal-footer-luxury {
  padding: 20px 30px;
  background: #1a1a1a;
  border-top: 2px solid burlywood;
}

.modal-content-luxury,
.modal-header-luxury,
.modal-footer-luxury {
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
}

.section-title-luxury {
  color: burlywood;
  font-family: "Playfair Display", serif;
  font-size: 20px;
  font-style: italic;
  margin-bottom: 20px;
  border-bottom: 1px solid burlywood;
  padding-bottom: 5px;
}
.label-luxury {
  color: burlywood;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
  display: block;
  opacity: 0.8;
}
.text-luxury {
  color: #e0e0e0;
  font-size: 15px;
  margin-bottom: 15px;
}
.input-luxury {
  background: #0a0a0a;
  border: 1px solid rgba(212, 165, 116, 0.3);
  color: white;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.btn-edit-luxury {
  background: transparent;
  border: 1px solid burlywood;
  color: burlywood;
  padding: 10px 30px;
  border-radius: 5px;
  transition: 0.3s;
}
.btn-edit-luxury:hover {
  background: burlywood;
  color: #121212;
}
.btn-cancel-luxury {
  background: transparent;
  border: 1px solid #d67a7a;
  color: #d67a7a;
  padding: 10px 30px;
  border-radius: 5px;
  transition: 0.3s;
}
.btn-cancel-luxury:hover {
  background: #d67a7a;
  color: #121212;
}
.btn-save-luxury {
  background: transparent;
  border: 1px solid burlywood;
  color: burlywood;
  padding: 10px 30px;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.3s;
}
.btn-save-luxury:hover:not(:disabled) {
  background: burlywood;
  color: #121212;
}
.btn-save-luxury:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-delete-luxury {
  background: transparent;
  border: 1px solid #c0392b;
  color: #c0392b;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
}
.btn-delete-luxury:hover {
  background: #c0392b;
  color: #fff;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0a0a0a;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: burlywood;
  border-radius: 10px;
}

.close-button {
  background: transparent;
  border: 1px solid rgba(222, 184, 135, 0.3);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 8px;
  transition: border-color 0.3s;
}
.close-button:hover {
  border-color: burlywood;
}
.close-button .line {
  display: block;
  height: 2px;
  width: 100%;
  background-color: burlywood;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}
.close-button.is-active .line-1 {
  transform: translateY(8px) rotate(45deg);
}
.close-button.is-active .line-2 {
  opacity: 0;
  transform: scaleX(0);
}
.close-button.is-active .line-3 {
  transform: translateY(-8px) rotate(-45deg);
}

/* Botões Vincular / Desvincular / Ver Perfil */
.btn-link-luxury {
  background: transparent;
  border: 1px solid #7ec8e3;
  color: #7ec8e3;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
}
.btn-link-luxury:hover {
  background: #7ec8e3;
  color: #121212;
}
.btn-unlink-luxury {
  background: transparent;
  border: 1px solid rgba(212, 165, 116, 0.4);
  color: rgba(212, 165, 116, 0.6);
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 13px;
}
.btn-unlink-luxury:hover {
  border-color: #c0392b;
  color: #c0392b;
}
.btn-profile-luxury {
  background: transparent;
  border: 1px solid #a8d8a8;
  color: #a8d8a8;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
}
.btn-profile-luxury:hover {
  background: #a8d8a8;
  color: #121212;
}

/* Modal Vincular Cliente */
.link-modal-content {
  width: 90%;
  max-width: 480px;
  border-radius: 15px;
  border: 1px solid #d4af37;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
}
.client-list-link {
  max-height: 340px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.client-link-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(212, 165, 116, 0.15);
  cursor: pointer;
  transition: all 0.25s;
  background: rgba(0, 0, 0, 0.2);
}
.client-link-item:hover {
  border-color: burlywood;
  background: rgba(222, 184, 135, 0.08);
  transform: translateX(4px);
}
.client-link-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, burlywood, #b38b6d);
  color: #121212;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.client-link-name {
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 600;
}
.client-link-phone {
  color: rgba(212, 165, 116, 0.7);
  font-size: 12px;
  margin-top: 2px;
}

/* Confirmação de vínculo */
.confirm-link-card {
  border: 1px solid rgba(212, 165, 116, 0.3);
  border-radius: 10px;
  padding: 28px 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  animation: fadeInUp 0.2s ease;
}
.confirm-link-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, burlywood, #b38b6d);
  color: #121212;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}
.confirm-link-name {
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
}
.confirm-link-phone {
  color: rgba(212, 165, 116, 0.7);
  font-size: 13px;
  margin-top: 4px;
}
.confirm-link-question {
  color: #ccc;
  font-size: 14px;
  margin-top: 18px;
  line-height: 1.6;
}
.confirm-link-question strong {
  color: burlywood;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.pagination-info {
  color: rgba(212, 165, 116, 0.6);
  font-size: 13px;
}
.btn-page {
  background: transparent;
  border: 1px solid rgba(212, 165, 116, 0.25);
  color: rgba(212, 165, 116, 0.7);
  width: 34px;
  height: 34px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.btn-page:hover:not(:disabled) {
  border-color: burlywood;
  color: burlywood;
}
.btn-page.active {
  background: burlywood;
  border-color: burlywood;
  color: #121212;
  font-weight: 700;
}
.btn-page:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (min-width: 320px) and (max-width: 868px) {
  .filter-bar {
    flex-wrap: wrap;
  }
  .filter-bar .flex-grow-1 {
    flex: 1 1 100%;
  }
  .btn-actions-group {
    flex: 1 1 100%;
  }
  .btn-actions-group .btn-buscar {
    flex: 1;
  }
}
</style>
