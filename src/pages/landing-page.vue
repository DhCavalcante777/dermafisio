<template>
  <div class="container-fluid">
    <navbar />
    <introSection />
    <servicesSection />
    <whyChooseUsSection />
    <!-- <treatmentsSection /> -->
    <reportClientsSection />
    <faqSection />
    <footerV2 />
  </div>
</template>
<script setup>
import { ref } from "vue";
import navbar from "@/components/navbar.vue";
import introSection from "@/components/introSection.vue";
import servicesSection from "@/components/servicesSection.vue";
import whyChooseUsSection from "@/components/whyChooseUsSection.vue";
// import treatmentsSection from "@/components/treatmentsSection.vue";
import reportClientsSection from "@/components/reportClientsSection.vue";
import faqSection from "@/components/faqSection.vue";
import footerV2 from "@/components/footerV2.vue";

const fullName = ref("");
const email = ref("");
const message = ref("");

const sendMailto = () => {
  if (!fullName.value || !email.value) {
    alert("Por favor, preencha todos os campos obrigatórios");
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
