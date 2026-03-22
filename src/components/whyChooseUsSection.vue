<template>
  <div class="container background line-bottom py-4">
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
  background-color: var(--color-bg-primary);
  background-image: var(--texture-subtle);
  background-size: var(--texture-size);
}

.title {
  color: var(--color-gold);
  font-size: var(--font-size-4xl);
  font-family: var(--font-display);
  margin: 0;
}

.highlight {
  color: var(--color-gold-mid);
  font-weight: 500;
  font-family: var(--font-serif);
  letter-spacing: 2px;
  padding-left: 10px;
}

.left-line {
  height: 1px;
  background: linear-gradient(to right, transparent 0%, var(--color-gold) 30%, var(--color-gold) 100%);
}

.right-line {
  height: 1px;
  background: linear-gradient(to left, transparent 0%, var(--color-gold) 30%, var(--color-gold) 100%);
}

.answer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.check-icon {
  color: var(--color-gold);
  font-size: var(--font-size-lg);
  font-weight: bold;
}

.answer-text {
  color: var(--color-gold);
  font-size: var(--font-size-lg);
  font-family: var(--font-body);
}

.line-bottom {
    border-bottom: 1px solid var(--color-gold);
}

@media (max-width: 768px) {
  .title {
    font-size: 28px;
  }

  .answer-text {
    font-size: var(--font-size-md);
  }

  .row.pb-4 {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2rem;
  }
}
</style>