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
            class="custom-input ps-5"
            placeholder="Filtrar por Cliente..."
          />
        </div>
      </div>
      <button class="btn-buscar" @click="fetchAnamneses">
        Atualizar Lista
      </button>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <div class="table-card shadow">
          <table class="table table-dark custom-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Data</th>
                <th>Tipo de Tratamento</th>
                <th>Status</th>
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
                v-for="item in filteredAnamneses"
                :key="item.id"
                @click="openModal(item)"
                class="clickable-row"
              >
                <td>{{ item.nome }}</td>
                <td>{{ formatDate(item.dataCriacao) }}</td>
                <td>{{ item.queixaPrincipal || "Avaliação Geral" }}</td>
                <td>
                  <span :class="['status-badge', getStatusClass(item)]">
                    {{ getStatusText(item) }}
                  </span>
                </td>
              </tr>

              <tr v-if="!loading && filteredAnamneses.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  Nenhuma anamnese encontrada.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Coluna de Resumo -->
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

    <!-- Modal de Visualização/Edição Completa -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content-luxury shadow-lg">
        <div
          class="modal-header-luxury d-flex justify-content-between align-items-center"
        >
          <h2 class="modal-title-luxury">
            Ficha Completa: {{ selectedAnamnese.nome }}
          </h2>
          <button class="btn-close-luxury" @click="closeModal">&times;</button>
        </div>

        <div class="modal-body-luxury custom-scrollbar">
          <!-- Seção: Dados Pessoais -->
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

          <!-- Seção: Queixa Principal -->
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

          <!-- Seção: Histórico Patológico -->
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

          <!-- Seção: Histórico Social -->
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
              <label class="label-luxury">Fuma / Álcool</label>
              <p class="text-luxury">
                Fuma: {{ selectedAnamnese.fuma }} | Álcool:
                {{ selectedAnamnese.alcool }}
              </p>
            </div>
            <div class="col-12">
              <label class="label-luxury">Cirurgias / Metais no corpo</label>
              <p class="text-luxury">
                Cirurgias: {{ selectedAnamnese.cirurgia || "Nenhuma" }} |
                Metais: {{ selectedAnamnese.metais || "Nenhum" }}
              </p>
            </div>
          </div>
        </div>

        <div class="modal-footer-luxury d-flex justify-content-end gap-3 mt-4">
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AnamneseService from "@/services/anamneseService";

const anamneses = ref([]);
const loading = ref(true);
const filterText = ref("");
const showModal = ref(false);
const isEditing = ref(false);
const selectedAnamnese = ref(null);
const originalData = ref(null);

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
  showModal.value = true;
  isEditing.value = false;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
};

const cancelEdit = () => {
  selectedAnamnese.value = { ...originalData.value };
  isEditing.value = false;
};

const handleUpdate = async () => {
  try {
    const dataToSend = { ...selectedAnamnese.value };
    delete dataToSend.dataCriacao;
    await AnamneseService.update(dataToSend);
    alert("Ficha atualizada com sucesso!");
    fetchAnamneses();
    closeModal();
  } catch (error) {
    alert("Erro ao atualizar a ficha.");
    console.log(error);
    
  }
};

const filteredAnamneses = computed(() => {
  if (!filterText.value) return anamneses.value;
  return anamneses.value.filter((item) =>
    item.nome.toLowerCase().includes(filterText.value.toLowerCase()),
  );
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pt-BR");
};

const getStatusClass = (item) =>
  item.queixaPrincipal ? "status-complete" : "status-pending";
const getStatusText = (item) =>
  item.queixaPrincipal ? "Completa" : "Pendente";
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
  color: #d4af37;
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
  padding: 10px 40px;
  border-radius: 5px;
  font-weight: 600;
}

.table-card {
  background: #121212;
  border-radius: 10px;
  border: 1px solid rgba(212, 165, 116, 0.1);
  overflow: hidden;
}
.custom-table th {
  background: #1a1a1a;
  color: #d4af37;
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

/* Hover de Luxo na Tabela */
.clickable-row {
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}
.clickable-row:hover {
  background: rgba(212, 165, 116, 0.08) !important;
  border-left-color: #d4af37;
  transform: translateX(5px);
}

.status-badge {
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 11px;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  font-weight: 600;
}
.status-complete {
  background: rgba(76, 175, 80, 0.15);
  color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.3);
}
.status-pending {
  background: rgba(158, 158, 158, 0.15);
  color: #bdbdbd;
  border: 1px solid rgba(158, 158, 158, 0.3);
}

.info-card {
  background: #121212;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid rgba(212, 165, 116, 0.1);
}
.card-label {
  color: #d4af37;
  font-size: 14px;
  text-transform: uppercase;
}
.card-value {
  font-size: 56px;
  font-family: "Playfair Display", serif;
  color: #f9e4b7;
}

/* Modal de Luxo Expandido */
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
  background: #121212;
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
  border-bottom: 1px solid rgba(212, 165, 116, 0.2);
  background: #1a1a1a;
}
.modal-body-luxury {
  padding: 30px;
  overflow-y: auto;
  flex-grow: 1;
}
.modal-footer-luxury {
  padding: 20px 30px;
  background: #1a1a1a;
  border-top: 1px solid rgba(212, 165, 116, 0.2);
}

.section-title-luxury {
  color: #d4af37;
  font-family: "Playfair Display", serif;
  font-size: 20px;
  font-style: italic;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(212, 165, 116, 0.3);
  padding-bottom: 5px;
}
.label-luxury {
  color: #d4af37;
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
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 10px 30px;
  border-radius: 5px;
  transition: 0.3s;
}
.btn-edit-luxury:hover {
  background: #d4af37;
  color: #121212;
}
.btn-save-luxury {
  background: linear-gradient(to right, #d4af37, #b8860b);
  border: none;
  color: #121212;
  padding: 10px 30px;
  border-radius: 5px;
  font-weight: 600;
}

/* Scrollbar Customizada */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0a0a0a;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d4af37;
  border-radius: 10px;
}
</style>
