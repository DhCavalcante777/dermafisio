<template>
  <footer class="container-fluid background footer-container">
    <div class="top-line"></div>

    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-md-8 contact-info">
          <h3 class="footer-title">Contato</h3>
          <p><strong>Telefone:</strong> (21) 99664-1590</p>
          <p><strong>E-mail:</strong> contato@sldermafisio.com</p>
          <p><strong>Endereço:</strong> Rua Dr. Getúlio Vargas, n° 121 - Rio de Janeiro, RJ</p>
        </div>

        <div class="col-md-4 d-flex justify-content-md-end justify-content-center mt-4 mt-md-0">
          <div class="social-icons">
            <a href="https://instagram.com/seu_perfil" target="_blank" class="social-link">
              <img src="@/assets/image/icons/social_instagram.png" alt="Instagram" class="social-img">
            </a>
            <a href="mailto:contato@sldermafisio.com" class="social-link">
              <img src="@/assets/image/icons/social_email.png" alt="E-mail" class="social-img">
            </a>
            <a href="https://wa.me/5521996641590" target="_blank" class="social-link">
              <img src="@/assets/image/icons/social_whatsapp.png" alt="WhatsApp" class="social-img">
            </a>
          </div>
        </div>
      </div>
      
      <div class="row mt-5">
        <div class="col-12 text-center">
          <p class="copyright">© 2024 SL DERMAFÍSIO. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  position: relative;
  padding: 0;
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

/* Linha Burlywood com Gradiente */
.top-line {
  width: 100%;
  border-bottom: 2px solid burlywood;
  /*height: 2px;
  background: linear-gradient(to right, transparent, burlywood, transparent);
  background: linear-gradient(to right, transparent, burlywood, transparent);*/
}

.footer-title {
  color: #d4a574;
  font-family: "Playfair Display", serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.contact-info p {
  color: burlywood;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  margin-bottom: 8px;
}

.contact-info strong {
  color: #d4a574;
}

/* Estilo dos Ícones Sociais */
.social-icons {
  display: flex;
  gap: 15px;
}

.social-img {
  width: 70px;
  height: 70px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.social-icon {
  width: 40px;
  height: 40px;
  background-color: burlywood;
  color: #272427;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.social-link:hover .social-img {
  transform: scale(1.15);
  filter: brightness(1.2);
}

.social-icon:hover {
  transform: translateY(-3px);
  background-color: #d4a574;
  color: white;
}

.copyright {
  color: rgba(222, 184, 135, 0.5);
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  border-top: 1px solid rgba(222, 184, 135, 0.1);
  padding-top: 20px;
}

@media (max-width: 768px) {
  .contact-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .footer-title {
    font-size: 20px;
  }
}
</style>
