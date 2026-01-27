<template>
  <div class="container background">
    <div class="row justify-content-center align-items-center gap-1 pt-2">
      <div class="col-auto text-center my-4">
        <p class="title">Por que escolher a <span class="highlight">SL DERMAFÍSIO</span>?</p>
      </div>
    </div>
    <div class="row justify-content-center align-items-center pb-4">
      <div class="col-auto">
        <div class="answer-item">
          <span class="check-icon">✓</span>
          <span class="answer-text">Profissionais experientes e qualificados</span>
        </div>
        <div class="answer-item">
          <span class="check-icon">✓</span>
          <span class="answer-text">Tecnologia de ponta e ambiente sofisticado</span>
        </div>
      </div>
      <div class="col-auto">
        <div class="answer-item">
          <span class="check-icon">✓</span>
          <span class="answer-text">Atendimento personalizado e humanizado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  max-width: 100%;
}

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

.title {
  color: burlywood;
  font-size: 35px;
  font-family: "Great Vibes", cursive;
  margin: 0;
}

.highlight {
  color: #d4a574;
  font-family: "Playfair Display", serif;
  font-weight: 600;
  letter-spacing: 2px;
  padding-left: 10px;
}

.left-line {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    burlywood 30%,
    burlywood 100%
  );
}

.right-line {
  height: 1px;
  background: linear-gradient(
    to left,
    transparent 0%,
    burlywood 30%,
    burlywood 100%
  );
}

.answer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.check-icon {
  color: burlywood;
  font-size: 18px;
  font-weight: bold;
}

.answer-text {
  color: burlywood;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
}

@media (max-width: 768px) {
  .title {
    font-size: 28px;
  }

  .answer-text {
    font-size: 16px;
  }

  .row.pb-4 {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2rem;
  }
}
</style>