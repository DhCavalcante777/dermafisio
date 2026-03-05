import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://dermafisio-be-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: adiciona o token JWT em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sl_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: se a API retornar 401, redireciona para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("sl_token");
      window.location.href = "/areaRestrita";
    }
    return Promise.reject(error);
  }
);

export default api;