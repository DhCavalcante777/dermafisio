<template>
  <div class="container-fluid">
    <div class="row background-ebook pb-5">
      <div class="col-10 col-sm-6 mx-auto ">
        <p class="text-white text-center title-ebook">
          <strong>Quer ter uma vida saudável ?</strong>
        </p>
        <p class="text-white text-center title-ebook">
          A Susu vai te ajudar. Baixei o e-book gratuito, coma bem e de forma saudável.
        </p>
      </div>
      <div class="col-10 mx-auto">
        <img
          src="../assets/image/e-book/e-bookCozinharAlegraAAlma.png"
          class="img-fluid"
          alt="Imagem de fundo"
        />
      </div>
    </div>
    <div class="row ebook-content pb-5">
      <div class="col-10 col-sm-6 mx-auto">
        <p class="text-center title-ebook">
          <strong>O que você vai encontrar no e-book?</strong>
        </p>
        <div class="row">
          <div
            class="col-12 col-sm-6 d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/image/e-book/ic-certinho.png"
              class="icon-content"
              alt="Imagem de fundo"
            />
            <p class="text-center description-content">
              Dicas de como cozinhar de forma saudável.
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-12 col-sm-6 d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/image/e-book/ic-certinho.png"
              class="icon-content"
              alt="Imagem de fundo"
            />
            <p class="text-center description-content">
              Receitas práticas e saudáveis para o seu dia a dia.
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-12 col-sm-6 d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/image/e-book/ic-certinho.png"
              class="icon-content"
              alt="Imagem de fundo"
            />
            <p class="text-center description-content">
              Dicas de como emagrecer com saúde.
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-12 col-sm-6 d-flex justify-content-center align-items-center"
          >
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
    <div class="col-12 col-sm-6 mx-auto gift-ebook pb-5">
      <p class="text-center gift-ebook-title">
        <strong>Este presente é para você!</strong>
      </p>
      <p class="text-center gift-ebook-description">
        Baixe agora o nosso e-book gratuito e transforme sua alimentação.
      </p>
      <div class="d-grid gap-2">
        <a
          href="/e-book/cozinharAlegraAAlma.pdf"
          class="btn btn-primary btn-lg button-sl"
          target="_blank"
          rel="noopener noreferrer"
          onclick="window.location.href='#treatments'"
        >
          Baixar E-book Gratuito
        </a>
        <span class="text-center attention-text">Não perca a promoção abaixo</span>
      </div>
    </div>
    <div
      id="ebook-promotion"
      class="row ebook-promotion pb-5"
    >
      <div class="col-12 col-sm-6 mx-auto">
        <p class="text-center ebook-promotion-title text-white">
          <strong>Promoção de Inauguração!</strong>
        </p>
        <p class="text-center ebook-promotion-description text-white">
          Aproveite a oferta especial de lançamento:
          <strong>De R$ 29,90 por apenas R$ 9,90!</strong>
        </p>
        <div class="countdown-timer text-center">
          <p class="text-danger">
            Oferta válida por tempo limitado!
          </p>
        </div>

        <div class="col-12 col-sm-6 mx-auto mt-4">
          <p class="text-center ebook-promotion-title text-white">
            <strong>Óleos essenciais - Aprenda a usar em casa</strong>
          </p>
          <p class="text-center ebook-promotion-description text-white">
            Este e-book exclusivo foi criado para ajudar você a entender como os óleos essenciais podem transformar sua saúde e bem-estar. Aprenda:
          </p>
          <ul class="benefits-list text-white">
            <li>Como usar óleos essenciais no dia a dia.</li>
            <li>Benefícios para a saúde física e emocional.</li>
            <li>Receitas práticas para aromaterapia.</li>
            <li>Dicas para escolher óleos de alta qualidade.</li>
          </ul>
        </div>

        <div class="d-grid gap-2">
          <button
            class="btn btn-success btn-lg"
            type="button"
            @click="redirectToPayment"
          >
            Comprar agora por R$ 9,90
          </button>
        </div>
      </div>
    </div>
    
    <div id="payment-proof" class="row payment-proof-section pb-5">
      <div class="col-12 col-sm-6 mx-auto">
        <p class="text-center payment-proof-title">
          <strong>Envie seu comprovante de pagamento</strong>
        </p>
        <p class="text-center payment-proof-description">
          Preencha os campos abaixo e clique no botão para enviar o e-mail. Não se esqueça de anexar o comprovante no seu e-mail.
        </p>
          <div class="mb-3">
            <label for="fullName" class="form-label"><strong>Nome Completo*</strong></label>
            <input
              type="text"
              class="form-control"
              id="fullName"
              placeholder="Seu nome completo"
              v-model="fullName"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"><strong>Email*</strong></label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Seu e-mail"
              v-model="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label"><strong>Mensagem (opcional)</strong></label>
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="Escreva uma mensagem, se desejar"
              v-model="message"
            ></textarea>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-lg" @click="sendMailto">
              Enviar Comprovante
            </button>
          </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Footer from "@/components/footer.vue";

const fullName = ref("");
const email = ref("");
const message = ref("");

const sendMailto = () => {
  if (!fullName.value || !email.value) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const subject = encodeURIComponent("Comprovante de Pagamento");
  const body = encodeURIComponent(
    `Nome: ${fullName.value}\nEmail: ${email.value}\nMensagem: ${message.value || "Sem mensagem"}\n\nPor favor, anexe o comprovante de pagamento ao enviar este e-mail.`
  );

  const mailtoLink = `mailto:susu.scfisio@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
};

const redirectToPayment = () => {
  window.location.href =
    "https://pay.infinitepay.io/sldermafisio/Ri0x-KYJJmgd4J-9,90";
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

.ebook-promotion {
  background-color: #313131;
  padding: 20px;
  border-radius: 5px;
}

.ebook-promotion-title {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.ebook-promotion-description {
  font-size: 20px;
  margin-bottom: 20px;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  font-size: 18px;
}

.benefits-list li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.benefits-list li::before {
  content: "✔";
  color: #28a745;
  margin-right: 10px;
  font-weight: bold;
}

.gift-ebook {
  background-color: #fff;
  padding: 20px;
}

.gift-ebook-title {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fa5894;
}

.gift-ebook-description {
  font-size: 20px;
  margin-bottom: 20px;
  color: #fa5894;
}

.payment-proof-section {
  background-color: #f6daeb;
  padding: 20px;
}

.payment-proof-title {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.attention-text {
  font-size: 15px;
  color: red;
}
</style>
