// APIS ENDPOINTS
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
  },

  PROPERTIES: {
    ADD: "/api/properties",
    MY_PROPERTIES: "/api/properties",
    GET_ALL: "/api/properties",
    // GET_BY_ID: "/api/properties",
    // CREATE: "/api/properties",
    // UPDATE: "/api/properties",
    DELETE: "/api/properties",
  },
} as const;