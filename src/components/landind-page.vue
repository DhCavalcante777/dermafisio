<template>
  <div class="container-fluid px-0">
    <div class="firts-container background-image">
      <div class="home">
        <p class="description">Bem vindo a</p>
        <img class="logo" src="../assets/image/logo.png" alt="Logo" />
        <button type="button" class="primary-button" onclick="window.location.href='#treatments'">
          Conheça nossos serviços
        </button>
      </div>
    </div>
    <div class="second-container">
      <div class="about-us">
        <div class="body-about-us">
          <p class="title-about-us">DermaFisio</p>
          <p class="description-about-us">
            A DermaFisio é uma clínica de estética e fisioterapia que oferece
            tratamentos personalizados para atender às necessidades de cada
            paciente.
          </p>
        </div>
      </div>
    </div>
    <img class="separation" src="../assets/image/separation.png" alt="bolas" />
    <div class="third-container">
      <p class="reference-title">Referência em excelência</p>
      <div class="depoimento">
        <img src="../assets/image/campoDeTextoMobile.png" alt="" class="field-text" />
        <div class="depoimento-text">
          <p>Fomos acreditados pela ANCEC devido ao alto padrão dos nossos tratamentos.</p>
          <p>Os resultados comprovam nossa qualidade</p>
        </div>
      </div>
      <img class="depoimento-img" src="../assets/image/suelen-depoimento.png" alt="suelen" />
      <p class="title-premios">
        Selo Referência Nacional
      </p>
      <div class="premios">
        <img class="selo-rubi" src="../assets/image/seloRubiDeitado.png" alt="">
        <img class="selo-diamante" src="../assets/image/seloDiamanteLaranja.png" alt="">
      </div>
    </div>
    <div class="fourth-container" id="treatments">
      <p class="results-title">
        Nossos tratamentos
      </p>
      <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="2000">
            <img src="../assets/image/terapiaCapilar.png" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="../assets/image/tratamentoDeEstrias.png" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="../assets/image/tratamentosCorporais.png" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="../assets/image/liftingDePapada.png" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="../assets/image/tratamentosFaciais.png" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="../assets/image/fisioterapiaPelvica.png" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="fifth-container">
      <div class="field-contact">
        <p class="title-contact">Descubra o poder da transformação!</p>
        <p class="description-contact">Revitalize seu cabelo, diminua marcas indesejadas, e realce sua beleza natural.</p>
        <p class="description-contact">Cuide da sua pele e do seu corpo com tratamentos que promovem firmeza e aumentam sua autoestima.</p>
        <p class="description-contact">Traga leveza e rejuvenescimento ao seu rosto, enquanto cuida da saúde íntima e melhora sua qualidade de vida.</p>
        <div class="contact-us">
          <p class="icons-title">Agende sua consulta!</p>
          <div class="icons-contact">
            <a :href="`https://api.whatsapp.com/send/?phone=${number}&text=${message}&type=phone_number&app_absent=0`" target="_blank" rel="noopener noreferrer">
              <img class="icon" src="../assets/image/whatsapp-icon.png" alt="whatsapp" />
            </a>
            <a href="mailto:susu.scfisio@gmail.com?subject=Agendamento%20de%20Consulta&body=Olá,%20gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer">
              <img class="icon-email" src="../assets/image/email-icon.png" alt="email" />
            </a>
            <a href="https://www.instagram.com/susucoelhodermafisio/" target="_blank" rel="noopener noreferrer">
              <img class="icon" src="../assets/image/instagram-icon.png" alt="instagram" />
            </a>
          </div>
        </div>

      </div>
    </div>
    <div class="footer">
      <img class="logo-footer" src="../assets/image/logo.png" alt="Logo" />
      <p class="footer-description"><strong>Tel:</strong> (21)99664-1590</p>
      <p class="footer-description"><strong>Endereço:</strong> Rua Dr. Getúlio Vargas, n° 121</p>
      <p class="footer-description">Edifício Metrópolis sala 719</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const message = ref('Olá. Gostaria de agendar uma consulta.');
const number = ref('5521996641590')
</script>
<style scoped>
.firts-container {
  height: 180px;
  width: 100%;
}

.background-image {
  position: relative;
  height: 540px;
  width: 100%;
  overflow: hidden;
}

.background-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(/src/assets/image/suelen-2.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center -50px;
  background-attachment: fixed;
  opacity: 0.09;
  z-index: 1;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 2;
}

.logo {
  width: 203px;
  height: 64px;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  width: 254px;
  color: #fa5894;
  font-size: 16px;
  margin-bottom: 5px;
}

.primary-button {
  background-color: #fa5894;
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}

.second-container {
  margin: 90px 0 80px 0;
}

.title {
  font-size: 10px;
  padding-top: 15px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.about-us {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 0 20px;
}

.title-about-us {
  text-align: center;
  font-size: 46px;
}

.description-about-us {
  font-size: 14px;
  color: #000000;
  margin-top: 10px;
  width: 251px;
  margin: auto;
  text-align: center;
}

.separation {
  width: 100%;
}

.third-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(to bottom, #fa5894, #fac4d2);
  margin-top: -1px;
  padding-bottom: 80px;
}

.reference-title {
  padding-top: 50px;
  font-size: 30px;
  text-align: center;
  color: black;
}

.depoimento {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
}

.field-text {
  width: 254px;
  height: 248px;
}

.depoimento-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 20%;
  border: 1px solid #fa589400;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin: auto;
  margin-top: 44px;
}

.depoimento-text {
  position: absolute;
    top: 31px;
    width: 246px;
    height: 207px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 17px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 15px;
    box-sizing: border-box;
}

.premios {
  width: 254px;
  background: white;
  height: 386px;
  margin: auto;
  padding: 0;
  border-radius: 18px;
  padding: 10px;
}
.selo-rubi {
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
}

.selo-diamante {
  width: 100%;
  height: 180px;
}

.title-premios {
  text-align: center;
  font-size: 18px;
  color: black;
  margin-top: 100px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.fourth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 80px 0;
}

.results-title {
  font-size: 20px;
  text-align: center;
  color: #ff9fba;
}

.carousel {
  width: 300px;
  border: 3px solid #fac0d0;
  border-radius: 5px;
}

.fifth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 100px 0;
  background-image: 
    linear-gradient(#fa589426, #fa589426),
    url(/src/assets/image/contactUs.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

.field-contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 294px;
  border: 2px solid #fee9a6a3;;
  border-radius: 31px;
  box-shadow: 13px 13px 8px rgba(0, 0, 0, 0.2);
  background: #fa589480;
  padding: 0px 46px 29px 46px;
  position: relative;
}

.title-contact {
  font-size: 23px;
  font-weight: 700;
  text-align: center;
  color:#fff;
  padding-top: 25px;
}

.description-contact {
  font-size: 14px;
  text-align: center;
  color: #fff;
  margin-bottom: 0px;
}

.contact-us {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 259px;
  bottom: -50px;
  background: #9380b7;
  border: 2px solid #fee9a6;
  border-radius: 39px;
}

.icons-title {
  font-size: 12px;
  text-align: center;
  color: #fff;
  margin:5px 0 0 0
}

.icons-contact {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
}

.icon {
  width: 30px;
  height: 30px;
  margin: 10px 0
}

.icon-email {
  width: 30px;
  height: 22px;
  margin: 10px 0
}

.footer {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}
.logo-footer {
  width: 203px;
  height: 64px;
  margin-bottom: 20px;
}

.footer-description {
  font-size: 12px;
  color: #000000;
  margin: 0;
  text-align: center;
}
</style>