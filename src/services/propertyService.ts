import { API_ENDPOINTS } from "../utils/url";
import { apiClient } from "./apiClient";

export interface AddPropertyRequest {
  title: string;
  description: string;
  price: number;
  propertyType: string;
  location: string;
  // city: string;
  // state: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  // images: File[];
}

export interface AddPropertyResponse {
  message: string;
  property: {
    _id: string;
    title: string;
    description: string;
    price: number;
    propertyType: string;
    location: string;
    // city: string;
    // state: string;
    area: number;
    bedrooms?: number;
    bathrooms?: number;
    // images: string[];
  };
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  location: string;
  // city: string;
  // state: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  // images: string[];
}
export interface UpdatePropertyResponse {
  message: string;
  property: Property;
}

export const addProperty = async (propertyData: AddPropertyRequest) => {
  const formData = new FormData();

  formData.append("title", propertyData.title);
  formData.append("description", propertyData.description);
  formData.append("price", String(propertyData.price));
  formData.append("propertyType", propertyData.propertyType);
  formData.append("location", propertyData.location);
  //   formData.append("city", propertyData.city);
  //   formData.append("state", propertyData.state);
  formData.append("area", String(propertyData.area));

  if (propertyData.bedrooms !== undefined) {
    formData.append("bedrooms", String(propertyData.bedrooms));
  }

  if (propertyData.bathrooms !== undefined) {
    formData.append("bathrooms", String(propertyData.bathrooms));
  }

  //   propertyData.images.forEach((image) => {
  //     formData.append("images", image);
  //   });

  return await apiClient<AddPropertyResponse>(API_ENDPOINTS.PROPERTIES.ADD, {
    method: "POST",
    data: propertyData,
  });
};



export interface GetPropertiesResponse {
  message: string;
  properties: Property[];
}

export const getAllPropertiesApi = (): Promise<GetPropertiesResponse> => {
  return apiClient<GetPropertiesResponse>(
    API_ENDPOINTS.PROPERTIES.GET_ALL,
    {
      method: "GET",
    },
  );
};


export const getPropertyByIdApi = (
  propertyId: string,
): Promise<GetPropertiesResponse> => {
  return apiClient<GetPropertiesResponse>(
    `${API_ENDPOINTS.PROPERTIES.MY_PROPERTIES}/${propertyId}`,
    {
      method: "GET",
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


export const updateProperty = async (
  propertyId: string,
  propertyData: {
    title: string;
    description: string;
    price: number;
    propertyType: string;
    location: string;
    area: number;
    bedrooms?: number;
    bathrooms?: number;
  }
) => {
  return await apiClient<UpdatePropertyResponse>(
    `${API_ENDPOINTS.PROPERTIES.UPDATE}/${propertyId}`,
    {
      method: "PUT",
      data: propertyData,
    }
  );
};