<template>
  <button class="hamburger-btn" @click="isOpen = true">
    <div class="hamburger" :class="{ 'is-active': isOpen }">
      <span class="line line-1"></span>
      <span class="line line-2"></span>
      <span class="line line-3"></span>
    </div>
  </button>
  <div class="sidebar-overlay" :class="{ active: isOpen }" @click="isOpen = false"></div>

  <aside class="sidebar shadow-lg" :class="{ 'is-open': isOpen }">
    <button class="btn-close-sidebar" @click="isOpen = false">
      <div class="hamburger" :class="{ 'is-active': isOpen }">
        <span class="line line-1"></span>
        <span class="line line-2"></span>
        <span class="line line-3"></span>
      </div>
    </button>

    <div class="logo-section text-center pt-5">
      <img
          class="logo"
          src="../assets/image/logo-sldermafisio.png"
          alt="Logo"
        />
    </div>

    <nav class="nav flex-column">
      <router-link to="/dashboard" class="nav-link" exact-active-class="active" @click="isOpen = false">
        <i class="fas fa-th-large me-3"></i> <span>Dashboard</span>
      </router-link>
      <router-link to="/dashboard/calendar" class="nav-link" active-class="active" @click="isOpen = false">
        <i class="fas fa-calendar-alt me-3"></i> <span>Agenda</span>
      </router-link>
      <router-link to="/dashboard/clients" class="nav-link" active-class="active" @click="isOpen = false">
        <i class="fas fa-users me-3"></i> <span>Clientes</span>
      </router-link>
      <router-link to="/dashboard/anamnese" class="nav-link" active-class="active" @click="isOpen = false">
        <i class="fas fa-clock me-3"></i> <span>Anamneses</span>
      </router-link>
      <router-link to="/dashboard/financial" class="nav-link" active-class="active" @click="isOpen = false">
        <i class="fas fa-wallet me-3"></i> <span>Financeiro</span>
      </router-link>
    </nav>

    <div class="sidebar-footer text-center py-4">
      <button class="btn-logout" @click="handleLogout">
        <i class="fas fa-sign-out-alt me-2"></i> <span>Sair</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/authService';

const isOpen = ref(false);
const router = useRouter();

const handleLogout = () => {
  AuthService.logout();
  router.push('/areaRestrita');
};
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-width: 260px;
  transition: var(--transition-base);
  background: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-gold-border);
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-sl {
  font-family: var(--font-serif);
  font-size: 48px;
  background: var(--gradient-gold-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  font-weight: 700;
}

.brand-name {
  color: var(--color-gold-dark);
  letter-spacing: 5px;
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-xs);
  font-family: var(--font-body);
  font-weight: 300;
}

.nav-link {
  color: var(--color-text-50);
  padding: 18px 30px;
  transition: var(--transition-smooth);
  border-left: 4px solid transparent;
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-family: var(--font-body);
  display: flex;
  align-items: center;
}

.nav-link i {
  font-size: var(--font-size-lg);
  width: 25px;
}

.nav-link:hover {
  color: var(--color-gold);
  background: var(--color-gold-bg-subtle);
}

.nav-link.active {
  color: var(--color-gold);
  background: linear-gradient(to right, rgba(212, 165, 116, 0.12), transparent);
  border-left-color: var(--color-gold);
  font-weight: 600;
  text-shadow: 0 0 10px var(--color-gold-glow);
}

.btn-logout {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-40);
  padding: 10px 25px;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  transition: var(--transition-base);
}

.btn-logout:hover {
  border-color: var(--color-pink-dark);
  color: var(--color-pink-dark);
}

.hamburger-btn,
.btn-close-sidebar {
  display: none;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 19px;
  cursor: pointer;
}

.hamburger .line {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--color-gold);
  border-radius: 2px;
  transition: var(--transition-base);
  transform-origin: center;
}

.hamburger.is-active .line-1 {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.is-active .line-2 {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.is-active .line-3 {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 992px) {
  .sidebar {
    width: 80px;
  }
  .brand-name {
    display: none;
  }
  .nav-link {
    justify-content: center;
    padding: 22px;
  }
  .nav-link i {
    margin: 0 !important;
  }
  .logo-sl {
    font-size: 32px;
  }
  .btn-logout {
    padding: 10px 25px 10px 20px;
    border-radius: var(--radius-pill);
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
}

@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 270px;
    height: 100vh;
    min-height: 100vh;
    transform: translateX(-100%);
    z-index: 1100;
    overflow-y: auto;
  
    .brand-name,
    .nav-link span,
    .btn-logout span {
      display: unset;
    }
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1099;
    backdrop-filter: blur(3px);
  }
  .sidebar-overlay.active {
    display: block;
  }

  .hamburger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1050;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: var(--color-bg-sidebar);
    border: 1px solid var(--color-gold-border);
    color: var(--color-gold-dark);
    font-size: var(--font-size-lg);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
  }

  .btn-close-sidebar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-circle);
    color: var(--color-text-50);
    font-size: 16px;
    cursor: pointer;
    transition: var(--transition-base);
  }
  .btn-close-sidebar:hover {
    border-color: var(--color-pink-dark);
    color: var(--color-pink-dark);
  }


  .nav-link {
    justify-content: flex-start;
    padding: 18px 30px;
  }
  .nav-link i {
    margin-right: 12px !important;
    width: 25px;
  }
  .btn-logout {
    width: auto;
    height: auto;
    border-radius: var(--radius-pill);
    padding: 10px 25px 10px 20px;
    margin: auto;
  }
}
</style>
