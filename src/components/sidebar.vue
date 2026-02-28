<template>
  <aside class="sidebar shadow-lg">
    <div class="logo-section text-center py-5">
      <div class="logo-sl">SL</div>
      <div class="brand-name">DERMAFÍSIO</div>
    </div>

    <nav class="nav flex-column mt-4">
      <router-link to="/dashboard" class="nav-link" exact-active-class="active">
        <i class="fas fa-th-large me-3"></i> <span>Dashboard</span>
      </router-link>
      <router-link to="/dashboard/agenda" class="nav-link" active-class="active">
        <i class="fas fa-calendar-alt me-3"></i> <span>Agenda</span>
      </router-link>
      <router-link to="/dashboard/clientes" class="nav-link" active-class="active">
        <i class="fas fa-users me-3"></i> <span>Clientes</span>
      </router-link>
      <router-link to="/dashboard/anamnese" class="nav-link" active-class="active">
        <i class="fas fa-clock me-3"></i> <span>Anamneses</span>
      </router-link>
      <router-link to="/dashboard/financial" class="nav-link" active-class="active">
        <i class="fas fa-wallet me-3"></i> <span>Financeiro</span>
      </router-link>
    </nav>

    <div class="sidebar-footer text-center py-4">
      <button class="btn-logout">
        <i class="fas fa-sign-out-alt me-2"></i> Sair
      </button>
    </div>
  </aside>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;600&display=swap');

.sidebar {
  width: 280px;
  background: #050505; /* Preto Absoluto da LP */
  border-right: 1px solid rgba(212, 165, 116, 0.2); /* Borda Dourada Sutil */
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.logo-sl {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  background: linear-gradient(135deg, #d4af37 0%, #f9e4b7 50%, #b8860b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  font-weight: 700;
}

.brand-name {
  color: #d4af37;
  letter-spacing: 5px;
  font-size: 11px;
  margin-top: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
}

.nav-link {
  color: rgba(255, 255, 255, 0.5);
  padding: 18px 30px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 4px solid transparent;
  text-decoration: none;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
}

.nav-link i {
  font-size: 18px;
  width: 25px;
}

.nav-link:hover {
  color: #f9e4b7;
  background: rgba(212, 165, 116, 0.05);
}

.nav-link.active {
  color: #d4af37;
  background: linear-gradient(to right, rgba(212, 165, 116, 0.12), transparent);
  border-left-color: #d4af37;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(212, 165, 116, 0.2);
}

.btn-logout {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  padding: 10px 25px;
  border-radius: 30px;
  font-size: 13px;
  transition: 0.3s;
}

.btn-logout:hover {
  border-color: #d67a7a;
  color: #d67a7a;
}

@media (max-width: 992px) {
  .sidebar { width: 85px; }
  .brand-name, .nav-link span, .btn-logout span { display: none; }
  .nav-link { justify-content: center; padding: 25px; }
  .nav-link i { margin: 0 !important; }
}
</style>
