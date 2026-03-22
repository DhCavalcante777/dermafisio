<template>
  <footer id="contato" class="container-fluid background footer-container">
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
            <a href="https://www.instagram.com/susucoelhodermafisio/" target="_blank" class="social-link">
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
  background-color: var(--color-bg-primary);
  background-image: var(--texture-subtle);
  background-size: var(--texture-size);
}

.top-line {
  width: 100%;
  border-bottom: 2px solid var(--color-gold);
}

.footer-title {
  color: var(--color-gold-mid);
  font-family: var(--font-serif);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  letter-spacing: 1px;
}

.contact-info p {
  color: var(--color-gold);
  font-family: var(--font-body);
  font-size: var(--font-size-md);
  margin-bottom: 8px;
}

.contact-info strong {
  color: var(--color-gold-mid);
}

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
  background-color: var(--color-gold);
  color: var(--color-bg-primary);
  border-radius: var(--radius-circle);
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
  background-color: var(--color-gold-mid);
  color: white;
}

.copyright {
  color: rgba(222, 184, 135, 0.5);
  font-size: var(--font-size-xs);
  font-family: var(--font-body);
  border-top: 1px solid rgba(222, 184, 135, 0.1);
  padding-top: var(--spacing-md);
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
