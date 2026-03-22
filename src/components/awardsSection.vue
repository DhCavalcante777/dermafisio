<template>
  <section class="container-fluid background py-5 overflow-hidden">
    <div class="container">
      <div class="row mb-5">
        <div class="col-12 text-center d-flex align-items-center justify-content-center gap-3">
          <div class="ornament-line"></div>
          <h2 class="section-title">Reconhecimento e Excelência</h2>
          <div class="ornament-line"></div>
        </div>
      </div>

      <div class="slider-container">
        <div class="slider-track">
          <!-- Duplicamos a lista para criar o efeito infinito -->
          <div v-for="(award, index) in [...awards, ...awards, ...awards]" :key="index" 
               class="award-slide" @click="openModal(award)">
            <div class="award-card">
              <img :src="award.image" :alt="award.title" class="award-img">
              <p class="award-label">{{ award.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <Transition name="fade">
      <div v-if="selectedAward" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content-custom">
          <button class="close-btn" @click="closeModal">&times;</button>
          <div class="row align-items-center">
            <div class="col-md-5 text-center">
              <img :src="selectedAward.image" :alt="selectedAward.title" class="modal-img">
            </div>
            <div class="col-md-7">
              <h3 class="modal-title">{{ selectedAward.title }}</h3>
              <p class="modal-year">{{ selectedAward.year }}</p>
              <div class="modal-line mb-3"></div>
              <p class="modal-description">{{ selectedAward.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import seloEsmeralda from '../assets/image/seloEsmeralda.png'
import seloRubi from '../assets/image/seloRubiDeitado.png'
import seloDiamanteLaranja from '../assets/image/seloDiamanteLaranja.png'

const selectedAward = ref(null);

const awards = [
  { 
    title: 'Categoria Rubi', 
    year: '2024', 
    image: seloRubi,
    description: 'Reconhecimento máximo pela excelência em procedimentos dermatofuncionais e satisfação dos clientes no ano de 2024.'
  },
  { 
    title: 'Excelência em Estética', 
    year: '2023', 
    image: seloDiamanteLaranja,
    description: 'Prêmio concedido às clínicas que mantêm os mais altos padrões de tecnologia e atendimento personalizado.'
  },
  {
    title: 'Categoria Esmeralda', 
    year: '2025', 
    image: seloEsmeralda,
    description: 'Certificação que atesta a qualidade dos serviços e a satisfação dos clientes, baseada em avaliações rigorosas.'
  }
];

const openModal = (award) => {
  selectedAward.value = award;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedAward.value = null;
  document.body.style.overflow = 'auto';
};
</script>

<style scoped>
.background {
  background-color: var(--color-bg-primary);
  background-image: var(--texture-subtle);
  background-size: var(--texture-size);
}

.section-title { color: var(--color-gold); font-family: var(--font-display); font-size: 38px; }
.ornament-line { height: 1px; width: 60px; background: var(--gradient-ornament); }

.slider-container {
  width: 100%;
  overflow: hidden;
	display: flex;
}

.slider-track {
  display: flex;
  width: max-content; 
  animation: scroll 10s linear infinite;
}

.slider-track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
}

.award-slide {
  width: 350px; 
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.award-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.award-card:hover { transform: scale(1.1); }

.award-img {
  width: 100%;
  max-width: 160px;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.5));
}

.award-label { color: var(--color-gold); margin-top: 10px; font-family: var(--font-serif); }

.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.modal-content-custom {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-gold);
  border-radius: var(--radius-xl);
  padding: 40px;
  max-width: 800px;
  width: 90%;
  position: relative;
  box-shadow: var(--shadow-gold-glow-lg);
}

.close-btn {
  position: absolute; top: 15px; right: 20px;
  background: none; border: none; color: var(--color-gold);
  font-size: 35px; cursor: pointer;
}

.modal-img { width: 100%; max-width: 250px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); }
.modal-title { color: var(--color-gold-mid); font-family: var(--font-serif); font-size: var(--font-size-3xl); }
.modal-year { color: var(--color-gold); opacity: 0.7; }
.modal-line { height: 2px; background: linear-gradient(to right, var(--color-gold), transparent); }
.modal-description { color: var(--color-text-80); line-height: 1.6; font-family: var(--font-body); }

/* Animação do Modal */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
