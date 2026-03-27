<template>
  <div class="financeiro-page">
    <header class="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
      <h1 class="page-title">Gestão Financeira</h1>
      <div class="d-flex gap-3 align-items-center flex-wrap">
        <div class="period-filter">
          <button
            v-for="p in periods" :key="p.value"
            class="period-btn"
            :class="{ active: selectedPeriod === p.value }"
            @click="selectedPeriod = p.value"
          >{{ p.label }}</button>
        </div>
        <button class="btn-add-luxury" @click="openModal()">
          <i class="fas fa-plus me-2"></i>Nova Transação
        </button>
      </div>
    </header>

    <div class="row g-4 mb-5">
      <div class="col-md-4">
        <div class="finance-card shadow-lg">
          <div class="card-header-luxury">Total Pagamento</div>
          <div class="card-value-luxury">{{ formatCurrency(totalReceitas) }}</div>
          <div class="card-sub-luxury">total de pagamentos recebidos</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="finance-card shadow-lg">
          <div class="card-header-luxury">Total Despesas</div>
          <div class="card-value-luxury text-expense">{{ formatCurrency(totalDespesas) }}</div>
          <div class="card-sub-luxury">total de despesas lançadas</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="finance-card shadow-lg">
          <div class="card-header-luxury">Saldo</div>
          <div class="card-value-luxury" :class="saldo >= 0 ? '' : 'text-expense'">{{ formatCurrency(saldo) }}</div>
          <div class="card-sub-luxury">receitas − despesas</div>
        </div>
      </div>
    </div>

    <div class="chart-container-luxury mb-5 shadow-lg" v-if="!loading && filteredTransactions.length > 0">
      <div class="chart-header d-flex justify-content-between align-items-center mb-4">
        <h3 class="section-title-luxury m-0">Receitas vs. Despesas</h3>
        <div class="chart-legend d-flex gap-3">
          <span class="legend-item"><span class="dot income-dot"></span> Receitas</span>
          <span class="legend-item"><span class="dot expense-dot"></span> Despesas</span>
        </div>
      </div>
      <div class="chart-wrapper">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <div class="transactions-container shadow-lg">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="section-title-luxury m-0">Transações</h3>
        <div class="spinner-border text-warning spinner-border-sm" v-if="loading" role="status"></div>
      </div>
      <table class="table table-dark custom-finance-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th class="text-end">Valor</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="text-center py-5">
              <div class="spinner-border text-warning" role="status"></div>
            </td>
          </tr>
          <tr v-else-if="filteredTransactions.length === 0">
            <td colspan="4" class="text-center py-5 text-muted">Nenhuma transação encontrada neste período.</td>
          </tr>
          <tr v-else v-for="t in filteredTransactions" :key="t.id">
            <td>{{ formatDate(t.data) }}</td>
            <td>{{ t.descricao }}</td>
            <td class="text-end fw-bold" :class="t.tipo === 'despesa' ? 'text-expense' : 'text-gold'">
              {{ t.tipo === 'despesa' ? '- ' : '+ ' }}{{ formatCurrency(t.valor) }}
            </td>
            <td class="text-center">
              <button class="btn-icon-luxury me-2" @click="openModal(t)" title="Editar">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn-icon-luxury btn-icon-delete" @click="deleteTransaction(t)" title="Excluir">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal: Nova / Editar Transação -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-finance shadow-lg">
      <div class="modal-header-luxury d-flex justify-content-between align-items-center">
        <h2 class="modal-title-luxury">{{ editingId ? 'Editar Transação' : 'Nova Transação' }}</h2>
        <button class="btn-close-luxury close-button is-active" @click="closeModal">
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
        </button>
      </div>
      <div class="p-4">
        <div class="row g-3">
          <div class="col-12">
            <label class="label-luxury">Descrição</label>
            <input v-model="form.descricao" class="input-luxury" placeholder="Ex: Consulta, Produto..." />
          </div>
          <div class="col-md-6">
            <label class="label-luxury">Tipo</label>
            <select v-model="form.tipo" class="input-luxury">
              <option value="pagamento">Pagamento</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="label-luxury">Valor (R$)</label>
            <input v-model="form.valor" type="number" step="0.01" min="0" class="input-luxury" placeholder="0,00" />
          </div>
          <div class="col-md-6">
            <label class="label-luxury">Data</label>
            <input v-model="form.data" type="date" class="input-luxury" />
          </div>
        </div>
        <div class="d-flex gap-3 justify-content-end mt-4">
          <button class="btn-cancel-luxury" @click="closeModal">Cancelar</button>
          <button class="btn-save-luxury" @click="handleSubmit" :disabled="saving">
            {{ saving ? 'Salvando...' : (editingId ? 'Salvar Alterações' : 'Adicionar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import FinanceiroService from '@/services/financeiroService';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const transactions = ref([]);
const loading = ref(true);
const showModal = ref(false);
const saving = ref(false);
const editingId = ref(null);

const selectedPeriod = ref('mes');
const periods = [
  { value: 'semana',    label: 'Semana' },
  { value: 'mes',       label: 'Mês' },
  { value: 'bimestre',  label: 'Bimestre' },
  { value: 'trimestre', label: 'Trimestre' },
  { value: 'semestre',  label: 'Semestre' },
  { value: 'ano',       label: 'Ano' },
];

const filteredTransactions = computed(() => {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  switch (selectedPeriod.value) {
    case 'semana': {
      const dow = start.getDay();
      start.setDate(start.getDate() - (dow === 0 ? 6 : dow - 1));
      break;
    }
    case 'mes':
      start.setDate(1);
      break;
    case 'bimestre':
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      break;
    case 'trimestre':
      start.setMonth(start.getMonth() - 2);
      start.setDate(1);
      break;
    case 'semestre':
      start.setMonth(start.getMonth() - 5);
      start.setDate(1);
      break;
    case 'ano':
      start.setMonth(start.getMonth() - 11);
      start.setDate(1);
      break;
  }

  return transactions.value.filter(t => {
    const d = new Date(t.data.split('T')[0] + 'T12:00:00');
    return d >= start && d <= end;
  });
});

const emptyForm = () => ({
  descricao: '',
  valor: '',
  tipo: 'pagamento',
  metodo: 'Pix',
  data: new Date().toISOString().split('T')[0],
});

const form = ref(emptyForm());

const fetchTransactions = async () => {
  try {
    loading.value = true;
    const res = await FinanceiroService.getAll();
    transactions.value = res.data;
  } catch (e) {
    console.error('Erro ao buscar transações:', e);
  } finally {
    loading.value = false;
  }
};

const openModal = (t = null) => {
  if (t) {
    editingId.value = t.id;
    form.value = {
      descricao: t.descricao,
      valor: t.valor,
      tipo: t.tipo,
      metodo: t.metodo,
      data: t.data ? t.data.split('T')[0] : '',
    };
  } else {
    editingId.value = null;
    form.value = emptyForm();
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingId.value = null;
};

const handleSubmit = async () => {
  if (!form.value.descricao || !form.value.valor || !form.value.data) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }
  saving.value = true;
  try {
    const payload = { ...form.value, valor: parseFloat(form.value.valor) };
    if (editingId.value) {
      await FinanceiroService.update({ id: editingId.value, ...payload });
    } else {
      await FinanceiroService.create(payload);
    }
    closeModal();
    fetchTransactions();
  } catch (e) {
    alert('Erro ao salvar a transação.');
    console.error(e);
  } finally {
    saving.value = false;
  }
};

const deleteTransaction = async (t) => {
  if (!confirm(`Deseja excluir a transação "${t.descricao}"?`)) return;
  try {
    await FinanceiroService.delete(t.id);
    fetchTransactions();
  } catch (e) {
    alert('Erro ao excluir a transação.');
    console.error(e);
  }
};

const totalReceitas = computed(() =>
  filteredTransactions.value
    .filter(t => t.tipo !== 'despesa')
    .reduce((sum, t) => sum + Number(t.valor), 0)
);
const totalDespesas = computed(() =>
  filteredTransactions.value
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + Number(t.valor), 0)
);
const saldo = computed(() => totalReceitas.value - totalDespesas.value);

const dateRangeLabel = computed(() => {
  if (!transactions.value.length) return '';
  const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const dates = transactions.value.map(t => new Date(t.data + (t.data.includes('T') ? '' : 'T12:00:00')));
  const min = new Date(Math.min(...dates));
  const max = new Date(Math.max(...dates));
  if (min.getMonth() === max.getMonth() && min.getFullYear() === max.getFullYear()) {
    return `${months[min.getMonth()]} ${min.getFullYear()}`;
  }
  return `${months[min.getMonth()]} – ${months[max.getMonth()]} ${max.getFullYear()}`;
});

const chartData = computed(() => {
  const monthMap = {};
  const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  filteredTransactions.value.forEach(t => {
    const d = new Date(t.data.split('T')[0] + 'T12:00:00');
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = `${MONTHS[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`;
    if (!monthMap[key]) monthMap[key] = { label, income: 0, expense: 0 };
    if (t.tipo === 'despesa') monthMap[key].expense += Number(t.valor);
    else monthMap[key].income += Number(t.valor);
  });
  const sorted = Object.keys(monthMap).sort();
  return {
    labels: sorted.map(k => monthMap[k].label),
    datasets: [
      { label: 'Receitas', backgroundColor: '#deb887', data: sorted.map(k => monthMap[k].income), borderRadius: 5 },
      { label: 'Despesas', backgroundColor: '#c0736e', data: sorted.map(k => monthMap[k].expense), borderRadius: 5 },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0a0a0a',
      titleFont: { family: 'Playfair Display' },
      borderColor: '#deb887',
      borderWidth: 1,
      callbacks: {
        label: (ctx) => ` R$ ${Number(ctx.raw).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      },
    },
  },
  scales: {
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: 'rgba(255, 255, 255, 0.5)', callback: (v) => 'R$ ' + Number(v).toLocaleString('pt-BR') },
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255, 255, 255, 0.5)' },
    },
  },
};

const formatCurrency = (value) =>
  Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (dateString) => {
  if (!dateString) return '';
  const normalized = dateString.includes('T') ? dateString : dateString + 'T12:00:00';
  return new Date(normalized).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

onMounted(fetchTransactions);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap');

.financeiro-page { font-family: 'Poppins', sans-serif; color: var(--color-white); }

.page-title {
  font-family: 'Playfair Display', serif;
  color: var(--color-pink);
  font-style: italic;
}

.date-range-display {
  color: var(--color-tan-text);
  font-size: 13px;
  border: 1px solid var(--color-gold-border);
  padding: 6px 14px;
  border-radius: 20px;
}

.finance-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-gold-border-light);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
}
.card-header-luxury { color: var(--color-gold); font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }
.card-value-luxury { font-family: 'Playfair Display', serif; font-size: 40px; color: var(--color-pink); }
.card-sub-luxury { color: rgba(222, 184, 135, 0.45); font-size: 12px; margin-top: 8px; }
.expense-text { color: var(--color-primary); }

.chart-container-luxury, .transactions-container {
  background: var(--color-bg-card);
  border: 1px solid var(--color-gold-border-subtle);
  padding: 40px;
  border-radius: 15px;
}
.chart-wrapper { height: 350px; }
.section-title-luxury { font-family: 'Playfair Display', serif; color: var(--color-pink); font-style: italic; font-size: 24px; }
.legend-item { font-size: 12px; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 8px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.income-dot { background: var(--color-gold); }
.expense-dot { background: var(--color-primary-chart); }

.custom-finance-table { margin-bottom: 0; }
.custom-finance-table th { color: var(--color-gold); border-bottom: 1px solid var(--color-gold-border); padding: 15px; font-size: 12px; text-transform: uppercase; }
.custom-finance-table td { padding: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); font-size: 14px; vertical-align: middle; }
.text-gold { color: var(--color-gold); }
.text-expense { color: var(--color-primary); }

.method-badge {
  font-size: 12px;
  color: var(--color-gold-border-loud);
  border: 1px solid var(--color-gold-border);
  padding: 3px 10px;
  border-radius: 20px;
}

.btn-add-luxury {
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));
  border: none;
  color: var(--color-white);
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.btn-add-luxury:hover { opacity: 0.85; }

.btn-icon-luxury {
  background: transparent;
  border: 1px solid var(--color-gold-border-medium);
  color: var(--color-tan-text);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
}
.btn-icon-luxury:hover { border-color: var(--color-gold); color: var(--color-gold); }
.btn-icon-delete { border-color: var(--color-danger) !important; color: var(--color-danger) !important; }
.btn-icon-delete:hover { background: var(--color-danger); color: var(--color-white) !important; }

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: var(--color-overlay-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
}
.modal-finance {
  width: 90%;
  max-width: 540px;
  border-radius: 15px;
  border: 1px solid var(--color-gold);
  overflow: hidden;
  background-color: var(--color-bg-card);
}
.modal-header-luxury {
  padding: 25px 30px;
  border-bottom: 1px solid var(--color-gold-border-medium);
  color: var(--color-gold);
  background-color: var(--color-bg-card);
}
.modal-title-luxury { font-family: 'Playfair Display', serif; font-style: italic; font-size: 20px; margin: 0; }

.label-luxury { color: var(--color-gold); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; display: block; opacity: 0.8; }
.input-luxury {
  background: var(--color-bg-deep);
  border: 1px solid var(--color-gold-border-medium);
  color: var(--color-white);
  width: 100%;
  padding: 10px;
  border-radius: 5px;
}
.input-luxury:focus { outline: none; border-color: var(--color-gold); }
.input-luxury option { background: var(--color-bg-card); color: var(--color-white); }

.btn-cancel-luxury { background: transparent; border: 1px solid var(--color-primary); color: var(--color-primary); padding: 10px 24px; border-radius: 5px; transition: 0.3s; cursor: pointer; }
.btn-cancel-luxury:hover { background: var(--color-primary); color: var(--color-bg-card); }
.btn-save-luxury { background: transparent; border: 1px solid var(--color-gold); color: var(--color-gold); padding: 10px 24px; border-radius: 5px; font-weight: 600; transition: 0.3s; cursor: pointer; }
.btn-save-luxury:hover:not(:disabled) { background: var(--color-gold); color: var(--color-bg-card); }
.btn-save-luxury:disabled { opacity: 0.5; cursor: not-allowed; }

.period-filter {
  display: flex;
  gap: 4px;
  background: var(--color-tan-bg-faint);
  border: 1px solid var(--color-gold-border-light);
  border-radius: 10px;
  padding: 4px;
  flex-wrap: wrap;
}
.period-btn {
  background: transparent;
  border: none;
  color: var(--color-tan-text-muted);
  padding: 6px 14px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Poppins', sans-serif;
}
.period-btn:hover { color: var(--color-gold); }
.period-btn.active { background: var(--color-tan-bg-active); color: var(--color-gold); }

.close-button {
  background: transparent;
  border: 1px solid var(--color-gold-border-medium);
  border-radius: 8px;
  width: 40px; height: 40px;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  gap: 6px; cursor: pointer; padding: 8px;
  transition: border-color 0.3s;
}
.close-button:hover { border-color: var(--color-gold); }
.close-button .line { display: block; height: 2px; width: 100%; background-color: var(--color-gold); border-radius: 2px; transition: all 0.3s ease; transform-origin: center; }
.close-button.is-active .line-1 { transform: translateY(8px) rotate(45deg); }
.close-button.is-active .line-2 { opacity: 0; transform: scaleX(0); }
.close-button.is-active .line-3 { transform: translateY(-8px) rotate(-45deg); }
</style>