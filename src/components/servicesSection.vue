<template>
  <div class="container background line-bottom">
    <div class="row justify-content-center align-items-center gap-1 pt-2">
      <div class="col-2">
        <div class="left-line" />
      </div>
      <div class="col-auto text-center my-4">
        <p class="title">Nossos serviços</p>
      </div>
      <div class="col-2">
        <div class="right-line" />
      </div>
    </div>
    <div class="row justify-content-center align-items-center gap-2">
      <div class="col-lg-3 service-item">
        <div class="row justify-content-center">
          <img
            class="img-size"
            src="@/assets/image/icon_estetica_facial.png"
            alt="Imagem 1"
          />
        </div>
        <div class="row">
          <p class="description text-center">Estética Facial</p>
        </div>
      </div>
      <div class="col-lg-3 service-item">
        <div class="row justify-content-center">
          <img
            class="img-size"
            src="@/assets/image/icon_estetica_corporal.png"
            alt="Imagem 2"
          />
        </div>
        <div class="row">
          <p class="description text-center">Estética Corporal</p>
        </div>
      </div>
      <div class="col-lg-3 service-item">
        <div class="row justify-content-center">
          <img
            class="img-size"
            src="@/assets/image/icon_fisioterapia.png"
            alt="Imagem 3"
          />
        </div>
        <div class="row">
          <p class="description text-center">Fisioterapia Especializada</p>
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
  padding-bottom: 2px;
}

.title {
  color: var(--color-gold);
  font-size: var(--font-size-4xl);
  font-family: var(--font-display);
  margin: 0;
  word-spacing: 8px;
}

.left-line {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--color-gold) 30%,
    var(--color-gold) 100%
  );
}

.right-line {
  height: 1px;
  background: linear-gradient(
    to left,
    transparent 0%,
    var(--color-gold) 30%,
    var(--color-gold) 100%
  );
}

.img-size {
  width: 200px;
}

.service-item + .service-item {
  position: relative;
}

.service-item + .service-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 150px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    #c4978a 30%,
    #c4978a 70%,
    transparent 100%
  );
}

.description {
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: 40px;
  margin-top: var(--spacing-md);
  word-spacing: 8px;
}

@media (max-width: 991px) {
  .row.gap-2 {
    flex-direction: column;
    align-items: center;
  }

  .service-item {
    width: 100%;
    max-width: 300px;
  }

  .service-item + .service-item {
    margin-top: 2rem;
    padding-top: 2rem;
  }

  .service-item + .service-item::before {
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 150px;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #c4978a 30%,
      #c4978a 70%,
      transparent 100%
    );
  }
}

.line-bottom {
    border-bottom: 1px solid var(--color-gold);
}
</style>
