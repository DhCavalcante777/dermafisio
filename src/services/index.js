import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://dermafisio-be-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
} );

// Você pode adicionar interceptadores aqui no futuro (ex: para tratar erro 401)
export default api;