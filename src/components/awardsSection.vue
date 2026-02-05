<template>
  <section class="container-fluid background py-5 line-bottom">
    <div class="container">
      <!-- Título da Seção -->
      <div class="row mb-5">
        <div class="col-12 text-center d-flex align-items-center justify-content-center gap-3">
          <div class="ornament-line"></div>
          <h2 class="section-title">Reconhecimento e Excelência</h2>
          <div class="ornament-line"></div>
        </div>
        <p class="section-subtitle text-center">Nossa dedicação à estética avançada premiada pelos maiores órgãos do setor.</p>
      </div>

      <!-- Galeria de Selos -->
      <div class="row justify-content-center g-4">
        <div v-for="(award, index) in awards" :key="index" class="col-6 col-md-4 col-lg-3 text-center">
          <div class="award-card">
            <div class="award-image-wrapper">
              <img :src="award.image" :alt="award.title" class="award-img">
              <div class="award-glow"></div>
            </div>
            <h3 class="award-title">{{ award.title }}</h3>
            <p class="award-year">{{ award.year }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import seloRubi from '../assets/image/seloRubiDeitado.png'
import seloDiamanteLaranja from '../assets/image/seloDiamanteLaranja.png'

const awards = [
  { 
    title: 'Categoria Rubi', 
    year: '2024', 
    image: seloRubi 
  },

  { 
    title: 'Excelência em Estética', 
    year: '2023', 
    image: seloDiamanteLaranja 
  }
];
</script>

<style scoped>
/* Background Texturizado Padrão */
.background {
  background-color: #272427;
  background-image:
    repeating-linear-gradient(87deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 2px),
    repeating-linear-gradient(168deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 2px);
  background-size: 6px 6px;
}

.section-title {
  color: burlywood;
  font-family: "Great Vibes", cursive;
  font-size: 38px;
  margin: 0;
}

.section-subtitle {
  color: rgba(222, 184, 135, 0.7);
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  margin-top: 10px;
}

.ornament-line {
  height: 1px;
  width: 60px;
  background: linear-gradient(to right, transparent, burlywood, transparent);
}

/* Cards de Prêmios */
.award-card {
  padding: 20px;
  transition: all 0.4s ease;
}

.award-image-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.award-img {
  width: 100%;
  max-width: 200px;
  height: auto;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.5));
  transition: transform 0.4s ease;
  z-index: 2;
  position: relative;
}

.award-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.award-card:hover .award-img {
  transform: scale(1.1) translateY(-10px);
}

.award-card:hover .award-glow {
  opacity: 1;
}

.award-title {
  color: #d4a574;
  font-family: "Playfair Display", serif;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.award-year {
  color: burlywood;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .section-title { font-size: 30px; }
  .award-img { max-width: 150px; }
}

.line-bottom {
		border-bottom: 1px solid burlywood;
}
</style>
