import api from "@/services";

const TOKEN_KEY = "sl_token";

const AuthService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    return response.data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decodifica o payload do JWT para verificar expiração
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  },
};

export default AuthService;
