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
  // Adicione mais prêmios aqui...
];

const openModal = (award) => {
  selectedAward.value = award;
  document.body.style.overflow = 'hidden'; // Trava o scroll da página
};

const closeModal = () => {
  selectedAward.value = null;
  document.body.style.overflow = 'auto'; // Libera o scroll
};
</script>

<style scoped>
/* Background e Títulos (Mantendo o padrão) */
.background {
  background-color: #272427;
  background-image: repeating-linear-gradient(87deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 2px),
                    repeating-linear-gradient(168deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 2px);
  background-size: 6px 6px;
}

.section-title { color: burlywood; font-family: "Great Vibes", cursive; font-size: 38px; }
.ornament-line { height: 1px; width: 60px; background: linear-gradient(to right, transparent, burlywood, transparent); }

/* Lógica do Slider Infinito */
.slider-container {
  width: 100%;
  overflow: hidden;
	display: flex;
  /*padding: 40px 0;*/
  /*position: relative;*/
  /* Cria um efeito de desvanecimento nas bordas para ficar mais elegante */
  /*mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);*/
}

.slider-track {
  display: flex;
  /* A largura deve ser automática para caber todos os itens duplicados */
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
    /* O segredo: movemos exatamente METADE da largura total do track */
    /* Como duplicamos a lista no v-for, a metade é onde a lista se repete */
    transform: translateX(-33.33%);
  }
}

.award-slide {
  /* Defina uma largura fixa para cada item para facilitar o cálculo */
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

.award-label { color: burlywood; margin-top: 10px; font-family: "Playfair Display", serif; }

/* Estilo do Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.modal-content-custom {
  background: #272427;
  border: 1px solid burlywood;
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  width: 90%;
  position: relative;
  box-shadow: 0 0 50px rgba(222, 184, 135, 0.2);
}

.close-btn {
  position: absolute; top: 15px; right: 20px;
  background: none; border: none; color: burlywood;
  font-size: 35px; cursor: pointer;
}

.modal-img { width: 100%; max-width: 250px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); }
.modal-title { color: #d4a574; font-family: "Playfair Display", serif; font-size: 32px; }
.modal-year { color: burlywood; opacity: 0.7; }
.modal-line { height: 2px; background: linear-gradient(to right, burlywood, transparent); }
.modal-description { color: rgba(255, 255, 255, 0.8); line-height: 1.6; font-family: "Poppins", sans-serif; }

/* Animação do Modal */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
