<template>
  <section class="container-fluid background py-5 line-bottom">
    <div class="container">
      <div class="row mb-5">
        <div
          class="col-12 text-center d-flex align-items-center justify-content-center gap-3"
        >
          <div class="ornament-line"></div>
          <h2 class="section-title">O que dizem nossos clientes</h2>
          <div class="ornament-line"></div>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-xl-6">
          <div class="row g-4">
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="col-md-4 text-center"
            >
              <div class="testimonial-card">
                <div class="avatar-container mb-3">
                  <img
                    :src="testimonial.image"
                    :alt="testimonial.name"
                    class="avatar-img"
                  />
                </div>
                <div class="stars mb-2">
                  <span v-for="s in 5" :key="s" class="star">★</span>
                </div>
                <p class="testimonial-text">"{{ testimonial.text }}"</p>
                <p class="testimonial-name">{{ testimonial.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 mt-5 mt-lg-0">
          <div class="specialist-container d-flex align-items-center">
            <div class="specialist-info pe-4">
              <h3 class="specialist-subtitle">Conheça nossa</h3>
              <h2 class="specialist-title">Especialista</h2>
              <div class="specialist-line mb-3"></div>
              <p class="specialist-name-tag">Dra. Suelen Coelho</p>
              <p class="specialist-role">Dermatofuncional</p>
              <p class="specialist-bio">
                Com anos de experiência, Dra. Suelen Coelho é especialista em
                tratamentos dedicados a oferecer os melhores resultados com
                cuidado e precisão.
              </p>
            </div>
            <div class="specialist-image-wrapper">
              <img
                src="../assets/image/suelen-perfil.png"
                alt="Dra. Suelen Coelho"
                class="specialist-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import clientImage1 from "../assets/image/persona/cliente2.png";
import clientImage2 from "../assets/image/persona/cliente3.png";
import clientImage3 from "../assets/image/persona/cliente1.png";

const testimonials = [
  {
    name: "Ana Carolina Soares",
    text: "Atendimento impecável! Profissionalismo, cuidado e atenção em cada detalhe.",
    image: clientImage1,
  },
  {
    name: "Cinthia Pimenta",
    text: "Atendimento excepcional! Você e sua equipe sempre de parabéns!",
    image: clientImage2,
  },
  {
    name: "Thayrine Lino",
    text: "Experiência maravilhosa, fiz um combo de procedimento para casamento e fiquei magrinha rsrs",
    image: clientImage3,
  },
];
</script>

<style scoped>
/* Background Texturizado Padrão */
.background {
  background-color: var(--color-bg-primary);
  background-image: var(--texture-subtle);
  background-size: var(--texture-size);
}

/* Título e Ornamentos */
.section-title {
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: 38px;
  margin: 0;
}

.ornament-line {
  height: 1px;
  width: 60px;
  background: var(--gradient-ornament);
}

/* Cards de Depoimentos */
.testimonial-card {
  padding: 15px;
  transition: var(--transition-base);
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.avatar-container {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: var(--radius-circle);
  border: 2px solid var(--color-gold);
  padding: 4px;
  background: var(--color-gold-bg-hover);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-circle);
}

.stars {
  color: var(--color-gold-mid);
  font-size: var(--font-size-md);
  letter-spacing: 2px;
}

.testimonial-text {
  color: var(--color-text-80);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-style: italic;
  line-height: 1.5;
  min-height: 60px;
}

.testimonial-name {
  color: var(--color-gold);
  font-family: var(--font-serif);
  font-weight: bold;
  font-size: var(--font-size-md);
  margin-top: 10px;
}

/* Seção Especialista */
.specialist-container {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: var(--radius-xl);
  padding: 35px;
  border: 1px solid rgba(222, 184, 135, 0.15);
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-md);
	
}

.specialist-image-wrapper {
	width: 350px;
  height: 350px;
  margin: 0 auto;
}

.specialist-info {
  flex: 1;
}

.specialist-subtitle {
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: 30px;
  margin: 0;
}

.specialist-title {
  color: var(--color-gold-mid);
  font-family: var(--font-serif);
  font-size: 40px;
  font-weight: 700;
  margin-top: -10px;
  line-height: 1;
}

.specialist-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, var(--color-gold), transparent);
}

.specialist-name-tag {
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--font-size-lg);
  margin-bottom: 2px;
}

.specialist-role {
  color: var(--color-gold);
  font-size: var(--font-size-sm);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.specialist-bio {
  color: var(--color-text-70);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  font-family: var(--font-body);
}

.specialist-img {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  object-fit: cover;
  box-shadow: 15px 15px 40px rgba(0, 0, 0, 0.6);
  border: 1px solid var(--color-gold-glow);
}

/* Responsividade */

@media (max-width: 1199px) {
  .specialist-container {
    flex-direction: column;
    text-align: center;
    padding: 25px;
  }
  .specialist-info {
    padding-right: 0 !important;
    margin-bottom: 25px;
  }
  .specialist-line {
    background: var(--gradient-ornament);
  }
  .specialist-img {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
  }
  .testimonial-card {
    margin-bottom: 30px;
  }
}

.line-bottom {
    border-bottom: 1px solid var(--color-gold);
}

@media (max-width: 576px) {
  .specialist-image-wrapper {
    margin: 0;
  }
}
</style>
