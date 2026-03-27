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
    <!-- <div class="row g-4 mb-5">
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
    </div> -->

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="chart-card shadow-lg">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="section-title-luxury m-0">Performance de Atendimentos</h3>
            <div class="chart-period">30 dias anteriores e 30 dias futuros</div>
          </div>
          <div class="chart-wrapper">
            <div v-if="chartLoading" class="text-center py-5">
              <div class="spinner-border text-warning" role="status"></div>
              <p class="mt-2 text-muted-luxury">Carregando gráfico...</p>
            </div>
            <Line v-else :data="performanceData" :options="performanceOptions" />
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="appointments-card shadow-lg">
          <h3 class="section-title-luxury mb-4">Próximos Atendimentos</h3>
          <div class="appointment-list custom-scrollbar">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border spinner-border-sm text-warning" role="status"></div>
              <p class="mt-2 text-muted-luxury">Carregando...</p>
            </div>
            <div v-else-if="nextAppointments.length === 0" class="text-center py-4">
              <p class="text-muted-luxury">Nenhum atendimento agendado.</p>
            </div>
            <div v-else v-for="appt in nextAppointments" :key="appt.id" class="appointment-item">
              <div class="appt-time">
                <div>{{ appt.date }}</div>
                <div>{{ appt.time }}</div>
              </div>
              <div class="appt-info">
                <div class="appt-name">{{ appt.name }}</div>
                <div class="appt-service">{{ appt.service }}</div>
              </div>
              <div class="appt-status-dot"></div>
            </div>
          </div>
          <button @click="goToCalendar" class="btn-view-all mt-4">Ver Agenda Completa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Line } from 'vue-chartjs';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, 
  PointElement, CategoryScale, LinearScale, Filler 
} from 'chart.js';
import CalendarService from '@/services/calendarService';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler);

const router = useRouter();

const goToCalendar = () => {
  router.push({ name: 'CalendarPage' });
};

const currentFormattedDate = computed(() => {
  return new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
});

// Configuração do Gráfico
const performanceData = ref({
  labels: [],
  datasets: [{
    label: 'Atendimentos',
    data: [],
    borderColor: '#deb887',
    backgroundColor: (context) => {
      const chart = context.chart;
      const {ctx, chartArea} = chart;
      if (!chartArea) return null;
      const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, 'rgba(222, 184, 135, 0)');
      gradient.addColorStop(1, 'rgba(222, 184, 135, 0.2)');
      return gradient;
    },
    fill: true,
    tension: 0.4,
    pointRadius: 4,
    pointBackgroundColor: '#deb887',
    pointBorderColor: '#121212',
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
      backgroundColor: '#121212',
      titleFont: { family: 'Playfair Display' },
      borderColor: '#deb887',
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
      ticks: {
        font: (ctx) => ({
          size: ctx.tick?.label === 'Hoje' ? 11 : 10,
          weight: ctx.tick?.label === 'Hoje' ? 'bold' : 'normal'
        }),
        color: (ctx) => ctx.tick?.label === 'Hoje' ? '#f6aeb8' : 'rgba(255, 255, 255, 0.4)'
      }
    }
  }
};

const nextAppointments = ref([]);
const loading = ref(false);
const chartLoading = ref(true);

const formatTime = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'Hoje';
  if (date.toDateString() === tomorrow.toDateString()) return 'Amanhã';
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
};

const fetchNextAppointments = async () => {
  loading.value = true;
  try {
    const response = await CalendarService.getAll();
    const now = new Date();
    
    const futureAppointments = response.data
      .filter(appt => new Date(appt.dataInicio) >= now)
      .sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
      .slice(0, 5)
      .map(appt => ({
        id: appt.id,
        date: formatDate(appt.dataInicio),
        time: formatTime(appt.dataInicio),
        name: appt.nomeCliente,
        service: appt.procedimento
      }));
    
    nextAppointments.value = futureAppointments;
  } catch (error) {
    console.error("Erro ao buscar próximos atendimentos:", error);
  } finally {
    loading.value = false;
  }
};

const fetchPerformanceData = async () => {
  chartLoading.value = true;
  try {
    const response = await CalendarService.getAll();

    const daysMap = {};
    const labels = [];

    for (let i = -30; i <= 30; i++) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      const dayLabel = i === 0 ? 'Hoje' : `${date.getDate()}/${date.getMonth() + 1}`;
      daysMap[dateKey] = 0;
      labels.push(dayLabel);
    }
    
    response.data.forEach(appt => {
      const apptDate = new Date(appt.dataInicio);
      const apptDateKey = apptDate.toISOString().split('T')[0];
      if (daysMap[apptDateKey] !== undefined) {
        daysMap[apptDateKey]++;
      }
    });
    
    const data = Object.values(daysMap);
    performanceData.value.labels = labels;
    performanceData.value.datasets[0].data = data;
  } catch (error) {
    console.error("Erro ao buscar performance:", error);
  } finally {
    chartLoading.value = false;
  }
};

onMounted(() => {
  fetchNextAppointments();
  fetchPerformanceData();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap' );

.dashboard-home { 
  font-family: 'Poppins', sans-serif; 
  color: var(--color-white); 
  overflow-x: hidden;
  max-width: 100%;
}

.page-title {
  font-family: "Playfair Display", serif;
  color: var(--color-pink);
  font-style: italic;
}

.text-muted-luxury { color: var(--color-text-muted); font-size: 14px; }

.current-date-badge {
  background: var(--color-gold-border-subtle);
  border: 1px solid var(--color-gold-border-medium);
  color: var(--color-gold);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 13px;
}

.kpi-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-tan-border-subtle);
  padding: 30px;
  border-radius: 15px;
  transition: transform 0.3s;
}
.kpi-card:hover { transform: translateY(-5px); border-color: var(--color-gold); }

.kpi-label { color: var(--color-gold); font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
.kpi-value { font-family: 'Playfair Display', serif; font-size: 42px; color: var(--color-pink); margin-bottom: 5px; }
.kpi-trend { font-size: 11px; font-weight: 600; }
.positive { color: var(--color-success-light); }
.neutral { color: var(--color-text-placeholder); }

.chart-card, .appointments-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-tan-border-subtle);
  padding: 35px;
  border-radius: 15px;
  height: 100%;
  box-sizing: border-box;
  max-width: 100%;
}

.chart-wrapper { 
  height: 300px; 
  width: 100%;
  max-width: 100%;
}
.section-title-luxury { font-family: 'Playfair Display', serif; color: var(--color-pink); font-style: italic; font-size: 22px; }
.chart-period { font-size: 12px; color: var(--color-text-placeholder); }

/* Appointment List */
.appointment-list { max-height: 320px; overflow-y: auto; padding-right: 10px; }
.appointment-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--color-border-faint);
  transition: 0.3s;
  border-left: 4px solid transparent;
}
.appointment-item:hover { 
  background: var(--color-gold-bg); 
  padding-left: 10px;
  border-left-color: var(--color-gold);
}

.appt-time { font-size: 11px; color: var(--color-gold); width: 70px; font-weight: 600; line-height: 1.6; }
.appt-info { flex-grow: 1; }
.appt-name { font-size: 15px; color: var(--color-text); font-weight: 500; }
.appt-service { font-size: 12px; color: var(--color-text-placeholder); }
.appt-status-dot { width: 8px; height: 8px; background: var(--color-gold); border-radius: 50%; box-shadow: 0 0 8px var(--color-gold); }

.btn-view-all {
  width: 100%;
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s;
}
.btn-view-all:hover { background: var(--color-gold); color: var(--color-bg-card); }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: 10px; }

@media (max-width: 768px) {
  .dashboard-home {
    padding: 0 10px;
  }
  
  header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .current-date-badge {
    padding: 6px 15px;
    font-size: 12px;
  }
  
  .chart-card, .appointments-card {
    padding: 20px;
  }
  
  .section-title-luxury {
    font-size: 18px;
  }
  
  .chart-wrapper {
    height: 250px;
  }
  
  .chart-period {
    font-size: 10px;
  }
  
  .appointment-item {
    padding: 12px 0;
  }
  
  .appt-time {
    width: 60px;
    font-size: 11px;
  }
  
  .appt-name {
    font-size: 14px;
  }
  
  .appt-service {
    font-size: 11px;
  }
  
  .btn-view-all {
    padding: 10px;
    font-size: 11px;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 1.3rem;
  }
  
  .chart-card, .appointments-card {
    padding: 15px;
  }
  
  .section-title-luxury {
    font-size: 16px;
  }
  
  .chart-wrapper {
    height: 200px;
  }
}
</style>
