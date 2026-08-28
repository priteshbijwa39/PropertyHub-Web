// APIS ENDPOINTS
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
  },
  PROFILES: {
    GET: "/api/auth/profile",
    UPDATE: "/api/auth/updateProfile",
  },
  PROPERTIES: {
    ADD: "/api/properties",
    MY_PROPERTIES: "/api/properties",
    GET_ALL: "/api/properties",
    UPDATE: "/api/properties",
    DELETE: "/api/properties",
    FAVORITE: "/api/properties/favorite",
    GET_FAVORITE: "/api/properties/favorite",
  },
} as const;
