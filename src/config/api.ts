// API Configuration
const getApiBaseUrl = () => {
  // Always use relative path since Node.js server serves both frontend and API
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/send-email`,
  HEALTH: `${API_BASE_URL}/health`,
} as const;