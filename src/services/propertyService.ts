import { API_ENDPOINTS } from "../utils/url";
import { apiClient } from "./apiClient";
import type {
  Property,
  ListingType,
  PropertyCategory,
} from "../types/property";
import type { ProfileResponse, UpdateProfileRequest } from "../types/user";

export interface PropertyOwner {
  _id: string;
  name: string;
  email: string;
  mobileNumber?: string;
}

export interface AddPropertyRequest {
  title: string;
  description: string;

  listingType: ListingType;
  propertyCategory: PropertyCategory;
  propertyType: string;

  price: number;

  location: string;
  city: string;
  state: string;

  area: number;

  bedrooms?: number;
  bathrooms?: number;
}

export interface AddPropertyResponse {
  message: string;
  property: Property;
}

// ============================================================
// UPDATE PROPERTY
// ============================================================

export interface UpdatePropertyRequest {
  title: string;
  description: string;

  price: number;

  propertyType: string;

  location: string;
  area: number;

  bedrooms?: number;
  bathrooms?: number;
}

export interface UpdatePropertyResponse {
  message: string;
  property: Property;
}

// ============================================================
// PROPERTY RESPONSE TYPES
// ============================================================

export interface GetPropertiesResponse {
  properties: Property[];
}

export interface GetPropertyResponse {
  property: Property;
}

// ============================================================
// FAVORITE
// ============================================================

export interface ToggleFavoriteResponse {
  message: string;
  isFavorite: boolean;
}

export interface GetFavoritePropertiesResponse {
  favorites: Property[];
}

export const addProperty = (
  propertyData: AddPropertyRequest,
): Promise<AddPropertyResponse> => {
  return apiClient<AddPropertyResponse>(API_ENDPOINTS.PROPERTIES.ADD, {
    method: "POST",
    data: propertyData,
  });
};

export const getAllPropertiesApi = (): Promise<GetPropertiesResponse> => {
  return apiClient<GetPropertiesResponse>(API_ENDPOINTS.PROPERTIES.GET_ALL, {
    method: "GET",
  });
};

export const getPropertyByIdApi = (
  propertyId: string,
): Promise<GetPropertyResponse> => {
  return apiClient<GetPropertyResponse>(
    `${API_ENDPOINTS.PROPERTIES.MY_PROPERTIES}/${propertyId}`,
    {
      method: "GET",
    },
  );
};

export const updateProperty = (
  propertyId: string,
  propertyData: UpdatePropertyRequest,
): Promise<UpdatePropertyResponse> => {
  return apiClient<UpdatePropertyResponse>(
    `${API_ENDPOINTS.PROPERTIES.UPDATE}/${propertyId}`,
    {
      method: "PUT",
      data: propertyData,
    },
  );
};

export const deletePropertyApi = (
  propertyId: string,
): Promise<{ message: string }> => {
  return apiClient<{ message: string }>(
    `${API_ENDPOINTS.PROPERTIES.DELETE}/${propertyId}`,
    {
      method: "DELETE",
    },
  );
};

// ============================================================
// FAVORITE API
// ============================================================
export const getFavoriteProperties = (): Promise<Property[]> => {
  return apiClient<GetFavoritePropertiesResponse>(
    API_ENDPOINTS.PROPERTIES.GET_FAVORITE,
    {
      method: "GET",
    },
  ).then((response) => response.favorites);
};

export const toggleFavorite = (
  propertyId: string,
): Promise<ToggleFavoriteResponse> => {
  return apiClient<ToggleFavoriteResponse>(
    `${API_ENDPOINTS.PROPERTIES.FAVORITE}/${propertyId}`,
    {
      method: "POST",
    },
  );
};

// ============================================================
// PROFILE API
// ============================================================

export const updateProfile = (
  profileData: UpdateProfileRequest,
): Promise<ProfileResponse> => {
  return apiClient<ProfileResponse>(API_ENDPOINTS.PROFILES.UPDATE, {
    method: "PUT",
    data: profileData,
  });
};

export const getProfile = (): Promise<ProfileResponse> => {
  return apiClient<ProfileResponse>(API_ENDPOINTS.PROFILES.GET, {
    method: "GET",
  });
};
