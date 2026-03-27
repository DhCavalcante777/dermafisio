<template>
  <div class="container-fluid background py-5" id="treatments">
    <div class="container">
      <p class="results-title text-center mb-5">Nossos Tratamentos</p>
      
      <div
        id="carouselExampleDark"
        class="carousel slide custom-carousel"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators custom-indicators">
          <button v-for="n in 6" :key="n-1"
            type="button"
            data-bs-target="#carouselExampleDark"
            :data-bs-slide-to="n-1"
            :class="{ active: n === 1 }"
            :aria-current="n === 1 ? 'true' : 'false'"
            :aria-label="'Slide ' + n"
          ></button>
        </div>

        <div class="carousel-inner rounded-4 shadow-lg">
          <div class="carousel-item active" data-bs-interval="3000">
            <img src="../assets/image/terapiaCapilarBlack.png" class="d-block w-100" alt="Terapia Capilar" />
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/image/tratamentoDeEstriasBlack.png" class="d-block w-100" alt="Tratamento de Estrias" />
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/image/tratamentosCorporaisBlack.png" class="d-block w-100" alt="Tratamentos Corporais" />
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/image/liftingDePapadaBlack.png" class="d-block w-100" alt="Lifting de Papada" />
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/image/tratamentosFaciaisBlack.png" class="d-block w-100" alt="Tratamentos Faciais" />
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="../assets/image/fisioterapiaPelvicaBlack.png" class="d-block w-100" alt="Fisioterapia Pélvica" />
          </div>
        </div>

        <button class="carousel-control-prev custom-control" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon custom-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next custom-control" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon custom-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: var(--color-bg-page);
  background-image:
    repeating-linear-gradient(87deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 2px),
    repeating-linear-gradient(168deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 2px);
  background-size: 6px 6px;
}

.results-title {
  color: var(--color-gold);
  font-family: "Great Vibes", cursive;
  font-size: 48px;
  margin: 0;
}

/* Estilização do Carrossel */
.custom-carousel {
  max-width: 500px;
  margin: 0 auto;
}

.carousel-inner {
  border: 1px solid var(--color-gold-border-medium);
}

/* Customização das Setas */
.custom-icon {
  filter: none !important; /* Remove o preto do carousel-dark */
  background-image: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control-prev-icon::before {
  content: '❮';
  color: var(--color-gold);
  font-size: 30px;
}

.carousel-control-next-icon::before {
  content: '❯';
  color: var(--color-gold);
  font-size: 30px;
}

/* Customização dos Indicadores (Bolinhas) */
.custom-indicators [data-bs-target] {
  background-color: var(--color-gold) !important;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 6px;
  opacity: 0.4;
  border: none;
}

.custom-indicators .active {
  opacity: 1;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .results-title {
    font-size: 36px;
  }
  .custom-carousel {
    max-width: 100%;
  }
}
</style>
