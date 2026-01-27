<template>
  <div class="container background line-bottom">
    <div class="row justify-content-center align-items-center gap-1 pt-2">
      <div class="col-2">
        <div class="left-line" />
      </div>
      <div class="col-auto text-center my-4">
        <p class="title">Nossos Serviços</p>
      </div>
      <div class="col-2">
        <div class="right-line" />
      </div>
    </div>
    <div class="row justify-content-center align-items-center gap-2">
      <div class="col-2 service-item">
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
      <div class="col-2 service-item">
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
      <div class="col-2 service-item">
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
  padding-bottom: 2px;
}

.title {
  color: burlywood;
  font-size: 35px;
  font-family: "Great Vibes", cursive;
  margin: 0;
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
  color: burlywood;
  font-family: "Great Vibes", cursive;
  font-size: 40px;
  margin-top: 20px;
}

@media (max-width: 768px) {
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
    border-bottom: 1px solid burlywood;
}
</style>
