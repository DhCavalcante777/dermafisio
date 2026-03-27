<template>
  <section class="container-fluid background faq-section py-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-12 text-center d-flex align-items-center justify-content-center gap-3">
          <div class="ornament-line"></div>
          <h2 class="section-title">Dúvidas frequentes</h2>
          <div class="ornament-line"></div>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="accordion" id="faqAccordion">
            <div v-for="(item, index) in faqs" :key="index" class="accordion-item custom-faq-item mb-3">
              <h2 class="accordion-header">
                <button 
                  class="accordion-button collapsed custom-faq-button" 
                  type="button" 
                  :data-bs-toggle="'collapse'" 
                  :data-bs-target="'#collapse' + index"
                >
                  {{ item.question }}
                  <span class="plus-icon">+</span>
                </button>
              </h2>
              <div :id="'collapse' + index" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body custom-faq-body">
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 text-center">
          <div class="cta-container">
            <h3 class="cta-title">Agende sua avaliação</h3>
            <div class="cta-line mb-4"></div>
            <a href="https://wa.me/5521996641590" target="_blank" class="btn-agendar">AGENDAR AGORA</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const faqs = [
  { question: 'Quais tratamentos vocês oferecem?', answer: 'Oferecemos uma ampla gama de tratamentos faciais, corporais e fisioterapia especializada.' },
  { question: 'Os procedimentos são seguros?', answer: 'Sim, todos os nossos procedimentos são realizados por profissionais qualificados e com equipamentos de ponta.' },
  { question: 'Quanto tempo leva para ver os resultados?', answer: 'Os resultados variam de acordo com o tratamento, mas muitos clientes notam melhorias logo nas primeiras sessões.' },
  { question: 'É necessário agendar uma consulta?', answer: 'Sim, trabalhamos com agendamento prévio para garantir um atendimento personalizado e exclusivo.' }
];
</script>

<style scoped>
.faq-section {
  background-color: var(--color-bg-page);
  background-image:
    repeating-linear-gradient(87deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 2px),
    repeating-linear-gradient(168deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 2px);
  background-size: 6px 6px;
}

/* Título e Ornamentos */
.section-title {
  color: var(--color-gold);
  font-family: "Great Vibes", cursive;
  font-size: 42px;
  margin: 0;
  word-spacing: 8px;
}

.ornament-line {
  height: 1px;
  width: 80px;
  background: linear-gradient(to right, transparent, var(--color-gold), transparent);
}

/* Estilo do Acordeão */
.custom-faq-item {
  background-color: var(--shadow-medium);
  border: 1px solid var(--color-gold-border);
  border-radius: 4px !important;
  overflow: hidden;
}

.custom-faq-button {
  background-color: transparent !important;
  color: white !important;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  padding: 20px;
  box-shadow: none !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-faq-button::after {
  display: none; /* Remove a seta padrão do Bootstrap */
}

.plus-icon {
  color: var(--color-gold);
  font-size: 24px;
  font-weight: 300;
}

.custom-faq-body {
  color: var(--color-text-soft);
  font-family: "Poppins", sans-serif;
  padding: 0 20px 20px 20px;
}

/* Seção CTA */
.cta-title {
  color: var(--color-gold);
  font-family: "Great Vibes", cursive;
  font-size: 54px;
  margin-bottom: 10px;
  word-spacing: 8px;
}

.cta-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, transparent, var(--color-gold), transparent);
}

.btn-agendar {
  background-color: var(--color-gold-medium);
  color: white;
  border: none;
  padding: 15px 60px;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  border-radius: 5px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-agendar:hover {
  background-color: var(--color-gold-dark);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px var(--color-tan-glow);
  filter: brightness(1.1);
}

@media (max-width: 768px) {
  .section-title { font-size: 32px; }
  .cta-title { font-size: 40px; }
  .btn-agendar { width: 100%; padding: 15px 20px; }
}
</style>
