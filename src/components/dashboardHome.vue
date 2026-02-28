<template>
  <div class="dashboard-home">
    <header class="d-flex justify-content-between align-items-center mb-5">
      <div class="welcome-section">
        <h1 class="page-title m-0">Bem-vinda, Dra. Suelen</h1>
        <p class="text-muted-luxury">Aqui está o resumo da sua clínica hoje.</p>
      </div>
      <div class="current-date-badge">
        <i class="far fa-calendar-alt me-2"></i> {{ currentFormattedDate }}
      </div>
    </header>

    <!-- Linha de KPIs de Luxo -->
    <div class="row g-4 mb-5">
      <div class="col-md-4">
        <div class="kpi-card shadow-lg">
          <div class="kpi-label">Monthly Revenue</div>
          <div class="kpi-value">$78,450</div>
          <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +12% este mês</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="kpi-card shadow-lg">
          <div class="kpi-label">New Clients</div>
          <div class="kpi-value">126</div>
          <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +5% esta semana</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="kpi-card shadow-lg">
          <div class="kpi-label">Retention Rate</div>
          <div class="kpi-value">89%</div>
          <div class="kpi-trend neutral">Meta: 90%</div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Gráfico de Performance (Neon Gold) -->
      <div class="col-lg-8">
        <div class="chart-card shadow-lg">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="section-title-luxury m-0">Performance de Atendimentos</h3>
            <div class="chart-period">Últimos 30 dias</div>
          </div>
          <div class="chart-wrapper">
            <Line :data="performanceData" :options="performanceOptions" />
          </div>
        </div>
      </div>

      <!-- Próximos Atendimentos -->
      <div class="col-lg-4">
        <div class="appointments-card shadow-lg">
          <h3 class="section-title-luxury mb-4">Next Appointments</h3>
          <div class="appointment-list custom-scrollbar">
            <div v-for="appt in nextAppointments" :key="appt.id" class="appointment-item">
              <div class="appt-time">{{ appt.time }}</div>
              <div class="appt-info">
                <div class="appt-name">{{ appt.name }}</div>
                <div class="appt-service">{{ appt.service }}</div>
              </div>
              <div class="appt-status-dot"></div>
            </div>
          </div>
          <button class="btn-view-all mt-4">Ver Agenda Completa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, 
  PointElement, CategoryScale, LinearScale, Filler 
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler);

const currentFormattedDate = computed(() => {
  return new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
});

// Configuração do Gráfico Neon Gold
const performanceData = ref({
  labels: ['1', '5', '10', '15', '20', '25', '30'],
  datasets: [{
    label: 'Atendimentos',
    data: [30, 45, 35, 60, 50, 75, 70],
    borderColor: '#d4af37',
    backgroundColor: (context) => {
      const chart = context.chart;
      const {ctx, chartArea} = chart;
      if (!chartArea) return null;
      const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, 'rgba(212, 165, 116, 0)');
      gradient.addColorStop(1, 'rgba(212, 165, 116, 0.2)');
      return gradient;
    },
    fill: true,
    tension: 0.4,
    pointRadius: 4,
    pointBackgroundColor: '#d4af37',
    pointBorderColor: '#050505',
    pointBorderWidth: 2,
    borderWidth: 3,
  }]
});

const performanceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0a0a0a',
      titleFont: { family: 'Playfair Display' },
      borderColor: '#d4af37',
      borderWidth: 1,
      displayColors: false
    }
  },
  scales: {
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { size: 10 } }
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { size: 10 } }
    }
  }
};

const nextAppointments = ref([
  { id: 1, time: '10:00 AM', name: 'Anna Rodrigues', service: 'Facial Treatment' },
  { id: 2, time: '01:30 PM', name: 'Lucas Almeida', service: 'Physiotherapy Session' },
  { id: 3, time: '03:00 PM', name: 'Mariana Costa', service: 'Laser Therapy' },
  { id: 4, time: '05:00 PM', name: 'Carla Mendes', service: 'Body Sculpting' },
  { id: 5, time: '06:30 PM', name: 'Beatriz Silva', service: 'Limpeza de Pele' },
]);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap' );

.dashboard-home { font-family: 'Poppins', sans-serif; color: white; }

.text-muted-luxury { color: rgba(255, 255, 255, 0.5); font-size: 14px; }

.current-date-badge {
  background: rgba(212, 165, 116, 0.1);
  border: 1px solid rgba(212, 165, 116, 0.3);
  color: #d4af37;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 13px;
}

/* KPI Cards */
.kpi-card {
  background: #0a0a0a;
  border: 1px solid rgba(212, 165, 116, 0.2);
  padding: 30px;
  border-radius: 15px;
  transition: transform 0.3s;
}
.kpi-card:hover { transform: translateY(-5px); border-color: #d4af37; }

.kpi-label { color: #d4af37; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
.kpi-value { font-family: 'Playfair Display', serif; font-size: 42px; color: #f9e4b7; margin-bottom: 5px; }
.kpi-trend { font-size: 11px; font-weight: 600; }
.positive { color: #81c784; }
.neutral { color: rgba(255, 255, 255, 0.4); }

/* Chart & Appointments Cards */
.chart-card, .appointments-card {
  background: #0a0a0a;
  border: 1px solid rgba(212, 165, 116, 0.1);
  padding: 35px;
  border-radius: 15px;
  height: 100%;
}

.chart-wrapper { height: 300px; }
.section-title-luxury { font-family: 'Playfair Display', serif; color: #d4af37; font-style: italic; font-size: 22px; }
.chart-period { font-size: 12px; color: rgba(255, 255, 255, 0.4); }

/* Appointment List */
.appointment-list { max-height: 320px; overflow-y: auto; padding-right: 10px; }
.appointment-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: 0.3s;
}
.appointment-item:hover { background: rgba(212, 165, 116, 0.03); padding-left: 10px; }

.appt-time { font-size: 12px; color: #d4af37; width: 80px; font-weight: 600; }
.appt-info { flex-grow: 1; }
.appt-name { font-size: 15px; color: #f9e4b7; font-weight: 500; }
.appt-service { font-size: 12px; color: rgba(255, 255, 255, 0.4); }
.appt-status-dot { width: 8px; height: 8px; background: #d4af37; border-radius: 50%; box-shadow: 0 0 8px #d4af37; }

.btn-view-all {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(212, 165, 116, 0.4);
  color: #d4af37;
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s;
}
.btn-view-all:hover { background: #d4af37; color: #000; }

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 165, 116, 0.3); border-radius: 10px; }
</style>
