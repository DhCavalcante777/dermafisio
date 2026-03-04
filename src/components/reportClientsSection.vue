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
import clientImage1 from "../assets/image/persona/cliente_etnia_negra.png";
import clientImage2 from "../assets/image/persona/cliente_etnia_asiatica.png";
import clientImage3 from "../assets/image/persona/cliente_etnia_indiana.png";

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
  background-color: #272427;
  background-image:
    repeating-linear-gradient(
      87deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 2px
    ),
    repeating-linear-gradient(
      168deg,
      rgba(0, 0, 0, 0.05) 0px,
      rgba(0, 0, 0, 0.05) 1px,
      transparent 1px,
      transparent 2px
    );
  background-size: 6px 6px;
}

/* Título e Ornamentos */
.section-title {
  color: burlywood;
  font-family: "Great Vibes", cursive;
  font-size: 38px;
  margin: 0;
}

.ornament-line {
  height: 1px;
  width: 60px;
  background: linear-gradient(to right, transparent, burlywood, transparent);
}

/* Cards de Depoimentos */
.testimonial-card {
  padding: 15px;
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.avatar-container {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  border: 2px solid burlywood;
  padding: 4px;
  background: rgba(222, 184, 135, 0.1);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.stars {
  color: #d4a574;
  font-size: 16px;
  letter-spacing: 2px;
}

.testimonial-text {
  color: rgba(255, 255, 255, 0.8);
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 1.5;
  min-height: 60px;
}

.testimonial-name {
  color: burlywood;
  font-family: "Playfair Display", serif;
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
}

/* Seção Especialista */
.specialist-container {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 35px;
  border: 1px solid rgba(222, 184, 135, 0.15);
  display: flex;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	
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
  color: burlywood;
  font-family: "Great Vibes", cursive;
  font-size: 30px;
  margin: 0;
}

.specialist-title {
  color: #d4a574;
  font-family: "Playfair Display", serif;
  font-size: 40px;
  font-weight: 700;
  margin-top: -10px;
  line-height: 1;
}

.specialist-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, burlywood, transparent);
}

.specialist-name-tag {
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 2px;
}

.specialist-role {
  color: burlywood;
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.specialist-bio {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
  font-family: "Poppins", sans-serif;
}

.specialist-img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 15px 15px 40px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(222, 184, 135, 0.2);
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
    background: linear-gradient(to right, transparent, burlywood, transparent);
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
    border-bottom: 1px solid burlywood;
}

@media (max-width: 576px) {
  .specialist-image-wrapper {
    margin: 0;
  }
}
</style>
