<template>
  <div class="financeiro-page">
    <header class="d-flex justify-content-between align-items-center mb-5">
      <h1 class="page-title">Gestão Financeira</h1>
      <div class="date-range-display">Janeiro - Junho 2026</div>
    </header>

    <!-- Cards de Resumo -->
    <div class="row g-4 mb-5">
      <div class="col-md-6">
        <div class="finance-card income-card shadow-lg">
          <div class="card-header-luxury">Total Income</div>
          <div class="card-value-luxury">R$ 48.750</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="finance-card expense-card shadow-lg">
          <div class="card-header-luxury">Total Expenses</div>
          <div class="card-value-luxury expense-text">R$ 32.400</div>
        </div>
      </div>
    </div>

    <!-- Gráfico de Performance -->
    <div class="chart-container-luxury mb-5 shadow-lg">
      <div class="chart-header d-flex justify-content-between align-items-center mb-4">
        <h3 class="section-title-luxury m-0">Income vs. Expenses</h3>
        <div class="chart-legend d-flex gap-3">
          <span class="legend-item"><span class="dot income-dot"></span> Income</span>
          <span class="legend-item"><span class="dot expense-dot"></span> Expenses</span>
        </div>
      </div>
      <div class="chart-wrapper">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Tabela de Transações Recentes -->
    <div class="transactions-container shadow-lg">
      <h3 class="section-title-luxury mb-4">Recent Transactions</h3>
      <table class="table table-dark custom-finance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Method</th>
            <th class="text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transactions" :key="t.id">
            <td>{{ t.date }}</td>
            <td>{{ t.description }}</td>
            <td>
              <span class="method-badge">
                <i :class="t.icon" :style="{ color: t.iconColor }"></i> {{ t.method }}
              </span>
            </td>
            <td class="text-end fw-bold" :class="t.type === 'income' ? 'text-gold' : 'text-expense'">
              {{ t.type === 'income' ? '+' : '-' }} R$ {{ t.amount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botões de Ação -->
    <div class="d-flex justify-content-between mt-5">
      <button class="btn-outline-luxury">EXPORT PDF</button>
      <button class="btn-outline-luxury">EXPORT EXCEL</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#d4af37',
      data: [35, 55, 40, 38, 45, 50],
      borderRadius: 5,
    },
    {
      label: 'Expenses',
      backgroundColor: '#b35d5d',
      data: [25, 30, 28, 32, 20, 48],
      borderRadius: 5,
    }
  ]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0a0a0a',
      titleFont: { family: 'Playfair Display' },
      borderColor: '#d4af37',
      borderWidth: 1
    }
  },
  scales: {
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: 'rgba(255, 255, 255, 0.5)', callback: (value) => value + 'k' }
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255, 255, 255, 0.5)' }
    }
  }
};

const transactions = ref([
  { id: 1, date: '23 Jan', description: 'Payment Received', method: 'Pix', icon: 'fas fa-check-circle', iconColor: '#81c784', amount: '5.000', type: 'income' },
  { id: 2, date: '20 Jan', description: 'Product Purchase', method: 'Card', icon: 'fas fa-credit-card', iconColor: '#f9e4b7', amount: '2.800', type: 'expense' },
  { id: 3, date: '18 Jan', description: 'Clinic Supplies', method: 'Bank', icon: 'fas fa-university', iconColor: '#d67a7a', amount: '1.200', type: 'expense' },
  { id: 4, date: '15 Jan', description: 'Consultation Fee', method: 'Pix', icon: 'fas fa-check-circle', iconColor: '#81c784', amount: '600', type: 'income' },
]);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap' );

.financeiro-page { font-family: 'Poppins', sans-serif; color: white; }

.finance-card {
  background: #0a0a0a;
  border: 1px solid rgba(212, 165, 116, 0.2);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
}

.card-header-luxury { color: #d4af37; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }
.card-value-luxury { font-family: 'Playfair Display', serif; font-size: 48px; color: #f9e4b7; }
.expense-text { color: #d67a7a; }

.chart-container-luxury, .transactions-container {
  background: #0a0a0a;
  border: 1px solid rgba(212, 165, 116, 0.1);
  padding: 40px;
  border-radius: 15px;
}

.chart-wrapper { height: 350px; }

.section-title-luxury { font-family: 'Playfair Display', serif; color: #d4af37; font-style: italic; font-size: 24px; }

.legend-item { font-size: 12px; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 8px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.income-dot { background: #d4af37; }
.expense-dot { background: #b35d5d; }

.custom-finance-table { margin-bottom: 0; }
.custom-finance-table th { color: #d4af37; border-bottom: 1px solid rgba(212, 165, 116, 0.2); padding: 20px 15px; font-size: 12px; text-transform: uppercase; }
.custom-finance-table td { padding: 18px 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); font-size: 14px; }

.text-gold { color: #d4af37; }
.text-expense { color: #d67a7a; }

.btn-outline-luxury {
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 12px;
  letter-spacing: 1px;
  transition: 0.3s;
}
.btn-outline-luxury:hover { background: #d4af37; color: #000; }
</style>
