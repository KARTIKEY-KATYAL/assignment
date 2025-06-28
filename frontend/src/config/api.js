// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  ENDPOINTS: {
    CONTACTS: '/contacts',
    HEALTH: '/health'
  }
};

export default API_CONFIG;
