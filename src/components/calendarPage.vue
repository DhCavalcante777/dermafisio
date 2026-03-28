<template>
  <div class="agenda-page">
    <header class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="page-title">Agenda de Atendimentos</h1>
      <button @click="openNewAppointmentModal" class="btn-luxury-gold">
        <i class="fas fa-plus me-2"></i> Novo Agendamento
      </button>
    </header>

    <div class="calendar-card shadow-lg">
      <FullCalendar :options="calendarOptions" />
    </div>

    <!-- Modal de Agendamento -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content-luxury shadow-lg">
        <div class="modal-header-luxury d-flex justify-content-between align-items-center">
          <h2 class="modal-title-luxury">{{ isEditing ? 'Editar' : 'Novo' }} Agendamento</h2>
          <button class="close-button is-active" @click="showModal = false">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
          </button>
        </div>

        <div class="modal-body-luxury custom-scrollbar">
          <form @submit.prevent="saveAppointment">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="label-luxury">Nome da Cliente</label>
                <input v-model="form.nomeCliente" type="text" class="input-luxury" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="label-luxury">Telefone</label>
                <input v-model="telefoneDisplay" @input="handleTelefoneInput" type="tel" class="input-luxury" placeholder="(00) 00000-0000" maxlength="15" inputmode="numeric">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="label-luxury">Início</label>
                <input v-model="form.dataInicio" type="datetime-local" class="input-luxury" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="label-luxury">Fim</label>
                <input v-model="form.dataFim" type="datetime-local" class="input-luxury" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="label-luxury">Procedimento</label>
              <input v-model="form.procedimento" type="text" class="input-luxury" placeholder="Ex: Limpeza de Pele, Botox..." required>
            </div>
            <div class="mb-3">
              <label class="label-luxury">Observações</label>
              <textarea v-model="form.observacoes" class="input-luxury" rows="3" placeholder="Anotações sobre o atendimento..."></textarea>
            </div>
            <div class="mb-3">
              <label class="label-luxury">Status</label>
              <div class="status-selector">
                <button
                  v-for="opt in STATUS_OPTIONS"
                  :key="opt.value"
                  type="button"
                  class="status-btn"
                  :class="{ active: form.status === opt.value }"
                  :style="form.status === opt.value ? { background: opt.color, borderColor: opt.color, color: '#121212' } : { borderColor: opt.color, color: opt.color }"
                  @click="form.status = opt.value"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>
            <div class="modal-footer-luxury d-flex justify-content-between align-items-center gap-3">
              <button v-if="isEditing" type="button" @click="deleteAppointment" class="btn-delete-luxury">
                <i class="fas fa-trash me-1"></i> Excluir
              </button>
              <div class="d-flex gap-3 ms-auto">
                <button type="button" @click="showModal = false" class="btn-cancel-luxury">Cancelar</button>
                <button type="submit" class="btn-save-luxury">Salvar Agendamento</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarService from '@/services/calendarService';

const showModal = ref(false);
const isEditing = ref(false);
const telefoneDisplay = ref('');
const STATUS_OPTIONS = [
  { value: 'agendado',   label: 'Agendado',   color: '#d4a574' },
  { value: 'confirmado', label: 'Confirmado', color: '#4caf93' },
  { value: 'concluido',  label: 'Concluído',  color: '#7986cb' },
  { value: 'cancelado',  label: 'Cancelado',  color: '#e57373' },
];

const STATUS_COLORS = Object.fromEntries(STATUS_OPTIONS.map(s => [s.value, s.color]));

const form = reactive({
  id: null,
  nomeCliente: '',
  telefoneCliente: '',
  dataInicio: '',
  dataFim: '',
  procedimento: '',
  observacoes: '',
  status: 'agendado',
});

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  locale: 'pt-br',
  height: 630,
  slotMinTime: '01:00:00',
  slotMaxTime: '24:00:00',
  allDaySlot: false,
  events: [],
  eventColor: STATUS_COLORS['agendado'],
  eventClick: (info) => handleEventClick(info),
  editable: true,
  eventDrop: (info) => handleEventDrop(info),
});

const fetchEvents = async () => {
  try {
    const response = await CalendarService.getAll();
    calendarOptions.events = response.data.map(event => ({
      id: event.id,
      title: `${event.nomeCliente} - ${event.procedimento}`,
      start: event.dataInicio,
      end: event.dataFim,
      color: STATUS_COLORS[event.status] || STATUS_COLORS['agendado'],
      extendedProps: { ...event }
    }));
  } catch (error) {
    console.error("Erro ao buscar agenda:", error);
  }
};

const resetForm = () => {
  form.id = null;
  form.nomeCliente = '';
  form.telefoneCliente = '';
  form.dataInicio = '';
  form.dataFim = '';
  form.procedimento = '';
  form.observacoes = '';
  form.status = 'agendado';
};

const openNewAppointmentModal = () => {
  resetForm();
  telefoneDisplay.value = '';
  isEditing.value = false;
  showModal.value = true;
};

const formatDateForMySQL = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const formatDateForInput = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const formatTelefoneDisplay = (value) => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');
  if (digits.length > 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length > 0) return `(${digits}`;
  return '';
};

const handleTelefoneInput = (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 7) {
    telefoneDisplay.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  } else if (value.length > 2) {
    telefoneDisplay.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length > 0) {
    telefoneDisplay.value = `(${value}`;
  } else {
    telefoneDisplay.value = '';
  }

  form.telefoneCliente = value;
};

const handleEventClick = (info) => {
  const event = info.event.extendedProps;
  form.id = info.event.id;
  form.nomeCliente = event.nomeCliente;
  form.telefoneCliente = event.telefoneCliente || '';
  telefoneDisplay.value = formatTelefoneDisplay(event.telefoneCliente);
  form.dataInicio = formatDateForInput(event.dataInicio);
  form.dataFim = formatDateForInput(event.dataFim);
  form.procedimento = event.procedimento;
  form.observacoes = event.observacoes || '';
  form.status = event.status || 'agendado';
  isEditing.value = true;
  showModal.value = true;
};

const handleEventDrop = async (info) => {
  try {
    const event = info.event;
    const updatedEvent = {
      id: event.id,
      ...event.extendedProps,
      dataInicio: formatDateForMySQL(event.start),
      dataFim: event.end ? formatDateForMySQL(event.end) : formatDateForMySQL(event.start),
    };
    await CalendarService.update(updatedEvent);
    fetchEvents();
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    info.revert();
  }
};

const deleteAppointment = async () => {
  if (!confirm(`Deseja mesmo excluir o agendamento de "${form.nomeCliente}"?`)) return;
  try {
    await CalendarService.delete(form.id);
    showModal.value = false;
    resetForm();
    fetchEvents();
  } catch (error) {
    alert('Erro ao excluir agendamento.');
  }
};

const saveAppointment = async () => {
  try {
    const payload = {
      id: form.id,
      nomeCliente: form.nomeCliente,
      telefoneCliente: form.telefoneCliente,
      dataInicio: formatDateForMySQL(form.dataInicio),
      dataFim: formatDateForMySQL(form.dataFim),
      procedimento: form.procedimento,
      observacoes: form.observacoes,
      status: form.status,
    };

    if (isEditing.value) {
      await CalendarService.update(payload);
    } else {
      await CalendarService.create(payload);
    }
    showModal.value = false;
    resetForm();
    fetchEvents();
    alert("Agenda atualizada!");
  } catch (error) {
    alert("Erro ao salvar agendamento.");
  }
};

onMounted(fetchEvents);
</script>

<style scoped>
.agenda-page {
  overflow-x: hidden;
  max-width: 100%;
}

.page-title {
  font-family: "Playfair Display", serif;
  color: var(--color-pink);
  font-style: italic;
}

.calendar-card {
  background: var(--color-bg-card);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid var(--color-tan-border-subtle);
  color: var(--color-gold-pale);
  overflow-x: auto;
  max-width: 100%;
}

:deep(.fc) {
  --fc-border-color: var(--color-tan-border-subtle);
  --fc-today-bg-color: var(--color-tan-bg-faint);
  --fc-button-bg-color: transparent;
  --fc-button-border-color: var(--color-gold);
  --fc-button-hover-bg-color: var(--color-gold);
  --fc-button-active-bg-color: var(--color-gold);
  --fc-button-text-color: var(--color-gold);
}

:deep(.fc-toolbar-title) {
  font-family: 'Playfair Display', serif;
  color: var(--color-pink);
}

:deep(.fc-button) {
  color: var(--color-gold) !important;
}

:deep(.fc-button:hover),
:deep(.fc-button-active) {
  color: var(--color-bg-card) !important;
}

:deep(.fc-timegrid-slot) {
  height: 50px !important;
}

:deep(.fc-col-header-cell-cushion), :deep(.fc-timegrid-slot-label-cushion) {
  color: var(--color-gold);
  text-decoration: none;
}

:deep(.fc-daygrid-day-number) {
  color: var(--color-gold);
  text-decoration: none;
}

.btn-luxury-gold {
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));
  color: var(--color-white);
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-luxury-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--color-primary-glow-strong);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-overlay-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
}

.modal-content-luxury {
  background-size: 6px 6px;
  width: 95%;
  max-width: 550px;
  max-height: 90vh;
  border-radius: 15px;
  border: 1px solid var(--color-gold-bright);
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header-luxury {
  padding: 25px 30px;
  border-bottom: 2px solid var(--color-gold);
  color: var(--color-gold);
}

.modal-title-luxury {
  font-family: 'Playfair Display', serif;
  color: var(--color-gold);
  margin: 0;
  font-size: 1.5rem;
}

.modal-body-luxury {
  padding: 30px;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer-luxury {
  padding: 20px 0 0;
  border-top: 2px solid var(--color-gold);
  margin-top: 20px;
}

.modal-content-luxury,
.modal-header-luxury,
.modal-footer-luxury {
  background-color: var(--color-bg-page);
  background-image:
    repeating-linear-gradient(
      87deg,
      var(--color-pattern-light) 0px,
      var(--color-pattern-light) 1px,
      transparent 1px,
      transparent 2px
    ),
    repeating-linear-gradient(
      168deg,
      var(--color-pattern-dark) 0px,
      var(--color-pattern-dark) 1px,
      transparent 1px,
      transparent 2px
    );
}

.label-luxury {
  color: var(--color-gold);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
  display: block;
  opacity: 0.8;
}

.input-luxury {
  background: var(--color-bg-input);
  border: 1px solid var(--color-tan-border-medium);
  color: var(--color-white);
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.btn-cancel-luxury {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 10px 30px;
  border-radius: 5px;
  transition: 0.3s;
}

.btn-cancel-luxury:hover {
  background: var(--color-primary);
  color: var(--color-bg-card);
}

.btn-save-luxury {
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-save-luxury:hover:not(:disabled) {
  background: var(--color-gold);
  color: var(--color-bg-card);
}

.btn-delete-luxury {
  background: transparent;
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
}

.btn-delete-luxury:hover {
  background: var(--color-danger);
  color: var(--color-white);
}

.close-button {
  background: transparent;
  border: 1px solid var(--color-gold-border-medium);
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
  border-color: var(--color-gold);
}

.close-button .line {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--color-gold);
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

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--color-bg-input);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-gold);
  border-radius: 10px;
}

.status-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.status-btn {
  background: transparent;
  border: 1px solid;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.status-btn:hover {
  opacity: 0.85;
}

@media (max-width: 768px) {
  .agenda-page {
    padding: 0;
    overflow-x: hidden;
  }

  header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .page-title {
    font-size: 1.3rem;
  }

  .btn-luxury-gold {
    padding: 10px 20px;
    font-size: 13px;
    width: 100%;
  }

  .calendar-card {
    padding: 10px;
    border-radius: 10px;
  }

  :deep(.fc-toolbar) {
    gap: 10px;
  }

  :deep(.fc-toolbar-title) {
    font-size: 1rem !important;
  }

  :deep(.fc-button) {
    padding: 6px 10px !important;
    font-size: 11px !important;
  }

  :deep(.fc-button-group) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  :deep(.fc-timegrid-slot-label) {
    font-size: 10px;
  }

  :deep(.fc-event-title) {
    font-size: 10px;
  }

  :deep(.fc-col-header-cell-cushion) {
    font-size: 11px;
  }

  .modal-content-luxury {
    width: 95%;
    max-width: 100%;
    margin: 10px;
    max-height: 95vh;
  }

  .modal-header-luxury {
    padding: 15px 20px;
  }

  .modal-title-luxury {
    font-size: 1.2rem;
  }

  .modal-body-luxury {
    padding: 20px;
  }

  .label-luxury {
    font-size: 10px;
  }

  .input-luxury {
    padding: 8px;
    font-size: 14px;
  }

  .modal-footer-luxury {
    flex-direction: column;
    gap: 10px;
  }

  .modal-footer-luxury {
    flex-direction: column;
  }

  .modal-footer-luxury .ms-auto {
    width: 100%;
    flex-direction: column;
    margin-left: 0 !important;
  }

  .btn-cancel-luxury,
  .btn-save-luxury,
  .btn-delete-luxury {
    padding: 10px 20px;
    font-size: 13px;
    width: 100%;
    text-align: center;
  }

  .close-button {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 1.1rem;
  }

  :deep(.fc-toolbar-title) {
    font-size: 0.9rem !important;
  }

  :deep(.fc-button) {
    padding: 5px 8px !important;
    font-size: 10px !important;
  }

  .calendar-card {
    padding: 8px;
  }
}

/* Tablet em pé (portrait): prev/next/today abaixo do month/week/day */
@media (min-width: 577px) and (max-width: 1024px) and (orientation: portrait) {
  :deep(.fc-toolbar.fc-header-toolbar) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  /* Título ocupa toda a largura primeiro */
  :deep(.fc-toolbar.fc-header-toolbar .fc-toolbar-chunk:nth-child(2)) {
    order: 1;
    width: 100%;
    text-align: center;
  }

  /* Botões month/week/day vêm em segundo */
  :deep(.fc-toolbar.fc-header-toolbar .fc-toolbar-chunk:nth-child(3)) {
    order: 2;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /* Botões prev/next/today por último, embaixo */
  :deep(.fc-toolbar.fc-header-toolbar .fc-toolbar-chunk:nth-child(1)) {
    order: 3;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
