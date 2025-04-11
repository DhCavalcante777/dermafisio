<template>
  <div class="container-fluid">
    <div class="row background-ebook">
      <div class="col-10 col-sm-6 mx-auto">
        <p class="text-white text-center title-ebook">
          <strong>Quer ter uma vida saudável ?</strong>
        </p>
        <p class="text-white text-center title-ebook"> A susu vai te ajudar. Baixei o e-book, coma bem e de forma saudável.</p>
      </div>
      <div class="col-10 mx-auto">
        <img
          src="../assets/image/e-book/e-bookCozinharAlegraAAlma.png"
          class="img-fluid"
          alt="Imagem de fundo"
        />
      </div>
      <div class="col-10 col-sm-6 mx-auto">
        <p class="text-white text-center title-ebook">
          <strong>Quer receber o conteúdo gratuito?</strong>
        </p>
      </div>
      <div class="d-grid gap-2 col-10 mx-auto pb-5">
        <a
          href="/e-book/cozinharAlegraAAlma.pdf"
          class="btn btn-primary btn-lg button-sl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Receber conteúdo gratuito
        </a>
      </div>
      <!-- <div class="col-12 col-sm-6">
        <div class="mb-3">
          <label for="fullName" class="form-label"
            ><strong>Nome Completo*</strong></label
          >
          <input
            type="email"
            class="form-control"
            id="fullName"
            placeholder="Suelen Coelho"
            v-model="fullName"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label"><strong>Email*</strong></label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="susu.scfisio@gmail.com"
            v-model="email"
          />
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button" @click="sendEmail">
            Receber conteúdo gratuito
          </button>
        </div>
      </div> -->
    </div>
    <div class="row ebook-content pb-5">
      <div class="col-10 col-sm-6 mx-auto">
        <p class="text-center title-ebook">
          <strong>O que você vai encontrar no e-book?</strong>
        </p>
        <div class="row">
          <div class="col-12 col-sm-6 d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/e-book/ic-certinho.png"
              class="icon-content"
              alt="Imagem de fundo"
            />
            <p class="text-center description-content">Dicas de como cozinhar de forma saudável.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/e-book/ic-certinho.png"
              class="icon-content"
              alt="Imagem de fundo"
            />
            <p class="text-center description-content">Receitas práticas e saudáveis para o seu dia a dia.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/e-book/ic-certinho.png"
              class="icon-content"
              alt="Imagem de fundo"
            />
            <p class="text-center description-content">Dicas de como emagrecer com saúde.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/e-book/ic-certinho.png"
              class="icon-content"
              alt="Imagem de fundo"
            />
            <p class="text-center description-content">E muito mais...</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";
import Footer from "@/components/footer.vue";

const fullName = ref("");
const email = ref("");

const sendEmail = () => {
  if (!fullName.value || !email.value) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const templateParams = {
    title:'E-book gratis',
    name: fullName.value,
    message:'email: ' + email.value,
  };

  emailjs
    .send(
      "service_vp92mbr", // Substitua pelo seu Service ID
      "template_fx3x3ba", // Substitua pelo seu Template ID
      templateParams,
      "ZXQkSnHNlcXsdIugM"
    )
    .then(
      (response) => {
        alert("E-mail enviado com sucesso!");
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        alert("Erro ao enviar o e-mail. Tente novamente.");
        console.error("FAILED...", error);
      }
    );
};
</script>
<style scoped>
.container-fluid {
  padding: 0;
}

.background-ebook {
  background-color: #313131;
  padding: 20px 0;
}

.title-ebook {
  font-size: 28px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.button-sl {
  background-color: #fa5894;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
}

.button-sl:hover {
  background-color: #fa5894;
  color: #f6daeb;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.button-sl:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(250, 88, 148, 0.5);
}

.ebook-content {
  background-color: #f6daeb;
  padding: 20px;
  border-radius: 5px;
}

.icon-content {
  width: 25px;
  height: 25px;
}

.description-content {
  font-size: 20px;
  margin-bottom: 0px;
}
</style>
